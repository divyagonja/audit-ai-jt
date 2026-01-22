import { X, TrendingUp, BarChart3, ShieldCheck, Target, Zap, ArrowRight, CheckCircle2, Globe, FileText, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';

export interface CaseStudy {
    id: number;
    client: string;
    title: string;
    metric: string;
    metricLabel: string;
    tags: string[];
    image: string;
    description: string;
    logo: string;
    details?: {
        challenge: string;
        solution: string;
        results: string[];
        stats: { label: string; value: string; icon: any }[];
    };
}

interface CaseStudyModalProps {
    isOpen: boolean;
    onClose: () => void;
    study: CaseStudy | null;
}

const CaseStudyModal = ({ isOpen, onClose, study }: CaseStudyModalProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    if (!study) return null;

    // Default details if none provided
    const details = study.details || {
        challenge: "The client faced significant visibility issues in a highly competitive market, struggling with legacy technical debt and unoptimized content structures that hindered their crawl budget and ranking potential.",
        solution: "AuditAI implemented a comprehensive three-tier approach: first, a deep-tissue technical audit to resolve orphaned pages; second, a semantic intent mapping loop to align content with user search behavior; and finally, an automated governance system to maintain freshness.",
        results: [
            "Achieved 400% increase in non-branded organic traffic within the first 6 months.",
            "Ranked #1 for over 250 high-intent keywords previously out of reach.",
            "Reduced technical debt overhead by 65%, freeing up server resources.",
            "Boosted mobile conversion rates by 35% through Core Web Vitals optimization."
        ],
        stats: [
            { label: "Growth", value: study.metric, icon: TrendingUp },
            { label: "Keywords", value: "250+", icon: Target },
            { label: "Efficiency", value: "65%", icon: Zap },
            { label: "Global Reach", value: "12", icon: Globe }
        ]
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-2xl p-4 md:p-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        className="glass-premium relative w-full max-w-6xl h-[90vh] bg-slate-900 border border-white/10 rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row"
                    >
                        {/* Left Side: Impact Panel (Dark & Bold) */}
                        <div className="w-full md:w-[35%] bg-gradient-to-br from-indigo-600 via-blue-700 to-slate-950 p-8 md:p-10 relative overflow-hidden flex flex-col justify-between shrink-0">
                            {/* Animated Background Gradients */}
                            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[100px] -translate-y-20 translate-x-20" />
                            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/20 rounded-full blur-[100px] -translate-x-20 translate-y-20" />

                            <div className="relative z-10 overflow-y-auto no-scrollbar">
                                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center font-black text-white text-2xl mb-6 backdrop-blur-md shrink-0">
                                    {study.logo}
                                </div>

                                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none mb-3">
                                    Strategic <br />
                                    <span className="text-indigo-200">Expansion</span>
                                </h2>

                                <p className="text-blue-100/70 text-sm md:text-base font-medium mb-8 leading-relaxed">
                                    Comprehensive post-analysis of {study.client}'s transformation journey.
                                </p>

                                <div className="grid gap-4">
                                    {details.stats.map((stat, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + i * 0.1 }}
                                            className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-400/30 shrink-0">
                                                <stat.icon className="w-5 h-5 text-indigo-300" />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="text-xl md:text-2xl font-black text-white leading-none truncate">{stat.value}</div>
                                                <div className="text-[9px] uppercase font-black tracking-widest text-blue-200 opacity-60 mt-0.5 truncate">{stat.label}</div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative z-10 pt-6 shrink-0">
                                <div className="flex items-center gap-3 text-[10px] font-black text-white uppercase tracking-[0.3em] opacity-40">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>Verified Case Report</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Detailed Content (Scrollable) */}
                        <div
                            ref={scrollRef}
                            className="flex-1 bg-slate-900 overflow-y-auto custom-scrollbar relative p-8 md:p-14"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-8 right-8 z-[100] w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all group"
                            >
                                <X className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            </button>

                            <div className="max-w-3xl mx-auto">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6">
                                    <FileText className="w-3.5 h-3.5" />
                                    <span>Full Case Narrative</span>
                                </div>

                                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-8 leading-tight">
                                    {study.title}
                                </h1>

                                <div className="flex flex-wrap gap-3 mb-12">
                                    {study.tags.map(tag => (
                                        <span key={tag} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-slate-400 uppercase tracking-widest">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Detailed Narrative Sections */}
                                <div className="space-y-16">
                                    {/* Challenge */}
                                    <section>
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-8 h-[2px] bg-indigo-500/30" />
                                            <h3 className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.3em]">The Challenge</h3>
                                        </div>
                                        <p className="text-slate-300 text-xl leading-relaxed font-medium">
                                            {details.challenge}
                                        </p>
                                    </section>

                                    {/* Image Showcase */}
                                    <div className="relative rounded-[32px] overflow-hidden border border-white/10 group">
                                        <img src={study.image} className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-1000" alt="Analysis Mockup" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                        <div className="absolute bottom-8 left-8 right-8">
                                            <p className="text-white font-bold text-sm italic opacity-80">"The visualization of crawl depth and semantic gaps provided the clarity needed to execute at scale."</p>
                                        </div>
                                    </div>

                                    {/* The Solution */}
                                    <section>
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-8 h-[2px] bg-emerald-500/30" />
                                            <h3 className="text-[11px] font-black text-emerald-400 uppercase tracking-[0.3em]">Execution Path</h3>
                                        </div>
                                        <p className="text-slate-300 text-xl leading-relaxed font-medium">
                                            {details.solution}
                                        </p>
                                    </section>

                                    {/* Quantifiable Results */}
                                    <section className="bg-white/5 rounded-[40px] p-8 md:p-12 border border-white/10">
                                        <div className="flex items-center gap-4 mb-10">
                                            <div className="w-8 h-[2px] bg-blue-500/30" />
                                            <h3 className="text-[11px] font-black text-blue-400 uppercase tracking-[0.3em]">Measurable Yield</h3>
                                        </div>

                                        <div className="grid gap-6">
                                            {details.results.map((result, i) => (
                                                <div key={i} className="flex gap-5">
                                                    <div className="w-8 h-8 rounded-full bg-blue-600/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                                                        <CheckCircle2 className="w-4 h-4 text-blue-400" />
                                                    </div>
                                                    <p className="text-slate-300 font-bold leading-relaxed">{result}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>

                                {/* Footer CTA */}
                                <div className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div>
                                        <p className="text-white font-bold text-lg mb-1">Ready for similar results?</p>
                                        <p className="text-slate-500 text-sm">Deploy AuditAI across your enterprise infrastructure today.</p>
                                    </div>
                                    <button className="px-8 py-4 bg-white text-navy font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-xl active:scale-95">
                                        Initialize Full Audit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CaseStudyModal;
