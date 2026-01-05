import openai from '@/lib/openai';

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

        const response = await openai.chat.completions.create({
            model: 'gpt-4-turbo-preview',
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: 'json_object' },
            temperature: 0.3,
            max_tokens: 1500,
        });

        const fixData = JSON.parse(response.choices[0].message.content || '{}');

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
        issues.slice(0, 5).map(issue => generateAIFixes(issue)) // Limit to 5 to avoid rate limits
    );
    return fixes;
}
