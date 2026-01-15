
import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ScoreCircle from "@/components/dashboard/ScoreCircle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import {
  Plus,
  Target,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  Trash2,
  Search,
  Zap,
  Link2,
  FileText,
  Lightbulb,
  CheckCircle,
  XCircle,
  ArrowRight,
  BarChart3,
  Users,
  Building,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Realistic competitor mock data
const mockCompetitors = [
  {
    id: "1",
    name: "TechCorp Solutions",
    url: "techcorp.com",
    favicon: "🏢",
    overallScore: 78,
    seoScore: 82,
    speedScore: 71,
    backlinks: 15420,
    keywords: 2340,
    change: "+5",
    trend: "up",
  },
  {
    id: "2",
    name: "Digital Dynamics",
    url: "digitaldynamics.io",
    favicon: "🚀",
    overallScore: 85,
    seoScore: 88,
    speedScore: 79,
    backlinks: 28650,
    keywords: 4120,
    change: "+12",
    trend: "up",
  },
  {
    id: "3",
    name: "WebPro Agency",
    url: "webpro.agency",
    favicon: "🌐",
    overallScore: 72,
    seoScore: 68,
    speedScore: 82,
    backlinks: 8930,
    keywords: 1560,
    change: "-3",
    trend: "down",
  },
  {
    id: "4",
    name: "Growth Labs",
    url: "growthlabs.com",
    favicon: "📈",
    overallScore: 81,
    seoScore: 79,
    speedScore: 85,
    backlinks: 21340,
    keywords: 3280,
    change: "+8",
    trend: "up",
  },
  {
    id: "5",
    name: "Pixel Perfect",
    url: "pixelperfect.design",
    favicon: "🎨",
    overallScore: 69,
    seoScore: 65,
    speedScore: 74,
    backlinks: 5620,
    keywords: 890,
    change: "-1",
    trend: "down",
  },
];

// Your site data
const yourSite = {
  name: "Your Site",
  url: "yoursite.com",
  overallScore: 72,
  seoScore: 68,
  speedScore: 62,
  backlinks: 4500,
  keywords: 1200,
};

// Radar chart data
const radarData = [
  { metric: "SEO", you: 68, competitor1: 82, competitor2: 88 },
  { metric: "Speed", you: 62, competitor1: 71, competitor2: 79 },
  { metric: "UX", you: 65, competitor1: 75, competitor2: 82 },
  { metric: "Content", you: 71, competitor1: 78, competitor2: 85 },
  { metric: "Security", you: 80, competitor1: 85, competitor2: 88 },
];

// Feature comparison
const featureComparison = [
  { feature: "Mobile Responsive", you: true, competitors: [true, true, true] },
  { feature: "SSL Certificate", you: true, competitors: [true, true, true] },
  { feature: "Blog/Content Hub", you: false, competitors: [true, true, false] },
  { feature: "Live Chat", you: false, competitors: [true, false, true] },
  { feature: "Schema Markup", you: false, competitors: [true, true, true] },
  { feature: "CDN Enabled", you: true, competitors: [true, true, false] },
  { feature: "Image Optimization", you: false, competitors: [true, true, true] },
  { feature: "Core Web Vitals Pass", you: false, competitors: [false, true, true] },
];

// Insights
const insights = {
  competitorAdvantages: [
    "Higher domain authority and more backlinks",
    "Better Core Web Vitals scores",
    "More comprehensive content strategy",
    "Structured data implementation",
  ],
  yourAdvantages: [
    "Faster server response time (TTFB)",
    "Better security headers configuration",
    "Cleaner URL structure",
  ],
  quickWins: [
    { action: "Add structured data markup", impact: "+15% CTR", effort: "2-3 hours" },
    { action: "Optimize hero images", impact: "+20% speed", effort: "1-2 hours" },
    { action: "Create pillar content pages", impact: "+30% keywords", effort: "1-2 weeks" },
    { action: "Build 10 quality backlinks", impact: "+25% authority", effort: "2-4 weeks" },
  ],
};

const Competitors = () => {
  const [competitors, setCompetitors] = useState(mockCompetitors);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCompData, setNewCompData] = useState({ name: "", url: "" });
  const [isAdding, setIsAdding] = useState(false);

  const handleAddCompetitor = () => {
    if (!newCompData.name || !newCompData.url) {
      toast({
        title: "Missing Information",
        description: "Please enter both a name and a URL.",
        variant: "destructive",
      });
      return;
    }

    setIsAdding(true);

    // Simulate AI analysis delay
    setTimeout(() => {
      const newEntry = {
        id: (competitors.length + 1).toString(),
        name: newCompData.name,
        url: newCompData.url.replace(/https?:\/\//, ""),
        favicon: "🔍",
        overallScore: Math.floor(Math.random() * 30) + 60,
        seoScore: Math.floor(Math.random() * 30) + 60,
        speedScore: Math.floor(Math.random() * 30) + 60,
        backlinks: Math.floor(Math.random() * 10000) + 1000,
        keywords: Math.floor(Math.random() * 2000) + 500,
        change: "+1",
        trend: "up" as const,
      };

      setCompetitors([newEntry, ...competitors]);
      setNewCompData({ name: "", url: "" });
      setShowAddModal(false);
      setIsAdding(false);

      toast({
        title: "Competitor Added",
        description: `${newCompData.name} has been added to your tracking list.`,
      });
    }, 1500);
  };

  const handleDeleteCompetitor = (id: string) => {
    setCompetitors(competitors.filter(c => c.id !== id));
    toast({
      title: "Competitor Removed",
      description: "The competitor has been removed from your list.",
    });
  };

  return (
    <div className="min-h-screen text-slate-100 font-sans selection:bg-blue-500/30">
      <div className="relative z-10 w-full">
        <DashboardHeader
          title="Competitor Analysis"
          subtitle="Track and compare competitor performance with AI-powered insights"
        />

        <div className="p-8 max-w-[1600px] mx-auto animate-fade-in-up">
          {/* Header Actions */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 rounded-xl bg-slate-900/50 border border-white/10 flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-semibold text-slate-200">{competitors.length} competitors tracked</span>
              </div>
            </div>
            <Button
              onClick={() => setShowAddModal(true)}
              className="gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-900/20"
            >
              <Plus className="h-4 w-4" />
              Add Competitor
            </Button>
          </div>

          {/* Comparison Table */}
          <div className="glass-card border border-white/5 rounded-3xl overflow-hidden mb-8 shadow-2xl">
            <div className="p-6 border-b border-white/5">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                Market Landscape
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/[0.02] border-b border-white/5">
                  <tr>
                    <th className="text-left px-6 py-4 text-slate-400 text-xs uppercase tracking-wider font-semibold">Competitor</th>
                    <th className="text-center px-6 py-4 text-slate-400 text-xs uppercase tracking-wider font-semibold">Overall</th>
                    <th className="text-center px-6 py-4 text-slate-400 text-xs uppercase tracking-wider font-semibold">SEO</th>
                    <th className="text-center px-6 py-4 text-slate-400 text-xs uppercase tracking-wider font-semibold">Speed</th>
                    <th className="text-center px-6 py-4 text-slate-400 text-xs uppercase tracking-wider font-semibold">Backlinks</th>
                    <th className="text-center px-6 py-4 text-slate-400 text-xs uppercase tracking-wider font-semibold">Keywords</th>
                    <th className="text-center px-6 py-4 text-slate-400 text-xs uppercase tracking-wider font-semibold">Trend</th>
                    <th className="text-right px-6 py-4 text-slate-400 text-xs uppercase tracking-wider font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {/* Your Site Row */}
                  <tr className="bg-blue-600/5 border-l-4 border-l-blue-500">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-xl border border-blue-500/20">
                          ⭐
                        </div>
                        <div>
                          <p className="font-bold text-white">{yourSite.name}</p>
                          <p className="text-xs text-blue-300">You</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-center px-6 py-4">
                      <span className="inline-flex items-center justify-center w-10 h-8 rounded-lg bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/20">
                        {yourSite.overallScore}
                      </span>
                    </td>
                    <td className="text-center px-6 py-4 font-medium text-slate-300">{yourSite.seoScore}</td>
                    <td className="text-center px-6 py-4 font-medium text-slate-300">{yourSite.speedScore}</td>
                    <td className="text-center px-6 py-4 font-medium text-slate-300">{yourSite.backlinks.toLocaleString()}</td>
                    <td className="text-center px-6 py-4 font-medium text-slate-300">{yourSite.keywords.toLocaleString()}</td>
                    <td className="text-center px-6 py-4 text-slate-500">—</td>
                    <td className="text-right px-6 py-4 text-slate-500">—</td>
                  </tr>

                  {/* Competitor Rows */}
                  {competitors.map((comp) => (
                    <tr key={comp.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center text-lg shadow-sm">
                            {comp.favicon}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-200">{comp.name}</p>
                            <a
                              href={`https://${comp.url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                            >
                              {comp.url}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="text-center px-6 py-4">
                        <span className={cn(
                          "inline-flex items-center justify-center w-10 h-8 rounded-lg font-bold text-sm",
                          comp.overallScore >= yourSite.overallScore
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-slate-800 text-slate-400 border border-white/5"
                        )}>
                          {comp.overallScore}
                        </span>
                      </td>
                      <td className={cn("text-center px-6 py-4 font-medium", comp.seoScore > yourSite.seoScore ? "text-emerald-400" : "text-slate-400")}>{comp.seoScore}</td>
                      <td className={cn("text-center px-6 py-4 font-medium", comp.speedScore > yourSite.speedScore ? "text-emerald-400" : "text-slate-400")}>{comp.speedScore}</td>
                      <td className={cn("text-center px-6 py-4 font-medium", comp.backlinks > yourSite.backlinks ? "text-emerald-400" : "text-slate-400")}>{comp.backlinks.toLocaleString()}</td>
                      <td className={cn("text-center px-6 py-4 font-medium", comp.keywords > yourSite.keywords ? "text-emerald-400" : "text-slate-400")}>{comp.keywords.toLocaleString()}</td>
                      <td className="text-center px-6 py-4">
                        <span className={cn(
                          "flex items-center justify-center gap-1 font-medium text-xs",
                          comp.trend === "up" ? "text-emerald-400" : "text-red-400"
                        )}>
                          {comp.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {comp.change}
                        </span>
                      </td>
                      <td className="text-right px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10">
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-600 hover:text-red-400 hover:bg-red-500/10"
                            onClick={() => handleDeleteCompetitor(comp.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Radar Chart */}
            <div className="glass-card border border-white/5 rounded-3xl p-8 shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <Target className="h-5 w-5 text-purple-400" />
                <h3 className="font-bold text-white text-lg">Score Comparison</h3>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      name="Your Site"
                      dataKey="you"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.4}
                    />
                    <Radar
                      name="TechCorp"
                      dataKey="competitor1"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.2}
                    />
                    <Radar
                      name="Digital Dynamics"
                      dataKey="competitor2"
                      stroke="#a855f7"
                      fill="#a855f7"
                      fillOpacity={0.2}
                    />
                    <Legend wrapperStyle={{ color: '#cbd5e1' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Feature Comparison */}
            <div className="glass-card border border-white/5 rounded-3xl p-8 shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <FileText className="h-5 w-5 text-amber-400" />
                <h3 className="font-bold text-white text-lg">Feature Matrix</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left pb-4 text-xs font-semibold text-slate-400 uppercase">Feature</th>
                      <th className="text-center pb-4 text-xs font-semibold text-slate-400 uppercase">You</th>
                      <th className="text-center pb-4 text-xs font-semibold text-slate-400 uppercase">Avg</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {featureComparison.map((item) => {
                      const competitorHas = item.competitors.filter(Boolean).length;
                      return (
                        <tr key={item.feature}>
                          <td className="py-3 font-medium text-slate-200 text-sm">{item.feature}</td>
                          <td className="text-center py-3">
                            {item.you ? (
                              <CheckCircle className="h-5 w-5 text-emerald-500 mx-auto" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500/50 mx-auto" />
                            )}
                          </td>
                          <td className="text-center py-3 text-sm text-slate-500">
                            {competitorHas}/{item.competitors.length}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Insights Panel */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* What Competitors Do Better */}
            <div className="glass-card border border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl -mr-12 -mt-12 transition-colors group-hover:bg-red-500/20"></div>
              <h3 className="flex items-center gap-2 text-red-400 font-bold mb-4">
                <TrendingUp className="h-5 w-5" />
                Weaknesses
              </h3>
              <ul className="space-y-4">
                {insights.competitorAdvantages.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Your Advantages */}
            <div className="glass-card border border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl -mr-12 -mt-12 transition-colors group-hover:bg-emerald-500/20"></div>
              <h3 className="flex items-center gap-2 text-emerald-400 font-bold mb-4">
                <CheckCircle className="h-5 w-5" />
                Your Edge
              </h3>
              <ul className="space-y-4">
                {insights.yourAdvantages.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Wins */}
            <div className="glass-card border border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -mr-12 -mt-12 transition-colors group-hover:bg-blue-500/20"></div>
              <h3 className="flex items-center gap-2 text-blue-400 font-bold mb-4">
                <Lightbulb className="h-5 w-5" />
                Quick Wins
              </h3>
              <ul className="space-y-4">
                {insights.quickWins.map((item, i) => (
                  <li key={i} className="text-sm">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="font-medium text-slate-200">{item.action}</span>
                      <span className="shrink-0 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {item.impact}
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs">Est. effort: {item.effort}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Add Competitor Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="sm:max-w-[425px] bg-slate-950 border-white/10 text-white rounded-3xl p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Target className="h-6 w-6 text-blue-400" />
              Add Competitor
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="comp-name" className="text-sm font-semibold text-slate-400">Business Name</Label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input
                  id="comp-name"
                  placeholder="e.g. Acme Corp"
                  className="pl-10 bg-slate-900/50 border-white/10 text-white h-12 rounded-xl focus:border-blue-500/50"
                  value={newCompData.name}
                  onChange={(e) => setNewCompData({ ...newCompData, name: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comp-url" className="text-sm font-semibold text-slate-400">Website URL</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input
                  id="comp-url"
                  placeholder="acmecorp.com"
                  className="pl-10 bg-slate-900/50 border-white/10 text-white h-12 rounded-xl focus:border-blue-500/50"
                  value={newCompData.url}
                  onChange={(e) => setNewCompData({ ...newCompData, url: e.target.value })}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button
              variant="ghost"
              onClick={() => setShowAddModal(false)}
              className="text-slate-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddCompetitor}
              disabled={isAdding}
              className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-8 h-12 shadow-lg shadow-blue-900/20"
            >
              {isAdding ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Analyzing...
                </div>
              ) : (
                "Add to Tracking"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Competitors;
