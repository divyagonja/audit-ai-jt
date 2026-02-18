import React, { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import {
    Swords,
    Link,
    AlertTriangle,
    CheckCircle2,
    ArrowRight,
    Loader2,
    RefreshCcw,
    Info,
    Target,
    Zap,
    Split,
    Combine,
    Repeat
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { detectCannibalization, CannibalizationIssue } from "@/services/ai";

const CannibalizationChecker = () => {
    const [domain, setDomain] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [issues, setIssues] = useState<CannibalizationIssue[] | null>(null);

    const handleAnalyze = async () => {
        if (!domain.trim()) {
            toast.error("Please enter a domain to analyze");
            return;
        }

        setIsLoading(true);
        try {
            const results = await detectCannibalization(domain);
            setIssues(results);
            toast.success("Analysis complete. Found keyword cannibalization issues.");
        } catch (error) {
            toast.error("Failed to analyze domain");
        } finally {
            setIsLoading(false);
        }
    };

    const getActionIcon = (action: string) => {
        switch (action) {
            case 'Merge': return <Combine className="h-4 w-4" />;
            case 'Redirect': return <Repeat className="h-4 w-4" />;
            case 'Canonical': return <Link className="h-4 w-4" />;
            case 'Optimize': return <Zap className="h-4 w-4" />;
            default: return <Info className="h-4 w-4" />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <DashboardHeader
                title="Keyword Cannibalization"
                subtitle="Detect & Fix Internal Content Competition"
            />

            <div className="max-w-[1600px] mx-auto w-full space-y-8 pt-8 pb-20 px-4 md:px-8">
                {/* ⚔️ Hero Section */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-rose-600 to-orange-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 border border-white/10 p-8 md:p-12">
                        <div className="max-w-4xl relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-[0_0_20px_rgba(244,63,94,0.15)]">
                                <Swords className="h-4 w-4" />
                                Strategic Conflict Resolver
                            </div>

                            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6 leading-[1.1]">
                                Content <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-orange-300 to-amber-400 bg-[length:200%_auto] animate-gradient drop-shadow-[0_0_15px_rgba(251,113,133,0.3)]">Conflict</span> AI
                            </h1>

                            <p className="text-slate-400 text-lg font-medium max-w-2xl leading-relaxed mb-10">
                                Stop fighting yourself. Our AI detects when multiple pages are competing for the same intent and provides <span className="text-white">exact technical solutions</span> to boost your rankings.
                            </p>

                            <div className="flex flex-col md:flex-row gap-4 max-w-2xl">
                                <div className="relative flex-1 group/input">
                                    <Target className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within/input:text-rose-400 transition-colors" />
                                    <Input
                                        placeholder="e.g. yourdomain.com"
                                        className="h-14 pl-12 bg-slate-900 border-white/10 text-white rounded-2xl focus:ring-2 focus:ring-rose-500/20 transition-all font-medium text-lg"
                                        value={domain}
                                        onChange={(e) => setDomain(e.target.value)}
                                    />
                                </div>
                                <Button
                                    onClick={handleAnalyze}
                                    disabled={isLoading}
                                    className="h-14 px-8 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black shadow-lg shadow-rose-900/20 transition-all group"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Scanning Index...
                                        </>
                                    ) : (
                                        <>
                                            Detect Conflicts
                                            <RefreshCcw className="ml-2 h-5 w-5 group-hover:rotate-180 transition-transform duration-700" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>

                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/5 blur-[120px] -mr-48 -mt-48"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/5 blur-[80px] -ml-32 -mb-32"></div>
                    </div>
                </div>

                {/* 📊 Results Grid */}
                {issues && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="flex items-center justify-between px-4">
                            <h2 className="text-2xl font-black text-white flex items-center gap-3">
                                <AlertTriangle className="h-6 w-6 text-orange-400" />
                                Critical Ranking Conflicts Found
                            </h2>
                            <Badge variant="outline" className="text-slate-400 border-white/5 bg-white/5 px-4 py-1.5 rounded-full font-bold">
                                {issues.length} Keywords Affected
                            </Badge>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {issues.map((issue, idx) => (
                                <Card key={idx} className="bg-slate-900/40 border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md overflow-hidden relative">
                                    <div className="flex flex-col xl:flex-row gap-10">
                                        {/* Keyword & Competing URLs */}
                                        <div className="flex-1 space-y-6">
                                            <div>
                                                <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest block mb-2">Target Keyword</span>
                                                <h3 className="text-3xl font-black text-white mb-6 uppercase">{issue.keyword}</h3>
                                            </div>

                                            <div className="space-y-4">
                                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Competing Pages</span>
                                                {issue.urls.map((u, i) => (
                                                    <div key={i} className={`p-4 rounded-3xl border transition-all ${i === 0 ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-slate-950/50 border-white/5'}`}>
                                                        <div className="flex items-center justify-between gap-4">
                                                            <div className="min-w-0">
                                                                <p className="text-xs font-bold text-slate-500 mb-1">
                                                                    {i === 0 ? "Potential Winner" : "Competitor URL"}
                                                                </p>
                                                                <p className="text-sm font-medium text-slate-200 truncate">{u.url}</p>
                                                            </div>
                                                            <div className="flex gap-4 shrink-0">
                                                                <div className="text-center">
                                                                    <p className="text-[10px] font-black text-slate-600 uppercase mb-0.5">Pos</p>
                                                                    <p className="text-lg font-black text-white">#{u.position}</p>
                                                                </div>
                                                                <div className="text-center">
                                                                    <p className="text-[10px] font-black text-slate-600 uppercase mb-0.5">Trust</p>
                                                                    <p className="text-lg font-black text-amber-500">{u.relevanceScore}%</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* AI Recommendation Panel */}
                                        <div className="xl:w-1/3 space-y-6">
                                            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 shadow-2xl relative">
                                                <div className="absolute top-4 right-4 text-rose-500/20">
                                                    <Zap className="h-10 w-10" />
                                                </div>

                                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-black uppercase tracking-widest mb-6">
                                                    AI Strategy Recommendation
                                                </div>

                                                <div className="flex items-center gap-4 mb-6">
                                                    <div className="h-14 w-14 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-400 shadow-inner">
                                                        {getActionIcon(issue.suggestedAction)}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-2xl font-black text-white">{issue.suggestedAction}</h4>
                                                        <p className="text-xs text-slate-500 font-bold">Suggested Priority Fix</p>
                                                    </div>
                                                </div>

                                                <p className="text-sm text-slate-300 leading-relaxed font-medium mb-8">
                                                    {issue.aiReasoning}
                                                </p>

                                                <div className="space-y-3">
                                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Action Plan</p>
                                                    {issue.actionSteps.map((step, i) => (
                                                        <div key={i} className="flex items-start gap-3 text-xs text-slate-400">
                                                            <div className="h-4 w-4 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-black text-rose-400 shrink-0 mt-0.5">
                                                                {i + 1}
                                                            </div>
                                                            <span className="leading-relaxed">{step}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <Button className="w-full mt-8 bg-white text-slate-950 hover:bg-slate-200 font-black rounded-xl h-12">
                                                    Apply technical fix
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CannibalizationChecker;
