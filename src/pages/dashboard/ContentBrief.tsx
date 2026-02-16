import React, { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import {
    FileText,
    Sparkles,
    Target,
    Link,
    HelpCircle,
    CheckCircle2,
    MoreHorizontal,
    Loader2,
    ArrowRight,
    Copy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { generateContentBrief, ContentBrief } from "@/services/ai";

const ContentBriefArchitect = () => {
    const [topic, setTopic] = useState("");
    const [audience, setAudience] = useState("General Public");
    const [tone, setTone] = useState("Informative");
    const [isLoading, setIsLoading] = useState(false);
    const [brief, setBrief] = useState<ContentBrief | null>(null);

    const handleGenerate = async () => {
        if (!topic.trim()) {
            toast.error("Please enter a topic or keyword");
            return;
        }

        setIsLoading(true);
        try {
            const result = await generateContentBrief(topic, audience, tone);
            setBrief(result);
            toast.success("Content Brief generated successfully!");
        } catch (error) {
            toast.error("Failed to generate content brief");
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (!brief) return;
        const text = `
Title: ${brief.suggestedTitle}
Meta Description: ${brief.metaDescription}
Target Word Count: ${brief.wordCountTarget}

Structure:
H1: ${brief.structure.h1}
${brief.structure.sections.map(s => `
${s.heading}
- ${s.talkingPoints.join('\n- ')}
Keywords: ${s.keywordsToInclude.join(', ')}
`).join('\n')}

Questions to Answer:
${brief.questionsToAnswer.join('\n')}

Competitor Gap:
${brief.competitorAnalysis.gap}
        `;
        navigator.clipboard.writeText(text);
        toast.success("Full brief copied to clipboard");
    };

    return (
        <div className="min-h-screen flex flex-col">
            <DashboardHeader
                title="Content Brief Architect"
                subtitle="Strategic Content Planning & Outline Generation"
            />

            <div className="max-w-[1600px] mx-auto w-full space-y-8 pt-8 pb-20 px-4 md:px-8">
                {/* 🏗️ Hero Section */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 border border-white/10 p-8 md:p-12">
                        <div className="max-w-4xl relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                                <FileText className="h-4 w-4" />
                                Pre-Content Strategist
                            </div>

                            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6 leading-[1.1]">
                                Content <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-rose-400 bg-[length:200%_auto] animate-gradient drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]">Brief</span> AI
                            </h1>

                            <p className="text-slate-400 text-lg font-medium max-w-2xl leading-relaxed mb-10">
                                Stop guessing what to write. Generate <span className="text-white">data-backed content outlines</span> that are engineered to outrank competitors before you write a single word.
                            </p>

                            <div className="bg-slate-900/50 p-8 rounded-[2rem] border border-white/5 backdrop-blur-md space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Target Topic / Keyword</label>
                                        <div className="relative group/input">
                                            <Target className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within/input:text-purple-400 transition-colors" />
                                            <Input
                                                placeholder="e.g. 'Best CRM for Small Business' or 'How to train for a marathon'"
                                                className="h-14 pl-12 bg-slate-950 border-white/10 text-white rounded-xl focus:ring-2 focus:ring-purple-500/20 transition-all font-medium text-lg"
                                                value={topic}
                                                onChange={(e) => setTopic(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Target Audience</label>
                                        <Select value={audience} onValueChange={setAudience}>
                                            <SelectTrigger className="h-12 bg-slate-950 border-white/10 text-white rounded-xl focus:ring-2 focus:ring-purple-500/20">
                                                <SelectValue placeholder="Select Audience" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-900 border-white/10 text-white">
                                                <SelectItem value="General Public">General Public</SelectItem>
                                                <SelectItem value="Beginners">Beginners / Students</SelectItem>
                                                <SelectItem value="Experts">Industry Experts / Pro</SelectItem>
                                                <SelectItem value="C-Level Execs">C-Level Executives</SelectItem>
                                                <SelectItem value="Technical Devs">Technical Developers</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Content Tone</label>
                                        <Select value={tone} onValueChange={setTone}>
                                            <SelectTrigger className="h-12 bg-slate-950 border-white/10 text-white rounded-xl focus:ring-2 focus:ring-purple-500/20">
                                                <SelectValue placeholder="Select Tone" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-900 border-white/10 text-white">
                                                <SelectItem value="Informative">Informative & Neutral</SelectItem>
                                                <SelectItem value="Persuasive">Persuasive & Sales-driven</SelectItem>
                                                <SelectItem value="Casual">Casual & Friendly</SelectItem>
                                                <SelectItem value="Authoritative">Authoritative & Strict</SelectItem>
                                                <SelectItem value="Witty">Witty & Entertaining</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleGenerate}
                                    disabled={isLoading}
                                    className="w-full h-14 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black shadow-lg shadow-purple-900/20 transition-all group text-lg mt-4"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Analyzing SERPs & Constructing Brief...
                                        </>
                                    ) : (
                                        <>
                                            Generate Strategic Brief
                                            <Sparkles className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 📄 Brief Results */}
                {brief && (
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        {/* Main Brief Content */}
                        <div className="xl:col-span-2 space-y-8">
                            <Card className="bg-slate-900/40 border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-md relative">
                                <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div>
                                        <h2 className="text-2xl font-black text-white mb-2">{brief.suggestedTitle}</h2>
                                        <p className="text-slate-400 font-medium">{brief.metaDescription}</p>
                                    </div>
                                    <Button onClick={copyToClipboard} variant="outline" className="border-white/10 hover:bg-white/5 text-slate-300">
                                        <Copy className="mr-2 h-4 w-4" /> Copy Brief
                                    </Button>
                                </div>

                                <div className="p-8 space-y-10">
                                    {/* Structure / Outline */}
                                    <div className="space-y-6">
                                        <h3 className="text-sm font-black text-purple-400 uppercase tracking-widest flex items-center gap-2">
                                            <FileText className="h-4 w-4" /> Content Skeleton
                                        </h3>

                                        <div className="space-y-6 relative pl-4 md:pl-8 border-l border-white/5">
                                            <div className="relative">
                                                <div className="absolute -left-[39px] md:-left-[47px] top-0 h-8 w-8 rounded-lg bg-purple-500 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-purple-500/20">H1</div>
                                                <h4 className="text-xl font-bold text-white mb-2">{brief.structure.h1}</h4>
                                            </div>

                                            {brief.structure.sections.map((section, idx) => (
                                                <div key={idx} className="relative pt-6">
                                                    <div className="absolute -left-[39px] md:-left-[47px] top-7 h-6 w-6 rounded-md bg-slate-800 border border-white/10 flex items-center justify-center text-slate-400 font-bold text-[10px]">H2</div>
                                                    <h5 className="text-lg font-bold text-slate-200 mb-4">{section.heading}</h5>

                                                    <div className="grid md:grid-cols-2 gap-6">
                                                        <div className="bg-white/5 rounded-xl p-5 border border-white/5">
                                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3">Key Talking Points</span>
                                                            <ul className="space-y-2">
                                                                {section.talkingPoints.map((point, i) => (
                                                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                                                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500 shrink-0"></div>
                                                                        <span className="leading-relaxed">{point}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div className="bg-purple-500/5 rounded-xl p-5 border border-purple-500/10">
                                                            <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest block mb-3">Keywords to Inject</span>
                                                            <div className="flex flex-wrap gap-2">
                                                                {section.keywordsToInclude.map((kw, i) => (
                                                                    <Badge key={i} variant="secondary" className="bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/20">
                                                                        {kw}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Sidebar: Strategy & Meta */}
                        <div className="space-y-6">
                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <Card className="bg-slate-900/40 border-white/10 p-6 rounded-[2rem] text-center">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Word Count</span>
                                    <span className="text-3xl font-black text-white">{brief.wordCountTarget}</span>
                                    <span className="text-xs text-slate-500 block mt-1">Recommended</span>
                                </Card>
                                <Card className="bg-slate-900/40 border-white/10 p-6 rounded-[2rem] text-center">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Reading Level</span>
                                    <span className="text-3xl font-black text-white">8th</span>
                                    <span className="text-xs text-slate-500 block mt-1">Grade</span>
                                </Card>
                            </div>

                            {/* Competitor Gap */}
                            <Card className="bg-slate-900/40 border-white/10 rounded-[2.5rem] p-6 backdrop-blur-md">
                                <h4 className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <Target className="h-4 w-4" />
                                    Competitor Weakness
                                </h4>
                                <div className="p-4 bg-rose-500/5 border border-rose-500/10 rounded-2xl mb-4">
                                    <p className="text-sm text-rose-300 font-medium leading-relaxed italic">
                                        "{brief.competitorAnalysis.gap}"
                                    </p>
                                </div>
                                <div className="text-xs text-slate-500 flex items-center gap-2">
                                    <span className="font-bold">Via:</span> {brief.competitorAnalysis.topCompetitorUrl}
                                </div>
                            </Card>

                            {/* PAA Questions */}
                            <Card className="bg-slate-900/40 border-white/10 rounded-[2.5rem] p-6 backdrop-blur-md">
                                <h4 className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <HelpCircle className="h-4 w-4" />
                                    People Also Ask
                                </h4>
                                <ul className="space-y-3">
                                    {brief.questionsToAnswer.map((q, i) => (
                                        <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                                            <div className="text-amber-500 font-black text-sm">?</div>
                                            <span className="text-xs font-bold text-slate-300 leading-relaxed">{q}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Card>

                            {/* Internal Links */}
                            <Card className="bg-slate-900/40 border-white/10 rounded-[2.5rem] p-6 backdrop-blur-md">
                                <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <Link className="h-4 w-4" />
                                    Internal Link Opportunities
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {brief.internalLinkingSuggestions?.map((link, i) => (
                                        <Badge key={i} variant="outline" className="border-blue-500/20 text-blue-300 hover:bg-blue-500/10 cursor-pointer">
                                            {link}
                                        </Badge>
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

export default ContentBriefArchitect;
