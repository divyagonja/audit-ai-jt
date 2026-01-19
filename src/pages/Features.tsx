import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import FeatureHero from "@/components/landing/FeatureHero";
import ProductShowcase from "@/components/landing/ProductShowcase";
import WorkflowTimeline from "@/components/landing/WorkflowTimeline";
import FeaturesSection from "@/components/landing/FeaturesSection";
import { useEffect } from "react";

const Features = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Features - AuditAI";
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <main>
                <FeatureHero />
                <WorkflowTimeline />
                <ProductShowcase />
                <FeaturesSection />
            </main>
            <Footer />
        </div>
    );
};

export default Features;
