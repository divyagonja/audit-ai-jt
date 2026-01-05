import { useState, useRef, useEffect } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Send, Sparkles, User, Bot, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import SimpleMarkdown from "@/components/ui/SimpleMarkdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AIAnalysis = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch recent audits for context
  const { data: recentAudits } = useQuery({
    queryKey: ["recent-audits-context"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data: audits } = await supabase
        .from("audits")
        .select("*, audit_issues(*)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);

      return audits;
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: query };
    setMessages((prev) => [...prev, userMessage]);
    setQuery("");
    setIsLoading(true);

    // Build audit context
    const auditContext = recentAudits?.length
      ? {
        website: recentAudits[0]?.url,
        score: recentAudits[0]?.overall_score,
        issueCount: recentAudits[0]?.audit_issues?.length || 0,
        categories: ["SEO", "Performance", "UX", "Security"],
        issues: recentAudits[0]?.audit_issues?.slice(0, 5),
      }
      : null;

    let assistantContent = "";

    try {
      const { data: { session } } = await supabase.auth.getSession();

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
          },
          body: JSON.stringify({
            messages: [...messages, userMessage],
            auditContext,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get AI response");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("No response stream");

      // Add empty assistant message
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "assistant",
                  content: assistantContent,
                };
                return updated;
              });
            }
          } catch {
            // Incomplete JSON, wait for more data
          }
        }
      }
    } catch (error) {
      console.error("AI chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : "Unknown error"}. Please try again.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "How can I improve my SEO score?",
    "What's causing slow page loads?",
    "Show me critical security issues",
    "Compare my site to competitors",
  ];

  return (
    <div className="min-h-screen text-slate-100 font-sans selection:bg-blue-500/30 flex flex-col">
      <div className="relative z-10 w-full flex-1 flex flex-col">
        <DashboardHeader
          title="AI Analysis"
          subtitle="Get AI-powered insights about your website"
        />

        <div className="flex-1 p-6 md:p-8 max-w-5xl mx-auto w-full flex flex-col h-[calc(100vh-100px)]">
          <div className="glass-card flex-1 flex flex-col rounded-3xl overflow-hidden border border-white/5 shadow-2xl animate-fade-in-up">

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth custom-scrollbar">
              {messages.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center h-full text-center p-8">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-purple-900/30 animate-pulse">
                    <Brain className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-3">
                    AI-Powered Intelligence
                  </h2>
                  <p className="text-slate-400 mb-8 max-w-md text-lg">
                    Ask deep questions about your audit data, get technical code fixes, and strategy advice.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 w-full max-w-2xl">
                    {suggestions.map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setQuery(suggestion);
                          setTimeout(() => {
                            const fakeEvent = { preventDefault: () => { } } as React.FormEvent;
                            handleSubmit(fakeEvent);
                          }, 0);
                        }}
                        className="p-4 bg-slate-800/50 border border-white/5 rounded-xl text-left hover:bg-slate-700/50 hover:border-blue-500/30 transition-all flex items-center gap-3 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                          <Sparkles className="h-4 w-4 text-blue-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <span className="text-slate-200 text-sm font-medium">{suggestion}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6 pb-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex gap-4 max-w-4xl mx-auto",
                        message.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      {message.role === "assistant" && (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Bot className="h-5 w-5 text-white" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[85%] rounded-2xl px-6 py-4 shadow-md",
                          message.role === "user"
                            ? "bg-blue-600 text-white rounded-br-sm"
                            : "bg-slate-800/80 border border-white/5 text-slate-100 rounded-bl-sm backdrop-blur-sm"
                        )}
                      >
                        <div className="prose prose-invert prose-sm max-w-none">
                          {message.content ? (
                            <SimpleMarkdown content={message.content} />
                          ) : (
                            <div className="flex items-center gap-2 text-slate-400">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span className="text-xs">Processing...</span>
                            </div>
                          )}
                        </div>
                      </div>
                      {message.role === "user" && (
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 border border-white/10">
                          <User className="h-5 w-5 text-slate-300" />
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-slate-900/50 border-t border-white/5">
              <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto">
                <Textarea
                  placeholder="Ask anything about your website..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  className="min-h-[60px] pl-6 pr-20 py-4 bg-slate-950/50 border-white/10 text-white rounded-2xl focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 resize-none shadow-inner"
                />
                <Button
                  type="submit"
                  className="absolute bottom-3 right-3 h-10 w-10 p-0 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                  disabled={!query.trim() || isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </Button>
              </form>
              <p className="text-center text-xs text-slate-600 mt-2">
                AI can make mistakes. Review generated code before implementation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;
