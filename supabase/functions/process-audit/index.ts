// @ts-nocheck
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function isValidAuditUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return false;
    }
    const hostname = parsed.hostname.toLowerCase();
    const blockedPatterns = [
      /^localhost$/i,
      /^127\./,
      /^10\./,
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
      /^192\.168\./,
      /^169\.254\./,
      /^\[::1\]$/,
      /^\[fe80:/,
      /^0\./,
    ];
    if (blockedPatterns.some(pattern => pattern.test(hostname))) {
      return false;
    }
    if (url.length > 2048) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  let activeAuditId: string | null = null;
  let supabase = null;

  try {
    // Authenticate the user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase configuration");
    }

    // Verify user identity
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { auditId, url } = await req.json();
    activeAuditId = auditId;

    supabase = createClient(supabaseUrl, supabaseKey);

    // Verify audit ownership
    const { data: auditOwnership } = await supabase
      .from('audits')
      .select('user_id')
      .eq('id', auditId)
      .single();

    if (!auditOwnership || auditOwnership.user_id !== user.id) {
      return new Response(JSON.stringify({ error: 'Forbidden - audit not found or access denied' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Initial status update
    await supabase.from("audits").update({
      status: "processing",
      started_at: new Date().toISOString()
    }).eq("id", activeAuditId);

    // Validate and format URL
    let targetUrl = url;
    if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
      targetUrl = "https://" + targetUrl;
    }

    // Validate URL against SSRF
    if (!isValidAuditUrl(targetUrl)) {
      throw new Error("Invalid or disallowed URL");
    }

    // Fetch site with AGGRESSIVE timeout for speed
    let htmlClean = "";
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch(targetUrl, {
        headers: {
          "User-Agent": "AuditAI-Bot/1.0"
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const htmlFull = await response.text();
        htmlClean = htmlFull
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
          .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
          .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, "")
          .substring(0, 6000);
      } else {
        console.log("Site returned non-200, proceeding with URL-only analysis");
      }
    } catch (e) {
      console.log("Site fetch skipped/timed-out, proceeding with URL-only analysis");
      htmlClean = `Site unreachable or timeout. Base analysis on URL: ${targetUrl}. Assume standard tech stack.`;
    }

    const hasSSL = targetUrl.startsWith("https://");

    const analysisPrompt = `Analyze ${targetUrl} (SSL: ${hasSSL}). Context: ${htmlClean.slice(0, 5000)}

    Return exactly 5 CRITICAL technical issues.
    Format: JSON.
    
    {
      "overallScore": 0-100,
      "infrastructureHealth": "Good|Fair|Critical",
      "securityRisk": "Low|Medium|High",
      "marketMetrics": {
        "authorityScore": 0-100,
        "organicTraffic": "1k+",
        "organicKeywords": "500+",
        "backlinks": "100+"
      },
      "categoryScores": { "seo": 0-100, "performance": 0-100, "ux": 0-100, "content": 0-100, "security": 0-100 },
      "revenueImpact": 0,
      "issues": [
        {
          "title": "Short Title",
          "description": "Short desc",
          "category": "seo|performance|ux|security",
          "severity": "critical|warning",
          "impact": "Low|Medium|High",
          "fix_code": "code snippet",
          "difficulty": 1-5,
          "time_estimate": "1h"
        }
      ]
    }`;

    let analysis = {};

    if (openaiApiKey) {
      const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openaiApiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "JSON only. Speed is priority." },
            { role: "user", content: analysisPrompt }
          ],
          response_format: { type: "json_object" },
          temperature: 0.3,
          max_tokens: 1000
        })
      });

      if (!aiRes.ok) {
        throw new Error(`AI API failed: ${aiRes.status}`);
      }

      const aiData = await aiRes.json();
      analysis = JSON.parse(aiData.choices[0].message.content);
    } else {
      analysis = {
        overallScore: 65,
        issues: [{ title: "Demo Issue", category: "seo", severity: "warning", fix_code: "<!-- demo -->" }]
      };
    }

    // Insert Issues
    let issuesRaw = analysis.issues || [];
    if (issuesRaw.length === 0) issuesRaw = [{ title: "General Optimization", category: "performance", severity: "info", fix_code: "<!-- check logs -->" }];

    const issuesToInsert = issuesRaw.map((i: any) => ({
      audit_id: activeAuditId,
      title: i.title?.substring(0, 200) || "Issue",
      description: i.description || "Fix required",
      category: (i.category || "seo").toLowerCase(),
      severity: ["critical", "warning", "info"].includes(i.severity?.toLowerCase()) ? i.severity.toLowerCase() : "warning",
      impact: i.impact || "Medium",
      recommendation: i.solution || "Fix usage",
      fix_code: i.fix_code || "",
      fix_steps: i.fix_steps || ["Analyze", "Implement"],
      difficulty: i.difficulty || 2,
      time_estimate: i.time_estimate || "1h",
      revenue_impact: i.revenue_impact || 0,
      current_score: 50,
      potential_score: 80
    }));

    if (analysis.marketMetrics) {
      issuesToInsert.push({
        audit_id: activeAuditId,
        title: "Market Intelligence Overview",
        description: JSON.stringify({
          ...analysis.marketMetrics,
          infrastructureHealth: analysis.infrastructureHealth || "Good",
          securityRisk: analysis.securityRisk || "Low"
        }),
        category: "intelligence",
        severity: "info",
        recommendation: "strategic_data"
      });
    }

    await supabase.from("audit_issues").delete().eq("audit_id", activeAuditId);
    if (issuesToInsert.length > 0) {
      await supabase.from("audit_issues").insert(issuesToInsert);
    }

    // Finalize
    await supabase.from("audits").update({
      status: "completed",
      overall_score: analysis.overallScore || 60,
      seo_score: analysis.categoryScores?.seo || 60,
      performance_score_desktop: analysis.categoryScores?.performance || 60,
      performance_score_mobile: (analysis.categoryScores?.performance || 60) - 10,
      ux_score: analysis.categoryScores?.ux || 60,
      content_score: analysis.categoryScores?.content || 60,
      security_score: analysis.categoryScores?.security || 60,
      revenue_impact: analysis.revenueImpact || 1200,
      completed_at: new Date().toISOString()
    }).eq("id", activeAuditId);

    return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });

  } catch (error) {
    console.error("Audit Error:", error);
    if (activeAuditId && supabase) {
      await supabase.from("audits").update({
        status: "failed",
      }).eq("id", activeAuditId);
    }
    return new Response(JSON.stringify({ error: "An error occurred processing the audit" }), { status: 500, headers: corsHeaders });
  }
});
