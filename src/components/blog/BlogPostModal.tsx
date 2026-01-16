import { X, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

interface BlogPost {
    title: string;
    excerpt: string;
    content?: string; // Full content
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
    if (!post) return null;

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
                onClick={() => onOpenChange(false)}
            />

            <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">

                {/* Header / Image */}
                <div className="relative h-64 sm:h-80 flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <button
                        onClick={() => onOpenChange(false)}
                        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors border border-white/10"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="absolute bottom-0 left-0 p-12 z-20 w-full">
                        <div className="flex flex-wrap items-center gap-4 text-sm font-medium mb-3">
                            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-md">
                                {post.category}
                            </span>
                            {post.readTime && (
                                <span className="flex items-center gap-1.5 text-slate-300 bg-black/30 px-3 py-1 rounded-full backdrop-blur-md">
                                    <Clock className="w-3.5 h-3.5" /> {post.readTime}
                                </span>
                            )}
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-bold text-white leading-tight">
                            {post.title}
                        </h2>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="p-10 sm:p-20 sm:pt-16">
                        {/* Meta Data */}
                        <div className="flex items-center justify-between border-b border-slate-800 pb-8 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30 text-purple-300 font-bold">
                                    {post.author ? post.author.charAt(0) : 'A'}
                                </div>
                                <div>
                                    <div className="text-white font-medium">{post.author || 'AuditAI Team'}</div>
                                    <div className="text-slate-500 text-sm flex items-center gap-2">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {post.date}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button size="icon" variant="outline" className="h-9 w-9 border-slate-700 bg-slate-800/50 hover:bg-slate-700 hover:text-white">
                                    <Twitter className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="outline" className="h-9 w-9 border-slate-700 bg-slate-800/50 hover:bg-slate-700 hover:text-white">
                                    <Linkedin className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="outline" className="h-9 w-9 border-slate-700 bg-slate-800/50 hover:bg-slate-700 hover:text-white">
                                    <Share2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Article Body */}
                        <div className="prose prose-invert prose-xl max-w-none text-slate-400 leading-loose 
                            prose-headings:text-white prose-headings:font-black prose-headings:tracking-tighter
                            prose-h3:text-3xl prose-h3:mb-8 prose-h3:mt-20 prose-h3:bg-clip-text prose-h3:text-transparent prose-h3:bg-gradient-to-r prose-h3:from-white prose-h3:to-slate-500
                            prose-p:mb-10 prose-li:my-5 
                            prose-blockquote:my-16 prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:pl-8 prose-blockquote:italic">
                            {/* If we have specific content, render it, otherwise render generic dummy text */}
                            {post.content ? (
                                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                            ) : (
                                <>
                                    <p className="lead text-xl text-slate-200">
                                        {post.excerpt}
                                    </p>
                                    <p>
                                        Search engine optimization is constantly evolving. In this deep dive, we explore the critical components that modern engineering teams need to understand to maintain visibility in an AI-first world.
                                    </p>
                                    <h3>The Shift to Neural Search</h3>
                                    <p>
                                        Traditionally, search engines relied heavily on keyword matching. Today, with the advent of BERT and MUM, Google understands context better than ever. This means your content needs to answer specific user intents rather than just stuffing keywords.
                                    </p>
                                    <blockquote>
                                        "The future of SEO is not about tricking the robot, it's about helping the robot understand your value proposition."
                                    </blockquote>
                                    <h3>Technical Foundations</h3>
                                    <p>
                                        Despite the AI buzz, the technical foundation remains crucial. If a crawler cannot access your content, it cannot rank it. This includes:
                                    </p>
                                    <ul>
                                        <li>Optimizing <strong>Core Web Vitals</strong> (LCP, INP, CLS)</li>
                                        <li>Ensuring proper <strong>schema markup</strong></li>
                                        <li>Managing <strong>crawl budget</strong> effectively for large sites</li>
                                    </ul>
                                    <h3>Conclusion</h3>
                                    <p>
                                        As we move forward, the line between product development and SEO will continue to blur. Developers are the new SEOs.
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPostModal;
