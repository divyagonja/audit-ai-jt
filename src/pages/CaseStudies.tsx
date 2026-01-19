import { useEffect, useState } from 'react';
import Navigation from '@/components/landing/Navigation';
import Footer from '@/components/landing/Footer';
import { TrendingUp, ShieldCheck, Globe, ArrowUpRight, Users, BarChart3, ChevronRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const CaseStudies = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Case Studies - AuditAI";
    }, []);

    const studies = [
        {
            id: 1,
            client: "FinTech Global",
            title: "Scaling Organic Traffic by 400% in Highly Regulated Markets",
            metric: "+400%",
            metricLabel: "Organic Growth",
            tags: ["Fintech", "Enterprise SEO", "Migration"],
            image: "/images/webinars/analytics.png",
            description: "How a leading crypto exchange navigated YMYL algorithms and quadrupled their non-branded search visibility in 6 months using AuditAI's semantic analysis.",
            logo: "FG"
        },
        {
            id: 2,
            client: "ShopNova",
            title: "Recovering $2M/Year in Revenue from Technical Debt",
            metric: "$2M+",
            metricLabel: "Revenue Recovered",
            tags: ["E-commerce", "Technical Audit", "Core Web Vitals"],
            image: "/images/webinars/seo.png",
            description: "Discover how we identified 15,000+ orphaned product pages and optimized render-blocking JS to boost mobile conversion rates by 25%.",
            logo: "Sn"
        },
        {
            id: 3,
            client: "CloudScale",
            title: "Automating Content Governance for 50k+ Pages",
            metric: "-60%",
            metricLabel: "Content Decay",
            tags: ["SaaS", "Content Strategy", "Automation"],
            image: "/images/webinars/tech.png",
            description: "Implementing an automated content freshness loop that reduced operational costs while maintaining peak rankings for competitive keywords.",
            logo: "Cs"
        }
    ];

    const stats = [
        { label: "Client Audits Run", value: "10k+" },
        { label: "Issues Resolved", value: "2.5M" },
        { label: "Avg. ROI Increase", value: "185%" },
        { label: "Global Brands", value: "500+" }
    ];

    return (
        <div className="min-h-screen bg-navy font-sans text-white selection:bg-blue-500/30">
            <Navigation />

            {/* Hero Section */}
            <section
                className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950"
                style={{ backgroundSize: '400% 400%', animation: 'gradient-xy 15s ease infinite' }}
            >
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -mr-32 -mt-32 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -ml-32 -mb-32 pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1 animate-fade-in-up">
                            <h4 className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-4">
                                Proven Results
                            </h4>
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                                Data-Driven <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Success Stories</span>
                            </h1>
                            <p className="text-xl text-slate-300 mb-8 max-w-xl leading-relaxed">
                                See how world-class enterprises use AuditAI to solve complex technical challenges and unlock massive growth.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button className="px-8 py-4 bg-white text-navy font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg flex items-center gap-2 group">
                                    Start Your Success Story
                                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                                <button className="px-8 py-4 border border-white/20 hover:bg-white/10 text-white font-bold rounded-xl transition-all backdrop-blur-sm">
                                    View All Metrics
                                </button>
                            </div>
                        </div>

                        {/* Hero Stats Grid */}
                        <div className="flex-1 w-full">
                            <div className="grid grid-cols-2 gap-4">
                                {stats.map((stat, i) => (
                                    <div key={i} className={`p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-blue-500/30 transition-colors animate-scale-in delay-${i * 100}`}>
                                        <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-slate-400 font-medium">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Case Studies (Alternating Layout) */}
            <section className="py-20 bg-slate-900/50">
                <div className="container mx-auto px-6 space-y-32">
                    {studies.map((study, index) => (
                        <div key={study.id} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20 group`}>
                            {/* Image Side */}
                            <div className="flex-1 w-full">
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-video group-hover:scale-[1.02] transition-transform duration-700">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-navy/80 to-transparent z-10" />
                                    <img
                                        src={study.image}
                                        alt={study.title}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Overlay Metric Badge */}
                                    <div className="absolute bottom-6 left-6 z-20 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-xl flex flex-col">
                                        <span className="text-3xl font-bold text-white">{study.metric}</span>
                                        <span className="text-xs text-blue-200 uppercase tracking-wider font-semibold">{study.metricLabel}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="flex-1 w-full space-y-6">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-blue-900/50">
                                        {study.logo}
                                    </div>
                                    <span className="text-xl font-semibold text-white">{study.client}</span>
                                </div>

                                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight group-hover:text-blue-400 transition-colors cursor-pointer">
                                    {study.title}
                                </h2>

                                <p className="text-lg text-slate-400 leading-relaxed">
                                    {study.description}
                                </p>

                                <div className="flex flex-wrap gap-2 pt-2">
                                    {study.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-slate-300">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="pt-4">
                                    <button className="flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors hover:gap-3 group/link">
                                        Read Full Case Study
                                        <ChevronRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonial / Trust Section */}
            <section className="py-24 bg-white text-navy">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-16">Trusted by High-Growth Teams</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-xl transition-shadow text-left">
                                <div className="flex text-yellow-400 mb-4">
                                    {[...Array(5)].map((_, j) => (
                                        <TrendingUp key={j} className="w-4 h-4 fill-current" /> // Using TrendingUp as abstract star
                                    ))}
                                </div>
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    "AuditAI didn't just find errors; it found money. We fixed our crawl budget issues and saw immediate revenue impact within 48 hours."
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                                    <div>
                                        <div className="font-bold text-navy text-sm">Alex Johnson</div>
                                        <div className="text-slate-400 text-xs">VP of Growth, TechExample</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Dark CTA */}
            <section className="py-24 bg-navy border-t border-white/5">
                <div className="container mx-auto px-6">
                    <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to write your own success story?</h2>
                            <p className="text-xl text-blue-100 mb-10">
                                Join 500+ enterprises using AuditAI to dominate their search visibility.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <button className="px-10 py-5 bg-white text-navy font-bold rounded-xl hover:bg-blue-50 transition-all shadow-xl flex items-center justify-center gap-2">
                                    Request Enterprise Demo
                                </button>
                                <button className="px-10 py-5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all shadow-xl flex items-center justify-center gap-2">
                                    Start Free Audit
                                </button>
                            </div>
                            <p className="mt-8 text-sm text-blue-200 opacity-60 flex items-center justify-center gap-2">
                                <Check className="w-4 h-4" /> No credit card required for audit
                                <span className="mx-2">•</span>
                                <Check className="w-4 h-4" /> SOC 2 Type II Certified
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default CaseStudies;
