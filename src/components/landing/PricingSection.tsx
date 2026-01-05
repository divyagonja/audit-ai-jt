import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "Professional",
      price: { monthly: "$79", yearly: "$63" },
      period: "/month",
      description: "Perfect for growing businesses",
      icon: Zap,
      gradient: "from-blue-500 to-cyan-500",
      features: [
        "20 audits per month",
        "AI-powered recommendations",
        "PDF export reports",
        "Email support",
        "Basic integrations",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Business",
      price: { monthly: "$199", yearly: "$159" },
      period: "/month",
      description: "For teams that need more power",
      icon: Sparkles,
      gradient: "from-purple-500 to-pink-500",
      features: [
        "100 audits per month",
        "Priority AI analysis",
        "White-label reports",
        "API access",
        "Priority support",
        "Advanced integrations",
        "Team collaboration",
      ],
      cta: "Start Free Trial",
      popular: true,
      savings: billingCycle === "yearly" ? "Save $480/yr" : "Save 30%",
    },
    {
      name: "Enterprise",
      price: { monthly: "Custom", yearly: "Custom" },
      period: "",
      description: "For large-scale operations",
      icon: Crown,
      gradient: "from-orange-500 to-red-500",
      features: [
        "Unlimited audits",
        "Dedicated AI resources",
        "Custom branding",
        "SSO & SAML",
        "Dedicated CSM",
        "Custom integrations",
        "SLA guarantee",
        "On-premise option",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold">Pricing Plans</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-navy mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Start with a 14-day free trial. No credit card required. Cancel anytime.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-24">
          <div className="bg-slate-100 p-1 rounded-xl inline-flex items-center relative">
            <div className="relative z-10 flex">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-8 py-2.5 rounded-lg text-sm font-semibold transition-colors ${billingCycle === "monthly" ? "text-navy" : "text-slate-500 hover:text-slate-700"
                  }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-8 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${billingCycle === "yearly" ? "text-navy" : "text-slate-500 hover:text-slate-700"
                  }`}
              >
                Yearly
                <span className="bg-green-100 text-green-700 text-[10px] uppercase px-2 py-0.5 rounded-full">
                  -20%
                </span>
              </button>
            </div>
            {/* Sliding Background */}
            <motion.div
              className="absolute top-1 bottom-1 bg-white rounded-lg shadow-sm border border-slate-200 z-0"
              initial={false}
              animate={{
                left: billingCycle === "monthly" ? "4px" : "50%",
                width: billingCycle === "monthly" ? "calc(50% - 4px)" : "calc(50% - 4px)",
                x: billingCycle === "monthly" ? 0 : 0
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              plan={plan}
              index={index}
              billingCycle={billingCycle}
            />
          ))}
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-12">
          <p className="text-slate-500 text-sm">
            💳 All plans include SSL encryption • 🔒 SOC 2 Type II Certified • ⚡ 99.9% Uptime SLA
          </p>
        </div>
      </div>
    </section>
  );
};

interface PricingCardProps {
  plan: {
    name: string;
    price: { monthly: string; yearly: string };
    period: string;
    description: string;
    icon: any;
    gradient: string;
    features: string[];
    cta: string;
    popular: boolean;
    savings?: string;
  };
  index: number;
  billingCycle: "monthly" | "yearly";
}

const PricingCard = ({ plan, index, billingCycle }: PricingCardProps) => {
  const ref = useScrollAnimation({ threshold: 0.2 });
  const navigate = useNavigate();

  const handleCtaClick = () => {
    if (plan.cta === "Start Free Trial") {
      navigate("/auth?mode=signup");
    } else {
      console.log("Clicked:", plan.cta);
    }
  };

  return (
    <TiltCard
      className={`relative h-full ${plan.popular ? "md:-mt-4 md:mb-4 z-20" : "z-10"}`}
      style={{ perspective: "1200px" }}
    >
      <div
        ref={ref}
        className="h-full scroll-animate-scale relative group/card"
        style={{ transitionDelay: `${index * 0.1}s` }}
      >
        {/* Glow Effect */}
        <div className={`absolute -inset-4 bg-gradient-to-r ${plan.gradient} opacity-0 group-hover/card:opacity-20 blur-2xl transition-opacity duration-500 rounded-[2.5rem]`} />

        {/* Popular Badge */}
        {plan.popular && (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none w-full flex justify-center">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-xl flex items-center gap-2 border border-white/20"
            >
              <Sparkles className="h-3 w-3 animate-pulse" />
              Most Popular
            </motion.div>
          </div>
        )}

        {/* Savings Badge */}
        {plan.savings && billingCycle === 'yearly' && (
          <div className="absolute top-4 right-4 z-40 pointer-events-none">
            <div className="bg-amber-400 text-navy text-[10px] font-black px-3 py-1 rounded-lg shadow-xl uppercase tracking-tighter animate-bounce">
              {plan.savings}
            </div>
          </div>
        )}

        <div
          className={`relative bg-white rounded-[2.5rem] overflow-hidden transition-all duration-300 h-full flex flex-col ${plan.popular
            ? "border-2 border-purple-500/50 shadow-[0_30px_60px_-15px_rgba(147,51,234,0.3)] scale-[1.02]"
            : "border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/10"
            }`}
        >
          {/* Header Section */}
          <div className="relative p-10 pb-6 overflow-hidden">
            {/* Background Accent */}
            <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${plan.gradient} opacity-10 rounded-full blur-3xl -mr-20 -mt-20`} />

            <div className="relative z-10 flex items-start justify-between mb-8">
              <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${plan.gradient} p-4 shadow-lg flex items-center justify-center transform group-hover/card:scale-110 transition-transform duration-500`}>
                <plan.icon className="h-8 w-8 text-white stroke-[2.5px]" />
              </div>
            </div>

            <div className="relative z-10 text-left">
              <h3 className="text-3xl font-black text-navy mb-2 tracking-tight">{plan.name}</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-[90%]">{plan.description}</p>
            </div>
          </div>

          {/* Price Section */}
          <div className="px-10 py-6 relative z-10 border-y border-slate-50 bg-slate-50/30">
            <div className="flex items-baseline gap-1">
              <span className={`text-6xl font-black tracking-tighter ${plan.popular ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600' : 'text-navy'}`}>
                {plan.price[billingCycle]}
              </span>
              {plan.period && plan.price[billingCycle] !== "Custom" && (
                <span className="text-slate-400 font-bold text-lg mb-1">{plan.period}</span>
              )}
            </div>
            {billingCycle === 'yearly' && plan.price[billingCycle] !== "Custom" && (
              <div className="mt-2">
                <p className="text-[10px] text-primary font-black uppercase tracking-widest leading-tight">Billed Annually</p>
              </div>
            )}
          </div>

          {/* Features Section */}
          <div className="p-10 flex-grow flex flex-col justify-between">
            <ul className="space-y-5">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center gap-4 group/feature text-left">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${plan.gradient} p-1.5 flex items-center justify-center transform group-hover/feature:scale-125 transition-transform`}>
                    <Check className="h-full w-full text-white stroke-[3px]" />
                  </div>
                  <span className="text-slate-600 font-semibold text-sm tracking-tight">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <Button
                onClick={handleCtaClick}
                className={`w-full h-14 rounded-2xl font-black tracking-wider uppercase text-xs transition-all duration-300 ${plan.popular
                  ? `bg-gradient-to-r ${plan.gradient} text-white shadow-xl shadow-purple-500/25 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/40 active:scale-95`
                  : "bg-navy text-white hover:bg-slate-900 shadow-xl shadow-navy/10 hover:shadow-navy/20 active:scale-95"
                  }`}
              >
                {plan.cta}
              </Button>
              <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-4">14-Day Free Trial • No CC Required</p>
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

export default PricingSection;
