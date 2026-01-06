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
  const strokeWidth = size === "sm" ? 3 : size === "md" ? 5 : 6;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColorTheme = (score: number) => {
    if (score >= 80) return {
      text: "text-emerald-400",
      glow: "shadow-[0_0_20px_rgba(52,211,153,0.3)]",
      stop1: "#34d399",
      stop2: "#059669",
      bgLayer: "bg-emerald-500/5"
    };
    if (score >= 60) return {
      text: "text-amber-400",
      glow: "shadow-[0_0_20px_rgba(251,191,36,0.2)]",
      stop1: "#fbbf24",
      stop2: "#d97706",
      bgLayer: "bg-amber-500/5"
    };
    return {
      text: "text-red-400",
      glow: "shadow-[0_0_20px_rgba(248,113,113,0.3)]",
      stop1: "#f87171",
      stop2: "#dc2626",
      bgLayer: "bg-red-500/5"
    };
  };

  const theme = getColorTheme(score);

  const dimensions = {
    sm: { wrapper: "w-16 h-16", text: "text-base xl:text-lg", labelSize: "text-[7px]" },
    md: { wrapper: "w-28 h-28", text: "text-3xl", labelSize: "text-[8px]" },
    lg: { wrapper: "w-44 h-44", text: "text-5xl", labelSize: "text-[10px]" },
  };

  const gradId = `neural-grad-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className={cn(
      "relative flex items-center justify-center rounded-full transition-all duration-700",
      "bg-slate-950/40 backdrop-blur-xl border border-white/10 shadow-2xl",
      theme.glow,
      dimensions[size].wrapper
    )}>
      {/* Background Neural Glow */}
      <div className={cn("absolute inset-2 rounded-full blur-xl opacity-20", theme.bgLayer)} />

      <svg className="absolute inset-0 w-full h-full -rotate-90 group-hover:scale-105 transition-transform duration-700">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme.stop1} />
            <stop offset="100%" stopColor={theme.stop2} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Track */}
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth={strokeWidth}
        />

        {/* Progress */}
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
          className="transition-all duration-1000 ease-in-out"
          filter="url(#glow)"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center">
          <span className={cn(
            "font-black tracking-tighter transition-all duration-500",
            theme.text,
            dimensions[size].text
          )}>
            {showCountUp ? <CountUp end={score} /> : score}
          </span>
          {label && (
            <span className={cn(
              "uppercase tracking-[0.15em] font-black text-slate-500 opacity-80",
              dimensions[size].labelSize
            )}>
              {label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScoreCircle;

