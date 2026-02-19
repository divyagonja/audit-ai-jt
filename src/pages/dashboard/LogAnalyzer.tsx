import React, { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import {
    FileSearch,
    Terminal,
    Zap,
    AlertCircle,
    Loader2,
    Activity,
    ShieldCheck,
    Copy,
    ArrowRight,
    Server
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { analyzeLogFiles, LogAnalysis } from "@/services/ai";

const LogAnalyzer = () => {
    const [logData, setLogData] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [analysis, setAnalysis] = useState<LogAnalysis | null>(null);

    const handleAnalyze = async () => {
        if (!logData.trim()) {
            toast.error("Please paste your server log data first");
            return;
        }

        setIsLoading(true);
        try {
            const result = await analyzeLogFiles(logData);
            setAnalysis(result);
            toast.success("Log file analysis complete!");
        } catch (error) {
            toast.error("Failed to analyze log data");
        } finally {
            setIsLoading(false);
        }
    };

    const copyFix = (command: string) => {
        navigator.clipboard.writeText(command);
        toast.success("Command copied to clipboard");
    };

    return (
        <div className="min-h-screen flex flex-col">
            <DashboardHeader
                title="AI Log File Analyzer"
                subtitle="Optimize Crawl Budget & Stop Search Waste"
            />

            <div className="max-w-[1600px] mx-auto w-full space-y-8 pt-8 pb-20 px-4 md:px-8">
                {/* 📂 Upload/Paste Section */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 border border-white/10 p-8 md:p-12">
                        <div className="max-w-4xl relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-[0_0_20px_rgba(20,184,166,0.15)]">
                                <FileSearch className="h-4 w-4" />
                                Server Intelligence
                            </div>

                            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6 leading-[1.1]">
                                Crawl <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-[length:200%_auto] animate-gradient drop-shadow-[0_0_15px_rgba(45,212,191,0.3)]">Efficiency</span> AI
                            </h1>

                            <p className="text-slate-400 text-lg font-medium max-w-2xl leading-relaxed mb-10">
                                Paste your server log entries (Apache/Nginx/IIS) and let our AI identify exactly where <span className="text-white">Googlebot is wasting your crawl budget</span> on low-value pages.
                            </p>

                            <div className="bg-slate-900/50 p-8 rounded-[2rem] border border-white/5 backdrop-blur-md space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Paste Server Log Data (Raw text)</label>
                                    <Textarea
                                        placeholder="127.0.0.1 - - [10/Oct/2023:13:55:36 -0700] 'GET /index.html HTTP/1.1' 200 2326..."
                                        className="min-h-[200px] bg-slate-950 border-white/10 text-slate-300 text-xs font-mono rounded-xl focus:ring-2 focus:ring-teal-500/20"
                                        value={logData}
                                        onChange={(e) => setLogData(e.target.value)}
                                    />
                                </div>

                                <Button
                                    onClick={handleAnalyze}
                                    disabled={isLoading}
                                    className="w-full h-14 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black shadow-lg shadow-teal-900/20 transition-all group text-lg"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Decoding Log Patterns...
                                        </>
                                    ) : (
                                        <>
                                            Analyze Crawl Budget
                                            <Zap className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 📊 Analysis Output */}
                {analysis && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        {/* Stats Summary */}
                        <div className="space-y-6">
                            <Card className="bg-slate-900/40 border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md text-center">
                                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-400 mb-6 border border-teal-500/20">
                                    <Activity className="h-8 w-8" />
                                </div>
                                <h3 className="text-4xl font-black text-white mb-1">{analysis.crawlEfficiency}%</h3>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Crawl Efficiency</p>
                                <Progress value={analysis.crawlEfficiency} className="h-2 bg-white/5" indicatorClassName="bg-teal-500" />

                                <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/5">
                                    <div>
                                        <p className="text-xl font-black text-white">{analysis.googleBotHits}</p>
                                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Bot Hits</p>
                                    </div>
                                    <div>
                                        <p className="text-xl font-black text-rose-500">{analysis.wastedBudgetPercentage}%</p>
                                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Waste (%)</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="bg-slate-900/40 border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md">
                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4" />
                                    Server Context
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                                        <span className="text-xs font-bold text-slate-400">Total Requests</span>
                                        <span className="text-xs font-black text-white">{analysis.totalRequests.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-xs font-bold text-slate-400">Log Period</span>
                                        <span className="text-xs font-black text-white">Last 24 Hours</span>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Issue List */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex items-center justify-between px-2">
                                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                                    <Server className="h-6 w-6 text-teal-400" />
                                    Budget Leaks Identified
                                </h2>
                                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                                    AI-Powered Insights
                                </Badge>
                            </div>

                            <div className="grid gap-6">
                                {analysis.issues.map((issue, i) => (
                                    <Card key={i} className="bg-slate-950/40 border-white/5 rounded-3xl p-6 hover:border-teal-500/30 transition-all">
                                        <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">{issue.issueType}</Badge>
                                                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{issue.hitCount} requests wasted</span>
                                                </div>
                                                <h5 className="text-sm font-mono text-teal-300 break-all bg-slate-950 p-2 rounded-lg border border-white/5">
                                                    {issue.url}
                                                </h5>
                                            </div>
                                            <div className="text-center md:text-right">
                                                <p className="text-[10px] font-black text-slate-600 uppercase mb-1">Status</p>
                                                <p className={`text-xl font-black ${issue.status === 200 ? 'text-emerald-500' : 'text-rose-500'}`}>{issue.status}</p>
                                            </div>
                                        </div>

                                        <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium bg-white/5 p-4 rounded-xl">
                                            <span className="text-teal-400 font-extrabold mr-2">ANALYSIS:</span>
                                            {issue.aiRecommendation}
                                        </p>

                                        <div className="bg-slate-950/80 p-4 rounded-2xl border border-white/10 flex items-center justify-between group/cmd">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400">
                                                    <Terminal className="h-4 w-4" />
                                                </div>
                                                <code className="text-xs font-mono text-slate-300">{issue.fixCommand}</code>
                                            </div>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="text-teal-400 hover:bg-teal-500/10 opacity-0 group-hover/cmd:opacity-100 transition-opacity"
                                                onClick={() => copyFix(issue.fixCommand)}
                                            >
                                                <Copy className="h-4 w-4 mr-2" /> Copy Fix
                                            </Button>
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

export default LogAnalyzer;
