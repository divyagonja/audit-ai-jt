import openai from '@/lib/openai';
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

Generate a comprehensive report in JSON format:
{
  "executiveSummary": "3-4 sentence high-level summary for executives",
  "overallScore": number (0-100),
  "categoryScores": {
    "seo": {
      "score": number (0-100),
      "grade": "A+|A|B|C|D|F",
      "summary": "One sentence summary"
    },
    // ... repeat for ux, performance, content, accessibility
  },
  "priorityMatrix": {
    "quickWins": [{"id": "...", "type": "...", "severity": "...", "title": "...", "description": "..."}],
    "majorProjects": [...],
    "fillIns": [...],
    "thankless": [...]
  },
  "topActionItems": ["Top 10 specific, actionable items"],
  "roadmapSummary": {
    "thirtyDay": "Focus for first 30 days",
    "sixtyDay": "Focus for days 31-60",
    "ninetyDay": "Focus for days 61-90"
  },
  "competitiveInsights": "How this site compares to industry standards",
  "estimatedImpact": {
    "trafficIncrease": "Estimated % increase",
    "conversionImprovement": "Estimated % improvement",
    "revenueImpact": "Estimated $ impact"
  }
}

Use the Impact/Effort matrix for priorityMatrix:
- quickWins: High impact, low effort
- majorProjects: High impact, high effort
- fillIns: Low impact, low effort
- thankless: Low impact, high effort`;

        const response = await openai.chat.completions.create({
            model: 'gpt-4-turbo-preview',
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: 'json_object' },
            temperature: 0.4,
            max_tokens: 4000,
        });

        const reportData = JSON.parse(response.choices[0].message.content || '{}');
        return reportData as ComprehensiveReport;
    } catch (error) {
        console.error('Error generating comprehensive report:', error);
        throw new Error('Failed to generate comprehensive report');
    }
}
