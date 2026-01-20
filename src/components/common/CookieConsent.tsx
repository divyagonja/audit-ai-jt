import { useState, useEffect } from 'react';
import { Cookie, X, Check, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import CookiePolicyModal from './CookiePolicyModal';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            // Delay slightly for better UX (don't pop up immediately on load)
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }

        // Listen for manual trigger
        const handleShow = () => setIsVisible(true);
        window.addEventListener('showCookieConsent', handleShow);
        return () => window.removeEventListener('showCookieConsent', handleShow);
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'declined');
        setIsVisible(false);
    };

    if (!isVisible && !isPolicyModalOpen) return null;

    return (
        <>
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-6 left-6 z-50 max-w-md w-full"
                    >
                        <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl relative overflow-hidden">
                            {/* Abstract Background Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] pointer-events-none" />

                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
                                            <Cookie className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-bold text-white text-lg">Cookie Preferences</h3>
                                    </div>
                                    <button
                                        onClick={handleDecline}
                                        className="text-slate-500 hover:text-white transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                    We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                                    <br />
                                    <button
                                        onClick={() => setIsPolicyModalOpen(true)}
                                        className="text-blue-400 hover:text-blue-300 underline mt-1 inline-block font-semibold bg-transparent border-none p-0 cursor-pointer"
                                    >
                                        Read Cookie Policy
                                    </button>
                                </p>

                                <div className="flex gap-3">
                                    <button
                                        onClick={handleDecline}
                                        className="flex-1 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition-all border border-slate-700"
                                    >
                                        Reject All
                                    </button>
                                    <button
                                        onClick={handleAccept}
                                        className="flex-1 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
                                    >
                                        <Check className="w-4 h-4" />
                                        Accept All
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <CookiePolicyModal
                isOpen={isPolicyModalOpen}
                onClose={() => setIsPolicyModalOpen(false)}
            />
        </>
    );
};

export default CookieConsent;
