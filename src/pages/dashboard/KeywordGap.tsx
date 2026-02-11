import React, { useState } from "react";
import {
    Swords,
    Search,
    ArrowRight,
    Zap,
    Loader2,
    ShieldAlert,
    ShieldCheck,
    Target,
    Trophy,
    Flame,
    TrendingDown,
    Activity,
    BrainCircuit
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { analyzeKeywordGap, KeywordGapResponse } from "@/services/ai/keywordGap";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const KeywordGap = () => {
    const [myDomain, setMyDomain] = useState("");
    const [compDomain, setCompDomain] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<KeywordGapResponse | null>(null);

    const handleAnalyze = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!myDomain.trim() || !compDomain.trim()) {
            toast.error("Please enter both domains to compare");
            return;
        }

        setIsLoading(true);
        try {
            const response = await analyzeKeywordGap(myDomain, compDomain);
            setResults(response);
            toast.success("Competitive intelligence synthesis complete!");
        } catch (error: any) {
            toast.error("Failed to analyze gap.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <DashboardHeader
                title="Keyword Gap Analysis"
                subtitle="Identify strategic semantic vulnerabilities and competitive advantages"
            />
            <div className="max-w-[1600px] mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 pt-8 pb-20 px-4 md:px-8">
                {/* ⚔️ Battle Header */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-rose-600 to-amber-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 border border-white/10 p-8 md:p-12">
                        <div className="max-w-4xl relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-[0_0_20px_rgba(244,63,94,0.15)]">
                                <Swords className="h-4 w-4 animate-pulse" />
                                Competitive Intelligence v2.0
                            </div>

                            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6 leading-[1.1]">
                                Keyword <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-orange-300 to-amber-400 bg-[length:200%_auto] animate-gradient drop-shadow-[0_0_15px_rgba(251,113,133,0.3)]">Gap Analysis</span>
                            </h1>

                            <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-2xl font-medium">
                                Identify the exact keywords your competitors use to steal your traffic.
                                Our neural engine performs a <span className="text-white">semantic overlap analysis</span> to find high-ROI missing keywords.
                            </p>

                            <form onSubmit={handleAnalyze} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Primary Domain</label>
                                    <Input
                                        placeholder="yourdomain.com"
                                        className="h-14 bg-slate-900/50 border-white/10 text-white rounded-2xl focus:ring-4 focus:ring-rose-500/10 transition-all font-medium"
                                        value={myDomain}
                                        onChange={(e) => setMyDomain(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Competitor Domain</label>
                                    <Input
                                        placeholder="competitor.com"
                                        className="h-14 bg-slate-900/50 border-white/10 text-white rounded-2xl focus:ring-4 focus:ring-amber-500/10 transition-all font-medium"
                                        value={compDomain}
                                        onChange={(e) => setCompDomain(e.target.value)}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="h-14 px-8 rounded-2xl bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white font-black shadow-lg shadow-rose-900/20 group transition-all text-lg"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                                            Analyzing Gap...
                                        </>
                                    ) : (
                                        <>
                                            Compare
                                            <Zap className="ml-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>

                {results && (
                    <div className="space-y-12">
                        {/* ⚔️ The Battlefront: Domain Profiles */}
                        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 items-stretch">

                            {/* Primary Domain Profile */}
                            <Card className="lg:col-span-2 bg-slate-900/40 border-blue-500/20 rounded-[2.5rem] p-8 backdrop-blur-xl relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 blur-[60px] -ml-16 -mt-16 group-hover:bg-blue-500/20 transition-all" />

                                <div className="relative z-10 space-y-6">
                                    <div className="flex justify-between items-start">
                                        <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 font-black uppercase tracking-widest text-[10px]">Primary Base</Badge>
                                        <div className="text-right">
                                            <div className="text-2xl font-black text-white">{results.myProfile.authorityScore}</div>
                                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Authority</div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-black text-white truncate mb-1">{results.myDomain}</h3>
                                        <p className="text-blue-400 text-xs font-bold uppercase tracking-wider">{results.myProfile.primaryNiche}</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Key Strengths</p>
                                            <div className="flex flex-wrap gap-2">
                                                {results.myProfile.semanticStrengths.map(s => (
                                                    <Badge key={s} variant="outline" className="bg-blue-500/5 border-blue-500/10 text-slate-300 text-[9px] py-0.5">{s}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Top Focus</p>
                                            <div className="flex flex-wrap gap-2">
                                                {results.myProfile.topKeywords.map(k => (
                                                    <span key={k} className="text-xs font-medium text-slate-400">#{k}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* ⚡ The Nexus: Overlap Analysis */}
                            <div className="lg:col-span-3 flex flex-col gap-6">
                                <Card className="flex-1 bg-slate-950 border-white/5 rounded-[2.5rem] p-8 flex flex-col items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent opacity-50" />

                                    <div className="relative mb-8 text-center">
                                        <div className="absolute inset-0 bg-orange-500/20 blur-[100px] animate-pulse rounded-full" />
                                        <div className="relative inline-flex items-center justify-center">
                                            <svg className="w-44 h-44 transform -rotate-90">
                                                <circle cx="88" cy="88" r="80" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-slate-900" />
                                                <circle
                                                    cx="88" cy="88" r="80" stroke="currentColor" strokeWidth="12" fill="transparent"
                                                    strokeDasharray={502.6} strokeDashoffset={502.6 - (502.6 * results.overlapScore) / 100}
                                                    className="text-orange-500 transition-all duration-1000 ease-out drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]" strokeLinecap="round"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-5xl font-black text-white">{results.overlapScore}%</span>
                                                <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mt-2">Semantic Overlap</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center space-y-2 relative z-10 px-8">
                                        <p className="text-slate-400 text-sm font-medium italic leading-relaxed">
                                            "Competitor has a <span className="text-orange-400 font-bold">{100 - results.overlapScore}% advantage</span> in untapped semantic territory."
                                        </p>
                                        <div className="pt-4 flex justify-center gap-4">
                                            <div className="text-center">
                                                <p className="text-xl font-black text-white">{results.totalGapsFound}</p>
                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Gaps Found</p>
                                            </div>
                                            <div className="w-px h-10 bg-white/10" />
                                            <div className="text-center">
                                                <p className="text-xl font-black text-white">Very High</p>
                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Impact Potential</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            {/* Competitor Domain Profile */}
                            <Card className="lg:col-span-2 bg-slate-900/40 border-rose-500/20 rounded-[2.5rem] p-8 backdrop-blur-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-[60px] -mr-16 -mt-16 group-hover:bg-rose-500/20 transition-all" />

                                <div className="relative z-10 space-y-6 text-right">
                                    <div className="flex justify-between items-start">
                                        <div className="text-left">
                                            <div className="text-2xl font-black text-white">{results.competitorProfile.authorityScore}</div>
                                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Authority</div>
                                        </div>
                                        <Badge className="bg-rose-500/10 text-rose-400 border-rose-500/20 font-black uppercase tracking-widest text-[10px]">Hostile Base</Badge>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-black text-white truncate mb-1">{results.competitorDomain}</h3>
                                        <p className="text-rose-400 text-xs font-bold uppercase tracking-wider">{results.competitorProfile.primaryNiche}</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Domain Strengths</p>
                                            <div className="flex flex-wrap gap-2 justify-end">
                                                {results.competitorProfile.semanticStrengths.map(s => (
                                                    <Badge key={s} variant="outline" className="bg-rose-500/5 border-rose-500/10 text-slate-300 text-[9px] py-0.5">{s}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Top Focus</p>
                                            <div className="flex flex-wrap gap-2 justify-end">
                                                {results.competitorProfile.topKeywords.map(k => (
                                                    <span key={k} className="text-xs font-medium text-slate-400">#{k}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* 💡 The Strategic Intelligence Brief */}
                        <Card className="bg-slate-900/80 border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden backdrop-blur-2xl shadow-2xl">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[130px] -mr-64 -mt-64 pointer-events-none" />
                            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start">
                                <div className="shrink-0 space-y-4">
                                    <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                                        <ShieldCheck className="h-8 w-8" />
                                    </div>
                                    <h4 className="text-xl font-black text-white tracking-tight leading-tight">Strategic<br />Intelligence Brief</h4>
                                </div>

                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {results.strategicInsights.map((insight, i) => (
                                        <div key={i} className="space-y-3 p-6 rounded-3xl bg-slate-950/50 border border-white/5 group hover:border-blue-500/30 transition-all">
                                            <div className="flex items-center gap-3">
                                                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px] font-black text-blue-300">
                                                    0{i + 1}
                                                </div>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Growth Intelligence</span>
                                            </div>
                                            <p className="text-slate-100 font-semibold text-base leading-relaxed">{insight}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>

                        {/* 🕵️ The Extraction Matrix (Gap Table) */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between px-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400">
                                        <Activity className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Keyword Extraction Matrix</h3>
                                </div>
                                <Badge variant="outline" className="border-white/10 text-slate-500 font-black uppercase text-[10px] tracking-widest px-4 py-1">
                                    {results.gaps.length} Target Opportunities
                                </Badge>
                            </div>

                            <Card className="bg-slate-900/30 border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-md shadow-2xl">
                                <div className="overflow-x-auto custom-scrollbar">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-950/50">
                                            <tr>
                                                <th className="py-8 px-8 text-slate-500 font-black uppercase text-[10px] tracking-[0.2em]">Infiltration Target</th>
                                                <th className="py-8 px-8 text-slate-500 font-black uppercase text-[10px] tracking-[0.2em] text-center">My Rank</th>
                                                <th className="py-8 px-8 text-slate-500 font-black uppercase text-[10px] tracking-[0.2em] text-center">Hostile Rank</th>
                                                <th className="py-8 px-8 text-slate-500 font-black uppercase text-[10px] tracking-[0.2em] text-center">ROI Density</th>
                                                <th className="py-8 px-8 text-slate-500 font-black uppercase text-[10px] tracking-[0.2em]">Extraction Protocol</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {results.gaps.map((gap, i) => (
                                                <tr key={i} className="hover:bg-blue-500/[0.03] transition-colors group">
                                                    <td className="py-6 px-8">
                                                        <div className="flex flex-col">
                                                            <span className="text-white font-black text-sm group-hover:text-blue-400 transition-colors uppercase tracking-tight">{gap.keyword}</span>
                                                            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-1">Semantic Tier 01</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-6 px-8 text-center">
                                                        <div className={`inline-flex items-center justify-center p-2 rounded-lg border text-xs font-black min-w-[3rem] ${gap.myRank === 'N/A' ? 'bg-slate-900/50 border-white/5 text-slate-600' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                                            }`}>
                                                            {gap.myRank}
                                                        </div>
                                                    </td>
                                                    <td className="py-6 px-8 text-center text-rose-500 font-black text-xs">
                                                        <div className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-rose-500/5 border border-rose-500/10">
                                                            <TrendingDown className="h-3 w-3" />
                                                            #{gap.competitorRank}
                                                        </div>
                                                    </td>
                                                    <td className="py-6 px-8 text-center">
                                                        <Badge className={`text-[9px] font-black uppercase tracking-widest py-1 px-3 ${gap.gapOpportunity === 'Very High' ? 'bg-orange-600 text-white shadow-[0_0_15px_rgba(234,88,12,0.3)]' :
                                                            'bg-slate-800 text-slate-400'
                                                            }`}>
                                                            {gap.gapOpportunity}
                                                        </Badge>
                                                    </td>
                                                    <td className="py-6 px-8">
                                                        <div className="flex items-center justify-between gap-6">
                                                            <p className="text-slate-400 text-xs font-medium leading-relaxed italic max-w-xs group-hover:text-slate-200 transition-colors">
                                                                "{gap.action}"
                                                            </p>
                                                            <Button variant="ghost" className="shrink-0 h-10 px-4 rounded-xl border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest gap-2">
                                                                Neutralize <Zap className="h-3.5 w-3.5" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        </div>
                    </div>
                )}

                {!results && !isLoading && (
                    <div className="py-32 flex flex-col items-center justify-center text-center">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-rose-500/10 blur-[80px] rounded-full" />
                            <BrainCircuit className="h-20 w-20 text-rose-500/30 relative z-10" />
                        </div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Engage Combat Protocol</h3>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Compare domains to identify strategic semantic weaknesses.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default KeywordGap;
