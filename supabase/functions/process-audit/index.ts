import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AuditIssue {
  title: string;
  description: string;
  category: string;
  severity: "critical" | "high" | "medium" | "low";
  impact: string;
  solution: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { auditId, url, scopes } = await req.json();
    
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Update audit status to processing
    await supabase
      .from("audits")
      .update({ status: "processing" })
      .eq("id", auditId);

    // Fetch the website content
    let pageContent = "";
    let pageTitle = "";
    let metaDescription = "";
    let hasSSL = false;
    let loadTime = 0;

    try {
      const startTime = Date.now();
      const response = await fetch(url, {
        headers: { "User-Agent": "AuditAI Bot/1.0" },
      });
      loadTime = Date.now() - startTime;
      hasSSL = url.startsWith("https://");
      
      const html = await response.text();
      pageContent = html;
      
      // Extract title
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      pageTitle = titleMatch ? titleMatch[1].trim() : "";
      
      // Extract meta description
      const metaMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
      metaDescription = metaMatch ? metaMatch[1].trim() : "";
    } catch (fetchError) {
      console.error("Error fetching URL:", fetchError);
    }

    // Use AI to analyze the page
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const analysisPrompt = `Analyze this website for a comprehensive audit. URL: ${url}

Page Title: ${pageTitle || "Not found"}
Meta Description: ${metaDescription || "Not found"}
Load Time: ${loadTime}ms
SSL: ${hasSSL ? "Yes" : "No"}

Scopes to analyze: ${scopes.join(", ")}

HTML Content (first 15000 chars):
${pageContent.substring(0, 15000)}

Return a JSON object with this exact structure:
{
  "overallScore": <number 0-100>,
  "categoryScores": {
    "seo": <number 0-100>,
    "performance": <number 0-100>,
    "ux": <number 0-100>,
    "content": <number 0-100>,
    "mobile": <number 0-100>,
    "security": <number 0-100>
  },
  "issues": [
    {
      "title": "<issue title>",
      "description": "<detailed description>",
      "category": "<seo|performance|ux|content|mobile|security>",
      "severity": "<critical|high|medium|low>",
      "impact": "<business impact explanation>",
      "solution": "<how to fix it>"
    }
  ]
}

Provide 8-15 realistic issues based on actual analysis. Be specific and actionable.`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You are an expert website auditor. Return only valid JSON, no markdown." },
          { role: "user", content: analysisPrompt },
        ],
      }),
    });

    if (!aiResponse.ok) {
      throw new Error(`AI analysis failed: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    let analysisText = aiData.choices?.[0]?.message?.content || "";
    
    // Clean up the response - remove markdown code blocks if present
    analysisText = analysisText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    
    let analysis;
    try {
      analysis = JSON.parse(analysisText);
    } catch (parseError) {
      console.error("Failed to parse AI response:", analysisText);
      // Fallback analysis
      analysis = {
        overallScore: 65,
        categoryScores: {
          seo: pageTitle ? 70 : 40,
          performance: loadTime < 2000 ? 75 : 50,
          ux: 65,
          content: metaDescription ? 70 : 45,
          mobile: 60,
          security: hasSSL ? 80 : 30,
        },
        issues: [
          {
            title: hasSSL ? "Good SSL implementation" : "Missing SSL Certificate",
            description: hasSSL ? "Website uses HTTPS" : "Website does not use HTTPS which is critical for security and SEO",
            category: "security",
            severity: hasSSL ? "low" : "critical",
            impact: hasSSL ? "Positive security signal" : "Loss of user trust and SEO ranking penalty",
            solution: hasSSL ? "Continue maintaining SSL" : "Install an SSL certificate and redirect all HTTP traffic to HTTPS",
          },
          {
            title: pageTitle ? "Title tag present" : "Missing or Empty Title Tag",
            description: pageTitle ? `Title: "${pageTitle}"` : "No title tag found on the page",
            category: "seo",
            severity: pageTitle ? "low" : "critical",
            impact: pageTitle ? "Good for SEO" : "Major SEO issue - search engines use title for rankings",
            solution: pageTitle ? "Title is set" : "Add a descriptive, keyword-rich title tag under 60 characters",
          },
        ],
      };
    }

    // Update audit with scores
    await supabase
      .from("audits")
      .update({
        status: "completed",
        overall_score: analysis.overallScore,
        seo_score: analysis.categoryScores.seo,
        performance_score: analysis.categoryScores.performance,
        ux_score: analysis.categoryScores.ux,
        content_score: analysis.categoryScores.content,
        security_score: analysis.categoryScores.security,
        completed_at: new Date().toISOString(),
      })
      .eq("id", auditId);

    // Insert issues
    const issuesToInsert = analysis.issues.map((issue: AuditIssue) => ({
      audit_id: auditId,
      title: issue.title,
      description: issue.description,
      category: issue.category,
      severity: issue.severity,
      impact: issue.impact,
      recommendation: issue.solution,
    }));

    await supabase.from("audit_issues").insert(issuesToInsert);

    return new Response(JSON.stringify({ 
      success: true, 
      score: analysis.overallScore,
      issueCount: analysis.issues.length 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Audit processing error:", error);
    
    // Try to update audit status to failed
    try {
      const { auditId } = await req.json();
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(supabaseUrl, supabaseKey);
      await supabase.from("audits").update({ status: "failed" }).eq("id", auditId);
    } catch {}

    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Audit processing failed" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
