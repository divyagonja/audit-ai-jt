import { supabase } from "@/integrations/supabase/client";
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

Create a strategic roadmap in JSON format with summary, phases (30-day, 60-day, 90-day), each with title, description, tasks, and expectedImpact.`;

        const { data, error } = await supabase.functions.invoke('ai-chat', {
            body: {
                mode: "roadmap",
                messages: [{ role: 'user', content: prompt }],
                stream: false
            }
        });

        if (error) throw error;

        const result = data.choices[0]?.message?.content;
        if (!result) throw new Error("Empty response from AI");

        const jsonMatch = result.match(/\{[\s\S]*\}/);
        const roadmapData = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(result);

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
