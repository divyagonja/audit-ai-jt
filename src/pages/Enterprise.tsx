import { useEffect } from 'react';
import Navigation from '@/components/landing/Navigation';
import Footer from '@/components/landing/Footer';
import { Building2, ShieldCheck, Zap, Users, BarChart3, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Enterprise = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const features = [
        {
            title: "Unlimited Scale",
            description: "Crawl millions of pages without limits. Our infrastructure scales automatically to handle your largest properties.",
            icon: BarChart3
        },
        {
            title: "Dedicated Success Manager",
            description: "Get a dedicated SEO expert who understands your business goals and helps you maximize platform value.",
            icon: Users
        },
        {
            title: "Custom Security Reviews",
            description: "We work with your InfoSec team to pass custom security questionnaires and penetration tests.",
            icon: ShieldCheck
        },
        {
            title: "API Access & Webhooks",
            description: "Integrate AuditAI directly into your CI/CD pipelines and internal dashboards with our full API.",
            icon: Zap
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-slate-300 selection:bg-indigo-500/30">
            <Navigation />

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black" />

                {/* Abstract Background */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 space-y-8 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-sm mx-auto lg:mx-0">
                                <Building2 className="w-4 h-4 text-indigo-400" />
                                <span className="text-indigo-400 text-sm font-semibold tracking-wide uppercase">AuditAI Enterprise</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                                Scale your SEO <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Without Limits</span>
                            </h1>

                            <p className="text-xl text-slate-400 max-w-xl leading-relaxed mx-auto lg:mx-0">
                                The platform of choice for Fortune 500 companies. Get custom limits, dedicated support, and enterprise-grade security.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Button className="h-14 px-8 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-lg shadow-lg shadow-indigo-900/20 transition-all hover:scale-105">
                                    Book a Demo
                                </Button>
                                <Button variant="outline" className="h-14 px-8 border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-white font-bold rounded-xl text-lg backdrop-blur-md">
                                    Contact Sales
                                </Button>
                            </div>
                        </div>

                        {/* Hero Graphic */}
                        <div className="flex-1 w-full max-w-xl">
                            <div className="relative rounded-3xl bg-slate-900 border border-slate-800 p-2 shadow-2xl">
                                <div className="absolute inset-0 bg-indigo-500/5 rounded-3xl blur-xl" />
                                <div className="relative bg-slate-950 rounded-2xl overflow-hidden border border-slate-800">
                                    <div className="flex items-center gap-2 p-4 border-b border-slate-800 bg-slate-900/50">
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                                            <div className="w-3 h-3 rounded-full bg-green-500/20" />
                                        </div>
                                        <div className="flex-1 bg-slate-800/50 h-6 rounded-md mx-4" />
                                    </div>
                                    <div className="p-8 space-y-6">
                                        {/* Mock Data */}
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <div className="text-sm text-slate-500 mb-1">Total Pages Crawled</div>
                                                <div className="text-4xl font-bold text-white">5,240,192</div>
                                            </div>
                                            <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-medium">+12.5%</div>
                                        </div>
                                        <div className="h-32 bg-indigo-500/10 rounded-xl border border-indigo-500/20 relative overflow-hidden">
                                            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-indigo-500/20 to-transparent" />
                                            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-4 pb-4 h-full gap-2">
                                                {[40, 65, 45, 80, 55, 90, 70, 85].map((h, i) => (
                                                    <div key={i} style={{ height: `${h}%` }} className="w-full bg-indigo-500/40 rounded-t-sm" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Logo Wall */}
            <section className="py-12 border-y border-white/5 bg-white/[0.02]">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">Trusted by global engineering teams</p>
                    <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {['Acme Corp', 'GlobalTech', 'Nebula Inc', 'Quantum Systems', 'Vertex'].map((brand, i) => (
                            <span key={i} className="text-xl font-bold text-white">{brand}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {features.map((feature, index) => (
                            <div key={index} className="flex gap-6 p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/30 transition-colors group">
                                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                                    <feature.icon className="w-7 h-7 text-indigo-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                    <p className="text-slate-400 leading-relaxed text-lg">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison / Capabilities */}
            <section className="py-24 bg-slate-900 border-t border-slate-800">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto bg-slate-950 rounded-[2.5rem] border border-slate-800 overflow-hidden shadow-2xl">
                        <div className="p-12 text-center border-b border-slate-800 bg-indigo-900/10">
                            <h2 className="text-3xl font-bold text-white mb-4">Why upgrade to Enterprise?</h2>
                            <p className="text-slate-400">Unlock capabilities designed for complex organizations.</p>
                        </div>
                        <div className="p-8 md:p-12 grid gap-6">
                            {[
                                "Single Sign-On (SSO) & SAML 2.0",
                                "Unlimited Crawl Budget & Storage",
                                "Priority 24/7 Phone & Email Support",
                                "Custom Data Retention Policies",
                                "White-label Reporting & Dashboard",
                                "Dedicated IP Addresses"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 text-lg text-slate-300">
                                    <CheckCircle2 className="w-6 h-6 text-indigo-500 flex-shrink-0" />
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div className="p-8 bg-slate-900 border-t border-slate-800 text-center">
                            <Button className="w-full md:w-auto px-12 py-6 bg-white text-slate-950 hover:bg-slate-200 font-bold rounded-xl text-lg flex items-center justify-center gap-2">
                                Contact Sales Team
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Enterprise;
