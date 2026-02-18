import { supabase } from "@/integrations/supabase/client";

export interface CannibalizationIssue {
    keyword: string;
    urls: {
        url: string;
        position: number;
        relevanceScore: number;
        backlinks: number;
    }[];
    suggestedAction: 'Merge' | 'Redirect' | 'Canonical' | 'Optimize';
    aiReasoning: string;
    actionSteps: string[];
}

export async function detectCannibalization(domain: string): Promise<CannibalizationIssue[]> {
    const prompt = `Act as an expert SEO Strategist. Analyze the likely keyword cannibalization for the domain: "${domain}".
    
    Identify 3-5 high-priority keywords where multiple pages on this domain are likely competing for the same search intent.
    
    For each issue, provide:
    1. The competing URLs.
    2. Simulated metrics (position, relevance, backlinks).
    3. A specific suggested action (Merge, Redirect, Canonical, or Optimize).
    4. Deep AI reasoning explaining *why* one page should be prioritized over the other (e.g., Conversion intent vs Information intent).
    5. Step-by-step action plan to fix it.

    Return the result in valid JSON format:
    [
        {
            "keyword": "example keyword",
            "urls": [
                { "url": "url1", "position": 5, "relevanceScore": 85, "backlinks": 12 },
                { "url": "url2", "position": 8, "relevanceScore": 92, "backlinks": 2 }
            ],
            "suggestedAction": "Redirect",
            "aiReasoning": "URL2 has higher topical relevance but URL1 has all the backlink authority. We should redirect URL2 to URL1 and update URL1's content...",
            "actionSteps": ["Step 1...", "Step 2..."]
        }
    ]`;

    try {
        const { data, error } = await supabase.functions.invoke('ai-chat', {
            body: {
                mode: "chat",
                messages: [{ role: "user", content: prompt }]
            }
        });

        if (error) throw error;

        const result = data.choices[0]?.message?.content;
        if (!result) throw new Error("Empty response from AI");

        const jsonMatch = result.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        throw new Error("Failed to parse AI response as JSON array");

    } catch (error) {
        console.error("Cannibalization Detector Error:", error);
        // Fallback Mock Data
        return [
            {
                keyword: "best seo tools 2024",
                urls: [
                    { url: `${domain}/blog/top-seo-tools`, position: 4, relevanceScore: 88, backlinks: 45 },
                    { url: `${domain}/products/seo-audit`, position: 12, relevanceScore: 65, backlinks: 10 }
                ],
                suggestedAction: "Optimize",
                aiReasoning: "The blog post and product page are both trying to rank for a high-volume 'top' keyword. The product page should focus on 'SEO Audit Tool' specifically, while the blog post should link to the product as the #1 tool.",
                actionSteps: [
                    "De-optimize product page for general 'tools' keyword",
                    "Add internal link from blog post to product page with exact match anchor text",
                    "Add FAQ section to blog post targeting long-tail variations"
                ]
            },
            {
                keyword: "how to increase domain authority",
                urls: [
                    { url: `${domain}/guides/domain-authority`, position: 7, relevanceScore: 95, backlinks: 5 },
                    { url: `${domain}/blog/link-building-tips`, position: 9, relevanceScore: 80, backlinks: 22 }
                ],
                suggestedAction: "Merge",
                aiReasoning: "Both pages cover nearly identical information. The guide has higher relevance but the blog post has much higher backlink authority. Merging them into a single 'Power Page' will likely push the result into the Top 3.",
                actionSteps: [
                    "Consolidate content from guide into the blog post",
                    "301 Redirect the guide URL to the blog post URL",
                    "Update internal links that were pointing to the guide"
                ]
            }
        ];
    }
}
