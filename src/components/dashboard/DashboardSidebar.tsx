import React, { useState } from "react";
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
  Sparkles,
  Zap,
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
        "flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group/nav",
        isActive
          ? "bg-blue-600 shadow-lg shadow-blue-900/40 text-white"
          : "text-slate-400 hover:text-white hover:bg-white/5"
      )
    }
  >
    {({ isActive }) => (
      <>
        <Icon className={cn("h-5 w-5 shrink-0 transition-transform group-hover/nav:scale-110")} />
        {!collapsed && <span className="font-bold text-sm tracking-wide">{label}</span>}
        {isActive && !collapsed && (
          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
        )}
      </>
    )}
  </NavLink>
);

interface DashboardSidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const DashboardSidebar = ({ collapsed, setCollapsed }: DashboardSidebarProps) => {
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
    { to: "/dashboard/clients", icon: Users, label: "My Clients" },
    { to: "/dashboard/reports", icon: BarChart3, label: "Reports" },
  ];

  const insightNavItems = [
    { to: "/dashboard/domain-overview", icon: Globe, label: "Domain Health" },
    { to: "/dashboard/competitors", icon: Target, label: "Competitors" },
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
        "fixed left-0 top-0 h-screen bg-slate-950/80 backdrop-blur-2xl border-r border-white/5 flex flex-col transition-all duration-500 z-50 group",
        collapsed ? "w-20" : "w-72"
      )}
    >
      {/* Glow Effect */}
      <div className="absolute top-0 left-0 w-full h-32 bg-blue-600/5 blur-[100px] pointer-events-none" />

      {/* Logo */}
      <div className="p-6 flex items-center justify-between min-h-[88px] relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/40 border border-white/10 group-hover:scale-105 transition-transform duration-500">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-black text-white tracking-tighter leading-none">AUDIT<span className="text-blue-500">AI</span></span>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-0.5">Neural OS</span>
            </div>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-xl hover:bg-white/5 text-slate-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-8 overflow-y-auto custom-scrollbar relative z-10">
        <div className="space-y-2">
          {!collapsed && (
            <span className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] block mb-2">
              Main Navigation
            </span>
          )}
          <div className="space-y-1">
            {mainNavItems.map((item) => (
              <NavItem key={item.to} {...item} collapsed={collapsed} />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {!collapsed && (
            <span className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] block mb-2">
              Analytics
            </span>
          )}
          <div className="space-y-1">
            {insightNavItems.map((item) => (
              <NavItem key={item.to} {...item} collapsed={collapsed} />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {!collapsed && (
            <span className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] block mb-2">
              Configuration
            </span>
          )}
          <div className="space-y-1">
            {settingsNavItems.map((item) => (
              <NavItem key={item.to} {...item} collapsed={collapsed} />
            ))}
          </div>
        </div>
      </nav>

      {/* Usage Card & Sign Out */}
      <div className="p-4 border-t border-white/5 space-y-4 relative z-10">
        {!collapsed && (
          <div className="glass-card bg-white/[0.02] border border-white/5 rounded-2xl p-5 relative overflow-hidden group/usage">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 blur-2xl -mr-12 -mt-12 group-hover/usage:bg-blue-600/10 transition-colors" />
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-3 relative z-10">
              <span className="text-slate-500">Resource Load</span>
              <span className="text-white">15%</span>
            </div>
            <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden relative z-10 p-0.5 border border-white/5">
              <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]" style={{ width: "15%" }} />
            </div>
            <div className="mt-3 flex items-center justify-between relative z-10">
              <span className="text-[9px] font-bold text-slate-600 italic">85 Audits Remaining</span>
              <Zap className="h-3 w-3 text-amber-500" />
            </div>
          </div>
        )}

        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-slate-500 hover:text-white hover:bg-rose-500/10 hover:text-rose-400 group/exit h-12 rounded-xl border border-transparent hover:border-rose-500/20",
            collapsed && "justify-center px-0"
          )}
          onClick={handleSignOut}
        >
          <LogOut className="h-5 w-5 shrink-0 transition-transform group-hover/exit:-translate-x-1" />
          {!collapsed && <span className="ml-3 font-bold text-sm tracking-wide">Sign Out</span>}
        </Button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
