import React, { useEffect } from 'react';
import Navigation from '@/components/landing/Navigation';
import Footer from '@/components/landing/Footer';
import AboutHero from '@/components/landing/AboutHero';
import AboutMission from '@/components/landing/AboutMission';
import SocialProof from '@/components/landing/SocialProof';

const AboutUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <main className="pt-16">
                <AboutHero />
                <SocialProof />
                <AboutMission />
                {/* Call to Action section could be added here */}
                <section className="py-24 bg-navy text-center relative overflow-hidden">
                    <div className="container mx-auto px-6 relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                            Ready to scale your search <br /> performance?
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => window.location.href = '/auth'}
                                className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                            >
                                Start Your Free Audit
                            </button>
                            <button
                                onClick={() => window.location.href = '/pricing'}
                                className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/20"
                            >
                                View Pricing
                            </button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default AboutUs;
