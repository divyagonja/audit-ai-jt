
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ScoreCircle from "@/components/dashboard/ScoreCircle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  Filter,
  Download,
  Clock,
  Globe,
  ExternalLink,
  Trash2,
  FileText
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const AllAudits = () => {
  const [audits, setAudits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchAudits();
  }, []);

  const fetchAudits = async () => {
    const { data, error } = await supabase
      .from("audits")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setAudits(data);
    }
    setLoading(false);
  };

  const deleteAudit = async (id: string) => {
    const { error } = await supabase.from("audits").delete().eq("id", id);
    if (!error) {
      setAudits(audits.filter((a) => a.id !== id));
      toast({ title: "Audit deleted", description: "The audit has been removed." });
    }
  };

  const filteredAudits = audits.filter((audit) =>
    audit.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
    audit.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const mockAudits = [
    { id: "1", url: "acme.com", name: "Homepage Audit", overall_score: 78, created_at: new Date().toISOString(), status: "completed", critical_issues: 5, warning_issues: 12 },
    { id: "2", url: "example.org", name: "Landing Page", overall_score: 65, created_at: new Date().toISOString(), status: "completed", critical_issues: 8, warning_issues: 18 },
    { id: "3", url: "startup.io", name: "Product Page", overall_score: 82, created_at: new Date().toISOString(), status: "completed", critical_issues: 3, warning_issues: 7 },
    { id: "4", url: "enterprise.com", name: "Main Site", overall_score: 91, created_at: new Date().toISOString(), status: "completed", critical_issues: 1, warning_issues: 4 },
  ];

  const displayAudits = filteredAudits.length > 0 ? filteredAudits : (audits.length === 0 ? mockAudits : []);

  return (
    <div className="min-h-screen text-slate-100 font-sans selection:bg-blue-500/30 max-w-full">
      <div className="relative z-10 w-full mb-20">
        <DashboardHeader title="Intelligence Vault" subtitle="Neural archive of all processed audit sequences" />

        <div className="p-8 max-w-[1600px] mx-auto animate-fade-in-up w-full">
          {/* Enhanced Actions Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative w-full max-w-xl group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-400 transition-all duration-300" />
                <Input
                  type="search"
                  placeholder="Query system database..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 h-14 bg-slate-900/40 border-white/5 text-white rounded-2xl focus:border-blue-500/50 focus:ring-blue-500/10 transition-all duration-500 backdrop-blur-md placeholder:text-slate-600 font-medium"
                />
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-700" />
              </div>
              <Button className="gap-2 h-14 rounded-2xl border border-white/5 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white px-8 transition-all duration-300 font-bold uppercase text-[10px] tracking-widest">
                <Filter className="h-4 w-4" />
                Parameters
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <Button className="gap-2 h-14 rounded-2xl border border-white/5 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white px-8 transition-all duration-300 font-bold uppercase text-[10px] tracking-widest">
                <Download className="h-4 w-4" />
                Relay Data
              </Button>
              <Link to="/dashboard/new-audit">
                <Button className="gap-3 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white shadow-2xl shadow-blue-900/40 px-8 transition-all duration-300 group">
                  <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-500" />
                  <span className="font-bold uppercase text-xs tracking-wider">Initialize Scan</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Neural Archive Grid - Each Item is a Premium Card */}
          <div className="w-full pb-10">
            <div className="flex flex-col gap-6 w-full">
              {loading ? (
                <div className="py-40 text-center flex flex-col items-center glass-card rounded-[3rem] border border-white/5">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center animate-pulse">
                      <Globe className="w-8 h-8 text-blue-400" />
                    </div>
                    <div className="absolute inset-0 rounded-3xl border border-blue-500/40 animate-ping opacity-20"></div>
                  </div>
                  <h3 className="text-2xl font-black text-white premium-gradient-text uppercase tracking-tighter">Synchronizing Neural Archive</h3>
                  <p className="text-slate-500 font-medium mt-2">Accessing secure data nodes...</p>
                </div>
              ) : displayAudits.length > 0 ? (
                displayAudits.map((audit, idx) => (
                  <div
                    key={audit.id}
                    className="group relative transition-all duration-500 hover:-translate-y-1"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="relative glass-card border border-white/10 rounded-[2.5rem] p-5 lg:p-6 flex items-center gap-4 xl:gap-8 w-full h-[140px] shadow-2xl overflow-hidden min-w-[900px]">
                      {/* Progress Background */}
                      <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-blue-600/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                      {/* 1. Entity Identity (Icon + URL) */}
                      <div className="flex items-center gap-3 xl:gap-4 w-[200px] xl:w-[240px] flex-shrink-0 min-w-0">
                        <div className="relative flex-shrink-0">
                          <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center shadow-xl relative z-10 overflow-hidden group-hover:border-blue-500/40 transition-all duration-500">
                            <img
                              src={`https://www.google.com/s2/favicons?domain=${audit.url}&sz=128`}
                              alt=""
                              className="w-5 h-5 xl:w-6 xl:h-6 object-contain filter grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-80 group-hover:opacity-100"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://www.google.com/s2/favicons?domain=google.com&sz=128';
                                target.className = 'w-5 h-5 opacity-20 grayscale';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </div>
                        </div>

                        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                          <h3 className="text-sm xl:text-base font-black text-white truncate group-hover:text-blue-400 transition-colors tracking-tight">
                            {audit.url}
                          </h3>
                          <div className="flex items-center gap-1 text-[8px] xl:text-[9px] font-bold uppercase tracking-[0.1em]">
                            <span className="text-blue-400 truncate max-w-[80px] xl:max-w-[100px]">{audit.name || "Primary Probe"}</span>
                            <span className="text-slate-700">|</span>
                            <span className="text-slate-500">Archive</span>
                          </div>
                        </div>
                      </div>

                      {/* 2. Neural Index (Score) */}
                      <div className="flex flex-col items-center gap-2 px-4 border-l border-white/5 w-[90px] xl:w-[110px] flex-shrink-0">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">Score</span>
                        <div className="scale-85 xl:scale-95 group-hover:scale-105 transition-transform duration-700">
                          <ScoreCircle score={audit.overall_score || 0} size="sm" />
                        </div>
                      </div>

                      {/* 3. Temporal Data (Date) */}
                      <div className="hidden lg:flex flex-col gap-1 px-4 xl:px-8 border-l border-white/5 w-[110px] xl:w-[160px] flex-shrink-0">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Timestamp</span>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-white tracking-tight">
                            {new Date(audit.created_at).toLocaleDateString(undefined, { day: '2-digit', month: 'short' })}
                          </span>
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">
                            Cycle {new Date(audit.created_at).getFullYear()}
                          </span>
                        </div>
                      </div>

                      {/* 4. Delta Analysis (Issues) */}
                      <div className="flex-1 flex flex-col gap-2.5 px-4 xl:px-8 border-l border-white/5 min-w-[250px]">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Delta Analysis</span>
                        <div className="space-y-2.5 w-full">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[9px] font-bold">
                              <span className="text-red-400/80 uppercase tracking-widest">Critical Threats</span>
                              <span className="text-white bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20">{audit.critical_issues || 0}</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                                style={{ width: `${Math.min((audit.critical_issues || 0) * 10, 100)}%` }}
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[9px] font-bold">
                              <span className="text-amber-400/80 uppercase tracking-widest">System Warnings</span>
                              <span className="text-white bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">{audit.warning_issues || 0}</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                                style={{ width: `${Math.min((audit.warning_issues || 0) * 5, 100)}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 5. Protocol & Execution (Buttons) */}
                      <div className="flex items-center gap-2 xl:gap-4 pl-4 xl:pl-8 border-l border-white/5 flex-shrink-0 ml-auto mr-2">
                        <div className="hidden xl:flex flex-col items-end gap-1">
                          <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">Status</span>
                          <div className={cn(
                            "px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border flex items-center gap-2",
                            audit.status === "completed"
                              ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/20"
                              : "bg-blue-500/5 text-blue-400 border-blue-500/20"
                          )}>
                            {audit.status === "completed" ? "Verified" : "Active"}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <Link to={`/dashboard/audits/${audit.id}`} className="flex-shrink-0">
                            <Button className="h-8 xl:h-9 px-3 xl:px-4 rounded-xl bg-blue-600/10 border border-blue-500/30 hover:bg-blue-600 hover:text-white transition-all duration-300 text-blue-400 font-bold text-[8px] xl:text-[9px] uppercase tracking-widest shadow-lg whitespace-nowrap min-w-[80px] xl:min-w-[100px]">
                              View Data
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 xl:w-9 xl:h-9 rounded-xl bg-red-500/5 text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 shrink-0"
                            onClick={() => deleteAudit(audit.id)}
                          >
                            <Trash2 className="h-3 w-3 xl:h-3.5 xl:w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-40 text-center flex flex-col items-center glass-card rounded-[3rem] border border-white/5 mx-8">
                  <div className="w-24 h-24 bg-slate-900 rounded-[2.5rem] flex items-center justify-center mb-8 border border-white/5 relative group-hover:border-blue-500/30 transition-all duration-500 shadow-2xl">
                    <FileText className="h-10 w-10 text-slate-600 group-hover:text-blue-400 transition-colors" />
                    <div className="absolute inset-0 bg-blue-500/5 rounded-[2.5rem] blur-xl" />
                  </div>
                  <h3 className="text-3xl font-black text-white premium-gradient-text uppercase tracking-tighter mb-4">Neural Archive Empty</h3>
                  <p className="text-slate-500 mb-10 max-w-md mx-auto font-medium">No intelligence sequences found. Initialize your first comprehensive digital asset analysis.</p>
                  <Link to="/dashboard/new-audit">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-900/20">
                      Start Your First Audit
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllAudits;
