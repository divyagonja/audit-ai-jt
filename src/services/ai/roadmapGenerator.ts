import openai from '@/lib/openai';
import { AuditIssue } from './fixGenerator';

export interface RoadmapPhase {
    phase: '30-day' | '60-day' | '90-day';
    title: string;
    description: string;
    tasks: RoadmapTask[];
    expectedImpact: string;
}

export interface RoadmapTask {
    id: string;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    effort: 'low' | 'medium' | 'high';
    impact: 'low' | 'medium' | 'high';
    category: string;
    estimatedHours: number;
    dependencies?: string[];
}

export interface Roadmap {
    phases: RoadmapPhase[];
    summary: string;
    totalTasks: number;
    estimatedTotalHours: number;
}

/**
 * Generate a 30/60/90 day roadmap based on audit results
 */
export async function generateRoadmap(issues: AuditIssue[]): Promise<Roadmap> {
    try {
        const criticalIssues = issues.filter(i => i.severity === 'critical');
        const warnings = issues.filter(i => i.severity === 'warning');
        const opportunities = issues.filter(i => i.severity === 'info');

        const prompt = `You are a strategic web optimization consultant. Create a detailed 30/60/90 day implementation roadmap for these website issues:

**Critical Issues (${criticalIssues.length}):**
${criticalIssues.map(i => `- ${i.title}: ${i.description}`).join('\n')}

**Warnings (${warnings.length}):**
${warnings.map(i => `- ${i.title}: ${i.description}`).join('\n')}

**Opportunities (${opportunities.length}):**
${opportunities.map(i => `- ${i.title}: ${i.description}`).join('\n')}

Create a strategic roadmap in JSON format:
{
  "summary": "Executive summary of the roadmap strategy",
  "phases": [
    {
      "phase": "30-day",
      "title": "Quick Wins & Critical Fixes",
      "description": "Focus on high-impact, low-effort improvements",
      "tasks": [
        {
          "id": "unique-id",
          "title": "Task title",
          "description": "Detailed description",
          "priority": "high|medium|low",
          "effort": "low|medium|high",
          "impact": "low|medium|high",
          "category": "SEO|Performance|UX|Content|Accessibility",
          "estimatedHours": number,
          "dependencies": ["task-id"] // optional
        }
      ],
      "expectedImpact": "What results to expect from this phase"
    }
  ]
}

Prioritize tasks using the Impact/Effort matrix:
- 30 Days: High impact, low effort (quick wins)
- 60 Days: High impact, medium effort (strategic improvements)
- 90 Days: High impact, high effort (transformational changes)`;

        const response = await openai.chat.completions.create({
            model: 'gpt-4-turbo-preview',
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: 'json_object' },
            temperature: 0.4,
            max_tokens: 3000,
        });

        const roadmapData = JSON.parse(response.choices[0].message.content || '{}');

        const totalTasks = roadmapData.phases?.reduce(
            (sum: number, phase: RoadmapPhase) => sum + (phase.tasks?.length || 0),
            0
        ) || 0;

        const estimatedTotalHours = roadmapData.phases?.reduce(
            (sum: number, phase: RoadmapPhase) =>
                sum + (phase.tasks?.reduce((s: number, t: RoadmapTask) => s + (t.estimatedHours || 0), 0) || 0),
            0
        ) || 0;

        return {
            phases: roadmapData.phases || [],
            summary: roadmapData.summary || '',
            totalTasks,
            estimatedTotalHours,
        };
    } catch (error) {
        console.error('Error generating roadmap:', error);
        throw new Error('Failed to generate roadmap');
    }
}
