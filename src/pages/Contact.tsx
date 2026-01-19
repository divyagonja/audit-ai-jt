import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send, Sparkles, ArrowRight } from "lucide-react";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
    useEffect(() => {
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
    const [activeField, setActiveField] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            toast({
                title: "Message Sent!",
                description: "We'll be in touch shortly.",
            });
            setFormData({ name: "", email: "", subject: "", message: "" });
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="min-h-screen bg-navy selection:bg-primary/20">
            <Navigation />

            <main className="pt-24 pb-10 lg:pt-32 relative min-h-[1150px]">
                {/* Hero Background - Matches Home Page 'hero-gradient' */}
                <div className="absolute inset-0 h-[1050px] lg:h-[1150px] hero-gradient skew-y-0 transform origin-top-left z-0 rounded-b-[3rem]" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-start pt-10">

                        {/* Left Side: Copy */}
                        <div className="text-white space-y-8 animate-fade-in-up">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur-sm">
                                    <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse" />
                                    <span className="text-xs font-medium text-blue-100 uppercase tracking-widest">Contact Sales</span>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                                    Let's Build Something <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Great Together.</span>
                                </h1>
                                <p className="text-lg text-blue-100/80 max-w-lg leading-relaxed">
                                    Ready to optimize your digital presence? Our enterprise team is ready to help you scale with confidence.
                                </p>
                            </div>

                            <div className="grid gap-4 mt-8">
                                {[
                                    { icon: Mail, label: "Email Support", value: "support@auditai.com" },
                                    { icon: Phone, label: "Call Sales", value: "+1 (555) 123-4567" },
                                    { icon: MapPin, label: "Visit HQ", value: "Tech Valley, CA 94043" }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-5 p-4 rounded-xl transition-all hover:bg-white/5 border border-transparent hover:border-white/10 group cursor-pointer">
                                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-blue-200 font-bold uppercase tracking-wider mb-1 group-hover:text-blue-100 transition-colors">{item.label}</p>
                                            <p className="text-lg font-bold text-white leading-none">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side: White Card Form */}
                        <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-slate-100 pointer-events-auto">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h2 className="text-2xl font-bold text-navy">Send a message</h2>
                                        <p className="text-slate-500 text-sm mt-1">We typically reply within 24 hours.</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-primary" />
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700 ml-1">Full Name</label>
                                            <Input
                                                name="name"
                                                className="bg-slate-50 border-slate-200 text-navy placeholder:text-slate-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all rounded-lg h-11"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700 ml-1">Email Address</label>
                                            <Input
                                                name="email"
                                                type="email"
                                                className="bg-slate-50 border-slate-200 text-navy placeholder:text-slate-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all rounded-lg h-11"
                                                placeholder="you@company.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 ml-1">Subject</label>
                                        <Input
                                            name="subject"
                                            className="bg-slate-50 border-slate-200 text-navy placeholder:text-slate-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all rounded-lg h-11"
                                            placeholder="How can we help?"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 ml-1">Message</label>
                                        <Textarea
                                            name="message"
                                            className="min-h-[150px] bg-slate-50 border-slate-200 text-navy placeholder:text-slate-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all rounded-lg resize-none"
                                            placeholder="Tell us about your project..."
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full h-12 text-base bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg shadow-lg shadow-primary/20 transition-all hover:translate-y-[-2px]"
                                        disabled={loading}
                                    >
                                        {loading ? "Sending..." : (
                                            <span className="flex items-center justify-center gap-2">
                                                Send Message
                                                <ArrowRight className="w-4 h-4" />
                                            </span>
                                        )}
                                    </Button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;
