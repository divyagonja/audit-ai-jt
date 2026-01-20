import { useEffect, useState } from 'react';
import Navigation from '@/components/landing/Navigation';
import Footer from '@/components/landing/Footer';
import { Cookie, Settings, ShieldAlert, BarChart, X, Check } from 'lucide-react';

const CookiePolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Cookie Policy - AuditAI";
    }, []);

    const cookieTypes = [
        {
            title: "Strictly Necessary",
            desc: "Essential for the website to function. These cannot be switched off.",
            icon: ShieldAlert,
            color: "text-rose-400",
            bg: "bg-rose-500/10",
            required: true
        },
        {
            title: "Performance & Analytics",
            desc: "Allow us to count visits and traffic sources to improve performance.",
            icon: BarChart,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            required: false
        },
        {
            title: "Functional Cookies",
            desc: "Enable enhanced functionality and personalization (e.g. live chat).",
            icon: Settings,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            required: false
        }
    ];

    const handleOpenSettings = () => {
        // Dispatch custom event to trigger the CookieConsent component
        window.dispatchEvent(new Event('showCookieConsent'));
    };

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-slate-300 selection:bg-indigo-500/30">
            <Navigation />

            {/* Hero */}
            <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950">
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-block relative">
                        <div className="absolute inset-0 bg-indigo-500 blur-[60px] opacity-20 animate-pulse"></div>
                        <Cookie className="w-24 h-24 text-indigo-400 relative z-10 mb-8 animate-bounce-slow" />
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Cookie Policy</h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Total transparency on how we use cookies to improve your experience.
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto grid gap-8">
                        {cookieTypes.map((cookie, index) => (
                            <div key={index} className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 hover:border-indigo-500/30 transition-all">
                                <div className={`w-16 h-16 rounded-2xl ${cookie.bg} flex items-center justify-center flex-shrink-0`}>
                                    <cookie.icon className={`w-8 h-8 ${cookie.color}`} />
                                </div>

                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-2xl font-bold text-white mb-2">{cookie.title}</h3>
                                    <p className="text-slate-400">{cookie.desc}</p>
                                </div>

                                <div className="flex-shrink-0">
                                    {cookie.required ? (
                                        <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 font-mono text-sm flex items-center gap-2 cursor-not-allowed">
                                            <ShieldAlert className="w-4 h-4" />
                                            ALWAYS ACTIVE
                                        </div>
                                    ) : (
                                        <button
                                            onClick={handleOpenSettings}
                                            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-lg flex items-center gap-2"
                                        >
                                            Manage
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 max-w-3xl mx-auto text-center p-12 bg-indigo-900/10 rounded-[3rem] border border-indigo-500/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]" />
                        <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Manage Your Preferences</h2>
                        <p className="text-slate-400 mb-8 relative z-10">
                            You can change your cookie preferences at any time by clicking the button below. This will reopen the consent banner.
                        </p>
                        <button
                            onClick={handleOpenSettings}
                            className="px-8 py-4 bg-white text-indigo-950 font-bold rounded-xl hover:bg-indigo-50 transition-all shadow-xl relative z-10"
                        >
                            Open Cookie Settings
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default CookiePolicy;
