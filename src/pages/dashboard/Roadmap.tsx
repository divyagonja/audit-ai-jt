import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  Circle, 
  ArrowRight,
  TrendingUp,
  Zap,
  Shield,
  Search
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  category: string;
  severity: string;
  status: "pending" | "in_progress" | "completed";
  estimatedTime: string;
  revenueImpact: string;
  phase: number;
}

const categoryIcons: Record<string, typeof Search> = {
  seo: Search,
  performance: Zap,
  security: Shield,
  ux: TrendingUp,
};

const Roadmap = () => {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);

  const { data: issues, isLoading } = useQuery({
    queryKey: ["roadmap-issues"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data: audits } = await supabase
        .from("audits")
        .select("id")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1);

      if (!audits?.length) return [];

      const { data: issueData } = await supabase
        .from("audit_issues")
        .select("*")
        .eq("audit_id", audits[0].id)
        .order("severity", { ascending: true });

      return issueData || [];
    },
  });

  // Group issues into phases based on severity
  const roadmapItems: RoadmapItem[] = (issues || []).map((issue: any, index: number) => {
    const severityPhase: Record<string, number> = {
      critical: 1,
      high: 1,
      medium: 2,
      low: 3,
    };
    
    const timeEstimates: Record<string, string> = {
      critical: "2-4 hours",
      high: "4-8 hours",
      medium: "1-2 days",
      low: "2-5 days",
    };

    const revenueEstimates: Record<string, string> = {
      critical: "+$2,500/month",
      high: "+$1,200/month",
      medium: "+$500/month",
      low: "+$200/month",
    };

    return {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      category: issue.category,
      severity: issue.severity,
      status: "pending" as const,
      estimatedTime: timeEstimates[issue.severity] || "1-2 days",
      revenueImpact: revenueEstimates[issue.severity] || "+$500/month",
      phase: severityPhase[issue.severity] || 2,
    };
  });

  const phases = [
    { 
      number: 1, 
      title: "Critical Fixes", 
      subtitle: "Immediate action required",
      color: "bg-destructive",
      items: roadmapItems.filter(i => i.phase === 1)
    },
    { 
      number: 2, 
      title: "High Impact", 
      subtitle: "Major improvements",
      color: "bg-warning",
      items: roadmapItems.filter(i => i.phase === 2)
    },
    { 
      number: 3, 
      title: "Optimization", 
      subtitle: "Polish and refine",
      color: "bg-success",
      items: roadmapItems.filter(i => i.phase === 3)
    },
  ];

  const totalRevenue = roadmapItems.reduce((acc, item) => {
    const match = item.revenueImpact.match(/\$([0-9,]+)/);
    return acc + (match ? parseInt(match[1].replace(",", "")) : 0);
  }, 0);

  const filteredPhases = selectedPhase 
    ? phases.filter(p => p.number === selectedPhase)
    : phases;

  return (
    <div className="min-h-screen">
      <DashboardHeader 
        title="Improvement Roadmap" 
        subtitle="Prioritized action plan based on your audit results" 
      />
      
      <div className="p-8">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Critical Issues</p>
                  <p className="text-2xl font-bold">{phases[0].items.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Items</p>
                  <p className="text-2xl font-bold">{roadmapItems.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Est. Revenue Impact</p>
                  <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}/mo</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Time</p>
                  <p className="text-2xl font-bold">2-3 weeks</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Phase Filter */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={selectedPhase === null ? "default" : "outline"}
            onClick={() => setSelectedPhase(null)}
            size="sm"
          >
            All Phases
          </Button>
          {phases.map((phase) => (
            <Button
              key={phase.number}
              variant={selectedPhase === phase.number ? "default" : "outline"}
              onClick={() => setSelectedPhase(phase.number)}
              size="sm"
              className="gap-2"
            >
              <span className={cn("w-2 h-2 rounded-full", phase.color)} />
              Phase {phase.number}
            </Button>
          ))}
        </div>

        {/* Timeline */}
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading roadmap...
          </div>
        ) : roadmapItems.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Roadmap Items Yet</h3>
              <p className="text-muted-foreground mb-4">
                Run an audit to generate your improvement roadmap
              </p>
              <Button asChild>
                <a href="/dashboard/new-audit">Start New Audit</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {filteredPhases.map((phase) => (
              <div key={phase.number}>
                <div className="flex items-center gap-4 mb-4">
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white font-bold", phase.color)}>
                    {phase.number}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{phase.title}</h3>
                    <p className="text-sm text-muted-foreground">{phase.subtitle}</p>
                  </div>
                  <Badge variant="outline" className="ml-auto">
                    {phase.items.length} items
                  </Badge>
                </div>

                <div className="ml-5 border-l-2 border-border pl-8 space-y-4">
                  {phase.items.map((item, index) => {
                    const IconComponent = categoryIcons[item.category] || Search;
                    return (
                      <Card key={item.id} className="relative">
                        <div className="absolute -left-[41px] top-6 w-4 h-4 rounded-full bg-background border-2 border-border" />
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "w-8 h-8 rounded-lg flex items-center justify-center",
                                item.severity === "critical" ? "bg-destructive/10" :
                                item.severity === "high" ? "bg-warning/10" :
                                "bg-muted"
                              )}>
                                <IconComponent className={cn(
                                  "h-4 w-4",
                                  item.severity === "critical" ? "text-destructive" :
                                  item.severity === "high" ? "text-warning" :
                                  "text-muted-foreground"
                                )} />
                              </div>
                              <div>
                                <CardTitle className="text-base">{item.title}</CardTitle>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline" className="text-xs capitalize">
                                    {item.category}
                                  </Badge>
                                  <Badge 
                                    variant={item.severity === "critical" ? "destructive" : "secondary"}
                                    className="text-xs capitalize"
                                  >
                                    {item.severity}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-success">{item.revenueImpact}</p>
                              <p className="text-xs text-muted-foreground">{item.estimatedTime}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              {item.status === "completed" ? (
                                <CheckCircle2 className="h-4 w-4 text-success" />
                              ) : (
                                <Circle className="h-4 w-4" />
                              )}
                              <span className="capitalize">{item.status.replace("_", " ")}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="gap-1">
                              View Details <ArrowRight className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Roadmap;
