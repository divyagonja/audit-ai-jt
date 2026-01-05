import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
    Loader2,
    Globe,
    CheckCircle2,
    AlertTriangle,
    XCircle,
    TrendingUp,
    Zap,
    Search,
    Brain,
    Info,
    Layout,
    ArrowRight,
    Sparkles
} from "lucide-react";
import { runQuickAudit, type CompleteSiteAudit } from "@/services/audit";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const QuickAuditDemo = () => {
    const [url, setUrl] = useState("https://example.com");
    const [loading, setLoading] = useState(false);
    const [auditResult, setAuditResult] = useState<Partial<CompleteSiteAudit> | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleRunAudit = async () => {
        if (!url) {
            setError("Please enter a URL");
            return;
        }

        setLoading(true);
        setError(null);
        setAuditResult(null);

        try {
            const result = await runQuickAudit(url);
            setAuditResult(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to run audit");
            console.error("Audit error:", err);
        } finally {
            setLoading(false);
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
        if (score >= 70) return "text-blue-400 bg-blue-500/10 border-blue-500/20";
        if (score >= 50) return "text-amber-400 bg-amber-500/10 border-amber-500/20";
        return "text-rose-400 bg-rose-500/10 border-rose-500/20";
    };

    const getScoreIcon = (score: number) => {
        if (score >= 90) return <CheckCircle2 className="h-5 w-5 text-emerald-400" />;
        if (score >= 50) return <AlertTriangle className="h-5 w-5 text-amber-400" />;
        return <XCircle className="h-5 w-5 text-rose-400" />;
    };

    return (
        <div className="min-h-screen dashboard-bg text-slate-100 font-sans selection:bg-blue-500/30">
            <div className="fixed inset-0 pointer-events-none dashboard-bg-overlay opacity-20 z-0"></div>

            <div className="relative z-10">
                <DashboardHeader
                    title="Quick Website Audit"
                    subtitle="Instant AI-powered insights for any URL"
                />

                <div className="p-8 max-w-6xl mx-auto space-y-8 animate-fade-in-up">
                    {/* Input Section */}
                    <div className="glass-card p-10 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-16 -mt-16 transition-colors group-hover:bg-blue-600/20"></div>

                        <div className="relative z-10 max-w-3xl mx-auto text-center">
                            <h2 className="text-2xl font-bold text-white mb-6">Analyze Your Strategy in Seconds</h2>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                                    <Input
                                        type="url"
                                        placeholder="https://example.com"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        className="pl-12 h-14 bg-slate-950/50 border-white/10 text-white rounded-2xl focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 text-lg shadow-inner"
                                        disabled={loading}
                                    />
                                </div>
                                <Button
                                    onClick={handleRunAudit}
                                    disabled={loading}
                                    className="h-14 px-10 text-lg bg-blue-600 hover:bg-blue-500 text-white rounded-2xl shadow-lg shadow-blue-900/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                                            Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            <Zap className="h-5 w-5 mr-3" />
                                            Start Audit
                                        </>
                                    )}
                                </Button>
                            </div>

                            {error && (
                                <div className="mt-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start gap-3 text-left animate-shake">
                                    <XCircle className="h-5 w-5 text-rose-400 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-rose-400 text-sm">Action Required</h4>
                                        <p className="text-xs text-rose-300/80">{error}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Results Loading State Placeholder */}
                    {loading && (
                        <div className="space-y-6 animate-pulse">
                            <div className="h-48 glass-card rounded-3xl border border-white/5 opacity-50"></div>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="h-24 glass-card rounded-2xl border border-white/5 opacity-30"></div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Results Content */}
                    {auditResult && (
                        <div className="space-y-10">
                            {/* Overall Score & Summary */}
                            <div className="glass-card p-10 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden text-center sm:text-left">
                                <div className="flex flex-col sm:flex-row items-center gap-10">
                                    <div className="relative flex-shrink-0">
                                        <div className="w-36 h-36 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-blue-900/40 z-10 relative">
                                            <div className="text-center">
                                                <div className="text-5xl font-black">{auditResult.scores?.overall}</div>
                                                <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">Global Score</div>
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-white mb-4 premium-gradient-text flex items-center gap-2">
                                            <Sparkles className="h-5 w-5" /> Executive Summary
                                        </h3>
                                        <p className="text-slate-300 text-lg leading-relaxed">
                                            {auditResult.summary}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Category Scores */}
                            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                                {auditResult.scores && Object.entries(auditResult.scores).map(([category, score]) => {
                                    if (category === 'overall') return null;
                                    return (
                                        <div key={category} className={cn(
                                            "glass-card p-6 rounded-2xl border transition-all hover:scale-105 backdrop-blur-md shadow-xl",
                                            getScoreColor(score)
                                        )}>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                                                    {getScoreIcon(score)}
                                                </div>
                                                <span className="text-3xl font-black">{score}</span>
                                            </div>
                                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">{category}</h4>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Deep Analysis & Data */}
                            <div className="grid lg:grid-cols-2 gap-8">
                                {/* Page Analytics */}
                                <div className="glass-card p-8 rounded-3xl border border-white/5 bg-slate-900/30 backdrop-blur-xl group">
                                    <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                                        <Layout className="h-5 w-5 text-blue-400" /> Structure & Elements
                                    </h3>

                                    <div className="grid grid-cols-2 gap-6 mb-10">
                                        {[
                                            { label: "Title Length", val: auditResult.pageData?.title.length, sub: "characters" },
                                            { label: "Description", val: auditResult.pageData?.description.length, sub: "characters" },
                                            { label: "Total Images", val: auditResult.pageData?.images.total, sub: `${auditResult.pageData?.images.withoutAlt} missing alt` },
                                            { label: "Internal Links", val: auditResult.pageData?.links.total, sub: `${auditResult.pageData?.links.external} external` },
                                        ].map((item, i) => (
                                            <div key={i} className="bg-slate-950/50 p-5 rounded-2xl border border-white/5 hover:border-blue-500/20 transition-all">
                                                <div className="text-2xl font-black text-white mb-1">{item.val}</div>
                                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{item.label}</div>
                                                <div className="text-xs text-slate-400">{item.sub}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-6">
                                        <div className="p-4 bg-slate-950/30 rounded-xl border border-white/5">
                                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                <Info className="h-3 w-3" /> Meta Title
                                            </div>
                                            <p className="text-sm text-slate-300 font-medium italic">"{auditResult.pageData?.title || "Not Found"}"</p>
                                        </div>
                                        <div className="p-4 bg-slate-950/30 rounded-xl border border-white/5">
                                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                <Info className="h-3 w-3" /> Meta Description
                                            </div>
                                            <p className="text-sm text-slate-300 leading-relaxed overflow-hidden text-ellipsis">
                                                {auditResult.pageData?.description || "Not Found"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* AI Strategic Insights */}
                                <div className="space-y-6">
                                    {/* Quick Wins */}
                                    <div className="glass-card p-8 rounded-3xl border border-emerald-500/10 bg-emerald-500/5 shadow-emerald-900/10 transition-all">
                                        <h4 className="text-lg font-bold text-emerald-400 mb-6 flex items-center gap-2">
                                            <TrendingUp className="h-5 w-5" /> Instant Growth Opportunities
                                        </h4>
                                        <ul className="space-y-4">
                                            {auditResult.aiAnalysis?.quickWins?.map((win: string, idx: number) => (
                                                <li key={idx} className="flex items-start gap-4 group">
                                                    <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold border border-emerald-500/20 group-hover:scale-110 transition-transform">
                                                        {idx + 1}
                                                    </div>
                                                    <span className="text-sm text-slate-300 leading-relaxed">{win}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Priority Actions */}
                                    <div className="glass-card p-8 rounded-3xl border border-amber-500/10 bg-amber-500/5 shadow-amber-900/10 transition-all">
                                        <h4 className="text-lg font-bold text-amber-400 mb-6 flex items-center gap-2">
                                            <AlertTriangle className="h-5 w-5" /> Critical Priority Fixes
                                        </h4>
                                        <ul className="space-y-4">
                                            {auditResult.aiAnalysis?.priorityActions?.map((action: string, idx: number) => (
                                                <li key={idx} className="flex items-start gap-4 group">
                                                    <div className="mt-1 w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold border border-amber-500/20 group-hover:scale-110 transition-transform">
                                                        {idx + 1}
                                                    </div>
                                                    <span className="text-sm text-slate-300 leading-relaxed">{action}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <Button className="w-full h-16 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-3xl flex items-center justify-center gap-3 text-lg font-bold transition-all hover:border-blue-500/30 group">
                                        <Brain className="h-6 w-6 text-purple-400 group-hover:scale-110 transition-transform" />
                                        Advanced AI Strategy Report
                                        <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuickAuditDemo;
