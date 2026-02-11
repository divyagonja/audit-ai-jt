import React, { useState } from "react";
import {
    BrainCircuit,
    Search,
    ArrowRight,
    Sparkles,
    Loader2,
    Database,
    Network,
    Target,
    BarChart3,
    TrendingUp,
    Zap,
    Users,
    Compass,
    Layers,
    Activity,
    Milestone,
    Lightbulb,
    FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTopicResearch, TopicResearchResponse, TopicCluster } from "@/services/ai/topicResearch";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const TopicResearch = () => {
    const [keyword, setKeyword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<TopicResearchResponse | null>(null);

    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!keyword.trim()) {
            toast.error("Please enter a topic keyword");
            return;
        }

        setIsLoading(true);
        try {
            const response = await getTopicResearch(keyword);
            setResults(response);
            toast.success("Topical intelligence mapping complete!");
        } catch (error: any) {
            console.error(error);
            toast.error("Failed to map topics. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <DashboardHeader
                title="Topic Archon"
                subtitle="Semantic Intelligence Mapping Protocol and topical ecosystem analysis"
            />
            <div className="max-w-[1600px] mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 pt-8 pb-20 px-4 md:px-8">
                {/* 🧠 Neural Input Section */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 border border-white/10 p-8 md:p-12 text-center md:text-left">
                        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-50 pointer-events-none" />

                        <div className="max-w-4xl relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
                                <BrainCircuit className="h-4 w-4 animate-pulse" />
                                Semantic Intelligence v3.0
                            </div>

                            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6 leading-[1.1]">
                                Topic <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-[length:200%_auto] animate-gradient drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">Archon</span>
                            </h1>

                            <p className="text-slate-400 text-lg font-medium max-w-2xl leading-relaxed mb-10">
                                Inject a seed keyword to map the entire <span className="text-white">semantic ecosystem</span>.
                                Identify hidden topical relationships and strategic content hubs.
                            </p>

                            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-stretch bg-slate-900/50 p-6 rounded-[2rem] border border-white/5 backdrop-blur-md">
                                <div className="relative flex-1 group/input">
                                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within/input:text-indigo-400 transition-colors" />
                                    <Input
                                        placeholder="e.g., 'Modular Blockchain Architecture'"
                                        className="h-14 pl-12 pr-6 bg-slate-950 border-white/10 text-white rounded-xl focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium placeholder:text-slate-600"
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="h-14 px-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black shadow-lg shadow-indigo-900/20 transition-all group"
                                >
                                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Map Topic <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" /></>}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>

                {results && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        {/* 📊 High-Intelligence Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[
                                { icon: Target, label: "Volume Potential", value: results.totalVolumePotential, color: "text-indigo-400", bg: "bg-indigo-500/10" },
                                { icon: Activity, label: "Difficulty Score", value: `${results.difficulty}/100`, color: "text-rose-400", bg: "bg-rose-500/10" },
                                { icon: Users, label: "Audience Sentiment", value: results.audienceSentiment, color: "text-emerald-400", bg: "bg-emerald-500/10" },
                                { icon: Zap, label: "Curation Score", value: `${results.marketCurationScore}%`, color: "text-amber-400", bg: "bg-amber-500/10" }
                            ].map((stat, i) => (
                                <Card key={i} className="bg-slate-900/40 border-white/5 rounded-3xl p-6 backdrop-blur-xl hover:border-white/10 transition-all group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                                            <stat.icon className="h-6 w-6" />
                                        </div>
                                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</div>
                                    </div>
                                    <div className="text-2xl font-black text-white truncate">{stat.value}</div>
                                </Card>
                            ))}
                        </div>

                        {/* 🧠 The Strategic Blueprint */}
                        <Card className="bg-slate-900/60 border-indigo-500/30 rounded-3xl p-8 relative overflow-hidden group backdrop-blur-xl">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] pointer-events-none group-hover:bg-indigo-500/15 transition-all" />
                            <div className="relative flex flex-col md:flex-row gap-8 items-start">
                                <div className="shrink-0 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                                    <Lightbulb className="h-8 w-8 animate-pulse" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-black text-white italic tracking-tight">"Executive Strategic Blueprint"</h3>
                                    <p className="text-indigo-50/90 text-xl font-semibold leading-relaxed drop-shadow-sm">{results.strategicBlueprint}</p>
                                </div>
                            </div>
                        </Card>

                        {/* 🧊 Semantic Clusters */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 px-4 font-black uppercase tracking-widest text-slate-500 text-[10px]">
                                <Layers className="h-4 w-4" />
                                Topological Cluster Map
                            </div>

                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                {results.clusters.map((cluster, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <Card className="bg-slate-900/40 border-white/5 rounded-[2rem] overflow-hidden backdrop-blur-xl group h-full flex flex-col hover:border-indigo-500/10 transition-all">
                                            <div className="p-8 border-b border-white/5 bg-slate-950/30">
                                                <div className="flex justify-between items-start mb-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                                                            <Database className="h-6 w-6" />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-xl font-black text-white tracking-tight">{cluster.topic}</h3>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                                                                    <div className="h-full bg-indigo-500" style={{ width: `${cluster.relevance}%` }} />
                                                                </div>
                                                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{cluster.relevance}% RELEVANCE</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-1.5">
                                                        <Badge className="bg-slate-800 text-slate-400 border-white/5 uppercase text-[8px] font-black">{cluster.growthVector}</Badge>
                                                        <Badge className="bg-slate-800 text-slate-400 border-white/5 uppercase text-[8px] font-black">{cluster.searchArchetype}</Badge>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 gap-4">
                                                    {cluster.subtopics.map((sub, sIdx) => (
                                                        <div key={sIdx} className="group/sub relative p-5 rounded-2xl bg-slate-950/40 border border-white/5 hover:border-indigo-500/20 transition-all">
                                                            <div className="relative z-10 space-y-3">
                                                                <div className="flex justify-between items-start">
                                                                    <h4 className="text-sm font-black text-white group-hover/sub:text-indigo-400 transition-colors uppercase tracking-tight">{sub.title}</h4>
                                                                    <Badge className={`px-2 py-0.5 text-[8px] uppercase font-black ${sub.priority === 'High' ? 'bg-rose-500/20 text-rose-400' :
                                                                        sub.priority === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                                                                            'bg-emerald-500/20 text-emerald-400'
                                                                        }`}>
                                                                        {sub.priority} PRIORITY
                                                                    </Badge>
                                                                </div>

                                                                <p className="text-slate-400 text-xs font-medium leading-relaxed italic border-l border-white/10 pl-3 group-hover/sub:border-indigo-500/20 transition-all">
                                                                    "{sub.description}"
                                                                </p>

                                                                <div className="flex items-center justify-between pt-1">
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900 border border-white/5 text-[9px] font-bold text-slate-500">
                                                                            <Compass className="h-3 w-3" /> {sub.intent}
                                                                        </div>
                                                                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900 border border-white/5 text-[9px] font-bold text-slate-500">
                                                                            <Milestone className="h-3 w-3" /> #{sub.estimatedDifficulty} DIFF
                                                                        </div>
                                                                    </div>
                                                                    <Button variant="ghost" className="h-8 px-3 rounded-lg text-[9px] font-black text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 flex items-center gap-1.5 group/btn">
                                                                        DRAFT BRIEF <FileText className="h-3 w-3 group-hover/btn:scale-110 transition-transform" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {!results && !isLoading && (
                    <div className="py-32 flex flex-col items-center justify-center text-center">
                        <div className="relative mb-12">
                            <div className="absolute inset-0 bg-indigo-500/10 blur-[80px] animate-pulse rounded-full" />
                            <div className="w-32 h-32 rounded-[2.5rem] bg-slate-950 border-4 border-white/5 flex items-center justify-center relative transform -rotate-6 hover:rotate-0 transition-all duration-700 group cursor-pointer shadow-2xl">
                                <BrainCircuit className="h-16 w-16 text-indigo-500/20 group-hover:text-indigo-400/40 transition-colors" />
                                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-indigo-600 border-4 border-slate-950 flex items-center justify-center shadow-lg">
                                    <Zap className="h-5 w-5 text-white" />
                                </div>
                            </div>
                        </div>
                        <div className="max-w-xl space-y-4 px-10">
                            <h3 className="text-2xl font-black text-white tracking-tight uppercase">Intelligence Protocol Latent</h3>
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                                Awaiting semantic vector input to initiate the <span className="text-indigo-500">Topic Archon</span> mapping sequence.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopicResearch;
