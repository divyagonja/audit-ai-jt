import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
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
  Award,
  Sparkles,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const mockChartData = [
  { date: "Jan", score: 62 },
  { date: "Feb", score: 65 },
  { date: "Mar", score: 68 },
  { date: "Apr", score: 64 },
  { date: "May", score: 72 },
  { date: "Jun", score: 78 },
  { date: "Jul", score: 82 },
];

const mockRecentAudits = [
  { id: "1", url: "acme.com", date: "2 hours ago", score: 78, issues: 12 },
  { id: "2", url: "example.org", date: "5 hours ago", score: 65, issues: 23 },
  { id: "3", url: "startup.io", date: "Yesterday", score: 82, issues: 8 },
  { id: "4", url: "enterprise.com", date: "2 days ago", score: 91, issues: 3 },
];

const DashboardHome = () => {
  const [audits, setAudits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAudits = async () => {
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

    fetchAudits();
  }, []);

  // Display only real audits. If none exist, the table will simply be empty or show a placeholder message.
  const displayAudits = audits;

  return (
    <div className="min-h-screen dashboard-bg">
      <div className="relative z-10">
        <DashboardHeader
          title="Executive Dashboard"
          subtitle="Performance analytics and insights at a glance"
        />

        <div className="p-8 space-y-8">
          {/* Stats Grid with Corporate Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Audits */}
            <div className="executive-card rounded-xl p-6 group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold">
                  <TrendingUp className="h-3 w-3" />
                  <span>+12%</span>
                </div>
              </div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Total Audits</h3>
              <p className="text-3xl font-bold text-slate-900 mb-1">147</p>
              <p className="text-xs text-slate-500">from last month</p>
            </div>

            {/* Avg Score */}
            <div className="executive-card rounded-xl p-6 group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-700 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold">
                  <TrendingUp className="h-3 w-3" />
                  <span>+5</span>
                </div>
              </div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Average Score</h3>
              <p className="text-3xl font-bold text-slate-900 mb-1">72</p>
              <p className="text-xs text-slate-500">points this week</p>
            </div>

            {/* Critical Issues */}
            <div className="executive-card rounded-xl p-6 group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-amber-600 to-amber-700 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold">
                  <TrendingUp className="h-3 w-3 rotate-180" />
                  <span>-8</span>
                </div>
              </div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Critical Issues</h3>
              <p className="text-3xl font-bold text-slate-900 mb-1">23</p>
              <p className="text-xs text-slate-500">from last week</p>
            </div>

            {/* Revenue Impact */}
            <div className="executive-card rounded-xl p-6 group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-700 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold">
                  <TrendingUp className="h-3 w-3" />
                  <span>+18%</span>
                </div>
              </div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Revenue Impact</h3>
              <p className="text-3xl font-bold text-slate-900 mb-1">$24.5K</p>
              <p className="text-xs text-slate-500">potential gain</p>
            </div>
          </div>

          {/* Charts & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Score Trend Chart */}
            <div className="lg:col-span-2 corporate-card rounded-xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    Performance Trend
                  </h3>
                  <p className="text-sm text-slate-500">Your audit scores over time</p>
                </div>
                <div className="flex gap-2">
                  {["7D", "30D", "90D"].map((period, idx) => (
                    <button
                      key={period}
                      className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${idx === 0
                        ? "bg-blue-600 text-white shadow-md hover:shadow-lg hover:bg-blue-700"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={mockChartData}>
                  <defs>
                    <linearGradient id="corporateScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={12} fontWeight={500} />
                  <YAxis stroke="#64748b" fontSize={12} fontWeight={500} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.98)",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    fill="url(#corporateScore)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Quick Actions */}
            <div className="corporate-card rounded-xl p-8 shadow-lg">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  Quick Actions
                </h3>
                <p className="text-sm text-slate-500">Get started quickly</p>
              </div>
              <div className="flex flex-col gap-4">
                <Link to="/dashboard/new-audit">
                  <button className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-3.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                    <div className="relative flex items-center justify-center gap-2">
                      <Plus className="h-5 w-5" />
                      <span>Start New Audit</span>
                    </div>
                  </button>
                </Link>
                <Link to="/dashboard/ai-features">
                  <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-5 py-3.5 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 shadow-md hover:shadow-lg shimmer">
                    <Sparkles className="h-5 w-5" />
                    <span>AI Features</span>
                  </button>
                </Link>
                <Link to="/dashboard/reports">
                  <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-3.5 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2">
                    <FileText className="h-5 w-5" />
                    <span>View Reports</span>
                  </button>
                </Link>
                <Link to="/dashboard/competitors">
                  <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-3.5 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Competitor Analysis</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Audits Table */}
          <div className="corporate-card rounded-xl shadow-lg overflow-hidden">
            <div className="p-8 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Recent Audits</h3>
                <p className="text-sm text-slate-500">Your latest website audits</p>
              </div>
              <Link to="/dashboard/audits">
                <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2">
                  <span>View All</span>
                  <ExternalLink className="h-4 w-4" />
                </button>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-8 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Website
                    </th>
                    <th className="text-left px-8 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="text-left px-8 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="text-left px-8 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Issues
                    </th>
                    <th className="text-left px-8 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {displayAudits.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                            <FileText className="h-6 w-6 text-slate-400" />
                          </div>
                          <p className="text-slate-900 font-medium mb-1">No audits yet</p>
                          <p className="text-slate-500 text-sm mb-4">Start your first website analysis to see results here.</p>
                          <Link to="/dashboard/new-audit">
                            <Button size="sm">Start Audit</Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    displayAudits.map((audit: any) => (
                      <tr key={audit.id} className="hover:bg-slate-50 transition-colors duration-150 group">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300 overflow-hidden">
                              <img
                                src={`https://www.google.com/s2/favicons?domain=${audit.url}&sz=128`}
                                alt=""
                                className="w-6 h-6 object-contain"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://www.google.com/s2/favicons?domain=google.com&sz=128';
                                  (e.target as HTMLImageElement).className = 'w-6 h-6 opacity-20 grayscale';
                                }}
                              />
                            </div>
                            <span className="font-semibold text-slate-900">{audit.url}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-slate-600">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-slate-400" />
                            <span className="text-sm">{audit.date || new Date(audit.created_at).toLocaleDateString()}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <ScoreCircle score={audit.score || audit.overall_score || 0} size="sm" />
                        </td>
                        <td className="px-8 py-5">
                          <span className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                            {audit.issues || (audit.critical_issues || 0) + (audit.warning_issues || 0)} issues
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <Link to={`/dashboard/audits/${audit.id}`}>
                            <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-all duration-200 hover:shadow-sm">
                              View Details
                            </button>
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
    </div>
  );
};

// Globe icon for the table
const Globe = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default DashboardHome;
