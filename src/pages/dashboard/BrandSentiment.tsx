import React, { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import {
    Heart,
    MessageSquare,
    TrendingUp,
    TrendingDown,
    ShieldAlert,
    Loader2,
    Send,
    Copy,
    Zap,
    Share2,
    Twitter,
    Globe,
    MessageCircle,
    Star,
    AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { analyzeBrandSentiment, BrandIntelligence } from "@/services/ai";

const BrandSentiment = () => {
    const [brandName, setBrandName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [intel, setIntel] = useState<BrandIntelligence | null>(null);

    const handleAnalyze = async () => {
        if (!brandName.trim()) {
            toast.error("Please enter a brand or company name");
            return;
        }

        setIsLoading(true);
        try {
            const result = await analyzeBrandSentiment(brandName);
            setIntel(result);
            toast.success("Brand reputation intelligence synchronized.");
        } catch (error) {
            toast.error("Failed to analyze brand sentiment");
        } finally {
            setIsLoading(false);
        }
    };

    const getPlatformIcon = (platform: string) => {
        switch (platform) {
            case 'Twitter': return <Twitter className="h-4 w-4" />;
            case 'Reddit': return <MessageCircle className="h-4 w-4" />;
            case 'Trustpilot': return <Star className="h-4 w-4" />;
            default: return <Globe className="h-4 w-4" />;
        }
    };

    const getSentimentColor = (sentiment: string) => {
        switch (sentiment) {
            case 'Positive': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
            case 'Negative': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
            default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <DashboardHeader
                title="Reputation Intelligence"
                subtitle="AI-Powered Brand Sentiment & Crisis Management"
            />

            <div className="max-w-[1600px] mx-auto w-full space-y-8 pt-8 pb-20 px-4 md:px-8">
                {/* 💓 Hero Section */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-600 to-pink-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 border border-white/10 p-8 md:p-12">
                        <div className="max-w-4xl relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-[0_0_20px_rgba(217,70,239,0.15)]">
                                <Heart className="h-4 w-4" />
                                Sentiment Architect
                            </div>

                            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6 leading-[1.1]">
                                Brand <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-300 to-rose-400 bg-[length:200%_auto] animate-gradient drop-shadow-[0_0_15px_rgba(232,121,249,0.3)]">Vibe</span> AI
                            </h1>

                            <p className="text-slate-400 text-lg font-medium max-w-2xl leading-relaxed mb-10">
                                Monitor how the world perceives your brand in real-time. Our AI tracks <span className="text-white">social sentiment</span> and drafts professional de-escalation responses to protect your reputation.
                            </p>

                            <div className="flex flex-col md:flex-row gap-4 max-w-2xl">
                                <div className="relative flex-1 group/input">
                                    <Share2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within/input:text-fuchsia-400 transition-colors" />
                                    <Input
                                        placeholder="Enter Brand or Competitor Name..."
                                        className="h-14 pl-12 bg-slate-900 border-white/10 text-white rounded-2xl focus:ring-2 focus:ring-fuchsia-500/20 transition-all font-medium text-lg"
                                        value={brandName}
                                        onChange={(e) => setBrandName(e.target.value)}
                                    />
                                </div>
                                <Button
                                    onClick={handleAnalyze}
                                    disabled={isLoading}
                                    className="h-14 px-8 rounded-2xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-black shadow-lg shadow-fuchsia-900/20 transition-all group"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Scanning Mentions...
                                        </>
                                    ) : (
                                        <>
                                            Analyze Status
                                            <Zap className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 📊 Intelligence Panel */}
                {intel && (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        {/* Sidebar Stats */}
                        <div className="space-y-6">
                            <Card className="bg-slate-900/40 border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md relative overflow-hidden group">
                                <div className={`absolute top-0 left-0 w-full h-1 ${intel.overallSentiment > 80 ? 'bg-emerald-500' : intel.overallSentiment > 50 ? 'bg-amber-500' : 'bg-rose-500'}`}></div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Overall Sentiment</p>
                                <div className="flex items-end gap-3 mb-6">
                                    <h3 className="text-5xl font-black text-white">{intel.overallSentiment}</h3>
                                    <div className={`mb-1.5 flex items-center gap-1 text-xs font-bold ${intel.sentimentTrend === 'Up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                        {intel.sentimentTrend === 'Up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                                        {intel.sentimentTrend}
                                    </div>
                                </div>
                                <Progress value={intel.overallSentiment} className="h-2 bg-white/5" indicatorClassName={intel.overallSentiment > 50 ? 'bg-fuchsia-500' : 'bg-rose-500'} />
                            </Card>

                            <Card className="bg-slate-900/40 border-white/10 rounded-[2.5rem] p-6 backdrop-blur-md">
                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <ShieldAlert className="h-4 w-4" />
                                    Risk Status
                                </h4>
                                <div className="p-4 rounded-2xl bg-white/5 flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-400">Reputation Alert</span>
                                    <Badge className={intel.alertLevel === 'High' ? 'bg-rose-500 text-white' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}>
                                        {intel.alertLevel} Priority
                                    </Badge>
                                </div>
                            </Card>
                        </div>

                        {/* Mention Stream */}
                        <div className="lg:col-span-3 space-y-6">
                            <div className="flex items-center justify-between px-2">
                                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                                    <MessageSquare className="h-6 w-6 text-fuchsia-400" />
                                    Global Mention Stream
                                </h2>
                                <Badge className="bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20">
                                    Live Sync Active
                                </Badge>
                            </div>

                            <div className="space-y-6">
                                {intel.mentions.map((mention, i) => (
                                    <Card key={i} className="group bg-slate-950/40 border-white/5 rounded-3xl p-8 hover:border-fuchsia-500/30 transition-all flex flex-col md:flex-row gap-10">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 border border-white/10">
                                                    {getPlatformIcon(mention.platform)}
                                                </div>
                                                <div>
                                                    <h5 className="text-sm font-black text-white">{mention.source}</h5>
                                                    <Badge className={`mt-1 text-[10px] ${getSentimentColor(mention.sentiment)}`}>
                                                        {mention.sentiment} ({mention.score}%)
                                                    </Badge>
                                                </div>
                                            </div>
                                            <p className="text-lg font-medium text-slate-300 leading-relaxed italic">
                                                "{mention.content}"
                                            </p>
                                        </div>

                                        <div className="md:w-1/3">
                                            <div className="h-full p-6 bg-gradient-to-br from-slate-900 to-slate-950 border border-white/5 rounded-2xl shadow-xl relative overflow-hidden group/draft">
                                                <div className="absolute top-0 right-0 p-2 opacity-10">
                                                    <Zap className="h-12 w-12 text-fuchsia-500" />
                                                </div>
                                                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 text-[9px] font-black uppercase tracking-widest mb-4">
                                                    AI Recommended Response
                                                </div>
                                                <p className="text-xs text-slate-400 leading-relaxed font-medium mb-6">
                                                    {mention.aiDraftReply}
                                                </p>
                                                <Button size="sm" className="w-full bg-white text-slate-950 hover:bg-slate-200 font-black rounded-lg h-9">
                                                    <Send className="mr-2 h-3.5 w-3.5" /> Post Draft
                                                </Button>
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

export default BrandSentiment;
