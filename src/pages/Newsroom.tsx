import { useEffect, useState } from 'react';
import Navigation from '@/components/landing/Navigation';
import Footer from '@/components/landing/Footer';
import NewsArticleModal, { NewsArticle } from '@/components/newsroom/NewsArticleModal';
import { Calendar, ArrowRight, TrendingUp, Award, Newspaper, ExternalLink, Search, Filter } from 'lucide-react';

const Newsroom = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

    const categories = ['All', 'Press Releases', 'Product Updates', 'Company News', 'Awards', 'Media Coverage'];

    const newsItems = [
        {
            id: 1,
            category: 'Press Releases',
            title: 'AuditAI Raises $150M Series B to Revolutionize Web Intelligence',
            excerpt: 'Leading investors back our mission to make AI-powered web auditing accessible to businesses of all sizes.',
            date: '2026-01-10',
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
            date: '2026-01-05',
            image: '/images/news/global.png',
            featured: true,
            readTime: '3 min read',
        },
        {
            id: 3,
            category: 'Product Updates',
            title: 'Introducing AI-Powered Competitor Analysis',
            excerpt: 'New feature allows businesses to automatically track and analyze competitor strategies in real-time.',
            date: '2025-12-28',
            image: '/images/news/product.png',
            featured: false,
            readTime: '4 min read',
        },
        {
            id: 4,
            category: 'Company News',
            title: 'AuditAI Expands to European Market',
            excerpt: 'Opening new offices in London and Berlin to serve our growing international customer base.',
            date: '2025-12-20',
            image: '/images/news/global.png',
            featured: false,
            readTime: '3 min read',
        },
        {
            id: 5,
            category: 'Media Coverage',
            title: 'Featured in Forbes: The Future of Web Analytics',
            excerpt: 'How AuditAI is transforming the way enterprises approach website optimization and SEO.',
            date: '2025-12-15',
            image: '/images/news/product.png',
            featured: false,
            readTime: '6 min read',
        },
        {
            id: 6,
            category: 'Product Updates',
            title: 'New Dashboard UI with Advanced Visualizations',
            excerpt: 'Completely redesigned interface with real-time analytics and customizable widgets.',
            date: '2025-12-10',
            image: '/images/news/product.png',
            featured: false,
            readTime: '4 min read',
        },
        {
            id: 7,
            category: 'Press Releases',
            title: 'Strategic Partnership with Google Cloud',
            excerpt: 'Collaboration to bring enterprise-grade AI capabilities to businesses worldwide.',
            date: '2025-12-01',
            image: '/images/news/funding.png',
            featured: false,
            readTime: '5 min read',
        },
        {
            id: 8,
            category: 'Awards',
            title: 'Winner of Best Enterprise SaaS Solution 2025',
            excerpt: 'Recognized at the SaaS Awards for exceptional product innovation and customer satisfaction.',
            date: '2025-11-25',
            image: '/images/news/global.png',
            featured: false,
            readTime: '3 min read',
        },
    ];

    const stats = [
        { number: '500K+', label: 'Websites Audited', icon: TrendingUp },
        { number: '50+', label: 'Countries Served', icon: Award },
        { number: '99.9%', label: 'Uptime', icon: Newspaper },
    ];

    const filteredNews = selectedCategory === 'All'
        ? newsItems
        : newsItems.filter(item => item.category === selectedCategory);

    const featuredNews = newsItems.filter(item => item.featured);
    const regularNews = filteredNews.filter(item => !item.featured);

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            {/* Hero Section */}
            <section
                className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-navy via-blue-900 to-navy"
                style={{ backgroundSize: '400% 400%', animation: 'gradient-xy 15s ease infinite' }}
            >
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-75"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 animate-fade-in">
                            <Newspaper className="w-4 h-4 text-white" />
                            <span className="text-white text-sm font-medium">Latest Updates</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
                            Newsroom
                        </h1>

                        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto animate-fade-in-up delay-100">
                            Stay updated with the latest news, announcements, and insights from AuditAI.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white border-b">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 mb-4">
                                    <stat.icon className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
                                </div>
                                <div className="text-4xl md:text-5xl font-bold text-navy mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-slate-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured News */}
            {featuredNews.length > 0 && (
                <section className="py-20 bg-gradient-to-b from-white to-slate-50">
                    <div className="container mx-auto px-6">
                        <div className="flex items-center gap-3 mb-12">
                            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                            <h2 className="text-3xl md:text-4xl font-bold text-navy">Featured Stories</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {featuredNews.map((item) => (
                                <div
                                    key={item.id}
                                    onMouseEnter={() => setHoveredCard(item.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    className="corporate-card rounded-2xl overflow-hidden group cursor-pointer"
                                >
                                    <div className="relative h-64 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent"></div>
                                        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-navy">
                                            {item.category}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                            </span>
                                            <span>•</span>
                                            <span>{item.readTime}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-navy mb-3 group-hover:text-blue-600 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-600 mb-4 line-clamp-2">
                                            {item.excerpt}
                                        </p>
                                        <button
                                            onClick={() => setSelectedArticle(item)}
                                            className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all"
                                        >
                                            Read More
                                            <ArrowRight className={`w-5 h-5 transition-transform ${hoveredCard === item.id ? 'translate-x-1' : ''}`} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* All News Section */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
                        <div className="flex items-center gap-3">
                            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                            <h2 className="text-3xl md:text-4xl font-bold text-navy">All News</h2>
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center gap-3 overflow-x-auto pb-2">
                            <Filter className="w-5 h-5 text-slate-500 flex-shrink-0" />
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${selectedCategory === category
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {regularNews.map((item) => (
                            <div
                                key={item.id}
                                onMouseEnter={() => setHoveredCard(item.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                className="corporate-card rounded-2xl overflow-hidden group cursor-pointer"
                            >
                                <div className="relative h-48 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent"></div>
                                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-navy">
                                        {item.category}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                        <span>•</span>
                                        <span>{item.readTime}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                                        {item.excerpt}
                                    </p>
                                    <button
                                        onClick={() => setSelectedArticle(item)}
                                        className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all"
                                    >
                                        Read Article
                                        <ArrowRight className={`w-4 h-4 transition-transform ${hoveredCard === item.id ? 'translate-x-1' : ''}`} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredNews.length === 0 && (
                        <div className="text-center py-20">
                            <Newspaper className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <p className="text-xl text-slate-500 mb-4">No news found in this category.</p>
                            <button
                                onClick={() => setSelectedCategory('All')}
                                className="text-blue-600 font-semibold hover:underline"
                            >
                                View all news
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Media Inquiries CTA */}
            <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-75"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Media Inquiries
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            For press inquiries, interview requests, or media kits, please contact our PR team.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="mailto:press@auditai.com"
                                className="px-8 py-4 bg-white text-navy font-bold rounded-xl hover:bg-slate-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105 inline-flex items-center justify-center gap-2"
                            >
                                <ExternalLink className="w-5 h-5" />
                                Contact Press Team
                            </a>
                            <a
                                href="#"
                                className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/20 backdrop-blur-sm inline-flex items-center justify-center gap-2"
                            >
                                Download Media Kit
                                <ArrowRight className="w-5 h-5" />
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
        </div >
    );
};

export default Newsroom;
