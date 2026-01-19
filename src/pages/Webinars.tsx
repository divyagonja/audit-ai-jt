import { useEffect, useState } from 'react';
import Navigation from '@/components/landing/Navigation';
import Footer from '@/components/landing/Footer';
import { Calendar, Clock, Users, Play, ArrowRight, Video, Mic, CheckCircle } from 'lucide-react';
import WebinarRegistrationModal from '@/components/webinars/WebinarRegistrationModal';
import WebinarVideoModal, { VideoChapter } from '@/components/webinars/WebinarVideoModal';
import SpeakerProfileModal, { SpeakerProfile } from '@/components/webinars/SpeakerProfileModal';

interface Webinar {
    id: number;
    title: string;
    description: string;
    date?: string;
    time?: string;
    duration: string;
    speakers?: { name: string; role: string; image: string }[];
    image: string;
    tags: string[];
    views?: string;
    videoUrl?: string;
}

// Mock Data for Speaker Profiles
const SPEAKER_PROFILES: Record<string, SpeakerProfile> = {
    "Sarah Chen": {
        name: "Sarah Chen",
        role: "Head of AI",
        company: "AuditAI",
        image: "https://ui-avatars.com/api/?name=Sarah+Chen&background=2563eb&color=fff",
        bio: "Sarah is a pioneer in Generative AI for enterprise SEO. Previously a Senior Engineer at Google, she now leads the AI initiative at AuditAI, focusing on LLM-driven search intent analysis and automated content optimization. She has spoken at SMX, MozCon, and TechCrunch Disrupt.",
        socials: { linkedin: "https://linkedin.com", twitter: "https://twitter.com" }
    },
    "Mike Ross": {
        name: "Mike Ross",
        role: "SEO Director",
        company: "AuditAI",
        image: "https://ui-avatars.com/api/?name=Mike+Ross&background=60a5fa&color=fff",
        bio: "Mike has managed SEO strategies for over 20 Fortune 500 companies. His expertise lies in technical SEO migrations and international SEO. At AuditAI, he bridges the gap between technical possibilities and marketing realities.",
        socials: { linkedin: "https://linkedin.com", website: "https://mikeross.seo" }
    },
    "David Kim": {
        name: "David Kim",
        role: "CTO",
        company: "AuditAI",
        image: "https://ui-avatars.com/api/?name=David+Kim&background=0f172a&color=fff",
        bio: "David architects the massive-scale crawling infrastructure behind AuditAI. With a background in distributed systems, he ensures our tools can render and analyze millions of JS-heavy pages daily without breaking a sweat.",
        socials: { linkedin: "https://linkedin.com", twitter: "https://twitter.com" }
    }
};

// Mock Data for Video Chapters
const VIDEO_CHAPTERS: Record<number, VideoChapter[]> = {
    3: [ // Core Web Vitals
        { id: '1', title: "What is INP (Interaction to Next Paint)?", timestamp: 10, duration: "8 mins" },
        { id: '2', title: "Measuring vs. Optimizing", timestamp: 85, duration: "12 mins" },
        { id: '3', title: "Tools for Diagnosis", timestamp: 240, duration: "15 mins" },
        { id: '4', title: "Case Study: Improving LCP by 40%", timestamp: 350, duration: "10 mins" }
    ],
    4: [ // Competitor Analysis
        { id: '1', title: "Identifying True Competitors", timestamp: 15, duration: "5 mins" },
        { id: '2', title: "Gap Analysis Framework", timestamp: 120, duration: "20 mins" },
        { id: '3', title: "Backlink Intersect Strategies", timestamp: 300, duration: "15 mins" },
        { id: '4', title: "Q&A Session", timestamp: 500, duration: "10 mins" }
    ],
    5: [ // E-commerce
        { id: '1', title: "Faceted Navigation Hazards", timestamp: 20, duration: "10 mins" },
        { id: '2', title: "Product Page Schema", timestamp: 140, duration: "15 mins" },
        { id: '3', title: "Handling Out of Stock Products", timestamp: 280, duration: "10 mins" },
        { id: '4', title: "Seasonal SEO Tactics", timestamp: 400, duration: "15 mins" }
    ],
    6: [ // Local SEO
        { id: '1', title: "GMB Optimization 2026", timestamp: 10, duration: "12 mins" },
        { id: '2', title: "Citation Management at Scale", timestamp: 100, duration: "18 mins" },
        { id: '3', title: "Local Content Strategy", timestamp: 240, duration: "10 mins" },
        { id: '4', title: "Managing Reviews with AI", timestamp: 320, duration: "10 mins" }
    ]
};

const Webinars = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Webinars - AuditAI";
    }, []);

    const [activeTab, setActiveTab] = useState<'upcoming' | 'ondemand'>('upcoming');
    const [selectedWebinar, setSelectedWebinar] = useState<Webinar | null>(null);
    const [selectedSpeaker, setSelectedSpeaker] = useState<SpeakerProfile | null>(null);

    // Modal States
    const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [isSpeakerModalOpen, setIsSpeakerModalOpen] = useState(false);

    const handleReserve = (webinar: Webinar) => {
        setSelectedWebinar(webinar);
        setIsReserveModalOpen(true);
    };

    const handleWatch = (webinar: Webinar) => {
        setSelectedWebinar(webinar);
        setIsVideoModalOpen(true);
    };

    const handleSpeakerClick = (e: React.MouseEvent, speakerName: string) => {
        e.stopPropagation(); // Prevent card click
        if (SPEAKER_PROFILES[speakerName]) {
            setSelectedSpeaker(SPEAKER_PROFILES[speakerName]);
            setIsSpeakerModalOpen(true);
        }
    };

    const upcomingWebinars: Webinar[] = [
        {
            id: 1,
            title: "Mastering SEO in the Age of AI",
            description: "Learn how generative AI is reshaping search engines and what you need to do to stay ahead of the curve. We'll cover SGE, AI content detection, and future-proofing strategies.",
            date: "Feb 15, 2026",
            time: "2:00 PM EST",
            duration: "60 min",
            speakers: [
                { name: "Sarah Chen", role: "Head of AI, AuditAI", image: "https://ui-avatars.com/api/?name=Sarah+Chen&background=2563eb&color=fff" },
                { name: "Mike Ross", role: "SEO Director", image: "https://ui-avatars.com/api/?name=Mike+Ross&background=60a5fa&color=fff" }
            ],
            image: "/images/webinars/seo.png",
            tags: ["SEO Strategies", "AI Trends"]
        },
        {
            id: 2,
            title: "Technical Audits for Enterprise Sites",
            description: "A deep dive into crawling, rendering, and indexing for large-scale websites with millions of pages. Discover how to identify and fix critical technical debt.",
            date: "Feb 28, 2026",
            time: "1:00 PM EST",
            duration: "90 min",
            speakers: [
                { name: "David Kim", role: "CTO, AuditAI", image: "https://ui-avatars.com/api/?name=David+Kim&background=0f172a&color=fff" }
            ],
            image: "/images/webinars/tech.png",
            tags: ["Technical SEO", "Enterprise"]
        }
    ];

    const onDemandWebinars: Webinar[] = [
        {
            id: 3,
            title: "Core Web Vitals Workshop",
            description: "Everything you need to know about INP (Interaction to Next Paint) and optimizing for page experience signals.",
            views: "2.5k views",
            duration: "45 min",
            image: "/images/webinars/analytics.png",
            tags: ["Performance", "Core Web Vitals"],
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            speakers: [{ name: "Sarah Chen", role: "Head of AI", image: "https://ui-avatars.com/api/?name=Sarah+Chen&background=2563eb&color=fff" }]
        },
        {
            id: 4,
            title: "Competitor Analysis Masterclass",
            description: "Reverse engineer your competitors' strategies using AuditAI's new intelligence tools. Uncover their backlink gaps and content opportunities.",
            views: "1.8k views",
            duration: "55 min",
            image: "/images/webinars/analytics.png",
            tags: ["Strategy", "Competitor Research"],
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
            speakers: [{ name: "Mike Ross", role: "SEO Director", image: "https://ui-avatars.com/api/?name=Mike+Ross&background=60a5fa&color=fff" }]
        },
        {
            id: 5,
            title: "E-commerce SEO Best Practices",
            description: "Optimizing product pages, category structure, and faceted navigation for maximum organic visibility.",
            views: "3.2k views",
            duration: "60 min",
            image: "/images/webinars/seo.png",
            tags: ["E-commerce", "CRO"],
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            speakers: [{ name: "David Kim", role: "CTO", image: "https://ui-avatars.com/api/?name=David+Kim&background=0f172a&color=fff" }]
        },
        {
            id: 6,
            title: "Local SEO for Multi-Location Brands",
            description: "Scalable strategies for managing citations, GMB profiles, and local content across hundreds of locations.",
            views: "1.2k views",
            duration: "50 min",
            image: "/images/webinars/tech.png",
            tags: ["Local SEO", "Growth"],
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            speakers: [{ name: "Sarah Chen", role: "Head of AI", image: "https://ui-avatars.com/api/?name=Sarah+Chen&background=2563eb&color=fff" }]
        }
    ];

    const getSpeakerSessions = (speakerName: string) => {
        return [...upcomingWebinars, ...onDemandWebinars].filter(w =>
            w.speakers?.some(s => s.name === speakerName)
        );
    };

    return (
        <div className="min-h-screen bg-background font-sans text-navy selection:bg-purple-500/30">
            <Navigation />

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-navy">
                    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-500 via-blue-900 to-navy" />
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    {/* ... Same Hero Content ... */}
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-fade-in">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                            <span className="text-white text-sm font-medium tracking-wide">AuditAI Live Academy</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
                            Expert-Led SEO <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Masterclasses</span>
                        </h1>

                        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100">
                            Join thousands of marketers and developers leveling up their skills through our deep-dive webinars and interactive workshops.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-200">
                            <button className="px-8 py-4 bg-white text-navy font-bold rounded-xl hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-2 group">
                                Browse Upcoming
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="px-8 py-4 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-all border border-white/10 backdrop-blur-sm flex items-center gap-2">
                                <Play className="w-5 h-5" />
                                Watch On-Demand
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Navigation Tabs */}
            <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="container mx-auto px-6">
                    <div className="flex items-center gap-8 overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('upcoming')}
                            className={`py-4 font-bold text-sm uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${activeTab === 'upcoming'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-slate-500 hover:text-navy'
                                }`}
                        >
                            Upcoming Sessions
                        </button>
                        <button
                            onClick={() => setActiveTab('ondemand')}
                            className={`py-4 font-bold text-sm uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${activeTab === 'ondemand'
                                ? 'border-purple-600 text-purple-600'
                                : 'border-transparent text-slate-500 hover:text-navy'
                                }`}
                        >
                            On-Demand Library
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <section className="py-20 bg-slate-50 min-h-[600px]">
                <div className="container mx-auto px-6">

                    {activeTab === 'upcoming' && (
                        <div className="space-y-8 animate-fade-in">
                            {upcomingWebinars.map((webinar) => (
                                <div key={webinar.id} className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-slate-100 group">
                                    <div className="grid md:grid-cols-12 gap-0">
                                        <div className="md:col-span-12 lg:col-span-5 relative h-64 md:h-auto min-h-[300px] overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-800 mix-blend-multiply z-10" />
                                            <img
                                                src={webinar.image}
                                                alt={webinar.title}
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 bg-slate-800"
                                            />
                                            <div className="absolute top-4 left-4 z-20 flex gap-2">
                                                {webinar.tags.map((tag) => (
                                                    <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="md:col-span-12 lg:col-span-7 p-8 md:p-12 flex flex-col justify-center">
                                            {/* ... Metadata ... */}
                                            <div className="flex items-center gap-6 text-sm font-semibold text-slate-500 mb-4">
                                                <div className="flex items-center gap-2 text-blue-600">
                                                    <Calendar className="w-5 h-5" />
                                                    {webinar.date}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-5 h-5" />
                                                    {webinar.time}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Video className="w-5 h-5" />
                                                    {webinar.duration}
                                                </div>
                                            </div>

                                            <h3 className="text-3xl font-bold text-navy mb-4 group-hover:text-blue-600 transition-colors">
                                                {webinar.title}
                                            </h3>
                                            <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                                                {webinar.description}
                                            </p>

                                            <div className="flex items-center justify-between mt-auto">
                                                <div className="flex items-center -space-x-4">
                                                    {webinar.speakers?.map((speaker, i) => (
                                                        <div
                                                            key={i}
                                                            className="relative group/speaker cursor-pointer hover:z-10 hover:scale-110 transition-transform"
                                                            onClick={(e) => handleSpeakerClick(e, speaker.name)}
                                                        >
                                                            <img
                                                                src={speaker.image}
                                                                alt={speaker.name}
                                                                className="w-12 h-12 rounded-full border-2 border-white object-cover"
                                                            />
                                                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-navy text-white text-xs px-2 py-1 rounded opacity-0 group-hover/speaker:opacity-100 transition-opacity pointer-events-none">
                                                                View {speaker.name}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <button
                                                    onClick={() => handleReserve(webinar)}
                                                    className="px-8 py-3 bg-navy text-white font-bold rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/10 active:scale-95 transform"
                                                >
                                                    Reserve Spot
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'ondemand' && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
                            {onDemandWebinars.map((webinar) => (
                                <div key={webinar.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-slate-100 group cursor-pointer flex flex-col"
                                    onClick={() => handleWatch(webinar)}
                                >
                                    <div className="relative h-56 overflow-hidden bg-slate-100 shrink-0">
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                                        <img
                                            src={webinar.image}
                                            alt={webinar.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40">
                                                <Play className="w-8 h-8 text-white ml-1 fill-white" />
                                            </div>
                                        </div>
                                        <span className="absolute bottom-3 right-3 z-20 px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-xs font-bold text-white">
                                            {webinar.duration}
                                        </span>
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {webinar.tags.map(tag => (
                                                <span key={tag} className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {webinar.title}
                                        </h3>
                                        {/* Added Speaker Avatars to On-Demand Cards */}
                                        <div className="mt-auto flex items-center justify-between">
                                            <div className="flex -space-x-2">
                                                {webinar.speakers?.map((speaker, i) => (
                                                    <div
                                                        key={i}
                                                        className="relative hover:z-10 hover:scale-110 transition-transform cursor-pointer"
                                                        title={speaker.name}
                                                        onClick={(e) => handleSpeakerClick(e, speaker.name)}
                                                    >
                                                        <img
                                                            src={speaker.image}
                                                            alt={speaker.name}
                                                            className="w-8 h-8 rounded-full border border-white object-cover"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                                                <Users className="w-4 h-4" />
                                                {webinar.views}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-20 bg-white border-t border-slate-100">
                <div className="container mx-auto px-6">
                    <div className="bg-navy rounded-3xl p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-20 -mr-16 -mt-16" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-20 -ml-16 -mb-16" />

                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                            <div className="max-w-2xl">
                                <h2 className="text-3xl font-bold text-white mb-4">Never miss an update</h2>
                                <p className="text-slate-300 text-lg">
                                    Get notified about upcoming webinars, exclusive workshops, and expert sessions delivered straight to your inbox.
                                </p>
                            </div>
                            <div className="w-full lg:w-auto flex-shrink-0">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white/20 transition-all min-w-[300px]"
                                    />
                                    <button className="px-8 py-4 bg-white text-navy font-bold rounded-xl hover:bg-blue-50 transition-all">
                                        Subscribe
                                    </button>
                                </div>
                                <p className="text-slate-400 text-xs mt-3 flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" />
                                    <span>No spam, unsubscribe anytime.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            <WebinarRegistrationModal
                isOpen={isReserveModalOpen}
                onClose={() => setIsReserveModalOpen(false)}
                webinar={selectedWebinar}
            />

            <WebinarVideoModal
                isOpen={isVideoModalOpen}
                onClose={() => setIsVideoModalOpen(false)}
                webinar={selectedWebinar}
                recommended={onDemandWebinars.filter(w => w.id !== selectedWebinar?.id)}
                chapters={selectedWebinar ? VIDEO_CHAPTERS[selectedWebinar.id] : []}
            />

            <SpeakerProfileModal
                isOpen={isSpeakerModalOpen}
                onClose={() => setIsSpeakerModalOpen(false)}
                speaker={selectedSpeaker}
                speakerSessions={selectedSpeaker ? getSpeakerSessions(selectedSpeaker.name) : []}
                onSessionClick={(webinar) => {
                    setIsSpeakerModalOpen(false);
                    if (webinar.date) {
                        handleReserve(webinar);
                    } else {
                        handleWatch(webinar);
                    }
                }}
            />
        </div>
    );
};

export default Webinars;
