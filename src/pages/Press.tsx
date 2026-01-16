import { useEffect } from 'react';
import Navigation from '@/components/landing/Navigation';
import Footer from '@/components/landing/Footer';
import { Download, Newspaper, Mail, ArrowRight, ExternalLink } from 'lucide-react';

const Press = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const mentions = [
        {
            outlet: "TechCrunch",
            title: "AuditAI raises Series A to fix the broken web",
            date: "Dec 10, 2025",
            logo: "TC"
        },
        {
            outlet: "Forbes",
            title: "The Next Generation of Technical SEO Tools",
            date: "Nov 24, 2025",
            logo: "F"
        },
        {
            outlet: "Search Engine Land",
            title: "How AuditAI is solving the Javascript Indexing Crisis",
            date: "Oct 15, 2025",
            logo: "SEL"
        },
        {
            outlet: "VentureBeat",
            title: "AI-First Crawlers: The Future of Site Audits",
            date: "Sep 02, 2025",
            logo: "VB"
        },
    ];

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-slate-300 selection:bg-pink-500/30">
            <Navigation />

            {/* Hero */}
            <section className="relative pt-32 pb-20 border-b border-white/5">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-8">
                            <Newspaper className="w-4 h-4 text-pink-500" />
                            <span className="text-pink-500 text-sm font-semibold tracking-wide uppercase">Newsroom</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tight leading-[0.9]">
                            IN THE <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">HEADLINES</span>
                        </h1>
                        <p className="text-2xl text-slate-400 max-w-2xl leading-relaxed">
                            Following our journey as we rebuild the foundation of the web.
                        </p>
                    </div>
                </div>
            </section>

            {/* Press Mentions */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col gap-8">
                        {mentions.map((item, index) => (
                            <div key={index} className="group relative">
                                <a href="#" className="block p-8 md:p-12 rounded-[2rem] bg-slate-900 border border-slate-800 hover:border-pink-500/40 hover:bg-slate-900/80 transition-all duration-300">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="font-mono text-sm text-pink-500 uppercase tracking-widest">{item.outlet}</div>
                                                <span className="w-1 h-1 rounded-full bg-slate-700" />
                                                <div className="text-slate-500 text-sm">{item.date}</div>
                                            </div>
                                            <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:text-pink-50 transition-colors">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <div className="flex-shrink-0 w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-slate-950 group-hover:scale-110 transition-transform">
                                            <ArrowRight className="w-6 h-6 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Media Kit & Contact */}
            <section className="py-24 bg-white text-slate-900">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">Media Resources</h2>
                            <p className="text-lg text-slate-600 mb-8 max-w-md">
                                Download official brand assets, logos, and executive headshots.
                            </p>

                            <div className="space-y-4">
                                <button className="w-full p-6 rounded-2xl bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-between group text-left">
                                    <div>
                                        <div className="font-bold text-lg mb-1">Brand Assets & Logos</div>
                                        <div className="text-sm text-slate-500">SVG, PNG, AI • 12.5 MB</div>
                                    </div>
                                    <Download className="w-6 h-6 text-slate-400 group-hover:text-slate-900 transition-colors" />
                                </button>
                                <button className="w-full p-6 rounded-2xl bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-between group text-left">
                                    <div>
                                        <div className="font-bold text-lg mb-1">Executive Team Photos</div>
                                        <div className="text-sm text-slate-500">High-Res JPG • 45 MB</div>
                                    </div>
                                    <Download className="w-6 h-6 text-slate-400 group-hover:text-slate-900 transition-colors" />
                                </button>
                            </div>
                        </div>

                        <div className="bg-slate-900 text-white rounded-[2.5rem] p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/20 rounded-full blur-[80px]" />
                            <h2 className="text-3xl font-bold mb-6 relative z-10">Press Contact</h2>
                            <p className="text-slate-300 mb-8 relative z-10">
                                For press inquiries, interview requests, or partnership opportunities, please reach out to our communications team.
                            </p>
                            <a href="mailto:press@auditai.com" className="inline-flex items-center gap-3 text-2xl font-bold text-white hover:text-pink-400 transition-colors relative z-10">
                                <Mail className="w-8 h-8" />
                                press@auditai.com
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Press;
