import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, MessageSquare, Globe, ShieldCheck, ChevronRight, User, AtSign, FileText } from "lucide-react";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Contact Us - AuditAI";
    }, []);

    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            toast({
                title: "Message Sent",
                description: "We've received your inquiry and will get back to you shortly.",
            });
            setFormData({ name: "", email: "", subject: "", message: "" });
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="min-h-screen bg-[#020408] font-sans text-white selection:bg-indigo-500/30">
            <Navigation />

            {/* Cinematic Hero with Motion Gradient */}
            <section className="relative pt-40 pb-20 overflow-hidden bg-[#020408]">
                {/* Motion Gradient Background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <motion.div
                        animate={{
                            x: [0, 50, 0],
                            y: [0, -30, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px]"
                    />
                    <motion.div
                        animate={{
                            x: [0, -50, 0],
                            y: [0, 50, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute -bottom-40 -left-40 w-[700px] h-[700px] bg-blue-600/20 rounded-full blur-[120px]"
                    />
                    <motion.div
                        animate={{
                            opacity: [0.1, 0.3, 0.1],
                            scale: [0.8, 1, 0.8],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-purple-900/10 rounded-full blur-[150px]"
                    />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-8 backdrop-blur-md"
                        >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Contact Our Team</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]"
                        >
                            Let's talk <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#818CF8] italic">About your project.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-slate-400 max-w-2xl font-medium leading-relaxed"
                        >
                            Have questions about our platform or need a custom solution? Our experts are here to help you optimize your digital presence and scale your business.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Main Contact Section */}
            <section className="py-20 bg-[#020408]">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-16">

                        {/* Left Side: Contact Info */}
                        <div className="lg:col-span-5 space-y-12">
                            <div className="grid gap-6">
                                {[
                                    {
                                        icon: Mail,
                                        label: "Email Support",
                                        value: "support@auditai.com",
                                        desc: "For general inquiries and technical support."
                                    },
                                    {
                                        icon: Phone,
                                        label: "Sales Inquiry",
                                        value: "+1 (555) 123-4567",
                                        desc: "Talk to our sales team for enterprise solutions."
                                    },
                                    {
                                        icon: MapPin,
                                        label: "Our Office",
                                        value: "Tech Valley, CA 94043",
                                        desc: "Visit us at our global headquarters."
                                    }
                                ].map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all group cursor-default"
                                    >
                                        <div className="flex items-start gap-6">
                                            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 group-hover:bg-indigo-600 transition-colors">
                                                <item.icon className="w-6 h-6 text-indigo-400 group-hover:text-white transition-colors" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{item.label}</div>
                                                <div className="text-xl font-black text-white mb-2">{item.value}</div>
                                                <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="p-10 rounded-[40px] glass-premium border border-white/5 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-indigo-600/5 pointer-events-none" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-6">
                                        <ShieldCheck className="w-4 h-4" />
                                        <span>Secure Communication</span>
                                    </div>
                                    <p className="text-lg text-slate-300 font-medium leading-relaxed italic">
                                        "Your privacy is important to us. All messages are encrypted and handled with the highest level of security."
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Contact Form */}
                        <div className="lg:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="glass-premium border border-white/10 rounded-[48px] p-2 overflow-hidden shadow-2xl relative"
                            >
                                <div className="absolute inset-0 bg-indigo-600/5 pointer-events-none" />
                                <div className="bg-slate-950 rounded-[40px] overflow-hidden border border-white/5 p-10 md:p-14">
                                    <div className="flex items-center justify-between mb-12">
                                        <div>
                                            <h2 className="text-3xl font-black text-white tracking-tight">Send a message</h2>
                                            <p className="text-slate-500 text-sm font-medium mt-2">Response time: Usually within 24 hours.</p>
                                        </div>
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                                            <MessageSquare className="w-6 h-6 text-indigo-400" />
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-10">
                                        <div className="grid md:grid-cols-2 gap-10">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                                                    <User className="w-3 h-3" />
                                                    <span>Full Name</span>
                                                </div>
                                                <Input
                                                    name="name"
                                                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:bg-white/10 focus:border-indigo-500 transition-all rounded-2xl h-16 px-6 font-medium"
                                                    placeholder="Enter your name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                                                    <AtSign className="w-3 h-3" />
                                                    <span>Email Address</span>
                                                </div>
                                                <Input
                                                    name="email"
                                                    type="email"
                                                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:bg-white/10 focus:border-indigo-500 transition-all rounded-2xl h-16 px-6 font-medium"
                                                    placeholder="name@company.com"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                                                <FileText className="w-3 h-3" />
                                                <span>Subject</span>
                                            </div>
                                            <Input
                                                name="subject"
                                                className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:bg-white/10 focus:border-indigo-500 transition-all rounded-2xl h-16 px-6 font-medium"
                                                placeholder="What is this regarding?"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                                                <MessageSquare className="w-3 h-3" />
                                                <span>Message</span>
                                            </div>
                                            <Textarea
                                                name="message"
                                                className="min-h-[200px] bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:bg-white/10 focus:border-indigo-500 transition-all rounded-3xl p-6 font-medium resize-none"
                                                placeholder="Tell us more about your needs..."
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full h-20 bg-white text-black font-black text-sm uppercase tracking-[0.2em] rounded-3xl hover:bg-indigo-600 hover:text-white transition-all shadow-2xl flex items-center justify-center gap-4 group"
                                        >
                                            {loading ? "Sending..." : (
                                                <>
                                                    Send Message
                                                    <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-white/10 transition-colors group-hover:translate-x-2 transition-transform">
                                                        <ChevronRight className="w-4 h-4" />
                                                    </div>
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Global Presence */}
            <section className="py-20 border-t border-white/5 bg-[#05070a]">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-12">Global Support Available In</p>
                    <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                        {['NEW YORK', 'LONDON', 'SINGAPORE', 'BERLIN', 'TOKYO'].map((city, i) => (
                            <span key={i} className="text-xl font-black text-white tracking-[0.3em] hover:text-indigo-400 cursor-default transition-colors">{city}</span>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;
