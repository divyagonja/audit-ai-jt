import {
    ShoppingCart,
    Rocket,
    Building2,
    Briefcase,
    TrendingUp,
    Users
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const UseCasesSection = () => {
    const useCases = [
        {
            icon: ShoppingCart,
            title: "E-Commerce",
            description: "Optimize product pages, improve site speed, and boost conversion rates.",
            benefits: [
                "Increase product visibility in search",
                "Reduce cart abandonment rates",
                "Improve mobile shopping experience",
                "Track revenue impact per fix"
            ],
            stats: "Average 43% increase in organic sales"
        },
        {
            icon: Rocket,
            title: "SaaS Companies",
            description: "Enhance landing pages, improve user onboarding, and drive signups.",
            benefits: [
                "Optimize conversion funnels",
                "Improve page load speeds",
                "Fix technical SEO issues",
                "A/B test recommendations"
            ],
            stats: "Average 67% boost in trial signups"
        },
        {
            icon: Building2,
            title: "Enterprise",
            description: "Manage multiple sites, ensure compliance, and maintain brand consistency.",
            benefits: [
                "Multi-site management dashboard",
                "WCAG accessibility compliance",
                "Custom security protocols",
                "Dedicated account management"
            ],
            stats: "Manage 100+ sites from one platform"
        },
        {
            icon: Briefcase,
            title: "Agencies",
            description: "White-label reports, client management, and scalable auditing solutions.",
            benefits: [
                "Branded client reports",
                "Bulk audit capabilities",
                "Client portal access",
                "Reseller pricing available"
            ],
            stats: "Save 40+ hours per month on audits"
        },
        {
            icon: TrendingUp,
            title: "Marketing Teams",
            description: "Data-driven insights, campaign optimization, and performance tracking.",
            benefits: [
                "Track campaign landing pages",
                "Monitor competitor performance",
                "Automated reporting",
                "Integration with analytics tools"
            ],
            stats: "Improve campaign ROI by 156%"
        },
        {
            icon: Users,
            title: "Content Publishers",
            description: "Maximize content reach, improve readability, and boost engagement.",
            benefits: [
                "Content SEO optimization",
                "Core Web Vitals monitoring",
                "Schema markup suggestions",
                "Social sharing optimization"
            ],
            stats: "Increase organic traffic by 234%"
        }
    ];

    return (
        <section id="use-cases" className="py-24 bg-background">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                        Built for Every Industry
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Whether you're in e-commerce, SaaS, or enterprise, AuditAI adapts to your specific needs
                    </p>
                </div>

                {/* Use Cases Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {useCases.map((useCase, index) => (
                        <UseCaseCard
                            key={index}
                            useCase={useCase}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

interface UseCaseCardProps {
    useCase: {
        icon: any;
        title: string;
        description: string;
        benefits: string[];
        stats: string;
    };
    index: number;
}

const UseCaseCard = ({ useCase, index }: UseCaseCardProps) => {
    const ref = useScrollAnimation({ threshold: 0.2 });

    return (
        <div
            ref={ref}
            className="bg-card border border-slate-200 rounded-xl p-8 card-hover scroll-animate-scale group"
            style={{ transitionDelay: `${index * 0.1}s` }}
        >
            {/* Icon */}
            <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <useCase.icon className="h-7 w-7 text-primary" />
            </div>

            {/* Title & Description */}
            <h3 className="text-xl font-semibold text-navy mb-3">
                {useCase.title}
            </h3>
            <p className="text-slate-600 mb-6">
                {useCase.description}
            </p>

            {/* Benefits List */}
            <ul className="space-y-2 mb-6">
                {useCase.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="text-success mt-1">✓</span>
                        <span>{benefit}</span>
                    </li>
                ))}
            </ul>

            {/* Stats Badge */}
            <div className="pt-4 border-t border-slate-200">
                <div className="inline-flex items-center gap-2 bg-primary/5 text-primary text-sm font-semibold px-3 py-1.5 rounded-full">
                    <TrendingUp className="h-4 w-4" />
                    {useCase.stats}
                </div>
            </div>
        </div>
    );
};

export default UseCasesSection;
