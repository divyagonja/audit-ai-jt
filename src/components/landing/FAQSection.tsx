import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const FAQSection = () => {
    const faqs = [
        {
            question: "How does the AI-powered audit work?",
            answer: "Our AI analyzes over 200 ranking factors including technical SEO, performance metrics, accessibility, and content quality. It crawls your website, compares it against best practices, and provides actionable recommendations with priority levels.",
        },
        {
            question: "How long does an audit take?",
            answer: "Most audits complete in 60 seconds or less. Larger websites with thousands of pages may take up to 5 minutes. You'll receive real-time progress updates and can access preliminary results immediately.",
        },
        {
            question: "Do I need technical knowledge to use AuditAI?",
            answer: "Not at all! Our reports are designed for both technical and non-technical users. Each issue includes plain-English explanations, visual examples, and step-by-step fix instructions. For developers, we also provide technical details and code snippets.",
        },
        {
            question: "Can I white-label the reports for my clients?",
            answer: "Yes! Business and Enterprise plans include white-label capabilities. You can customize reports with your logo, brand colors, and custom domain. Remove all AuditAI branding and present the reports as your own.",
        },
        {
            question: "What integrations do you support?",
            answer: "We integrate with 50+ tools including Jira, Slack, Salesforce, Google Analytics, Google Search Console, Asana, Trello, and more. Enterprise plans include custom integration development and dedicated API access.",
        },
        {
            question: "Is there a free trial?",
            answer: "Yes! All plans include a 14-day free trial with full access to all features. No credit card required to start. You can run up to 5 audits during your trial period to fully evaluate the platform.",
        },
        {
            question: "How is pricing calculated?",
            answer: "Pricing is based on the number of audits per month and team size. Each audit covers one complete website scan. Unused audits don't roll over, but you can upgrade anytime if you need more. Enterprise plans offer unlimited audits.",
        },
        {
            question: "What kind of support do you provide?",
            answer: "Professional plans include email support with 24-hour response time. Business plans get priority support with 4-hour response. Enterprise customers receive dedicated account management, phone support, and custom SLA guarantees.",
        },
    ];

    return (
        <section id="faq" className="py-24 bg-slate-50">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Everything you need to know about AuditAI. Can't find what you're looking for? Contact our support team.
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            faq={faq}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

interface FAQItemProps {
    faq: {
        question: string;
        answer: string;
    };
    index: number;
}

const FAQItem = ({ faq, index }: FAQItemProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useScrollAnimation({ threshold: 0.3 });

    return (
        <div
            ref={ref}
            className="bg-card border border-slate-200 rounded-xl overflow-hidden scroll-animate"
            style={{ transitionDelay: `${index * 0.05}s` }}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
            >
                <span className="font-semibold text-navy pr-8">{faq.question}</span>
                <ChevronDown
                    className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"
                    }`}
            >
                <div className="px-6 pb-5 text-slate-600 leading-relaxed">
                    {faq.answer}
                </div>
            </div>
        </div>
    );
};

export default FAQSection;
