import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Pricing from "./pages/Pricing";
import Features from "./pages/Features";
import KnowledgeBase from "./pages/KnowledgeBase";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Contact from "./pages/Contact";
import NewAudit from "./pages/dashboard/NewAudit";
import AllAudits from "./pages/dashboard/AllAudits";
import AuditResults from "./pages/dashboard/AuditResults";
import Settings from "./pages/dashboard/Settings";
import Billing from "./pages/dashboard/Billing";
import Reports from "./pages/dashboard/Reports";
import Competitors from "./pages/dashboard/Competitors";
import DomainOverview from "./pages/dashboard/DomainOverview";
import AIAnalysis from "./pages/dashboard/AIAnalysis";
import Roadmap from "./pages/dashboard/Roadmap";
import Clients from "./pages/dashboard/Clients";
import AIFeaturesDemo from "./pages/dashboard/AIFeaturesDemo";
import QuickAuditDemo from "./pages/dashboard/QuickAuditDemo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/features" element={<Features />} />
          <Route path="/knowledge-base" element={<KnowledgeBase />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="new-audit" element={<NewAudit />} />
            <Route path="audits" element={<AllAudits />} />
            <Route path="audits/:id" element={<AuditResults />} />
            <Route path="clients" element={<Clients />} />
            <Route path="settings" element={<Settings />} />
            <Route path="billing" element={<Billing />} />
            <Route path="reports" element={<Reports />} />
            <Route path="competitors" element={<Competitors />} />
            <Route path="domain-overview" element={<DomainOverview />} />
            <Route path="ai-analysis" element={<AIAnalysis />} />
            <Route path="roadmap" element={<Roadmap />} />
            <Route path="ai-features" element={<AIFeaturesDemo />} />
            <Route path="quick-audit" element={<QuickAuditDemo />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
