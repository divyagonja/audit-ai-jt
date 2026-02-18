import React, { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import {
    Skull,
    ShieldAlert,
    CheckCircle2,
    AlertTriangle,
    Loader2,
    Download,
    ExternalLink,
    Search,
    BarChart,
    Filter,
    FileSearch,
    ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { analyzeLinkToxicity, ToxicLink } from "@/services/ai";

const LinkToxicityMonitor = () => {
    const [domain, setDomain] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [auditData, setAuditData] = useState<{ toxicCount: number; overallRisk: string; links: ToxicLink[] } | null>(null);

    const handleAnalyze = async () => {
        if (!domain.trim()) {
            toast.error("Please enter a domain to analyze");
            return;
        }

        setIsLoading(true);
        try {
            const results = await analyzeLinkToxicity(domain);
            setAuditData(results);
            toast.success("Link toxicity audit complete.");
        } catch (error) {
            toast.error("Failed to analyze links");
        } finally {
            setIsLoading(false);
        }
    };

    const getRiskColor = (risk: string) => {
        switch (risk) {
            case 'High': return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
            case 'Medium': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
            case 'Low': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
            default: return 'text-slate-500 bg-slate-500/10 border-slate-500/20';
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <DashboardHeader
                title="Link Toxicity Monitor"
                subtitle="Protecting Your Site From Google Spam Penalties"
            />

            <div className="max-w-[1600px] mx-auto w-full space-y-8 pt-8 pb-20 px-4 md:px-8">
                {/* 💀 Hero Section */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-rose-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 border border-white/10 p-8 md:p-12">
                        <div className="max-w-4xl relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-[0_0_20px_rgba(239,68,68,0.15)]">
                                <Skull className="h-4 w-4" />
                                Spam Defense System
                            </div>

                            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6 leading-[1.1]">
                                Toxicity <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-fuchsia-400 bg-[length:200%_auto] animate-gradient drop-shadow-[0_0_15px_rgba(244,63,94,0.3)]">Scanner</span>
                            </h1>

                            <p className="text-slate-400 text-lg font-medium max-w-2xl leading-relaxed mb-10">
                                Avoid the "Manual Action" kiss of death. Our AI analyzes your backlink profile to identify <span className="text-white">harmful PBNs</span>, automated spam, and unrelated links that hurt your rankings.
                            </p>

                            <div className="flex flex-col md:flex-row gap-4 max-w-2xl">
                                <div className="relative flex-1 group/input">
                                    <FileSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within/input:text-red-400 transition-colors" />
                                    <Input
                                        placeholder="Enter domain to audit links..."
                                        className="h-14 pl-12 bg-slate-900 border-white/10 text-white rounded-2xl focus:ring-2 focus:ring-red-500/20 transition-all font-medium text-lg"
                                        value={domain}
                                        onChange={(e) => setDomain(e.target.value)}
                                    />
                                </div>
                                <Button
                                    onClick={handleAnalyze}
                                    disabled={isLoading}
                                    className="h-14 px-8 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black shadow-lg shadow-red-900/20 transition-all group"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Analyzing Backlinks...
                                        </>
                                    ) : (
                                        <>
                                            Check Toxicity
                                            <ShieldAlert className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>

                        {/* Background Skull Icon (Subtle) */}
                        <div className="absolute top-1/2 right-4 -translate-y-1/2 text-white/[0.02] filter blur-[2px] hidden lg:block">
                            <Skull className="h-96 w-96 transform rotate-12" />
                        </div>
                    </div>
                </div>

                {/* 📉 Analysis Overview */}
                {auditData && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        {/* Summary Stats */}
                        <Card className="bg-slate-900/40 border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md relative overflow-hidden flex flex-col items-center justify-center text-center">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-rose-600"></div>

                            <div className="mb-6 relative">
                                <div className={`h-24 w-24 rounded-full flex items-center justify-center border-4 ${auditData.overallRisk === 'High' ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]' : 'border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.3)]'}`}>
                                    <span className="text-4xl font-black text-white">{auditData.toxicCount}</span>
                                </div>
                                <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-500 text-white border-white/10 px-3 py-1 font-black">
                                    TOXIC LINKS
                                </Badge>
                            </div>

                            <h3 className="text-2xl font-black text-white mb-2">Profile Risk: <span className={auditData.overallRisk === 'High' ? 'text-red-500' : 'text-amber-500'}>{auditData.overallRisk}</span></h3>
                            <p className="text-slate-500 text-sm font-medium mb-8">
                                AI has detected patterns matching common manual penalty signals.
                            </p>

                            <Button className="w-full bg-white text-slate-950 hover:bg-slate-200 font-black rounded-xl">
                                <Download className="mr-2 h-4 w-4" /> Export Disavow File
                            </Button>
                        </Card>

                        {/* Main Link Table */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex items-center justify-between px-2">
                                <h4 className="text-xl font-black text-white flex items-center gap-2">
                                    <Filter className="h-5 w-5 text-slate-500" />
                                    Harmful Referring Domains
                                </h4>
                                <div className="flex gap-2">
                                    <Badge variant="outline" className="text-slate-400 border-white/5 bg-white/5">Sort by Toxicity</Badge>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {auditData.links.map((link, i) => (
                                    <Card key={i} className="group bg-slate-950/40 border-white/5 rounded-3xl p-6 hover:border-red-500/30 transition-all">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Badge className={getRiskColor(link.riskLevel)}>
                                                        {link.riskLevel} Risk
                                                    </Badge>
                                                    <span className="text-xs font-black text-slate-600 uppercase tracking-widest">Toxicity: {link.toxicityScore}%</span>
                                                </div>
                                                <h5 className="text-lg font-bold text-white truncate flex items-center gap-2">
                                                    {link.url}
                                                    <ExternalLink className="h-3 w-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
                                                </h5>
                                                <p className="text-xs text-slate-400 mt-2 flex items-center gap-2">
                                                    <AlertTriangle className="h-3 w-3 text-red-500 flex-shrink-0" />
                                                    {link.reason}
                                                </p>
                                            </div>

                                            <div className="flex gap-8 shrink-0">
                                                <div className="text-center">
                                                    <p className="text-[10px] font-black text-slate-600 uppercase mb-1">Domain Auth</p>
                                                    <p className="text-xl font-black text-white">{link.domainAuthority}</p>
                                                </div>
                                                <div className="flex flex-col justify-center gap-2">
                                                    <Button size="sm" variant="outline" className="h-8 border-white/10 text-xs font-bold hover:bg-white/5">
                                                        Disavow
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                                            <div className="flex-1 mr-4">
                                                <Progress value={link.toxicityScore} className="h-1 bg-white/5" indicatorClassName="bg-red-500" />
                                            </div>
                                            <span className="text-[10px] font-black text-slate-700 uppercase">Risk Gradient</span>
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

export default LinkToxicityMonitor;
