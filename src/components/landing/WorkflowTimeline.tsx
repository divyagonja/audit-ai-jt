import { Search, Server, FileText, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const WorkflowTimeline = () => {
    const steps = [
        {
            icon: Search,
            title: "Connect & Crawl",
            description: "Enter your domain and our bot starts crawling immediately. We respect robots.txt and crawl budget."
        },
        {
            icon: Server,
            title: "AI Analysis",
            description: "Our engine processes thousands of data points against 200+ ranking factors to find hidden issues."
        },
        {
            icon: FileText,
            title: "Prioritized Report",
            description: "Issues are categorized by impact (Critical, Warning, Info) so you know exactly what to fix first."
        },
        {
            icon: CheckCircle,
            title: "Track Progress",
            description: "Re-run audits to verify fixes. Watch your health score improve and traffic grow over time."
        }
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-3xl font-bold text-navy mb-4">How AuditAI Works</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        From connection to correction in four simple steps.
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[2.25rem] left-0 w-full h-0.5 bg-slate-100 z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center text-center group">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    className="w-16 h-16 rounded-2xl bg-white border-2 border-slate-100 shadow-sm flex items-center justify-center mb-6 group-hover:border-primary group-hover:shadow-[0_0_30px_-5px_var(--tw-shadow-color)] group-hover:shadow-primary/20 transition-all duration-300"
                                >
                                    <step.icon className="h-8 w-8 text-slate-400 group-hover:text-primary transition-colors duration-300" />
                                </motion.div>
                                <h3 className="text-lg font-bold text-navy mb-2">{step.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WorkflowTimeline;
