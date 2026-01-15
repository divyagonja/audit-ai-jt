import { X, Calendar, Clock, Share2, Facebook, Twitter, Linkedin, Link as LinkIcon, Printer } from 'lucide-react';
import { useState, useEffect } from 'react';

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

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !article) return null;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
            {/* Modal Container */}
            <div className="bg-white max-w-4xl w-full my-auto max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-scale-in relative">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/10 hover:bg-black/20 backdrop-blur-md flex items-center justify-center transition-colors"
                >
                    <X className="w-5 h-5 text-nav" />
                </button>

                {/* Hero Image */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="inline-block px-3 py-1 bg-blue-600 rounded-full text-xs font-semibold text-white mb-4">
                            {article.category}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
                            {article.title}
                        </h2>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-10">
                    {/* Meta Data */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 mb-8 border-b border-slate-100 pb-8">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {article.readTime}
                        </div>
                        <div className="flex-1"></div>

                        {/* Social Share */}
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Share</span>
                            <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-100 hover:text-blue-600 flex items-center justify-center transition-colors">
                                <Twitter className="w-4 h-4" />
                            </button>
                            <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-100 hover:text-blue-600 flex items-center justify-center transition-colors">
                                <Linkedin className="w-4 h-4" />
                            </button>
                            <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-100 hover:text-blue-600 flex items-center justify-center transition-colors">
                                <Facebook className="w-4 h-4" />
                            </button>
                            <button
                                onClick={handleCopyLink}
                                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-100 hover:text-blue-600 flex items-center justify-center transition-colors relative"
                                title="Copy Link"
                            >
                                {copied ? <span className="absolute -top-8 text-xs bg-black text-white px-2 py-1 rounded">Copied!</span> : null}
                                <LinkIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Article Body */}
                    <div className="prose prose-lg max-w-none text-slate-600">
                        <p className="lead text-xl text-slate-700 font-medium mb-6">
                            {article.excerpt}
                        </p>

                        {article.content ? (
                            <div dangerouslySetInnerHTML={{ __html: article.content }} />
                        ) : (
                            // Fallback content if no specific content is provided
                            <>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                                <p>
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                                <h3>Key Takeaways</h3>
                                <ul>
                                    <li>Innovation in AI technology driving new capabilities in web auditing.</li>
                                    <li>Expanded market reach to serve global enterprise customers.</li>
                                    <li>Commitment to data privacy and security remains a top priority.</li>
                                </ul>
                                <p>
                                    "We are thrilled to announce this milestone," said Jane Doe, CEO of AuditAI. "This achievement reflects the hard work and dedication of our entire team."
                                </p>
                                <p>
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                </p>
                            </>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
                        <button
                            onClick={() => window.print()}
                            className="flex items-center gap-2 text-slate-500 hover:text-navy transition-colors"
                        >
                            <Printer className="w-4 h-4" />
                            <span className="text-sm font-medium">Print Article</span>
                        </button>

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-400">Tags:</span>
                            <span className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600 font-medium">Technology</span>
                            <span className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600 font-medium">AI</span>
                            <span className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600 font-medium">SaaS</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsArticleModal;
