import { Check, Minus, HelpCircle, Zap, Sparkles, Crown } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const ComparePlansTable = () => {
    const sections = [
        {
            category: "Core Features",
            items: [
                { name: "Monthly Site Audits", pro: "20", business: "100", enterprise: "Unlimited", info: "Number of full site scans you can run per month" },
                { name: "Pages Per Audit", pro: "1,000", business: "10,000", enterprise: "Unlimited", info: "Maximum number of pages crawled per audit" },
                { name: "Crawl Speed", pro: "Standard", business: "Fast", enterprise: "Turbo", info: "Speed at which our bots crawl your site" },
                { name: "Data Retention", pro: "30 Days", business: "1 Year", enterprise: "Unlimited", info: "How long we keep your historical audit data" },
            ]
        },
        {
            category: "Analysis & Reporting",
            items: [
                { name: "Technical SEO Analysis", pro: true, business: true, enterprise: true },
                { name: "Core Web Vitals", pro: true, business: true, enterprise: true },
                { name: "Competitor Analysis", pro: false, business: "5 Competitors", enterprise: "Unlimited" },
                { name: "White-label Reports", pro: false, business: true, enterprise: true, info: "Remove AuditAI branding from PDF reports" },
                { name: "PDF Export", pro: true, business: true, enterprise: true },
                { name: "Custom Branding", pro: false, business: false, enterprise: true },
            ]
        },
        {
            category: "Support & Security",
            items: [
                { name: "Email Support", pro: "Standard", business: "Priority", enterprise: "Dedicated Agent" },
                { name: "API Access", pro: false, business: true, enterprise: true },
                { name: "SSO (SAML)", pro: false, business: false, enterprise: true },
                { name: "SLA Guarantee", pro: false, business: false, enterprise: "99.9%" },
            ]
        }
    ];

    const planHeaders = [
        { name: "Professional", price: "$79/mo", icon: Zap, color: "text-blue-500", bg: "bg-blue-50" },
        { name: "Business", price: "$199/mo", icon: Sparkles, color: "text-purple-500", bg: "bg-purple-50" },
        { name: "Enterprise", price: "Custom", icon: Crown, color: "text-orange-500", bg: "bg-orange-50" },
    ];

    return (
        <section className="py-24 bg-slate-50/50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-navy/5 text-navy px-4 py-2 rounded-full mb-4">
                        <span className="text-sm font-bold uppercase tracking-wider">Features Comparison</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-navy mb-4">
                        One Platform. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 animate-gradient">Tailored for Scale.</span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        A detailed breakdown to help you find the perfect match for your business needs.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-[2rem] shadow-2xl shadow-navy/5 border border-slate-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[900px]">
                                <thead>
                                    <tr className="border-b border-slate-100">
                                        <th className="text-left p-10 w-1/4 align-bottom">
                                            <div className="space-y-1">
                                                <h3 className="text-2xl font-bold text-navy">Plan Features</h3>
                                                <p className="text-sm text-slate-500 font-normal">Everything you need to grow</p>
                                            </div>
                                        </th>
                                        {planHeaders.map((plan) => (
                                            <th key={plan.name} className={`p-8 w-1/4 text-center ${plan.name === 'Business' ? 'bg-slate-50/50' : ''}`}>
                                                <div className="flex flex-col items-center gap-4">
                                                    <div className={`w-12 h-12 ${plan.bg} ${plan.color} rounded-2xl flex items-center justify-center`}>
                                                        <plan.icon size={24} />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xl font-bold text-navy">{plan.name}</h4>
                                                        <p className="text-primary font-bold">{plan.price}</p>
                                                    </div>
                                                    <button className="w-full py-2.5 px-4 rounded-xl text-xs font-bold border border-slate-200 hover:bg-navy hover:text-white transition-all">
                                                        Get Started
                                                    </button>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {sections.map((section) => (
                                        <React.Fragment key={section.category}>
                                            <tr className="bg-slate-50/80">
                                                <td colSpan={4} className="py-4 px-10">
                                                    <span className="text-sm font-bold text-navy/60 uppercase tracking-widest">{section.category}</span>
                                                </td>
                                            </tr>
                                            {section.items.map((item, idx) => (
                                                <tr key={idx} className="border-b border-slate-50 group hover:bg-slate-50/30 transition-all">
                                                    <td className="py-6 px-10">
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-slate-700 font-semibold group-hover:text-primary transition-colors">{item.name}</span>
                                                            {item.info && (
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger>
                                                                            <HelpCircle className="h-4 w-4 text-slate-300 hover:text-navy cursor-help transition-colors" />
                                                                        </TooltipTrigger>
                                                                        <TooltipContent className="max-w-[240px] p-4 bg-navy text-white rounded-xl">
                                                                            <p className="text-xs leading-relaxed">{item.info}</p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="py-6 px-8 text-center">{renderCell(item.pro)}</td>
                                                    <td className="py-6 px-8 text-center bg-slate-50/30">{renderCell(item.business)}</td>
                                                    <td className="py-6 px-8 text-center">{renderCell(item.enterprise)}</td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
                        Need a custom plan for your organization? <a href="/contact" className="text-primary font-bold hover:underline">Talk to our experts.</a>
                    </p>
                </div>
            </div>
        </section>
    );
};

const renderCell = (value: string | boolean) => {
    if (value === true) {
        return (
            <div className="flex justify-center">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center border border-green-200">
                    <Check className="h-3.5 w-3.5 text-green-600 stroke-[3px]" />
                </div>
            </div>
        );
    }
    if (value === false) {
        return (
            <div className="flex justify-center">
                <Minus className="h-5 w-5 text-slate-200" />
            </div>
        );
    }
    return <span className="text-sm font-bold text-navy/80 tracking-tight">{value}</span>;
};

import React from "react";
export default ComparePlansTable;

