import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import KnowledgeHero from "@/components/knowledge-base/KnowledgeHero";
import KnowledgeContent from "@/components/knowledge-base/KnowledgeContent";
import { useEffect } from "react";

const KnowledgeBase = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <main className="pt-20">
                <KnowledgeHero />
                <KnowledgeContent />
            </main>
            <Footer />
        </div>
    );
};

export default KnowledgeBase;
