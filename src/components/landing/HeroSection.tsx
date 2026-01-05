import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, CheckCircle } from "lucide-react";
import { useParallax } from "@/hooks/useScrollAnimation";
import SpotlightBackground from "./SpotlightBackground";

const HeroSection = () => {
  const [url, setUrl] = useState("");
  const parallaxRef = useParallax(0.3);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const trustItems = [
    { icon: CheckCircle, text: "No credit card required" },
    { icon: Clock, text: "Results in 60 seconds" },
    { icon: Shield, text: "Enterprise-grade security" },
  ];

  return (
    <SpotlightBackground className="hero-gradient pt-32 pb-20 lg:pt-40 lg:pb-32">
      {/* Dimming Overlay */}
      <div
        className={`fixed inset-0 bg-navy/60 transition-all duration-500 ${isInputFocused ? "z-40 opacity-100 pointer-events-auto" : "-z-10 opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsInputFocused(false)}
      />
      {/* Animated Deep Space Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-gold/10 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] bg-blue-light/10 rounded-full blur-[80px] -translate-x-1/2" />

        {/* Parallax Overlay */}
        <div
          ref={parallaxRef}
          className="absolute inset-0 parallax opacity-30 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
          }}
        />
      </div>

      <div className={`container mx-auto px-6 relative transition-all duration-500 ${isInputFocused ? "z-50" : "z-10"}`}>
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-in relative z-10">
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">
              Trusted by 1,200+ enterprise teams
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up relative z-10" style={{ animationDelay: "0.1s" }}>
            Enterprise-Grade
            <br />
            <span className="text-gold">Website Intelligence</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto animate-fade-in-up relative z-10" style={{ animationDelay: "0.2s" }}>
            AI-Powered Audits. Instant Insights. Measurable ROI.
          </p>


          {/* URL Input */}
          <div
            className={`relative max-w-xl mx-auto mb-8 animate-fade-in-up transition-all duration-300 ${isInputFocused ? "z-50 scale-105" : "z-20"
              }`}
            style={{ animationDelay: "0.3s" }}
          >
            <div className={`flex flex-col sm:flex-row gap-3 p-2 rounded-xl border transition-all duration-300 ${isInputFocused
              ? "bg-navy/90 border-gold shadow-[0_0_30px_rgba(255,215,0,0.3)] ring-1 ring-gold/50"
              : "bg-white/10 border-white/20 backdrop-blur-md"
              }`}>
              <input
                type="url"
                placeholder="Enter your website URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                className="flex-1 px-4 py-3 bg-transparent rounded-lg text-white placeholder:text-slate-400 focus:outline-none"
              />
              <MagneticWrapper>
                <Button variant="hero" size="lg" className="group w-full sm:w-auto">
                  Audit My Site
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </MagneticWrapper>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 animate-fade-in-up relative z-10" style={{ animationDelay: "0.4s" }}>
            {trustItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-white/70">
                <item.icon className="h-4 w-4 text-gold" />
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SpotlightBackground>
  );
};

export default HeroSection;

const MagneticWrapper = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};
