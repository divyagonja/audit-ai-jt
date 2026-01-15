import { X, Linkedin, Twitter, Globe, Calendar, Play, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';

// Reusing interfaces from Webinars.tsx (simulated shared types)
interface Webinar {
    id: number;
    title: string;
    description: string;
    date?: string;
    time?: string;
    duration: string;
    image: string;
    // ... other fields
}

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
    };
}

interface SpeakerProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    speaker: SpeakerProfile | null;
    speakerSessions: Webinar[]; // List of webinars this speaker is involved in
    onSessionClick: (webinar: Webinar) => void;
}

const SpeakerProfileModal = ({ isOpen, onClose, speaker, speakerSessions, onSessionClick }: SpeakerProfileModalProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    if (!speaker) return null;

    return (
        <div className={`fixed inset-0 z-[110] flex justify-end transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Slide-over Drawer */}
            <div
                className={`relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header / Cover */}
                <div className="relative h-48 bg-navy overflow-hidden shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-800 opacity-60" />
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }} />

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors z-20"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="absolute -bottom-12 left-8">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg bg-slate-200">
                                <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white" title="Available for mentoring"></div>
                        </div>
                    </div>
                </div>

                {/* Body Content */}
                <div className="flex-1 overflow-y-auto px-8 pt-16 pb-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-navy">{speaker.name}</h2>
                        <div className="text-blue-600 font-medium">{speaker.role}</div>
                        <div className="text-slate-500 text-sm">{speaker.company}</div>

                        <div className="flex gap-3 mt-4">
                            {speaker.socials.linkedin && (
                                <a href={speaker.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-full transition-colors">
                                    <Linkedin className="w-4 h-4" />
                                </a>
                            )}
                            {speaker.socials.twitter && (
                                <a href={speaker.socials.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-400 rounded-full transition-colors">
                                    <Twitter className="w-4 h-4" />
                                </a>
                            )}
                            {speaker.socials.website && (
                                <a href={speaker.socials.website} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-purple-600 rounded-full transition-colors">
                                    <Globe className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">About</h3>
                        <p className="text-slate-600 leading-relaxed text-sm">
                            {speaker.bio}
                        </p>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Sessions ({speakerSessions.length})</h3>
                        <div className="space-y-4">
                            {speakerSessions.map(session => (
                                <div
                                    key={session.id}
                                    className="group p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all cursor-pointer"
                                    onClick={() => onSessionClick(session)}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-16 h-12 rounded-md overflow-hidden bg-slate-200 shrink-0">
                                            <img src={session.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                        </div>
                                        <div>
                                            <h4 className="text-navy font-bold text-sm leading-tight mb-1 group-hover:text-blue-600 transition-colors">
                                                {session.title}
                                            </h4>
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                {session.date ? (
                                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Upcoming</span>
                                                ) : (
                                                    <span className="flex items-center gap-1"><Play className="w-3 h-3" /> On-Demand</span>
                                                )}
                                                <span>•</span>
                                                <span>{session.duration}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA or Additional Info (e.g. Courses) */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        <h4 className="font-bold mb-2 flex items-center gap-2">
                            Masterclass Series
                            <ExternalLink className="w-4 h-4 opacity-70" />
                        </h4>
                        <p className="text-xs text-blue-100 mb-3">
                            Take a deep dive with {speaker.name.split(' ')[0]}'s full comprehensive course.
                        </p>
                        <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold transition-colors border border-white/20">
                            View Course Curriculum
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpeakerProfileModal;
