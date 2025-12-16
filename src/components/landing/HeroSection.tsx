import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, CheckCircle } from "lucide-react";

const HeroSection = () => {
  const [url, setUrl] = useState("");

  const trustItems = [
    { icon: CheckCircle, text: "No credit card required" },
    { icon: Clock, text: "Results in 60 seconds" },
    { icon: Shield, text: "Enterprise-grade security" },
  ];

  return (
    <section className="hero-gradient pt-32 pb-20 lg:pt-40 lg:pb-32">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">
              Trusted by 1,200+ enterprise teams
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Enterprise-Grade
            <br />
            <span className="text-gold">Website Intelligence</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            AI-Powered Audits. Instant Insights. Measurable ROI.
          </p>

          {/* URL Input */}
          <div className="max-w-xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20">
              <input
                type="url"
                placeholder="Enter your website URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 px-4 py-3 bg-white rounded-lg text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <Button variant="hero" size="lg" className="group">
                Audit My Site
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            {trustItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-white/70">
                <item.icon className="h-4 w-4 text-gold" />
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
