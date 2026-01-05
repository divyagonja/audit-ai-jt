import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Sparkles,
    Code,
    Calendar,
    Target,
    Zap,
    FileText,
    Loader2,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";
import {
    generateAIFixes,
    generateRoadmap,
    analyzeAdRelevance,
    generateInstantAudit,
    generateComprehensiveReport,
    type AuditIssue,
    type AIFix,
    type Roadmap,
    type AdRelevanceAnalysis,
    type InstantAuditResult,
    type ComprehensiveReport,
} from "@/services/ai";

const AIFeaturesDemo = () => {
    const [loading, setLoading] = useState(false);
    const [activeFeature, setActiveFeature] = useState<string | null>(null);

    // Demo data
    const [aiFix, setAiFix] = useState<AIFix | null>(null);
    const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
    const [adAnalysis, setAdAnalysis] = useState<AdRelevanceAnalysis | null>(null);
    const [instantAudit, setInstantAudit] = useState<InstantAuditResult | null>(null);
    const [comprehensiveReport, setComprehensiveReport] = useState<ComprehensiveReport | null>(null);

    // Demo: Generate AI Fix
    const handleGenerateAIFix = async () => {
        setLoading(true);
        setActiveFeature('fix');

        const demoIssue: AuditIssue = {
            id: '1',
            type: 'seo',
            severity: 'critical',
            title: 'Missing Meta Description',
            description: 'The page is missing a meta description tag, which is crucial for SEO and click-through rates.',
            currentCode: '<head>\n  <title>My Website</title>\n</head>',
            pageContext: 'Homepage of e-commerce site selling outdoor gear',
        };

        try {
            const fix = await generateAIFixes(demoIssue);
            setAiFix(fix);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Demo: Generate Roadmap
    const handleGenerateRoadmap = async () => {
        setLoading(true);
        setActiveFeature('roadmap');

        const demoIssues: AuditIssue[] = [
            {
                id: '1',
                type: 'seo',
                severity: 'critical',
                title: 'Missing Meta Descriptions',
                description: '15 pages missing meta descriptions',
            },
            {
                id: '2',
                type: 'performance',
                severity: 'critical',
                title: 'Large Image Files',
                description: 'Images not optimized, causing slow load times',
            },
            {
                id: '3',
                type: 'ux',
                severity: 'warning',
                title: 'Mobile Navigation Issues',
                description: 'Menu difficult to use on mobile devices',
            },
            {
                id: '4',
                type: 'content',
                severity: 'info',
                title: 'Thin Content on Product Pages',
                description: 'Product descriptions are too short',
            },
        ];

        try {
            const plan = await generateRoadmap(demoIssues);
            setRoadmap(plan);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Demo: Analyze Ad Relevance
    const handleAnalyzeAdRelevance = async () => {
        setLoading(true);
        setActiveFeature('ad');

        try {
            const analysis = await analyzeAdRelevance(
                "Get 50% Off Premium Outdoor Gear - Free Shipping on Orders Over $100",
                {
                    headline: "Welcome to OutdoorPro",
                    subheadline: "Your Adventure Starts Here",
                    body: "Browse our collection of camping equipment, hiking gear, and outdoor accessories. Quality products for every adventure.",
                    cta: "Shop Now",
                    url: "https://example.com",
                }
            );
            setAdAnalysis(analysis);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Demo: Instant Audit
    const handleInstantAudit = async () => {
        setLoading(true);
        setActiveFeature('instant');

        try {
            const audit = await generateInstantAudit("https://example.com", {
                title: "Example Website - Home",
                description: "Welcome to our website",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                headings: ["Welcome", "Our Services", "Contact Us"],
                images: 12,
                links: 45,
                loadTime: 2500,
            });
            setInstantAudit(audit);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen dashboard-bg">
            <div className="relative z-10 p-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold corporate-gradient-text flex items-center justify-center gap-3">
                            <Sparkles className="h-10 w-10" />
                            AI-Powered Features
                        </h1>
                        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                            Experience the power of AI-driven website auditing. Click any feature below to see it in action.
                        </p>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* AI-Generated Fixes */}
                        <Card className="executive-card p-6 cursor-pointer hover:scale-105 transition-transform duration-300" onClick={handleGenerateAIFix}>
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                                    <Code className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">AI-Generated Fixes</h3>
                                    <p className="text-sm text-slate-600">
                                        Get instant code snippets and copy improvements for any issue
                                    </p>
                                </div>
                                <Button className="w-full" disabled={loading && activeFeature === 'fix'}>
                                    {loading && activeFeature === 'fix' ? (
                                        <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating...</>
                                    ) : (
                                        <>Try It Now</>
                                    )}
                                </Button>
                            </div>
                        </Card>

                        {/* 30/60/90 Day Roadmaps */}
                        <Card className="executive-card p-6 cursor-pointer hover:scale-105 transition-transform duration-300" onClick={handleGenerateRoadmap}>
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-700 flex items-center justify-center">
                                    <Calendar className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">30/60/90 Day Roadmaps</h3>
                                    <p className="text-sm text-slate-600">
                                        Automated action plans prioritized by impact and effort
                                    </p>
                                </div>
                                <Button className="w-full" disabled={loading && activeFeature === 'roadmap'}>
                                    {loading && activeFeature === 'roadmap' ? (
                                        <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating...</>
                                    ) : (
                                        <>Try It Now</>
                                    )}
                                </Button>
                            </div>
                        </Card>

                        {/* Ad Relevance Analysis */}
                        <Card className="executive-card p-6 cursor-pointer hover:scale-105 transition-transform duration-300" onClick={handleAnalyzeAdRelevance}>
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center">
                                    <Target className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">Ad Relevance Analysis</h3>
                                    <p className="text-sm text-slate-600">
                                        Analyze message match between ads and landing pages
                                    </p>
                                </div>
                                <Button className="w-full" disabled={loading && activeFeature === 'ad'}>
                                    {loading && activeFeature === 'ad' ? (
                                        <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Analyzing...</>
                                    ) : (
                                        <>Try It Now</>
                                    )}
                                </Button>
                            </div>
                        </Card>

                        {/* Instant Audits */}
                        <Card className="executive-card p-6 cursor-pointer hover:scale-105 transition-transform duration-300" onClick={handleInstantAudit}>
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center">
                                    <Zap className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">Instant Audits</h3>
                                    <p className="text-sm text-slate-600">
                                        Complete website audit in 60 seconds vs hours
                                    </p>
                                </div>
                                <Button className="w-full" disabled={loading && activeFeature === 'instant'}>
                                    {loading && activeFeature === 'instant' ? (
                                        <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Auditing...</>
                                    ) : (
                                        <>Try It Now</>
                                    )}
                                </Button>
                            </div>
                        </Card>

                        {/* All-in-One Report */}
                        <Card className="executive-card p-6 md:col-span-2 cursor-pointer hover:scale-105 transition-transform duration-300">
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center">
                                    <FileText className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">All-in-One Report</h3>
                                    <p className="text-sm text-slate-600">
                                        SEO + UX + Speed + Content + Funnels + Ads in one comprehensive report
                                    </p>
                                </div>
                                <Button className="w-full">Coming Soon</Button>
                            </div>
                        </Card>
                    </div>

                    {/* Results Display */}
                    {(aiFix || roadmap || adAnalysis || instantAudit) && (
                        <Card className="corporate-card p-8">
                            <Tabs defaultValue={activeFeature || 'fix'} className="w-full">
                                <TabsList className="grid w-full grid-cols-4">
                                    <TabsTrigger value="fix">AI Fix</TabsTrigger>
                                    <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
                                    <TabsTrigger value="ad">Ad Analysis</TabsTrigger>
                                    <TabsTrigger value="instant">Instant Audit</TabsTrigger>
                                </TabsList>

                                {/* AI Fix Results */}
                                <TabsContent value="fix" className="space-y-4 mt-6">
                                    {aiFix && (
                                        <>
                                            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
                                                <div>
                                                    <h4 className="font-semibold text-blue-900">Issue: {aiFix.issue.title}</h4>
                                                    <p className="text-sm text-blue-700 mt-1">{aiFix.issue.description}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <div>
                                                    <h4 className="font-semibold text-slate-900 mb-2">✅ Fixed Code:</h4>
                                                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                                                        <code>{aiFix.fixedCode}</code>
                                                    </pre>
                                                </div>

                                                <div>
                                                    <h4 className="font-semibold text-slate-900 mb-2">📝 Explanation:</h4>
                                                    <p className="text-slate-700">{aiFix.explanation}</p>
                                                </div>

                                                <div>
                                                    <h4 className="font-semibold text-slate-900 mb-2">📈 Impact:</h4>
                                                    <p className="text-slate-700">{aiFix.impact}</p>
                                                </div>

                                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                                    <span className="font-medium">⏱️ Estimated Time:</span>
                                                    <span>{aiFix.estimatedTime}</span>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </TabsContent>

                                {/* Roadmap Results */}
                                <TabsContent value="roadmap" className="space-y-6 mt-6">
                                    {roadmap && (
                                        <>
                                            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                                                <h4 className="font-semibold text-indigo-900 mb-2">Executive Summary</h4>
                                                <p className="text-indigo-700">{roadmap.summary}</p>
                                                <div className="flex gap-4 mt-3 text-sm">
                                                    <span className="text-indigo-600">
                                                        <strong>{roadmap.totalTasks}</strong> tasks
                                                    </span>
                                                    <span className="text-indigo-600">
                                                        <strong>{roadmap.estimatedTotalHours}</strong> hours
                                                    </span>
                                                </div>
                                            </div>

                                            {roadmap.phases.map((phase, idx) => (
                                                <div key={idx} className="space-y-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-700 flex items-center justify-center text-white font-bold">
                                                            {phase.phase === '30-day' ? '30' : phase.phase === '60-day' ? '60' : '90'}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-slate-900">{phase.title}</h4>
                                                            <p className="text-sm text-slate-600">{phase.description}</p>
                                                        </div>
                                                    </div>

                                                    <div className="ml-13 space-y-2">
                                                        {phase.tasks.slice(0, 3).map((task, taskIdx) => (
                                                            <div key={taskIdx} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                                                                <div className="flex items-start justify-between">
                                                                    <div className="flex-1">
                                                                        <h5 className="font-semibold text-slate-900">{task.title}</h5>
                                                                        <p className="text-sm text-slate-600 mt-1">{task.description}</p>
                                                                    </div>
                                                                    <div className="flex gap-2">
                                                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${task.priority === 'high' ? 'bg-red-100 text-red-700' :
                                                                                task.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                                                                                    'bg-green-100 text-green-700'
                                                                            }`}>
                                                                            {task.priority}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-3 mt-2 text-xs text-slate-500">
                                                                    <span>Effort: {task.effort}</span>
                                                                    <span>Impact: {task.impact}</span>
                                                                    <span>{task.estimatedHours}h</span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="ml-13 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                                                        <p className="text-sm text-indigo-700">
                                                            <strong>Expected Impact:</strong> {phase.expectedImpact}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </TabsContent>

                                {/* Ad Analysis Results */}
                                <TabsContent value="ad" className="space-y-4 mt-6">
                                    {adAnalysis && (
                                        <>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 text-center">
                                                    <div className="text-3xl font-bold text-amber-900">{adAnalysis.relevanceScore}</div>
                                                    <div className="text-sm text-amber-700 mt-1">Overall Score</div>
                                                </div>
                                                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 text-center">
                                                    <div className="text-3xl font-bold text-blue-900">{adAnalysis.messageMatch.score}</div>
                                                    <div className="text-sm text-blue-700 mt-1">Message Match</div>
                                                </div>
                                                <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-center">
                                                    <div className="text-3xl font-bold text-green-900">{adAnalysis.keywordAlignment.score}</div>
                                                    <div className="text-sm text-green-700 mt-1">Keyword Alignment</div>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                                                    <h4 className="font-semibold text-slate-900 mb-2">📊 Summary</h4>
                                                    <p className="text-slate-700">{adAnalysis.summary}</p>
                                                </div>

                                                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                                                    <h4 className="font-semibold text-amber-900 mb-2">⚠️ Issues Found</h4>
                                                    <ul className="space-y-1">
                                                        {adAnalysis.scentTrail.issues.map((issue, idx) => (
                                                            <li key={idx} className="text-sm text-amber-700 flex items-start gap-2">
                                                                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                                                <span>{issue}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                                    <h4 className="font-semibold text-green-900 mb-2">💡 Recommendations</h4>
                                                    <ul className="space-y-1">
                                                        {adAnalysis.recommendations.map((rec, idx) => (
                                                            <li key={idx} className="text-sm text-green-700 flex items-start gap-2">
                                                                <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                                                <span>{rec}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </TabsContent>

                                {/* Instant Audit Results */}
                                <TabsContent value="instant" className="space-y-4 mt-6">
                                    {instantAudit && (
                                        <>
                                            <div className="text-center p-6 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border border-emerald-200">
                                                <div className="text-5xl font-bold corporate-gradient-text">{instantAudit.overallScore}</div>
                                                <div className="text-sm text-slate-600 mt-2">Overall Score</div>
                                            </div>

                                            <div className="grid grid-cols-5 gap-3">
                                                {Object.entries(instantAudit.categoryScores).map(([category, score]) => (
                                                    <div key={category} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
                                                        <div className="text-2xl font-bold text-slate-900">{score}</div>
                                                        <div className="text-xs text-slate-600 mt-1 capitalize">{category}</div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                                <h4 className="font-semibold text-blue-900 mb-2">📋 Executive Summary</h4>
                                                <p className="text-blue-700">{instantAudit.executiveSummary}</p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                                    <h4 className="font-semibold text-green-900 mb-3">🚀 Quick Wins</h4>
                                                    <ul className="space-y-2">
                                                        {instantAudit.quickWins.map((win, idx) => (
                                                            <li key={idx} className="text-sm text-green-700 flex items-start gap-2">
                                                                <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                                                <span>{win}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                                                    <h4 className="font-semibold text-amber-900 mb-3">⚡ Priority Actions</h4>
                                                    <ul className="space-y-2">
                                                        {instantAudit.priorityActions.map((action, idx) => (
                                                            <li key={idx} className="text-sm text-amber-700 flex items-start gap-2">
                                                                <Target className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                                                <span>{action}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </TabsContent>
                            </Tabs>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AIFeaturesDemo;
