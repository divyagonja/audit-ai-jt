import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Plus,
  FileText,
  Users,
  Settings,
  CreditCard,
  BarChart3,
  Target,
  Globe,
  Brain,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Map,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  collapsed: boolean;
}

const NavItem = ({ to, icon: Icon, label, collapsed }: NavItemProps) => (
  <NavLink
    to={to}
    end={to === "/dashboard"}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
        isActive
          ? "bg-primary/10 text-primary border-l-2 border-primary"
          : "text-slate-400 hover:text-white hover:bg-slate-800"
      )
    }
  >
    <Icon className="h-5 w-5 shrink-0" />
    {!collapsed && <span className="font-medium">{label}</span>}
  </NavLink>
);

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({ title: "Signed out", description: "You've been signed out successfully." });
    navigate("/");
  };

  const mainNavItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/dashboard/new-audit", icon: Plus, label: "New Audit" },
    { to: "/dashboard/audits", icon: FileText, label: "All Audits" },
    { to: "/dashboard/clients", icon: Users, label: "Clients" },
    { to: "/dashboard/reports", icon: BarChart3, label: "Reports" },
  ];

  const insightNavItems = [
    { to: "/dashboard/domain-overview", icon: Globe, label: "Domain Overview" },
    { to: "/dashboard/competitors", icon: Target, label: "Competitor Analysis" },
    { to: "/dashboard/ai-analysis", icon: Brain, label: "AI Analysis" },
    { to: "/dashboard/roadmap", icon: Map, label: "Roadmap" },
  ];

  const settingsNavItems = [
    { to: "/dashboard/settings", icon: Settings, label: "Settings" },
    { to: "/dashboard/billing", icon: CreditCard, label: "Billing" },
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 z-50",
        collapsed ? "w-20" : "w-72"
      )}
    >
      {/* Logo */}
      <div className="p-6 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <span className="text-primary-foreground font-bold">A</span>
          </div>
          {!collapsed && <span className="text-xl font-bold text-white">AuditAI</span>}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        <div className="space-y-1">
          {!collapsed && (
            <span className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Main
            </span>
          )}
          <div className="space-y-1 mt-2">
            {mainNavItems.map((item) => (
              <NavItem key={item.to} {...item} collapsed={collapsed} />
            ))}
          </div>
        </div>

        <div className="space-y-1">
          {!collapsed && (
            <span className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Insights
            </span>
          )}
          <div className="space-y-1 mt-2">
            {insightNavItems.map((item) => (
              <NavItem key={item.to} {...item} collapsed={collapsed} />
            ))}
          </div>
        </div>

        <div className="space-y-1">
          {!collapsed && (
            <span className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Account
            </span>
          )}
          <div className="space-y-1 mt-2">
            {settingsNavItems.map((item) => (
              <NavItem key={item.to} {...item} collapsed={collapsed} />
            ))}
          </div>
        </div>
      </nav>

      {/* Usage Card & Sign Out */}
      <div className="p-4 border-t border-slate-800 space-y-3">
        {!collapsed && (
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">Audits Used</span>
              <span className="text-white font-semibold">15/100</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "15%" }} />
            </div>
          </div>
        )}

        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800",
            collapsed && "justify-center px-0"
          )}
          onClick={handleSignOut}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span className="ml-3">Sign Out</span>}
        </Button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
