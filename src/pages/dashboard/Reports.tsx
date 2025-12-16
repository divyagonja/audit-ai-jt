import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Download, FileText, Calendar, TrendingUp } from "lucide-react";

const Reports = () => {
  const reports = [
    { name: "Monthly Performance Report", date: "Dec 2024", type: "Performance" },
    { name: "SEO Analysis Summary", date: "Dec 2024", type: "SEO" },
    { name: "Competitor Comparison", date: "Nov 2024", type: "Competitors" },
    { name: "Security Audit Report", date: "Nov 2024", type: "Security" },
  ];

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Reports" subtitle="View and download your audit reports" />
      <div className="p-8">
        <div className="grid gap-4">
          {reports.map((report, i) => (
            <div key={i} className="bg-card border border-slate-200 rounded-xl p-6 flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy">{report.name}</h3>
                  <p className="text-sm text-slate-600 flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> {report.date} • {report.type}
                  </p>
                </div>
              </div>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" /> Download
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
