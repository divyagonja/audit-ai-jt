import { useEffect } from 'react';
import Navigation from '@/components/landing/Navigation';
import Footer from '@/components/landing/Footer';
import { Download, Newspaper, Mail, ArrowRight, ExternalLink, Rocket, Globe, FileText, Zap, Star, Shield, Layout, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Press = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Newsroom - AuditAI";
    }, []);

    const mentions = [
        {
            outlet: "TechCrunch",
            title: "AuditAI raises Series A to fix the broken web",
            date: "Dec 10, 2025",
            logo: "TC",
            category: "Funding"
        },
        {
            outlet: "Forbes",
            title: "The Next Generation of Technical SEO Tools",
            date: "Nov 24, 2025",
            logo: "F",
            category: "Feature"
        },
        {
            outlet: "Search Engine Land",
            title: "How AuditAI is solving the Javascript Indexing Crisis",
            date: "Oct 15, 2025",
            logo: "SEL",
            category: "Analysis"
        },
        {
            outlet: "VentureBeat",
            title: "AI-First Crawlers: The Future of Site Audits",
            date: "Sep 02, 2025",
            logo: "VB",
            category: "Product"
        },
    ];

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-slate-300 selection:bg-pink-500/30 overflow-x-hidden">
            <Navigation />

            {/* Optimized Hero Section */}
            <section className="relative pt-44 pb-20 overflow-hidden">
                {/* Background Visuals */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/10 blur-[130px] rounded-full animate-pulse" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-slate-900 border border-white/10 mb-8 shadow-xl backdrop-blur-xl"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
                            <span className="text-pink-500 text-[9px] font-black uppercase tracking-[0.2em]">Newsroom</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9] uppercase"
                        >
                            Global <br />
                            <span className="premium-gradient-text text-6xl md:text-8xl">Headlines</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed border-l-2 border-pink-600 pl-6"
                        >
                            Tracing the evolution of intelligence-led web infrastructure. We are rebuilding the connectivity of the open web.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Press Mentions - Optimized Scaling */}
            <section className="py-20 relative">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col gap-6">
                        {mentions.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.98 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="group"
                            >
                                <a href="#" className="flex flex-col md:flex-row md:items-center justify-between p-8 md:p-10 rounded-[2.5rem] bg-slate-900/40 border border-white/5 hover:border-pink-500/30 hover:bg-slate-900/60 transition-all duration-300 relative overflow-hidden backdrop-blur-2xl">
                                    <div className="absolute inset-x-0 bottom-0 h-1 bg-pink-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                                    <div className="flex-1 relative z-10">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-[8px] font-black text-pink-500 tracking-widest uppercase">
                                                {item.outlet}
                                            </div>
                                            <div className="text-slate-500 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                                                <Calendar className="w-3 h-3 text-pink-500/50" />
                                                {item.date}
                                            </div>
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-pink-50 transition-all tracking-tight leading-tight max-w-3xl">
                                            {item.title}
                                        </h3>
                                    </div>

                                    <div className="hidden md:flex flex-shrink-0 w-16 h-16 rounded-2xl border border-white/10 items-center justify-center bg-white/5 group-hover:bg-pink-600 group-hover:border-pink-500 transition-all duration-300 relative z-10">
                                        <ExternalLink className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
                                    </div>
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Media Resources: Optimized Bento */}
            <section className="py-20 relative bg-black">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-6">
                        {/* Media Resources Main Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="lg:col-span-8 p-10 md:p-12 rounded-[3rem] bg-white text-black flex flex-col justify-center relative overflow-hidden group border border-white/10"
                        >
                            <div className="max-w-xl relative z-10">
                                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Media Kits</h2>
                                <p className="text-lg text-slate-600 font-medium mb-10 leading-relaxed">
                                    Official brand assets, portraits, and documentation for global publication.
                                </p>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <button className="flex items-center justify-between p-6 rounded-2xl bg-slate-50 border border-slate-100 group/btn transition-all hover:bg-slate-950 hover:text-white">
                                        <div className="text-left">
                                            <div className="font-bold text-lg mb-0.5 tracking-tight">Brand Assets</div>
                                            <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">SVG • PNG Module</div>
                                        </div>
                                        <Download className="w-6 h-6 opacity-40 group-hover/btn:opacity-100" />
                                    </button>
                                    <button className="flex items-center justify-between p-6 rounded-2xl bg-slate-50 border border-slate-100 group/btn transition-all hover:bg-slate-950 hover:text-white">
                                        <div className="text-left">
                                            <div className="font-bold text-lg mb-0.5 tracking-tight">Portraitures</div>
                                            <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">High-Res Studio</div>
                                        </div>
                                        <Download className="w-6 h-6 opacity-40 group-hover/btn:opacity-100" />
                                    </button>
                                </div>
                            </div>
                            <div className="absolute right-[-10%] top-[-10%] w-[50%] h-[120%] bg-slate-100/50 rounded-full blur-3xl -z-0 pointer-events-none" />
                        </motion.div>

                        {/* Press Contact Bento Unit */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="lg:col-span-4 p-10 rounded-[3rem] bg-gradient-to-br from-pink-600 to-rose-600 text-white flex flex-col justify-between relative overflow-hidden group shadow-xl"
                        >
                            <div className="relative z-10">
                                <h2 className="text-3xl font-black mb-4 tracking-tight">Direct Comms</h2>
                                <p className="text-sm font-medium text-pink-100 opacity-90 leading-relaxed">
                                    Requests for strategic interviews or partnership intelligence.
                                </p>
                            </div>

                            <a href="mailto:press@auditai.com" className="mt-8 p-6 rounded-2xl bg-black/20 hover:bg-white hover:text-pink-600 transition-all group/mail border border-white/10 flex items-center justify-center">
                                <Mail className="w-10 h-10 group-hover/mail:scale-110 transition-transform" />
                            </a>
                            <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
                                <Shield className="absolute bottom-[-20px] right-[-20px] w-32 h-32 -rotate-12" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Press;
