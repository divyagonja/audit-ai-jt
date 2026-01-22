import { X, Play, Pause, RotateCcw, Volume2, VolumeX, Maximize, Settings, Clock, Share2, Twitter, Linkedin, Zap, Sparkles, Activity, ShieldCheck, ChevronRight, Speaker, List, Monitor, Check, Gauge, Layers } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';

export interface VideoChapter {
    id: string;
    title: string;
    timestamp: number;
    duration: string;
}

interface Webinar {
    id: number;
    title: string;
    description: string;
    duration: string;
    videoUrl?: string;
    image: string;
}

interface WebinarVideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    webinar: Webinar | null;
    recommended: Webinar[];
    chapters: VideoChapter[];
}

const WebinarVideoModal = ({ isOpen, onClose, webinar, recommended, chapters }: WebinarVideoModalProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [showControls, setShowControls] = useState(true);
    const [isHoveringVideo, setIsHoveringVideo] = useState(false);

    // Settings States
    const [showSettings, setShowSettings] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [quality, setQuality] = useState('1080p');

    // 3D Tilt Hooks
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [1, -1]), { damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-1, 1]), { damping: 30 });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.play().catch(() => console.log("Auto-play blocked"));
                }
            }, 800);
        } else {
            document.body.style.overflow = 'unset';
            setIsPlaying(false);
            setShowSettings(false);
        }
    }, [isOpen]);

    const togglePlay = useCallback(() => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    }, []);

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (videoRef.current && duration) {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            videoRef.current.currentTime = pos * duration;
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handlePlaybackSpeed = (speed: number) => {
        setPlaybackSpeed(speed);
        if (videoRef.current) {
            videoRef.current.playbackRate = speed;
        }
        setShowSettings(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);

        setShowControls(true);
        clearTimeout(window.controlTimeout);
        window.controlTimeout = setTimeout(() => {
            if (isPlaying && !showSettings) setShowControls(false);
        }, 3000);
    };

    if (!webinar) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 bg-[#020408]/98 backdrop-blur-3xl overflow-hidden">
                    {/* Ambient Light Effect */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
                        <div className="w-full h-full max-w-4xl bg-indigo-500/10 blur-[200px] rounded-full animate-pulse" />
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] contrast-150" />
                    </div>

                    <motion.div
                        ref={containerRef}
                        onMouseMove={handleMouseMove}
                        style={{ rotateX, rotateY, perspective: '1200px' }}
                        initial={{ opacity: 0, scale: 0.95, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 40 }}
                        className="glass-premium relative w-full h-full md:h-[90vh] max-w-[1700px] flex flex-col md:flex-row bg-[#05070a]/80 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden md:rounded-[40px] border border-white/10"
                    >
                        {/* Main Interaction Area (Left) */}
                        <div className="flex-[2.5] md:flex-[4] relative flex flex-col overflow-hidden bg-black group">

                            {/* Technical Overlays (Brackets) */}
                            <div className="absolute inset-0 pointer-events-none z-10 p-6">
                                <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-indigo-500/30 rounded-tl-xl" />
                                <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-indigo-500/30 rounded-tr-xl" />
                                <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-indigo-500/30 rounded-bl-xl" />
                                <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-indigo-500/30 rounded-br-xl" />

                                <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-4 text-[10px] font-black text-slate-500 tracking-[0.3em] uppercase opacity-50">
                                    <Activity className="w-3 h-3" />
                                    <span>Signal Frequency 1.25GHz</span>
                                    <span>•</span>
                                    <span>Node {webinar.id}: Active</span>
                                </div>
                            </div>

                            {/* Video Native Layer */}
                            <div
                                className="relative flex-1 flex items-center justify-center cursor-pointer"
                                onClick={() => {
                                    if (showSettings) setShowSettings(false);
                                    else togglePlay();
                                }}
                                onMouseEnter={() => setIsHoveringVideo(true)}
                                onMouseLeave={() => setIsHoveringVideo(false)}
                            >
                                <video
                                    ref={videoRef}
                                    src={webinar.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
                                    className="w-full h-full object-contain"
                                    onTimeUpdate={handleTimeUpdate}
                                    onLoadedMetadata={handleLoadedMetadata}
                                />

                                {/* Centered Play Button (Visible on Pause) */}
                                <AnimatePresence>
                                    {!isPlaying && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.5 }}
                                            className="absolute z-20 w-24 h-24 rounded-full bg-white/5 border border-white/20 backdrop-blur-3xl flex items-center justify-center group/play"
                                        >
                                            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl group-hover/play:scale-110 transition-transform">
                                                <Play className="w-10 h-10 text-black fill-black ml-1" />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Settings Dropdown HUD */}
                            <AnimatePresence>
                                {showSettings && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute bottom-28 right-12 z-[60] w-64 glass-premium rounded-3xl border border-white/10 p-4 shadow-2xl overflow-hidden"
                                    >
                                        <div className="space-y-6">
                                            {/* Playback Speed Section */}
                                            <div>
                                                <div className="flex items-center gap-2 mb-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                    <Gauge className="w-3 h-3" />
                                                    <span>Playback Speed</span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {[0.5, 1, 1.5, 2].map((speed) => (
                                                        <button
                                                            key={speed}
                                                            onClick={() => handlePlaybackSpeed(speed)}
                                                            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between border ${playbackSpeed === speed
                                                                    ? 'bg-indigo-500 text-white border-indigo-400'
                                                                    : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:border-white/10'
                                                                }`}
                                                        >
                                                            {speed === 1 ? 'Normal' : `${speed}x`}
                                                            {playbackSpeed === speed && <Check className="w-3 h-3" />}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Quality Section */}
                                            <div>
                                                <div className="flex items-center gap-2 mb-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                    <Layers className="w-3 h-3" />
                                                    <span>Signal Quality</span>
                                                </div>
                                                <div className="space-y-2">
                                                    {['4K Ultra', '1080p HD', '720p', 'Auto'].map((val) => (
                                                        <button
                                                            key={val}
                                                            onClick={() => { setQuality(val); setShowSettings(false); }}
                                                            className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between border ${quality === val
                                                                    ? 'bg-indigo-500 text-white border-indigo-400'
                                                                    : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:border-white/10'
                                                                }`}
                                                        >
                                                            {val}
                                                            {quality === val && <Check className="w-3 h-3" />}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Ultra-Premium HUD Controls */}
                            <AnimatePresence>
                                {(showControls || !isPlaying) && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        className="absolute bottom-0 left-0 right-0 z-30 p-8 pt-20 bg-gradient-to-t from-black via-black/80 to-transparent"
                                    >
                                        <div className="max-w-6xl mx-auto space-y-6">
                                            {/* Progress Bar Container */}
                                            <div className="relative group/progress">
                                                <div
                                                    className="h-1.5 w-full bg-white/10 rounded-full cursor-pointer overflow-hidden relative"
                                                    onClick={handleProgressClick}
                                                >
                                                    <motion.div
                                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-600 via-blue-400 to-indigo-600 rounded-full"
                                                        style={{ width: `${(currentTime / duration) * 100}%` }}
                                                    >
                                                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] animate-shimmer" />
                                                    </motion.div>
                                                </div>
                                                {/* Tooltip for progress */}
                                                <div className="absolute -top-10 px-2 py-1 bg-white text-black text-[10px] font-black rounded opacity-0 group-hover/progress:opacity-100 transition-opacity" style={{ left: `${(currentTime / duration) * 100}%`, transform: 'translateX(-50%)' }}>
                                                    {formatTime(currentTime)}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-6">
                                                    <button onClick={togglePlay} className="text-white hover:text-indigo-400 transition-colors">
                                                        {isPlaying ? <Pause className="w-8 h-8 fill-white" /> : <Play className="w-8 h-8 fill-white" />}
                                                    </button>

                                                    <div className="h-6 w-[1px] bg-white/10 hidden md:block" />

                                                    <div className="flex items-center gap-4">
                                                        <button onClick={toggleMute} className="text-white/60 hover:text-white transition-colors">
                                                            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                                                        </button>
                                                        <input
                                                            type="range" min="0" max="1" step="0.1"
                                                            value={volume}
                                                            onChange={(e) => {
                                                                const v = parseFloat(e.target.value);
                                                                setVolume(v);
                                                                if (videoRef.current) videoRef.current.volume = v;
                                                            }}
                                                            className="w-20 accent-indigo-500 h-1 bg-white/10 rounded-full appearance-none cursor-pointer hidden md:block"
                                                        />
                                                    </div>

                                                    <div className="text-[11px] font-black text-white tracking-[0.1em] uppercase">
                                                        <span className="text-white">{formatTime(currentTime)}</span>
                                                        <span className="text-white/30 mx-2">/</span>
                                                        <span className="text-white/50">{formatTime(duration)}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-6">
                                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                                                        <span className="text-[9px] font-black text-white tracking-widest uppercase">{quality === '1080p HD' ? 'HD Intelligence' : quality === '4K Ultra' ? '4K Quantum' : 'Low Latency'}</span>
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setShowSettings(!showSettings);
                                                        }}
                                                        className={`transition-all ${showSettings ? 'text-indigo-400' : 'text-white/60 hover:text-white'}`}
                                                    >
                                                        <Settings className={`w-5 h-5 ${showSettings ? 'rotate-90' : ''} transition-transform duration-500`} />
                                                    </button>
                                                    <button className="text-white/60 hover:text-white transition-colors" onClick={() => containerRef.current?.requestFullscreen()}>
                                                        <Maximize className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Top Title Overlay (Cinematic) */}
                            <div className="absolute top-0 left-0 right-0 p-10 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-start z-40">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-md mb-4 text-[9px] font-black text-indigo-400 uppercase tracking-widest">
                                        <ShieldCheck className="w-3.5 h-3.5" />
                                        <span>Authenticated Stream</span>
                                    </div>
                                    <h2 className="text-3xl font-black text-white tracking-tighter leading-none mb-2">{webinar.title}</h2>
                                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{webinar.duration} Session • Technical Workshop Series</p>
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={onClose}
                                        className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black hover:scale-110 transition-all shadow-2xl backdrop-blur-xl"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Control Console (Sidebar) */}
                        <div className="w-full md:w-[450px] bg-[#0d1117] flex flex-col shrink-0 relative overflow-hidden">
                            {/* Console Header */}
                            <div className="p-8 border-b border-white/5 bg-white/[0.02] flex items-center justify-between shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                                        <Monitor className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Session Hub</h3>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-10">
                                {/* Navigation Timeline */}
                                {chapters.length > 0 && (
                                    <section>
                                        <div className="flex items-center justify-between mb-6">
                                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Protocol Segments</h4>
                                            <span className="text-[10px] text-indigo-500 font-black">{chapters.length} Nodes</span>
                                        </div>
                                        <div className="space-y-3">
                                            {chapters.map((chapter) => {
                                                const isActive = currentTime >= chapter.timestamp && (chapters[chapters.indexOf(chapter) + 1] ? currentTime < chapters[chapters.indexOf(chapter) + 1].timestamp : true);
                                                return (
                                                    <button
                                                        key={chapter.id}
                                                        onClick={() => {
                                                            if (videoRef.current) videoRef.current.currentTime = chapter.timestamp;
                                                            setIsPlaying(true);
                                                        }}
                                                        className={`w-full p-5 rounded-2xl border transition-all text-left flex items-start gap-5 relative group ${isActive
                                                                ? 'bg-indigo-500/10 border-indigo-500/30'
                                                                : 'bg-white/[0.02] border-white/5 hover:bg-white/5 hover:border-white/10'
                                                            }`}
                                                    >
                                                        {isActive && <motion.div layoutId="active-bar" className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-indigo-500 rounded-full" />}
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${isActive ? 'bg-indigo-500 text-white border-indigo-400 shadow-lg shadow-indigo-500/20' : 'bg-white/5 text-slate-400 border-white/10 group-hover:bg-white/10'
                                                            }`}>
                                                            <Play className={`w-4 h-4 ${isActive ? 'fill-current' : ''}`} />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className={`text-sm font-bold truncate transition-colors ${isActive ? 'text-indigo-400' : 'text-white'}`}>{chapter.title}</div>
                                                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{chapter.duration}</div>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </section>
                                )}

                                {/* Knowledge Grid (Recommended) */}
                                <section>
                                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Knowledge Clusters</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        {recommended.map((rec) => (
                                            <div key={rec.id} className="group cursor-pointer">
                                                <div className="relative aspect-video rounded-2xl overflow-hidden mb-3 border border-white/5">
                                                    <img src={rec.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Play className="w-8 h-8 text-white fill-white" />
                                                    </div>
                                                </div>
                                                <h5 className="text-[11px] font-bold text-white leading-tight group-hover:text-indigo-400 transition-colors line-clamp-2">{rec.title}</h5>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>

                            {/* Sticky Terminal Footer */}
                            <div className="p-8 border-t border-white/5 bg-black/40 flex items-center justify-between shrink-0">
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Transmission</span>
                                    <span className="text-[11px] font-black text-white uppercase tracking-widest">End-to-End Encrypted</span>
                                </div>
                                <div className="flex gap-3">
                                    {[Twitter, Linkedin, Share2].map((Icon, i) => (
                                        <button key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                                            <Icon className="w-4 h-4" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

// Global type for timeout persistence
declare global {
    interface Window {
        controlTimeout: any;
    }
}

export default WebinarVideoModal;
