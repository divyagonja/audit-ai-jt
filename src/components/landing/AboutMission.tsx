import React from 'react';
import { Target, Users, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutMission = () => {
    const values = [
        {
            icon: Target,
            title: "Precision",
            description: "We believe in data-driven decisions. Our algorithms are fine-tuned to catch the subtlest SEO issues."
        },
        {
            icon: Users,
            title: "User-Centric",
            description: "SEO can be complex. We make it simple, accessible, and actionable for everyone."
        },
        {
            icon: Shield,
            title: "Integrity",
            description: "Transparent reporting and secure data handling are the cornerstones of our platform."
        },
        {
            icon: Zap,
            title: "Innovation",
            description: "We're constantly evolving our AI to stay ahead of search engine algorithm changes."
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6"> Our Mission </h2>
                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                            At Audit AI, we started with a simple belief: every business deserves to be seen online. The digital landscape is more competitive than ever, and SEO has become increasingly complex.
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Our mission is to bridge the gap between technical complexity and business results. We've built an AI-powered platform that doesn't just find issues, but provides the roadmap to fix them, helping you grow your organic reach and build lasting digital authority.
                        </p>
                    </div>
                    <div className="lg:w-1/2">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                                alt="Our Team Workspace"
                                className="w-full h-auto"
                            />
                            <div className="absolute inset-0 bg-blue-600/10 mix-blend-multiply" />
                        </div>
                    </div>
                </div>

                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-navy mb-4">Our Core Values</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        These principles guide everything we do, from engineering our core audit engine to supporting our customers.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-all"
                        >
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-primary">
                                <value.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-navy mb-3">{value.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutMission;
