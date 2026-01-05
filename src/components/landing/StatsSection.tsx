import { useEffect, useRef, useState } from "react";

const StatsSection = () => {
  const stats = [
    { value: "500,000+", label: "Audits Completed" },
    { value: "1,200+", label: "Enterprise Clients" },
    { value: "2.5M+", label: "Issues Resolved" },
    { value: "$140M+", label: "Revenue Impact" },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              value={stat.value}
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface StatItemProps {
  value: string;
  label: string;
  delay: number;
}

const StatItem = ({ value, label, delay }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Parse the numeric value from the string
  const parseValue = (val: string): number => {
    const numStr = val.replace(/[$,+]/g, "");
    if (numStr.includes("M")) {
      return parseFloat(numStr.replace("M", "")) * 1000000;
    } else if (numStr.includes("K")) {
      return parseFloat(numStr.replace("K", "")) * 1000;
    }
    return parseFloat(numStr);
  };

  // Format the number back to display format
  const formatValue = (num: number): string => {
    const originalValue = value;
    const hasPlus = originalValue.includes("+");
    const hasDollar = originalValue.includes("$");

    let formatted = "";

    if (originalValue.includes("M")) {
      formatted = (num / 1000000).toFixed(1) + "M";
    } else if (originalValue.includes("K")) {
      formatted = (num / 1000).toFixed(0) + "K";
    } else {
      formatted = num.toLocaleString();
    }

    if (hasDollar) formatted = "$" + formatted;
    if (hasPlus) formatted = formatted + "+";

    return formatted;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const targetValue = parseValue(value);
          const duration = 2000; // 2 seconds
          const steps = 60;
          const increment = targetValue / steps;
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            if (currentStep <= steps) {
              setCount(increment * currentStep);
            } else {
              setCount(targetValue);
              clearInterval(timer);
            }
          }, duration / steps);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [value, hasAnimated]);

  return (
    <div
      ref={ref}
      className="text-center animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="text-4xl md:text-5xl font-bold text-navy mb-2">
        {hasAnimated ? formatValue(count) : value}
      </div>
      <div className="text-slate-600 font-medium">{label}</div>
    </div>
  );
};

export default StatsSection;
