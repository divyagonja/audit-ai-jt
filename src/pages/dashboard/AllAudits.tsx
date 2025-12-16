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
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
    <div className="min-h-screen">
      <DashboardHeader title="All Audits" subtitle="View and manage all your website audits" />

      <div className="p-8">
        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="search"
                placeholder="Search audits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-80 pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Link to="/dashboard/new-audit">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Audit
              </Button>
            </Link>
          </div>
        </div>

        {/* Audits Table */}
        <div className="bg-card border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-600">Loading audits...</div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Website
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Name
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
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {displayAudits.map((audit) => (
                  <tr key={audit.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                          <Globe className="h-5 w-5 text-slate-600" />
                        </div>
                        <a
                          href={`https://${audit.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-navy hover:text-primary flex items-center gap-1"
                        >
                          {audit.url}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {audit.name || "Untitled Audit"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {new Date(audit.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <ScoreCircle score={audit.overall_score || 0} size="sm" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-danger/10 text-danger text-xs font-medium rounded">
                          {audit.critical_issues || 0} critical
                        </span>
                        <span className="px-2 py-1 bg-warning/10 text-warning text-xs font-medium rounded">
                          {audit.warning_issues || 0} warnings
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        audit.status === "completed"
                          ? "bg-success/10 text-success"
                          : audit.status === "running"
                          ? "bg-primary/10 text-primary"
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        {audit.status || "completed"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link to={`/dashboard/audits/${audit.id}`}>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-slate-400 hover:text-danger"
                          onClick={() => deleteAudit(audit.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {displayAudits.length === 0 && !loading && (
            <div className="p-12 text-center">
              <Globe className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-navy mb-2">No audits yet</h3>
              <p className="text-slate-600 mb-6">Start your first website audit to see results here.</p>
              <Link to="/dashboard/new-audit">
                <Button>Start Your First Audit</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllAudits;
