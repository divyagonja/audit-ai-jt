import { Book, Rocket, Settings, Shield, Zap, Code } from "lucide-react";

const KnowledgeContent = () => {
    const categories = [
        {
            icon: Rocket,
            title: "Getting Started",
            description: "Everything you need to know to set up your account and run your first audit.",
            articles: ["Quick Start Guide", "Creating an Account", "Dashboard Overview", "Adding Your Team"]
        },
        {
            icon: Zap,
            title: "Audits & Analysis",
            description: "Deep dive into our auditing tools, interpreting scores, and fixing issues.",
            articles: ["Understanding Health Scores", "Fixing Core Web Vitals", "Crawl Budget Explained", "Mobile Usability"]
        },
        {
            icon: Settings,
            title: "Account & Billing",
            description: "Manage your subscription, billing details, and account preferences.",
            articles: ["Managing Subscriptions", "Payment Methods", "Invoices & Receipts", "Upgrading Plan"]
        },
        {
            icon: Code,
            title: "API & Integrations",
            description: "Connect AuditAI with your existing tools and workflows via API.",
            articles: ["API Reference", "Slack Integration", "Jira Integration", "Webhooks"]
        },
        {
            icon: Shield,
            title: "Security & Privacy",
            description: "Learn about our security protocols and how we protect your data.",
            articles: ["Data Encryption", "GDPR Compliance", "SOC 2 Report", "Privacy Policy"]
        },
        {
            icon: Book,
            title: "Tutorials",
            description: "Step-by-step guides for advanced SEO strategies and platform features.",
            articles: ["Advanced Keyword Tracking", "Competitor Analysis 101", "White-label Reporting", "Local SEO Audit"]
        }
    ];

    return (
        <section className="py-20 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                        >
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                <category.icon className="h-6 w-6 text-primary" />
                            </div>

                            <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-primary transition-colors">
                                {category.title}
                            </h3>
                            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                                {category.description}
                            </p>

                            <ul className="space-y-3">
                                {category.articles.map((article, i) => (
                                    <li key={i} className="text-sm text-slate-500 hover:text-primary hover:underline transition-colors flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                        {article}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Still Need Help? */}
                <div className="mt-20 text-center bg-white rounded-2xl p-12 border border-slate-200 shadow-sm">
                    <h2 className="text-2xl font-bold text-navy mb-4">Still need help?</h2>
                    <p className="text-slate-600 mb-8 max-w-xl mx-auto">
                        Our support team is just a click away. We usually respond within a few hours.
                    </p>
                    <div className="flex justify-center gap-4">
                        <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors">
                            Contact Support
                        </a>
                        <a href="mailto:support@auditai.com" className="inline-flex items-center justify-center px-6 py-3 border border-slate-200 text-base font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-colors">
                            Email Us
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default KnowledgeContent;
