import { useEffect, useState } from 'react';
import Navigation from '@/components/landing/Navigation';
import Footer from '@/components/landing/Footer';
import { Shield, Lock, Eye, FileText, Mail, Server, Globe, UserCheck, Check } from 'lucide-react';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Privacy Policy - AuditAI";
    }, []);

    const dataCollection = [
        {
            title: "Identity Data",
            description: "First name, last name, username, and title.",
            icon: UserCheck,
            color: "text-blue-400",
            bg: "bg-blue-500/10"
        },
        {
            title: "Contact Data",
            description: "Billing address, email address, and telephone numbers.",
            icon: Mail,
            color: "text-purple-400",
            bg: "bg-purple-500/10"
        },
        {
            title: "Technical Data",
            description: "IP address, login data, browser type, and version.",
            icon: Server,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10"
        },
        {
            title: "Usage Data",
            description: "Information about how you use our website and services.",
            icon: Eye,
            color: "text-amber-400",
            bg: "bg-amber-500/10"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-slate-300 selection:bg-blue-500/30">
            <Navigation />

            {/* Premium Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-[#020617]" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-transparent to-slate-900/50" />

                {/* Abstract Visuals */}
                <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
                                <Shield className="w-4 h-4 text-blue-400" />
                                <span className="text-blue-400 text-sm font-semibold tracking-wide">Privacy First Architecture</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                                Your Secrets are <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Safe With Us.</span>
                            </h1>

                            <p className="text-xl text-slate-400 max-w-xl leading-relaxed">
                                We believe privacy is a fundamental human right. Our policy is simple: we don't own your data, you do. And we protect it like it's our own.
                            </p>

                            <div className="flex flex-wrap gap-4 text-sm text-slate-500 font-mono">
                                <div className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                                    Last Updated: Jan 15, 2026
                                </div>
                                <div className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                                    <Globe className="w-4 h-4" />
                                    Global Coverage
                                </div>
                            </div>
                        </div>

                        {/* Interactive-looking 3D Element */}
                        <div className="flex-1 w-full max-w-lg">
                            <div className="relative aspect-square rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-8 shadow-2xl flex flex-col justify-between overflow-hidden group hover:border-blue-500/30 transition-colors duration-500">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-5 mix-blend-overlay"></div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-[50px]"></div>

                                <div className="flex justify-between items-start z-10">
                                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 shadow-lg">
                                        <Lock className="w-8 h-8 text-emerald-400" />
                                    </div>
                                    <div className="px-3 py-1 bg-emerald-500/10 rounded-full text-emerald-400 text-xs font-bold border border-emerald-500/20">
                                        ENCRYPTED
                                    </div>
                                </div>

                                <div className="space-y-4 z-10">
                                    <div className="h-2 w-2/3 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 w-[80%] animate-[shimmer_2s_infinite]"></div>
                                    </div>
                                    <div className="h-2 w-1/2 bg-slate-800 rounded-full"></div>
                                    <div className="h-2 w-3/4 bg-slate-800 rounded-full"></div>
                                </div>

                                <div className="mt-8 pt-8 border-t border-slate-800 z-10 flex justify-between items-center text-slate-400 text-sm">
                                    <span>256-bit AES Encryption</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                        Active
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Data Collection Grid */}
            <section className="py-24 bg-slate-900/30">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">What We Collect</h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            Transparency is key. Here's exactly what data we process to provide our services.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {dataCollection.map((item, index) => (
                            <div key={index} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/30 transition-all hover:-translate-y-1 group">
                                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <item.icon className={`w-6 h-6 ${item.color}`} />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Data Usage & Rights Split */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-16 overflow-hidden relative">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.9),rgba(15,23,42,0.9)),url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                        <div className="grid lg:grid-cols-2 gap-16 relative z-10">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-8">How We Use Your Data</h2>
                                <ul className="space-y-6">
                                    {[
                                        "To provide and maintain the Service",
                                        "To notify you about changes to our Service",
                                        "To provide customer support",
                                        "To gather analysis to improve the Service",
                                        "To detect, prevent and address technical issues"
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-4">
                                            <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Check className="w-4 h-4" />
                                            </div>
                                            <span className="text-slate-300 text-lg">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-slate-950 rounded-3xl p-8 border border-white/5">
                                <h2 className="text-2xl font-bold text-white mb-6">Your Rights</h2>
                                <p className="text-slate-400 mb-8">
                                    AuditAI undertakes to respect the confidentiality of your Personal Data and to guarantee you can exercise your rights.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left hover:bg-slate-800 transition-colors">
                                        <span className="block text-white font-bold mb-1">Access</span>
                                        <span className="text-xs text-slate-500">Request copies of your data</span>
                                    </button>
                                    <button className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left hover:bg-slate-800 transition-colors">
                                        <span className="block text-white font-bold mb-1">Correction</span>
                                        <span className="text-xs text-slate-500">Update inaccurate data</span>
                                    </button>
                                    <button className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left hover:bg-slate-800 transition-colors">
                                        <span className="block text-white font-bold mb-1">Deletion</span>
                                        <span className="text-xs text-slate-500">Request to be forgotten</span>
                                    </button>
                                    <button className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left hover:bg-slate-800 transition-colors">
                                        <span className="block text-white font-bold mb-1">Portability</span>
                                        <span className="text-xs text-slate-500">Transfer data elsewhere</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 pb-24 text-center">
                <p className="text-slate-500 text-sm">
                    Questions? Email us at <a href="mailto:privacy@auditai.com" className="text-blue-400 hover:underline">privacy@auditai.com</a>
                </p>
            </div>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
