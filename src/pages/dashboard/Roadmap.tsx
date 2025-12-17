import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
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
  Search,
  Download,
  Mail,
  ExternalLink,
  FileText,
  Eye,
  Star,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

// Realistic mock data for roadmap
const mockRoadmapData = {
  phases: [
    {
      id: 1,
      title: "Days 1-30: Quick Wins",
      subtitle: "Critical fixes and high-impact improvements",
      color: "emerald",
      colorClasses: {
        bg: "bg-emerald-500",
        bgLight: "bg-emerald-50",
        text: "text-emerald-600",
        border: "border-emerald-500",
      },
      totalTasks: 8,
      completedTasks: 3,
      revenueImpact: 4200,
      roi: 340,
      weeks: [
        {
          week: 1,
          title: "Week 1: Foundation",
          tasks: [
            {
              id: "t1",
              title: "Fix missing meta descriptions on 15 pages",
              description: "Add unique, compelling meta descriptions to improve CTR from search results",
              category: "SEO",
              time: "2-3 hours",
              difficulty: 2,
              impact: "+$1,200/mo",
              completed: true,
            },
            {
              id: "t2",
              title: "Implement Content Security Policy",
              description: "Add CSP headers to protect against XSS attacks",
              category: "Security",
              time: "2-4 hours",
              difficulty: 3,
              impact: "+$800/mo",
              completed: true,
            },
            {
              id: "t3",
              title: "Fix duplicate H1 tags on 8 pages",
              description: "Ensure each page has exactly one unique H1 heading",
              category: "SEO",
              time: "1-2 hours",
              difficulty: 2,
              impact: "+$600/mo",
              completed: true,
            },
          ],
        },
        {
          week: 2,
          title: "Week 2: Performance",
          tasks: [
            {
              id: "t4",
              title: "Optimize LCP (Large Contentful Paint)",
              description: "Reduce LCP from 4.2s to under 2.5s through image optimization and preloading",
              category: "Performance",
              time: "4-6 hours",
              difficulty: 4,
              impact: "+$3,500/mo",
              completed: false,
            },
            {
              id: "t5",
              title: "Defer render-blocking JavaScript",
              description: "Add defer/async attributes to non-critical scripts",
              category: "Performance",
              time: "2-3 hours",
              difficulty: 3,
              impact: "+$1,100/mo",
              completed: false,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Days 31-60: Growth",
      subtitle: "Conversion optimization and user experience",
      color: "blue",
      colorClasses: {
        bg: "bg-blue-500",
        bgLight: "bg-blue-50",
        text: "text-blue-600",
        border: "border-blue-500",
      },
      totalTasks: 7,
      completedTasks: 0,
      revenueImpact: 3150,
      roi: 280,
      weeks: [
        {
          week: 3,
          title: "Week 3: UX Improvements",
          tasks: [
            {
              id: "t6",
              title: "Increase mobile tap target sizes",
              description: "Ensure all interactive elements meet 48x48px minimum",
              category: "UX",
              time: "1-2 hours",
              difficulty: 2,
              impact: "+$950/mo",
              completed: false,
            },
            {
              id: "t7",
              title: "Add alt text to 34 images",
              description: "Write descriptive alt text for accessibility and SEO",
              category: "Content",
              time: "2-3 hours",
              difficulty: 2,
              impact: "+$650/mo",
              completed: false,
            },
            {
              id: "t8",
              title: "Enable HSTS header",
              description: "Protect users from protocol downgrade attacks",
              category: "Security",
              time: "30 min",
              difficulty: 2,
              impact: "+$400/mo",
              completed: false,
            },
          ],
        },
        {
          week: 4,
          title: "Week 4: Link Health",
          tasks: [
            {
              id: "t9",
              title: "Fix 12 broken internal links",
              description: "Update or redirect broken internal links",
              category: "SEO",
              time: "1-2 hours",
              difficulty: 2,
              impact: "+$720/mo",
              completed: false,
            },
            {
              id: "t10",
              title: "Implement lazy loading for images",
              description: "Add native lazy loading for below-fold images",
              category: "Performance",
              time: "1 hour",
              difficulty: 1,
              impact: "+$450/mo",
              completed: false,
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Days 61-90: Scale",
      subtitle: "Long-term optimization and content strategy",
      color: "purple",
      colorClasses: {
        bg: "bg-purple-500",
        bgLight: "bg-purple-50",
        text: "text-purple-600",
        border: "border-purple-500",
      },
      totalTasks: 5,
      completedTasks: 0,
      revenueImpact: 2100,
      roi: 220,
      weeks: [
        {
          week: 5,
          title: "Week 5-6: Optimization",
          tasks: [
            {
              id: "t11",
              title: "Enable Gzip/Brotli compression",
              description: "Reduce transfer sizes by 40% with text compression",
              category: "Performance",
              time: "30 min",
              difficulty: 1,
              impact: "+$380/mo",
              completed: false,
            },
            {
              id: "t12",
              title: "Expand thin content on 5 pages",
              description: "Add valuable content to pages with under 300 words",
              category: "Content",
              time: "4-6 hours",
              difficulty: 3,
              impact: "+$320/mo",
              completed: false,
            },
          ],
        },
        {
          week: 6,
          title: "Week 7-8: Advanced",
          tasks: [
            {
              id: "t13",
              title: "Implement structured data markup",
              description: "Add JSON-LD schema for rich search results",
              category: "SEO",
              time: "3-4 hours",
              difficulty: 3,
              impact: "+$580/mo",
              completed: false,
            },
            {
              id: "t14",
              title: "Set up Core Web Vitals monitoring",
              description: "Implement RUM to track performance metrics",
              category: "Performance",
              time: "2-3 hours",
              difficulty: 3,
              impact: "+$420/mo",
              completed: false,
            },
            {
              id: "t15",
              title: "Create XML sitemap and submit to GSC",
              description: "Ensure all important pages are indexed",
              category: "SEO",
              time: "1-2 hours",
              difficulty: 2,
              impact: "+$400/mo",
              completed: false,
            },
          ],
        },
      ],
    },
  ],
};

const categoryIcons: Record<string, typeof Search> = {
  SEO: Search,
  Performance: Zap,
  Security: Shield,
  UX: Eye,
  Content: FileText,
};

const Roadmap = () => {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({
    t1: true,
    t2: true,
    t3: true,
  });

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const phases = mockRoadmapData.phases;
  const totalRevenue = phases.reduce((acc, phase) => acc + phase.revenueImpact, 0);
  const totalTasks = phases.reduce((acc, phase) => acc + phase.totalTasks, 0);
  const completedCount = Object.values(completedTasks).filter(Boolean).length;

  const filteredPhases = selectedPhase 
    ? phases.filter(p => p.id === selectedPhase)
    : phases;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-background border-b border-slate-200 py-8 px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">30/60/90 Day Action Roadmap</h1>
            <p className="text-muted-foreground mt-1">Prioritized action plan based on your audit results</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button variant="outline" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              Export to Jira
            </Button>
            <Button variant="outline" className="gap-2">
              <Mail className="h-4 w-4" />
              Email Report
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-8">
        {/* Phase Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {phases.map((phase) => {
            const phaseCompleted = phase.weeks.flatMap(w => w.tasks).filter(t => completedTasks[t.id]).length;
            const progress = (phaseCompleted / phase.totalTasks) * 100;
            
            return (
              <Card 
                key={phase.id} 
                className={cn(
                  "relative overflow-hidden cursor-pointer transition-all hover:shadow-lg",
                  selectedPhase === phase.id && "ring-2 ring-primary"
                )}
                onClick={() => setSelectedPhase(selectedPhase === phase.id ? null : phase.id)}
              >
                <div className={cn("absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white", phase.colorClasses.bg)}>
                  Phase {phase.id}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg pr-20">{phase.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{phase.subtitle}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4" />
                    {phase.totalTasks} tasks
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Revenue Impact</p>
                    <p className={cn("text-3xl font-bold", phase.colorClasses.text)}>
                      +${phase.revenueImpact.toLocaleString()}/mo
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{phaseCompleted} of {phase.totalTasks} completed</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Timeline View */}
        <div className="space-y-8">
          {filteredPhases.map((phase) => (
            <div key={phase.id}>
              {/* Phase Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg", phase.colorClasses.bg)}>
                  {phase.id}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-foreground">{phase.title}</h2>
                  <p className="text-muted-foreground">{phase.subtitle}</p>
                </div>
                <Badge variant="outline" className="text-sm">
                  {phase.totalTasks} tasks • {phase.roi}% ROI
                </Badge>
              </div>

              {/* Weeks */}
              <div className="ml-6 space-y-6">
                {phase.weeks.map((week) => (
                  <div key={week.week} className="relative">
                    {/* Week Header */}
                    <div className={cn("rounded-lg px-4 py-2 mb-4", phase.colorClasses.bgLight)}>
                      <h3 className={cn("font-semibold", phase.colorClasses.text)}>{week.title}</h3>
                    </div>

                    {/* Tasks */}
                    <div className="space-y-3 pl-4 border-l-2 border-slate-200">
                      {week.tasks.map((task) => {
                        const Icon = categoryIcons[task.category] || FileText;
                        const isCompleted = completedTasks[task.id];
                        
                        return (
                          <Card key={task.id} className={cn(
                            "relative ml-4 transition-all",
                            isCompleted && "opacity-60"
                          )}>
                            <div className="absolute -left-[25px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-background border-2 border-slate-300" />
                            <CardContent className="p-4">
                              <div className="flex items-start gap-4">
                                <Checkbox
                                  checked={isCompleted}
                                  onCheckedChange={() => toggleTask(task.id)}
                                  className="mt-1"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-4">
                                    <div>
                                      <h4 className={cn(
                                        "font-semibold text-foreground",
                                        isCompleted && "line-through"
                                      )}>
                                        {task.title}
                                      </h4>
                                      <p className="text-sm text-muted-foreground mt-1">
                                        {task.description}
                                      </p>
                                    </div>
                                    <div className="text-right shrink-0">
                                      <p className="font-semibold text-emerald-600">{task.impact}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-4 mt-3">
                                    <Badge variant="outline" className="gap-1">
                                      <Icon className="h-3 w-3" />
                                      {task.category}
                                    </Badge>
                                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                      <Clock className="h-3 w-3" />
                                      {task.time}
                                    </span>
                                    <span className="flex items-center gap-0.5">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                          key={star}
                                          className={cn(
                                            "h-3 w-3",
                                            star <= task.difficulty 
                                              ? "text-amber-400 fill-amber-400" 
                                              : "text-slate-300"
                                          )}
                                        />
                                      ))}
                                    </span>
                                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 ml-auto">
                                      View Details
                                      <ArrowRight className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Phase Impact Summary */}
                <Card className={cn("ml-4", phase.colorClasses.bgLight)}>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Expected Revenue</p>
                        <p className={cn("text-xl font-bold", phase.colorClasses.text)}>
                          +${phase.revenueImpact.toLocaleString()}/mo
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Tasks</p>
                        <p className="text-xl font-bold text-foreground">{phase.totalTasks}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Est. Time</p>
                        <p className="text-xl font-bold text-foreground">
                          {phase.id === 1 ? "15-20h" : phase.id === 2 ? "10-15h" : "12-18h"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">ROI</p>
                        <p className={cn("text-xl font-bold", phase.colorClasses.text)}>{phase.roi}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* Total Summary */}
        <Card className="mt-8 bg-gradient-to-r from-primary/5 to-transparent border-primary/20">
          <CardContent className="p-6">
            <div className="grid grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Revenue Impact</p>
                <p className="text-3xl font-bold text-primary">+${totalRevenue.toLocaleString()}/mo</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Tasks</p>
                <p className="text-3xl font-bold text-foreground">{totalTasks}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Completed</p>
                <p className="text-3xl font-bold text-emerald-600">{completedCount}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">12-Month ROI</p>
                <p className="text-3xl font-bold text-primary">1,240%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Roadmap;
