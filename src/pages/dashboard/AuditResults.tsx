import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import ScoreCircle from "@/components/dashboard/ScoreCircle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
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
  ArrowRight,
  Calendar,
  Target,
  AlertTriangle,
  Info,
  Loader2,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const mockIssues = [
  {
    id: "1",
    category: "SEO",
    severity: "critical",
    title: "Missing Meta Description on 15 pages",
    description: "Multiple pages lack meta descriptions, which significantly impacts search engine visibility and click-through rates from search results.",
    impact: "Reduced click-through rate from search results by up to 30%",
    currentScore: 62,
    potentialScore: 78,
    revenueImpact: 1850,
    conversionLift: 15,
    difficulty: 2,
    timeEstimate: "2-3 hours",
    priority: "High",
    fixCode: `<!-- Add to each page's <head> section -->
<meta name="description" content="Your compelling meta description here. Describe the page content in 150-160 characters, including your primary keyword naturally." />

<!-- Example for homepage -->
<meta name="description" content="AuditAI helps businesses improve website performance, SEO, and user experience with AI-powered audits. Start your free audit today." />`,
    fixSteps: [
      "Run a crawl to identify all pages missing meta descriptions",
      "Create unique, compelling descriptions for each page (150-160 chars)",
      "Include primary keyword naturally in each description",
      "Add meta tags to the <head> section of each page",
      "Verify implementation using Google Search Console",
    ],
  },
  {
    id: "2",
    category: "Performance",
    severity: "critical",
    title: "Large Contentful Paint (LCP) at 4.2s",
    description: "Your largest contentful paint exceeds the recommended 2.5s threshold, causing poor user experience and affecting Core Web Vitals scores.",
    impact: "53% of mobile users abandon pages that take over 3 seconds to load",
    currentScore: 45,
    potentialScore: 85,
    revenueImpact: 3500,
    conversionLift: 23,
    difficulty: 4,
    timeEstimate: "4-6 hours",
    priority: "Critical",
    fixCode: `<!-- Preload critical images -->
<link rel="preload" as="image" href="/hero-image.webp" fetchpriority="high" />

<!-- Use modern image formats with responsive sizing -->
<picture>
  <source 
    srcset="/hero-400.webp 400w, /hero-800.webp 800w, /hero-1200.webp 1200w"
    sizes="(max-width: 768px) 100vw, 50vw"
    type="image/webp" 
  />
  <img 
    src="/hero-fallback.jpg" 
    alt="Hero description" 
    loading="eager"
    fetchpriority="high"
    width="1200"
    height="600"
  />
</picture>

<!-- Inline critical CSS -->
<style>
  .hero { /* Critical hero styles */ }
</style>`,
    fixSteps: [
      "Identify your LCP element using Chrome DevTools Performance tab",
      "Optimize and compress the LCP image (use WebP/AVIF format)",
      "Add preload hints for critical above-the-fold resources",
      "Implement responsive images with srcset",
      "Consider using a CDN for faster global delivery",
    ],
  },
  {
    id: "3",
    category: "Security",
    severity: "critical",
    title: "Missing Content Security Policy Header",
    description: "No CSP header detected on your site. This leaves your site vulnerable to cross-site scripting (XSS) and data injection attacks.",
    impact: "Potential vulnerability to XSS attacks affecting user data and trust",
    currentScore: 70,
    potentialScore: 95,
    revenueImpact: 2200,
    conversionLift: 8,
    difficulty: 3,
    timeEstimate: "2-4 hours",
    priority: "High",
    fixCode: `# Nginx configuration
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://analytics.example.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.example.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self';" always;

# Or via meta tag (less recommended)
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">`,
    fixSteps: [
      "Audit all script, style, and asset sources on your site",
      "Create a CSP policy starting with report-only mode",
      "Test thoroughly in staging before enforcing",
      "Set up CSP violation reporting endpoint",
      "Gradually tighten the policy over time",
    ],
  },
  {
    id: "4",
    category: "SEO",
    severity: "critical",
    title: "Duplicate H1 Tags Found on 8 Pages",
    description: "Multiple pages have duplicate or missing H1 tags, confusing search engines about page hierarchy and main topics.",
    impact: "Search engines may not properly understand page content hierarchy",
    currentScore: 55,
    potentialScore: 80,
    revenueImpact: 1200,
    conversionLift: 12,
    difficulty: 2,
    timeEstimate: "1-2 hours",
    priority: "High",
    fixCode: `<!-- Each page should have ONE unique H1 -->
<h1>Your Primary Page Heading</h1>

<!-- Example structure -->
<h1>Website Audit Services | AuditAI</h1>  <!-- One H1 per page -->
<h2>Our Audit Features</h2>                 <!-- Section headings -->
<h3>SEO Analysis</h3>                       <!-- Subsections -->
<h3>Performance Metrics</h3>`,
    fixSteps: [
      "Crawl site to identify pages with duplicate/missing H1s",
      "Create unique, descriptive H1 for each page",
      "Ensure H1 includes primary keyword for that page",
      "Verify proper heading hierarchy (H1 → H2 → H3)",
      "Update CMS templates to enforce single H1 rule",
    ],
  },
  {
    id: "5",
    category: "Performance",
    severity: "warning",
    title: "Render-Blocking JavaScript Detected",
    description: "Multiple JavaScript files are blocking the initial page render, delaying when users see content.",
    impact: "Adds 1.2 seconds to initial page render time",
    currentScore: 58,
    potentialScore: 75,
    revenueImpact: 1100,
    conversionLift: 10,
    difficulty: 3,
    timeEstimate: "2-3 hours",
    priority: "Medium",
    fixCode: `<!-- Defer non-critical JavaScript -->
<script src="/analytics.js" defer></script>
<script src="/chat-widget.js" defer></script>

<!-- Async for independent scripts -->
<script src="/third-party.js" async></script>

<!-- Critical JS can be inlined -->
<script>
  // Only essential above-the-fold functionality
</script>`,
    fixSteps: [
      "Identify render-blocking scripts using Lighthouse",
      "Add 'defer' attribute to non-critical scripts",
      "Use 'async' for independent third-party scripts",
      "Inline critical JavaScript for above-the-fold content",
      "Consider code splitting for large bundles",
    ],
  },
  {
    id: "6",
    category: "UX",
    severity: "warning",
    title: "Mobile Tap Targets Too Small",
    description: "23 interactive elements are smaller than the recommended 48x48 pixel minimum tap target size for mobile users.",
    impact: "Poor mobile usability leads to frustrated users and higher bounce rates",
    currentScore: 65,
    potentialScore: 88,
    revenueImpact: 950,
    conversionLift: 14,
    difficulty: 2,
    timeEstimate: "1-2 hours",
    priority: "Medium",
    fixCode: `/* Ensure minimum tap target size */
.button, .link, .interactive {
  min-width: 48px;
  min-height: 48px;
  padding: 12px 16px;
}

/* Add touch-friendly spacing */
.nav-links a {
  display: inline-block;
  padding: 12px;
  margin: 4px;
}

/* For icon buttons */
.icon-button {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}`,
    fixSteps: [
      "Run Lighthouse mobile audit to identify small tap targets",
      "Update CSS to ensure 48x48px minimum for all interactive elements",
      "Add adequate spacing between clickable elements",
      "Test on actual mobile devices",
      "Verify touch interactions work smoothly",
    ],
  },
  {
    id: "7",
    category: "Content",
    severity: "warning",
    title: "Missing Alt Text on 34 Images",
    description: "Multiple images lack descriptive alt text, impacting accessibility and image SEO.",
    impact: "Screen reader users cannot understand image content, SEO opportunities missed",
    currentScore: 60,
    potentialScore: 82,
    revenueImpact: 650,
    conversionLift: 6,
    difficulty: 2,
    timeEstimate: "2-3 hours",
    priority: "Medium",
    fixCode: `<!-- Descriptive alt text examples -->
<img src="team-photo.jpg" alt="AuditAI team members collaborating in modern office space" />

<img src="dashboard.png" alt="Website audit dashboard showing SEO score of 85 and performance metrics" />

<!-- Decorative images can have empty alt -->
<img src="decorative-line.svg" alt="" role="presentation" />`,
    fixSteps: [
      "Export list of all images missing alt text",
      "Write descriptive, keyword-rich alt text for each",
      "Keep alt text under 125 characters",
      "Use empty alt for purely decorative images",
      "Implement CMS validation to require alt text",
    ],
  },
  {
    id: "8",
    category: "Security",
    severity: "warning",
    title: "HTTP Strict Transport Security Not Enabled",
    description: "HSTS header is not configured, leaving users vulnerable to protocol downgrade attacks.",
    impact: "Users could be redirected to insecure HTTP versions of your site",
    currentScore: 72,
    potentialScore: 92,
    revenueImpact: 400,
    conversionLift: 3,
    difficulty: 2,
    timeEstimate: "30 min",
    priority: "Medium",
    fixCode: `# Nginx configuration
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

# Apache .htaccess
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"

# Express.js
app.use(helmet.hsts({
  maxAge: 31536000,
  includeSubDomains: true,
  preload: true
}));`,
    fixSteps: [
      "Ensure all HTTP traffic redirects to HTTPS",
      "Add HSTS header to server configuration",
      "Start with shorter max-age (e.g., 86400) for testing",
      "Increase max-age after confirming HTTPS works everywhere",
      "Consider submitting to HSTS preload list",
    ],
  },
  {
    id: "9",
    category: "SEO",
    severity: "warning",
    title: "Broken Internal Links Found (12)",
    description: "12 internal links point to pages that return 404 errors, wasting crawl budget and frustrating users.",
    impact: "Lost link equity and poor user experience when clicking broken links",
    currentScore: 68,
    potentialScore: 85,
    revenueImpact: 720,
    conversionLift: 5,
    difficulty: 2,
    timeEstimate: "1-2 hours",
    priority: "Medium",
    fixCode: `<!-- Before: Broken link -->
<a href="/old-page-url">Learn More</a>

<!-- After: Updated link -->
<a href="/new-page-url">Learn More</a>

<!-- Or implement redirect in .htaccess -->
Redirect 301 /old-page-url /new-page-url

<!-- Nginx redirect -->
location = /old-page-url {
  return 301 /new-page-url;
}`,
    fixSteps: [
      "Run a site crawl to identify all broken links",
      "Categorize: update link, add redirect, or remove",
      "Update content to point to correct URLs",
      "Set up 301 redirects for removed pages",
      "Add regular broken link monitoring",
    ],
  },
  {
    id: "10",
    category: "Performance",
    severity: "info",
    title: "Uncompressed Text Resources",
    description: "Gzip/Brotli compression is not enabled for text-based resources, increasing transfer sizes.",
    impact: "Pages transfer 40% more data than necessary",
    currentScore: 75,
    potentialScore: 88,
    revenueImpact: 380,
    conversionLift: 4,
    difficulty: 1,
    timeEstimate: "30 min",
    priority: "Low",
    fixCode: `# Nginx - Enable Brotli & Gzip
brotli on;
brotli_types text/plain text/css application/json application/javascript text/xml application/xml;

gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
gzip_min_length 256;

# Apache .htaccess
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css application/json application/javascript
</IfModule>`,
    fixSteps: [
      "Check current compression status in DevTools Network tab",
      "Enable Gzip compression on your web server",
      "Add Brotli compression for modern browsers",
      "Verify compression is working via response headers",
      "Monitor bandwidth savings",
    ],
  },
  {
    id: "11",
    category: "UX",
    severity: "info",
    title: "No Lazy Loading for Below-Fold Images",
    description: "Images below the fold are loaded immediately, slowing initial page load unnecessarily.",
    impact: "Initial page load includes 2.4MB of images not immediately visible",
    currentScore: 70,
    potentialScore: 85,
    revenueImpact: 450,
    conversionLift: 5,
    difficulty: 1,
    timeEstimate: "1 hour",
    priority: "Low",
    fixCode: `<!-- Native lazy loading (recommended) -->
<img src="image.jpg" alt="Description" loading="lazy" />

<!-- For background images, use Intersection Observer -->
<script>
const lazyImages = document.querySelectorAll('[data-lazy-bg]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.backgroundImage = \`url(\${entry.target.dataset.lazyBg})\`;
      observer.unobserve(entry.target);
    }
  });
});
lazyImages.forEach(img => observer.observe(img));
</script>`,
    fixSteps: [
      "Add loading='lazy' to all below-fold images",
      "Keep loading='eager' for above-fold LCP images",
      "Implement Intersection Observer for background images",
      "Test that images load before they're visible",
      "Verify no layout shift when images load",
    ],
  },
  {
    id: "12",
    category: "Content",
    severity: "info",
    title: "Thin Content on 5 Pages",
    description: "Several pages have less than 300 words of content, which may be considered thin by search engines.",
    impact: "Thin content pages may struggle to rank for target keywords",
    currentScore: 65,
    potentialScore: 78,
    revenueImpact: 320,
    conversionLift: 3,
    difficulty: 3,
    timeEstimate: "4-6 hours",
    priority: "Low",
    fixCode: `<!-- Expand content structure -->
<article>
  <h1>Primary Topic</h1>
  <p>Introduction paragraph (100+ words)</p>
  
  <h2>Subtopic 1</h2>
  <p>Detailed content (150+ words)</p>
  
  <h2>Subtopic 2</h2>
  <p>Detailed content (150+ words)</p>
  
  <h2>FAQ Section</h2>
  <details>
    <summary>Common question?</summary>
    <p>Detailed answer...</p>
  </details>
</article>`,
    fixSteps: [
      "Identify pages with thin content via crawl report",
      "Research user intent and competitors for each page",
      "Expand content with valuable, relevant information",
      "Add FAQs, examples, or case studies where appropriate",
      "Consider consolidating very thin pages",
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

const severityConfig = {
  critical: { color: "border-red-500", bg: "bg-red-500", text: "text-red-600", badge: "destructive" as const },
  warning: { color: "border-amber-500", bg: "bg-amber-500", text: "text-amber-600", badge: "warning" as const },
  info: { color: "border-blue-500", bg: "bg-blue-500", text: "text-blue-600", badge: "secondary" as const },
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
        // Use realistic mock data
        setAudit({
          id,
          url: "techcorp.com",
          name: "TechCorp Main Site",
          overall_score: 72,
          seo_score: 68,
          performance_score: 62,
          ux_score: 65,
          content_score: 71,
          security_score: 80,
          critical_issues: 4,
          warning_issues: 5,
          info_issues: 3,
          revenue_impact: 14750,
          completed_at: new Date().toISOString(),
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
      <div className="min-h-screen bg-slate-50">
        <div className="bg-background border-b border-slate-200 py-8 px-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="w-32 h-32 rounded-full" />
            <div className="flex gap-3">
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </div>
        <div className="bg-slate-50 border-b border-slate-200 py-6 px-8">
          <div className="grid grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-28 rounded-lg" />
            ))}
          </div>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 rounded-xl" />
              ))}
            </div>
            <div className="space-y-4">
              <Skeleton className="h-64 rounded-xl" />
              <Skeleton className="h-48 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const categories = [
    { key: "seo", label: "SEO", score: audit?.seo_score || 72, icon: Search },
    { key: "performance", label: "Speed", score: audit?.performance_score || 62, icon: Zap },
    { key: "ux", label: "UX", score: audit?.ux_score || 65, icon: Eye },
    { key: "content", label: "Content", score: audit?.content_score || 71, icon: FileText },
    { key: "security", label: "Security", score: audit?.security_score || 80, icon: Lock },
  ];

  const criticalIssues = mockIssues.filter((i) => i.severity === "critical");
  const warningIssues = mockIssues.filter((i) => i.severity === "warning");
  const infoIssues = mockIssues.filter((i) => i.severity === "info");

  const totalRevenueImpact = mockIssues.reduce((acc, i) => acc + i.revenueImpact, 0);

  const IssueCard = ({ issue }: { issue: typeof mockIssues[0] }) => {
    const isExpanded = expandedIssue === issue.id;
    const Icon = categoryIcons[issue.category] || FileText;
    const config = severityConfig[issue.severity as keyof typeof severityConfig];

    return (
      <div className="p-6">
        <button
          onClick={() => setExpandedIssue(isExpanded ? null : issue.id)}
          className="w-full text-left"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={config.badge} className="uppercase text-xs">
                  {issue.severity}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {issue.category}
                </Badge>
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-1">{issue.title}</h4>
              <p className="text-muted-foreground text-sm">{issue.description}</p>

              <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  ${issue.revenueImpact}/mo
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
                        "h-3 w-3",
                        star <= issue.difficulty ? "text-amber-400 fill-amber-400" : "text-slate-300"
                      )}
                    />
                  ))}
                </span>
              </div>
            </div>

            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
            )}
          </div>
        </button>

        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-slate-200 space-y-6 animate-in slide-in-from-top-2">
            {/* Business Impact */}
            <div className="bg-gradient-to-r from-primary/5 via-primary/3 to-transparent border border-primary/20 rounded-xl p-6">
              <h5 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Business Impact
              </h5>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current Score</p>
                  <p className="text-4xl font-bold text-red-600">{issue.currentScore}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">After Fix</p>
                  <p className="text-4xl font-bold text-emerald-600">{issue.potentialScore}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Conversion Lift</p>
                  <p className="text-4xl font-bold text-primary">+{issue.conversionLift}%</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-primary/20">
                <p className="text-sm text-muted-foreground">Revenue Impact</p>
                <p className="text-3xl font-bold text-emerald-600">+${issue.revenueImpact.toLocaleString()}/month</p>
              </div>
            </div>

            {/* AI Fix */}
            <div className="bg-card border border-slate-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-semibold text-foreground flex items-center gap-2">
                  🤖 AI-Generated Solution
                </h5>
                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                  AI Generated
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{issue.impact}</p>

              {/* Code Block */}
              <div className="bg-slate-900 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-slate-800">
                  <span className="text-xs text-slate-400 font-mono">Code Fix</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyCode(issue.fixCode, issue.id);
                    }}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    {copiedCode === issue.id ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-emerald-400" />
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
                <pre className="p-4 text-sm text-green-400 overflow-x-auto font-mono">
                  <code>{issue.fixCode}</code>
                </pre>
              </div>

              {/* Implementation Steps */}
              <div className="mt-6 bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h6 className="font-semibold text-foreground mb-3">Implementation Steps</h6>
                <ol className="space-y-2">
                  {issue.fixSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Difficulty</p>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "h-5 w-5",
                        star <= issue.difficulty ? "text-amber-400 fill-amber-400" : "text-slate-300"
                      )}
                    />
                  ))}
                </div>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Time Estimate</p>
                <p className="font-semibold text-foreground">{issue.timeEstimate}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Priority</p>
                <p className="font-semibold text-foreground">{issue.priority}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button className="flex-1 gap-2">
                <CheckCircle className="h-4 w-4" />
                Mark as Complete
              </Button>
              <Button variant="outline" className="gap-2">
                <Target className="h-4 w-4" />
                Create Task
              </Button>
              <Button variant="ghost">Dismiss</Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-background border-b border-slate-200 py-8 px-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Link to="/dashboard/audits" className="hover:text-primary transition-colors">
                Audits
              </Link>
              <span>/</span>
              <span>{audit?.url}</span>
              <span>/</span>
              <span className="text-foreground">Results</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">{audit?.url}</h1>
            <p className="text-muted-foreground mt-1">
              Completed {audit?.completed_at ? new Date(audit.completed_at).toLocaleDateString() : "Today"}
            </p>
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

      {/* Category Scores Banner */}
      <div className="bg-slate-100 border-b border-slate-200 py-6 px-8">
        <div className="grid grid-cols-5 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.key}
              className="bg-card border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <cat.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="font-medium text-foreground">{cat.label}</span>
              </div>
              <div className="flex items-end gap-1">
                <span className={cn(
                  "text-3xl font-bold",
                  cat.score >= 80 ? "text-emerald-600" : cat.score >= 60 ? "text-amber-600" : "text-red-600"
                )}>
                  {cat.score}
                </span>
                <span className="text-muted-foreground text-sm mb-1">/100</span>
              </div>
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
            {criticalIssues.length > 0 && (
              <div className="bg-card border-l-4 border-red-500 rounded-r-xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Critical Issues</h3>
                  </div>
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full">
                    {criticalIssues.length}
                  </span>
                </div>
                <div className="divide-y divide-slate-200">
                  {criticalIssues.map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
                  ))}
                </div>
              </div>
            )}

            {/* Warnings */}
            {warningIssues.length > 0 && (
              <div className="bg-card border-l-4 border-amber-500 rounded-r-xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Warnings</h3>
                  </div>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-semibold rounded-full">
                    {warningIssues.length}
                  </span>
                </div>
                <div className="divide-y divide-slate-200">
                  {warningIssues.map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {infoIssues.length > 0 && (
              <div className="bg-card border-l-4 border-blue-500 rounded-r-xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Info className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Recommendations</h3>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                    {infoIssues.length}
                  </span>
                </div>
                <div className="divide-y divide-slate-200">
                  {infoIssues.map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Executive Summary */}
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Executive Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Issues</span>
                    <span className="font-semibold">{mockIssues.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Critical</span>
                    <Badge variant="destructive">{criticalIssues.length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Warnings</span>
                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">{warningIssues.length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Info</span>
                    <Badge variant="secondary">{infoIssues.length}</Badge>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-1">Potential Revenue Impact</p>
                  <p className="text-2xl font-bold text-emerald-600">+${totalRevenueImpact.toLocaleString()}/mo</p>
                </div>
              </CardContent>
            </Card>

            {/* Roadmap Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Roadmap Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-sm font-medium">Week 1-2</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{criticalIssues.length} critical</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-sm font-medium">Week 3-4</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{warningIssues.length} warnings</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-sm font-medium">Week 5+</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{infoIssues.length} optimizations</span>
                </div>
                <Button variant="outline" className="w-full gap-2" asChild>
                  <Link to="/dashboard/roadmap">
                    View Full Roadmap
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Download className="h-4 w-4" />
                  Download Full Report
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Share2 className="h-4 w-4" />
                  Share with Team
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Target className="h-4 w-4" />
                  Export to Jira
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditResults;
