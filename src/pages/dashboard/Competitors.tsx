import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ScoreCircle from "@/components/dashboard/ScoreCircle";
import { Button } from "@/components/ui/button";
import { Plus, Target, TrendingUp, TrendingDown } from "lucide-react";

const Competitors = () => {
  const competitors = [
    { name: "competitor1.com", score: 82, change: "+5", trend: "up" },
    { name: "competitor2.com", score: 75, change: "-2", trend: "down" },
    { name: "competitor3.com", score: 68, change: "+8", trend: "up" },
  ];

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Competitor Analysis" subtitle="Track and compare competitor performance" />
      <div className="p-8">
        <div className="flex justify-end mb-6">
          <Button className="gap-2"><Plus className="h-4 w-4" /> Add Competitor</Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {competitors.map((comp, i) => (
            <div key={i} className="bg-card border border-slate-200 rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-slate-600" />
              </div>
              <h3 className="font-semibold text-navy mb-4">{comp.name}</h3>
              <ScoreCircle score={comp.score} size="md" />
              <div className={`flex items-center justify-center gap-1 mt-4 text-sm font-medium ${comp.trend === "up" ? "text-success" : "text-danger"}`}>
                {comp.trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {comp.change} this month
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Competitors;
