import { useEffect } from 'react';
import Navigation from '@/components/landing/Navigation';
import Footer from '@/components/landing/Footer';
import { ShieldCheck, Lock, Server, FileKey, Eye, Users, CheckCircle, FileText, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Security = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const features = [
        {
            title: "SOC 2 Type II Certified",
            description: "We undergo annual independent audits to ensure our controls meet the highest standards for security, availability, and confidentiality.",
            icon: ShieldCheck,
            color: "text-emerald-400"
        },
        {
            title: "End-to-End Encryption",
            description: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Your competitive intelligence remains strictly private.",
            icon: Lock,
            color: "text-blue-400"
        },
        {
            title: "Role-Based Access Control",
            description: "Granular permission settings ensure team members only access the data they need to do their jobs.",
            icon: Users,
            color: "text-indigo-400"
        },
        {
            title: "SSO & MFA",
            description: "Enterprise-grade authentication support including Okta, OneLogin, and Google Workspace integration.",
            icon: FileKey,
            color: "text-purple-400"
        },
        {
            title: "99.9% Uptime SLA",
            description: "Our distributed infrastructure ensures high availability and disaster recovery across multiple availability zones.",
            icon: Server,
            color: "text-rose-400"
        },
        {
            title: "Continuous Monitoring",
            description: "24/7 automated threat detection and vulnerability scanning to stay ahead of emerging risks.",
            icon: Eye,
            color: "text-amber-400"
        }
    ];

    const certifications = ["SOC 2 Type II", "ISO 27001", "GDPR Ready", "CCPA Compliant"];

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-white selection:bg-emerald-500/30">
            <Navigation />

            {/* Hero Section */}
            <section
                className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950/40 to-slate-950"
                style={{ backgroundSize: '400% 400%', animation: 'gradient-xy 15s ease infinite' }}
            >

                {/* Glowing Orbs */}
                <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8 animate-fade-in">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 text-sm font-semibold tracking-wide uppercase">Enterprise-Grade Protection</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight max-w-4xl mx-auto animate-fade-in-up">
                        Security is in our <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">DNA</span>
                    </h1>

                    <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100">
                        We built AuditAI with a security-first architecture to protect your most sensitive search data. Validated by world-class auditors.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-200">
                        <Button className="h-14 px-8 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-lg shadow-lg shadow-emerald-900/20 transition-all hover:scale-105">
                            Request Security Packet
                        </Button>
                        <Button variant="outline" className="h-14 px-8 border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-white font-bold rounded-xl text-lg backdrop-blur-md">
                            View Compliance
                        </Button>
                    </div>
                </div>
            </section>

            {/* Certifications Ribbon */}
            <section className="py-10 border-y border-slate-800/50 bg-slate-900/50 backdrop-blur-sm">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                        {certifications.map((cert) => (
                            <div key={cert} className="flex items-center gap-3 group cursor-default">
                                <ShieldCheck className="w-6 h-6 text-emerald-500 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all" />
                                <span className="font-bold text-lg text-slate-300 group-hover:text-white transition-colors">{cert}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid (Bento Style) */}
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-emerald-500/30 hover:bg-slate-800/60 transition-all duration-300 group"
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-slate-950 flex items-center justify-center mb-6 border border-slate-800 group-hover:border-slate-700 transition-colors shadow-xl`}>
                                    <feature.icon className={`w-7 h-7 ${feature.color}`} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Infrastructure Map Visualization (Abstract) */}
            <section className="py-24 bg-slate-900 border-t border-slate-800">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 space-y-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">
                                Global Data Residency
                            </h2>
                            <p className="text-lg text-slate-400">
                                We host data in secure, climate-controlled data centers worldwide. You choose where your data resides to meet local compliance requirements.
                            </p>
                            <ul className="space-y-4">
                                {["US East (N. Virginia)", "EU West (Dublin)", "Asia Pacific (Singapore)"].map(region => (
                                    <li key={region} className="flex items-center gap-3 text-slate-300">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                                        {region}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-1 w-full max-w-lg">
                            {/* Abstract Globe/Map UI */}
                            <div className="aspect-square rounded-full border border-slate-700 relative flex items-center justify-center bg-slate-950/50 shadow-2xl">
                                <div className="absolute inset-0 rounded-full border border-slate-800 animate-[spin_10s_linear_infinite]" />
                                <div className="absolute inset-8 rounded-full border border-slate-800/50 animate-[spin_15s_linear_infinite_reverse]" />
                                <Globe className="w-32 h-32 text-slate-700/50" />

                                {/* Nodes */}
                                <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,1)] animate-ping" />
                                <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,1)] animate-ping delay-700" />
                                <div className="absolute top-1/2 right-10 w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_12px_rgba(168,85,247,1)]" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Center CTA */}
            <section className="py-20 bg-emerald-950/30 border-t border-emerald-900/30">
                <div className="container mx-auto px-6 text-center">
                    <ShieldCheck className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-white mb-6">Transparency is our policy.</h2>
                    <p className="text-xl text-emerald-100/70 mb-10 max-w-2xl mx-auto">
                        Download our full security whitepaper or request access to our automated compliance reports (SOC 2, ISO 27001).
                    </p>
                    <button className="px-10 py-4 bg-white text-emerald-950 font-bold rounded-xl hover:bg-emerald-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2 mx-auto">
                        <FileText className="w-5 h-5" />
                        Download Security Whitepaper
                    </button>
                    <p className="mt-6 text-sm text-slate-500">Last updated: January 2026</p>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Security;
