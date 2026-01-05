import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, auditContext } = await req.json();
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not configured");
    }

    const systemPrompt = `You are "AuditAI Intelligence", an elite digital strategy and SEO expert emulating the analytical depth of SEMrush, Ahrefs, and Google Search Console. 

Your goal is to provide authoritative, data-backed, and highly technical answers to any questions about website optimization, SEO, performance, UX, and security.

${auditContext ? `
[CONTEXT: AUDIT DATA FOR ${auditContext.website}]
- Global Health Score: ${auditContext.score}/100
- Total Technical Issues: ${auditContext.issueCount}
- Audited Scopes: ${auditContext.categories?.join(', ')}

[TOP ISSUES DETECTED]
${auditContext.issues?.map((i: any) => `- [${i.severity.toUpperCase()}] ${i.title}: ${i.description}`).join('\n')}
` : 'No specific audit context provided yet. Focus on general elite SEO and web optimization best practices.'}

GUIDELINES:
1. Provide technical depth. If asked how to fix something, provide specific code (HTML, CSS, JS, SQL, or server config).
2. Be critical and strategic. Don't just list facts; provide a roadmap for growth.
3. If the user asks about general SEO, use your internal knowledge base to explain concepts like E-E-A-T, Core Web Vitals, and Semantic Search.
4. Always prioritize "Quick Wins" vs "Long-term Strategy".
5. Maintain a professional, executive-level tone.

When providing code, ensure it is clean and production-ready. Use markdown for all formatting.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Usage limit reached. Please check your OpenAI account." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("OpenAI API error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("AI chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
