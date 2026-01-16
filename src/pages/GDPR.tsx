import { useEffect } from 'react';
import Navigation from '@/components/landing/Navigation';
import Footer from '@/components/landing/Footer';
import { Flag, ShieldCheck, Globe, Database, UserCheck } from 'lucide-react';

const GDPR = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const rights = [
        {
            title: "Right to Access",
            desc: "You have the right to request copies of your personal data.",
            icon: Eye
        },
        {
            title: "Right to Rectification",
            desc: "You have the right to request that we correct any information you believe is inaccurate.",
            icon: Tool
        },
        {
            title: "Right to Erasure",
            desc: "You have the right to request that we erase your personal data, under certain conditions.",
            icon: Trash2
        },
        {
            title: "Right to Restrict Processing",
            desc: "You have the right to request that we restrict the processing of your personal data.",
            icon: PauseCircle
        }
    ];

    // Helper icons
    function Eye(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg> }
    function Tool(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg> }
    function Trash2(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg> }
    function PauseCircle(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="10" x2="10" y1="15" y2="9" /><line x1="14" x2="14" y1="15" y2="9" /></svg> }

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-slate-300 selection:bg-blue-500/30">
            <Navigation />

            {/* Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-blue-950 to-slate-950">
                {/* EU Stars Abstract */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-dashed border-yellow-500/10 rounded-full animate-[spin_60s_linear_infinite]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-dashed border-yellow-500/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                            <Flag className="w-4 h-4 text-blue-400" />
                            <span className="text-blue-400 text-sm font-semibold">General Data Protection Regulation</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
                            We are <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-yellow-400">GDPR Compliant</span>
                        </h1>
                        <p className="text-xl text-slate-400 mb-10">
                            AuditAI is committed to ensuring the security and protection of the personal information that we process, and to provide a compliant and consistent approach to data protection.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 mb-20">
                        <div className="space-y-6">
                            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                                <Database className="w-6 h-6 text-emerald-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Data Controller & Processor</h2>
                            <p className="text-slate-400 leading-relaxed">
                                AuditAI acts as both a Data Controller (for our direct customers) and a Data Processor (for the data our customers analyze). We have signed Data Processing Agreements (DPAs) with all our sub-processors.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                                <Globe className="w-6 h-6 text-blue-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">International Transfers</h2>
                            <p className="text-slate-400 leading-relaxed">
                                For data transferred outside of the EEA, we rely on Standard Contractual Clauses (SCCs) to ensure that your data remains protected in accordance with EU standards.
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12">
                        <h2 className="text-3xl font-bold text-white mb-12 text-center">Your GDPR Rights</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {rights.map((right, index) => (
                                <div key={index} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/30 transition-colors group">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-lg bg-blue-900/20 text-blue-400 mt-1">
                                            <right.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{right.title}</h3>
                                            <p className="text-slate-400 text-sm">
                                                {right.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default GDPR;
