import { useEffect, useState } from 'react';
import Navigation from '@/components/landing/Navigation';
import Footer from '@/components/landing/Footer';
import { TrendingUp, ShieldCheck, Globe, ArrowUpRight, ChevronRight, Check, Zap, Target, FileText } from 'lucide-react';
import CaseStudyModal, { CaseStudy } from '../components/casestudies/CaseStudyModal';

const CaseStudies = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Case Studies - AuditAI";
    }, []);

    const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleReadStudy = (study: CaseStudy) => {
        setSelectedStudy(study);
        setIsModalOpen(true);
    };

    const studies: CaseStudy[] = [
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

    const testimonials = [
        {
            name: "Alex Johnson",
            role: "VP of Growth, FinTech Global",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
            quote: "AuditAI didn't just find errors; it found money. We fixed our crawl budget issues and saw immediate revenue impact within 48 hours."
        },
        {
            name: "Sarah Chen",
            role: "SEO Director, ShopNova",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
            quote: "The semantic analysis capabilities are years ahead of the competition. It transformed how we approach content governance at scale."
        },
        {
            name: "Marcus Thorne",
            role: "Technical Lead, CloudScale",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop",
            quote: "Integrating AuditAI into our CI/CD pipeline reduced technical debt overhead by 65%. It's now central to our infrastructure."
        }
    ];

    const stats = [
        { label: "Client Audits Run", value: "10k+" },
        { label: "Issues Resolved", value: "2.5M" },
        { label: "Avg. ROI Increase", value: "185%" },
        { label: "Global Brands", value: "500+" }
    ];

    return (
        <div className="min-h-screen bg-[#020408] font-sans text-white selection:bg-indigo-500/30">
            <Navigation />

            {/* Hero Section */}
            <section className="relative pt-40 pb-32 overflow-hidden bg-slate-950">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px] -mr-64 -mt-64 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] -ml-64 -mb-64 pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="flex-1 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-8">
                                <Zap className="w-3.5 h-3.5" />
                                <span>High-Performance Proof</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
                                Empirical <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400">Yield.</span>
                            </h1>
                            <p className="text-xl text-slate-400 mb-10 leading-relaxed font-medium">
                                Technical audits that don't just find errors—they find revenue. See how the world's leading brands leverage AuditAI for competitive alpha.
                            </p>
                            <div className="flex flex-wrap gap-6">
                                <button className="px-10 py-5 bg-white text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-2xl hover:scale-105 active:scale-95">
                                    Start Free Audit
                                </button>
                                <button className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-white hover:text-black transition-all backdrop-blur-md">
                                    Enterprise Deck
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 w-full max-w-xl">
                            <div className="grid grid-cols-2 gap-6">
                                {stats.map((stat, i) => (
                                    <div key={i} className="p-8 bg-white/[0.02] backdrop-blur-2xl rounded-[32px] border border-white/5 hover:border-indigo-500/30 transition-all group">
                                        <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter group-hover:text-indigo-400 transition-colors">
                                            {stat.value}
                                        </div>
                                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Impact Grid */}
            <section className="py-32 bg-[#020408]">
                <div className="container mx-auto px-6 space-y-40">
                    {studies.map((study, index) => (
                        <div key={study.id} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-20`}>
                            {/* Visual Asset Side */}
                            <div className="flex-1 w-full">
                                <div className="relative group perspective-1000">
                                    <div className="relative rounded-[40px] overflow-hidden border border-white/10 aspect-[16/10] shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent z-10" />
                                        <img src={study.image} alt={study.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />

                                        {/* Impact Badge */}
                                        <div className="absolute bottom-10 left-10 z-20 p-6 rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col items-start gap-1">
                                            <span className="text-4xl font-black text-white leading-none tracking-tighter">{study.metric}</span>
                                            <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">{study.metricLabel}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Narrative Side */}
                            <div className="flex-1 w-full max-w-2xl">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-black text-indigo-400 text-xl shadow-inner">
                                        {study.logo}
                                    </div>
                                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">{study.client}</span>
                                </div>

                                <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tighter mb-8 hover:text-indigo-400 cursor-pointer transition-colors" onClick={() => handleReadStudy(study)}>
                                    {study.title}
                                </h2>

                                <p className="text-xl text-slate-400 leading-relaxed font-medium mb-10">
                                    {study.description}
                                </p>

                                <div className="flex flex-wrap gap-3 mb-12">
                                    {study.tags.map(tag => (
                                        <span key={tag} className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handleReadStudy(study)}
                                    className="inline-flex items-center gap-3 text-white font-black text-xs uppercase tracking-[0.2em] group/btn"
                                >
                                    <span>Read Analytical Report</span>
                                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover/btn:bg-indigo-600 group-hover/btn:border-indigo-400 transition-all group-hover/btn:translate-x-2">
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Verification Section */}
            <section className="py-32 border-t border-white/5 bg-[#05070a]">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-20">Consensus Verification</h2>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, i) => (
                            <div key={i} className="p-12 rounded-[40px] bg-white/[0.01] border border-white/5 text-left group hover:bg-white/[0.03] transition-all">
                                <ShieldCheck className="w-8 h-8 text-indigo-500/40 mb-8 group-hover:text-indigo-500 transition-colors" />
                                <p className="text-xl text-slate-300 font-medium leading-relaxed mb-10 italic">
                                    "{testimonial.quote}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/10 shadow-xl group-hover:border-indigo-500/30 transition-colors">
                                        <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="font-black text-white text-xs uppercase tracking-widest">{testimonial.name}</div>
                                        <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />

            <CaseStudyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                study={selectedStudy}
            />
        </div>
    );
};

export default CaseStudies;
