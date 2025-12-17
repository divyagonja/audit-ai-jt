import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ScoreCircle from "@/components/dashboard/ScoreCircle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCompetitor, setNewCompetitor] = useState("");

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader 
        title="Competitor Analysis" 
        subtitle="Track and compare competitor performance with AI-powered insights" 
      />
      
      <div className="p-8">
        {/* Header Actions */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="gap-1">
              <Target className="h-3 w-3" />
              {mockCompetitors.length} competitors tracked
            </Badge>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Competitor
          </Button>
        </div>

        {/* Comparison Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Competitor Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Competitor</TableHead>
                  <TableHead className="text-center">Overall Score</TableHead>
                  <TableHead className="text-center">SEO Score</TableHead>
                  <TableHead className="text-center">Speed Score</TableHead>
                  <TableHead className="text-center">Backlinks</TableHead>
                  <TableHead className="text-center">Keywords</TableHead>
                  <TableHead className="text-center">Change</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Your Site Row */}
                <TableRow className="bg-primary/5 border-l-4 border-l-primary">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-lg">
                        ⭐
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{yourSite.name}</p>
                        <p className="text-sm text-muted-foreground">{yourSite.url}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="font-bold">{yourSite.overallScore}</Badge>
                  </TableCell>
                  <TableCell className="text-center">{yourSite.seoScore}</TableCell>
                  <TableCell className="text-center">{yourSite.speedScore}</TableCell>
                  <TableCell className="text-center">{yourSite.backlinks.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{yourSite.keywords.toLocaleString()}</TableCell>
                  <TableCell className="text-center">—</TableCell>
                  <TableCell className="text-right">—</TableCell>
                </TableRow>
                
                {/* Competitor Rows */}
                {mockCompetitors.map((comp) => (
                  <TableRow key={comp.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-lg">
                          {comp.favicon}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{comp.name}</p>
                          <a 
                            href={`https://${comp.url}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                          >
                            {comp.url}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        variant={comp.overallScore >= yourSite.overallScore ? "default" : "secondary"}
                        className={cn(
                          comp.overallScore >= yourSite.overallScore 
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" 
                            : ""
                        )}
                      >
                        {comp.overallScore}
                      </Badge>
                    </TableCell>
                    <TableCell className={cn(
                      "text-center font-medium",
                      comp.seoScore > yourSite.seoScore ? "text-emerald-600" : "text-foreground"
                    )}>
                      {comp.seoScore}
                    </TableCell>
                    <TableCell className={cn(
                      "text-center font-medium",
                      comp.speedScore > yourSite.speedScore ? "text-emerald-600" : "text-foreground"
                    )}>
                      {comp.speedScore}
                    </TableCell>
                    <TableCell className={cn(
                      "text-center font-medium",
                      comp.backlinks > yourSite.backlinks ? "text-emerald-600" : "text-foreground"
                    )}>
                      {comp.backlinks.toLocaleString()}
                    </TableCell>
                    <TableCell className={cn(
                      "text-center font-medium",
                      comp.keywords > yourSite.keywords ? "text-emerald-600" : "text-foreground"
                    )}>
                      {comp.keywords.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={cn(
                        "flex items-center justify-center gap-1 font-medium",
                        comp.trend === "up" ? "text-emerald-600" : "text-red-600"
                      )}>
                        {comp.trend === "up" ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        {comp.change}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Radar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Score Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Your Site"
                    dataKey="you"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
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
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.2}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Feature Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Feature Comparison Matrix
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Feature</TableHead>
                    <TableHead className="text-center">You</TableHead>
                    <TableHead className="text-center">Avg</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {featureComparison.map((item) => {
                    const competitorHas = item.competitors.filter(Boolean).length;
                    return (
                      <TableRow key={item.feature}>
                        <TableCell className="font-medium">{item.feature}</TableCell>
                        <TableCell className="text-center">
                          {item.you ? (
                            <CheckCircle className="h-5 w-5 text-emerald-600 mx-auto" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-400 mx-auto" />
                          )}
                        </TableCell>
                        <TableCell className="text-center text-sm text-muted-foreground">
                          {competitorHas}/{item.competitors.length}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Insights Panel */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* What Competitors Do Better */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <TrendingUp className="h-5 w-5" />
                What Competitors Do Better
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {insights.competitorAdvantages.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Your Advantages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-600">
                <CheckCircle className="h-5 w-5" />
                Your Advantages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {insights.yourAdvantages.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Quick Wins */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Lightbulb className="h-5 w-5" />
                Quick Wins to Close Gaps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {insights.quickWins.map((item, i) => (
                  <li key={i} className="text-sm">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-medium">{item.action}</span>
                      <Badge variant="secondary" className="shrink-0 text-emerald-700 bg-emerald-100">
                        {item.impact}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-xs mt-1">Est. effort: {item.effort}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Competitors;
