import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ListChecks, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductShowcase = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        {
            id: "dashboard",
            label: "Unified Dashboard",
            icon: Activity,
            title: "See Everything in One Place",
            description: "Get a bird's eye view of your website's performance. Monitor health scores, traffic trends, and critical issues in real-time.",
            image: "/dashboard-preview.png"
        },
        {
            id: "audits",
            label: "Technical Audits",
            icon: ListChecks,
            title: "Deep Technical Analysis",
            description: "Automatically detect 200+ technical SEO issues. From broken links to Core Web Vitals, we catch what others miss.",
            image: "/issues-preview.png"
        },
        {
            id: "reporting",
            label: "Actionable Reporting",
            icon: BarChart3,
            title: "Client-Ready Reports",
            description: "Generate beautiful, white-labeled PDF reports in seconds. Visualize your win rates and show ROI to stakeholders.",
            image: "/analytics-preview.png"
        }
    ];

    return (
        <section className="py-24 bg-slate-50 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-navy mb-6">
                        Powerful Tools for
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 animate-gradient"> Serious Growth</span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Stop guessing. Start fixing. Our AI-driven platform gives you the insights you need to dominate search results.
                    </p>
                </div>

                {/* Tabs Navigation */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {tabs.map((tab, index) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(index)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === index
                                ? "bg-navy text-white shadow-lg shadow-navy/20 scale-105"
                                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                                }`}
                        >
                            <tab.icon className="h-4 w-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Text */}
                        <div className="order-2 lg:order-1 space-y-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3 className="text-3xl font-bold text-navy mb-4">
                                        {tabs[activeTab].title}
                                    </h3>
                                    <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                        {tabs[activeTab].description}
                                    </p>
                                    <ul className="space-y-4 mb-8">
                                        <li className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-green-600" />
                                            </div>
                                            <span className="text-slate-700 font-medium">Real-time data processing</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-green-600" />
                                            </div>
                                            <span className="text-slate-700 font-medium">Export to PDF, CSV, or Sheets</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-green-600" />
                                            </div>
                                            <span className="text-slate-700 font-medium">API access included</span>
                                        </li>
                                    </ul>
                                    <Button className="group" size="lg">
                                        Explore {tabs[activeTab].label}
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Right Image */}
                        <div className="order-1 lg:order-2">
                            <div className="relative">
                                {/* Decorative Blur */}
                                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-[2rem] opacity-20 blur-2xl" />

                                {/* Browser Window Frame */}
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="relative bg-navy rounded-xl shadow-2xl border border-white/10 overflow-hidden group"
                                >
                                    {/* Window Header */}
                                    <div className="h-8 bg-slate-900 border-b border-white/5 flex items-center px-4 gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400/80" />
                                        <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                                        <div className="w-3 h-3 rounded-full bg-green-400/80" />
                                        <div className="ml-4 flex-1">
                                            <div className="h-4 w-2/3 bg-white/5 rounded-full" />
                                        </div>
                                    </div>

                                    {/* Main Image */}
                                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900 group-hover:shadow-2xl transition-all duration-500">
                                        <motion.div
                                            initial={{ y: "0%" }}
                                            animate={{ y: ["0%", "-5%", "0%"] }}
                                            transition={{
                                                duration: 10,
                                                ease: "easeInOut",
                                                repeat: Infinity,
                                                repeatType: "reverse"
                                            }}
                                            className="w-full h-full"
                                        >
                                            <img
                                                src={tabs[activeTab].image}
                                                alt={tabs[activeTab].title}
                                                className="w-full h-full object-cover object-top"
                                            />
                                        </motion.div>

                                        {/* Overlay gradient for depth */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent pointer-events-none" />
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductShowcase;
