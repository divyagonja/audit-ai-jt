import { supabase } from "@/integrations/supabase/client";

export interface Mention {
    source: string;
    content: string;
    sentiment: 'Positive' | 'Neutral' | 'Negative';
    score: number; // 0-100
    aiDraftReply: string;
    platform: 'Twitter' | 'Reddit' | 'News' | 'Trustpilot';
}

export interface BrandIntelligence {
    brandName: string;
    overallSentiment: number; // 0-100
    sentimentTrend: 'Up' | 'Down' | 'Stable';
    mentions: Mention[];
    alertLevel: 'Low' | 'Medium' | 'High';
}

export async function analyzeBrandSentiment(brandName: string): Promise<BrandIntelligence> {
    const prompt = `Act as a Brand Reputation Manager. Analyze the online sentiment for the brand: "${brandName}".
    
    1. Scan (simulated) for 5 recent mentions across Twitter, Reddit, and News.
    2. Assign a sentiment score (0-100) to each.
    3. Draft a professional, AI-powered response to each mention (de-escalating if negative, appreciative if positive).
    4. Calculate an Overall Brand Sentiment Score.

    Return the result in valid JSON format:
    {
        "brandName": "${brandName}",
        "overallSentiment": 74,
        "sentimentTrend": "Up",
        "alertLevel": "Low",
        "mentions": [
            {
                "source": "@User123 on Twitter",
                "content": "Just tried ${brandName} and it's super fast! Loving the new UI.",
                "sentiment": "Positive",
                "score": 95,
                "aiDraftReply": "Thanks for the love! We worked hard on that speed update. 🚀",
                "platform": "Twitter"
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
        console.error("Brand Intel Error:", error);
        // Fallback Mock Data
        return {
            brandName,
            overallSentiment: 68,
            sentimentTrend: "Stable",
            alertLevel: "Medium",
            mentions: [
                {
                    source: "r/SaaS on Reddit",
                    content: `Is ${brandName} worth the price? I feel like the competitor has more features for less.`,
                    sentiment: "Neutral",
                    score: 50,
                    aiDraftReply: "Great question! While we might seem higher priced, our AI accuracy is 40% higher than the competition. Would you like a 1-on-1 demo to see the difference?",
                    platform: "Reddit"
                },
                {
                    source: "Trustpilot Review",
                    content: `Support was slow to respond to my bug report. Fixed now, but frustrating.`,
                    sentiment: "Negative",
                    score: 30,
                    aiDraftReply: "We sincerely apologize for the delay. We are currently expanding our support team to ensure responses within 2 hours. Glad the issue is resolved!",
                    platform: "Trustpilot"
                },
                {
                    source: "TechCrunch Mention",
                    content: `${brandName} is leading the charge in the new 'Actionable AI' SEO category.`,
                    sentiment: "Positive",
                    score: 98,
                    aiDraftReply: "Honored to be featured! Our goal is to make SEO professional's lives easier with smarter automation.",
                    platform: "News"
                }
            ]
        };
    }
}
