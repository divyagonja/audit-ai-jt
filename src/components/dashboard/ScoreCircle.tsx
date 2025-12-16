import { cn } from "@/lib/utils";

interface ScoreCircleProps {
  score: number;
  size?: "sm" | "md" | "lg";
  label?: string;
}

const ScoreCircle = ({ score, size = "md", label }: ScoreCircleProps) => {
  const radius = size === "sm" ? 28 : size === "md" ? 45 : 60;
  const strokeWidth = size === "sm" ? 4 : size === "md" ? 6 : 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (score: number) => {
    if (score >= 80) return "text-success stroke-success";
    if (score >= 60) return "text-warning stroke-warning";
    return "text-danger stroke-danger";
  };

  const dimensions = {
    sm: { wrapper: "w-16 h-16", text: "text-lg" },
    md: { wrapper: "w-28 h-28", text: "text-3xl" },
    lg: { wrapper: "w-36 h-36", text: "text-4xl" },
  };

  return (
    <div className={cn("relative flex items-center justify-center", dimensions[size].wrapper)}>
      <svg className="w-full h-full -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-200"
        />
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn("transition-all duration-1000 ease-out", getColor(score))}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("font-bold", dimensions[size].text, getColor(score).split(" ")[0])}>
          {score}
        </span>
        {label && <span className="text-xs text-slate-500">{label}</span>}
      </div>
    </div>
  );
};

export default ScoreCircle;
