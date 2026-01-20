import { useState, useEffect, useRef } from 'react';
import {
    X, Upload, FileText, Check, AlertCircle, User, Mail, Phone,
    Linkedin, Github, ChevronRight, ChevronLeft, Send, Sparkles,
    ShieldCheck, Zap, Globe, Rocket, Heart, Trophy, MapPin
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface JobApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobTitle: string;
    department: string;
}

interface FormData {
    fullName: string;
    email: string;
    phone: string;
    linkedIn: string;
    github: string;
    coverLetter: string;
    resume: File | null;
}

interface FormErrors {
    fullName?: string;
    email?: string;
    phone?: string;
    resume?: string;
}

const JobApplicationModal = ({ isOpen, onClose, jobTitle, department }: JobApplicationModalProps) => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;
    const modalRef = useRef<HTMLDivElement>(null);

    // 3D Tilt & Mouse Glow
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), { damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]), { damping: 20 });
    const glowX = useSpring(mouseX, { damping: 30 });
    const glowY = useSpring(mouseY, { damping: 30 });

    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        phone: '',
        linkedIn: '',
        github: '',
        coverLetter: '',
        resume: null,
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState(0);

    const highlights = [
        { icon: Globe, text: "Global Remote First", sub: "Work from anywhere" },
        { icon: Trophy, text: "Top Tier Benefits", sub: "Health, Dental & Vision" },
        { icon: Zap, text: "AI Innovation", sub: "Cutting edge tech stack" },
        { icon: Rocket, text: "Career Growth", sub: "Rapid advancement paths" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setHighlightIndex((prev) => (prev + 1) % highlights.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!modalRef.current) return;
        const rect = modalRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const validateStep = (step: number): boolean => {
        const newErrors: FormErrors = {};
        if (step === 1) {
            if (!formData.fullName.trim()) newErrors.fullName = 'Name required';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
            if (!formData.phone.trim()) newErrors.phone = 'Phone required';
        }
        if (step === 2 && !formData.resume) newErrors.resume = 'Resume required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => validateStep(currentStep) && setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (currentStep < totalSteps) return nextStep();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setSubmitSuccess(true);
        setTimeout(() => { onClose(); resetForm(); }, 5000);
    };

    const resetForm = () => {
        setFormData({ fullName: '', email: '', phone: '', linkedIn: '', github: '', coverLetter: '', resume: null });
        setErrors({}); setSubmitSuccess(false); setCurrentStep(1);
    };

    const processFile = (file: File) => {
        if (file.size > 10 * 1024 * 1024) return setErrors({ ...errors, resume: 'Max 10MB' });
        setFormData({ ...formData, resume: file });
        setErrors({ ...errors, resume: undefined });
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-2xl animate-fade-in overflow-hidden"
            style={{ perspective: '1500px' }}
        >
            <AnimatePresence mode="wait">
                {submitSuccess ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.5, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="glass-premium max-w-md w-full p-10 rounded-[40px] text-center relative border border-white/20 shadow-[0_0_100px_rgba(59,130,246,0.3)]"
                    >
                        <motion.div
                            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 10 }}
                            className="w-24 h-24 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_15px_40px_rgba(34,197,94,0.4)]"
                        >
                            <Check className="w-12 h-12 text-white" strokeWidth={4} />
                        </motion.div>
                        <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Application Sent!</h3>
                        <p className="text-slate-400 text-lg leading-relaxed font-medium">
                            Your journey with <span className="text-white font-black">AuditAI</span> starts today. We've received your application and will review it with priority.
                        </p>
                        <div className="mt-8 flex justify-center gap-2">
                            {[0, 1, 2].map(i => <motion.div key={i} animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} className="w-2 h-2 bg-blue-500 rounded-full" />)}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        ref={modalRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{ rotateX, rotateY }}
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -50 }}
                        className="glass-premium max-w-5xl w-full max-h-[90vh] rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col md:flex-row border border-white/10"
                    >
                        {/* Interactive Mouse Glow */}
                        <motion.div
                            style={{ x: glowX, y: glowY }}
                            className="glow-point translate-x-[-50%] translate-y-[-50%]"
                        />

                        {/* Animated Side Panel */}
                        <div className="w-full md:w-[32%] mesh-gradient p-8 md:p-10 flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
                            <div className="relative z-10">
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                                    className="flex items-center gap-3 mb-10"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20">
                                        <Rocket className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <span className="text-2xl font-black text-white tracking-tighter">Audit<span className="text-blue-500 underline decoration-4 underline-offset-4">AI</span></span>
                                </motion.div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full w-fit">
                                        <MapPin className="w-3 h-3 text-blue-400" />
                                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Remote Hybrid</span>
                                    </div>
                                    <h2 className="text-4xl font-black text-white leading-[0.95] tracking-tighter">
                                        Join the <br />
                                        <span className="premium-gradient-text text-5xl">Top 1%</span>
                                    </h2>
                                </div>
                            </div>

                            <div className="relative z-10 space-y-8 mt-12 md:mt-0">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={highlightIndex}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="flex gap-4"
                                    >
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 flex items-center justify-center border border-white/10 shrink-0">
                                            {(() => {
                                                const Icon = highlights[highlightIndex].icon;
                                                return <Icon className="w-6 h-6 text-white" />;
                                            })()}
                                        </div>
                                        <div>
                                            <h4 className="text-white font-black text-lg tracking-tight leading-tight">{highlights[highlightIndex].text}</h4>
                                            <p className="text-slate-400 text-sm font-medium">{highlights[highlightIndex].sub}</p>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                <div className="flex gap-2">
                                    {highlights.map((_, i) => (
                                        <motion.div key={i} animate={{ scale: i === highlightIndex ? 1.2 : 1 }} className={`h-1 rounded-full transition-all duration-300 ${i === highlightIndex ? 'w-8 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]' : 'w-2 bg-white/10'}`} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Multi-Step Form */}
                        <div className="flex-1 p-8 md:p-12 flex flex-col relative bg-black/20 overflow-y-auto custom-scrollbar">
                            {/* Close Button */}
                            <button type="button" onClick={onClose} className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-300 group z-50">
                                <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                            </button>

                            {/* Layout Header */}
                            <div className="mb-10">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex gap-1.5">
                                        {[1, 2, 3].map(i => <div key={i} className={`h-2 rounded-full transition-all duration-500 ${i === currentStep ? 'w-8 bg-blue-500' : 'w-2 bg-white/10'}`} />)}
                                    </div>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Module 0{currentStep}</span>
                                </div>
                                <h3 className="text-3xl font-black text-white tracking-tighter mb-1">{jobTitle}</h3>
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">{department} Operation</p>
                            </div>

                            <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentStep}
                                        initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                        className="space-y-6"
                                    >
                                        {currentStep === 1 && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="bento-input-card p-6 md:p-8 rounded-[32px] space-y-3 md:col-span-2">
                                                    <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2"><User className="w-3.5 h-3.5" /> Full Name</label>
                                                    <input
                                                        type="text" value={formData.fullName}
                                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                        className="w-full bg-transparent border-none text-2xl font-black text-white placeholder-white/5 focus:outline-none"
                                                        placeholder="Your full name"
                                                    />
                                                    {errors.fullName && <p className="text-red-500 text-[10px] font-bold">{errors.fullName}</p>}
                                                </div>
                                                <div className="bento-input-card p-6 md:p-8 rounded-[32px] space-y-3">
                                                    <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> Email</label>
                                                    <input
                                                        type="email" value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        className="w-full bg-transparent border-none text-xl font-black text-white placeholder-white/5 focus:outline-none"
                                                        placeholder="hello@audit.ai"
                                                    />
                                                    {errors.email && <p className="text-red-500 text-[10px] font-bold">{errors.email}</p>}
                                                </div>
                                                <div className="bento-input-card p-6 md:p-8 rounded-[32px] space-y-3">
                                                    <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> Phone</label>
                                                    <input
                                                        type="tel" value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        className="w-full bg-transparent border-none text-xl font-black text-white placeholder-white/5 focus:outline-none"
                                                        placeholder="+1..."
                                                    />
                                                    {errors.phone && <p className="text-red-500 text-[10px] font-bold">{errors.phone}</p>}
                                                </div>
                                            </div>
                                        )}

                                        {currentStep === 2 && (
                                            <div className="space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="bento-input-card p-6 md:p-8 rounded-[32px] space-y-3">
                                                        <label className="text-[10px] font-black text-[#0077b5] uppercase tracking-widest flex items-center gap-2"><Linkedin className="w-3.5 h-3.5" /> LinkedIn</label>
                                                        <input type="url" value={formData.linkedIn} onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })} className="w-full bg-transparent border-none text-lg font-bold text-white placeholder-white/5 focus:outline-none" placeholder="Profile URL" />
                                                    </div>
                                                    <div className="bento-input-card p-6 md:p-8 rounded-[32px] space-y-3">
                                                        <label className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2"><Github className="w-3.5 h-3.5" /> GitHub</label>
                                                        <input type="url" value={formData.github} onChange={(e) => setFormData({ ...formData, github: e.target.value })} className="w-full bg-transparent border-none text-lg font-bold text-white placeholder-white/5 focus:outline-none" placeholder="Username/Repo" />
                                                    </div>
                                                </div>
                                                <div
                                                    onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                                                    onDragLeave={() => setDragActive(false)}
                                                    onDrop={(e) => { e.preventDefault(); setDragActive(false); const file = e.dataTransfer.files[0]; if (file) processFile(file); }}
                                                    className={`bento-input-card p-8 md:p-10 rounded-[32px] border-2 border-dashed flex flex-col items-center gap-4 transition-all duration-500 ${dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-white/10'}`}
                                                >
                                                    <input type="file" onChange={(e) => { const file = e.target.files?.[0]; if (file) processFile(file); }} className="absolute inset-0 opacity-0 cursor-pointer" />
                                                    {formData.resume ? (
                                                        <>
                                                            <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/30">
                                                                <FileText className="w-8 h-8 text-green-500" />
                                                            </div>
                                                            <div className="text-center">
                                                                <h4 className="text-lg font-black text-white">{formData.resume.name}</h4>
                                                                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1">Ready for review</p>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                                                                <Upload className="w-8 h-8 text-blue-500" />
                                                            </div>
                                                            <div className="text-center space-y-1">
                                                                <h4 className="text-xl font-black text-white tracking-tight">Drop Resume</h4>
                                                                <p className="text-slate-500 text-xs font-medium">PDF or Word (Max 10MB)</p>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                                {errors.resume && <p className="text-red-500 text-center text-[10px] font-bold">{errors.resume}</p>}
                                            </div>
                                        )}

                                        {currentStep === 3 && (
                                            <div className="bento-input-card p-8 rounded-[32px] space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Cover Letter</label>
                                                    <span className="text-[8px] text-slate-500 uppercase tracking-[0.2em]">Optional</span>
                                                </div>
                                                <textarea
                                                    value={formData.coverLetter} onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                                                    className="w-full bg-transparent border-none text-lg font-medium text-white placeholder-white/5 focus:outline-none min-h-[200px] md:min-h-[250px] resize-none leading-relaxed"
                                                    placeholder="Why you? Pitch yourself as a top-tier candidate..."
                                                />
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>

                                {/* Controls */}
                                <div className="flex gap-6 mt-12 pb-4">
                                    {currentStep > 1 && (
                                        <button
                                            type="button" onClick={prevStep}
                                            className="px-8 py-4 bg-white/5 text-white font-black rounded-2xl border border-white/5 hover:bg-white/10 transition-all flex items-center gap-2 uppercase tracking-[0.2em] text-[10px]"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                            Back
                                        </button>
                                    )}
                                    <button
                                        type="submit" disabled={isSubmitting}
                                        className="flex-1 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-black rounded-2xl hover:shadow-[0_20px_50px_-10px_rgba(79,70,229,0.5)] transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-[0.3em] text-[10px] group beam-border overflow-hidden"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                {currentStep === totalSteps ? 'Launch Application' : 'Next Protocol'}
                                                {currentStep === totalSteps ? <Send className="w-4 h-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" /> : <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default JobApplicationModal;
