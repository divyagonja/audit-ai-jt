import { 
  Brain, 
  Zap, 
  Shield, 
  TrendingUp, 
  Palette, 
  Plug 
} from "lucide-react";

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
            <div
              key={index}
              className="group bg-card border border-slate-200 rounded-xl p-8 card-hover animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-navy mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
