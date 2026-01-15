import { useEffect, useState } from 'react';
import Navigation from '@/components/landing/Navigation';
import Footer from '@/components/landing/Footer';
import JobApplicationModal from '@/components/careers/JobApplicationModal';
import { Briefcase, MapPin, Clock, ArrowRight, Users, Rocket, Heart, TrendingUp, Globe, Gift, Coffee, GraduationCap } from 'lucide-react';

const Careers = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
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
            description: 'Build the next generation of AI-powered web intelligence tools.',
            tags: ['React', 'Node.js', 'AI/ML', 'TypeScript'],
        },
        {
            id: 2,
            title: 'AI/ML Research Scientist',
            department: 'AI Research',
            location: 'Remote / San Francisco',
            type: 'Full-time',
            description: 'Drive innovation in NLP and machine learning for web analysis.',
            tags: ['Python', 'TensorFlow', 'NLP', 'Deep Learning'],
        },
        {
            id: 3,
            title: 'Product Designer',
            department: 'Design',
            location: 'Remote',
            type: 'Full-time',
            description: 'Create beautiful, intuitive experiences for our users.',
            tags: ['Figma', 'UI/UX', 'Design Systems', 'User Research'],
        },
        {
            id: 4,
            title: 'DevOps Engineer',
            department: 'Engineering',
            location: 'Remote / Hybrid',
            type: 'Full-time',
            description: 'Scale our infrastructure to handle millions of audits.',
            tags: ['AWS', 'Kubernetes', 'Docker', 'CI/CD'],
        },
        {
            id: 5,
            title: 'Customer Success Manager',
            department: 'Customer Success',
            location: 'Remote',
            type: 'Full-time',
            description: 'Help our enterprise clients achieve their SEO goals.',
            tags: ['SaaS', 'Communication', 'Analytics', 'Problem Solving'],
        },
        {
            id: 6,
            title: 'Marketing Manager',
            department: 'Marketing',
            location: 'Remote',
            type: 'Full-time',
            description: 'Build our brand and grow our community.',
            tags: ['Content Marketing', 'SEO', 'Growth', 'Analytics'],
        },
    ];

    const benefits = [
        {
            icon: Globe,
            title: 'Remote-First Culture',
            description: 'Work from anywhere in the world with flexible hours.',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: TrendingUp,
            title: 'Equity & Growth',
            description: 'Stock options and clear career progression paths.',
            color: 'from-purple-500 to-pink-500',
        },
        {
            icon: Heart,
            title: 'Health & Wellness',
            description: 'Comprehensive health insurance and wellness programs.',
            color: 'from-red-500 to-orange-500',
        },
        {
            icon: GraduationCap,
            title: 'Learning Budget',
            description: '$2,000 annual budget for courses, books, and conferences.',
            color: 'from-green-500 to-emerald-500',
        },
        {
            icon: Coffee,
            title: 'Unlimited PTO',
            description: 'Take time off when you need it. We trust you.',
            color: 'from-yellow-500 to-amber-500',
        },
        {
            icon: Gift,
            title: 'Equipment Allowance',
            description: 'Top-tier hardware and setup for your home office.',
            color: 'from-indigo-500 to-blue-500',
        },
    ];

    const values = [
        {
            icon: Rocket,
            title: 'Innovation First',
            description: 'We push boundaries and embrace cutting-edge technology.',
        },
        {
            icon: Users,
            title: 'Collaborative Spirit',
            description: 'Great ideas come from diverse teams working together.',
        },
        {
            icon: Heart,
            title: 'Customer Obsessed',
            description: 'Our users\' success is our success.',
        },
        {
            icon: TrendingUp,
            title: 'Growth Mindset',
            description: 'We learn, adapt, and continuously improve.',
        },
    ];

    const departments = ['All', 'Engineering', 'AI Research', 'Design', 'Marketing', 'Customer Success'];

    const filteredJobs = selectedDepartment === 'All'
        ? openPositions
        : openPositions.filter(job => job.department === selectedDepartment);

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-navy via-blue-900 to-navy">
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-75"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 animate-fade-in">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-white text-sm font-medium">We're Hiring!</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
                            Build the Future of <br />
                            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                Web Intelligence
                            </span>
                        </h1>

                        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto animate-fade-in-up delay-100">
                            Join our team of innovators, engineers, and designers who are transforming how businesses understand and optimize their web presence.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-200">
                            <a
                                href="#open-positions"
                                className="px-8 py-4 bg-white text-navy font-bold rounded-xl hover:bg-slate-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                            >
                                View Open Positions
                                <ArrowRight className="inline-block ml-2 w-5 h-5" />
                            </a>
                            <a
                                href="#benefits"
                                className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/20 backdrop-blur-sm"
                            >
                                Why AuditAI?
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white border-b">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { number: '50+', label: 'Team Members', color: 'blue' },
                            { number: '15+', label: 'Countries', color: 'purple' },
                            { number: '98%', label: 'Retention Rate', color: 'green' },
                            { number: '$150M', label: 'Series B Funding', color: 'orange' },
                        ].map((stat, index) => (
                            <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                                <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 bg-clip-text text-transparent mb-2`}>
                                    {stat.number}
                                </div>
                                <div className="text-slate-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-24 bg-gradient-to-b from-white to-slate-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">Our Core Values</h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            These principles guide everything we do and shape our culture.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="corporate-card p-8 rounded-2xl group hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6 group-hover:bg-blue-100 group-hover:border-blue-200 transition-all">
                                    <value.icon className="w-8 h-8 text-blue-600 group-hover:text-blue-700 group-hover:scale-110 transition-all" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-bold text-navy mb-3">{value.title}</h3>
                                <p className="text-slate-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section id="benefits" className="py-24 bg-navy relative overflow-hidden">
                {/* Background Animation */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Perks & Benefits</h2>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                            We invest in our team because great people build great products.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="glass-dark p-8 rounded-2xl hover:scale-105 transition-all duration-300 group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                                    <benefit.icon className="w-8 h-8 text-slate-300 group-hover:text-white group-hover:scale-110 transition-all" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                                <p className="text-slate-300">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section id="open-positions" className="py-24 bg-gradient-to-b from-slate-50 to-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">Open Positions</h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
                            Find your next opportunity to make an impact.
                        </p>

                        {/* Department Filter */}
                        <div className="flex flex-wrap justify-center gap-3">
                            {departments.map((dept) => (
                                <button
                                    key={dept}
                                    onClick={() => setSelectedDepartment(dept)}
                                    className={`px-6 py-2 rounded-full font-medium transition-all ${selectedDepartment === dept
                                        ? 'bg-blue-500 text-white shadow-lg scale-105'
                                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                        }`}
                                >
                                    {dept}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-4">
                        {filteredJobs.map((job, index) => (
                            <div
                                key={job.id}
                                onMouseEnter={() => setHoveredJob(job.id)}
                                onMouseLeave={() => setHoveredJob(null)}
                                className={`corporate-card p-6 rounded-2xl cursor-pointer transition-all duration-300 ${hoveredJob === job.id ? 'border-blue-300 shadow-xl scale-[1.02]' : ''
                                    }`}
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                                                <Briefcase className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-navy mb-1">{job.title}</h3>
                                                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-4 h-4" />
                                                        {job.location}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4" />
                                                        {job.type}
                                                    </span>
                                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                                        {job.department}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-slate-600 mb-3">{job.description}</p>

                                        <div className="flex flex-wrap gap-2">
                                            {job.tags.map((tag, tagIndex) => (
                                                <span
                                                    key={tagIndex}
                                                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium"
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
                                        className="px-6 py-3 bg-navy text-white font-bold rounded-xl hover:bg-blue-600 transition-all flex items-center gap-2 justify-center group"
                                    >
                                        Apply Now
                                        <ArrowRight className={`w-5 h-5 transition-transform ${hoveredJob === job.id ? 'translate-x-1' : ''}`} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredJobs.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-xl text-slate-500">No positions found in this department.</p>
                            <button
                                onClick={() => setSelectedDepartment('All')}
                                className="mt-4 text-blue-600 font-semibold hover:underline"
                            >
                                View all positions
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-75"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Don't See the Perfect Role?
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        We're always looking for talented people. Send us your resume and let's start a conversation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="mailto:careers@auditai.com"
                            className="px-8 py-4 bg-white text-navy font-bold rounded-xl hover:bg-slate-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                        >
                            Send Your Resume
                        </a>
                        <a
                            href="/contact"
                            className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/20 backdrop-blur-sm"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </section>

            {/* Job Application Modal */}
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
