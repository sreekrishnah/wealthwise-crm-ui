import { useState, useRef, useEffect } from "react";
import { X, Maximize2, Minimize2, Send, Sparkles, Bot, User, Loader2 } from "lucide-react";
import { useAppStore } from "@/store/app-store";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types/wealth";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

const quickQueries = [
  "Show high risk clients",
  "Reviews due this week",
  "Top AUM clients",
  "Compliance overdue",
];

export function AIChatWidget() {
  const { chatOpen, toggleChat, chatExpanded, toggleChatExpanded } = useAppStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize session
  useEffect(() => {
    if (chatOpen && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: "Hello! I'm your Wealth Intelligence AI. I have access to your CRM data. How can I help you today?",
          timestamp: new Date(),
        },
      ]);
    }
  }, [chatOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1"}/chat/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ message: text, sessionId }),
      });

      if (!response.ok) {
        throw new Error("Failed to connect to AI server");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let assistantContent = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const data = JSON.parse(line.replace("data: ", ""));
                if (data.type === "message") {
                  assistantContent = data.content;
                  setSessionId(data.sessionId);
                }
              } catch (e) {
                // Ignore parsing errors for control messages like "done"
              }
            }
          }
        }

        const assistantMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: assistantContent || "I processed your request but had trouble generating a textual response.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      }
    } catch (error: any) {
      toast.error("AI Assistant is currently unavailable.");
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I'm having trouble connecting to my brain. Please check if the backend is running and you have a valid AI key.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!chatOpen) {
    return (
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-2xl bg-primary shadow-lg shadow-primary/25 flex items-center justify-center hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 active:scale-95 z-50 animate-scale-in"
      >
        <Sparkles className="w-5 h-5 text-primary-foreground" />
      </button>
    );
  }

  return (
    <div
      className={cn(
        "fixed z-50 glass-chat rounded-2xl flex flex-col transition-all duration-300 animate-scale-in overflow-hidden border border-border/40 shadow-2xl",
        chatExpanded
          ? "inset-4"
          : "bottom-6 right-6 w-[420px] h-[550px]"
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-background/50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">WealthIntelligence AI</p>
            <p className="text-[11px] text-muted-foreground flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Connected to CRM
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={toggleChatExpanded} className="p-2 rounded-lg hover:bg-muted/60 transition-colors">
            {chatExpanded ? <Minimize2 className="w-4 h-4 text-muted-foreground" /> : <Maximize2 className="w-4 h-4 text-muted-foreground" />}
          </button>
          <button onClick={toggleChat} className="p-2 rounded-lg hover:bg-muted/60 transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex gap-2.5", msg.role === "user" && "flex-row-reverse animate-in fade-in slide-in-from-right-2")}>
            <div className={cn(
              "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
              msg.role === "assistant" ? "bg-primary/10" : "bg-primary"
            )}>
              {msg.role === "assistant" ? <Bot className="w-3.5 h-3.5 text-primary" /> : <User className="w-3.5 h-3.5 text-primary-foreground" />}
            </div>
            <div className={cn(
              "max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm",
              msg.role === "assistant"
                ? "bg-muted/60 text-foreground rounded-tl-md border border-border/30"
                : "bg-primary text-primary-foreground rounded-tr-md"
            )}>
              <div className="prose prose-p:my-0 prose-sm dark:prose-invert max-w-none">
                {msg.role === "assistant" ? (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                ) : (
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                )}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2.5 animate-pulse">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bot className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="bg-muted/60 px-4 py-3 rounded-2xl rounded-tl-md border border-border/30">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {messages.length <= 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-1.5">
          {quickQueries.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-muted/60 hover:bg-primary/10 hover:text-primary border border-border/40 transition-all active:scale-95"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <div className="p-3 bg-background/50 border-t border-border/50">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex items-center gap-2 bg-muted/40 rounded-xl px-3 py-1 border border-border/20 focus-within:border-primary/50 transition-colors"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            placeholder="Ask about clients, risk, compliance…"
            className="flex-1 bg-transparent text-sm py-2 outline-none placeholder:text-muted-foreground/60 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-30 hover:bg-primary/90 transition-all active:scale-95 shadow-sm"
          >
            {isTyping ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
          </button>
        </form>
      </div>
    </div>
  );
}
