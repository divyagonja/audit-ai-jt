import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Check, CreditCard, Download, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const Billing = () => {
  const plans = [
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      current: false,
      features: ["20 audits/month", "AI recommendations", "PDF exports", "Email support"],
    },
    {
      name: "Business",
      price: "$199",
      period: "/month",
      current: true,
      popular: true,
      features: ["100 audits/month", "Priority AI", "White-label", "API access", "Priority support", "Team collaboration"],
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      current: false,
      features: ["Unlimited audits", "Dedicated AI", "Custom branding", "SSO", "Dedicated CSM", "SLA guarantee"],
    },
  ];

  const invoices = [
    { id: "INV-2024-001", date: "Dec 1, 2024", amount: "$199.00", status: "Paid" },
    { id: "INV-2024-002", date: "Nov 1, 2024", amount: "$199.00", status: "Paid" },
    { id: "INV-2024-003", date: "Oct 1, 2024", amount: "$199.00", status: "Paid" },
  ];

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Billing" subtitle="Manage your subscription and payment methods" />

      <div className="p-8 space-y-8">
        {/* Current Plan */}
        <div className="bg-card border border-slate-200 rounded-xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-navy">Current Plan</h3>
              <p className="text-slate-600">You are currently on the Business plan</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-navy">$199<span className="text-lg font-normal text-slate-600">/mo</span></p>
              <p className="text-sm text-slate-600">Next billing: Jan 1, 2025</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-navy">Audit Credits</p>
                <p className="text-sm text-slate-600">15 of 100 used this month</p>
              </div>
            </div>
            <div className="w-48 h-3 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "15%" }} />
            </div>
          </div>
        </div>

        {/* Plans */}
        <div>
          <h3 className="text-xl font-semibold text-navy mb-6">Available Plans</h3>
          <div className="grid grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "bg-card border-2 rounded-xl p-6 relative",
                  plan.current ? "border-primary" : "border-slate-200"
                )}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                    Current Plan
                  </span>
                )}

                <h4 className="text-lg font-semibold text-navy mb-2">{plan.name}</h4>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-navy">{plan.price}</span>
                  <span className="text-slate-600">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-slate-600">
                      <Check className="h-4 w-4 text-success" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.current ? "outline" : "default"}
                  className="w-full"
                  disabled={plan.current}
                >
                  {plan.current ? "Current Plan" : plan.name === "Enterprise" ? "Contact Sales" : "Upgrade"}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-card border border-slate-200 rounded-xl p-8 shadow-sm">
          <h3 className="text-xl font-semibold text-navy mb-6">Payment Method</h3>

          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-slate-900 rounded flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-navy">•••• •••• •••• 4242</p>
                <p className="text-sm text-slate-600">Expires 12/2025</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Update</Button>
          </div>
        </div>

        {/* Invoices */}
        <div className="bg-card border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-xl font-semibold text-navy">Billing History</h3>
          </div>

          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase">Invoice</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase">Date</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase">Amount</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-navy">{invoice.id}</td>
                  <td className="px-6 py-4 text-slate-600">{invoice.date}</td>
                  <td className="px-6 py-4 text-slate-600">{invoice.amount}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-success/10 text-success text-xs font-semibold rounded-full">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Billing;
