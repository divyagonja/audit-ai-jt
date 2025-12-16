import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Send, Sparkles } from "lucide-react";

const AIAnalysis = () => {
  const [query, setQuery] = useState("");
  
  return (
    <div className="min-h-screen">
      <DashboardHeader title="AI Analysis" subtitle="Get AI-powered insights about your website" />
      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-card border border-slate-200 rounded-xl p-8 text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
            <Brain className="h-8 w-8 text-gold" />
          </div>
          <h2 className="text-2xl font-bold text-navy mb-2">AI-Powered Website Intelligence</h2>
          <p className="text-slate-600 mb-6">Ask questions about your audits, get recommendations, and discover insights</p>
          
          <div className="relative">
            <Textarea
              placeholder="Ask about your website performance, SEO improvements, or get personalized recommendations..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-32 pr-16"
            />
            <Button className="absolute bottom-3 right-3 gap-2" disabled={!query}>
              <Send className="h-4 w-4" /> Ask AI
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {["How can I improve my SEO score?", "What's causing slow page loads?", "Show me critical security issues", "Compare my site to competitors"].map((suggestion, i) => (
            <button key={i} onClick={() => setQuery(suggestion)} className="p-4 bg-card border border-slate-200 rounded-lg text-left hover:border-primary transition-colors flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-gold" />
              <span className="text-slate-700">{suggestion}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;
