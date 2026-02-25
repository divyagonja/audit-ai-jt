import { supabase } from "@/integrations/supabase/client";
import { AuditIssue } from './fixGenerator';

export interface InstantAuditResult {
    overallScore: number;
    categoryScores: {
        seo: number;
        performance: number;
        ux: number;
        accessibility: number;
        content: number;
    };
    topIssues: AuditIssue[];
    quickWins: string[];
    executiveSummary: string;
    priorityActions: string[];
}

/**
 * Generate instant audit with AI analysis (60 seconds)
 */
export async function generateInstantAudit(
    url: string,
    pageData: {
        title: string;
        description: string;
        content: string;
        headings: string[];
        images: number;
        links: number;
        loadTime?: number;
    }
): Promise<InstantAuditResult> {
    try {
        const prompt = `You are a website audit expert. Perform a rapid analysis of this website:

**URL:** ${url}
**Title:** ${pageData.title}
**Meta Description:** ${pageData.description}
**Headings:** ${pageData.headings.join(', ')}
**Images:** ${pageData.images}
**Links:** ${pageData.links}
**Load Time:** ${pageData.loadTime || 'N/A'}ms
**Content Sample:** ${pageData.content.substring(0, 1000)}...

Provide a quick audit in JSON format:
{
  "overallScore": number (0-100),
  "categoryScores": {
    "seo": number (0-100),
    "performance": number (0-100),
    "ux": number (0-100),
    "accessibility": number (0-100),
    "content": number (0-100)
  },
  "topIssues": [
    {
      "id": "unique-id",
      "type": "seo|performance|accessibility|ux|content",
      "severity": "critical|warning|info",
      "title": "Issue title",
      "description": "Detailed description"
    }
  ],
  "quickWins": ["Top 3-5 quick wins"],
  "executiveSummary": "2-3 sentence summary",
  "priorityActions": ["Top 3 priority actions"]
}`;

        const { data, error } = await supabase.functions.invoke('ai-chat', {
            body: {
                mode: "instant-audit",
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
        console.error('Error generating instant audit:', error);
        throw new Error('Failed to generate instant audit');
    }
}

/**
 * Stream instant audit results for real-time updates
 */
export async function* streamInstantAudit(
    url: string,
    pageData: any
): AsyncGenerator<string, void, unknown> {
    try {
        const prompt = `Perform a rapid website audit for ${url}. Provide concise, actionable insights.`;

        const { data, error } = await supabase.functions.invoke('ai-chat', {
            body: {
                mode: "instant-audit-stream",
                messages: [{ role: 'user', content: prompt }],
                stream: false
            }
        });

        if (error) throw error;

        const result = data.choices[0]?.message?.content || '';
        yield result;
    } catch (error) {
        console.error('Error streaming instant audit:', error);
        throw new Error('Failed to stream instant audit');
    }
}
