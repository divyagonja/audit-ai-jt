import { useEffect, useState } from 'react';
import Navigation from '@/components/landing/Navigation';
import Footer from '@/components/landing/Footer';
import { Scale, FileText, Check, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

const TermsOfService = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Terms of Service - AuditAI";
    }, []);

    const [openSection, setOpenSection] = useState<number | null>(0);

    const terms = [
        {
            title: "1. Agreement to Terms",
            content: "By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service. This agreement serves as a legally binding contract between you and AuditAI."
        },
        {
            title: "2. Intellectual Property Rights",
            content: "Other than the content you own, under these Terms, AuditAI and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website."
        },
        {
            title: "3. Restrictions",
            content: "You are specifically restricted from all of the following: publishing any Website material in any other media; selling, sublicensing and/or otherwise commercializing any Website material; publicly performing and/or showing any Website material; using this Website in any way that is or may be damaging to this Website."
        },
        {
            title: "4. User Content",
            content: "In these Website Standard Terms and Conditions, 'Your Content' shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant AuditAI a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media."
        },
        {
            title: "5. Limitation of Liability",
            content: "In no event shall AuditAI, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. AuditAI, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-slate-300 selection:bg-amber-500/30">
            <Navigation />

            {/* Hero */}
            <section className="relative pt-32 pb-24 overflow-hidden border-b border-white/5">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-amber-500/5 to-transparent rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-8 mx-auto">
                        <Scale className="w-8 h-8 text-amber-500" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Terms of Service</h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Please read these terms carefully before using our services.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-6 py-24 relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-800 to-transparent hidden lg:block" />

                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="space-y-6">
                        {terms.map((term, index) => (
                            <div
                                key={index}
                                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${openSection === index
                                    ? 'bg-slate-900 border-amber-500/30 shadow-2xl shadow-amber-900/10'
                                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenSection(openSection === index ? null : index)}
                                    className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg font-mono transition-colors ${openSection === index ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-500'
                                            }`}>
                                            {index + 1}
                                        </div>
                                        <h3 className={`text-xl font-bold transition-colors ${openSection === index ? 'text-white' : 'text-slate-300'
                                            }`}>
                                            {term.title.replace(/^\d+\.\s/, '')}
                                        </h3>
                                    </div>
                                    {openSection === index ? (
                                        <ChevronUp className="w-6 h-6 text-amber-500" />
                                    ) : (
                                        <ChevronDown className="w-6 h-6 text-slate-500" />
                                    )}
                                </button>

                                <div className={`transition-all duration-300 ease-in-out ${openSection === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}>
                                    <div className="px-8 pb-8 pl-[5.5rem] pr-8 text-slate-400 leading-relaxed text-lg border-t border-white/5 pt-6">
                                        {term.content}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 p-8 rounded-3xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-4">
                        <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="text-white font-bold mb-2">Legal Disclaimer</h4>
                            <p className="text-slate-400 text-sm">
                                The information provided in this Terms of Service agreement is for general informational purposes only and does not constitute legal advice. We recommend consulting with a qualified legal professional for any specific legal concerns.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default TermsOfService;
