import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
    const testimonials = [
        {
            name: "Sarah Chen",
            role: "VP of Marketing",
            company: "TechCorp",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            rating: 5,
            text: "AuditAI transformed how we approach website optimization. We identified and fixed critical SEO issues that increased our organic traffic by 156% in just 3 months.",
        },
        {
            name: "Michael Rodriguez",
            role: "CTO",
            company: "GrowthLabs",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            rating: 5,
            text: "The AI-powered insights are incredibly accurate. We've saved over 40 hours per month on manual audits and our Core Web Vitals scores improved dramatically.",
        },
        {
            name: "Emily Watson",
            role: "Digital Director",
            company: "RetailPro",
            image: "https://randomuser.me/api/portraits/women/68.jpg",
            rating: 5,
            text: "Best investment we've made this year. The ROI tracking feature helped us prove $2.3M in revenue impact from our optimization efforts.",
        },
        {
            name: "David Kim",
            role: "Head of SEO",
            company: "MediaHub",
            image: "https://randomuser.me/api/portraits/men/46.jpg",
            rating: 5,
            text: "The white-label reports are professional and client-ready. We've been able to upsell audit services to 80% of our existing clients.",
        },
        {
            name: "Lisa Thompson",
            role: "Product Manager",
            company: "SaaS Solutions",
            image: "https://randomuser.me/api/portraits/women/65.jpg",
            rating: 5,
            text: "Integration with our existing tools was seamless. The API is well-documented and the support team is incredibly responsive.",
        },
        {
            name: "James Park",
            role: "Founder & CEO",
            company: "StartupXYZ",
            image: "https://randomuser.me/api/portraits/men/52.jpg",
            rating: 5,
            text: "As a startup, we needed enterprise-grade tools at a reasonable price. AuditAI delivered exactly that. Our conversion rate improved by 43%.",
        },
    ];

    // Split testimonials into two rows
    const topRow = testimonials.slice(0, 3);
    const bottomRow = testimonials.slice(3, 6);

    return (
        <section id="testimonials" className="py-24 bg-background overflow-hidden">
            <style>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .marquee-container-left {
          animation: marquee-left 40s linear infinite;
        }

        .marquee-container-right {
          animation: marquee-right 40s linear infinite;
        }

        .marquee-container-left:hover,
        .marquee-container-right:hover {
          animation-play-state: paused;
        }
      `}</style>

            <div className="container mx-auto px-6 mb-16">
                {/* Section Header */}
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                        Trusted by Industry Leaders
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Join thousands of companies that have transformed their digital presence with AuditAI
                    </p>
                </div>
            </div>

            {/* Top Row - Left to Right */}
            <div className="relative mb-8">
                <div className="flex marquee-container-left">
                    {/* First set */}
                    {topRow.map((testimonial, index) => (
                        <TestimonialCard
                            key={`top-first-${index}`}
                            testimonial={testimonial}
                        />
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {topRow.map((testimonial, index) => (
                        <TestimonialCard
                            key={`top-second-${index}`}
                            testimonial={testimonial}
                        />
                    ))}
                </div>
            </div>

            {/* Bottom Row - Right to Left */}
            <div className="relative">
                <div className="flex marquee-container-right">
                    {/* First set */}
                    {bottomRow.map((testimonial, index) => (
                        <TestimonialCard
                            key={`bottom-first-${index}`}
                            testimonial={testimonial}
                        />
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {bottomRow.map((testimonial, index) => (
                        <TestimonialCard
                            key={`bottom-second-${index}`}
                            testimonial={testimonial}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

interface TestimonialCardProps {
    testimonial: {
        name: string;
        role: string;
        company: string;
        image: string;
        rating: number;
        text: string;
    };
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
    return (
        <div className="flex-shrink-0 w-[400px] mx-4">
            <div className="bg-card border border-slate-200 rounded-xl p-8 h-full relative">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10">
                    <Quote className="h-12 w-12 text-primary" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                            key={i}
                            className="h-5 w-5 fill-gold text-gold"
                        />
                    ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-slate-600 leading-relaxed mb-6 relative z-10">
                    "{testimonial.text}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                    <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                        <div className="font-semibold text-navy">{testimonial.name}</div>
                        <div className="text-sm text-slate-500">
                            {testimonial.role} at {testimonial.company}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsSection;
