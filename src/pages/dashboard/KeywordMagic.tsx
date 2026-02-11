import React, { useState } from "react";
import {
    Search,
    Sparkles,
    ArrowRight,
    Download,
    Database,
    TrendingUp,
    Target,
    Filter,
    Layers,
    HelpCircle,
    BrainCircuit,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getKeywordSuggestions, KeywordResult, KeywordMagicResponse } from "@/services/ai/keywordMagic";
import { toast } from "sonner";

import { motion, AnimatePresence } from "framer-motion";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const KeywordMagic = () => {
    const [keyword, setKeyword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<KeywordMagicResponse | null>(null);

    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!keyword.trim()) {
            toast.error("Please enter a keyword");
            return;
        }

        setIsLoading(true);
        try {
            const response = await getKeywordSuggestions(keyword);
            setResults(response);
            toast.success("Keyword suggestions generated!");
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Failed to generate keywords. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const getIntentColor = (intent: string) => {
        switch (intent) {
            case 'Transactional': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 ring-1 ring-emerald-500/20';
            case 'Commercial': return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30 ring-1 ring-indigo-500/20';
            case 'Informational': return 'bg-amber-500/20 text-amber-400 border-amber-500/30 ring-1 ring-amber-500/20';
            case 'Navigational': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30 ring-1 ring-cyan-500/20';
            default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
        }
    };

    const getKDColor = (score: number) => {
        if (score < 30) return 'text-emerald-400';
        if (score < 60) return 'text-amber-400';
        return 'text-rose-400';
    };

    return (
        <div className="min-h-screen flex flex-col">
            <DashboardHeader
                title="Keyword Magic Tool"
                subtitle="Neural keyword expansion and semantic metrics analysis"
            />
            <div className="max-w-[1600px] mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 pt-8 pb-20 px-4 md:px-8">
                {/* 🧠 Hero / Search Section */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 border border-white/10 p-8 md:p-16">
                        {/* Dynamic Background Elements */}
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] -mr-64 -mt-64 pointer-events-none animate-pulse" />
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/5 blur-[100px] -ml-40 -mb-40 pointer-events-none" />

                        <div className="max-w-4xl relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                                <BrainCircuit className="h-4 w-4 animate-pulse" />
                                Neural Keyword Engine v2.0
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-[1.1]">
                                Keyword <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-[length:200%_auto] animate-gradient drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">Magic Tool</span>
                            </h1>

                            <p className="text-slate-400 text-xl leading-relaxed mb-10 max-w-2xl font-medium">
                                Synthesize millions of data points into high-ROI keywords. Our neural engine delivers
                                <span className="text-white"> real-time search volume</span>, <span className="text-white">intent mapping</span>, and <span className="text-white">competition metrics</span>.
                            </p>

                            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-stretch">
                                <div className="relative flex-1 group/input">
                                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                                        <Search className="h-6 w-6 text-slate-500 group-focus-within/input:text-blue-400 transition-colors" />
                                    </div>
                                    <Input
                                        placeholder="Enter seed keyword (e.g., 'artificial intelligence')"
                                        className="h-16 pl-14 pr-6 bg-slate-900/50 border-white/10 text-white rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/40 transition-all text-xl font-medium placeholder:text-slate-600"
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="h-16 px-10 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black shadow-[0_20px_40px_-15px_rgba(59,130,246,0.5)] group transition-all text-lg"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            Generate
                                            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1.5 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </form>

                            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm">
                                <span className="text-slate-500 font-bold uppercase tracking-wider text-xs">Trending Now:</span>
                                {['saas seo', 'buy crypto', 'marketing ai'].map((ex) => (
                                    <button
                                        key={ex}
                                        onClick={() => { setKeyword(ex); handleSearch(); }}
                                        className="text-slate-400 hover:text-blue-400 transition-colors font-semibold border-b border-transparent hover:border-blue-400/30 pb-0.5"
                                    >
                                        {ex}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {results && (
                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                        {/* 📊 Sidebar: Insights & Groups */}
                        <div className="xl:col-span-1 space-y-6">
                            <Card className="bg-slate-900/40 border-white/5 rounded-[2rem] p-8 backdrop-blur-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl group-hover:bg-blue-600/10 transition-colors duration-500" />

                                <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                                    <div className="p-1.5 rounded-lg bg-slate-800 border border-white/5">
                                        <Layers className="h-4 w-4 text-blue-400" />
                                    </div>
                                    Cluster Groups
                                </h3>

                                <div className="space-y-2">
                                    <button className="w-full flex justify-between items-center px-5 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-sm shadow-xl shadow-blue-900/20 group hover:scale-[1.02] transition-all">
                                        <span className="flex items-center gap-3">
                                            <Database className="h-4 w-4 opacity-70" />
                                            All Keywords
                                        </span>
                                        <span className="bg-white/20 px-2.5 py-1 rounded-lg text-[10px]">{results.suggestions.length}</span>
                                    </button>

                                    {results.categories.map((cat) => (
                                        <button key={cat.name} className="w-full flex justify-between items-center px-5 py-4 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm font-bold group">
                                            <span>{cat.name}</span>
                                            <span className="text-[10px] text-slate-500 bg-slate-950 px-2.5 py-1 rounded-lg border border-white/5 group-hover:border-blue-500/30 group-hover:text-blue-400 transition-colors">{cat.count}</span>
                                        </button>
                                    ))}
                                </div>
                            </Card>

                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-[2rem] blur opacity-50"></div>
                                <Card className="relative bg-slate-900/60 border-white/5 rounded-[2rem] p-8 backdrop-blur-md overflow-hidden">
                                    <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 w-fit mb-6">
                                        <Sparkles className="h-6 w-6 text-amber-400" />
                                    </div>
                                    <h4 className="text-white text-lg font-black mb-3">Neural Summary</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                                        Strategic core for <span className="text-white font-black">"{results.seedKeyword}"</span>.
                                        Primary intent is {results.suggestions[0]?.intent}. Long-tail efficiency is <span className="text-emerald-400">High</span>.
                                    </p>
                                    <Button variant="outline" className="w-full border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-black uppercase tracking-widest h-12">
                                        Download Full Specs
                                    </Button>
                                </Card>
                            </div>
                        </div>

                        {/* 🚀 Main Display: Keyword Matrix */}
                        <div className="xl:col-span-3 space-y-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
                                <Tabs defaultValue="all" className="w-full md:w-auto">
                                    <TabsList className="bg-slate-900/50 border border-white/10 p-1.5 rounded-2xl space-x-1">
                                        <TabsTrigger value="all" className="rounded-xl px-8 py-2.5 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-900/30 font-black text-[10px] uppercase tracking-wider transition-all">Matrix</TabsTrigger>
                                        <TabsTrigger value="questions" className="rounded-xl px-8 py-2.5 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-black text-[10px] uppercase tracking-wider transition-all">Questions</TabsTrigger>
                                        <TabsTrigger value="related" className="rounded-xl px-8 py-2.5 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-black text-[10px] uppercase tracking-wider transition-all">Semantic Match</TabsTrigger>
                                    </TabsList>
                                </Tabs>

                                <div className="flex items-center gap-3">
                                    <Button variant="outline" className="h-11 px-5 rounded-xl border-white/10 bg-slate-900/50 text-slate-400 hover:text-white hover:border-blue-500/30 hover:bg-slate-800 transition-all font-bold text-xs uppercase tracking-widest">
                                        <Filter className="h-4 w-4 mr-2 text-blue-400" />
                                        Refine
                                    </Button>
                                    <Button variant="outline" className="h-11 px-5 rounded-xl border-white/10 bg-slate-900/50 text-slate-400 hover:text-white hover:border-indigo-500/30 hover:bg-slate-800 transition-all font-bold text-xs uppercase tracking-widest">
                                        <Download className="h-4 w-4 mr-2 text-indigo-400" />
                                        CSV
                                    </Button>
                                </div>
                            </div>

                            <Card className="bg-slate-900/30 border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-md shadow-2xl">
                                <div className="overflow-x-auto custom-scrollbar">
                                    <Table>
                                        <TableHeader className="bg-slate-950/50">
                                            <TableRow className="border-white/5 hover:bg-transparent">
                                                <TableHead className="w-[40%] text-slate-500 font-black uppercase text-[10px] tracking-[0.2em] py-8 px-8">Keyword Matrix</TableHead>
                                                <TableHead className="text-slate-500 font-black uppercase text-[10px] tracking-[0.2em] text-center">Inference</TableHead>
                                                <TableHead className="text-slate-500 font-black uppercase text-[10px] tracking-[0.2em] text-right">Volume</TableHead>
                                                <TableHead className="text-slate-500 font-black uppercase text-[10px] tracking-[0.2em] text-center">Difficulty</TableHead>
                                                <TableHead className="text-slate-500 font-black uppercase text-[10px] tracking-[0.2em] text-right px-8">CPC (USD)</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {results.suggestions.map((row, i) => (
                                                <TableRow key={i} className="border-white/5 hover:bg-blue-500/[0.03] transition-all duration-300 group cursor-default">
                                                    <TableCell className="py-6 px-8">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover:bg-blue-400 group-hover:scale-125 transition-all duration-300" />
                                                            <span className="text-white font-black text-base group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-2">
                                                                {row.keyword}
                                                                <Target className="h-3.5 w-3.5 text-blue-500 opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 transition-all" />
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <div className="flex justify-center">
                                                            <Badge variant="outline" className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg border-2 ${getIntentColor(row.intent)}`}>
                                                                {row.intent}
                                                            </Badge>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex flex-col items-end">
                                                            <span className="text-slate-200 font-black text-sm">{row.volume}</span>
                                                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Hits/mo</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <div className="flex flex-col items-center gap-2 px-4">
                                                            <span className={`text-base font-black ${getKDColor(row.difficulty)}`}>{row.difficulty}</span>
                                                            <div className="w-14 h-1.5 bg-slate-800/50 rounded-full overflow-hidden p-[1px]">
                                                                <div
                                                                    className={`h-full rounded-full ${row.difficulty < 30 ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]' : row.difficulty < 60 ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]' : 'bg-rose-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]'}`}
                                                                    style={{ width: `${row.difficulty}%` }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right py-6 px-8 font-mono text-blue-400 font-black text-sm drop-shadow-[0_0_8px_rgba(96,165,250,0.2)]">
                                                        {row.cpc}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </Card>
                        </div>
                    </div>
                )}

                {/* 🛸 Neural Neural Empty State */}
                {!results && !isLoading && (
                    <div className="py-32 flex flex-col items-center justify-center text-center">
                        <div className="relative mb-12">
                            <div className="absolute inset-0 bg-blue-500/20 blur-[100px] animate-pulse rounded-full" />
                            <div className="w-32 h-32 rounded-[2.5rem] bg-slate-900 border-2 border-white/5 flex items-center justify-center relative transform rotate-12 hover:rotate-0 transition-transform duration-500">
                                <BrainCircuit className="h-16 w-16 text-blue-500/40" />
                                <Sparkles className="absolute top-2 right-2 h-6 w-6 text-amber-500/50" />
                            </div>
                        </div>

                        <div className="max-w-xl space-y-4">
                            <h3 className="text-3xl font-black text-white tracking-tight">System Idle. Pending Seed Input.</h3>
                            <p className="text-slate-500 text-lg font-medium px-6 leading-relaxed">
                                Awaiting search parameters. Inject a seed keyword above to trigger the
                                <span className="text-blue-500/80"> Neural Analysis Protocol</span> and retrieve semantic metrics.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default KeywordMagic;
