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
} from "lucide-react";

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
    <div className="min-h-screen">
      <DashboardHeader title="Settings" subtitle="Manage your account settings and preferences" />

      <div className="p-8">
        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="bg-slate-100 p-1">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="integrations" className="gap-2">
              <Key className="h-4 w-4" />
              Integrations
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="bg-card border border-slate-200 rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-navy mb-6">Profile Information</h3>

              <div className="flex items-start gap-8 mb-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex-1 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="fullName"
                          value={profile.full_name}
                          onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="company"
                          value={profile.company}
                          onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        disabled
                        className="pl-10 bg-slate-50"
                      />
                    </div>
                    <p className="text-xs text-slate-500">Email cannot be changed.</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <div className="bg-card border border-slate-200 rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-navy mb-6">Notification Preferences</h3>

              <div className="space-y-6">
                {[
                  { id: "audit_complete", label: "Audit Completed", desc: "Get notified when an audit finishes" },
                  { id: "weekly_report", label: "Weekly Reports", desc: "Receive weekly performance summaries" },
                  { id: "critical_issues", label: "Critical Issues", desc: "Alert when critical issues are found" },
                  { id: "competitor_updates", label: "Competitor Updates", desc: "Track competitor score changes" },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-4 border-b border-slate-200 last:border-0">
                    <div>
                      <p className="font-medium text-navy">{item.label}</p>
                      <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="bg-card border border-slate-200 rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-navy mb-6">Security Settings</h3>

              <div className="space-y-6">
                <div className="p-6 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold text-navy mb-2">Change Password</h4>
                  <p className="text-sm text-slate-600 mb-4">Update your password to keep your account secure.</p>
                  <Button variant="outline">Change Password</Button>
                </div>

                <div className="p-6 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold text-navy mb-2">Two-Factor Authentication</h4>
                  <p className="text-sm text-slate-600 mb-4">Add an extra layer of security to your account.</p>
                  <Button variant="outline">Enable 2FA</Button>
                </div>

                <div className="p-6 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold text-navy mb-2">Active Sessions</h4>
                  <p className="text-sm text-slate-600 mb-4">Manage your active login sessions.</p>
                  <Button variant="outline">View Sessions</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations">
            <div className="bg-card border border-slate-200 rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-navy mb-6">Integrations</h3>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { name: "Slack", desc: "Get audit notifications in Slack", connected: false },
                  { name: "Jira", desc: "Create tasks from audit issues", connected: true },
                  { name: "Google Analytics", desc: "Import traffic data", connected: false },
                  { name: "Salesforce", desc: "Sync with your CRM", connected: false },
                ].map((integration) => (
                  <div key={integration.name} className="p-6 border border-slate-200 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                        <Globe className="h-6 w-6 text-slate-600" />
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${
                        integration.connected
                          ? "bg-success/10 text-success"
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        {integration.connected ? "Connected" : "Not Connected"}
                      </span>
                    </div>
                    <h4 className="font-semibold text-navy">{integration.name}</h4>
                    <p className="text-sm text-slate-600 mb-4">{integration.desc}</p>
                    <Button variant={integration.connected ? "outline" : "default"} size="sm">
                      {integration.connected ? "Manage" : "Connect"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
