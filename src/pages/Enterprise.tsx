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
            title: "Unlimited Scale",
            description: "Audit millions of pages without limits. Our flexible infrastructure scales to handle the world's largest web properties.",
            icon: Globe,
            gradient: "from-blue-500 to-indigo-600"
        },
        {
            title: "Dedicated Success Manager",
            description: "Direct access to SEO experts who understand your business goals and help you get the most out of our platform.",
            icon: Users,
            gradient: "from-purple-500 to-pink-600"
        },
        {
            title: "Advanced Security",
            description: "SOC 2 Type II certified with support for custom security reviews, Single Sign-On (SSO), and granular access controls.",
            icon: Shield,
            gradient: "from-emerald-500 to-teal-600"
        },
        {
            title: "API & Developer Tools",
            description: "Full API access and real-time webhooks to integrate AuditAI directly into your existing development workflows.",
            icon: Terminal,
            gradient: "from-amber-500 to-orange-600"
        }
    ];

    const capabilities = [
        "Single Sign-On (SSO) & SAML 2.0 Integration",
        "Unlimited Global Crawl Budget & Storage",
        "24/7 Priority Support with Global Coverage",
        "Custom Data Retention & Compliance Policies",
        "White-Label Reporting & Executive Dashboards",
        "Dedicated IP Addresses for Secure Access"
    ];

    return (
        <div className="min-h-screen bg-[#020408] font-sans text-white selection:bg-indigo-500/30">
            <Navigation />

            {/* Cinematic Hero with Motion Gradient */}
            <section className="relative pt-40 pb-32 overflow-hidden bg-[#020408]">
                {/* Motion Gradient Background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <motion.div
                        animate={{
                            x: [0, 60, 0],
                            y: [0, -40, 0],
                            scale: [1, 1.15, 1],
                        }}
                        transition={{
                            duration: 18,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute -top-40 -right-40 w-[900px] h-[900px] bg-indigo-600/20 rounded-full blur-[120px]"
                    />
                    <motion.div
                        animate={{
                            x: [0, -60, 0],
                            y: [0, 60, 0],
                            scale: [1, 1.25, 1],
                        }}
                        transition={{
                            duration: 22,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute -bottom-40 -left-40 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px]"
                    />
                    <motion.div
                        animate={{
                            opacity: [0.1, 0.25, 0.1],
                            scale: [0.85, 1.1, 0.85],
                        }}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[700px] bg-purple-900/10 rounded-full blur-[150px]"
                    />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="flex-1 max-w-2xl text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-8 backdrop-blur-md"
                            >
                                <Building2 className="w-3.5 h-3.5" />
                                <span>Enterprise Edition</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] text-white"
                            >
                                SEO for <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#818CF8] italic">Global Brands.</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl text-slate-400 mb-10 leading-relaxed font-medium mx-auto lg:mx-0"
                            >
                                The trusted platform for Fortune 500 companies. Get the scale, security, and dedicated support your organization needs to stay ahead.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
                            >
                                <Button className="h-16 px-10 bg-white text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-2xl hover:scale-105 active:scale-95">
                                    Book a Demo
                                </Button>
                                <Button variant="outline" className="h-16 px-10 border-white/10 bg-white/5 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-white hover:text-black transition-all backdrop-blur-md">
                                    View Security
                                </Button>
                            </motion.div>
                        </div>

                        {/* Visual Asset: Animated Terminal/System Core */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                            className="flex-1 w-full max-w-xl"
                        >
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
                                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">System Status: Active</div>
                                        </div>

                                        <div className="p-8 space-y-8">
                                            <div className="space-y-2">
                                                <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Monthly Analysis Volume</div>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-5xl font-black text-white tracking-tighter">5.2B</span>
                                                    <span className="text-slate-500 font-bold uppercase text-xs">Items/mo</span>
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
                                                    <span>Uptime: 99.9%</span>
                                                </div>
                                                <div>Region: Global</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Logo Wall: Trust */}
            <section className="py-20 border-y border-white/5 bg-[#05070a]">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-12">Trusted By Global Industry Leaders</p>
                    <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-40 grayscale group hover:grayscale-0 transition-all duration-700">
                        {['ACME', 'NEXUS', 'VERTEX', 'QUANTUM', 'ZENITH'].map((brand, i) => (
                            <span key={i} className="text-2xl font-black text-white tracking-widest hover:text-indigo-400 cursor-default transition-colors">{brand}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
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

            {/* Support Capabilities */}
            <section className="py-32 bg-[#05070a]">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto rounded-[60px] overflow-hidden border border-white/10 glass-premium shadow-2xl relative">
                        <div className="absolute inset-0 bg-indigo-600/5 pointer-events-none" />

                        <div className="p-16 md:p-24 flex flex-col items-center text-center relative z-10">
                            <Cpu className="w-16 h-16 text-indigo-500 mb-8 opacity-20" />
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
                                Built for your <br />
                                <span className="text-indigo-400">Organization</span>
                            </h2>
                            <p className="text-xl text-slate-400 mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
                                Deploy our powerful analytics tools across your entire company with full security and compliance support.
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
                                    Contact Sales
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
