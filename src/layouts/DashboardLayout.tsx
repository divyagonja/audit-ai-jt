import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { cn } from "@/lib/utils";

const DashboardLayout = () => {
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      }
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dashboard-bg">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 animate-pulse shadow-xl" />
          <span className="text-white font-semibold text-lg">Loading Dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dashboard-bg flex overflow-hidden">
      <div className="fixed inset-0 pointer-events-none dashboard-bg-overlay opacity-20 z-0"></div>

      <DashboardSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      {/* Dynamic Spacer for the fixed sidebar */}
      <div
        className={cn(
          "transition-all duration-500 flex-shrink-0",
          sidebarCollapsed ? "w-20" : "w-72"
        )}
      />

      <main
        className="min-h-screen flex-1 min-w-0 transition-all duration-300 pb-24 relative z-10 overflow-y-auto overflow-x-auto"
      >
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
