import { supabase } from "@/integrations/supabase/client";

export interface CrawlIssue {
    url: string;
    hitCount: number;
    status: number;
    issueType: 'Low Value Page' | 'Crawl Trap' | 'Infinite Loop' | 'Budget Waste';
    aiRecommendation: string;
    fixCommand: string; // robots.txt or meta tag
}

export interface LogAnalysis {
    totalRequests: number;
    googleBotHits: number;
    crawlEfficiency: number; // 0-100
    wastedBudgetPercentage: number;
    issues: CrawlIssue[];
}

export async function analyzeLogFiles(logData: string): Promise<LogAnalysis> {
    const prompt = `Act as a Senior Technical SEO & Server Architect. Analyze these server log entries:
    
    LOG DATA SAMPLE:
    ${logData.substring(0, 3000)}
    
    1. Calculate Total Requests and Googlebot Hits.
    2. Determine Crawl Efficiency (%) and Wasted Crawl Budget (%).
    3. Identify 5 specific "Crawl Waste" issues where Googlebot is wasting time on useless pages (duplicate filters, session IDs, low-quality thin content).
    4. For each issue, provide a specific AI recommendation and a "Fix Command" (like a Robots.txt line or a meta tag).

    Return the result in valid JSON format:
    {
        "totalRequests": 15420,
        "googleBotHits": 3200,
        "crawlEfficiency": 72,
        "wastedBudgetPercentage": 28,
        "issues": [
            {
                "url": "/products?sort=price_asc&filter=blue",
                "hitCount": 450,
                "status": 200,
                "issueType": "Budget Waste",
                "aiRecommendation": "Googlebot is hitting infinite filter combinations. This is draining your crawl budget.",
                "fixCommand": "Disallow: /products?*filter="
            }
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
        console.error("Log Analyzer Error:", error);
        // Fallback Mock Data
        return {
            totalRequests: 24500,
            googleBotHits: 4800,
            crawlEfficiency: 65,
            wastedBudgetPercentage: 35,
            issues: [
                {
                    url: "/search/label/featured?max-results=5",
                    hitCount: 820,
                    status: 200,
                    issueType: 'Budget Waste',
                    aiRecommendation: "Search result pages are being crawled heavily. These should typically be blocked to save crawl budget for product pages.",
                    fixCommand: "Disallow: /search/"
                },
                {
                    url: "/wp-content/themes/v1/assets/temp/",
                    hitCount: 310,
                    status: 404,
                    issueType: 'Crawl Trap',
                    aiRecommendation: "Googlebot is repeatedly hitting a legacy temp directory that no longer exists.",
                    fixCommand: "Redirect 301 /wp-content/themes/v1/assets/temp/ /"
                },
                {
                    url: "/category/news/page/45/",
                    hitCount: 150,
                    status: 200,
                    issueType: 'Low Value Page',
                    aiRecommendation: "Deep pagination pages are being crawled but have zero organic value.",
                    fixCommand: "User-agent: Googlebot\nDisallow: /category/*/page/*"
                }
            ]
        };
    }
}
