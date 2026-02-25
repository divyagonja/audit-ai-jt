import { supabase } from "@/integrations/supabase/client";

export interface AdRelevanceAnalysis {
    relevanceScore: number;
    messageMatch: {
        score: number;
        analysis: string;
        mismatches: string[];
    };
    keywordAlignment: {
        score: number;
        adKeywords: string[];
        landingKeywords: string[];
        missing: string[];
        extra: string[];
    };
    scentTrail: {
        score: number;
        issues: string[];
        recommendations: string[];
    };
    recommendations: string[];
    summary: string;
}

/**
 * Analyze relevance between ad copy and landing page
 */
export async function analyzeAdRelevance(
    adCopy: string,
    landingPageData: {
        headline: string;
        subheadline?: string;
        body: string;
        cta: string;
        url: string;
    }
): Promise<AdRelevanceAnalysis> {
    try {
        const prompt = `You are an expert in digital advertising and conversion optimization. Analyze the relevance between this ad and landing page:

**Ad Copy:**
"${adCopy}"

**Landing Page:**
- URL: ${landingPageData.url}
- Headline: "${landingPageData.headline}"
- Subheadline: "${landingPageData.subheadline || 'N/A'}"
- CTA: "${landingPageData.cta}"
- Body Content: "${landingPageData.body.substring(0, 500)}..."

Provide a comprehensive analysis in JSON format:
{
  "relevanceScore": number (0-100),
  "messageMatch": {
    "score": number (0-100),
    "analysis": "Detailed analysis of message consistency",
    "mismatches": ["List of message mismatches"]
  },
  "keywordAlignment": {
    "score": number (0-100),
    "adKeywords": ["Keywords from ad"],
    "landingKeywords": ["Keywords from landing page"],
    "missing": ["Keywords in ad but not on page"],
    "extra": ["Keywords on page but not in ad"]
  },
  "scentTrail": {
    "score": number (0-100),
    "issues": ["Scent trail issues"],
    "recommendations": ["How to improve scent trail"]
  },
  "recommendations": ["Top 5 specific recommendations"],
  "summary": "Executive summary of the analysis"
}`;

        const { data, error } = await supabase.functions.invoke('ai-chat', {
            body: {
                mode: "ad-relevance",
                messages: [{ role: 'user', content: prompt }],
                stream: false
            }
        });

        if (error) throw error;

        const result = data.choices[0]?.message?.content;
        if (!result) throw new Error("Empty response from AI");

        const jsonMatch = result.match(/\{[\s\S]*\}/);
        return jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(result);
    } catch (error) {
        console.error('Error analyzing ad relevance:', error);
        throw new Error('Failed to analyze ad relevance');
    }
}

/**
 * Batch analyze multiple ad-page pairs
 */
export async function batchAnalyzeAdRelevance(
    pairs: Array<{
        adCopy: string;
        landingPageData: {
            headline: string;
            subheadline?: string;
            body: string;
            cta: string;
            url: string;
        };
    }>
): Promise<AdRelevanceAnalysis[]> {
    const analyses = await Promise.all(
        pairs.slice(0, 3).map(pair => analyzeAdRelevance(pair.adCopy, pair.landingPageData))
    );
    return analyses;
}
