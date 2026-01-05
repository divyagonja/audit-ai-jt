import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const PricingFAQ = () => {
    const faqs = [
        {
            question: "Which plan is right for me?",
            answer: "If you're a freelancer or small business with one website, the **Professional** plan is ideal. For agencies and growing teams managing multiple client sites, the **Business** plan offers the best value. Large organizations needing custom integrations and dedicated support should choose **Enterprise**.",
        },
        {
            question: "Can I change plans later?",
            answer: "Yes, absolutely! You can upgrade or downgrade your plan at any time from your dashboard. If you upgrade, the change is instant. If you downgrade, it will take effect at the end of your current billing cycle.",
        },
        {
            question: "What happens if I exceed my audit limit?",
            answer: "We'll notify you when you're close to your limit. You can choose to upgrade your plan for more capacity or wait for your monthly cycle to reset. We never shut off your account without warning.",
        },
        {
            question: "Do you offer discounts for non-profits?",
            answer: "Yes, we love supporting non-profits and educational institutions! Contact our sales team with proof of your 501(c)(3) status (or local equivalent) to receive a 50% discount on all plans.",
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. For Enterprise plans, we can also support annual invoicing and wire transfers.",
        },
        {
            question: "Is there a long-term contract?",
            answer: "No, our standard plans are month-to-month. You can cancel at any time. However, if you choose annual billing, you commit to one year upfront in exchange for a 20% discount.",
        },
    ];

    return (
        <section className="py-24 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-navy mb-4">
                        Pricing FAQs
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Common questions about billing, plans, and subscriptions.
                    </p>
                </div>

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
                className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40" : "max-h-0"
                    }`}
            >
                <div className="px-6 pb-5 text-slate-600 leading-relaxed text-sm">
                    {faq.answer}
                </div>
            </div>
        </div>
    );
};

export default PricingFAQ;
