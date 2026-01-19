import { useEffect } from "react";
import Navigation from "@/components/landing/Navigation";
import HeroSection from "@/components/landing/HeroSection";
import SocialProof from "@/components/landing/SocialProof";
import StatsSection from "@/components/landing/StatsSection";
import ProductShowcase from "@/components/landing/ProductShowcase";
import UseCasesSection from "@/components/landing/UseCasesSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  useEffect(() => {
    document.title = "AuditAI - Modern Website Intelligence";
  }, []);

  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Navigation />
      <main>
        <HeroSection />
        <SocialProof />
        <StatsSection />
        <ProductShowcase />
        <UseCasesSection />
        <FeaturesSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
