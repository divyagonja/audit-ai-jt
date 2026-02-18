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
import Careers from "./pages/Careers";
import Newsroom from "./pages/Newsroom";
import Webinars from "./pages/Webinars";
import CaseStudies from "./pages/CaseStudies";
import Security from "./pages/Security";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import Enterprise from "./pages/Enterprise";
import Blog from "./pages/Blog";
import Press from "./pages/Press";
import GDPR from "./pages/GDPR";
import CookieConsent from "./components/common/CookieConsent";
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
import KnowledgeArticle from "./pages/KnowledgeArticle";
import QuickAuditDemo from "./pages/dashboard/QuickAuditDemo";
import KeywordMagic from "./pages/dashboard/KeywordMagic";
import SEOWritingAssistant from "./pages/dashboard/SEOWritingAssistant";
import TopicResearch from "./pages/dashboard/TopicResearch";
import KeywordGap from "./pages/dashboard/KeywordGap";
import PositionTracker from "./pages/dashboard/PositionTracker";

import ContentBrief from "./pages/dashboard/ContentBrief";
import BacklinkManager from "./pages/dashboard/BacklinkManager";
import SchemaGenerator from "./pages/dashboard/SchemaGenerator";
import Cannibalization from "./pages/dashboard/Cannibalization";
import LocalSeo from "./pages/dashboard/LocalSeo";
import LinkToxicity from "./pages/dashboard/LinkToxicity";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CookieConsent />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/features" element={<Features />} />
          <Route path="/knowledge-base" element={<KnowledgeBase />} />
          <Route path="/knowledge-base/:slug" element={<KnowledgeArticle />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/newsroom" element={<Newsroom />} />
          <Route path="/webinars" element={<Webinars />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/security" element={<Security />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/gdpr" element={<GDPR />} />
          <Route path="/enterprise" element={<Enterprise />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/press" element={<Press />} />
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
            <Route path="keyword-magic" element={<KeywordMagic />} />
            <Route path="seo-writing-assistant" element={<SEOWritingAssistant />} />
            <Route path="topic-research" element={<TopicResearch />} />
            <Route path="keyword-gap" element={<KeywordGap />} />
            <Route path="position-tracker" element={<PositionTracker />} />
            <Route path="content-brief" element={<ContentBrief />} />
            <Route path="backlink-manager" element={<BacklinkManager />} />
            <Route path="schema-generator" element={<SchemaGenerator />} />
            <Route path="cannibalization" element={<Cannibalization />} />
            <Route path="local-seo" element={<LocalSeo />} />
            <Route path="link-toxicity" element={<LinkToxicity />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
