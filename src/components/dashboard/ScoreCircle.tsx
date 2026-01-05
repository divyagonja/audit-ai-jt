import { cn } from "@/lib/utils";
import CountUp from "./CountUp";

interface ScoreCircleProps {
  score: number;
  size?: "sm" | "md" | "lg";
  label?: string;
  showCountUp?: boolean;
}

const ScoreCircle = ({ score, size = "md", label, showCountUp = true }: ScoreCircleProps) => {
  const radius = size === "sm" ? 28 : size === "md" ? 45 : 60;
  const strokeWidth = size === "sm" ? 4 : size === "md" ? 6 : 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColorClasses = (score: number) => {
    if (score >= 80) return "from-emerald-400 to-emerald-600 text-emerald-600";
    if (score >= 60) return "from-amber-400 to-amber-600 text-amber-600";
    return "from-red-400 to-red-600 text-red-600";
  };

  const getStrokeColor = (score: number) => {
    if (score >= 80) return "stroke-emerald-500";
    if (score >= 60) return "stroke-amber-500";
    return "stroke-red-500";
  };

  const dimensions = {
    sm: { wrapper: "w-16 h-16", text: "text-lg" },
    md: { wrapper: "w-28 h-28", text: "text-3xl" },
    lg: { wrapper: "w-44 h-44", text: "text-5xl" },
  };

  const colorClass = getColorClasses(score);
  const strokeClass = getStrokeColor(score);

  const gradId = `grad-${label?.replace(/\s+/g, '-').toLowerCase() || Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={cn("relative flex items-center justify-center p-2 rounded-full bg-white/50 backdrop-blur-sm border border-slate-100 shadow-inner", dimensions[size].wrapper)}>
      <svg className="w-full h-full -rotate-90 filter drop-shadow-sm">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: score >= 80 ? '#34d399' : score >= 60 ? '#fbbf24' : '#f87171' }} />
            <stop offset="100%" style={{ stopColor: score >= 80 ? '#059669' : score >= 60 ? '#d97706' : '#dc2626' }} />
          </linearGradient>
        </defs>
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-100 stroke-slate-50"
        />
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1500 ease-in-out"
          style={{
            transitionDelay: '200ms',
            filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.1))'
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("font-bold font-display tracking-tight", dimensions[size].text, colorClass.split(" ").pop())}>
          {showCountUp ? <CountUp end={score} /> : score}
        </span>
        {label && <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mt-1">{label}</span>}
      </div>
    </div>
  );
};

export default ScoreCircle;

