import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessagesSquare, Send, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chatbot — Workplace AI" },
      { name: "description", content: "Interactive AI workplace assistant." },
    ],
  }),
  component: ChatPage,
});

function ChatPage() {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    await sendMessage({ text });
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-8.5rem)] w-full max-w-4xl flex-col p-4 md:p-6">
      <div className="mb-4 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <MessagesSquare className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">AI Chatbot</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Ask anything about writing, planning, or research. Session-only — nothing is saved.
          </p>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto rounded-2xl border border-border bg-card p-4"
      >
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Sparkles className="h-6 w-6" />
            </div>
            <p className="mt-4 text-sm font-medium">Start a conversation</p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Try: "Help me write a status update to my team" or "Suggest a plan to prepare for a product launch."
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((m) => {
              const text = m.parts
                .map((p) => (p.type === "text" ? p.text : ""))
                .join("");
              const isUser = m.role === "user";
              return (
                <div
                  key={m.id}
                  className={cn("flex", isUser ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm",
                      isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground",
                    )}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-wrap">{text}</p>
                    ) : (
                      <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-headings:mt-3 prose-headings:mb-2">
                        <ReactMarkdown>{text}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {status === "submitted" && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-muted px-4 py-2.5 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <form onSubmit={submit} className="mt-4 flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder="Ask your workplace assistant..."
          className="min-h-[52px] resize-none"
        />
        <Button type="submit" disabled={isLoading || !input.trim()} size="lg">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  );
}
