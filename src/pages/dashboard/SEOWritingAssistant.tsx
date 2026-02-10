import React, { useState, useEffect } from "react";
import {
    FileText,
    Sparkles,
    Search,
    BrainCircuit,
    CheckCircle2,
    AlertCircle,
    TrendingUp,
    Gauge,
    Type,
    MessageSquare,
    Loader2,
    ArrowRight,
    PenTool
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { analyzeContent, SEOAnalysis } from "@/services/ai/seoWritingAssistant";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const SEOWritingAssistant = () => {
    const [content, setContent] = useState("");
    const [targetKeyword, setTargetKeyword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null);

    const handleAnalyze = async () => {
        if (!content.trim()) {
            toast.error("Please enter some content to analyze");
            return;
        }
        if (!targetKeyword.trim()) {
            toast.error("Please enter a target keyword");
            return;
        }

        setIsLoading(true);
        try {
            const result = await analyzeContent(content, targetKeyword);
            setAnalysis(result);
            toast.success("Content analysis complete!");
        } catch (error) {
            toast.error("Failed to analyze content");
        } finally {
            setIsLoading(false);
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-emerald-400";
        if (score >= 50) return "text-amber-400";
        return "text-rose-400";
    };

    const getProgressColor = (score: number) => {
        if (score >= 80) return "bg-emerald-500";
        if (score >= 50) return "bg-amber-500";
        return "bg-rose-500";
    };

    return (
        <div className="max-w-[1600px] mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 pt-8 pb-20 px-4 md:px-8">
            {/* 🧠 Hero Section */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 border border-white/10 p-8 md:p-12">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
                            <PenTool className="h-4 w-4" />
                            AI Content Architect
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6">
                            SEO Writing <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">Assistant</span>
                        </h1>
                        <p className="text-slate-400 text-lg font-medium max-w-2xl mb-10 leading-relaxed">
                            Optimize your content for people and search engines simultaneously.
                            Our neural editor analyzes <span className="text-white">readability</span>, <span className="text-white">keyword intent</span>, and <span className="text-white">semantic relevance</span> in real-time.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 max-w-xl">
                            <div className="relative flex-1 group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                                <Input
                                    placeholder="Target Keyword..."
                                    className="h-14 pl-12 bg-slate-900/50 border-white/10 text-white rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all text-lg font-medium"
                                    value={targetKeyword}
                                    onChange={(e) => setTargetKeyword(e.target.value)}
                                />
                            </div>
                            <Button
                                onClick={handleAnalyze}
                                disabled={isLoading}
                                className="h-14 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black shadow-lg shadow-indigo-900/20 group transition-all text-lg"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        Analyze Content
                                        <Sparkles className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
                {/* 📝 Editor Column */}
                <div className="xl:col-span-2 space-y-6">
                    <Card className="bg-slate-900/30 border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-md shadow-2xl p-8 min-h-[600px] flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <FileText className="h-6 w-6 text-indigo-400" />
                                <span className="text-white font-black uppercase text-xs tracking-widest">Document Editor</span>
                            </div>
                            <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                                {content.split(/\s+/).filter(Boolean).length} Words
                            </div>
                        </div>
                        <textarea
                            className="flex-1 w-full bg-transparent border-none text-slate-200 text-xl leading-relaxed focus:outline-none resize-none placeholder:text-slate-700 min-h-[500px]"
                            placeholder="Start writing or paste your content here for deep SEO analysis..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Card>
                </div>

                {/* 📊 Analysis Sidebar */}
                <div className="xl:col-span-1 space-y-6 sticky top-8">
                    <AnimatePresence mode="wait">
                        {analysis ? (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                {/* Overall Score Gauge */}
                                <Card className="bg-slate-900/40 border-white/10 rounded-[2rem] p-8 backdrop-blur-xl relative overflow-hidden text-center">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5" />
                                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-8">Optimization Matrix</h3>

                                    <div className="relative inline-flex items-center justify-center mb-6">
                                        <svg className="w-32 h-32 transform -rotate-90">
                                            <circle
                                                cx="64"
                                                cy="64"
                                                r="58"
                                                stroke="currentColor"
                                                strokeWidth="8"
                                                fill="transparent"
                                                className="text-slate-800"
                                            />
                                            <circle
                                                cx="64"
                                                cy="64"
                                                r="58"
                                                stroke="currentColor"
                                                strokeWidth="8"
                                                fill="transparent"
                                                strokeDasharray={364.4}
                                                strokeDashoffset={364.4 - (364.4 * analysis.score) / 100}
                                                className={`${getScoreColor(analysis.score)} transition-all duration-1000 ease-out`}
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className={`text-4xl font-black ${getScoreColor(analysis.score)}`}>{analysis.score}</span>
                                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">SEO Score</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-400 text-sm font-medium leading-relaxed italic">
                                        "{analysis.overallFeedback}"
                                    </p>
                                </Card>

                                {/* Metric Breakdown */}
                                <Card className="bg-slate-900/40 border-white/10 rounded-[2rem] p-6 backdrop-blur-md space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center px-1">
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <Gauge className="h-4 w-4" />
                                                <span className="text-[10px] font-black uppercase tracking-wider">Readability</span>
                                            </div>
                                            <Badge variant="outline" className={`text-[10px] ${getScoreColor(analysis.readability.score)}`}>{analysis.readability.level}</Badge>
                                        </div>
                                        <Progress value={analysis.readability.score} className="h-2.5 bg-slate-800" indicatorClassName={getProgressColor(analysis.readability.score)} />
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center px-1">
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <Type className="h-4 w-4" />
                                                <span className="text-[10px] font-black uppercase tracking-wider">Tone: {analysis.tone.type}</span>
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-500">{analysis.tone.consistency}% Consistency</span>
                                        </div>
                                        <Progress value={analysis.tone.consistency} className="h-2.5 bg-slate-800" indicatorClassName="bg-indigo-500" />
                                    </div>
                                </Card>

                                {/* Keywords */}
                                <Card className="bg-slate-900/40 border-white/10 rounded-[2rem] p-6 backdrop-blur-md">
                                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                        <TrendingUp className="h-4 w-4" />
                                        Semantic Keywords
                                    </h4>
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <label className="text-[9px] font-bold text-emerald-500/70 uppercase tracking-widest pl-1">Found ({analysis.seo.keywordsFound.length})</label>
                                            <div className="flex flex-wrap gap-2">
                                                {analysis.seo.keywordsFound.map(k => (
                                                    <Badge key={k} className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] font-medium py-1 px-3 rounded-lg">
                                                        {k}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[9px] font-bold text-rose-500/70 uppercase tracking-widest pl-1">Missing ({analysis.seo.missingKeywords.length})</label>
                                            <div className="flex flex-wrap gap-2">
                                                {analysis.seo.missingKeywords.map(k => (
                                                    <Badge key={k} className="bg-rose-500/5 text-rose-500 border-rose-500/10 text-[10px] font-medium py-1 px-3 rounded-lg">
                                                        {k}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                {/* Suggestions List */}
                                <div className="space-y-3">
                                    {[...analysis.readability.suggestions, ...analysis.seo.suggestions].map((s, i) => (
                                        <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-900/30 border border-white/5 hover:border-white/10 transition-colors group">
                                            <div className="mt-0.5">
                                                {i % 2 === 0 ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <AlertCircle className="h-4 w-4 text-amber-500" />}
                                            </div>
                                            <p className="text-slate-400 text-xs font-medium leading-relaxed group-hover:text-slate-200 transition-colors">
                                                {s}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <div className="py-20 flex flex-col items-center justify-center text-center space-y-6 bg-slate-900/20 border border-white/5 rounded-[2rem] border-dashed">
                                <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/5">
                                    <BrainCircuit className="h-10 w-10 text-slate-700" />
                                </div>
                                <div className="max-w-[200px] space-y-2">
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest">Awaiting Content</h3>
                                    <p className="text-slate-500 text-[10px] font-bold leading-relaxed uppercase tracking-widest">
                                        Analysis protocol will initiate upon trigger.
                                    </p>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default SEOWritingAssistant;
