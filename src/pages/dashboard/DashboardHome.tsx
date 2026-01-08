
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ScoreCircle from "@/components/dashboard/ScoreCircle";
import { Button } from "@/components/ui/button";
import {
  FileText,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Plus,
  ExternalLink,
  Clock,
  BarChart3,
  Target,
  Zap,
  Activity,
  ArrowRight,
  Globe
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

const mockChartData = [
  { date: "Jan", score: 62, traffic: 4500 },
  { date: "Feb", score: 65, traffic: 5200 },
  { date: "Mar", score: 68, traffic: 4800 },
  { date: "Apr", score: 64, traffic: 6100 },
  { date: "May", score: 72, traffic: 5900 },
  { date: "Jun", score: 78, traffic: 7200 },
  { date: "Jul", score: 82, traffic: 8400 },
];

const DashboardHome = () => {
  const [audits, setAudits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Admin");

  useEffect(() => {
    const fetchDashboardData = async () => {
      // Fetch User Name
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.user_metadata?.full_name) {
        setUserName(user.user_metadata.full_name.split(' ')[0]);
      }

      // Fetch Audits
      const { data, error } = await supabase
        .from("audits")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (!error && data) {
        setAudits(data);
      }
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  const displayAudits = audits;

  return (
    <div className="min-h-screen text-slate-100 font-sans selection:bg-blue-500/30">
      <div className="relative z-10 p-6 md:p-8 space-y-8 max-w-[1600px] mx-auto">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 animate-fade-in-up">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
              <span className="premium-gradient-text text-glow">
                Dashboard
              </span>
            </h1>
            <p className="text-slate-400 text-lg font-medium">
              Welcome back, {userName}. Your system is running optimally.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-slate-300 border-white/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              System Online
            </div>
            <Link to="/dashboard/new-audit">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/20 px-4 h-9 text-[11px] font-black uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 border-none ring-offset-0">
                <Plus className="mr-1.5 h-3.5 w-3.5" />
                New Audit
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stat 1 */}
          <div className="glass-card rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
              <FileText className="w-24 h-24 text-blue-500" />
            </div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
                <FileText className="w-6 h-6" />
              </div>
              <span className="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                <TrendingUp className="w-3 h-3" /> +12%
              </span>
            </div>
            <div className="space-y-1 relative z-10">
              <h3 className="text-slate-400 text-sm font-medium">Total Audits</h3>
              <p className="text-3xl font-bold text-white tracking-tight">147</p>
            </div>
            <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[70%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="glass-card rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
              <Target className="w-24 h-24 text-purple-500" />
            </div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-400">
                <Target className="w-6 h-6" />
              </div>
              <span className="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                <TrendingUp className="w-3 h-3" /> +5
              </span>
            </div>
            <div className="space-y-1 relative z-10">
              <h3 className="text-slate-400 text-sm font-medium">Avg Score</h3>
              <p className="text-3xl font-bold text-white tracking-tight">72</p>
            </div>
            <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 w-[72%] rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="glass-card rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
              <AlertTriangle className="w-24 h-24 text-amber-500" />
            </div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-400">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <span className="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                <TrendingUp className="w-3 h-3 rotate-180" /> -8
              </span>
            </div>
            <div className="space-y-1 relative z-10">
              <h3 className="text-slate-400 text-sm font-medium">Critical Issues</h3>
              <p className="text-3xl font-bold text-white tracking-tight">23</p>
            </div>
            <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 w-[30%] rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="glass-card rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
              <DollarSign className="w-24 h-24 text-emerald-500" />
            </div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
                <DollarSign className="w-6 h-6" />
              </div>
              <span className="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                <TrendingUp className="w-3 h-3" /> +18%
              </span>
            </div>
            <div className="space-y-1 relative z-10">
              <h3 className="text-slate-400 text-sm font-medium">Potential Revenue</h3>
              <p className="text-3xl font-bold text-white tracking-tight">$24.5K</p>
            </div>
            <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[85%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* Chart Section */}
          <div className="xl:col-span-2 glass-card rounded-3xl p-8 animate-slide-in-left">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
                  <Activity className="w-5 h-5 text-blue-400" />
                  Audit Performance
                </h3>
                <p className="text-slate-400 text-sm">Real-time analysis trends over time</p>
              </div>
              <div className="flex bg-slate-800/50 p-1 rounded-xl border border-white/5">
                {['1W', '1M', '3M', '1Y'].map((period, i) => (
                  <button key={period} className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${i === 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                    {period}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis
                    dataKey="date"
                    stroke="#475569"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis
                    stroke="#475569"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dx={-10}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5)'
                    }}
                    itemStyle={{ color: '#e2e8f0' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorScore)"
                  />
                  <Area
                    type="monotone"
                    dataKey="traffic"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorTraffic)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Actions & AI Insight */}
          <div className="space-y-6">
            {/* AI Card */}
            <div className="glass-card rounded-3xl p-1 relative overflow-hidden group animate-slide-in-right">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="bg-slate-900/40 rounded-[22px] p-6 relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg shadow-purple-900/30">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <span className="bg-purple-500/10 text-purple-300 text-xs font-bold px-3 py-1 rounded-full border border-purple-500/20">
                    AI BETA
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">AI Insights</h3>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    Your latest audit suggests optimizing image formats. Potential 1.2s load time reduction detected.
                  </p>

                  <Link to="/dashboard/ai-features">
                    <button className="w-full group relative overflow-hidden rounded-xl bg-slate-800 p-[1px] transition-all duration-300 hover:bg-slate-700">
                      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-slate-950 px-4 py-3 text-sm font-medium text-white backdrop-blur-3xl transition-all group-hover:bg-slate-900">
                        Run AI Analysis <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent Quick List */}
            <div className="glass-card rounded-3xl p-6 animate-slide-in-right fill-mode-backwards" style={{ animationDelay: '100ms' }}>
              <h3 className="text-lg font-bold text-white mb-4">Latest Activity</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center relative">
                      <Globe className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900"></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">acme-corp.com</h4>
                      <p className="text-xs text-slate-500">2 hours ago</p>
                    </div>
                    <div className="text-right">
                      <span className="block text-sm font-bold text-emerald-400">92%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Audits Table Reimagined */}
        <div className="glass-card rounded-3xl overflow-hidden animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="p-8 border-b border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Recent Audits</h2>
              <p className="text-slate-400 text-sm">Detailed breakdown of your latest scans</p>
            </div>

            <div className="flex gap-3">
              <Button className="border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white rounded-xl h-10 px-4 transition-all">
                Export CSV
              </Button>
              <Link to="/dashboard/audits">
                <Button className="bg-slate-100 hover:bg-white text-slate-900 font-semibold">
                  View All
                </Button>
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="p-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">Project</th>
                  <th className="p-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="p-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">Health Score</th>
                  <th className="p-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">Issues</th>
                  <th className="p-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                  <th className="p-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {displayAudits.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center">
                      <div className="flex flex-col items-center justify-center opacity-50">
                        <FileText className="w-12 h-12 text-slate-600 mb-4" />
                        <p className="text-lg text-slate-400">No audits found yet</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  displayAudits.map((audit: any) => (
                    <tr key={audit.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-800 border-2 border-slate-700 p-2 flex items-center justify-center overflow-hidden shadow-lg group-hover:border-blue-500/50 transition-colors">
                            <img
                              src={`https://www.google.com/s2/favicons?domain=${audit.url}&sz=128`}
                              className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                              onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.2' }}
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-sm mb-1 group-hover:text-blue-400 transition-colors">{audit.url}</h4>
                            <span className="text-xs text-slate-500">Business Plan</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
                          Completed
                        </span>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="w-16">
                            <ScoreCircle score={audit.score || audit.overall_score || 0} size="sm" />
                          </div>
                          <span className="text-sm font-medium text-slate-400">Excellent</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((_, i) => (
                            <div key={i} className={`w-8 h-8 rounded-full border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white ${i === 0 ? 'bg-red-500' : i === 1 ? 'bg-amber-500' : 'bg-blue-500'} z-${3 - i}0 relative`}>
                              {i === 0 ? '2' : i === 1 ? '5' : '8'}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col text-sm text-slate-400">
                          <span className="font-medium text-slate-300">Oct 24, 2026</span>
                          <span className="text-xs text-slate-500">10:42 AM</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <Link to={`/dashboard/audits/${audit.id}`}>
                          <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white hover:bg-white/10">
                            Details <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardHome;
