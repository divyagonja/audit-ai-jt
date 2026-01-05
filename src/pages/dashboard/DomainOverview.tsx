import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ScoreCircle from "@/components/dashboard/ScoreCircle";
import { Globe, TrendingUp, Shield, Zap, ArrowRight, BarChart3, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DomainOverview = () => (
  <div className="min-h-screen dashboard-bg text-slate-100 font-sans selection:bg-blue-500/30">
    <div className="fixed inset-0 pointer-events-none dashboard-bg-overlay opacity-20 z-0"></div>
    <div className="relative z-10 w-full">
      <DashboardHeader title="Domain Overview" subtitle="Real-time health monitoring of your digital assets" />

      <div className="p-8 max-w-[1600px] mx-auto animate-fade-in-up">
        {/* Main Overview Card */}
        <div className="glass-card border border-white/5 rounded-3xl p-8 mb-8 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-16 -mt-16 transition-colors group-hover:bg-blue-600/20"></div>

          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
                <Activity className="h-3 w-3 animate-pulse" /> Live Monitoring
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-2 flex items-center justify-center md:justify-start gap-4">
                <Globe className="h-8 w-8 text-blue-500" />
                example.com
              </h2>
              <p className="text-slate-400 mb-6 flex items-center justify-center md:justify-start gap-2">
                Last audited: <span className="text-slate-200 font-medium">Today at 10:42 AM</span>
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-900/20">
                  Detailed Report <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-white/10 text-white hover:bg-white/10 rounded-xl">
                  Verify Domain
                </Button>
              </div>
            </div>

            <div className="flex-shrink-0 relative">
              <div className="relative z-10 scale-110">
                <ScoreCircle score={72} size="lg" label="Health Score" />
              </div>
              {/* Decorative rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-blue-500/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border border-dashed border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: TrendingUp, label: "SEO Performance", score: 68, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
            { icon: Zap, label: "Core Web Vitals", score: 75, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
            { icon: Shield, label: "Security & HTTPS", score: 82, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
          ].map((item, i) => (
            <div key={i} className={`glass-card p-6 rounded-2xl border ${item.border} hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden group`}>
              <div className={`absolute top-0 right-0 w-24 h-24 ${item.bg} rounded-full blur-2xl -mr-12 -mt-12 transition-colors opacity-50 group-hover:opacity-100`}></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-4 border ${item.border}`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{item.label}</p>
                <p className={`text-3xl font-black ${item.color}`}>{item.score}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Metrics / Placeholder for more data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card border border-white/5 rounded-3xl p-6 min-h-[200px] flex items-center justify-center flex-col text-slate-500">
            <BarChart3 className="h-10 w-10 mb-2 opacity-50" />
            <p>Traffic Trends Chart (Coming Soon)</p>
          </div>
          <div className="glass-card border border-white/5 rounded-3xl p-6 min-h-[200px] flex items-center justify-center flex-col text-slate-500">
            <Globe className="h-10 w-10 mb-2 opacity-50" />
            <p>Regional Uptime Map (Coming Soon)</p>
          </div>
        </div>

      </div>
    </div>
  </div>
);

export default DomainOverview;
