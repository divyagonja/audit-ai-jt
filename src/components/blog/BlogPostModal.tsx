import { X, Calendar, Clock, Share2, Twitter, Linkedin, ChevronLeft, Bookmark, MessageSquare, ThumbsUp, Sparkles, Rocket, Globe, Zap, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';

interface BlogPost {
    title: string;
    excerpt: string;
    content?: string;
    image: string;
    category: string;
    author?: string;
    date: string;
    readTime?: string;
}

interface BlogPostModalProps {
    post: BlogPost | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const BlogPostModal = ({ post, open, onOpenChange }: BlogPostModalProps) => {
    const [readingProgress, setReadingProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // 3D Tilt & Mouse Glow
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-400, 400], [3, -3]), { damping: 25 });
    const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-3, 3]), { damping: 25 });
    const glowX = useSpring(mouseX, { damping: 30 });
    const glowY = useSpring(mouseY, { damping: 30 });

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
            setReadingProgress(0);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [open]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        const progress = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
        setReadingProgress(progress);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    };

    if (!post) return null;

    return (
        <AnimatePresence mode="wait">
            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 overflow-hidden bg-black/90 backdrop-blur-2xl">
                    {/* Background Ambient Glows */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/20 blur-[100px] rounded-full animate-pulse" />
                        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/20 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                    </div>

                    {/* Modal Container */}
                    <motion.div
                        ref={containerRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
                        style={{ rotateX, rotateY, perspective: '1200px' }}
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="glass-premium relative w-full max-w-6xl h-[85vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/10"
                    >
                        {/* Reading Progress Indicator */}
                        <motion.div
                            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 z-[70]"
                            style={{ width: `${readingProgress}%` }}
                        />

                        {/* Interactive Mouse Glow */}
                        <motion.div
                            style={{ x: glowX, y: glowY }}
                            className="glow-point translate-x-[-50%] translate-y-[-50%] opacity-30 z-0 pointer-events-none"
                        />

                        {/* Side Panel: Branding + Visuals */}
                        <div className="w-full md:w-[30%] mesh-gradient p-8 md:p-10 flex flex-col justify-between relative overflow-hidden border-r border-white/5 shrink-0">
                            {/* Orbital Background Elements */}
                            <div className="absolute inset-0 pointer-events-none opacity-40">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full"
                                />
                            </div>

                            <div className="relative z-10">
                                <motion.div
                                    initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                                    className="flex items-center gap-3 mb-10"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 backdrop-blur-xl">
                                        <Rocket className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-xl font-black text-white tracking-tight">Audit<span className="text-purple-400">AI</span></span>
                                </motion.div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full w-fit">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                        <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Protocol Insight</span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-white leading-[1.15]">
                                        Strategy <br />
                                        <span className="premium-gradient-text text-4xl">Excellence</span>
                                    </h2>
                                </div>
                            </div>

                            {/* Author Highlight Card */}
                            <div className="relative z-10 space-y-6 mt-8 md:mt-0">
                                <div className="bento-input-card p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-lg">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="relative">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg">
                                                {post.author ? post.author.charAt(0) : 'A'}
                                            </div>
                                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-slate-900" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-sm leading-tight">{post.author || 'AuditAI Team'}</h4>
                                            <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">{post.category}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-purple-500"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: i <= 2 ? '100%' : '40%' }}
                                                    transition={{ delay: 1, duration: 0.8 }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    {[
                                        { icon: Zap, text: "AI Ready" },
                                        { icon: Globe, text: "Global Index" },
                                        { icon: ShieldCheck, text: "Audit Sync" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-all">
                                            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                                <item.icon className="w-4 h-4 text-purple-400" />
                                            </div>
                                            <span className="text-slate-300 font-bold text-xs tracking-tight">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="flex-1 flex flex-col bg-[#05070a]/70 backdrop-blur-xl min-h-0 relative">
                            {/* Close Button UI */}
                            <button
                                onClick={() => onOpenChange(false)}
                                className="absolute top-6 right-6 z-[80] w-12 h-12 rounded-[20px] bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all duration-300 group shadow-2xl backdrop-blur-3xl"
                            >
                                <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                            </button>

                            {/* Header Image Section */}
                            <div className="h-[40%] w-full relative shrink-0 overflow-hidden">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8 }}
                                    className="w-full h-full"
                                >
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover grayscale-[0.2]"
                                    />
                                </motion.div>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/40 to-transparent" />
                                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#05070a] to-transparent" />

                                <div className="absolute bottom-8 left-8 right-8 z-20">
                                    <motion.div
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="flex gap-3 mb-4"
                                    >
                                        <div className="flex items-center gap-2 bg-purple-600/20 border border-purple-500/30 backdrop-blur-3xl px-3 py-1.5 rounded-xl">
                                            <Tag className="w-3.5 h-3.5 text-purple-400" />
                                            <span className="text-[10px] font-black text-purple-300 uppercase tracking-widest">{post.category}</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-black/40 border border-white/10 backdrop-blur-3xl px-3 py-1.5 rounded-xl">
                                            <Clock className="w-3.5 h-3.5 text-blue-400" />
                                            <span className="text-[10px] font-black text-white uppercase tracking-widest">{post.readTime}</span>
                                        </div>
                                    </motion.div>
                                    <motion.h1
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-3xl md:text-5xl font-bold text-white leading-[1.2]"
                                    >
                                        {post.title}
                                    </motion.h1>
                                </div>
                            </div>

                            {/* Scrollable Content Body */}
                            <div
                                ref={scrollContainerRef}
                                onScroll={handleScroll}
                                className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-16 pt-8"
                            >
                                <div className="max-w-3xl mx-auto">
                                    {/* Author & Actions Bar */}
                                    <div className="flex items-center justify-between mb-16 border-b border-white/5 pb-10">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 p-[1px]">
                                                    <div className="w-full h-full rounded-[15px] bg-slate-950 flex items-center justify-center text-xl font-black text-white">
                                                        {post.author ? post.author.charAt(0) : 'A'}
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-white font-bold text-lg mb-0.5 tracking-tight">{post.author || 'AuditAI Intelligence'}</p>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-slate-500 text-xs font-bold flex items-center gap-1.5">
                                                        <Calendar className="w-3.5 h-3.5 text-purple-500" /> {post.date}
                                                    </span>
                                                    <span className="w-1 h-1 rounded-full bg-white/20" />
                                                    <span className="text-purple-400 text-[9px] font-black uppercase tracking-widest">Strategic Analyst</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-2.5">
                                            {[Twitter, Linkedin, Share2, Bookmark].map((Icon, i) => (
                                                <button key={i} className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-95">
                                                    <Icon className="w-5 h-5" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="prose prose-invert prose-lg max-w-none 
                                        text-slate-400 leading-[1.8] font-medium
                                        prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                                        prose-h3:text-3xl prose-h3:mb-8 prose-h3:mt-16 prose-h3:leading-tight
                                        prose-p:mb-10
                                        prose-strong:text-white prose-strong:font-bold
                                        prose-blockquote:my-16 prose-blockquote:border-l-4 prose-blockquote:border-purple-600 prose-blockquote:pl-10 prose-blockquote:italic prose-blockquote:text-slate-200 prose-blockquote:bg-white/[0.02] prose-blockquote:py-10 prose-blockquote:rounded-r-2xl prose-blockquote:text-2xl prose-blockquote:font-bold
                                        prose-img:rounded-3xl prose-img:shadow-xl">

                                        {post.content ? (
                                            <div dangerouslySetInnerHTML={{ __html: post.content }} />
                                        ) : (
                                            <>
                                                <div className="mb-16 p-10 glass-premium rounded-[32px] border border-white/10 relative overflow-hidden">
                                                    <p className="text-2xl text-white font-bold leading-[1.4] mb-0 relative z-10">
                                                        {post.excerpt}
                                                    </p>
                                                </div>

                                                <p>
                                                    The optimization landscape is no longer about human-readable tags and keyword densities. We are entering an era of **high-fidelity machine indexing**, where the underlying vector representation of your data determines your visibility in the global intelligence graph.
                                                </p>

                                                <h3>The Semantic Shift</h3>
                                                <p>
                                                    Traditional SEO was built on a foundation of string matching. Modern search engines are now **reasoning engines**. They utilize generative embeddings to understand not just what your content says, but what it *implies*. This paradigm shift requires a fundamental restructuring of your technical stack from the database layer up.
                                                </p>

                                                <blockquote>
                                                    "Visibility is no longer bought or gamed; it is earned through architectural precision and semantic clarity."
                                                </blockquote>

                                                <div className="my-16 p-10 glass-premium rounded-[32px] border border-white/10 relative overflow-hidden beam-border">
                                                    <div className="flex items-center gap-4 mb-6 relative z-10">
                                                        <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                                                            <Sparkles className="w-6 h-6 text-purple-400" />
                                                        </div>
                                                        <h4 className="text-white font-bold text-xl uppercase tracking-tight">Strategic Protocol</h4>
                                                    </div>
                                                    <p className="text-slate-300 text-lg font-medium leading-relaxed mb-0 relative z-10">
                                                        Do not optimize for keywords. Optimize for **information density**. The future belongs to platforms that can present complex knowledge in a format that AI can perfectly synthesize.
                                                    </p>
                                                </div>

                                                <h3>Closing the Gap</h3>
                                                <p>
                                                    At AuditAI, we are developing the next generation of analysis tools that don't just find errors—they identify **strategic opportunities** within the knowledge graph. The future belongs to those who build for the models as much as they build for the humans.
                                                </p>
                                            </>
                                        )}
                                    </div>

                                    {/* Engagement Footer */}
                                    <div className="mt-24 pt-10 border-t border-white/5 flex flex-wrap items-center justify-between gap-8 pb-10">
                                        <div className="flex items-center gap-8">
                                            <button className="flex items-center gap-3 text-slate-400 hover:text-white transition-all group">
                                                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-purple-600 transition-all">
                                                    <ThumbsUp className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <span className="block font-bold text-lg text-white">4.2k</span>
                                                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Likes</span>
                                                </div>
                                            </button>
                                            <button className="flex items-center gap-3 text-slate-400 hover:text-white transition-all group">
                                                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-all">
                                                    <MessageSquare className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <span className="block font-bold text-lg text-white">246</span>
                                                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Comments</span>
                                                </div>
                                            </button>
                                        </div>

                                        <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-2xl hover:shadow-lg transition-all flex items-center gap-3 uppercase tracking-widest text-[9px]">
                                            Follow Feed <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Control */}
                            <motion.div
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[90] hidden md:flex items-center p-2 bg-slate-900/60 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-2xl"
                            >
                                <button onClick={() => onOpenChange(false)} className="px-6 py-3 text-slate-400 hover:text-white font-bold uppercase tracking-widest text-[9px] hover:bg-white/5 rounded-xl transition-all flex items-center gap-2">
                                    <ChevronLeft className="w-4 h-4" /> Exit Reader
                                </button>
                                <div className="w-[1px] h-8 bg-white/10 mx-2" />
                                <button className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-[9px] rounded-xl hover:bg-purple-600 hover:text-white transition-all shadow-xl flex items-center gap-3 group">
                                    <Rocket className="w-4 h-4" />
                                    Launch Protocol
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default BlogPostModal;
