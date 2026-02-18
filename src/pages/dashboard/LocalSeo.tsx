import React, { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import {
    MapPin,
    Search,
    Star,
    CheckCircle2,
    AlertCircle,
    Loader2,
    MessageSquare,
    Building2,
    ShieldCheck,
    Navigation,
    TrendingUp,
    Zap,
    Copy,
    Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { runLocalAudit, generateReviewReply, LocalAuditIssue, NeighborhoodKeyword } from "@/services/ai";

const LocalSEOCommand = () => {
    const [businessName, setBusinessName] = useState("");
    const [city, setCity] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [auditData, setAuditData] = useState<{ healthScore: number; issues: LocalAuditIssue[]; neighborhoodKeywords: NeighborhoodKeyword[] } | null>(null);

    const [reviewBody, setReviewBody] = useState("");
    const [rating, setRating] = useState(5);
    const [isGeneratingReply, setIsGeneratingReply] = useState(false);
    const [generatedReply, setGeneratedReply] = useState("");

    const handleAudit = async () => {
        if (!businessName || !city) {
            toast.error("Please enter business name and city");
            return;
        }

        setIsLoading(true);
        try {
            const result = await runLocalAudit(businessName, city);
            setAuditData(result);
            toast.success("Local audit complete!");
        } catch (error) {
            toast.error("Failed to run local audit");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateReply = async () => {
        if (!reviewBody.trim()) {
            toast.error("Please paste a review body first");
            return;
        }

        setIsGeneratingReply(true);
        try {
            const reply = await generateReviewReply(reviewBody, rating);
            setGeneratedReply(reply);
            toast.success("AI reply generated!");
        } catch (error) {
            toast.error("Failed to generate reply");
        } finally {
            setIsGeneratingReply(false);
        }
    };

    const copyReply = () => {
        navigator.clipboard.writeText(generatedReply);
        toast.success("Reply copied to clipboard");
    };

    return (
        <div className="min-h-screen flex flex-col">
            <DashboardHeader
                title="Local SEO Command Center"
                subtitle="Dominating Map Packs & Local Business Visibility"
            />

            <div className="max-w-[1600px] mx-auto w-full space-y-8 pt-8 pb-20 px-4 md:px-8">
                {/* 📍 Local Search Section */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 border border-white/10 p-8 md:p-12">
                        <div className="max-w-4xl relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                                <MapPin className="h-4 w-4" />
                                Hyper-Local Architect
                            </div>

                            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6 leading-[1.1]">
                                Local <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-[length:200%_auto] animate-gradient drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">Command</span> AI
                            </h1>

                            <p className="text-slate-400 text-lg font-medium max-w-2xl leading-relaxed mb-10">
                                Be the first thing customers see on Google Maps. Audit your <span className="text-white">GMB signals</span>, discover high-intent neighborhood keywords, and automate reputation management.
                            </p>

                            <div className="bg-slate-900/50 p-8 rounded-[2rem] border border-white/5 backdrop-blur-md space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Business Name</label>
                                        <div className="relative group/input">
                                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within/input:text-emerald-400 transition-colors" />
                                            <Input
                                                placeholder="e.g. Skyline Plumbing"
                                                className="h-12 pl-10 bg-slate-950 border-white/10 text-white rounded-xl focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
                                                value={businessName}
                                                onChange={(e) => setBusinessName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">City / Region</label>
                                        <div className="relative group/input">
                                            <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within/input:text-emerald-400 transition-colors" />
                                            <Input
                                                placeholder="e.g. Austin, TX"
                                                className="h-12 pl-10 bg-slate-950 border-white/10 text-white rounded-xl focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleAudit}
                                    disabled={isLoading}
                                    className="w-full h-14 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black shadow-lg shadow-emerald-900/20 transition-all group text-lg mt-4"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Analyzing Map Signals...
                                        </>
                                    ) : (
                                        <>
                                            Run Local Power Audit
                                            <Zap className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 📊 Audit Results */}
                {auditData && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        {/* Health Score & Issues */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="bg-slate-900/40 border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md relative overflow-hidden">
                                <div className="flex items-center justify-between mb-10">
                                    <div className="flex items-center gap-4">
                                        <div className="h-16 w-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 text-3xl font-black">
                                            {auditData.healthScore}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-white">Local Health Score</h3>
                                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Based on GMB, NAP, & Citations</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-2 text-xs uppercase tracking-widest font-black">
                                        {auditData.healthScore > 80 ? 'EXCELLENT' : auditData.healthScore > 60 ? 'NEEDS ATTENTION' : 'CRITICAL'}
                                    </Badge>
                                </div>

                                <div className="space-y-6">
                                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Identified Issues & AI Fixes</h4>
                                    <div className="grid gap-4">
                                        {auditData.issues.map((issue, i) => (
                                            <div key={i} className="group p-6 bg-slate-950/50 border border-white/5 rounded-3xl hover:border-emerald-500/30 transition-all">
                                                <div className="flex items-start justify-between gap-4 mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-black ${issue.category === 'GMB' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                                                                issue.category === 'Reviews' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                                                    'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                                            } border`}>
                                                            {issue.category}
                                                        </div>
                                                        <h5 className="text-lg font-bold text-white">{issue.issue}</h5>
                                                    </div>
                                                    <Badge className={issue.impact === 'High' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'}>
                                                        {issue.impact} Impact
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-slate-400 font-medium leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5 italic">
                                                    <span className="text-emerald-400 font-black mr-2">AI TIP:</span> {issue.aiSuggestion}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Neighborhood Keywords & Reputation AI */}
                        <div className="space-y-6">
                            <Card className="bg-slate-900/40 border-white/10 rounded-[2.5rem] p-6 backdrop-blur-md">
                                <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <Search className="h-4 w-4" />
                                    Neighborhood High-Intent Keywords
                                </h4>
                                <div className="space-y-3">
                                    {auditData.neighborhoodKeywords.map((kw, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/20 transition-all">
                                            <span className="text-xs font-bold text-slate-300 truncate mr-2">{kw.keyword}</span>
                                            <Badge variant="outline" className="text-[9px] border-emerald-500/20 text-emerald-400 shrink-0">
                                                Vol: {kw.volume}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-[10px] text-slate-500 mt-6 leading-relaxed italic">
                                    These keywords focus on local landmarks and specific city blocks common tools miss.
                                </p>
                            </Card>

                            <Card className="bg-slate-900/40 border-white/10 rounded-[2.5rem] p-6 backdrop-blur-md overflow-hidden relative">
                                <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4" />
                                    Reputation Management AI
                                </h4>

                                <Tabs defaultValue="reply-generator" className="w-full">
                                    <TabsList className="bg-slate-950/50 border-white/10 w-full mb-6">
                                        <TabsTrigger value="reply-generator" className="flex-1">Reply Draft</TabsTrigger>
                                        <TabsTrigger value="stats" className="flex-1">Trends</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="reply-generator" className="space-y-4">
                                        <Textarea
                                            placeholder="Paste a review here..."
                                            className="min-h-[100px] bg-slate-950 border-white/10 text-white text-xs rounded-xl"
                                            value={reviewBody}
                                            onChange={(e) => setReviewBody(e.target.value)}
                                        />
                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map(s => (
                                                    <Star
                                                        key={s}
                                                        className={`h-4 w-4 cursor-pointer ${s <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`}
                                                        onClick={() => setRating(s)}
                                                    />
                                                ))}
                                            </div>
                                            <Button size="sm" onClick={handleGenerateReply} disabled={isGeneratingReply} className="bg-blue-600 hover:bg-blue-500 h-8">
                                                {isGeneratingReply ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-3 w-3 mr-2" />}
                                                Generate
                                            </Button>
                                        </div>

                                        {generatedReply && (
                                            <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl relative group">
                                                <p className="text-[11px] text-blue-200 leading-relaxed font-medium">
                                                    {generatedReply}
                                                </p>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="absolute top-2 right-2 h-7 w-7 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={copyReply}
                                                >
                                                    <Copy className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        )}
                                    </TabsContent>

                                    <TabsContent value="stats">
                                        <div className="py-2 space-y-4">
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                                                    <span>Review Velocity</span>
                                                    <span className="text-emerald-400">+12%</span>
                                                </div>
                                                <Progress value={78} className="h-1 bg-white/5" indicatorClassName="bg-emerald-500" />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                                                    <span>Average Rating</span>
                                                    <span className="text-amber-400">4.8</span>
                                                </div>
                                                <Progress value={96} className="h-1 bg-white/5" indicatorClassName="bg-amber-400" />
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LocalSEOCommand;
