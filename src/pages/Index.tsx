import { useEffect } from "react";
import Navigation from "@/components/landing/Navigation";
// ... (trimmed for chunk)
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


