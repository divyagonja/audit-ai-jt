import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ReactNode } from "react";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    className?: string;
}

export const SectionHeader = ({ title, subtitle, className = "" }: SectionHeaderProps) => {
    const titleRef = useScrollAnimation({ threshold: 0.3 });
    const subtitleRef = useScrollAnimation({ threshold: 0.3 });

    return (
        <div className={`text-center mb-16 ${className}`}>
            <h2
                ref={titleRef}
                className="text-3xl md:text-4xl font-bold text-navy mb-4 scroll-animate"
            >
                {title}
            </h2>
            {subtitle && (
                <p
                    ref={subtitleRef}
                    className="text-lg text-slate-600 max-w-2xl mx-auto scroll-animate"
                    style={{ transitionDelay: '0.1s' }}
                >
                    {subtitle}
                </p>
            )}
        </div>
    );
};

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    animation?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale';
}

export const ScrollReveal = ({
    children,
    className = "",
    delay = 0,
    animation = 'slide-up'
}: ScrollRevealProps) => {
    const ref = useScrollAnimation({ threshold: 0.2 });

    const animationClass = {
        'fade': 'scroll-animate',
        'slide-up': 'scroll-animate',
        'slide-left': 'scroll-animate-left',
        'slide-right': 'scroll-animate-right',
        'scale': 'scroll-animate-scale'
    }[animation];

    return (
        <div
            ref={ref}
            className={`${animationClass} ${className}`}
            style={{ transitionDelay: `${delay}s` }}
        >
            {children}
        </div>
    );
};
