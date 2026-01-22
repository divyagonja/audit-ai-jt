import { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, User, Mail, CheckCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Webinar {
    id: number;
    title: string;
    description: string;
    date?: string;
    time?: string;
    duration: string;
    speakers?: { name: string; role: string; image: string }[];
}

interface WebinarRegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    webinar: Webinar | null;
}

const WebinarRegistrationModal = ({ isOpen, onClose, webinar }: WebinarRegistrationModalProps) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setIsSubmitted(false);
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
        }, 1500);
    };

    if (!webinar) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-950/80 backdrop-blur-xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="bg-slate-900 w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden border border-white/10 flex flex-col md:flex-row relative"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all border border-white/10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Left Side: Info */}
                        <div className="w-full md:w-[40%] bg-gradient-to-br from-indigo-600 via-blue-700 to-slate-900 p-8 md:p-12 relative overflow-hidden shrink-0">
                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -tr-16 -mt-16" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -ml-16 -mb-16" />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="mb-10">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-6 font-bold text-[10px] uppercase tracking-widest text-white">
                                        <Zap className="w-3 h-3 text-indigo-300" />
                                        <span>Official Reservation</span>
                                    </div>
                                    <h2 className="text-3xl font-black text-white leading-tight tracking-tighter mb-4">
                                        Secure Your <br />
                                        <span className="text-indigo-200">Session Seat</span>
                                    </h2>
                                    <p className="text-blue-100/70 text-sm leading-relaxed">
                                        Join our technical elite for a deep dive into the future of search intelligence.
                                    </p>
                                </div>

                                <div className="space-y-6 mt-auto">
                                    <div className="flex items-center gap-4 text-white">
                                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 opacity-60">Date</p>
                                            <p className="font-bold">{webinar.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-white">
                                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 opacity-60">Time</p>
                                            <p className="font-bold">{webinar.time}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div className="flex-1 p-8 md:p-12 bg-slate-900 overflow-y-auto max-h-[90vh]">
                            {!isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    <div className="mb-8">
                                        <h3 className="text-2xl font-black text-white tracking-tighter mb-2">{webinar.title}</h3>
                                        <p className="text-slate-400 text-sm">Fill in your details to receive the private access link.</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                                                    placeholder="Stark Industries"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Work Email</label>
                                                <input
                                                    required
                                                    type="email"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                                                    placeholder="ceo@enterprise.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Company / Organization</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                                                placeholder="Global Systems Inc."
                                            />
                                        </div>

                                        <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 flex gap-4">
                                            <ShieldCheck className="w-8 h-8 text-indigo-400 shrink-0" />
                                            <p className="text-xs text-slate-400 leading-relaxed">
                                                By registering, you agree to our privacy framework. Your transmission data is encrypted and used solely for session management.
                                            </p>
                                        </div>

                                        <button
                                            disabled={isLoading}
                                            className="w-full py-4 bg-white text-slate-950 font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                                        >
                                            {isLoading ? "Processing..." : (
                                                <>
                                                    Transmit Reservation
                                                    <ArrowRight className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center py-10"
                                >
                                    <div className="w-24 h-24 rounded-[30px] bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                                        <CheckCircle className="w-12 h-12 text-green-500" />
                                    </div>
                                    <h3 className="text-3xl font-black text-white tracking-tighter mb-4 uppercase">Transmission confirmed</h3>
                                    <p className="text-slate-400 max-w-sm mb-10 text-lg leading-relaxed">
                                        Reservation validated. A private access key has been dispatched to your corporate inbox.
                                    </p>
                                    <button
                                        onClick={onClose}
                                        className="px-10 py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white/10 transition-all"
                                    >
                                        Close Terminal
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default WebinarRegistrationModal;
