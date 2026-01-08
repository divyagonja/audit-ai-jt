import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import {
  Download,
  FileText,
  Calendar,
  TrendingUp,
  Sparkles,
  Filter,
  Search,
  ChevronRight,
  Eye,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Activity
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const reports = [
    { id: 1, name: "Monthly Strategic Performance", date: "Dec 2024", type: "Performance", size: "2.4 MB", status: "Ready", score: 92 },
    { id: 2, name: "SEO Deep-Dive Analysis", date: "Dec 2024", type: "SEO", size: "1.8 MB", status: "Ready", score: 88 },
    { id: 3, name: "Global Competitor Comparison", date: "Nov 2024", type: "Competitors", size: "3.2 MB", status: "Archived", score: 74 },
    { id: 4, name: "Enterprise Security Audit", date: "Nov 2024", type: "Security", size: "1.5 MB", status: "Ready", score: 96 },
    { id: 5, name: "UX/UI Optimization Blueprint", date: "Oct 2024", type: "UX Design", size: "4.1 MB", status: "Ready", score: 81 },
  ];

  const handleDownload = (e: React.MouseEvent, report: any) => {
    e.stopPropagation();
    setDownloadingId(report.id);

    // Simulate a professional download process
    setTimeout(() => {
      setDownloadingId(null);
      toast({
        title: "Report Processing Complete",
        description: `${report.name} has been downloaded to your local drive.`,
      });
    }, 2000);
  };

  const handleViewReport = (report: any) => {
    setSelectedReport(report);
  };

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 h-12 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-all text-sm"
              />
            </div>
            <Button className="h-12 bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white rounded-xl gap-2 px-6 transition-all">
              <Filter className="h-4 w-4" /> Filter Categories
            </Button>
          </div>

          {/* Reports List */}
          <div className="grid gap-4">
            {reports.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase())).map((report) => (
              <div
                key={report.id}
                onClick={() => handleViewReport(report)}
                className="glass-card border border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-white/[0.03] hover:border-white/10 transition-all group cursor-pointer shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />

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
                    <span className={`text-xs font-bold flex items-center gap-1.5 ${report.status === 'Ready' ? 'text-emerald-400' : 'text-slate-500'}`}>
                      {report.status === 'Ready' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                      {report.status}
                    </span>
                  </div>
                  <Button
                    onClick={(e) => handleDownload(e, report)}
                    disabled={downloadingId === report.id}
                    className="h-11 bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-blue-500/30 rounded-xl gap-3 flex-1 sm:flex-none transition-all min-w-[140px]"
                  >
                    {downloadingId === report.id ? (
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <Download className="h-4 w-4 text-blue-400" />
                    )}
                    <span className="sm:hidden lg:inline">{downloadingId === report.id ? 'Syncing...' : 'Download PDF'}</span>
                  </Button>
                  <Button variant="ghost" className="h-11 w-11 p-0 text-slate-600 group-hover:text-blue-400 hover:bg-white/5 rounded-xl transition-all hidden sm:flex">
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

      {/* Report Preview Modal */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-w-4xl bg-slate-950 border-white/10 text-white overflow-hidden p-0 rounded-3xl">
          {selectedReport && (
            <div className="flex flex-col">
              {/* Header Gradient */}
              <div className="h-32 bg-gradient-to-r from-blue-900/20 via-slate-900 to-indigo-900/20 border-b border-white/5 p-8 flex justify-between items-end relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] bg-[size:20px_20px]" />
                <div className="relative z-10">
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2 block">Neural Report Sequence</span>
                  <DialogTitle className="text-2xl font-black tracking-tight">{selectedReport.name}</DialogTitle>
                </div>
                <div className="relative z-10 flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Health Index</p>
                    <p className="text-lg font-black text-emerald-400 leading-none">{selectedReport.score}%</p>
                  </div>
                  <Activity className="h-6 w-6 text-emerald-400" />
                </div>
              </div>

              <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                {/* Metrics Row */}
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { label: "Temporal Accuracy", value: "99.8%", icon: Clock, color: "text-blue-400" },
                    { label: "Data Integrity", value: "Verified", icon: CheckCircle2, color: "text-emerald-400" },
                    { label: "Optimization Gain", value: "+12.4%", icon: TrendingUp, color: "text-amber-400" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                      <stat.icon className={`h-5 w-5 ${stat.color} mb-3`} />
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                      <p className="text-xl font-bold text-white">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Report Brief */}
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-widest">
                    <Eye className="h-4 w-4 text-blue-400" /> Executive Briefing
                  </h4>
                  <div className="p-6 bg-slate-900/50 rounded-2xl border border-white/5 space-y-4 text-sm text-slate-300 leading-relaxed">
                    <p>
                      This {selectedReport.type} report represents a comprehensive neural audit conducted on {selectedReport.date}.
                      The analysis pipeline identified key structural vulnerabilities and performance bottlenecks that, when addressed,
                      could yield an estimated {selectedReport.score > 80 ? 'further 5-8%' : 'significant 10-15%'} efficiency gain.
                    </p>
                    <p>
                      Current system entropy remains low, with high-priority signals concentrated in the secondary infrastructure layers.
                      Strategic reallocation of resources is recommended for the upcoming quarter.
                    </p>
                  </div>
                </div>

                {/* Key Insights List */}
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-widest">
                    <Sparkles className="h-4 w-4 text-amber-400" /> High-Density Insights
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "Neural path optimization detected performance leaks in sub-directory headers.",
                      "Mobile viewport responsiveness exceeds market average by 14.2%.",
                      "Competitor keywords shifting towards intent-based semantic clusters.",
                      "Security headers implementation score: 100/100."
                    ].map((insight, i) => (
                      <div key={i} className="flex gap-3 p-4 bg-white/[0.02] rounded-xl border border-white/5">
                        <ArrowUpRight className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-400">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-slate-900/50 border-t border-white/5 flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setSelectedReport(null)} className="text-slate-400 hover:text-white rounded-xl">
                  Close Preview
                </Button>
                <Button
                  onClick={(e) => { handleDownload(e, selectedReport); setSelectedReport(null); }}
                  className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6"
                >
                  <Download className="mr-2 h-4 w-4" /> Download Full PDF
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reports;

