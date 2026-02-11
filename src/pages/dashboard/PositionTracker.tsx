import React, { useState } from "react";
import {
    Activity,
    Plus,
    TrendingUp,
    TrendingDown,
    Target,
    BarChart3,
    Sparkles,
    Loader2,
    ShieldCheck,
    Lightbulb,
    ArrowUpRight,
    Search,
    BrainCircuit,
    Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPositionGrowthStrategy, PositionTrackerResponse } from "@/services/ai/positionTracker";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const PositionTracker = () => {
    const [newKeyword, setNewKeyword] = useState("");
    const [newRank, setNewRank] = useState("");
    const [trackedKeywords, setTrackedKeywords] = useState<{ keyword: string, rank: number }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<PositionTrackerResponse | null>(null);

    const addKeyword = () => {
        if (!newKeyword.trim() || !newRank.trim()) {
            toast.error("Enter keyword and current rank");
            return;
        }
        setTrackedKeywords([...trackedKeywords, { keyword: newKeyword, rank: parseInt(newRank) }]);
        setNewKeyword("");
        setNewRank("");
    };

    const handleTrack = async () => {
        if (trackedKeywords.length === 0) {
            toast.error("Add at least one keyword to track");
            return;
        }

        setIsLoading(true);
        try {
            const response = await getPositionGrowthStrategy(trackedKeywords);
            setResults(response);
            toast.success("Organic growth strategy synthesized!");
        } catch (error) {
            toast.error("Failed to track positions.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <DashboardHeader
                title="Position Tracker"
                subtitle="Organic growth monitoring and SERP position analysis"
            />
            <div className="max-w-[1600px] mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 pt-8 pb-20 px-4 md:px-8">
                {/* 📈 Tracker Header */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 border border-white/10 p-8 md:p-12">
                        <div className="max-w-4xl relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                                <Activity className="h-4 w-4 animate-pulse" />
                                Organic Growth Sentinel
                            </div>

                            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6 leading-[1.1]">
                                Position <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-[length:200%_auto] animate-gradient drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">Tracker</span>
                            </h1>

                            <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-2xl font-medium">
                                Monitor your SERP rankings and receive <span className="text-white">AI-driven battle plans</span> for every keyword.
                                Turn ranking data into actionable growth strategies.
                            </p>

                            <div className="flex flex-col md:flex-row gap-4 items-end bg-slate-900/50 p-6 rounded-[2rem] border border-white/5 backdrop-blur-md">
                                <div className="flex-1 space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Target Keyword</label>
                                    <Input
                                        placeholder="e.g. 'best seo tool'"
                                        className="h-14 bg-slate-950 border-white/10 text-white rounded-xl focus:ring-4 focus:ring-emerald-500/10 transition-all"
                                        value={newKeyword}
                                        onChange={(e) => setNewKeyword(e.target.value)}
                                    />
                                </div>
                                <div className="w-full md:w-32 space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Current Rank</label>
                                    <Input
                                        type="number"
                                        placeholder="e.g. 5"
                                        className="h-14 bg-slate-950 border-white/10 text-white rounded-xl focus:ring-4 focus:ring-emerald-500/10 transition-all text-center"
                                        value={newRank}
                                        onChange={(e) => setNewRank(e.target.value)}
                                    />
                                </div>
                                <Button onClick={addKeyword} variant="outline" className="h-14 px-6 rounded-xl border-white/10 hover:bg-emerald-500/10 hover:border-emerald-500/30 text-emerald-400 font-bold flex items-center gap-2">
                                    <Plus className="h-5 w-5" /> Add
                                </Button>
                                <Button
                                    onClick={handleTrack}
                                    disabled={isLoading || trackedKeywords.length === 0}
                                    className="h-14 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black shadow-lg shadow-emerald-900/20 transition-all group"
                                >
                                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Zap className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" /> Analyze Performance</>}
                                </Button>
                            </div>

                            {trackedKeywords.length > 0 && !results && (
                                <div className="mt-8 flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2">
                                    {trackedKeywords.map((k, i) => (
                                        <Badge key={i} className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 py-1.5 px-4 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-2">
                                            {k.keyword} <span className="text-white/40">#{k.rank}</span>
                                            <button onClick={() => setTrackedKeywords(trackedKeywords.filter((_, idx) => idx !== i))} className="hover:text-rose-400 ml-1">×</button>
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {results && (
                    <div className="space-y-8">
                        {/* 📊 High-Level Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[
                                { label: "Visibility Score", value: `${results.visibilityScore}%`, icon: ShieldCheck, color: "text-emerald-400" },
                                { label: "Avg Position", value: results.avgPosition, icon: Target, color: "text-blue-400" },
                                { label: "Top 3 Keywords", value: results.top3, icon: Trophy, color: "text-amber-400" },
                                { label: "Active Project", value: results.totalKeywords, icon: Activity, color: "text-rose-400" }
                            ].map((stat, i) => (
                                <Card key={i} className="bg-slate-900/40 border-white/5 rounded-3xl p-6 backdrop-blur-xl group hover:border-white/10 transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-3 rounded-2xl bg-slate-950/50 border border-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                                            <stat.icon className="h-6 w-6" />
                                        </div>
                                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</div>
                                    </div>
                                    <div className="text-3xl font-black text-white">{stat.value}</div>
                                </Card>
                            ))}
                        </div>

                        {/* 💡 Executive Insight */}
                        <Card className="bg-slate-900/60 border-emerald-500/30 rounded-3xl p-8 relative overflow-hidden group backdrop-blur-xl">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[100px] pointer-events-none group-hover:bg-emerald-500/15 transition-all" />
                            <div className="relative flex gap-6 items-start">
                                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                    <Lightbulb className="h-8 w-8 animate-pulse" />
                                </div>
                                <div className="space-y-2 max-w-4xl">
                                    <h3 className="text-xl font-black text-white italic tracking-tight">"Executive Organic Strategy"</h3>
                                    <p className="text-emerald-50/90 text-xl font-semibold leading-relaxed drop-shadow-sm">{results.executiveAdvice}</p>
                                </div>
                            </div>
                        </Card>

                        {/* 📑 Keyword Matrix */}
                        <Card className="bg-slate-900/30 border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-md shadow-2xl">
                            <div className="overflow-x-auto custom-scrollbar">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-950/50">
                                        <tr>
                                            <th className="py-8 px-8 text-slate-500 font-black uppercase text-[10px] tracking-[0.2em]">Keyword Performance</th>
                                            <th className="py-8 px-8 text-slate-500 font-black uppercase text-[10px] tracking-[0.2em] text-center">Current Rank</th>
                                            <th className="py-8 px-8 text-slate-500 font-black uppercase text-[10px] tracking-[0.2em] text-center">Change</th>
                                            <th className="py-8 px-8 text-slate-500 font-black uppercase text-[10px] tracking-[0.2em]">Growth Battle-Plan</th>
                                            <th className="py-8 px-8 text-slate-500 font-black uppercase text-[10px] tracking-[0.2em] text-center">SERP Features</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.keywords.map((kw, i) => (
                                            <tr key={i} className="border-t border-white/5 hover:bg-emerald-500/[0.03] transition-colors group">
                                                <td className="py-6 px-8">
                                                    <div className="flex flex-col">
                                                        <span className="text-white font-black text-sm group-hover:translate-x-1 transition-transform">{kw.keyword}</span>
                                                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">VOL: {kw.vol}</span>
                                                    </div>
                                                </td>
                                                <td className="py-6 px-8 text-center">
                                                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-950/50 border border-white/5 text-white font-black">
                                                        #{kw.rank}
                                                    </div>
                                                </td>
                                                <td className="py-6 px-8 text-center text-emerald-400 font-black text-xs">
                                                    <div className="flex items-center justify-center gap-1">
                                                        <TrendingUp className="h-3 w-3" />
                                                        +{kw.change}
                                                    </div>
                                                </td>
                                                <td className="py-6 px-8">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                                                            <Sparkles className="h-3 w-3" />
                                                        </div>
                                                        <span className="text-slate-400 text-xs font-medium leading-relaxed max-w-xs italic group-hover:text-slate-200 transition-colors">
                                                            "{kw.growthStrategy}"
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-6 px-8 text-center">
                                                    <div className="flex flex-wrap gap-2 justify-center">
                                                        {kw.serpFeatures.map((feat, fIdx) => (
                                                            <Badge key={fIdx} variant="outline" className="text-[9px] uppercase font-black border-white/10 text-slate-500">
                                                                {feat}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                )}

                {!results && !isLoading && trackedKeywords.length === 0 && (
                    <div className="py-32 flex flex-col items-center justify-center text-center">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-emerald-500/10 blur-[80px] rounded-full" />
                            <Activity className="h-20 w-20 text-emerald-500/30 relative z-10" />
                        </div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Awaiting Target Parameters</h3>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Add specific keywords above to initiate growth monitoring.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// Simple Trophy and Check icons not in standard lucide for this set
const Trophy = (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>
);

export default PositionTracker;
