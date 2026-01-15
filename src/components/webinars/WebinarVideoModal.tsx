import { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Settings, SkipForward, ChevronRight, List, Bookmark, Clock } from 'lucide-react';

interface Webinar {
    id: number;
    title: string;
    description: string;
    duration: string;
    videoUrl?: string;
    image: string;
}

export interface VideoChapter {
    id: string;
    title: string;
    timestamp: number;
    duration: string;
}

interface WebinarVideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    webinar: Webinar | null;
    recommended: Webinar[];
    chapters?: VideoChapter[];
}

const WebinarVideoModal = ({ isOpen, onClose, webinar, recommended, chapters = [] }: WebinarVideoModalProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [activeTab, setActiveTab] = useState<'chapters' | 'upNext'>('chapters');
    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isOpen && videoRef.current) {
            videoRef.current.play().catch(() => {
                setIsPlaying(false);
            });
            setIsPlaying(true);
        } else {
            setIsPlaying(false);
        }
    }, [isOpen, webinar]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(progress);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const manualChange = Number(e.target.value);
        if (videoRef.current) {
            videoRef.current.currentTime = (videoRef.current.duration / 100) * manualChange;
            setProgress(manualChange);
        }
    };

    const jumpToTime = (seconds: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = seconds;
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleFullscreen = () => {
        if (videoRef.current?.parentElement) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                videoRef.current.parentElement.requestFullscreen();
            }
        }
    };

    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }
        controlsTimeoutRef.current = setTimeout(() => {
            if (isPlaying) {
                setShowControls(false);
            }
        }, 3000);
    };

    if (!isOpen || !webinar) return null;

    const videoSource = webinar.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4";

    return (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center animate-fade-in">
            <button
                onClick={onClose}
                className="absolute top-6 right-6 z-50 p-2 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
            >
                <X className="w-6 h-6" />
            </button>

            <div className="w-full max-w-[90rem] h-full md:h-[85vh] flex flex-col md:flex-row gap-6 p-6">

                {/* Main Player */}
                <div
                    className="flex-1 relative bg-black rounded-3xl overflow-hidden shadow-2xl group border border-white/10 flex flex-col"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => isPlaying && setShowControls(false)}
                >
                    <div className="relative flex-1 bg-black">
                        <video
                            ref={videoRef}
                            src={videoSource}
                            className="w-full h-full object-contain"
                            onTimeUpdate={handleTimeUpdate}
                            onEnded={() => setIsPlaying(false)}
                            poster={webinar.image}
                        />

                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 pointer-events-none ${showControls ? 'opacity-100' : 'opacity-0'}`} />

                        {/* Center Play Button */}
                        {!isPlaying && (
                            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                <button
                                    onClick={togglePlay}
                                    className="pointer-events-auto w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all group/btn"
                                >
                                    <Play className="w-8 h-8 fill-white ml-1 group-hover/btn:scale-110 transition-transform" />
                                </button>
                            </div>
                        )}

                        {/* Header Info */}
                        <div className={`absolute top-0 left-0 right-0 p-8 z-30 transition-transform duration-300 pointer-events-none ${showControls ? 'translate-y-0' : '-translate-y-full'}`}>
                            <h2 className="text-white text-2xl font-bold drop-shadow-md">{webinar.title}</h2>
                        </div>
                    </div>


                    {/* Controls Bar */}
                    <div className={`p-6 bg-black z-30 transition-all duration-300 ${showControls ? 'opacity-100' : 'opacity-100'}`}>
                        {/* Progress Bar */}
                        <div className="group/progress relative h-1.5 bg-white/20 rounded-full mb-4 cursor-pointer hover:h-2.5 transition-all">
                            <div
                                className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                                style={{ width: `${progress}%` }}
                            />
                            {/* Hover Timeline Marker (could be implemented) */}
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={progress}
                                onChange={handleSeek}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <button onClick={togglePlay} className="text-white hover:text-blue-400 transition-colors">
                                    {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
                                </button>

                                <div className="flex items-center gap-2 group/vol">
                                    <button onClick={toggleMute} className="text-white hover:text-blue-400">
                                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                                    </button>
                                    <div className="w-0 overflow-hidden group-hover/vol:w-24 transition-all duration-300">
                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.1"
                                            value={volume}
                                            onChange={(e) => {
                                                const val = Number(e.target.value);
                                                setVolume(val);
                                                if (videoRef.current) videoRef.current.volume = val;
                                            }}
                                            className="w-20 h-1 accent-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="text-white/70 text-sm font-mono tracking-wider">
                                    {videoRef.current ?
                                        new Date(videoRef.current.currentTime * 1000).toISOString().substr(14, 5) : "00:00"
                                    }
                                    <span className="opacity-50 mx-2">/</span>
                                    {videoRef.current?.duration ?
                                        new Date(videoRef.current.duration * 1000).toISOString().substr(14, 5) : "--:--"
                                    }
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <button className="text-white/70 hover:text-white" title="Settings">
                                    <Settings className="w-5 h-5" />
                                </button>
                                <button onClick={handleFullscreen} className="text-white/70 hover:text-white">
                                    <Maximize className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="hidden lg:flex flex-col w-96 bg-navy/80 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 shadow-xl">
                    {/* Tabs */}
                    <div className="flex border-b border-white/10">
                        <button
                            onClick={() => setActiveTab('chapters')}
                            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${activeTab === 'chapters' ? 'bg-white/10 text-white border-b-2 border-blue-500' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                        >
                            <List className="w-4 h-4" />
                            Chapters
                        </button>
                        <button
                            onClick={() => setActiveTab('upNext')}
                            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${activeTab === 'upNext' ? 'bg-white/10 text-white border-b-2 border-blue-500' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                        >
                            <Bookmark className="w-4 h-4" />
                            Up Next
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-0 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">

                        {activeTab === 'chapters' && (
                            <div className="divide-y divide-white/5">
                                {chapters.length > 0 ? (
                                    chapters.map((chapter) => (
                                        <div
                                            key={chapter.id}
                                            className="p-5 hover:bg-white/10 cursor-pointer transition-colors group relative"
                                            onClick={() => jumpToTime(chapter.timestamp)}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="w-16 pt-1 text-right shrink-0">
                                                    <span className="inline-block px-2 py-1 bg-black/40 rounded text-xs font-mono text-blue-300 border border-white/10 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                        {new Date(chapter.timestamp * 1000).toISOString().substr(14, 5)}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-medium text-sm leading-snug group-hover:text-blue-300 transition-colors">
                                                        {chapter.title}
                                                    </h4>
                                                    <p className="text-slate-500 text-xs mt-1 group-hover:text-slate-400">
                                                        {chapter.duration}
                                                    </p>
                                                </div>
                                                {/* Active Indicator (Simulated logic based on time could be added here) */}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-slate-500 text-sm">
                                        <Clock className="w-8 h-8 mx-auto mb-3 opacity-50" />
                                        No chapters available for this video.
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'upNext' && (
                            <div className="p-4 space-y-3">
                                {recommended.map(rec => (
                                    <div key={rec.id} className="group cursor-pointer flex gap-3 hover:bg-white/10 p-2 rounded-xl transition-all">
                                        <div className="relative w-28 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-slate-800">
                                            <img src={rec.image} alt={rec.title} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Play className="w-5 h-5 text-white fill-white" />
                                            </div>
                                            <span className="absolute bottom-1 right-1 bg-black/80 px-1 py-0.5 rounded text-[10px] text-white font-mono">
                                                {rec.duration}
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="text-white text-sm font-medium leading-tight mb-1 line-clamp-2 group-hover:text-blue-300 transition-colors">
                                                {rec.title}
                                            </h4>
                                            <p className="text-slate-400 text-xs mt-1">
                                                <span className="inline-block w-2 h-2 rounded-full bg-slate-600 mr-2"></span>
                                                Recommended
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebinarVideoModal;
