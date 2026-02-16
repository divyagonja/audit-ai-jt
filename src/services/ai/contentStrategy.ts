import { supabase } from "@/integrations/supabase/client";

export interface ContentBrief {
    briefId: string;
    topic: string;
    targetAudience: string;
    tone: string;
    wordCountTarget: number;
    suggestedTitle: string;
    metaDescription: string;
    structure: {
        h1: string;
        sections: {
            heading: string;
            talkingPoints: string[];
            keywordsToInclude: string[];
        }[];
    };
    competitorAnalysis: {
        topCompetitorUrl: string;
        gap: string; // What they are missing that we should add
    };
    questionsToAnswer: string[];
    internalLinkingSuggestions: string[];
}

export async function generateContentBrief(topic: string, targetAudience: string = "General Public", tone: string = "Informative"): Promise<ContentBrief> {
    const prompt = `Act as an expert SEO Strategist and Content Architect. I need a comprehensive Content Brief for the topic: "${topic}".
    Target Audience: ${targetAudience}
    Tone: ${tone}

    The goal is to outrank competitors by providing more depth and value.
    Analyze the likely search intent and provide a structured outline.

    Return the result in valid JSON format with the following structure:
    {
        "suggestedTitle": "Catchy, SEO-optimized title",
        "metaDescription": "Compelling meta description under 160 characters",
        "wordCountTarget": number,
        "structure": {
            "h1": "Main Headline",
            "sections": [
                {
                    "heading": "H2 or H3 Heading",
                    "talkingPoints": ["point 1", "point 2", "point 3"],
                    "keywordsToInclude": ["keyword1", "keyword2"]
                }
            ]
        },
        "competitorAnalysis": {
            "topCompetitorUrl": "e.g., specific competitor URL or 'General Industry Leader'",
            "gap": "What is missing in current top results that we should cover"
        },
        "questionsToAnswer": ["Question 1 (People Also Ask)", "Question 2"],
        "internalLinkingSuggestions": ["Related topic 1", "Related topic 2"]
    }
    
    Ensure the JSON is valid and parsed correctly.`;

    try {
        const { data, error } = await supabase.functions.invoke('ai-chat', {
            body: {
                mode: "chat", // Using generic chat mode or a new mode if backend supports it. 'chat' is usually safe.
                messages: [{ role: "user", content: prompt }]
            }
        });

        if (error) throw error;

        const result = data.choices[0]?.message?.content;
        if (!result) throw new Error("Empty response from AI");

        // Attempt to parse JSON, finding the first '{' and last '}'
        const jsonMatch = result.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            return {
                briefId: crypto.randomUUID(),
                topic,
                targetAudience,
                tone,
                ...parsed
            };
        } else {
            throw new Error("Failed to parse AI response as JSON");
        }
    } catch (error) {
        console.error("Content Brief Generator Error:", error);
        // Fallback Mock Data
        return {
            briefId: "mock-1",
            topic: topic,
            targetAudience: targetAudience,
            tone: tone,
            wordCountTarget: 1500,
            suggestedTitle: `The Ultimate Guide to ${topic} in 2024`,
            metaDescription: `Learn everything about ${topic}. This comprehensive guide covers strategies, tips, and best practices for ${targetAudience}.`,
            structure: {
                h1: `Complete Guide to ${topic}`,
                sections: [
                    {
                        heading: "Introduction",
                        talkingPoints: [`Define ${topic}`, "Importance in current landscape", "Brief overview of what will be covered"],
                        keywordsToInclude: [topic, "definition", "guide"]
                    },
                    {
                        heading: "Key Benefits",
                        talkingPoints: ["Benefit 1", "Benefit 2", "Real-world examples"],
                        keywordsToInclude: ["advantages", "benefits", "why use"]
                    },
                    {
                        heading: "Advanced Strategies",
                        talkingPoints: ["Strategy A", "Strategy B", "Common pitfalls to avoid"],
                        keywordsToInclude: ["strategies", "tips", "hacks"]
                    }
                ]
            },
            competitorAnalysis: {
                topCompetitorUrl: "example-competitor.com",
                gap: "Most competitors fail to address the practical implementation steps."
            },
            questionsToAnswer: [`What is ${topic}?`, `How does ${topic} work?`, `Is ${topic} worth it?`],
            internalLinkingSuggestions: ["Related Service Page", "Case Studies"]
        };
    }
}
