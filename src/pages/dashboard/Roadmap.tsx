
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { CheckCircle2, Circle, Clock, Rocket, Sparkles, Star, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

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
        <div className="min-h-screen text-slate-100 font-sans selection:bg-blue-500/30">
            <div className="relative z-10">
                <DashboardHeader
                    title="Growth Roadmap"
                    subtitle="Our technical evolution and planned system enhancements"
                />

                <div className="p-8 max-w-5xl mx-auto animate-fade-in-up">
                    <div className="glass-card rounded-3xl overflow-hidden border border-white/5 p-10 shadow-2xl relative group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -mr-32 -mt-32 transition-colors group-hover:bg-blue-600/10"></div>

                        <div className="flex items-center gap-4 mb-12 relative z-10">
                            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-xl shadow-blue-900/20">
                                <Rocket className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-white premium-gradient-text tracking-tight">Future Capabilities</h2>
                                <p className="text-slate-400 text-sm font-medium">Tracking the progression of our neural infrastructure</p>
                            </div>
                        </div>

                        <div className="space-y-12 relative z-10 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[1px] before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                            {roadmapItems.map((item, index) => (
                                <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">

                                    {/* Icon Marker */}
                                    <div className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 bg-slate-900 shadow-xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:scale-110 group-hover:border-blue-500/50 transition-all duration-500">
                                        {item.status === 'completed' ? (
                                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                        ) : item.status === 'in-progress' ? (
                                            <Clock className="w-5 h-5 text-blue-400 animate-pulse" />
                                        ) : (
                                            <Circle className="w-5 h-5 text-slate-600" />
                                        )}
                                    </div>

                                    {/* Content Card */}
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 shadow-xl backdrop-blur-sm transition-all duration-500 relative overflow-hidden group-hover:-translate-y-1">
                                        <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${item.status === 'completed' ? 'from-emerald-500' : item.status === 'in-progress' ? 'from-blue-500' : 'from-slate-700'} to-transparent opacity-30`}></div>

                                        <div className="flex justify-between items-start mb-3">
                                            <span className={cn(
                                                "inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border",
                                                item.status === 'completed' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                                    item.status === 'in-progress' ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                                                        "bg-slate-500/10 text-slate-400 border-slate-500/20"
                                            )}>
                                                {item.quarter}
                                            </span>
                                            {item.status === 'in-progress' && (
                                                <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded animate-pulse">ACTIVE MISSION</span>
                                            )}
                                        </div>

                                        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                            <item.icon className={cn("w-5 h-5",
                                                item.status === 'completed' ? "text-emerald-400" :
                                                    item.status === 'in-progress' ? "text-blue-400" :
                                                        "text-slate-400"
                                            )} />
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-400 text-sm leading-relaxed font-medium">
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
