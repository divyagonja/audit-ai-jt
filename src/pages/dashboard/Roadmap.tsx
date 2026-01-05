
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { CheckCircle2, Circle, Clock, Rocket, Sparkles, Star, Zap } from "lucide-react";

const Roadmap = () => {
    const roadmapItems = [
        {
            quarter: "Q1 2026",
            title: "Advanced AI Reporting",
            description: "Deep dive analysis with generative AI insights and automated executive summaries.",
            status: "completed",
            icon: Sparkles,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
            borderColor: "border-purple-200"
        },
        {
            quarter: "Q2 2026",
            title: "Team Collaboration",
            description: "Real-time auditing with team members, comments, and task assignment.",
            status: "in-progress",
            icon: Rocket,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
            borderColor: "border-blue-200"
        },
        {
            quarter: "Q3 2026",
            title: "API Access",
            description: "Programmatic access to audit data and automated scanning integrations.",
            status: "planned",
            icon: Zap,
            color: "text-amber-600",
            bgColor: "bg-amber-100",
            borderColor: "border-amber-200"
        },
        {
            quarter: "Q4 2026",
            title: "Enterprise Security",
            description: "SSO enforcement, audit logs, and role-based access control enhancements.",
            status: "planned",
            icon: Star,
            color: "text-slate-600",
            bgColor: "bg-slate-100",
            borderColor: "border-slate-200"
        }
    ];

    return (
        <div className="min-h-screen dashboard-bg">
            <div className="relative z-10">
                <DashboardHeader
                    title="Product Roadmap"
                    subtitle="See what's coming next to Audit AI"
                />

                <div className="p-8 max-w-5xl mx-auto">
                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                                <Rocket className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">Future Features</h2>
                                <p className="text-slate-500">Our journey to build the ultimate audit platform</p>
                            </div>
                        </div>

                        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                            {roadmapItems.map((item, index) => (
                                <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">

                                    {/* Icon Marker */}
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-200 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:scale-110 transition-transform duration-300">
                                        {item.status === 'completed' ? (
                                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                        ) : item.status === 'in-progress' ? (
                                            <Clock className="w-5 h-5 text-blue-600 animate-pulse" />
                                        ) : (
                                            <Circle className="w-5 h-5 text-slate-400" />
                                        )}
                                    </div>

                                    {/* Content Card */}
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group-hover:-translate-y-1">
                                        <div className={`absolute top-0 left-0 w-1 h-full ${item.bgColor.replace('bg-', 'bg-gradient-to-b from-').replace('100', '500')} to-transparent opacity-50`}></div>

                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.bgColor} ${item.color} border ${item.borderColor}`}>
                                                {item.quarter}
                                            </span>
                                            {item.status === 'in-progress' && (
                                                <span className="text-xs font-semibold text-blue-600 animate-pulse">In Progress</span>
                                            )}
                                            {item.status === 'completed' && (
                                                <span className="text-xs font-semibold text-emerald-600">Completed</span>
                                            )}
                                        </div>

                                        <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                                            <item.icon className={`w-5 h-5 ${item.color}`} />
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Roadmap;
