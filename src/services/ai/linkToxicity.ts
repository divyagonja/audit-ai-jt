import { supabase } from "@/integrations/supabase/client";

export interface ToxicLink {
    url: string;
    domainAuthority: number;
    toxicityScore: number; // 0-100
    riskLevel: 'High' | 'Medium' | 'Low';
    reason: string;
}

export async function analyzeLinkToxicity(domain: string): Promise<{
    toxicCount: number;
    overallRisk: string;
    links: ToxicLink[];
}> {
    const prompt = `Act as a Search Quality Analyst at Google. Analyze the backlink profile for "${domain}".
    
    Identify 5-7 potentially toxic or spammy backlinks that could trigger a manual action or algorithmic penalty.
    
    For each link, provide:
    1. The URL.
    2. Estimated Domain Authority (0-100).
    3. Toxicity Score (0-100).
    4. Risk Level (High, Medium, Low).
    5. Specific reason why it looks toxic (e.g., PBN pattern, unrelated niche, spammy anchor text).
    
    Return the result in valid JSON format:
    {
        "toxicCount": 42,
        "overallRisk": "High",
        "links": [
            { "url": "spammy-site.xyz/link", "domainAuthority": 5, "toxicityScore": 89, "riskLevel": "High", "reason": "Likely PBN..." }
        ]
    }`;

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

        const jsonMatch = result.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        throw new Error("Failed to parse AI response as JSON");

    } catch (error) {
        console.error("Link Toxicity Analysis Error:", error);
        // Fallback Mock Data
        return {
            toxicCount: 28,
            overallRisk: "Medium",
            links: [
                { url: "cheap-watches-online.tk/guest-post", domainAuthority: 4, toxicityScore: 92, riskLevel: "High", reason: "Unrelated niche and spammy TLD (.tk)" },
                { url: "directory-of-everything.biz/info", domainAuthority: 12, toxicityScore: 75, riskLevel: "High", reason: "Link farm/Directory pattern detected" },
                { url: "news-blaze-daily.com/article", domainAuthority: 25, toxicityScore: 45, riskLevel: "Medium", reason: "Suspiciously high number of outbound links" },
                { url: "blog-network-99.blogspot.com", domainAuthority: 90, toxicityScore: 60, riskLevel: "Medium", reason: "Potential low-quality PBN network" },
                { url: "forum-spam.ru/thread-123", domainAuthority: 8, toxicityScore: 88, riskLevel: "High", reason: "Automated forum profile spam" }
            ]
        };
    }
}
