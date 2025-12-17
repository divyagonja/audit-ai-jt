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
    <div className="min-h-screen">
      <DashboardHeader title="New Audit" subtitle="Start a comprehensive website analysis" />

      <div className="p-8 max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
                  step > s
                    ? "bg-success text-white"
                    : step === s
                    ? "bg-primary text-white"
                    : "bg-slate-200 text-slate-600"
                )}
              >
                {step > s ? <CheckCircle className="h-5 w-5" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={cn(
                    "w-24 h-1 mx-2 rounded-full transition-all",
                    step > s ? "bg-success" : "bg-slate-200"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Details */}
        {step === 1 && (
          <div className="bg-card border border-slate-200 rounded-xl p-8 shadow-sm animate-fade-in">
            <h2 className="text-2xl font-bold text-navy mb-6">Enter Website Details</h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="url">Website URL *</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Audit Name (Optional)</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Q4 Homepage Audit"
                  value={auditName}
                  onChange={(e) => setAuditName(e.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setStep(2)} disabled={!url} size="lg">
                  Continue
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Configuration */}
        {step === 2 && (
          <div className="bg-card border border-slate-200 rounded-xl p-8 shadow-sm animate-fade-in">
            <h2 className="text-2xl font-bold text-navy mb-6">Configure Your Audit</h2>

            <div className="space-y-8">
              {/* Audit Type */}
              <div>
                <Label className="mb-4 block">Audit Type</Label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: "single", label: "Single Page", desc: "Analyze one specific page" },
                    { id: "funnel", label: "Full Funnel", desc: "Analyze entire user journey" },
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setAuditType(type.id as "single" | "funnel")}
                      className={cn(
                        "p-6 rounded-xl border-2 text-left transition-all",
                        auditType === type.id
                          ? "border-primary bg-primary/5"
                          : "border-slate-200 hover:border-slate-300"
                      )}
                    >
                      <p className="font-semibold text-navy">{type.label}</p>
                      <p className="text-sm text-slate-600 mt-1">{type.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Scope Selection */}
              <div>
                <Label className="mb-4 block">Analysis Scope</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {scopes.map((scope) => (
                    <button
                      key={scope.id}
                      onClick={() => toggleScope(scope.id)}
                      className={cn(
                        "p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3",
                        selectedScopes.includes(scope.id)
                          ? "border-primary bg-primary/5"
                          : "border-slate-200 hover:border-slate-300"
                      )}
                    >
                      <div
                        className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                          selectedScopes.includes(scope.id) ? "bg-primary/10" : "bg-slate-100"
                        )}
                      >
                        <scope.icon
                          className={cn(
                            "h-5 w-5",
                            selectedScopes.includes(scope.id) ? "text-primary" : "text-slate-600"
                          )}
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-navy">{scope.label}</p>
                        <p className="text-xs text-slate-600 mt-0.5">{scope.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)} size="lg">
                  Back
                </Button>
                <Button onClick={() => setStep(3)} disabled={selectedScopes.length === 0} size="lg">
                  Continue
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="bg-card border border-slate-200 rounded-xl p-8 shadow-sm animate-fade-in">
            <h2 className="text-2xl font-bold text-navy mb-6">Review & Start</h2>

            <div className="bg-slate-50 rounded-xl p-6 mb-8">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-slate-600">Website</p>
                  <p className="font-semibold text-navy">{url}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Audit Name</p>
                  <p className="font-semibold text-navy">{auditName || url}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Type</p>
                  <p className="font-semibold text-navy capitalize">{auditType} Page</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Scope</p>
                  <p className="font-semibold text-navy">{selectedScopes.length} categories</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white border border-slate-200 rounded-lg p-4 text-center">
                <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm text-slate-600">Estimated Time</p>
                <p className="font-semibold text-navy">~2 min</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-4 text-center">
                <Zap className="h-6 w-6 text-gold mx-auto mb-2" />
                <p className="text-sm text-slate-600">Credits Used</p>
                <p className="font-semibold text-navy">1 credit</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-4 text-center">
                <Shield className="h-6 w-6 text-success mx-auto mb-2" />
                <p className="text-sm text-slate-600">Data Security</p>
                <p className="font-semibold text-navy">Encrypted</p>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)} size="lg">
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={loading} size="lg" className="gap-2">
                <Play className="h-5 w-5" />
                {loading ? "Starting Audit..." : "Start Audit"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewAudit;
