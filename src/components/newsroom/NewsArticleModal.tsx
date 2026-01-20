import { X, Calendar, Clock, Share2, Facebook, Twitter, Linkedin, Link as LinkIcon, Printer, Zap, Globe, ShieldCheck, Sparkles, Rocket, Newspaper } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';

export interface NewsArticle {
    id: number;
    category: string;
    title: string;
    excerpt: string;
    date: string;
    image: string;
    featured: boolean;
    readTime: string;
    content?: string;
}

interface NewsArticleModalProps {
    isOpen: boolean;
    onClose: () => void;
    article: NewsArticle | null;
}

const NewsArticleModal = ({ isOpen, onClose, article }: NewsArticleModalProps) => {
    const [copied, setCopied] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [readingProgress, setReadingProgress] = useState(0);

    // 3D Tilt & Mouse Glow Hooks - Always call these consistently
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Safety check for useTransform inputs
    const rotateX = useSpring(useTransform(mouseY, [-400, 400], [3, -3]), { damping: 25 });
    const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-3, 3]), { damping: 25 });
    const glowX = useSpring(mouseX, { damping: 30 });
    const glowY = useSpring(mouseY, { damping: 30 });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setReadingProgress(0);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        if (!target) return;
        const total = target.scrollHeight - target.clientHeight;
        if (total <= 0) return;
        const progress = (target.scrollTop / total) * 100;
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

    const handleCopyLink = () => {
        try {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy link:', err);
        }
    };

    // Use a portal-like approach: Always render AnimatePresence
    return (
        <AnimatePresence>
            {isOpen && article && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 overflow-hidden bg-black/90 backdrop-blur-2xl">
                    {/* Background Ambient Glows */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/20 blur-[100px] rounded-full animate-pulse" />
                        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/20 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
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
                        className="glass-premium relative w-full max-w-6xl h-[85vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/10 bg-slate-950/50"
                    >
                        {/* Reading Progress Indicator */}
                        <motion.div
                            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 z-[70]"
                            style={{ width: `${readingProgress}%` }}
                        />

                        {/* Interactive Mouse Glow */}
                        <motion.div
                            style={{ x: glowX, y: glowY }}
                            className="glow-point translate-x-[-50%] translate-y-[-50%] opacity-30 z-0 pointer-events-none absolute"
                        />

                        {/* Side Panel: News Metadata */}
                        <div className="w-full md:w-[30%] mesh-gradient p-8 md:p-10 flex flex-col justify-between relative overflow-hidden border-r border-white/5 shrink-0">
                            <div className="relative z-10">
                                <motion.div className="flex items-center gap-3 mb-10">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 backdrop-blur-xl">
                                        <Newspaper className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-xl font-black text-white tracking-tight uppercase">Audit<span className="text-blue-400">AI</span> Press</span>
                                </motion.div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full w-fit">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                                        <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Protocol Sync</span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-black text-white leading-[1.1] tracking-tighter">
                                        Intelligence <br />
                                        <span className="premium-gradient-text">Dispatch</span>
                                    </h2>
                                </div>
                            </div>

                            <div className="relative z-10 space-y-6">
                                <div className="bento-input-card p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl">
                                    <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-3">Transmission</p>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                        <span className="text-white font-bold text-[10px] uppercase">Verified Source</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-blue-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 1.5 }}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    {[
                                        { icon: Zap, text: "AI Indexed" },
                                        { icon: Globe, text: "Global Node" },
                                        { icon: ShieldCheck, text: "Audit Key" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors">
                                            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                                <item.icon className="w-4 h-4 text-blue-400" />
                                            </div>
                                            <span className="text-slate-400 font-bold text-[9px] uppercase tracking-widest">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="flex-1 flex flex-col bg-[#05070a]/70 backdrop-blur-xl min-h-0 relative">
                            {/* Close Button UI */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 z-[80] w-12 h-12 rounded-[20px] bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all duration-300 group shadow-2xl backdrop-blur-3xl"
                            >
                                <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                            </button>

                            {/* Header Section */}
                            <div className="h-[40%] w-full relative shrink-0 overflow-hidden">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover grayscale-[0.2]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/40 to-transparent" />

                                <div className="absolute bottom-8 left-8 right-8 z-20">
                                    <div className="flex gap-3 mb-4">
                                        <div className="bg-blue-600/20 border border-blue-500/30 px-3 py-1 rounded-lg">
                                            <span className="text-[9px] font-black text-blue-300 uppercase tracking-widest">{article.category}</span>
                                        </div>
                                        <div className="bg-black/40 border border-white/10 px-3 py-1 rounded-lg flex items-center gap-2">
                                            <Clock className="w-3 h-3 text-slate-400" />
                                            <span className="text-[9px] font-black text-white uppercase tracking-widest">{article.readTime}</span>
                                        </div>
                                    </div>
                                    <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tighter">
                                        {article.title}
                                    </h1>
                                </div>
                            </div>

                            {/* Scrollable Content Body */}
                            <div
                                onScroll={handleScroll}
                                className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-14 pt-8"
                            >
                                <div className="max-w-3xl mx-auto">
                                    <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                                <Calendar className="w-5 h-5 text-blue-500" />
                                            </div>
                                            <div>
                                                <p className="text-white font-bold text-sm">Official Batch</p>
                                                <p className="text-slate-500 text-[9px] font-black uppercase">
                                                    {article.date}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            {[Twitter, Linkedin, Facebook, Share2].map((Icon, i) => (
                                                <button key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                                                    <Icon className="w-4 h-4" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="prose prose-invert prose-lg max-w-none text-slate-400 leading-relaxed font-medium">
                                        <div className="mb-12 p-10 glass-premium rounded-[32px] border border-white/10 bg-white/[0.02]">
                                            <p className="text-2xl text-white font-black leading-tight mb-0">
                                                {article.excerpt}
                                            </p>
                                        </div>

                                        {article.content ? (
                                            <div dangerouslySetInnerHTML={{ __html: article.content }} />
                                        ) : (
                                            <>
                                                <p>
                                                    AuditAI continues to push the boundaries of web intelligence, delivering enterprise-grade solutions that redefine how architectural integrity is measured.
                                                </p>
                                                <h3 className="text-white font-black text-2xl mt-10 mb-4">Strategic Evolution</h3>
                                                <p>
                                                    By utilizing a decentralized crawling matrix, AuditAI provides 100% visibility into complex, asynchronously rendered environments.
                                                </p>
                                                <div className="my-12 p-10 glass-premium rounded-[32px] border border-white/10 bg-blue-500/5 relative overflow-hidden">
                                                    <div className="flex items-center gap-4 mb-6 relative z-10">
                                                        <Sparkles className="w-6 h-6 text-blue-400" />
                                                        <h4 className="text-white font-black uppercase text-lg">Insight Protocol</h4>
                                                    </div>
                                                    <p className="text-slate-200 text-lg relative z-10">
                                                        The future of SEO isn't just about visibility—it's about **trust architectural synchronization**.
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <div className="mt-20 pt-10 border-t border-white/5 flex items-center justify-between pb-10">
                                        <button
                                            onClick={() => window.print()}
                                            className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all"
                                        >
                                            <Printer className="w-4 h-4" /> Print Document
                                        </button>
                                        <div className="hidden md:flex items-center gap-4">
                                            <span className="text-[9px] font-bold text-slate-600 uppercase">Tags: INTELLIGENCE • SAAS • ENTERPRISE</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sticky Control Bar */}
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[90] hidden md:flex items-center p-2 bg-slate-900/80 backdrop-blur-3xl border border-white/10 rounded-3xl"
                            >
                                <button onClick={onClose} className="px-6 py-3 text-slate-400 hover:text-white font-black uppercase tracking-widest text-[9px]">
                                    Exit terminal
                                </button>
                                <div className="w-[1px] h-8 bg-white/10 mx-2" />
                                <button className="px-8 py-3 bg-white text-black font-black uppercase tracking-widest text-[9px] rounded-2xl hover:bg-blue-600 hover:text-white transition-all flex items-center gap-3">
                                    <Rocket className="w-4 h-4" /> Launch Protocol
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default NewsArticleModal;
