import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Check, CreditCard, Download, Zap, TrendingUp, Shield, Activity, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const Billing = () => {
  const plans = [
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      current: false,
      description: "Ideal for growing portfolios and specialized consultants.",
      features: ["20 deep audits/month", "Standard AI Analysis", "PDF Branding", "Technical Support"],
    },
    {
      name: "Business",
      price: "$199",
      period: "/month",
      current: true,
      popular: true,
      description: "The enterprise standard for high-volume analysis.",
      features: ["100 deep audits/month", "Priority Neural Engine", "Full White-label", "API Endpoints", "Priority 24/7 Intel", "Team Multi-access"],
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      current: false,
      description: "Infinite scale for global agencies and conglomerates.",
      features: ["Infinite Capacity", "Dedicated AI Cluster", "Global SSO / IAM", "Provisioned Infra", "Strategic Account Lead", "Uptime SLA Guarantee"],
    },
  ];

  const invoices = [
    { id: "INV-2024-001", date: "Dec 1, 2024", amount: "$199.00", status: "Processed" },
    { id: "INV-2024-002", date: "Nov 1, 2024", amount: "$199.00", status: "Processed" },
    { id: "INV-2024-003", date: "Oct 1, 2024", amount: "$199.00", status: "Processed" },
  ];

  return (
    <div className="min-h-screen text-slate-100 font-sans selection:bg-blue-500/30">
      <div className="relative z-10 w-full">
        <DashboardHeader title="Billing & Subscription" subtitle="Manage your plan, payments, and view invoice history" />

        <div className="p-8 max-w-[1600px] mx-auto space-y-10 animate-fade-in-up">
          {/* Active Subscription Block */}
          <div className="glass-card border border-white/5 rounded-3xl p-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -mr-32 -mt-32 transition-colors group-hover:bg-blue-600/15"></div>

            <div className="grid lg:grid-cols-2 gap-12 relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
                  <Shield className="h-3 w-3" /> ACTIVE NODE
                </div>
                <h3 className="text-3xl font-black text-white mb-2 premium-gradient-text">Business Intelligence Plan</h3>
                <p className="text-slate-400 mb-8 max-w-md">Your enterprise-grade subscription is currently active and authorized for priority processing.</p>

                <div className="flex items-center gap-8">
                  <div className="p-4 bg-slate-950/50 border border-white/5 rounded-2xl flex-1">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Billing Sequence</p>
                    <p className="text-xl font-bold text-white mb-0.5">$199.00</p>
                    <p className="text-xs text-slate-500">Monthly auto-renewal</p>
                  </div>
                  <div className="p-4 bg-slate-950/50 border border-white/5 rounded-2xl flex-1">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Next Cycle</p>
                    <p className="text-xl font-bold text-white mb-0.5">Jan 01, 2025</p>
                    <p className="text-xs text-slate-500 italic flex items-center gap-1">
                      <Activity className="h-3 w-3 text-emerald-400" /> Authorized
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-8 border border-white/5 relative group/usage">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover/usage:scale-110 transition-transform">
                        <Zap className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-bold text-white">Neural Processing Units</p>
                        <p className="text-xs text-slate-500">Audit compute capacity used</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-white">15<span className="text-slate-500 text-sm">/100</span></span>
                    </div>
                  </div>

                  <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden mb-3 p-0.5 border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "15%" }}
                      className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium ml-1">Refreshing in <span className="text-blue-400 hover:underline cursor-pointer">26 days</span></p>

                  <Button variant="ghost" className="mt-6 w-full text-blue-400 hover:bg-blue-400/5 hover:text-blue-300 border border-transparent hover:border-blue-500/20 rounded-xl h-11 text-xs font-bold uppercase tracking-widest">Buy Overload Credits</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
              <h3 className="text-[10px] font-black font-sans uppercase tracking-[0.3em] text-slate-500 text-center">Protocol Selection Matrix</h3>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={cn(
                    "glass-card border flex flex-col rounded-3xl p-8 relative transition-all group hover:scale-[1.02] duration-500",
                    plan.current
                      ? "border-blue-500/50 bg-blue-500/[0.03] shadow-2xl shadow-blue-900/20"
                      : "border-white/5 hover:border-white/10"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-blue-900/40 z-20 flex items-center gap-2">
                      <Sparkles className="h-3 w-3" /> PREFERRED NODE
                    </div>
                  )}

                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-white mb-2">{plan.name}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed h-10">{plan.description}</p>
                  </div>

                  <div className="mb-8 p-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-black text-white tracking-tight">{plan.price}</span>
                      <span className="text-slate-500 font-bold text-sm tracking-wide">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-5 mb-10 flex-1">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                        <div className="mt-1 w-4 h-4 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 flex-shrink-0">
                          <Check className="h-2.5 w-2.5" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.current ? "outline" : "default"}
                    className={cn(
                      "w-full h-12 rounded-xl text-xs font-bold uppercase tracking-[0.15em] transition-all",
                      plan.current
                        ? "border-white/10 text-white hover:bg-white/5 cursor-default"
                        : plan.name === "Enterprise"
                          ? "bg-slate-800 hover:bg-slate-700 text-white border-white/5"
                          : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20"
                    )}
                    disabled={plan.current}
                  >
                    {plan.current ? "Active Integration" : plan.name === "Enterprise" ? "Contact Architecture" : `Switch to ${plan.name}`}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Payment & History Multi-block */}
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Method */}
            <div className="lg:col-span-4 self-start">
              <div className="glass-card border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl -mr-16 -mt-16 transition-all group-hover:bg-indigo-500/10"></div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-indigo-400" /> Payment Core
                </h3>

                <div className="p-6 bg-slate-950/50 border border-white/5 rounded-2xl group/card">
                  <div className="flex items-center justify-between mb-10">
                    <div className="w-12 h-8 bg-slate-800 rounded flex items-center justify-center overflow-hidden border border-white/10">
                      <div className="flex items-center -space-x-2">
                        <div className="w-5 h-5 rounded-full bg-rose-500 opacity-80" />
                        <div className="w-5 h-5 rounded-full bg-amber-500 opacity-80" />
                      </div>
                    </div>
                    <Activity className="h-4 w-4 text-emerald-500 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-xl font-mono text-white tracking-widest mb-2 font-medium">•••• •••• •••• 4242</p>
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Authorized Dec 2025</p>
                      <div className="flex items-center gap-1 text-emerald-400 text-[9px] font-bold">
                        <Shield className="h-3 w-3" /> SECURE
                      </div>
                    </div>
                  </div>
                </div>

                <Button variant="ghost" className="mt-6 w-full text-xs font-bold text-slate-400 hover:text-white border border-white/5 rounded-xl h-11 transition-all">Relink Alternate Identity</Button>
              </div>
            </div>

            {/* Ledger */}
            <div className="lg:col-span-8">
              <div className="glass-card border border-white/5 rounded-3xl shadow-xl overflow-hidden min-h-full">
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-400" /> Transaction Ledger
                  </h3>
                  <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-xs font-bold text-white h-9 px-4 rounded-xl border border-white/10">
                    Download Yearly Export
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/[0.02]">
                      <tr>
                        <th className="text-left px-8 py-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Transaction ID</th>
                        <th className="text-left px-8 py-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Timestamp</th>
                        <th className="text-left px-8 py-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Quantum</th>
                        <th className="text-left px-8 py-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Status</th>
                        <th className="text-right px-8 py-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Verification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {invoices.map((invoice, i) => (
                        <tr key={invoice.id} className="hover:bg-white/[0.01] transition-colors group">
                          <td className="px-8 py-5 text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{invoice.id}</td>
                          <td className="px-8 py-5 text-xs text-slate-500 font-medium">{invoice.date}</td>
                          <td className="px-8 py-5 text-sm text-white font-black">{invoice.amount}</td>
                          <td className="px-8 py-5">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-500/20">
                              <div className="w-1 h-1 rounded-full bg-emerald-400" />
                              {invoice.status}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-xl text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 transition-all">
                              <Download className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-6 bg-slate-900/30 text-center">
                  <p className="text-[10px] text-slate-600 uppercase font-sans tracking-widest">End of verified financial record</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
