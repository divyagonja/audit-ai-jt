import React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface SpotlightBackgroundProps {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
}

const SpotlightBackground = ({
    children,
    className = "",
    spotlightColor = "rgba(59, 130, 246, 0.15)"
}: SpotlightBackgroundProps) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <section
            onMouseMove={handleMouseMove}
            className={`relative overflow-hidden group ${className}`}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300 z-10"
                style={{
                    background: `radial-gradient(600px circle at ${springX}px ${springY}px, ${spotlightColor}, transparent 80%)`,
                }}
            />
            {children}
        </section>
    );
};

export default SpotlightBackground;
