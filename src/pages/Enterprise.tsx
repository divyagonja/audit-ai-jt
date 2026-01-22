import { useEffect } from 'react';
import Navigation from '@/components/landing/Navigation';
import Footer from '@/components/landing/Footer';
import { Building2, ShieldCheck, Zap, Users, BarChart3, ArrowRight, CheckCircle2, Globe, Activity, Terminal, Shield, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Enterprise = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Enterprise Solutions - AuditAI";
    }, []);

    const features = [
        {
            title: "Planetary Scale Infrastructure",
            description: "Crawl millions of pages without architectural limits. Our elastic infrastructure scales dynamically to handle the world's largest web properties.",
            icon: Globe,
            gradient: "from-blue-500 to-indigo-600"
        },
        {
            title: "Dedicated Strategic Counsel",
            description: "Direct access to enterprise SEO architects who understand high-stakes business goals and maximize your competitive alpha.",
            icon: Users,
            gradient: "from-purple-500 to-pink-600"
        },
        {
            title: "Military-Grade Governance",
            description: "SOC 2 Type II certified infrastructure with support for custom InfoSec audits, SAML 2.0, and granular RBAC controls.",
            icon: Shield,
            gradient: "from-emerald-500 to-teal-600"
        },
        {
            title: "Programmable Intelligence",
            description: "Full API orchestration and real-time webhooks to integrate AuditAI directly into your CI/CD pipelines and custom analytics stacks.",
            icon: Terminal,
            gradient: "from-amber-500 to-orange-600"
        }
    ];

    const capabilities = [
        "Single Sign-On (SSO) & SAML 2.0 Integration",
        "Unlimited Global Crawl Budget & TB-Scale Storage",
        "Strategic 24/7 Priority Support (Global Response)",
        "Automated Data Retention & Multi-Region Policies",
        "White-Label Executive Narrative Dashboards",
        "Provisioned Dedicated Enterprise IP Clusters"
    ];

    return (
        <div className="min-h-screen bg-[#020408] font-sans text-white selection:bg-indigo-500/30">
            <Navigation />

            {/* Cinematic Hero */}
            <section className="relative pt-40 pb-32 overflow-hidden bg-slate-950">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px] -mr-64 -mt-64 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] -ml-64 -mb-64 pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="flex-1 max-w-2xl text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-8 animate-fade-in">
                                <Building2 className="w-3.5 h-3.5" />
                                <span>Enterprise Protocol</span>
                            </div>

                            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] text-white">
                                SEO at <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400 italic">Planetary Scale.</span>
                            </h1>

                            <p className="text-xl text-slate-400 mb-10 leading-relaxed font-medium mx-auto lg:mx-0">
                                The mission-critical platform for Fortune 500 digital ecosystems. Unleash high-fidelity auditing, military-grade security, and custom sovereign infrastructure.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                                <Button className="h-16 px-10 bg-white text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-2xl hover:scale-105 active:scale-95">
                                    Initialize Demo
                                </Button>
                                <Button variant="outline" className="h-16 px-10 border-white/10 bg-white/5 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-white hover:text-black transition-all backdrop-blur-md">
                                    Security Briefing
                                </Button>
                            </div>
                        </div>

                        {/* Visual Asset: Animated Terminal/System Core */}
                        <div className="flex-1 w-full max-w-xl">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-indigo-500/20 blur-[80px] rounded-full group-hover:bg-indigo-500/30 transition-all duration-1000" />
                                <div className="relative glass-premium border border-white/10 rounded-[40px] p-2 overflow-hidden shadow-2xl">
                                    <div className="bg-slate-950 rounded-[32px] overflow-hidden border border-white/5">
                                        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
                                            <div className="flex gap-2">
                                                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                                <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                                                <div className="w-3 h-3 rounded-full bg-green-500/20" />
                                            </div>
                                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global-Node-Sync: Active</div>
                                        </div>

                                        <div className="p-8 space-y-8">
                                            <div className="space-y-2">
                                                <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Aggregate Throughput</div>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-5xl font-black text-white tracking-tighter">5.2B</span>
                                                    <span className="text-slate-500 font-bold uppercase text-xs">Events/mo</span>
                                                </div>
                                            </div>

                                            <div className="h-48 bg-white/[0.02] rounded-3xl border border-white/5 relative overflow-hidden group/chart">
                                                <div className="absolute inset-x-0 top-1/2 h-[1px] bg-white/5" />
                                                <div className="absolute inset-0 flex items-end justify-between px-6 pb-6 h-full gap-2">
                                                    {[40, 65, 85, 45, 95, 75, 40, 60, 90, 55, 80, 70].map((h, i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ height: 0 }}
                                                            whileInView={{ height: `${h}%` }}
                                                            transition={{ duration: 1.5, delay: i * 0.1, type: "spring", damping: 12 }}
                                                            className="flex-1 bg-gradient-to-t from-indigo-600/40 to-indigo-400 rounded-t-lg relative group/bar"
                                                        >
                                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2 opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap px-2 py-1 bg-indigo-600 rounded text-[9px] font-black">
                                                                {h}TB
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest pt-4 border-t border-white/5">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                    <span>Uptime: 99.999%</span>
                                                </div>
                                                <div>Region: US-East-Static</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Logo Wall: Trust Consensus */}
            <section className="py-20 border-y border-white/5 bg-[#05070a]">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-12">Consensus Architecture Trusted By</p>
                    <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-40 grayscale group hover:grayscale-0 transition-all duration-700">
                        {['ACME', 'NEXUS', 'VERTEX', 'QUANTUM', 'ZENITH'].map((brand, i) => (
                            <span key={i} className="text-2xl font-black text-white tracking-widest hover:text-indigo-400 cursor-default transition-colors">{brand}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Strategic Pillars */}
            <section className="py-32 bg-[#020408]">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-10">
                        {features.map((feature, index) => (
                            <div key={index} className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[40px] -m-1 p-[1px]"
                                    style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />
                                <div className="relative h-full bg-[#05070a] border border-white/5 p-12 rounded-[40px] transition-all duration-500 hover:translate-y-[-8px]">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-8 shadow-2xl`}>
                                        <feature.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tight">{feature.title}</h3>
                                    <p className="text-xl text-slate-500 leading-relaxed font-medium">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sovereign Capabilities */}
            <section className="py-32 bg-[#05070a]">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto rounded-[60px] overflow-hidden border border-white/10 glass-premium shadow-2xl relative">
                        <div className="absolute inset-0 bg-indigo-600/5 pointer-events-none" />

                        <div className="p-16 md:p-24 flex flex-col items-center text-center relative z-10">
                            <Cpu className="w-16 h-16 text-indigo-500 mb-8 opacity-20" />
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
                                Integrated <br />
                                <span className="text-indigo-400">Enterprise Core</span>
                            </h2>
                            <p className="text-xl text-slate-400 mb-16 max-w-2xl font-medium leading-relaxed">
                                Deploy our full-spectrum analytics engine across your entire organizational infrastructure with native support for sovereign data governance.
                            </p>

                            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 w-full text-left">
                                {capabilities.map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 py-4 border-b border-white/5 group">
                                        <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:border-emerald-400 transition-all">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 group-hover:text-black" />
                                        </div>
                                        <span className="text-lg text-slate-300 font-bold group-hover:text-white transition-colors">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-20 flex flex-col sm:flex-row gap-6 w-full justify-center">
                                <Button className="h-20 px-16 bg-white text-black font-black text-sm uppercase tracking-widest rounded-3xl hover:bg-indigo-600 hover:text-white transition-all shadow-2xl hover:scale-105 active:scale-95 group">
                                    Contact Sales Protocol
                                    <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-2 transition-transform" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Enterprise;
