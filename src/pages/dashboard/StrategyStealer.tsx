import React, { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import {
    Swords,
    Target,
    Zap,
    TrendingUp,
    Loader2,
    Skull,
    ArrowUpRight,
    Lock,
    Search,
    Split,
    Info,
    CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { stealStrategy, StrategyReport } from "@/services/ai";

const StrategyStealer = () => {
    const [yourDomain, setYourDomain] = useState("");
    const [competitorDomain, setCompetitorDomain] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [report, setReport] = useState<StrategyReport | null>(null);

    const handleSpy = async () => {
        if (!yourDomain || !competitorDomain) {
            toast.error("Enter both domains to compare");
            return;
        }

        setIsLoading(true);
        try {
            const result = await stealStrategy(yourDomain, competitorDomain);
            setReport(result);
            toast.success("Competitor strategy exposed!");
        } catch (error) {
            toast.error("Failed to steal strategy");
        } finally {
            setIsLoading(false);
        }
    };

    const getDifficultyColor = (diff: string) => {
        switch (diff) {
            case 'Easy': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
            case 'Medium': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
            case 'Hard': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
            default: return 'text-slate-400';
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <DashboardHeader
                title="Strategy Stealer"
                subtitle="Deconstruct & Outrank Your Top Competitors"
            />

            <div className="max-w-[1600px] mx-auto w-full space-y-8 pt-8 pb-20 px-4 md:px-8">
                {/* ⚔️ War Room Section */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 border border-white/10 p-8 md:p-12">
                        <div className="max-w-4xl relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
                                <Swords className="h-4 w-4" />
                                Growth Intelligence
                            </div>

                            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6 leading-[1.1]">
                                Market <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-300 to-fuchsia-400 bg-[length:200%_auto] animate-gradient drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">Intel</span> AI
                            </h1>

                            <p className="text-slate-400 text-lg font-medium max-w-2xl leading-relaxed mb-10">
                                Enter your competitor's domain and we'll deconstruct their <span className="text-white">winning content patterns</span>, traffic drivers, and precisely where you can steal their market share.
                            </p>

                            <div className="bg-slate-900/50 p-8 rounded-[2rem] border border-white/5 backdrop-blur-md space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Your Domain</label>
                                        <div className="relative group/input">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within/input:text-indigo-400 transition-colors" />
                                            <Input
                                                placeholder="yourdomain.com"
                                                className="h-12 pl-10 bg-slate-950 border-white/10 text-white rounded-xl focus:ring-2 focus:ring-indigo-500/20"
                                                value={yourDomain}
                                                onChange={(e) => setYourDomain(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Competitor Domain</label>
                                        <div className="relative group/input">
                                            <Skull className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within/input:text-rose-400 transition-colors" />
                                            <Input
                                                placeholder="competitor.com"
                                                className="h-12 pl-10 bg-slate-950 border-white/10 text-white rounded-xl focus:ring-2 focus:ring-rose-500/20"
                                                value={competitorDomain}
                                                onChange={(e) => setCompetitorDomain(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleSpy}
                                    disabled={isLoading}
                                    className="w-full h-14 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black shadow-lg shadow-indigo-900/20 transition-all group text-lg mt-4"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Deconstructing Competitor Funnel...
                                        </>
                                    ) : (
                                        <>
                                            Expose Growth Strategy
                                            <ArrowUpRight className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 📊 Intelligence Report */}
                {report && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        {/* Domain Gap Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="bg-slate-900/40 border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500"></div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Market Share Overlap</p>
                                <h3 className="text-4xl font-black text-white mb-4">{report.marketOverlap}%</h3>
                                <div className="flex gap-1 h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="bg-indigo-500 h-full transition-all duration-1000" style={{ width: `${report.marketOverlap}%` }}></div>
                                </div>
                            </Card>

                            <Card className="md:col-span-2 bg-slate-900/40 border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md">
                                <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <Zap className="h-4 w-4" />
                                    AI-Identified Quick Wins
                                </h4>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {report.quickWins.map((win, i) => (
                                        <div key={i} className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 rounded-2xl">
                                            <div className="h-6 w-6 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                                <CheckCircle2 className="h-3 w-3" />
                                            </div>
                                            <span className="text-xs font-medium text-slate-300">{win}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>

                        {/* Pattern Deep Dive */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-black text-white flex items-center gap-3">
                                <Split className="h-6 w-6 text-indigo-400" />
                                High-Priority Growth Patterns
                            </h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {report.winningContentPatterns.map((pattern, i) => (
                                    <Card key={i} className="bg-slate-900/40 border-white/5 rounded-[2.5rem] p-8 backdrop-blur-md relative group hover:border-indigo-500/30 transition-all">
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <Badge className={`mb-3 ${getDifficultyColor(pattern.difficulty)} border`}>
                                                    {pattern.difficulty} Difficulty
                                                </Badge>
                                                <h4 className="text-2xl font-black text-white uppercase">{pattern.topic}</h4>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Est. Impact</p>
                                                <p className="text-xl font-black text-indigo-400">{pattern.estimatedTraffic}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="p-4 bg-slate-950/50 border border-white/5 rounded-2xl">
                                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">The Gap</p>
                                                <p className="text-sm text-slate-400 leading-relaxed italic">{pattern.yourGap}</p>
                                            </div>

                                            <div className="p-6 bg-gradient-to-br from-slate-900 to-indigo-950/30 border border-indigo-500/20 rounded-2xl shadow-xl">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <Lock className="h-4 w-4 text-indigo-400" />
                                                    <p className="text-xs font-black text-white uppercase tracking-widest">Growth Playbook</p>
                                                </div>
                                                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                                                    {pattern.stealStrategy}
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StrategyStealer;
