import React, { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import {
    Send,
    Link,
    FileText,
    CheckCircle2,
    Loader2,
    Mail,
    Copy,
    ExternalLink,
    MessageSquare,
    User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { generateOutreach, OutreachCampaign } from "@/services/ai";

const BacklinkManager = () => {
    const [targetUrl, setTargetUrl] = useState("");
    const [yourAssetUrl, setYourAssetUrl] = useState("");
    const [campaignType, setCampaignType] = useState<any>("Resource Link");
    const [targetName, setTargetName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [campaign, setCampaign] = useState<OutreachCampaign | null>(null);

    const handleGenerate = async () => {
        if (!targetUrl || !yourAssetUrl) {
            toast.error("Please enter both target URL and your asset URL");
            return;
        }

        setIsLoading(true);
        try {
            const result = await generateOutreach(targetUrl, yourAssetUrl, campaignType, targetName || "Editor");
            setCampaign(result);
            toast.success("Outreach campaign generating successfully!");
        } catch (error) {
            toast.error("Failed to generate outreach campaign");
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    };

    return (
        <div className="min-h-screen flex flex-col">
            <DashboardHeader
                title="Backlink Manager"
                subtitle="Artificial Intelligence Outreach & Link Building Automation"
            />

            <div className="max-w-[1600px] mx-auto w-full space-y-8 pt-8 pb-20 px-4 md:px-8">
                {/* 🚀 Hero Section */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 border border-white/10 p-8 md:p-12">
                        <div className="max-w-4xl relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                                <Link className="h-4 w-4" />
                                Off-Page Architect
                            </div>

                            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6 leading-[1.1]">
                                Neural <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400 bg-[length:200%_auto] animate-gradient drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">Outreach</span>
                            </h1>

                            <p className="text-slate-400 text-lg font-medium max-w-2xl leading-relaxed mb-10">
                                Generate hyper-personalized link building campaigns. Our AI analyzes target content to craft <span className="text-white">high-conversion email pitches</span> that get responses.
                            </p>

                            <div className="bg-slate-900/50 p-8 rounded-[2rem] border border-white/5 backdrop-blur-md space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Target URL (Them)</label>
                                        <div className="relative group/input">
                                            <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within/input:text-blue-400 transition-colors" />
                                            <Input
                                                placeholder="https://competitor.com/blog-post"
                                                className="h-12 pl-10 bg-slate-950 border-white/10 text-white rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                                                value={targetUrl}
                                                onChange={(e) => setTargetUrl(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Your Asset URL (You)</label>
                                        <div className="relative group/input">
                                            <Link className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within/input:text-blue-400 transition-colors" />
                                            <Input
                                                placeholder="https://yoursite.com/awesome-guide"
                                                className="h-12 pl-10 bg-slate-950 border-white/10 text-white rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                                                value={yourAssetUrl}
                                                onChange={(e) => setYourAssetUrl(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Campaign Type</label>
                                        <Select value={campaignType} onValueChange={setCampaignType}>
                                            <SelectTrigger className="h-12 bg-slate-950 border-white/10 text-white rounded-xl focus:ring-2 focus:ring-blue-500/20">
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-900 border-white/10 text-white">
                                                <SelectItem value="Resource Link">Resource Link Building</SelectItem>
                                                <SelectItem value="Guest Post">Guest Post Pitch</SelectItem>
                                                <SelectItem value="Skyscraper">Skyscraper Technique</SelectItem>
                                                <SelectItem value="Broken Link">Broken Link Building</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Target Name (Optional)</label>
                                        <div className="relative group/input">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within/input:text-blue-400 transition-colors" />
                                            <Input
                                                placeholder="e.g. John Doe or 'Marketing Editor'"
                                                className="h-12 pl-10 bg-slate-950 border-white/10 text-white rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                                                value={targetName}
                                                onChange={(e) => setTargetName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleGenerate}
                                    disabled={isLoading}
                                    className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black shadow-lg shadow-blue-900/20 transition-all group text-lg mt-4"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Analyzing Page Context & Generating...
                                        </>
                                    ) : (
                                        <>
                                            Generate Campaign
                                            <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 📧 Results Section */}
                {campaign && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        {/* Left Column: Email Drafts */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="bg-slate-900/40 border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-3xl -mr-32 -mt-32"></div>

                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-white">Outreach Sequence</h3>
                                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Personalized for {campaign.campaignType}</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-3 py-1 text-xs uppercase tracking-widest font-black">
                                        Ready to Send
                                    </Badge>
                                </div>

                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1 flex justify-between">
                                            <span>Subject Line Options</span>
                                            <span className="text-blue-400">High Open Rate</span>
                                        </label>
                                        <div className="grid gap-3">
                                            {campaign.subjectLines.map((subject, i) => (
                                                <div key={i} className="group relative p-4 bg-slate-950/50 border border-white/5 rounded-2xl hover:border-blue-500/30 transition-colors cursor-pointer" onClick={() => copyToClipboard(subject)}>
                                                    <p className="text-sm font-medium text-slate-300 pr-8">{subject}</p>
                                                    <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-slate-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Copy className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Email Body</label>
                                            <Button variant="ghost" size="sm" className="h-6 text-[10px] uppercase font-black text-blue-400 hover:bg-blue-500/10" onClick={() => copyToClipboard(campaign.emailBody)}>
                                                <Copy className="mr-2 h-3 w-3" /> Copy Full Text
                                            </Button>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-transparent rounded-full opacity-50"></div>
                                            <div className="pl-6 pt-2">
                                                <p className="text-slate-300 leading-relaxed whitespce-pre-wrap font-medium">
                                                    {campaign.emailBody.split('\n').map((line, i) => (
                                                        <span key={i} className="block min-h-[1.5em]">{line}</span>
                                                    ))}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-white/5">
                                        <div className="flex items-center justify-between mb-4">
                                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Follow-Up (3 Days Later)</label>
                                            <Button variant="ghost" size="sm" className="h-6 text-[10px] uppercase font-black text-blue-400 hover:bg-blue-500/10" onClick={() => copyToClipboard(campaign.followUp)}>
                                                <Copy className="mr-2 h-3 w-3" /> Copy
                                            </Button>
                                        </div>
                                        <div className="p-4 bg-slate-950/30 border border-white/5 rounded-2xl">
                                            <p className="text-sm text-slate-400 italic">
                                                {campaign.followUp.split('\n').map((line, i) => (
                                                    <span key={i} className="block min-h-[1.5em]">{line}</span>
                                                ))}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Right Column: Strategy & Hook */}
                        <div className="space-y-6">
                            <Card className="bg-slate-900/40 border-white/10 rounded-[2.5rem] p-6 backdrop-blur-md">
                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4" />
                                    Personalization Hook
                                </h4>
                                <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl mb-6">
                                    <p className="text-sm text-emerald-300 font-medium leading-relaxed">
                                        "{campaign.personalizationHook}"
                                    </p>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    This hook was extracted from their content to prove you actually read their article. Using this in the opening paragraph increases response rates by <span className="text-white font-bold">320%</span>.
                                </p>
                            </Card>

                            <Card className="bg-slate-900/40 border-white/10 rounded-[2.5rem] p-6 backdrop-blur-md">
                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Campaign Checklist
                                </h4>
                                <div className="space-y-3">
                                    {[
                                        "Verify generic 'Editor' email",
                                        "Follow them on LinkedIn/Twitter",
                                        "Send initial email (Tuesday 10 AM)",
                                        "Schedule follow-up for Friday"
                                    ].map((step, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                                            <div className="h-5 w-5 rounded-full border-2 border-slate-600"></div>
                                            <span className="text-xs font-bold text-slate-400">{step}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BacklinkManager;
