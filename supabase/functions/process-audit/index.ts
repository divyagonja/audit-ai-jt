import "https://deno.land/x/xhr@0.1.0/mod.ts";
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
  fix_code?: string;
  fix_steps?: string[];
  difficulty?: number;
  time_estimate?: string;
  revenue_impact?: number;
  current_score?: number;
  potential_score?: number;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { auditId, url, scopes } = await req.json();
    
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    const supabase = createClient(supabaseUrl, supabaseKey);

    if (!openaiApiKey) {
      throw new Error("OPENAI_API_KEY is not configured");
    }

    // Update audit status to processing
    await supabase
      .from("audits")
      .update({ status: "processing" })
      .eq("id", auditId);

    console.log("Processing audit for URL:", url);

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
      
      console.log("Fetched page - Title:", pageTitle, "Load time:", loadTime, "ms");
    } catch (fetchError) {
      console.error("Error fetching URL:", fetchError);
    }

    // Use OpenAI to analyze the page with detailed code snippets
    const analysisPrompt = `You are an expert website auditor. Analyze this website comprehensively.

URL: ${url}
Page Title: ${pageTitle || "Not found"}
Meta Description: ${metaDescription || "Not found"}
Load Time: ${loadTime}ms
SSL: ${hasSSL ? "Yes" : "No"}
Scopes to analyze: ${scopes.join(", ")}

HTML Content (first 15000 chars):
${pageContent.substring(0, 15000)}

Return a JSON object with this EXACT structure (no markdown, just pure JSON):
{
  "overallScore": <number 0-100>,
  "categoryScores": {
    "seo": <number 0-100>,
    "performance": <number 0-100>,
    "ux": <number 0-100>,
    "content": <number 0-100>,
    "security": <number 0-100>
  },
  "revenueImpact": <estimated monthly revenue impact in dollars>,
  "issues": [
    {
      "title": "<specific issue title>",
      "description": "<detailed description of the problem>",
      "category": "<seo|performance|ux|content|security>",
      "severity": "<critical|high|medium|low>",
      "impact": "<business impact - be specific about revenue/conversion effects>",
      "solution": "<brief explanation of the fix>",
      "fix_code": "<ACTUAL working code snippet to fix this issue - HTML, CSS, JS, or meta tags. Make it real and implementable>",
      "fix_steps": ["Step 1: ...", "Step 2: ...", "Step 3: ..."],
      "difficulty": <1-5 stars>,
      "time_estimate": "<e.g., '2-3 hours' or '1-2 days'>",
      "revenue_impact": <estimated monthly dollar impact of this fix>,
      "current_score": <current score for this aspect 0-100>,
      "potential_score": <score after fix 0-100>
    }
  ]
}

IMPORTANT REQUIREMENTS:
1. Provide 10-15 realistic, specific issues based on actual analysis
2. EVERY issue MUST have real, implementable fix_code - actual HTML/CSS/JS code snippets
3. fix_steps should be 3-5 clear implementation steps
4. Be specific about revenue_impact estimates
5. Include a mix of critical, high, medium, and low severity issues
6. Code snippets should be complete and ready to copy-paste

Example fix_code for missing meta description:
<meta name="description" content="Your compelling page description here that accurately describes the page content and includes relevant keywords. Keep it under 160 characters.">

Example fix_code for slow image loading:
<img src="hero.jpg" alt="Hero image" loading="lazy" decoding="async" width="1200" height="600">`;

    console.log("Calling OpenAI API...");

    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { 
            role: "system", 
            content: "You are an expert website auditor specializing in SEO, performance, UX, security, and content optimization. You always provide specific, actionable code snippets that developers can immediately implement. Return only valid JSON without any markdown formatting." 
          },
          { role: "user", content: analysisPrompt },
        ],
        max_tokens: 4000,
        temperature: 0.7,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("OpenAI API error:", aiResponse.status, errorText);
      throw new Error(`OpenAI analysis failed: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    let analysisText = aiData.choices?.[0]?.message?.content || "";
    
    console.log("Received AI response, parsing...");
    
    // Clean up the response - remove markdown code blocks if present
    analysisText = analysisText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    
    let analysis;
    try {
      analysis = JSON.parse(analysisText);
      console.log("Successfully parsed AI analysis with", analysis.issues?.length, "issues");
    } catch (parseError) {
      console.error("Failed to parse AI response:", analysisText.substring(0, 500));
      // Fallback analysis with real code snippets
      analysis = {
        overallScore: 65,
        revenueImpact: 2500,
        categoryScores: {
          seo: pageTitle ? 70 : 40,
          performance: loadTime < 2000 ? 75 : 50,
          ux: 65,
          content: metaDescription ? 70 : 45,
          security: hasSSL ? 80 : 30,
        },
        issues: [
          {
            title: hasSSL ? "Good SSL implementation" : "Missing SSL Certificate",
            description: hasSSL ? "Website uses HTTPS" : "Website does not use HTTPS which is critical for security and SEO",
            category: "security",
            severity: hasSSL ? "low" : "critical",
            impact: hasSSL ? "Positive security signal" : "Loss of user trust and SEO ranking penalty. Can reduce conversions by 30%.",
            solution: hasSSL ? "Continue maintaining SSL" : "Install an SSL certificate and redirect all HTTP traffic to HTTPS",
            fix_code: hasSSL ? "# SSL is properly configured" : `# Apache .htaccess redirect
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Or for Nginx
server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}`,
            fix_steps: hasSSL 
              ? ["SSL is already configured correctly"] 
              : ["Purchase/obtain SSL certificate", "Install certificate on server", "Configure redirect from HTTP to HTTPS", "Update all internal links to HTTPS"],
            difficulty: hasSSL ? 1 : 3,
            time_estimate: hasSSL ? "N/A" : "2-4 hours",
            revenue_impact: hasSSL ? 0 : 1500,
            current_score: hasSSL ? 80 : 20,
            potential_score: 90,
          },
          {
            title: pageTitle ? "Title tag present" : "Missing or Empty Title Tag",
            description: pageTitle ? `Title: "${pageTitle}"` : "No title tag found on the page",
            category: "seo",
            severity: pageTitle ? "low" : "critical",
            impact: pageTitle ? "Good for SEO" : "Major SEO issue - search engines use title for rankings. Missing titles can reduce organic traffic by 50%.",
            solution: pageTitle ? "Title is set" : "Add a descriptive, keyword-rich title tag under 60 characters",
            fix_code: pageTitle 
              ? `<!-- Current title is good -->
<title>${pageTitle}</title>` 
              : `<!-- Add this in your <head> section -->
<title>Your Primary Keyword | Brand Name - Compelling Description</title>

<!-- For dynamic pages, use template -->
<title>{{page.title}} | {{site.name}}</title>`,
            fix_steps: pageTitle 
              ? ["Title tag is properly configured"] 
              : ["Identify primary keyword for the page", "Write compelling title under 60 characters", "Add title tag in <head> section", "Verify with browser dev tools"],
            difficulty: pageTitle ? 1 : 2,
            time_estimate: pageTitle ? "N/A" : "30 minutes",
            revenue_impact: pageTitle ? 0 : 800,
            current_score: pageTitle ? 75 : 30,
            potential_score: 85,
          },
          {
            title: metaDescription ? "Meta description present" : "Missing Meta Description",
            description: metaDescription ? `Description: "${metaDescription}"` : "No meta description found",
            category: "seo",
            severity: metaDescription ? "low" : "high",
            impact: metaDescription ? "Good click-through rates" : "Missing meta descriptions reduce CTR by 20-30%",
            solution: "Add compelling meta description under 160 characters",
            fix_code: `<!-- Add in <head> section -->
<meta name="description" content="Your compelling page description that includes relevant keywords and encourages clicks. Keep under 160 characters for optimal display.">

<!-- For dynamic content -->
<meta name="description" content="{{page.meta_description}}">`,
            fix_steps: ["Write compelling 150-160 character description", "Include primary keyword naturally", "Add call-to-action if appropriate", "Test in SERP preview tool"],
            difficulty: 2,
            time_estimate: "1 hour",
            revenue_impact: 600,
            current_score: metaDescription ? 70 : 35,
            potential_score: 85,
          },
          {
            title: loadTime > 3000 ? "Slow Page Load Time" : "Page Load Performance",
            description: `Current load time: ${loadTime}ms. ${loadTime > 3000 ? "This exceeds Google's recommended 3 second threshold." : "Load time is acceptable but could be improved."}`,
            category: "performance",
            severity: loadTime > 5000 ? "critical" : loadTime > 3000 ? "high" : "medium",
            impact: loadTime > 3000 ? "Every second of delay reduces conversions by 7%. Slow sites rank lower in Google." : "Minor performance improvements possible",
            solution: "Optimize images, enable caching, minify resources",
            fix_code: `<!-- Lazy load images -->
<img src="image.jpg" loading="lazy" alt="Description" width="800" height="600">

<!-- Preload critical resources -->
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/css/critical.css" as="style">

<!-- Defer non-critical JavaScript -->
<script src="analytics.js" defer></script>

<!-- Add resource hints -->
<link rel="dns-prefetch" href="//cdn.example.com">
<link rel="preconnect" href="https://fonts.googleapis.com">`,
            fix_steps: ["Audit and compress images", "Enable browser caching", "Minify CSS and JavaScript", "Use CDN for static assets", "Implement lazy loading"],
            difficulty: 3,
            time_estimate: "4-6 hours",
            revenue_impact: loadTime > 3000 ? 1200 : 400,
            current_score: loadTime < 2000 ? 80 : loadTime < 3000 ? 65 : 40,
            potential_score: 85,
          },
        ],
      };
    }

    // Update audit with scores
    const criticalCount = analysis.issues.filter((i: AuditIssue) => i.severity === "critical").length;
    const warningCount = analysis.issues.filter((i: AuditIssue) => i.severity === "high" || i.severity === "medium").length;
    const infoCount = analysis.issues.filter((i: AuditIssue) => i.severity === "low").length;

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
        revenue_impact: analysis.revenueImpact || 0,
        critical_issues: criticalCount,
        warning_issues: warningCount,
        info_issues: infoCount,
        completed_at: new Date().toISOString(),
      })
      .eq("id", auditId);

    console.log("Updated audit record, inserting issues...");

    // Insert issues with detailed code snippets
    const issuesToInsert = analysis.issues.map((issue: AuditIssue) => ({
      audit_id: auditId,
      title: issue.title,
      description: issue.description,
      category: issue.category,
      severity: issue.severity,
      impact: issue.impact,
      recommendation: issue.solution,
      fix_code: issue.fix_code || null,
      fix_steps: issue.fix_steps || null,
      difficulty: issue.difficulty || 3,
      time_estimate: issue.time_estimate || "2-4 hours",
      revenue_impact: issue.revenue_impact || 0,
      current_score: issue.current_score || 50,
      potential_score: issue.potential_score || 80,
    }));

    await supabase.from("audit_issues").insert(issuesToInsert);

    console.log("Audit completed successfully with", issuesToInsert.length, "issues");

    return new Response(JSON.stringify({ 
      success: true, 
      score: analysis.overallScore,
      issueCount: analysis.issues.length,
      revenueImpact: analysis.revenueImpact
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
