import {
  Brain,
  Zap,
  Shield,
  TrendingUp,
  Palette,
  Plug
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import TiltCard from "./TiltCard";


const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze over 200 ranking factors to identify optimization opportunities.",
    },
    {
      icon: Zap,
      title: "Real-Time Intelligence",
      description: "Get instant insights with live monitoring and automated alerts when issues are detected.",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "SOC 2 Type II certified with end-to-end encryption and role-based access controls.",
    },
    {
      icon: TrendingUp,
      title: "Revenue Impact Tracking",
      description: "Quantify the business impact of every fix with predictive revenue modeling.",
    },
    {
      icon: Palette,
      title: "White-Label Platform",
      description: "Customize the platform with your brand colors, logo, and custom domain.",
    },
    {
      icon: Plug,
      title: "Enterprise Integrations",
      description: "Connect with Jira, Slack, Salesforce, and 50+ other enterprise tools.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Enterprise-Grade Capabilities
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Built for scale, designed for results. Everything you need to optimize your digital presence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  feature: {
    icon: any;
    title: string;
    description: string;
  };
  index: number;
}

const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  const ref = useScrollAnimation({ threshold: 0.1 });

  return (
    <TiltCard
      className="relative group/card h-full"
      style={{ perspective: "1000px" }}
    >
      <div
        ref={ref}
        className="scroll-animate-scale h-full"
        style={{ transitionDelay: `${index * 0.1}s` }}
      >
        <div className="relative bg-white border border-slate-200 rounded-[2rem] p-8 h-full transition-all duration-500 hover:shadow-[0_20px_50px_-10px_rgba(59,130,246,0.15)] hover:border-primary/50 group-hover/card:-translate-y-2">
          {/* Subtle Glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-cyan-500/10 opacity-0 group-hover/card:opacity-100 blur-xl transition-opacity duration-500 rounded-[2.5rem]" />

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-6 group-hover/card:scale-110 group-hover/card:bg-primary transition-all duration-500">
              <feature.icon className="h-8 w-8 text-primary group-hover/card:text-white transition-colors duration-500" />
            </div>

            <h3 className="text-2xl font-bold text-navy mb-4 group-hover/card:text-primary transition-colors">
              {feature.title}
            </h3>

            <p className="text-slate-600 leading-relaxed font-medium">
              {feature.description}
            </p>

            <div className="mt-8 flex items-center gap-2 text-primary font-bold text-sm opacity-0 group-hover/card:opacity-100 -translate-x-2 group-hover/card:translate-x-0 transition-all duration-500">
              Learn deeper
              <Zap className="h-4 w-4 fill-current" />
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

export default FeaturesSection;

