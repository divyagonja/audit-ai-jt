import { useEffect, useState } from 'react';
import Navigation from '@/components/landing/Navigation';
import Footer from '@/components/landing/Footer';
import { ArrowUpRight, Calendar, User, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import BlogPostModal from '@/components/blog/BlogPostModal';

interface Post {
    title: string;
    excerpt: string;
    image: string;
    category: string;
    date: string;
    author?: string;
    readTime?: string;
    slug: string;
}

const Blog = () => {
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Blog - AuditAI";
    }, []);

    const [activeCategory, setActiveCategory] = useState("All");

    const featuredPost: Post = {
        title: "The Future of Technical SEO in an AI-First World",
        excerpt: "As search engines evolve into answer engines, technical foundations matter more than ever. Here's how to prepare your infrastructure for the next decade of search.",
        image: "/images/news/global.png",
        category: "Industry Trends",
        author: "Sarah Connor",
        date: "Jan 12, 2026",
        readTime: "8 min read",
        slug: "#future-of-seo"
    };

    const allPosts: Post[] = [
        {
            title: "Understanding Core Web Vitals: Interaction to Next Paint (INP)",
            excerpt: "Google's new metric is shaking up the SEO world. Learn what INP measures and how to optimize for it.",
            category: "Technical Guide",
            date: "Jan 10, 2026",
            image: "/images/webinars/analytics.png",
            slug: "#inp-guide"
        },
        {
            title: "Scaling JavaScript SEO for Enterprise Applications",
            excerpt: "How to ensure your React, Vue, or Angular apps are fully indexable by search bots.",
            category: "Engineering",
            date: "Jan 05, 2026",
            image: "/images/webinars/tech.png",
            slug: "#js-seo"
        },
        {
            title: "Case Study: Migrating 10M Pages without Losing Traffic",
            excerpt: "A deep dive into the architecture and strategy behind a successful massive-scale migration.",
            category: "Case Studies",
            date: "Dec 28, 2025",
            image: "/images/webinars/seo.png",
            slug: "#migration-case-study"
        },
        {
            title: "The Definitive Guide to Log File Analysis",
            excerpt: "Unlock hidden insights by analyzing server logs. See exactly how Googlebot crawls your site.",
            category: "Tutorials",
            date: "Dec 15, 2025",
            image: "/images/news/product.png",
            slug: "#log-analysis"
        }
    ];

    const categories = ["All", "Technical Guide", "Industry Trends", "Engineering", "Tutorials", "Case Studies"];

    const handleOpenPost = (post: Post) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    const filteredPosts = activeCategory === "All"
        ? allPosts
        : allPosts.filter(post => post.category === activeCategory);

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-slate-300 selection:bg-purple-500/30">
            <Navigation />
            <BlogPostModal
                post={selectedPost}
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
            />

            {/* Header */}
            <div className="pt-32 pb-12 container mx-auto px-6 text-center">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">The AuditAI Blog</h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto animate-fade-in-up delay-100">
                    Insights, tutorials, and engineering deep dives for modern SEOs.
                </p>
            </div>

            {/* Category Nav */}
            <div className="border-b border-white/5 mb-12 overflow-x-auto">
                <div className="container mx-auto px-6">
                    <div className="flex items-center gap-8 min-w-max pb-4">
                        {categories.map((cat, i) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`text-sm font-semibold transition-all duration-300 ${activeCategory === cat
                                    ? 'text-white border-b-2 border-purple-500 pb-4 -mb-4.5 scale-105'
                                    : 'text-slate-500 hover:text-white hover:scale-105'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 pb-24">
                {/* Featured Post */}
                <div
                    onClick={() => handleOpenPost(featuredPost)}
                    className="block mb-20 group relative cursor-pointer"
                >
                    <div className="relative rounded-3xl overflow-hidden aspect-[21/9] mb-8 border border-white/10 shadow-2xl transition-transform duration-700 group-hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
                        <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-20 mix-blend-overlay" />

                        <img
                            src={featuredPost.image}
                            alt={featuredPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute bottom-0 left-0 p-8 md:p-12 z-30 max-w-4xl">
                            <div className="flex items-center gap-4 text-purple-400 mb-4 font-bold tracking-wide uppercase text-sm">
                                <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">{featuredPost.category}</span>
                                <span>•</span>
                                <span>{featuredPost.readTime}</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight group-hover:text-purple-300 transition-colors">
                                {featuredPost.title}
                            </h2>
                            <p className="text-lg text-slate-300 line-clamp-2 md:line-clamp-none">
                                {featuredPost.excerpt}
                            </p>
                        </div>
                    </div>
                </div >

                {/* Grid */}
                {filteredPosts.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-10">
                        {filteredPosts.map((post, index) => (
                            <div
                                onClick={() => handleOpenPost(post)}
                                key={index}
                                className="group cursor-pointer flex flex-col h-full bg-slate-900/20 rounded-3xl p-6 border border-white/5 hover:border-purple-500/30 hover:bg-slate-900/40 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="rounded-2xl overflow-hidden aspect-video mb-6 border border-white/5 relative">
                                    <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 transition-colors z-10" />
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4 z-20 bg-slate-950/80 backdrop-blur text-purple-300 text-xs font-bold px-3 py-1 rounded-full border border-purple-500/20">
                                        {post.category}
                                    </div>
                                </div>
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                                        <Calendar className="w-4 h-4" />
                                        {post.date}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors leading-tight">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-400 line-clamp-3 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                </div>
                                <div className="mt-6 flex items-center text-purple-400 font-bold text-sm gap-2 group-hover:gap-3 transition-all">
                                    Read Article <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center text-slate-500">
                        No articles found in this category.
                    </div>
                )}

                {/* Newsletter */}
                <div className="mt-24 p-12 rounded-[2.5rem] bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 text-center relative overflow-hidden">
                    <div className="absolute rounded-full bg-purple-500/20 w-96 h-96 blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-4">Stay ahead of the algorithm</h2>
                        <p className="text-slate-400 mb-8 text-lg">
                            Get the latest SEO insights and engineering updates delivered straight to your inbox. No spam, ever.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-4 justify-center" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your work email"
                                className="px-6 py-4 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500 w-full sm:w-80 transition-colors"
                            />
                            <button className="px-8 py-4 bg-white text-purple-950 font-bold rounded-xl hover:bg-purple-100 transition-colors shadow-xl">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Blog;
