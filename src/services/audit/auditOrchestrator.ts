import { scrapeWebPage, type PageData } from '../scraper/webScraper';
import { runLighthouseAudit, type LighthouseResult } from '../lighthouse/lighthouseAudit';
import { generateInstantAudit, generateComprehensiveReport } from '../ai';
import type { AuditIssue } from '../ai/fixGenerator';

export interface CompleteSiteAudit {
    url: string;
    timestamp: Date;
    pageData: PageData;
    lighthouse: LighthouseResult;
    aiAnalysis: any;
    issues: AuditIssue[];
    scores: {
        overall: number;
        seo: number;
        performance: number;
        accessibility: number;
        ux: number;
        content: number;
    };
    summary: string;
}

/**
 * Run a complete website audit using all available tools
 */
export async function runCompleteSiteAudit(url: string): Promise<CompleteSiteAudit> {
    try {
        console.log(`Starting complete audit for ${url}...`);

        // Step 1: Scrape the webpage
        console.log('Step 1: Scraping webpage...');
        const pageData = await scrapeWebPage(url);

        // Step 2: Run Lighthouse audit (mock for now)
        console.log('Step 2: Running Lighthouse audit...');
        const lighthouse = await runLighthouseAudit(url);

        // Step 3: Generate AI analysis
        console.log('Step 3: Generating AI analysis...');
        const aiAnalysis = await generateInstantAudit(url, {
            title: pageData.title,
            description: pageData.description,
            content: pageData.content,
            headings: [...pageData.headings.h1, ...pageData.headings.h2, ...pageData.headings.h3],
            images: pageData.images.total,
            links: pageData.links.total,
            loadTime: pageData.performance.loadTime,
        });

        // Step 4: Identify issues
        console.log('Step 4: Identifying issues...');
        const issues = await identifyIssues(pageData, lighthouse, aiAnalysis);

        // Step 5: Calculate scores
        console.log('Step 5: Calculating scores...');
        const scores = {
            overall: Math.round((
                lighthouse.scores.performance +
                lighthouse.scores.accessibility +
                lighthouse.scores.seo +
                aiAnalysis.categoryScores.ux +
                aiAnalysis.categoryScores.content
            ) / 5),
            seo: lighthouse.scores.seo,
            performance: lighthouse.scores.performance,
            accessibility: lighthouse.scores.accessibility,
            ux: aiAnalysis.categoryScores.ux,
            content: aiAnalysis.categoryScores.content,
        };

        // Step 6: Generate summary
        const summary = aiAnalysis.executiveSummary;

        console.log('Audit complete!');

        return {
            url,
            timestamp: new Date(),
            pageData,
            lighthouse,
            aiAnalysis,
            issues,
            scores,
            summary,
        };
    } catch (error) {
        console.error('Error running complete site audit:', error);
        throw new Error(`Failed to audit ${url}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

/**
 * Identify issues from audit data
 */
async function identifyIssues(
    pageData: PageData,
    lighthouse: LighthouseResult,
    aiAnalysis: any
): Promise<AuditIssue[]> {
    const issues: AuditIssue[] = [];

    // SEO Issues
    if (!pageData.title || pageData.title.length < 10) {
        issues.push({
            id: 'seo-title',
            type: 'seo',
            severity: 'critical',
            title: 'Missing or Short Title Tag',
            description: 'Page title is missing or too short. Titles should be 50-60 characters.',
        });
    }

    if (!pageData.description || pageData.description.length < 50) {
        issues.push({
            id: 'seo-description',
            type: 'seo',
            severity: 'critical',
            title: 'Missing or Short Meta Description',
            description: 'Meta description is missing or too short. Should be 150-160 characters.',
        });
    }

    if (pageData.headings.h1.length === 0) {
        issues.push({
            id: 'seo-h1',
            type: 'seo',
            severity: 'critical',
            title: 'Missing H1 Heading',
            description: 'Page is missing an H1 heading, which is important for SEO.',
        });
    }

    if (pageData.headings.h1.length > 1) {
        issues.push({
            id: 'seo-multiple-h1',
            type: 'seo',
            severity: 'warning',
            title: 'Multiple H1 Headings',
            description: 'Page has multiple H1 headings. Best practice is to have only one.',
        });
    }

    // Accessibility Issues
    if (pageData.images.withoutAlt > 0) {
        issues.push({
            id: 'a11y-alt-text',
            type: 'accessibility',
            severity: 'critical',
            title: 'Images Missing Alt Text',
            description: `${pageData.images.withoutAlt} images are missing alt text, which is crucial for accessibility.`,
        });
    }

    // Performance Issues
    if (pageData.performance.loadTime && pageData.performance.loadTime > 3000) {
        issues.push({
            id: 'perf-load-time',
            type: 'performance',
            severity: 'warning',
            title: 'Slow Page Load Time',
            description: `Page took ${pageData.performance.loadTime}ms to load. Should be under 3 seconds.`,
        });
    }

    // Content Issues
    if (pageData.content.length < 300) {
        issues.push({
            id: 'content-thin',
            type: 'content',
            severity: 'warning',
            title: 'Thin Content',
            description: 'Page has very little content. Consider adding more valuable information.',
        });
    }

    // Add AI-identified issues
    if (aiAnalysis.topIssues) {
        issues.push(...aiAnalysis.topIssues);
    }

    return issues;
}

/**
 * Quick audit (faster, less comprehensive)
 */
export async function runQuickAudit(url: string): Promise<Partial<CompleteSiteAudit>> {
    try {
        // Only scrape and do basic AI analysis
        const pageData = await scrapeWebPage(url);

        const aiAnalysis = await generateInstantAudit(url, {
            title: pageData.title,
            description: pageData.description,
            content: pageData.content,
            headings: [...pageData.headings.h1, ...pageData.headings.h2],
            images: pageData.images.total,
            links: pageData.links.total,
            loadTime: pageData.performance.loadTime,
        });

        return {
            url,
            timestamp: new Date(),
            pageData,
            aiAnalysis,
            scores: {
                overall: aiAnalysis.overallScore,
                seo: aiAnalysis.categoryScores.seo,
                performance: aiAnalysis.categoryScores.performance,
                accessibility: aiAnalysis.categoryScores.accessibility,
                ux: aiAnalysis.categoryScores.ux,
                content: aiAnalysis.categoryScores.content,
            },
            summary: aiAnalysis.executiveSummary,
        };
    } catch (error) {
        console.error('Error running quick audit:', error);
        throw error;
    }
}
