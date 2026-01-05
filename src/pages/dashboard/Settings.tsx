import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import {
  User,
  Building,
  Bell,
  Shield,
  Key,
  Mail,
  Globe,
  Camera,
  Settings as SettingsIcon,
  CreditCard,
  Lock,
  Smartphone,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";

const Settings = () => {
  const [profile, setProfile] = useState({
    full_name: "",
    company: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setProfile({
          full_name: user.user_metadata?.full_name || "",
          company: user.user_metadata?.company || "",
          email: user.email || "",
        });
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: profile.full_name,
          company: profile.company,
        },
      });
      if (error) throw error;
      toast({ title: "Settings saved", description: "Your profile has been updated." });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-100 font-sans selection:bg-blue-500/30">
      <div className="relative z-10">
        <DashboardHeader
          title="Settings"
          subtitle="Manage your profile, security, and account preferences"
        />

        <div className="p-8 max-w-6xl mx-auto animate-fade-in-up">
          <Tabs defaultValue="profile" className="space-y-10">
            <TabsList className="bg-slate-900/60 p-1.5 rounded-2xl border border-white/5 backdrop-blur-xl flex flex-wrap h-auto gap-1">
              <TabsTrigger value="profile" className="gap-2.5 px-6 py-2.5 rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all text-slate-400 font-medium">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2.5 px-6 py-2.5 rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all text-slate-400 font-medium">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2.5 px-6 py-2.5 rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all text-slate-400 font-medium">
                <Shield className="h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="integrations" className="gap-2.5 px-6 py-2.5 rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all text-slate-400 font-medium">
                <Key className="h-4 w-4" />
                Integrations
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="focus-visible:ring-0">
              <div className="glass-card border border-white/5 rounded-3xl p-10 shadow-2xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -mr-32 -mt-32 transition-colors group-hover:bg-blue-600/10"></div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                    <SettingsIcon className="h-5 w-5 text-blue-400" /> Administrative Profile
                  </h3>

                  <div className="flex flex-col lg:flex-row items-start gap-12 mb-10">
                    <div className="relative group/avatar">
                      <div className="w-32 h-32 rounded-3xl bg-slate-950/50 border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden transition-all group-hover/avatar:border-blue-500/50 group-hover/avatar:bg-slate-900/50">
                        <User className="h-16 w-16 text-slate-600 group-hover/avatar:scale-110 group-hover/avatar:text-blue-400 transition-all" />
                      </div>
                      <button className="absolute -bottom-3 -right-3 w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-500 shadow-xl shadow-blue-900/40 transition-transform active:scale-90">
                        <Camera className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="flex-1 w-full space-y-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label htmlFor="fullName" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Legal Name</Label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-500" />
                            <Input
                              id="fullName"
                              value={profile.full_name}
                              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                              className="pl-11 h-12 bg-slate-950/50 border-white/10 text-white rounded-xl focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all font-medium"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="company" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Organization / Brand</Label>
                          <div className="relative">
                            <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-500" />
                            <Input
                              id="company"
                              value={profile.company}
                              onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                              className="pl-11 h-12 bg-slate-950/50 border-white/10 text-white rounded-xl focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all font-medium"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Synchronized Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-600" />
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            disabled
                            className="pl-11 h-12 bg-slate-950/30 border-white/5 text-slate-500 rounded-xl cursor-not-allowed italic font-medium"
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-md text-[10px] font-bold border border-emerald-500/20">
                            <Shield className="h-3 w-3" /> VERIFIED
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-600 mt-1.5 ml-1">To change your primary identity, contact system administration.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-6 border-t border-white/5">
                    <Button
                      onClick={handleSave}
                      disabled={loading}
                      className="px-8 h-12 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-900/20 transition-all hover:scale-105"
                    >
                      {loading ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                          Applying Changes...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="focus-visible:ring-0">
              <div className="glass-card border border-white/5 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                  <Bell className="h-5 w-5 text-indigo-400" /> Intelligence Alert System
                </h3>

                <div className="space-y-2">
                  {[
                    { id: "audit_complete", label: "Analysis Completion", desc: "Push notification when deep scans are finalized", icon: Globe },
                    { id: "weekly_report", label: "Executive Briefing", desc: "Automated weekly PDF performance summary", icon: Mail },
                    { id: "critical_issues", label: "High-Priority Alerts", desc: "Instant zero-day vulnerability & infrastructure alerts", icon: AlertTriangleIcon },
                    { id: "competitor_updates", label: "Competitive Intelligence", desc: "Real-time tracking of market shift & rival scores", icon: Globe },
                  ].map((item, i) => (
                    <div key={item.id} className="flex items-center justify-between py-6 group hover:bg-white/[0.02] transition-colors rounded-2xl px-6 -mx-6">
                      <div className="flex items-center gap-5">
                        <div className="w-10 h-10 rounded-xl bg-slate-900/50 border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-bold text-white text-base">{item.label}</p>
                          <p className="text-sm text-slate-500">{item.desc}</p>
                        </div>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-blue-600" />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="focus-visible:ring-0">
              <div className="glass-card border border-white/5 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                  <Shield className="h-5 w-5 text-emerald-400" /> Perimeter Protection
                </h3>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-8 bg-slate-950/30 rounded-3xl border border-white/5 hover:border-blue-500/20 transition-all flex flex-col justify-between group">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                        <Lock className="h-6 w-6" />
                      </div>
                      <h4 className="font-black text-white text-lg mb-2">Access Credentials</h4>
                      <p className="text-sm text-slate-500 mb-8 leading-relaxed">Update your encrypted session key regularly to maintain endpoint integrity.</p>
                    </div>
                    <Button className="bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-xl h-11 w-fit px-6 transition-all">Rotate Password</Button>
                  </div>

                  <div className="p-8 bg-slate-950/30 rounded-3xl border border-white/5 hover:border-emerald-500/20 transition-all flex flex-col justify-between group">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 transition-transform">
                        <Smartphone className="h-6 w-6" />
                      </div>
                      <h4 className="font-black text-white text-lg mb-2">Multi-Factor Protocol</h4>
                      <p className="text-sm text-slate-500 mb-8 leading-relaxed">Adds an additional biometric or digital layer to your login sequence.</p>
                    </div>
                    <Button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl h-11 w-fit px-6 shadow-lg shadow-emerald-900/20 transition-all">Initialize 2FA</Button>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-slate-900/50 rounded-2xl border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-amber-400">
                      <AlertTriangleIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">Security Matrix Score: High</p>
                      <p className="text-xs text-slate-500 italic">Your account is utilizing 78% of available security features.</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="text-blue-400 hover:bg-blue-400/10 hover:text-blue-300 text-xs font-bold uppercase tracking-wider">Audit Security Log</Button>
                </div>
              </div>
            </TabsContent>

            {/* Ecosystem Tab */}
            <TabsContent value="integrations" className="focus-visible:ring-0">
              <div className="glass-card border border-white/5 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                  <Globe className="h-5 w-5 text-purple-400" /> Digital Ecosystem Connectors
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { name: "Slack", desc: "Neural real-time event streaming", connected: false, color: "text-purple-400" },
                    { name: "Jira", desc: "Automated ticket provisioning", connected: true, color: "text-blue-400" },
                    { name: "Google Analytics", desc: "Market traffic data ingestion", connected: false, color: "text-amber-400" },
                    { name: "Supabase", desc: "Core cloud infrastructure", connected: true, color: "text-emerald-400" },
                  ].map((integration) => (
                    <div key={integration.name} className="p-6 bg-slate-950/30 border border-white/5 rounded-2xl hover:border-white/10 transition-all flex flex-col justify-between group">
                      <div className="flex items-center justify-between mb-6">
                        <div className={cn("w-12 h-12 rounded-xl bg-slate-900/50 border border-white/5 flex items-center justify-center transition-transform group-hover:scale-110", integration.color)}>
                          {integration.name === "Slack" ? <Mail className="h-6 w-6" /> : <Globe className="h-6 w-6" />}
                        </div>
                        <div className={cn(
                          "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                          integration.connected
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-slate-800 text-slate-500 border-white/5"
                        )}>
                          {integration.connected && <Check className="h-3 w-3" />}
                          {integration.connected ? "Active" : "Idle"}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base mb-1">{integration.name}</h4>
                        <p className="text-xs text-slate-500 mb-6">{integration.desc}</p>
                        <Button
                          size="sm"
                          className={cn(
                            "w-full rounded-xl h-10 text-xs font-bold uppercase tracking-wider transition-all",
                            integration.connected ? "bg-white/5 border border-white/10 text-white hover:bg-white/10" : "bg-blue-600 hover:bg-blue-500 text-white"
                          )}
                        >
                          {integration.connected ? "Configure Node" : "Connect Adapter"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const AlertTriangleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
);

export default Settings;
