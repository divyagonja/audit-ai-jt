import { X, Linkedin, Twitter, Globe, ArrowUpRight, Zap, ShieldCheck, Mail, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export interface SpeakerProfile {
    name: string;
    role: string;
    company: string;
    image: string;
    bio: string;
    socials: {
        linkedin?: string;
        twitter?: string;
        website?: string;
    }
}

interface SpeakerProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    speaker: SpeakerProfile | null;
    speakerSessions: any[];
    onSessionClick: (webinar: any) => void;
}

const SpeakerProfileModal = ({ isOpen, onClose, speaker, speakerSessions, onSessionClick }: SpeakerProfileModalProps) => {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    if (!speaker) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8 bg-slate-950/90 backdrop-blur-2xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        className="w-full max-w-5xl h-[85vh] bg-[#05070a] rounded-[48px] shadow-2xl border border-white/10 overflow-hidden flex flex-col md:flex-row relative"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 z-[100] w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all group"
                        >
                            <X className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        </button>

                        {/* Profile Panel */}
                        <div className="w-full md:w-[40%] mesh-gradient p-12 flex flex-col shrink-0 relative overflow-hidden">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/20 blur-[100px] rounded-full -tr-20" />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="mb-8">
                                    <div className="w-40 h-40 rounded-[48px] overflow-hidden border-4 border-white/10 mb-8 shadow-2xl rotate-3">
                                        <img src={speaker.image} className="w-full h-full object-cover -rotate-3 hover:scale-110 transition-transform duration-700" alt={speaker.name} />
                                    </div>
                                    <h2 className="text-4xl font-black text-white tracking-tighter mb-2">{speaker.name}</h2>
                                    <p className="text-indigo-400 font-bold uppercase tracking-widest text-xs">{speaker.role} @ {speaker.company}</p>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-4">Strategic Connections</h4>
                                    <div className="flex flex-wrap gap-4">
                                        {speaker.socials.linkedin && (
                                            <a href={speaker.socials.linkedin} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-[#0077b5] hover:scale-110 transition-all">
                                                <Linkedin className="w-5 h-5" />
                                            </a>
                                        )}
                                        {speaker.socials.twitter && (
                                            <a href={speaker.socials.twitter} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-black hover:scale-110 transition-all">
                                                <Twitter className="w-5 h-5" />
                                            </a>
                                        )}
                                        {speaker.socials.website && (
                                            <a href={speaker.socials.website} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-green-600 hover:scale-110 transition-all">
                                                <Globe className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-auto pt-10">
                                    <div className="p-6 rounded-3xl bg-black/30 border border-white/10 backdrop-blur-xl">
                                        <div className="flex items-center gap-3 mb-2">
                                            <ShieldCheck className="w-5 h-5 text-emerald-500" />
                                            <span className="text-xs font-black text-white uppercase tracking-widest">Verified Instructor</span>
                                        </div>
                                        <p className="text-slate-400 text-[10px] leading-relaxed">
                                            This instructor has been vetted for executive-level intelligence delivery.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Panel */}
                        <div className="flex-1 bg-[#05070a]/50 p-8 md:p-14 overflow-y-auto custom-scrollbar relative">
                            <div className="max-w-2xl mx-auto">
                                <section className="mb-16">
                                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Dispatch Biography</h3>
                                    <p className="text-slate-300 text-xl leading-relaxed font-medium">
                                        {speaker.bio}
                                    </p>
                                </section>

                                <section>
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Knowledge Streams</h3>
                                        <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                                            {speakerSessions.length} Active Sessions
                                        </span>
                                    </div>

                                    <div className="grid gap-4">
                                        {speakerSessions.map((session) => (
                                            <button
                                                key={session.id}
                                                onClick={() => onSessionClick(session)}
                                                className="w-full p-6 rounded-[32px] bg-white/2 border border-white/5 hover:bg-white/5 hover:border-indigo-500/30 transition-all text-left flex items-center justify-between group"
                                            >
                                                <div className="flex items-center gap-6">
                                                    <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-white/10">
                                                        <img src={session.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors mb-1">{session.title}</h4>
                                                        <div className="flex items-center gap-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {session.date || 'On-Demand'}</span>
                                                            <span>•</span>
                                                            <span>{session.duration}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all opacity-0 group-hover:opacity-100">
                                                    <ArrowUpRight className="w-5 h-5" />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SpeakerProfileModal;
