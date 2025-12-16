import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ScoreCircle from "@/components/dashboard/ScoreCircle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Download,
  Share2,
  RefreshCw,
  Search,
  Zap,
  Eye,
  FileText,
  Lock,
  ChevronDown,
  ChevronUp,
  Copy,
  CheckCircle,
  Clock,
  TrendingUp,
  DollarSign,
  Star,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const mockIssues = [
  {
    id: "1",
    category: "SEO",
    severity: "critical",
    title: "Missing Meta Description",
    description: "The page is missing a meta description which affects search engine visibility.",
    impact: "Reduced click-through rate from search results by up to 30%",
    currentScore: 62,
    potentialScore: 78,
    revenueImpact: 1200,
    difficulty: 2,
    timeEstimate: "30 min",
    fixCode: `<meta name="description" content="Your compelling meta description here. Keep it under 160 characters for optimal display in search results." />`,
    fixSteps: [
      "Open your HTML head section",
      "Add the meta description tag with your content",
      "Ensure description is between 120-160 characters",
      "Include your primary keyword naturally",
    ],
  },
  {
    id: "2",
    category: "Performance",
    severity: "critical",
    title: "Large Contentful Paint (LCP) Too Slow",
    description: "Your LCP is 4.2s, which exceeds the recommended 2.5s threshold.",
    impact: "53% of mobile users abandon pages that take over 3 seconds to load",
    currentScore: 45,
    potentialScore: 85,
    revenueImpact: 3500,
    difficulty: 4,
    timeEstimate: "3-4 hours",
    fixCode: `// Preload critical images
<link rel="preload" as="image" href="/hero-image.webp" />

// Use modern image formats
<picture>
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Description" loading="eager" />
</picture>`,
    fixSteps: [
      "Identify your LCP element using Chrome DevTools",
      "Optimize and compress the LCP image",
      "Add preload hints for critical resources",
      "Consider using a CDN for faster delivery",
    ],
  },
  {
    id: "3",
    category: "Security",
    severity: "warning",
    title: "Missing Content Security Policy",
    description: "No CSP header detected, increasing risk of XSS attacks.",
    impact: "Potential vulnerability to cross-site scripting attacks",
    currentScore: 70,
    potentialScore: 95,
    revenueImpact: 800,
    difficulty: 3,
    timeEstimate: "1-2 hours",
    fixCode: `Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;`,
    fixSteps: [
      "Audit your current script and style sources",
      "Create a CSP policy starting with report-only mode",
      "Test thoroughly before enforcing",
      "Monitor CSP violation reports",
    ],
  },
];

const categoryIcons: Record<string, React.ElementType> = {
  SEO: Search,
  Performance: Zap,
  UX: Eye,
  Content: FileText,
  Security: Lock,
};

const AuditResults = () => {
  const { id } = useParams();
  const [audit, setAudit] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [expandedIssue, setExpandedIssue] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    const fetchAudit = async () => {
      const { data, error } = await supabase
        .from("audits")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (data) {
        setAudit(data);
      } else {
        // Use mock data
        setAudit({
          id,
          url: "example.com",
          overall_score: 72,
          seo_score: 68,
          performance_score: 65,
          ux_score: 78,
          content_score: 75,
          security_score: 70,
          critical_issues: 5,
          warning_issues: 12,
          revenue_impact: 24500,
        });
      }
      setLoading(false);
    };

    fetchAudit();
  }, [id]);

  const copyCode = (code: string, issueId: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(issueId);
    toast({ title: "Code copied!", description: "The fix code has been copied to your clipboard." });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-slate-600">Loading audit results...</div>
      </div>
    );
  }

  const categories = [
    { key: "seo", label: "SEO", score: audit?.seo_score || 68, icon: Search },
    { key: "performance", label: "Performance", score: audit?.performance_score || 65, icon: Zap },
    { key: "ux", label: "UX", score: audit?.ux_score || 78, icon: Eye },
    { key: "content", label: "Content", score: audit?.content_score || 75, icon: FileText },
    { key: "security", label: "Security", score: audit?.security_score || 70, icon: Lock },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-background border-b border-slate-200 py-8 px-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
              <Link to="/dashboard/audits" className="hover:text-primary">Audits</Link>
              <span>/</span>
              <span>{audit?.url}</span>
            </div>
            <h1 className="text-2xl font-bold text-navy">{audit?.url}</h1>
            <p className="text-slate-600 mt-1">Completed on {new Date().toLocaleDateString()}</p>
          </div>

          <ScoreCircle score={audit?.overall_score || 72} size="lg" label="Overall" />

          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Re-audit
            </Button>
          </div>
        </div>
      </div>

      {/* Category Scores */}
      <div className="bg-slate-50 border-b border-slate-200 py-6 px-8">
        <div className="grid grid-cols-5 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.key}
              className="bg-card border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <cat.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="font-medium text-navy">{cat.label}</span>
              </div>
              <ScoreCircle score={cat.score} size="sm" />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Issues List */}
          <div className="col-span-2 space-y-6">
            {/* Critical Issues */}
            <div className="bg-card border-l-4 border-danger rounded-r-xl overflow-hidden">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-danger/10 flex items-center justify-center">
                    <span className="text-danger font-bold">!</span>
                  </div>
                  <h3 className="text-lg font-semibold text-navy">Critical Issues</h3>
                </div>
                <span className="px-3 py-1 bg-danger/10 text-danger text-sm font-semibold rounded-full">
                  {audit?.critical_issues || 5}
                </span>
              </div>

              <div className="divide-y divide-slate-200">
                {mockIssues.filter(i => i.severity === "critical").map((issue) => (
                  <div key={issue.id} className="p-6">
                    {/* Issue Header */}
                    <button
                      onClick={() => setExpandedIssue(expandedIssue === issue.id ? null : issue.id)}
                      className="w-full text-left"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 bg-danger/10 text-danger text-xs font-semibold rounded uppercase">
                              {issue.severity}
                            </span>
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded">
                              {issue.category}
                            </span>
                          </div>
                          <h4 className="text-lg font-semibold text-navy mb-1">{issue.title}</h4>
                          <p className="text-slate-600 text-sm">{issue.description}</p>

                          <div className="flex items-center gap-6 mt-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              ${issue.revenueImpact}/mo impact
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {issue.timeEstimate}
                            </span>
                            <span className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={cn(
                                    "h-4 w-4",
                                    star <= issue.difficulty ? "text-gold fill-gold" : "text-slate-300"
                                  )}
                                />
                              ))}
                              difficulty
                            </span>
                          </div>
                        </div>

                        {expandedIssue === issue.id ? (
                          <ChevronUp className="h-5 w-5 text-slate-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-slate-400" />
                        )}
                      </div>
                    </button>

                    {/* Expanded Content */}
                    {expandedIssue === issue.id && (
                      <div className="mt-6 pt-6 border-t border-slate-200 space-y-6 animate-fade-in">
                        {/* Impact */}
                        <div className="bg-gradient-to-r from-primary/5 to-transparent border border-primary/20 rounded-lg p-6">
                          <h5 className="font-semibold text-navy mb-4 flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-primary" />
                            Business Impact
                          </h5>
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <p className="text-sm text-slate-600">Current Score</p>
                              <p className="text-4xl font-bold text-danger">{issue.currentScore}</p>
                            </div>
                            <div>
                              <p className="text-sm text-slate-600">After Fix</p>
                              <p className="text-4xl font-bold text-success">{issue.potentialScore}</p>
                            </div>
                          </div>
                          <div className="mt-4 pt-4 border-t border-primary/20">
                            <p className="text-sm text-slate-600">Potential Revenue Impact</p>
                            <p className="text-2xl font-bold text-success">+${issue.revenueImpact}/month</p>
                          </div>
                        </div>

                        {/* AI Fix */}
                        <div className="bg-card border border-slate-200 rounded-lg p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h5 className="font-semibold text-navy flex items-center gap-2">
                              🤖 AI-Powered Solution
                            </h5>
                            <span className="px-2 py-1 bg-gold/10 text-gold text-xs font-semibold rounded">
                              AI Generated
                            </span>
                          </div>

                          {/* Code Block */}
                          <div className="bg-slate-900 rounded-lg overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-2 bg-slate-800">
                              <span className="text-xs text-slate-400">HTML</span>
                              <button
                                onClick={() => copyCode(issue.fixCode, issue.id)}
                                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white"
                              >
                                {copiedCode === issue.id ? (
                                  <>
                                    <CheckCircle className="h-4 w-4 text-success" />
                                    Copied!
                                  </>
                                ) : (
                                  <>
                                    <Copy className="h-4 w-4" />
                                    Copy
                                  </>
                                )}
                              </button>
                            </div>
                            <pre className="p-4 text-sm text-green-400 overflow-x-auto">
                              <code>{issue.fixCode}</code>
                            </pre>
                          </div>

                          {/* Steps */}
                          <div className="mt-6 bg-slate-50 border border-slate-200 rounded-lg p-4">
                            <h6 className="font-semibold text-navy mb-3">Implementation Steps</h6>
                            <ol className="space-y-2">
                              {issue.fixSteps.map((step, index) => (
                                <li key={index} className="flex items-start gap-3 text-sm text-slate-600">
                                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center shrink-0">
                                    {index + 1}
                                  </span>
                                  {step}
                                </li>
                              ))}
                            </ol>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                          <Button className="flex-1">Mark as Complete</Button>
                          <Button variant="outline">Create Task</Button>
                          <Button variant="ghost">Dismiss</Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Warning Issues */}
            <div className="bg-card border-l-4 border-warning rounded-r-xl overflow-hidden">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                    <span className="text-warning font-bold">⚠</span>
                  </div>
                  <h3 className="text-lg font-semibold text-navy">Warnings</h3>
                </div>
                <span className="px-3 py-1 bg-warning/10 text-warning text-sm font-semibold rounded-full">
                  {audit?.warning_issues || 12}
                </span>
              </div>

              <div className="divide-y divide-slate-200">
                {mockIssues.filter(i => i.severity === "warning").map((issue) => (
                  <div key={issue.id} className="p-6">
                    <button
                      onClick={() => setExpandedIssue(expandedIssue === issue.id ? null : issue.id)}
                      className="w-full text-left"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 bg-warning/10 text-warning text-xs font-semibold rounded uppercase">
                              {issue.severity}
                            </span>
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded">
                              {issue.category}
                            </span>
                          </div>
                          <h4 className="text-lg font-semibold text-navy mb-1">{issue.title}</h4>
                          <p className="text-slate-600 text-sm">{issue.description}</p>
                        </div>
                        <ChevronDown className="h-5 w-5 text-slate-400" />
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Summary Card */}
            <div className="bg-card border border-slate-200 rounded-xl p-6 shadow-sm sticky top-24">
              <h3 className="text-lg font-semibold text-navy mb-6">Audit Summary</h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-slate-200">
                  <span className="text-slate-600">Total Issues</span>
                  <span className="font-semibold text-navy">
                    {(audit?.critical_issues || 5) + (audit?.warning_issues || 12)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-200">
                  <span className="text-slate-600">Est. Fix Time</span>
                  <span className="font-semibold text-navy">8.5 hours</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-200">
                  <span className="text-slate-600">Revenue Impact</span>
                  <span className="font-semibold text-success">
                    +${audit?.revenue_impact?.toLocaleString() || "24,500"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-slate-600">Score Potential</span>
                  <span className="font-semibold text-primary">+32 points</span>
                </div>
              </div>

              <Button className="w-full mt-6">
                View Full Roadmap
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditResults;
