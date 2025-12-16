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

  const displayAudits = audits.length > 0 ? audits : mockRecentAudits;

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Dashboard" subtitle="Welcome back! Here's your performance overview." />

      <div className="p-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Audits"
            value="147"
            change="+12% from last month"
            trend="up"
            icon={<FileText className="h-6 w-6 text-primary" />}
          />
          <StatCard
            title="Avg Score"
            value="72"
            change="+5 points this week"
            trend="up"
            icon={<TrendingUp className="h-6 w-6 text-primary" />}
          />
          <StatCard
            title="Critical Issues"
            value="23"
            change="-8 from last week"
            trend="down"
            icon={<AlertTriangle className="h-6 w-6 text-warning" />}
          />
          <StatCard
            title="Revenue Impact"
            value="$24.5K"
            change="+18% potential gain"
            trend="up"
            icon={<DollarSign className="h-6 w-6 text-success" />}
          />
        </div>

        {/* Charts & Recent */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Score Trend Chart */}
          <div className="lg:col-span-2 bg-card border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-navy">Score Trend</h3>
              <div className="flex gap-2">
                {["7D", "30D", "90D"].map((period) => (
                  <button
                    key={period}
                    className="px-3 py-1.5 text-sm font-medium rounded-lg hover:bg-slate-100 text-slate-600 first:bg-primary first:text-white"
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={mockChartData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(214, 91%, 43%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(214, 91%, 43%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(214, 91%, 43%)"
                  strokeWidth={2}
                  fill="url(#colorScore)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Actions */}
          <div className="bg-card border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-navy mb-6">Quick Actions</h3>
            <div className="space-y-4">
              <Link to="/dashboard/new-audit">
                <Button className="w-full justify-start" size="lg">
                  <Plus className="h-5 w-5 mr-3" />
                  Start New Audit
                </Button>
              </Link>
              <Link to="/dashboard/reports">
                <Button variant="outline" className="w-full justify-start" size="lg">
                  <FileText className="h-5 w-5 mr-3" />
                  View Reports
                </Button>
              </Link>
              <Link to="/dashboard/competitors">
                <Button variant="outline" className="w-full justify-start" size="lg">
                  <TrendingUp className="h-5 w-5 mr-3" />
                  Competitor Analysis
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Audits Table */}
        <div className="bg-card border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-navy">Recent Audits</h3>
            <Link to="/dashboard/audits">
              <Button variant="ghost" size="sm">
                View All
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Website
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Issues
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {displayAudits.map((audit: any) => (
                  <tr key={audit.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center">
                          <Globe className="h-4 w-4 text-slate-600" />
                        </div>
                        <span className="font-medium text-navy">{audit.url}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {audit.date || new Date(audit.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <ScoreCircle score={audit.score || audit.overall_score || 0} size="sm" />
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-danger-light text-danger">
                        {audit.issues || (audit.critical_issues || 0) + (audit.warning_issues || 0)} issues
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/dashboard/audits/${audit.id}`}>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
