import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Download, FileText, Calendar, TrendingUp, Sparkles, Filter, Search, ChevronRight } from "lucide-react";

const Reports = () => {
  const reports = [
    { name: "Monthly Strategic Performance", date: "Dec 2024", type: "Performance", size: "2.4 MB", status: "Ready" },
    { name: "SEO Deep-Dive Analysis", date: "Dec 2024", type: "SEO", size: "1.8 MB", status: "Ready" },
    { name: "Global Competitor Comparison", date: "Nov 2024", type: "Competitors", size: "3.2 MB", status: "Archived" },
    { name: "Enterprise Security Audit", date: "Nov 2024", type: "Security", size: "1.5 MB", status: "Ready" },
    { name: "UX/UI Optimization Blueprint", date: "Oct 2024", type: "UX Design", size: "4.1 MB", status: "Ready" },
  ];

  return (
    <div className="min-h-screen text-slate-100 font-sans selection:bg-blue-500/30">
      <div className="relative z-10 w-full">
        <DashboardHeader title="Reports" subtitle="View and download your generated audit reports" />

        <div className="p-8 max-w-6xl mx-auto space-y-8 animate-fade-in-up">
          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="text"
                placeholder="Search reports..."
                className="w-full pl-12 h-12 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-all text-sm"
              />
            </div>
            <Button className="h-12 bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white rounded-xl gap-2 px-6 transition-all">
              <Filter className="h-4 w-4" /> Filter Categories
            </Button>
          </div>

          {/* Reports List */}
          <div className="grid gap-4">
            {reports.map((report, i) => (
              <div key={i} className="glass-card border border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-white/[0.03] hover:border-white/10 transition-all group cursor-pointer shadow-xl">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="h-7 w-7 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">{report.name}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-medium mt-1">
                      <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {report.date}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-700 hidden sm:block"></span>
                      <span className="flex items-center gap-1.5 text-blue-500/70 capitalize tracking-wider uppercase font-black text-[10px]">{report.type}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-700 hidden sm:block"></span>
                      <span className="text-slate-600">{report.size}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-6 sm:mt-0">
                  <div className="hidden lg:block text-right mr-4">
                    <span className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Status</span>
                    <span className={`text-xs font-bold ${report.status === 'Ready' ? 'text-emerald-400' : 'text-slate-500'}`}>{report.status}</span>
                  </div>
                  <Button className="h-11 bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-blue-500/30 rounded-xl gap-3 flex-1 sm:flex-none transition-all">
                    <Download className="h-4 w-4 text-blue-400" />
                    <span className="sm:hidden lg:inline">Download PDF</span>
                  </Button>
                  <Button variant="ghost" className="h-11 w-11 p-0 text-slate-600 hover:text-white hover:bg-white/5 rounded-xl transition-all hidden sm:flex">
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Automation Promo */}
          <div className="glass-card border border-white/5 border-dashed rounded-3xl p-10 mt-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="w-16 h-16 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="h-8 w-8 text-blue-400 animate-pulse" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Automate Your Intelligence Pipeline</h4>
            <p className="text-slate-500 text-sm max-w-md mx-auto mb-8">Schedule monthly, weekly, or real-time event-driven briefings delivered directly to your executive stakeholders.</p>
            <Button className="bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl px-10 h-12 shadow-lg shadow-blue-900/20">Configure Automation Nodes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
