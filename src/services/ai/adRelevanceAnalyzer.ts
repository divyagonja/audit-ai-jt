import openai from '@/lib/openai';

export interface AdRelevanceAnalysis {
    relevanceScore: number; // 0-100
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
}

Focus on:
1. Message match (does the landing page deliver on ad promise?)
2. Keyword alignment (are ad keywords present on page?)
3. Scent trail (visual and textual continuity)
4. CTA consistency
5. Trust signals and credibility`;

        const response = await openai.chat.completions.create({
            model: 'gpt-4-turbo-preview',
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: 'json_object' },
            temperature: 0.3,
            max_tokens: 2000,
        });

        const analysis = JSON.parse(response.choices[0].message.content || '{}');
        return analysis as AdRelevanceAnalysis;
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
