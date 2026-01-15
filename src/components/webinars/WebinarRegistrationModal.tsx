import { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Mail, Building, Briefcase, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';

interface Webinar {
    id: number;
    title: string;
    description: string;
    date?: string;
    time?: string;
    duration: string;
    speakers?: { name: string; role: string; image: string }[];
    image: string;
}

interface WebinarRegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    webinar: Webinar | null;
}

const WebinarRegistrationModal = ({ isOpen, onClose, webinar }: WebinarRegistrationModalProps) => {
    const [step, setStep] = useState<'form' | 'success'>('form');
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        company: '',
        role: ''
    });

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setStep('form');
            setFormData({ fullName: '', email: '', company: '', role: '' });
        }
    }, [isOpen]);

    if (!isOpen || !webinar) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setStep('success');
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-scale-in">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white md:text-slate-500 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Left Side: Visuals & Info */}
                <div className="w-full md:w-2/5 relative bg-navy text-white overflow-hidden">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0">
                        <img
                            src={webinar.image}
                            alt={webinar.title}
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-transparent" />
                    </div>

                    <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                        <div className="mb-6">
                            <span className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs font-semibold text-blue-300 mb-4">
                                Live Masterclass
                            </span>
                            <h2 className="text-2xl font-bold leading-tight mb-4">
                                {webinar.title}
                            </h2>
                            <div className="flex flex-col gap-2 text-slate-300 text-sm">
                                {webinar.date && (
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-blue-400" />
                                        <span>{webinar.date}</span>
                                    </div>
                                )}
                                {webinar.time && (
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-purple-400" />
                                        <span>{webinar.time} • {webinar.duration}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {webinar.speakers && (
                            <div className="border-t border-white/10 pt-6">
                                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                                    Featured Speakers
                                </h4>
                                <div className="space-y-3">
                                    {webinar.speakers.map((speaker, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <img
                                                src={speaker.image}
                                                alt={speaker.name}
                                                className="w-8 h-8 rounded-full border border-white/20"
                                            />
                                            <div>
                                                <div className="text-sm font-medium text-white">{speaker.name}</div>
                                                <div className="text-xs text-slate-400">{speaker.role}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="w-full md:w-3/5 p-8 md:p-10 bg-white">
                    {step === 'form' ? (
                        <>
                            <h3 className="text-2xl font-bold text-navy mb-2">Reserve Your Spot</h3>
                            <p className="text-slate-600 mb-8">
                                Join us for this exclusive session. Space is limited.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700 ml-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            required
                                            placeholder="John Doe"
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700 ml-1">Work Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="email"
                                            required
                                            placeholder="john@company.com"
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-slate-700 ml-1">Company</label>
                                        <div className="relative">
                                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <input
                                                type="text"
                                                required
                                                placeholder="Acme Inc."
                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                                value={formData.company}
                                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-slate-700 ml-1">Job Title</label>
                                        <div className="relative">
                                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <input
                                                type="text"
                                                required
                                                placeholder="Marketing Manager"
                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                                value={formData.role}
                                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full mt-6 bg-navy hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/10 hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Registering...
                                        </>
                                    ) : (
                                        <>
                                            Complete Registration
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                                <p className="text-xs text-slate-400 text-center mt-4">
                                    By registering, you agree to our Terms of Service and Privacy Policy.
                                </p>
                            </form>
                        </>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center py-10">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce-subtle">
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-navy mb-2">You're In!</h3>
                            <p className="text-slate-600 mb-8 max-w-sm">
                                Check your inbox for the calendar invite and joining details. We've sent a confirmation email to <strong>{formData.email}</strong>.
                            </p>

                            <div className="w-full space-y-3">
                                <button
                                    className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-navy font-semibold rounded-xl transition-colors"
                                    onClick={() => {
                                        // Add to calendar logic here
                                        alert("Calendar invite downloaded (simulated)");
                                    }}
                                >
                                    Add to Calendar
                                </button>
                                <button
                                    className="w-full py-3 px-4 text-slate-500 hover:text-navy font-medium transition-colors"
                                    onClick={onClose}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WebinarRegistrationModal;
