import { useEffect, useState } from 'react';
import Navigation from '@/components/landing/Navigation';
import Footer from '@/components/landing/Footer';
import NewsArticleModal, { NewsArticle } from '@/components/newsroom/NewsArticleModal';
import { Calendar, ArrowRight, TrendingUp, Award, Newspaper, ExternalLink, Search, Filter, Zap, Clock, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Newsroom = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Newsroom - AuditAI";
    }, []);

    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

    const categories = ['All', 'Press Releases', 'Product Updates', 'Company News', 'Awards', 'Media Coverage'];

    const newsItems: NewsArticle[] = [
        {
            id: 1,
            category: 'Press Releases',
            title: 'AuditAI Raises $150M Series B to Revolutionize Web Intelligence',
            excerpt: 'Leading investors back our mission to make AI-powered web auditing accessible to businesses of all sizes.',
            date: 'Jan 10, 2026',
            image: '/images/news/funding.png',
            featured: true,
            readTime: '5 min read',
            content: `
                <p>We are thrilled to announce that AuditAI has successfully raised $150 million in Series B funding, led by Horizon Ventures with participation from existing investors.</p>
                <p>This significant milestone marks a new chapter in our journey to revolutionize web intelligence and SEO analytics for enterprises worldwide. The funding will accelerate our product development, expand our global footprint, and fuel our mission to democratize access to advanced web auditing tools.</p>
                <h3>Accelerating Innovation</h3>
                <p>With this fresh capital, we plan to double down on our R&D efforts. Our roadmap includes:</p>
                <ul>
                    <li><strong>Advanced AI Models:</strong> Enhancing our core auditing engine with next-generation machine learning capabilities for deeper insights.</li>
                    <li><strong>Real-time Competitive Intelligence:</strong> Launching new features that allow businesses to track market shifts as they happen.</li>
                    <li><strong>Enterprise Scalability:</strong> Strengthening our infrastructure to support the massive scale of data processing required by Fortune 500 companies.</li>
                </ul>
                <h3>Global Expansion</h3>
                <p>As part of our growth strategy, we are opening new regional headquarters in London and Singapore to better serve our growing international customer base. This expansion will enable us to provide localized support and tailored solutions to businesses across Europe and Asia-Pacific.</p>
                <p>"The trust our investors have placed in us is a testament to the hard work of our team and the incredible value we deliver to our customers," said Sarah Chen, CEO of AuditAI. "We are just getting started."</p>
            `
        },
        {
            id: 2,
            category: 'Awards',
            title: 'Named Best SEO Analytics Platform by TechCrunch',
            excerpt: 'AuditAI recognized for innovation in AI-driven website optimization and competitive intelligence.',
            date: 'Jan 05, 2026',
            image: '/images/news/global.png',
            featured: true,
            readTime: '3 min read',
        },
        {
            id: 3,
            category: 'Product Updates',
            title: 'Introducing AI-Powered Competitor Analysis',
            excerpt: 'New feature allows businesses to automatically track and analyze competitor strategies in real-time.',
            date: 'Dec 28, 2025',
            image: '/images/news/product.png',
            featured: false,
            readTime: '4 min read',
        },
        {
            id: 4,
            category: 'Company News',
            title: 'AuditAI Expands to European Market',
            excerpt: 'Opening new offices in London and Berlin to serve our growing international customer base.',
            date: 'Dec 20, 2025',
            image: '/images/news/global.png',
            featured: false,
            readTime: '3 min read',
        },
        {
            id: 5,
            category: 'Media Coverage',
            title: 'Featured in Forbes: The Future of Web Analytics',
            excerpt: 'How AuditAI is transforming the way enterprises approach website optimization and SEO.',
            date: 'Dec 15, 2025',
            image: '/images/news/product.png',
            featured: false,
            readTime: '6 min read',
        },
        {
            id: 6,
            category: 'Product Updates',
            title: 'New Dashboard UI with Advanced Visualizations',
            excerpt: 'Completely redesigned interface with real-time analytics and customizable widgets.',
            date: 'Dec 10, 2025',
            image: '/images/news/product.png',
            featured: false,
            readTime: '4 min read',
        }
    ];

    const stats = [
        { number: '1.2B', label: 'Pages Analyzed', icon: Zap },
        { number: '500+', label: 'Global Brands', icon: Award },
        { number: '99.9%', label: 'Uptime Reliability', icon: Newspaper },
    ];

    const filteredNews = selectedCategory === 'All'
        ? newsItems
        : newsItems.filter(item => item.category === selectedCategory);

    return (
        <div className="min-h-screen bg-[#020408] font-sans text-white selection:bg-indigo-500/30">
            <Navigation />

            {/* Premium Hero */}
            <section className="relative pt-40 pb-32 overflow-hidden bg-slate-950">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px] -mr-64 -mt-64 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] -ml-64 -mb-64 pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-8 animate-fade-in">
                        <Newspaper className="w-3.5 h-3.5" />
                        <span>Latest News & Updates</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] text-white">
                        Official <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400">Newsroom.</span>
                    </h1>

                    <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                        Stay updated with the latest stories from AuditAI, including funding news, product breakthroughs, and global expansion updates.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto pt-10 border-t border-white/5">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center group">
                                <div className="text-3xl font-black text-white group-hover:text-indigo-400 transition-colors">{stat.number}</div>
                                <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Filter Hub */}
            <section className="sticky top-[80px] z-50 py-6 bg-[#020408]/80 backdrop-blur-2xl border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="flex items-center gap-6 overflow-x-auto no-scrollbar justify-center">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2 rounded-full transition-all text-[10px] font-black uppercase tracking-widest whitespace-nowrap border ${selectedCategory === cat
                                        ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]'
                                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* News Grid */}
            <section className="py-24 bg-[#020408]">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredNews.map((item, i) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => setSelectedArticle(item)}
                                className={`group cursor-pointer rounded-[40px] overflow-hidden bg-[#05070a] border border-white/5 hover:border-indigo-500/30 transition-all duration-500 flex flex-col ${item.featured && i === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}
                            >
                                <div className={`relative overflow-hidden ${item.featured && i === 0 ? 'h-[400px]' : 'h-[240px]'}`}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/20 to-transparent z-10" />
                                    <img
                                        src={item.image}
                                        className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
                                        alt={item.title}
                                    />
                                    <div className="absolute top-6 left-6 z-20">
                                        <div className="bg-indigo-600/20 border border-indigo-500/30 px-3 py-1 rounded-lg backdrop-blur-md">
                                            <span className="text-[9px] font-black text-indigo-300 uppercase tracking-widest">{item.category}</span>
                                        </div>
                                    </div>
                                    {item.featured && (
                                        <div className="absolute top-6 right-6 z-20 px-3 py-1 rounded-lg bg-white text-black text-[9px] font-black uppercase tracking-widest">
                                            Featured Story
                                        </div>
                                    )}
                                </div>

                                <div className="p-10 flex flex-col justify-between flex-1">
                                    <div>
                                        <div className="flex items-center gap-4 text-slate-500 text-[9px] font-black uppercase tracking-widest mb-6">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {item.date}
                                            </div>
                                            <div className="w-1 h-1 rounded-full bg-indigo-500/30" />
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-3.5 h-3.5" />
                                                {item.readTime}
                                            </div>
                                        </div>
                                        <h3 className={`font-black text-white leading-tight mb-6 group-hover:text-indigo-400 transition-colors ${item.featured && i === 0 ? 'text-4xl' : 'text-2xl'}`}>
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-500 font-medium leading-relaxed mb-8">
                                            {item.excerpt}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3 text-white font-black text-[10px] uppercase tracking-widest pt-6 border-t border-white/5">
                                        <span>Read More</span>
                                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-400 transition-all group-hover:translate-x-1">
                                            <ChevronRight className="w-3.5 h-3.5" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filteredNews.length === 0 && (
                        <div className="text-center py-40">
                            <Newspaper className="w-20 h-20 text-white/10 mx-auto mb-8" />
                            <h3 className="text-3xl font-black text-white mb-4 italic">No News Found</h3>
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">There are no articles in this category currently.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Media Inquiries */}
            <section className="py-32 bg-[#05070a] border-t border-white/5 overflow-hidden">
                <div className="container mx-auto px-6 relative">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] -mr-64 -mt-32 pointer-events-none" />

                    <div className="max-w-4xl mx-auto rounded-[60px] p-16 md:p-24 border border-white/10 glass-premium text-center">
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
                            Media <br />
                            <span className="text-indigo-400">Inquiries.</span>
                        </h2>
                        <p className="text-xl text-slate-400 mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
                            For press inquiries, official media kits, or high-quality brand assets, please contact our media relations team.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <a
                                href="mailto:press@auditai.com"
                                className="h-16 px-10 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-2xl flex items-center justify-center gap-3 group"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Contact Press Team
                            </a>
                            <a
                                href="#"
                                className="h-16 px-10 bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-white hover:text-black transition-all backdrop-blur-md flex items-center justify-center"
                            >
                                Download Media Kit
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <NewsArticleModal
                isOpen={!!selectedArticle}
                onClose={() => setSelectedArticle(null)}
                article={selectedArticle}
            />

            <Footer />
        </div>
    );
};

export default Newsroom;
