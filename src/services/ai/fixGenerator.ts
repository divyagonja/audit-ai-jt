import { supabase } from "@/integrations/supabase/client";

export interface AuditIssue {
    id: string;
    type: 'seo' | 'performance' | 'accessibility' | 'ux' | 'content';
    severity: 'critical' | 'warning' | 'info';
    title: string;
    description: string;
    currentCode?: string;
    pageContext?: string;
}

export interface AIFix {
    issue: AuditIssue;
    fixedCode: string;
    explanation: string;
    impact: string;
    estimatedTime: string;
}

/**
 * Generate AI-powered code fixes for audit issues
 */
export async function generateAIFixes(issue: AuditIssue): Promise<AIFix> {
    try {
        const prompt = `You are an expert web developer and SEO specialist. Analyze this website issue and provide a fix:

**Issue Type:** ${issue.type}
**Severity:** ${issue.severity}
**Title:** ${issue.title}
**Description:** ${issue.description}
${issue.currentCode ? `**Current Code:**\n\`\`\`\n${issue.currentCode}\n\`\`\`` : ''}
${issue.pageContext ? `**Page Context:** ${issue.pageContext}` : ''}

Provide a comprehensive fix in the following JSON format:
{
  "fixedCode": "The corrected code snippet (HTML/CSS/JS as appropriate)",
  "explanation": "Clear explanation of what was wrong and how the fix addresses it",
  "impact": "Expected impact on SEO, performance, or user experience",
  "estimatedTime": "Estimated time to implement (e.g., '5 minutes', '30 minutes')"
}

Make the fix production-ready and follow best practices.`;

        const { data, error } = await supabase.functions.invoke('ai-chat', {
            body: {
                mode: "fix-generator",
                messages: [{ role: 'user', content: prompt }],
                stream: false
            }
        });

        if (error) throw error;

        const result = data.choices[0]?.message?.content;
        if (!result) throw new Error("Empty response from AI");

        const jsonMatch = result.match(/\{[\s\S]*\}/);
        const fixData = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(result);

        return {
            issue,
            fixedCode: fixData.fixedCode || '',
            explanation: fixData.explanation || '',
            impact: fixData.impact || '',
            estimatedTime: fixData.estimatedTime || 'Unknown',
        };
    } catch (error) {
        console.error('Error generating AI fix:', error);
        throw new Error('Failed to generate AI fix');
    }
}

/**
 * Generate multiple fixes in batch
 */
export async function generateBatchFixes(issues: AuditIssue[]): Promise<AIFix[]> {
    const fixes = await Promise.all(
        issues.slice(0, 5).map(issue => generateAIFixes(issue))
    );
    return fixes;
}
