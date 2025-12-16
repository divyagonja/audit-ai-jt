import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: React.ReactNode;
}

const StatCard = ({ title, value, change, trend = "neutral", icon }: StatCardProps) => {
  return (
    <div className="bg-card border border-slate-200 rounded-xl p-6 shadow-sm card-hover">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">{title}</p>
          <p className="text-4xl font-bold text-navy mt-2">{value}</p>
          {change && (
            <div className={cn(
              "flex items-center gap-1 mt-2 text-sm font-medium",
              trend === "up" ? "text-success" : trend === "down" ? "text-danger" : "text-slate-600"
            )}>
              {trend === "up" && <TrendingUp className="h-4 w-4" />}
              {trend === "down" && <TrendingDown className="h-4 w-4" />}
              <span>{change}</span>
            </div>
          )}
        </div>
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
