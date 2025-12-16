import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ScoreCircle from "@/components/dashboard/ScoreCircle";
import { Globe, TrendingUp, Shield, Zap } from "lucide-react";

const DomainOverview = () => (
  <div className="min-h-screen">
    <DashboardHeader title="Domain Overview" subtitle="Overall health of your monitored domains" />
    <div className="p-8">
      <div className="bg-card border border-slate-200 rounded-xl p-8 text-center">
        <Globe className="h-16 w-16 text-primary mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-navy mb-2">example.com</h2>
        <p className="text-slate-600 mb-8">Last audited: Today</p>
        <div className="flex justify-center mb-8">
          <ScoreCircle score={72} size="lg" label="Overall Score" />
        </div>
        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          {[
            { icon: TrendingUp, label: "SEO", score: 68 },
            { icon: Zap, label: "Performance", score: 75 },
            { icon: Shield, label: "Security", score: 82 },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-slate-50 rounded-lg">
              <item.icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-sm text-slate-600">{item.label}</p>
              <p className="text-2xl font-bold text-navy">{item.score}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default DomainOverview;
