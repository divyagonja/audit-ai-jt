import { useEffect, useState } from 'react';
import Navigation from '@/components/landing/Navigation';
import Footer from '@/components/landing/Footer';
import JobApplicationModal from '@/components/careers/JobApplicationModal';
import { Briefcase, MapPin, Clock, ArrowRight, Users, Rocket, Heart, TrendingUp, Globe, Gift, Coffee, GraduationCap, ChevronRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Careers = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Careers - AuditAI";
    }, []);

    const [hoveredJob, setHoveredJob] = useState<number | null>(null);
    const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
    const [applicationModal, setApplicationModal] = useState<{
        isOpen: boolean;
        jobTitle: string;
        department: string;
    }>({
        isOpen: false,
        jobTitle: '',
        department: '',
    });

    const openPositions = [
        {
            id: 1,
            title: 'Senior Full Stack Engineer',
            department: 'Engineering',
            location: 'Remote / Hybrid',
            type: 'Full-time',
            description: 'Architect the next generation of planetary-scale audit engines and distributed intelligence systems.',
            tags: ['React', 'Node.js', 'Go', 'TypeScript'],
        },
        {
            id: 2,
            title: 'AI/ML Research Scientist',
            department: 'AI Research',
            location: 'Remote / San Francisco',
            type: 'Full-time',
            description: 'Lead groundbreaking research in semantic intent mapping and LLM-driven site synthesis.',
            tags: ['Python', 'PyTorch', 'NLP', 'Transformers'],
        },
        {
            id: 3,
            title: 'Executive Product Designer',
            department: 'Design',
            location: 'Remote',
            type: 'Full-time',
            description: 'Define the high-fidelity visual language for the world\'s most advanced web integrity platform.',
            tags: ['Figma', 'Prototyping', 'Design Systems', 'UX Strat'],
        },
        {
            id: 4,
            title: 'Cloud Infrastructure Architect',
            department: 'Engineering',
            location: 'Remote / Hybrid',
            type: 'Full-time',
            description: 'Maintain 99.999% uptime across our global decentralized node infrastructure.',
            tags: ['AWS', 'Kubernetes', 'Terraform', 'Rust'],
        },
        {
            id: 5,
            title: 'Enterprise Success Counsel',
            department: 'Customer Success',
            location: 'Remote',
            type: 'Full-time',
            description: 'Advise Fortune 500 stakeholders on technical SEO strategy and competitive dominance.',
            tags: ['SaaS', 'Strategy', 'Analytics', 'Advocacy'],
        },
        {
            id: 6,
            title: 'Growth Marketing Lead',
            department: 'Marketing',
            location: 'Remote',
            type: 'Full-time',
            description: 'Scale the AuditAI brand and intelligence products into new enterprise markets.',
            tags: ['Performance', 'Brand', 'Global Strategy'],
        },
    ];

    const benefits = [
        {
            icon: Globe,
            title: 'Sovereign-First Culture',
            description: 'Absolute autonomy. Work from any node on the planet with fully flexible orbital hours.',
            gradient: "from-blue-600 to-indigo-600",
        },
        {
            icon: TrendingUp,
            title: 'Equity Ownership',
            description: 'Direct stake in the revolution. Seed-level equity grants and clear exponential paths.',
            gradient: "from-purple-600 to-pink-600",
        },
        {
            icon: Heart,
            title: 'High-Fidelity Health',
            description: 'Military-grade medical coverage for you and your dependents, anywhere globally.',
            gradient: "from-emerald-600 to-teal-600",
        },
        {
            icon: GraduationCap,
            title: 'Intellectual Capital',
            description: '$5,000 annual research budget for specialized training, advanced degrees, and conferences.',
            gradient: "from-amber-600 to-orange-600",
        },
        {
            icon: Zap,
            title: 'Asynchronous PTO',
            description: 'Infinite leave protocol. We optimize for results, not hours logged at a terminal.',
            gradient: "from-indigo-600 to-blue-600",
        },
        {
            icon: Rocket,
            title: 'Infrastructure Stipend',
            description: 'Initial-launch allowance for your high-performance home terminal and ergonomic setup.',
            gradient: "from-rose-600 to-red-600",
        },
    ];

    const departments = ['All', 'Engineering', 'AI Research', 'Design', 'Marketing', 'Customer Success'];

    const filteredJobs = selectedDepartment === 'All'
        ? openPositions
        : openPositions.filter(job => job.department === selectedDepartment);

    return (
        <div className="min-h-screen bg-[#020408] font-sans text-white selection:bg-indigo-500/30">
            <Navigation />

            {/* Premium Hero */}
            <section className="relative pt-40 pb-32 overflow-hidden bg-slate-950">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px] -mr-64 -mt-64 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] -ml-64 -mb-64 pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-5xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-8 animate-fade-in">
                            <Rocket className="w-3.5 h-3.5" />
                            <span>Mission Control Seeking Talent</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] text-white">
                            Architect the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400">Future Intelligence.</span>
                        </h1>

                        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                            Join a global taskmask of elite engineers, researchers, and designers building the world's most advanced web integrity architecture.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <a
                                href="#open-positions"
                                className="h-16 px-10 bg-white text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-3"
                            >
                                Browse Manifest
                                <ChevronRight className="w-4 h-4" />
                            </a>
                            <a
                                href="#benefits"
                                className="h-16 px-10 bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-white hover:text-black transition-all backdrop-blur-md flex items-center justify-center"
                            >
                                Operational Perks
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Performance Stats */}
            <section className="py-20 border-y border-white/5 bg-[#05070a]">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        {[
                            { number: '75+', label: 'Global Operatives', color: 'indigo-400' },
                            { number: '18', label: 'Nodes Worldwide', color: 'blue-400' },
                            { number: '99%', label: 'Retention Rate', color: 'emerald-400' },
                            { number: '$150M', label: 'Series B Capital', color: 'amber-400' },
                        ].map((stat, index) => (
                            <div key={index} className="group">
                                <div className={`text-4xl md:text-5xl font-black text-${stat.color} mb-2`}>
                                    {stat.number}
                                </div>
                                <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefit Grid: Cinematic Pillars */}
            <section id="benefits" className="py-32 bg-[#020408]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24">
                        <h2 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-4">Total Compensation</h2>
                        <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Elite Provisions.</h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[40px] -m-1 p-[1px]"
                                    style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />
                                <div className="relative h-full bg-[#05070a] border border-white/5 p-12 rounded-[40px] transition-all duration-500 hover:translate-y-[-8px]">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform`}>
                                        <benefit.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">{benefit.title}</h3>
                                    <p className="text-lg text-slate-500 leading-relaxed font-medium">
                                        {benefit.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Position Manifest */}
            <section id="open-positions" className="py-32 bg-[#05070a] border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
                        <div>
                            <h2 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-4">Current Manifest</h2>
                            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Open Positions.</h3>
                        </div>

                        {/* Department Filter Protocol */}
                        <div className="flex flex-wrap gap-3">
                            {departments.map((dept) => (
                                <button
                                    key={dept}
                                    onClick={() => setSelectedDepartment(dept)}
                                    className={`px-8 py-3 rounded-2xl font-black text-[9px] uppercase tracking-widest transition-all border ${selectedDepartment === dept
                                            ? 'bg-indigo-600 border-indigo-400 text-white shadow-2xl scale-105'
                                            : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                                        }`}
                                >
                                    {dept}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="max-w-5xl mx-auto space-y-6">
                        {filteredJobs.map((job) => (
                            <motion.div
                                key={job.id}
                                layout
                                onMouseEnter={() => setHoveredJob(job.id)}
                                onMouseLeave={() => setHoveredJob(null)}
                                className={`group glass-premium border border-white/5 p-8 md:p-12 rounded-[40px] cursor-pointer transition-all duration-500 hover:bg-white/[0.02] ${hoveredJob === job.id ? 'border-indigo-500/30 -translate-y-1' : ''
                                    }`}
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="bg-indigo-600/20 border border-indigo-500/30 px-3 py-1 rounded-lg">
                                                <span className="text-[9px] font-black text-indigo-300 uppercase tracking-widest">{job.department}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                                                <MapPin className="w-3.5 h-3.5" />
                                                {job.location}
                                            </div>
                                        </div>

                                        <h3 className="text-3xl font-black text-white mb-6 group-hover:text-indigo-400 transition-colors">
                                            {job.title}
                                        </h3>

                                        <p className="text-xl text-slate-500 leading-relaxed font-medium mb-8">
                                            {job.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {job.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setApplicationModal({
                                            isOpen: true,
                                            jobTitle: job.title,
                                            department: job.department,
                                        })}
                                        className="h-20 px-12 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-3xl hover:bg-indigo-600 hover:text-white transition-all shadow-2xl flex items-center justify-center gap-4 group/btn"
                                    >
                                        Initiate Protocol
                                        <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-white/10 transition-colors group-hover/btn:translate-x-2 transition-transform">
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filteredJobs.length === 0 && (
                        <div className="text-center py-40">
                            <Briefcase className="w-20 h-20 text-white/10 mx-auto mb-8" />
                            <h3 className="text-3xl font-black text-white mb-4 italic">Manifest-Empty</h3>
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">No openings found in this sector.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Sovereign Initiative CTA */}
            <section className="py-40 bg-[#020408] overflow-hidden">
                <div className="container mx-auto px-6 relative">
                    <div className="max-w-4xl mx-auto rounded-[60px] p-16 md:p-24 border border-white/10 glass-premium text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-indigo-600/5 pointer-events-none shadow-[inset_0_0_100px_rgba(79,70,229,0.1)]" />

                        <h2 className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tighter leading-tight relative z-10">
                            Elite <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Collaborator.</span>
                        </h2>
                        <p className="text-xl text-slate-400 mb-16 max-w-2xl mx-auto font-medium leading-relaxed relative z-10">
                            If your specific expertise isn't listed in the manifest, engage our core recruitment node with your high-fidelity portfolio.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                            <a
                                href="mailto:careers@auditai.com"
                                className="h-16 px-10 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-2xl flex items-center justify-center gap-3 group"
                            >
                                Dispatch Resume
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href="/contact"
                                className="h-16 px-10 bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-white hover:text-black transition-all backdrop-blur-md flex items-center justify-center"
                            >
                                Direct Intake
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <JobApplicationModal
                isOpen={applicationModal.isOpen}
                onClose={() => setApplicationModal({ isOpen: false, jobTitle: '', department: '' })}
                jobTitle={applicationModal.jobTitle}
                department={applicationModal.department}
            />

            <Footer />
        </div>
    );
};

export default Careers;
