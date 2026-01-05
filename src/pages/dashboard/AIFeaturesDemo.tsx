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
    Brain,
    Rocket,
    BarChart3,
    ArrowRight,
    Search,
    Shield
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
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { cn } from "@/lib/utils";

const AIFeaturesDemo = () => {
    const [loading, setLoading] = useState(false);
    const [activeFeature, setActiveFeature] = useState<string | null>(null);

    // Demo data
    const [aiFix, setAiFix] = useState<AIFix | null>(null);
    const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
    const [adAnalysis, setAdAnalysis] = useState<AdRelevanceAnalysis | null>(null);
    const [instantAudit, setInstantAudit] = useState<InstantAuditResult | null>(null);

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
            { id: '1', type: 'seo', severity: 'critical', title: 'Missing Meta Descriptions', description: '15 pages missing meta descriptions' },
            { id: '2', type: 'performance', severity: 'critical', title: 'Large Image Files', description: 'Images not optimized, causing slow load times' },
            { id: '3', type: 'ux', severity: 'warning', title: 'Mobile Navigation Issues', description: 'Menu difficult to use on mobile devices' },
            { id: '4', type: 'content', severity: 'info', title: 'Thin Content on Product Pages', description: 'Product descriptions are too short' },
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
        <div className="min-h-screen text-slate-100 font-sans selection:bg-blue-500/30">
            <div className="relative z-10">
                <DashboardHeader title="AI Features Demo" subtitle="Experience the cutting-edge of AI-driven digital intelligence" />

                <div className="p-8 max-w-7xl mx-auto space-y-12 animate-fade-in-up">
                    {/* Header Intro */}
                    <div className="text-center space-y-4 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-2">
                            <Brain className="h-3 w-3" /> System Capability Demo
                        </div>
                        <h2 className="text-4xl font-black text-white premium-gradient-text tracking-tight">AI Capability Sandbox</h2>
                        <p className="text-slate-400 leading-relaxed">
                            Interact with our proprietary machine learning models. Each module is specifically trained on over 500GB of high-performance conversion data.
                        </p>
                    </div>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { id: 'fix', icon: Code, title: "AI Code Fixes", desc: "Real-time generation of correct code fixes for technical SEO and performance issues.", action: handleGenerateAIFix, color: "text-blue-400", bg: "bg-blue-500/10" },
                            { id: 'roadmap', icon: Calendar, title: "Execution Roadmap", desc: "30/60/90 day action plans based on impact-to-effort analysis.", action: handleGenerateRoadmap, color: "text-indigo-400", bg: "bg-indigo-500/10" },
                            { id: 'ad', icon: Target, title: "Ad Relevance Analysis", desc: "Analysis of how well your ads match your landing page content.", action: handleAnalyzeAdRelevance, color: "text-amber-400", bg: "bg-amber-500/10" },
                            { id: 'instant', icon: Zap, title: "Quick Site Audit", desc: "Rapid site screening and issue detection in less than 60 seconds.", action: handleInstantAudit, color: "text-emerald-400", bg: "bg-emerald-500/10" },
                            { id: 'report', icon: FileText, title: "All-in-One Report", desc: "Unified report covering SEO, UX, Performance, and Content quality.", action: () => { }, color: "text-purple-400", bg: "bg-purple-500/10", comingSoon: true },
                        ].map((feature) => (
                            <div
                                key={feature.id}
                                onClick={!feature.comingSoon ? feature.action : undefined}
                                className={cn(
                                    "glass-card border border-white/5 rounded-3xl p-8 transition-all group overflow-hidden relative cursor-pointer",
                                    feature.comingSoon ? "opacity-60 cursor-not-allowed" : "hover:border-blue-500/30 hover:scale-[1.03] shadow-xl"
                                )}
                            >
                                <div className={cn("absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity", feature.bg)}></div>

                                <div className="space-y-6 relative z-10">
                                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center border border-white/5 shadow-inner", feature.bg)}>
                                        <feature.icon className={cn("h-7 w-7", feature.color)} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-white mb-2">{feature.title}</h3>
                                        <p className="text-sm text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
                                    </div>
                                    <Button
                                        className={cn(
                                            "w-full h-12 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                                            feature.comingSoon ? "bg-slate-800 text-slate-600" : "bg-white/5 border border-white/10 text-white hover:bg-white/10 group-hover:border-blue-500/40"
                                        )}
                                        disabled={loading && activeFeature === feature.id}
                                    >
                                        {loading && activeFeature === feature.id ? (
                                            <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processing...</>
                                        ) : feature.comingSoon ? (
                                            "Awaiting Deployment"
                                        ) : (
                                            "Execute Command"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dynamic Results Display */}
                    {(aiFix || roadmap || adAnalysis || instantAudit) && (
                        <div className="glass-card border border-white/5 rounded-[40px] p-2 overflow-hidden shadow-2xl relative">
                            <Tabs value={activeFeature || 'fix'} className="w-full">
                                <TabsList className="grid w-full grid-cols-4 bg-transparent h-16 border-b border-white/5 rounded-none">
                                    <TabsTrigger value="fix" className="data-[state=active]:text-white font-bold uppercase text-[10px] tracking-[0.2em] relative">
                                        Neural Fix
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 scale-x-0 data-[state=active]:scale-x-100 transition-transform origin-center"></div>
                                    </TabsTrigger>
                                    <TabsTrigger value="roadmap" className="data-[state=active]:text-white font-bold uppercase text-[10px] tracking-[0.2em]">Strategy Plan</TabsTrigger>
                                    <TabsTrigger value="ad" className="data-[state=active]:text-white font-bold uppercase text-[10px] tracking-[0.2em]">Marketing Match</TabsTrigger>
                                    <TabsTrigger value="instant" className="data-[state=active]:text-white font-bold uppercase text-[10px] tracking-[0.2em]">Live Scan</TabsTrigger>
                                </TabsList>

                                <div className="p-10">
                                    {/* AI Fix Results */}
                                    <TabsContent value="fix" className="mt-0 focus-visible:ring-0">
                                        {aiFix && (
                                            <div className="space-y-10 animate-fade-in">
                                                <div className="flex flex-col lg:flex-row gap-8 items-start">
                                                    <div className="flex-1 space-y-6">
                                                        <div className="flex items-start gap-4 p-6 bg-rose-500/10 border border-rose-500/20 rounded-2xl">
                                                            <div className="mt-1 w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400">
                                                                <AlertCircle className="h-4 w-4" />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-bold text-rose-400">Detected: {aiFix.issue.title}</h4>
                                                                <p className="text-sm text-rose-300/80 mt-1">{aiFix.issue.description}</p>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-5">
                                                            <div className="p-6 bg-slate-950/50 border border-white/5 rounded-2xl">
                                                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                                    <Sparkles className="h-3 w-3" /> Cognitive Explanation
                                                                </h4>
                                                                <p className="text-slate-300 leading-relaxed">{aiFix.explanation}</p>
                                                            </div>
                                                            <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                                                                <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                                    <Rocket className="h-3 w-3" /> Resultant Impact
                                                                </h4>
                                                                <p className="text-emerald-300/90 leading-relaxed font-medium">{aiFix.impact}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="w-full lg:w-[450px] space-y-4">
                                                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 cursor-default">Corrected Implementation</h4>
                                                        <div className="bg-slate-950 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                                                            <div className="flex items-center justify-between px-5 py-3 bg-white/5 border-b border-white/5">
                                                                <div className="flex gap-1.5">
                                                                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50"></div>
                                                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
                                                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></div>
                                                                </div>
                                                                <span className="text-[10px] uppercase font-bold text-slate-600 tracking-tighter">TypeScript / JSX</span>
                                                            </div>
                                                            <pre className="p-6 text-blue-300 text-xs font-mono leading-6 overflow-x-auto whitespace-pre-wrap">
                                                                <code>{aiFix.fixedCode}</code>
                                                            </pre>
                                                        </div>
                                                        <div className="flex items-center justify-between px-2">
                                                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                                                                <Calendar className="h-3.5 w-3.5" /> Est: {aiFix.estimatedTime}
                                                            </div>
                                                            <Button variant="ghost" className="h-8 text-[10px] font-black uppercase text-blue-400 hover:bg-blue-400/5">Copy Payload</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </TabsContent>

                                    {/* Roadmap Results */}
                                    <TabsContent value="roadmap" className="mt-0 focus-visible:ring-0">
                                        {roadmap && (
                                            <div className="space-y-12 animate-fade-in">
                                                <div className="p-8 bg-indigo-500/5 border border-indigo-500/20 rounded-[32px] relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full"></div>
                                                    <h4 className="text-xl font-bold text-white mb-3">Executive Vector: Roadmap Alpha</h4>
                                                    <p className="text-slate-400 max-w-2xl leading-relaxed">{roadmap.summary}</p>
                                                </div>

                                                <div className="space-y-16">
                                                    {roadmap.phases.map((phase, idx) => (
                                                        <div key={idx} className="relative pl-10 border-l border-white/5">
                                                            <div className="absolute top-0 -left-6 w-12 h-12 rounded-2xl bg-slate-900 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                                                                <span className="font-black text-sm">{phase.phase === '30-day' ? '30' : phase.phase === '60-day' ? '60' : '90'}</span>
                                                            </div>

                                                            <div className="mb-8">
                                                                <h4 className="text-2xl font-black text-white mb-2">{phase.title}</h4>
                                                                <p className="text-slate-500 font-medium">{phase.description}</p>
                                                            </div>

                                                            <div className="grid md:grid-cols-3 gap-6">
                                                                {phase.tasks.slice(0, 3).map((task, taskIdx) => (
                                                                    <div key={taskIdx} className="glass-card p-6 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all flex flex-col justify-between group/task">
                                                                        <div>
                                                                            <div className="flex items-center justify-between mb-4">
                                                                                <span className={cn(
                                                                                    "px-2 px-1 rounded text-[9px] font-black uppercase tracking-widest",
                                                                                    task.priority === 'high' ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'
                                                                                )}>
                                                                                    {task.priority} Prio
                                                                                </span>
                                                                                <span className="text-[10px] font-bold text-slate-600">{task.estimatedHours}h</span>
                                                                            </div>
                                                                            <h5 className="font-bold text-slate-200 mb-2 group-hover/task:text-indigo-400 transition-colors">{task.title}</h5>
                                                                            <p className="text-xs text-slate-500 leading-relaxed mb-6">{task.description}</p>
                                                                        </div>
                                                                        <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-tighter text-slate-600 italic">
                                                                            <span>Imp: {task.impact}</span>
                                                                            <span>Eff: {task.effort}</span>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </TabsContent>

                                    {/* Ad Analysis Results */}
                                    <TabsContent value="ad" className="mt-0 focus-visible:ring-0">
                                        {adAnalysis && (
                                            <div className="space-y-10 animate-fade-in">
                                                <div className="grid lg:grid-cols-3 gap-8">
                                                    {[
                                                        { label: "Aggregate Relevance", score: adAnalysis.relevanceScore, color: "text-amber-400", bg: "bg-amber-400/10" },
                                                        { label: "Semantic Messaging", score: adAnalysis.messageMatch.score, color: "text-blue-400", bg: "bg-blue-400/10" },
                                                        { label: "Term Alignment", score: adAnalysis.keywordAlignment.score, color: "text-emerald-400", bg: "bg-emerald-400/10" },
                                                    ].map((box, i) => (
                                                        <div key={i} className="glass-card p-10 rounded-[32px] border border-white/5 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                                                            <div className={cn("absolute -top-10 -right-10 w-24 h-24 blur-3xl opacity-20 transition-opacity group-hover:opacity-40", box.bg)}></div>
                                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">{box.label}</span>
                                                            <span className={cn("text-6xl font-black mb-2 transition-transform group-hover:scale-110", box.color)}>{box.score}</span>
                                                            <span className="text-xs text-slate-600 font-bold">Percentile Index</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-8">
                                                    <div className="glass-card p-8 rounded-3xl border border-white/5 bg-slate-900/40">
                                                        <h4 className="text-sm font-black text-white mb-6 uppercase tracking-widest flex items-center gap-3">
                                                            <Search className="h-4 w-4 text-slate-400" /> Scent Trail Disruption
                                                        </h4>
                                                        <ul className="space-y-4">
                                                            {adAnalysis.scentTrail.issues.map((issue, idx) => (
                                                                <li key={idx} className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 group/item">
                                                                    <div className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)] group-hover:scale-150 transition-transform"></div>
                                                                    <span className="text-sm text-slate-300 leading-relaxed font-medium">{issue}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className="glass-card p-8 rounded-3xl border border-white/5 bg-slate-900/40">
                                                        <h4 className="text-sm font-black text-white mb-6 uppercase tracking-widest flex items-center gap-3">
                                                            <Sparkles className="h-4 w-4 text-amber-400" /> Optimal Pivot Directives
                                                        </h4>
                                                        <ul className="space-y-4">
                                                            {adAnalysis.recommendations.map((rec, idx) => (
                                                                <li key={idx} className="flex items-start gap-4 p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 group/item">
                                                                    <div className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)] group-hover:scale-150 transition-transform"></div>
                                                                    <span className="text-sm text-slate-300 leading-relaxed font-medium">{rec}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </TabsContent>

                                    {/* Instant Audit Results */}
                                    <TabsContent value="instant" className="mt-0 focus-visible:ring-0">
                                        {instantAudit && (
                                            <div className="space-y-10 animate-fade-in">
                                                <div className="glass-card p-12 rounded-[40px] border border-emerald-500/10 bg-emerald-500/[0.03] text-center relative overflow-hidden group">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent"></div>
                                                    <span className="text-[12px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4 block relative z-10">Global Integrity Index</span>
                                                    <div className="text-8xl font-black premium-gradient-text drop-shadow-2xl relative z-10 transition-transform group-hover:scale-105 duration-700">{instantAudit.overallScore}</div>
                                                    <p className="text-slate-400 mt-8 max-w-xl mx-auto leading-relaxed italic relative z-10">"{instantAudit.executiveSummary}"</p>
                                                </div>

                                                <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                                                    {Object.entries(instantAudit.categoryScores).map(([category, score]) => (
                                                        <div key={category} className="glass-card p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all text-center group">
                                                            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block mb-4 group-hover:text-blue-400 transition-colors">{category}</span>
                                                            <span className="text-3xl font-black text-white">{score}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="grid lg:grid-cols-2 gap-8">
                                                    <div className="space-y-6">
                                                        <h4 className="flex items-center gap-3 text-sm font-black text-emerald-400 uppercase tracking-widest px-1">
                                                            <CheckCircle2 className="h-5 w-5" /> Accelerated Victories
                                                        </h4>
                                                        {instantAudit.quickWins.map((win, idx) => (
                                                            <div key={idx} className="glass-card p-5 rounded-2xl border border-white/5 hover:bg-white/[0.02] flex items-center gap-4 transition-all">
                                                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-black text-xs">A{idx + 1}</div>
                                                                <span className="text-sm font-medium text-slate-300">{win}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="space-y-6">
                                                        <h4 className="flex items-center gap-3 text-sm font-black text-amber-400 uppercase tracking-widest px-1">
                                                            <Target className="h-5 w-5" /> Strategic Priorities
                                                        </h4>
                                                        {instantAudit.priorityActions.map((action, idx) => (
                                                            <div key={idx} className="glass-card p-5 rounded-2xl border border-white/5 hover:bg-white/[0.02] flex items-center gap-4 transition-all">
                                                                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-black text-xs">P{idx + 1}</div>
                                                                <span className="text-sm font-medium text-slate-300">{action}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </TabsContent>
                                </div>
                            </Tabs>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AIFeaturesDemo;
