import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { knowledgeBaseData, Article } from "@/data/knowledgeBaseData";
import { ChevronRight, ArrowLeft, Clock, Share2, Printer, ThumbsUp, ThumbsDown } from "lucide-react";

const KnowledgeArticle = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (slug && knowledgeBaseData[slug]) {
            setArticle(knowledgeBaseData[slug]);
            document.title = `${knowledgeBaseData[slug].title} - Knowledge Base | AuditAI`;
        }
    }, [slug]);

    if (!article) {
        return (
            <div className="min-h-screen bg-white">
                <Navigation />
                <div className="pt-40 pb-20 container mx-auto px-6 text-center">
                    <h1 className="text-4xl font-bold text-navy mb-4">Article Not Found</h1>
                    <p className="text-slate-600 mb-8">The article you're looking for doesn't exist or has been moved.</p>
                    <Link to="/knowledge-base" className="text-primary font-semibold hover:underline flex items-center justify-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back to Knowledge Base
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    // Get related articles (same category)
    const relatedArticles = Object.entries(knowledgeBaseData)
        .filter(([s, a]) => a.category === article.category && s !== slug)
        .slice(0, 5);

    return (
        <div className="min-h-screen bg-slate-50/50">
            <Navigation />

            <main className="pt-24 pb-20">
                {/* Breadcrumbs */}
                <div className="container mx-auto px-6 py-6 font-sans">
                    <nav className="flex items-center text-sm text-slate-500 mb-8">
                        <Link to="/knowledge-base" className="hover:text-primary transition-colors">Knowledge Base</Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span className="text-slate-900 font-medium">{article.category}</span>
                    </nav>

                    <div className="grid lg:grid-cols-12 gap-12">
                        {/* Article Content */}
                        <div className="lg:col-span-8">
                            <article className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
                                <div className="flex items-center gap-4 mb-8">
                                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                                        {article.category}
                                    </span>
                                    <div className="flex items-center text-slate-400 text-sm gap-1.5">
                                        <Clock className="w-4 h-4" />
                                        Updated {article.lastUpdated}
                                    </div>
                                </div>

                                <h1 className="text-4xl md:text-5xl font-bold text-navy mb-8 leading-tight">
                                    {article.title}
                                </h1>

                                <div
                                    className="prose prose-slate max-w-none 
                                        prose-headings:text-navy prose-headings:font-bold
                                        prose-p:text-slate-600 prose-p:leading-relaxed prose-p:text-lg
                                        prose-strong:text-navy prose-strong:font-semibold
                                        prose-code:bg-slate-100 prose-code:p-1 prose-code:rounded prose-code:text-primary"
                                    dangerouslySetInnerHTML={{ __html: article.content }}
                                />

                                <hr className="my-12 border-slate-100" />

                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-semibold text-navy">Was this helpful?</span>
                                        <div className="flex gap-2">
                                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 hover:border-primary hover:text-primary bg-white transition-all text-sm font-medium">
                                                <ThumbsUp className="w-4 h-4" /> Yes
                                            </button>
                                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 hover:border-red-500 hover:text-red-500 bg-white transition-all text-sm font-medium">
                                                <ThumbsDown className="w-4 h-4" /> No
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-slate-500" title="Share">
                                            <Share2 className="w-4 h-4" />
                                        </button>
                                        <button className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-slate-500" title="Print">
                                            <Printer className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </article>

                            {/* Still need help? */}
                            <div className="mt-12 bg-primary rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-xl shadow-primary/20">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
                                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2">Still need help?</h3>
                                        <p className="text-white/80">Our support team is available 24/7 to help you with any questions.</p>
                                    </div>
                                    <Link to="/contact" className="px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-slate-50 transition-colors whitespace-nowrap shadow-lg">
                                        Contact Support
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
                            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                                <h3 className="text-lg font-bold text-navy mb-6">In this category</h3>
                                <div className="space-y-4">
                                    {relatedArticles.map(([s, a]) => (
                                        <Link
                                            key={s}
                                            to={`/knowledge-base/${s}`}
                                            className="block group"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-slate-200 mt-2.5 group-hover:bg-primary transition-colors shrink-0" />
                                                <span className="text-slate-600 group-hover:text-primary transition-colors text-sm font-medium leading-snug">
                                                    {a.title}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                    {relatedArticles.length === 0 && (
                                        <p className="text-sm text-slate-400">No other articles in this category.</p>
                                    )}
                                </div>

                                <hr className="my-8 border-slate-100" />

                                <h3 className="text-lg font-bold text-navy mb-4">Need help?</h3>
                                <p className="text-sm text-slate-600 mb-6">Can't find what you're looking for? Reach out to our experts.</p>
                                <a href="mailto:help@auditai.com" className="w-full inline-flex items-center justify-center p-4 rounded-xl border border-slate-200 text-navy font-bold hover:bg-slate-50 transition-colors text-sm">
                                    Email help@auditai.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default KnowledgeArticle;
