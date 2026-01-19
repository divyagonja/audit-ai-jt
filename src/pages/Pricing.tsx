import Navigation from "@/components/landing/Navigation";
import PricingSection from "@/components/landing/PricingSection";
import ComparePlansTable from "@/components/landing/ComparePlansTable";
import PricingFAQ from "@/components/landing/PricingFAQ";
import Footer from "@/components/landing/Footer";
import { useEffect } from "react";

const Pricing = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Pricing - AuditAI";
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <main className="pt-20">
                <PricingSection />
                <ComparePlansTable />
                <PricingFAQ />
            </main>
            <Footer />
        </div>
    );
};

export default Pricing;
