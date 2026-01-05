import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
    Loader2,
    Globe,
    CheckCircle2,
    AlertTriangle,
    XCircle,
    TrendingUp,
    Zap,
} from "lucide-react";
import { runQuickAudit, type CompleteSiteAudit } from "@/services/audit";

const QuickAuditDemo = () => {
    const [url, setUrl] = useState("https://example.com");
    const [loading, setLoading] = useState(false);
    const [auditResult, setAuditResult] = useState<Partial<CompleteSiteAudit> | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleRunAudit = async () => {
        if (!url) {
            setError("Please enter a URL");
            return;
        }

        setLoading(true);
        setError(null);
        setAuditResult(null);

        try {
            const result = await runQuickAudit(url);
            setAuditResult(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to run audit");
            console.error("Audit error:", err);
        } finally {
            setLoading(false);
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return "text-green-600 bg-green-50 border-green-200";
        if (score >= 70) return "text-blue-600 bg-blue-50 border-blue-200";
        if (score >= 50) return "text-amber-600 bg-amber-50 border-amber-200";
        return "text-red-600 bg-red-50 border-red-200";
    };

    const getScoreIcon = (score: number) => {
        if (score >= 90) return <CheckCircle2 className="h-5 w-5" />;
        if (score >= 50) return <AlertTriangle className="h-5 w-5" />;
        return <XCircle className="h-5 w-5" />;
    };

    return (
        <div className="min-h-screen dashboard-bg">
            <div className="relative z-10 p-8">
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold corporate-gradient-text flex items-center justify-center gap-3">
                            <Zap className="h-10 w-10" />
                            Quick Website Audit
                        </h1>
                        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                            Enter any URL to get instant insights powered by AI, web scraping, and performance analysis
                        </p>
                    </div>

                    {/* Input Section */}
                    <Card className="corporate-card p-8">
                        <div className="flex gap-4">
                            <div className="flex-1 relative">
                                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <Input
                                    type="url"
                                    placeholder="https://example.com"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="pl-12 h-14 text-lg"
                                    disabled={loading}
                                />
                            </div>
                            <Button
                                onClick={handleRunAudit}
                                disabled={loading}
                                className="h-14 px-8 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="h-5 w-5 mr-2" />
                                        Run Audit
                                    </>
                                )}
                            </Button>
                        </div>

                        {error && (
                            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                                <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-red-900">Error</h4>
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        )}
                    </Card>

                    {/* Results */}
                    {auditResult && (
                        <div className="space-y-6">
                            {/* Overall Score */}
                            <Card className="corporate-card p-8 text-center">
                                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white mb-4">
                                    <div>
                                        <div className="text-5xl font-bold">{auditResult.scores?.overall}</div>
                                        <div className="text-sm opacity-90">Overall</div>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Audit Complete!</h3>
                                <p className="text-slate-600">{auditResult.summary}</p>
                            </Card>

                            {/* Category Scores */}
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {auditResult.scores && Object.entries(auditResult.scores).map(([category, score]) => {
                                    if (category === 'overall') return null;
                                    return (
                                        <Card key={category} className={`executive-card p-6 border-2 ${getScoreColor(score)}`}>
                                            <div className="flex items-center justify-between mb-3">
                                                {getScoreIcon(score)}
                                                <span className="text-3xl font-bold">{score}</span>
                                            </div>
                                            <h4 className="text-sm font-semibold capitalize">{category}</h4>
                                        </Card>
                                    );
                                })}
                            </div>

                            {/* Page Data */}
                            {auditResult.pageData && (
                                <Card className="corporate-card p-8">
                                    <h3 className="text-xl font-bold text-slate-900 mb-6">Page Analysis</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        <div>
                                            <div className="text-sm text-slate-600 mb-1">Title Length</div>
                                            <div className="text-2xl font-bold text-slate-900">
                                                {auditResult.pageData.title.length}
                                            </div>
                                            <div className="text-xs text-slate-500">characters</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-slate-600 mb-1">Meta Description</div>
                                            <div className="text-2xl font-bold text-slate-900">
                                                {auditResult.pageData.description.length}
                                            </div>
                                            <div className="text-xs text-slate-500">characters</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-slate-600 mb-1">Images</div>
                                            <div className="text-2xl font-bold text-slate-900">
                                                {auditResult.pageData.images.total}
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                {auditResult.pageData.images.withoutAlt} without alt
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-slate-600 mb-1">Links</div>
                                            <div className="text-2xl font-bold text-slate-900">
                                                {auditResult.pageData.links.total}
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                {auditResult.pageData.links.external} external
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 space-y-4">
                                        <div>
                                            <h4 className="font-semibold text-slate-900 mb-2">Page Title</h4>
                                            <p className="text-slate-700 bg-slate-50 p-3 rounded-lg">
                                                {auditResult.pageData.title || "No title found"}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-900 mb-2">Meta Description</h4>
                                            <p className="text-slate-700 bg-slate-50 p-3 rounded-lg">
                                                {auditResult.pageData.description || "No description found"}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-900 mb-2">Headings</h4>
                                            <div className="space-y-2">
                                                {auditResult.pageData.headings.h1.length > 0 && (
                                                    <div className="bg-slate-50 p-3 rounded-lg">
                                                        <span className="text-xs font-semibold text-slate-600 uppercase">H1:</span>
                                                        <p className="text-slate-700 mt-1">{auditResult.pageData.headings.h1.join(", ")}</p>
                                                    </div>
                                                )}
                                                {auditResult.pageData.headings.h2.length > 0 && (
                                                    <div className="bg-slate-50 p-3 rounded-lg">
                                                        <span className="text-xs font-semibold text-slate-600 uppercase">H2:</span>
                                                        <p className="text-slate-700 mt-1">{auditResult.pageData.headings.h2.slice(0, 3).join(", ")}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            )}

                            {/* AI Analysis */}
                            {auditResult.aiAnalysis && (
                                <Card className="corporate-card p-8">
                                    <h3 className="text-xl font-bold text-slate-900 mb-6">AI Insights</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Quick Wins */}
                                        {auditResult.aiAnalysis.quickWins && (
                                            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                                <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                                                    <TrendingUp className="h-5 w-5" />
                                                    Quick Wins
                                                </h4>
                                                <ul className="space-y-2">
                                                    {auditResult.aiAnalysis.quickWins.map((win: string, idx: number) => (
                                                        <li key={idx} className="text-sm text-green-700 flex items-start gap-2">
                                                            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                                            <span>{win}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Priority Actions */}
                                        {auditResult.aiAnalysis.priorityActions && (
                                            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                                                <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                                                    <AlertTriangle className="h-5 w-5" />
                                                    Priority Actions
                                                </h4>
                                                <ul className="space-y-2">
                                                    {auditResult.aiAnalysis.priorityActions.map((action: string, idx: number) => (
                                                        <li key={idx} className="text-sm text-amber-700 flex items-start gap-2">
                                                            <span className="font-bold">{idx + 1}.</span>
                                                            <span>{action}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuickAuditDemo;
