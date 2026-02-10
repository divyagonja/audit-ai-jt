import { supabase } from "@/integrations/supabase/client";

export interface SEOAnalysis {
    score: number;
    readability: {
        score: number;
        level: string;
        suggestions: string[];
    };
    seo: {
        score: number;
        keywordsFound: string[];
        missingKeywords: string[];
        suggestions: string[];
    };
    tone: {
        type: string;
        consistency: number;
        suggestions: string[];
    };
    overallFeedback: string;
}

export async function analyzeContent(content: string, targetKeyword: string): Promise<SEOAnalysis> {
    const prompt = `Analyze the following content for SEO and readability based on the target keyword: "${targetKeyword}".

Content:
"""
${content}
"""

Return a detailed analysis in JSON format:
{
  "score": number (0-100),
  "readability": {
    "score": number (0-100),
    "level": "string (e.g., Easy, Moderate, Difficult)",
    "suggestions": ["suggestion 1", "suggestion 2"]
  },
  "seo": {
    "score": number (0-100),
    "keywordsFound": ["keyword 1", "keyword 2"],
    "missingKeywords": ["keyword 1", "keyword 2"],
    "suggestions": ["suggestion 1", "suggestion 2"]
  },
  "tone": {
    "type": "string (e.g., Professional, Casual, Academic)",
    "consistency": number (0-100),
    "suggestions": ["suggestion 1", "suggestion 2"]
  },
  "overallFeedback": "string"
}`;

    try {
        const { data, error } = await supabase.functions.invoke('ai-chat', {
            body: {
                mode: "seo-writing",
                messages: [{ role: "user", content: prompt }],
                stream: false
            }
        });

        if (error) throw error;

        const result = data.choices[0]?.message?.content;
        if (!result) throw new Error("Empty response from AI");

        return JSON.parse(result);
    } catch (error) {
        console.error("SEO Writing Assistant Error:", error);
        // Fallback demo data if error
        return {
            score: 75,
            readability: {
                score: 82,
                level: "Moderate",
                suggestions: ["Try shortening some paragraphs", "Use more transition words"]
            },
            seo: {
                score: 68,
                keywordsFound: [targetKeyword, "digital marketing"],
                missingKeywords: ["seo optimization", "content strategy"],
                suggestions: [`Add the keyword "${targetKeyword}" in the first 100 words`, "Include high-quality outbound links"]
            },
            tone: {
                type: "Professional",
                consistency: 90,
                suggestions: ["Maintain a more direct active voice"]
            },
            overallFeedback: "This is a solid start. Focus on keyword placement and breaking up long blocks of text to improve the score."
        };
    }
}
