import { X, ShieldAlert, BarChart, Settings, Cookie, Check, ShieldCheck, Sparkles, Lock, Zap } from 'lucide-react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';

interface CookiePolicyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CookiePolicyModal = ({ isOpen, onClose }: CookiePolicyModalProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // 3D Tilt & Mouse Glow Hooks
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [2, -2]), { damping: 25 });
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-2, 2]), { damping: 25 });
    const glowX = useSpring(mouseX, { damping: 30 });
    const glowY = useSpring(mouseY, { damping: 30 });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    };

    const sections = [
        {
            title: "1. Data Collection Architecture",
            content: "AuditAI utilizes advanced indexing protocols to identify and process digital footprints necessary for architectural stability. We do not engage in unauthorized kinetic tracking.",
            icon: Zap
        },
        {
            title: "2. Strategic Cookies",
            content: "Our system deploys 'Audit Nodes' (cookies) to maintain state within the global intelligence graph. These nodes are encrypted at rest and transit.",
            icon: Lock
        },
        {
            title: "3. Consent Protocols",
            content: "You maintain sovereign control over your node synchronization. You may terminate non-essential audit streams at any time via the dispatch terminal.",
            icon: ShieldCheck
        }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-3xl overflow-hidden">
                    {/* Background Dynamic Glows */}
                    <div className="absolute inset-0 pointer-events-none opacity-20">
                        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/20 blur-[100px] rounded-full animate-pulse" />
                        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/20 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                    </div>

                    <motion.div
                        ref={containerRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
                        style={{ rotateX, rotateY, perspective: '1200px' }}
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="glass-premium relative w-full max-w-4xl h-[80vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/10"
                    >
                        {/* Interactive Mouse Glow */}
                        <motion.div
                            style={{ x: glowX, y: glowY }}
                            className="glow-point translate-x-[-50%] translate-y-[-50%] opacity-20 z-0 pointer-events-none absolute"
                        />

                        {/* Lateral Branding Panel */}
                        <div className="w-full md:w-[32%] mesh-gradient p-10 flex flex-col justify-between relative overflow-hidden border-r border-white/5 shrink-0">
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-10">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 backdrop-blur-xl">
                                        <Cookie className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-xl font-black text-white tracking-tighter uppercase">Audit<span className="text-indigo-400">AI</span></span>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full w-fit">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                                        <span className="text-[9px] font-black text-white uppercase tracking-widest">Privacy Protocol 4.0</span>
                                    </div>
                                    <h2 className="text-3xl font-black text-white leading-tight tracking-tighter">
                                        Compliance <br />
                                        <span className="premium-gradient-text text-3xl">Manifesto</span>
                                    </h2>
                                </div>
                            </div>

                            <div className="relative z-10">
                                <div className="p-5 rounded-2xl bg-black/20 border border-white/5 backdrop-blur-3xl">
                                    <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest mb-4">Security Level</p>
                                    <div className="flex items-center gap-3">
                                        <ShieldCheck className="w-6 h-6 text-green-500" />
                                        <span className="text-white font-bold text-sm">Enterprise Standard</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="flex-1 flex flex-col bg-[#05070a]/80 backdrop-blur-xl min-h-0 relative">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 z-[80] w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all group"
                            >
                                <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                            </button>

                            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12">
                                <div className="max-w-2xl mx-auto py-10">
                                    <div className="flex items-center gap-4 mb-12">
                                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                                            <Sparkles className="w-6 h-6 text-indigo-400" />
                                        </div>
                                        <div>
                                            <h1 className="text-3xl font-black text-white tracking-tighter">Cookie Policy</h1>
                                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Rev. 2026.01.20_Intelligence_Protocol</p>
                                        </div>
                                    </div>

                                    <div className="space-y-12">
                                        {sections.map((section, i) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                key={i}
                                                className="group"
                                            >
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-indigo-500/10 transition-colors">
                                                        <section.icon className="w-4 h-4 text-indigo-400" />
                                                    </div>
                                                    <h3 className="text-xl font-bold text-white tracking-tight">{section.title}</h3>
                                                </div>
                                                <p className="text-slate-400 leading-relaxed font-medium pl-12 text-lg">
                                                    {section.content}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="mt-20 p-8 glass-premium rounded-[32px] border border-white/10 bg-indigo-500/5 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl" />
                                        <div className="flex items-center gap-4 mb-4 relative z-10">
                                            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                                                <ShieldCheck className="w-5 h-5 text-indigo-400" />
                                            </div>
                                            <span className="text-white font-black uppercase tracking-tighter text-lg">Zero-Trust Verified</span>
                                        </div>
                                        <p className="text-slate-300 relative z-10 font-medium leading-relaxed">
                                            Your sync data is never shared with third-party advertising syndicates. We audit for intelligence, not for surveillance.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Sticky Close Bar */}
                            <div className="p-8 border-t border-white/5 bg-black/40 backdrop-blur-3xl flex justify-center">
                                <button
                                    onClick={onClose}
                                    className="px-12 py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-xl active:scale-95"
                                >
                                    Understood & Encrypt
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CookiePolicyModal;
