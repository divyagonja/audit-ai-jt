import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  Globe,
  Search,
  Settings,
  Play,
  CheckCircle,
  Clock,
  Zap,
  Shield,
  FileText,
  Smartphone,
  Eye,
  Lock,
} from "lucide-react";

const NewAudit = () => {
  const [step, setStep] = useState(1);
  const [url, setUrl] = useState("");
  const [auditName, setAuditName] = useState("");
  const [auditType, setAuditType] = useState<"single" | "funnel">("single");
  const [selectedScopes, setSelectedScopes] = useState<string[]>(["seo", "performance", "ux"]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const scopes = [
    { id: "seo", label: "SEO", icon: Search, description: "Search engine optimization" },
    { id: "performance", label: "Performance", icon: Zap, description: "Page speed & Core Web Vitals" },
    { id: "ux", label: "UX", icon: Eye, description: "User experience analysis" },
    { id: "content", label: "Content", icon: FileText, description: "Content quality & readability" },
    { id: "mobile", label: "Mobile", icon: Smartphone, description: "Mobile responsiveness" },
    { id: "security", label: "Security", icon: Lock, description: "Security vulnerabilities" },
  ];

  const toggleScope = (scopeId: string) => {
    setSelectedScopes((prev) =>
      prev.includes(scopeId) ? prev.filter((s) => s !== scopeId) : [...prev, scopeId]
    );
  };

  const handleSubmit = async () => {
    if (!url) {
      toast({ title: "Error", description: "Please enter a URL", variant: "destructive" });
      return;
    }

    // Ensure URL has protocol
    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = `https://${formattedUrl}`;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Create the audit record first
      const { data: audit, error: auditError } = await supabase.from("audits").insert({
        user_id: user.id,
        url: formattedUrl,
        name: auditName || formattedUrl,
        status: "pending",
      }).select().single();

      if (auditError) throw auditError;

      toast({
        title: "Audit started!",
        description: "AI is analyzing your website. This may take a minute."
      });

      // Navigate immediately so user can see progress
      navigate(`/dashboard/audits/${audit.id}`);

      // Trigger the audit processing in the background
      const { error: processError } = await supabase.functions.invoke("process-audit", {
        body: {
          auditId: audit.id,
          url: formattedUrl,
          scopes: selectedScopes
        },
      });

      if (processError) {
        console.error("Audit processing error:", processError);
        toast({
          title: "Processing Issue",
          description: "Audit started but processing may be delayed.",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-100 font-sans selection:bg-blue-500/30">
      <div className="relative z-10 w-full">
        <DashboardHeader title="New Audit" subtitle="Start a comprehensive website analysis" />

        <div className="p-8 max-w-5xl mx-auto space-y-12">
          {/* Progress Steps */}
          <div className="flex items-center justify-center relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -z-10 rounded-full max-w-2xl mx-auto right-0"></div>
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center mx-12 relative bg-slate-900 px-4 py-2 rounded-full border border-slate-800">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-lg",
                    step > s
                      ? "bg-emerald-500 text-slate-900 shadow-emerald-500/20"
                      : step === s
                        ? "bg-blue-600 text-white shadow-blue-500/30 scale-110"
                        : "bg-slate-800 text-slate-500"
                  )}
                >
                  {step > s ? <CheckCircle className="h-5 w-5" /> : s}
                </div>
                <span className={cn(
                  "ml-3 font-medium text-sm transition-colors",
                  step >= s ? "text-white" : "text-slate-500"
                )}>
                  {s === 1 ? "Details" : s === 2 ? "Configuration" : "Review"}
                </span>
              </div>
            ))}
          </div>

          {/* Step 1: Details */}
          {step === 1 && (
            <div className="glass-card rounded-3xl p-10 shadow-2xl animate-fade-in-up max-w-3xl mx-auto border-white/5">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <Globe className="w-6 h-6 text-blue-400" />
                Enter Website Details
              </h2>
              <p className="text-slate-400 mb-8">Provide the target URL and a name for your audit project.</p>

              <div className="space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="url" className="text-slate-300">Website URL <span className="text-blue-400">*</span></Label>
                  <div className="relative group">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                    <Input
                      id="url"
                      type="url"
                      placeholder="https://example.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="pl-12 bg-slate-900/50 border-white/10 text-white h-12 rounded-xl focus:border-blue-500/50 focus:ring-blue-500/20 transition-all placeholder:text-slate-600"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="name" className="text-slate-300">Audit Name (Optional)</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Q4 Homepage Audit"
                    value={auditName}
                    onChange={(e) => setAuditName(e.target.value)}
                    className="bg-slate-900/50 border-white/10 text-white h-12 rounded-xl focus:border-blue-500/50 focus:ring-blue-500/20 transition-all placeholder:text-slate-600"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!url}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-900/20 px-8 disabled:opacity-50"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Configuration */}
          {step === 2 && (
            <div className="glass-card rounded-3xl p-10 shadow-2xl animate-fade-in-up max-w-4xl mx-auto border-white/5">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <Settings className="w-6 h-6 text-blue-400" />
                Configure Your Audit
              </h2>
              <p className="text-slate-400 mb-8">Customize the depth and scope of your analysis.</p>

              <div className="space-y-10">
                {/* Audit Type */}
                <div>
                  <Label className="mb-4 block text-slate-300 text-base">Audit Type</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: "single", label: "Single Page", desc: "Analyze one specific page" },
                      { id: "funnel", label: "Full Funnel", desc: "Analyze entire user journey" },
                    ].map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setAuditType(type.id as "single" | "funnel")}
                        className={cn(
                          "p-6 rounded-2xl border transition-all text-left relative overflow-hidden group",
                          auditType === type.id
                            ? "border-blue-500/50 bg-blue-500/10"
                            : "border-white/5 bg-slate-900/40 hover:bg-slate-800/60 hover:border-white/10"
                        )}
                      >
                        {auditType === type.id && <div className="absolute inset-0 bg-blue-500/5 animate-pulse"></div>}
                        <p className={cn("font-bold text-lg mb-1 transition-colors", auditType === type.id ? "text-blue-400" : "text-slate-200")}>{type.label}</p>
                        <p className="text-sm text-slate-500">{type.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scope Selection */}
                <div>
                  <Label className="mb-4 block text-slate-300 text-base">Analysis Scope</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {scopes.map((scope) => (
                      <button
                        key={scope.id}
                        onClick={() => toggleScope(scope.id)}
                        className={cn(
                          "p-4 rounded-2xl border transition-all flex items-start gap-3 group relative overflow-hidden",
                          selectedScopes.includes(scope.id)
                            ? "border-emerald-500/40 bg-emerald-500/5"
                            : "border-white/5 bg-slate-900/40 hover:bg-slate-800/60"
                        )}
                      >
                        {selectedScopes.includes(scope.id) && <div className="absolute inset-0 bg-emerald-500/5 animate-pulse"></div>}
                        <div
                          className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                            selectedScopes.includes(scope.id) ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-500"
                          )}
                        >
                          <scope.icon className="h-5 w-5" />
                        </div>
                        <div className="text-left relative z-10">
                          <p className={cn("font-semibold text-sm transition-colors", selectedScopes.includes(scope.id) ? "text-emerald-300" : "text-slate-300")}>{scope.label}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-wide opacity-80">{scope.description.split(" ")[0]}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-6 border-t border-white/5">
                  <Button variant="ghost" onClick={() => setStep(1)} size="lg" className="text-slate-400 hover:text-white hover:bg-white/5">
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    disabled={selectedScopes.length === 0}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-900/20 px-8"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="glass-card rounded-3xl p-10 shadow-2xl animate-fade-in-up max-w-3xl mx-auto border-white/5">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
                Review & Start
              </h2>
              <p className="text-slate-400 mb-8">Verify details before launching the scanner.</p>

              <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 mb-8">
                <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-2">Website</p>
                    <p className="font-medium text-white text-lg truncate">{url}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-2">Audit Name</p>
                    <p className="font-medium text-white text-lg truncate">{auditName || url}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-2">Type</p>
                    <p className="font-medium text-blue-400 text-lg capitalize flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                      {auditType} Page
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-2">Scope</p>
                    <p className="font-medium text-emerald-400 text-lg flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      {selectedScopes.length} categories
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-900/30 border border-white/5 rounded-xl p-4 text-center group hover:bg-slate-800/40 transition-colors">
                  <Clock className="h-6 w-6 text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-xs text-slate-500 uppercase font-semibold">Time</p>
                  <p className="font-bold text-white text-lg">~2 min</p>
                </div>
                <div className="bg-slate-900/30 border border-white/5 rounded-xl p-4 text-center group hover:bg-slate-800/40 transition-colors">
                  <Zap className="h-6 w-6 text-amber-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-xs text-slate-500 uppercase font-semibold">Credits</p>
                  <p className="font-bold text-white text-lg">1 credit</p>
                </div>
                <div className="bg-slate-900/30 border border-white/5 rounded-xl p-4 text-center group hover:bg-slate-800/40 transition-colors">
                  <Shield className="h-6 w-6 text-emerald-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-xs text-slate-500 uppercase font-semibold">Security</p>
                  <p className="font-bold text-white text-lg">Encrypted</p>
                </div>
              </div>

              <div className="flex justify-between pt-6 border-t border-white/5">
                <Button variant="ghost" onClick={() => setStep(2)} size="lg" className="text-slate-400 hover:text-white hover:bg-white/5">
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-900/20 px-8 gap-2"
                >
                  <Play className="h-5 w-5 fill-current" />
                  {loading ? "Starting Audit..." : "Start Audit"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewAudit;
