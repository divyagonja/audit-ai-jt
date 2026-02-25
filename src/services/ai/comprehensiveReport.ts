import { supabase } from "@/integrations/supabase/client";
import { AuditIssue } from './fixGenerator';

export interface ComprehensiveReport {
    executiveSummary: string;
    overallScore: number;
    categoryScores: {
        seo: { score: number; grade: string; summary: string };
        ux: { score: number; grade: string; summary: string };
        performance: { score: number; grade: string; summary: string };
        content: { score: number; grade: string; summary: string };
        accessibility: { score: number; grade: string; summary: string };
    };
    priorityMatrix: {
        quickWins: AuditIssue[];
        majorProjects: AuditIssue[];
        fillIns: AuditIssue[];
        thankless: AuditIssue[];
    };
    topActionItems: string[];
    roadmapSummary: {
        thirtyDay: string;
        sixtyDay: string;
        ninetyDay: string;
    };
    competitiveInsights?: string;
    estimatedImpact: {
        trafficIncrease: string;
        conversionImprovement: string;
        revenueImpact: string;
    };
}

/**
 * Generate comprehensive all-in-one audit report
 */
export async function generateComprehensiveReport(auditData: {
    url: string;
    seoData: any;
    uxData: any;
    performanceData: any;
    contentData: any;
    accessibilityData: any;
    funnelData?: any;
    adData?: any;
}): Promise<ComprehensiveReport> {
    try {
        const prompt = `You are a senior digital strategy consultant. Create a comprehensive website audit report:

**Website:** ${auditData.url}

**SEO Analysis:**
${JSON.stringify(auditData.seoData, null, 2)}

**UX Analysis:**
${JSON.stringify(auditData.uxData, null, 2)}

**Performance Metrics:**
${JSON.stringify(auditData.performanceData, null, 2)}

**Content Analysis:**
${JSON.stringify(auditData.contentData, null, 2)}

**Accessibility:**
${JSON.stringify(auditData.accessibilityData, null, 2)}

${auditData.funnelData ? `**Funnel Analysis:**\n${JSON.stringify(auditData.funnelData, null, 2)}` : ''}
${auditData.adData ? `**Ad Relevance:**\n${JSON.stringify(auditData.adData, null, 2)}` : ''}

Generate a comprehensive report in JSON format with executiveSummary, overallScore, categoryScores, priorityMatrix, topActionItems, roadmapSummary, competitiveInsights, and estimatedImpact.`;

        const { data, error } = await supabase.functions.invoke('ai-chat', {
            body: {
                mode: "comprehensive-report",
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
        console.error('Error generating comprehensive report:', error);
        throw new Error('Failed to generate comprehensive report');
    }
}
