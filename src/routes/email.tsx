import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { AIToolShell } from "@/components/ai-tool-shell";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Workplace AI" },
      { name: "description", content: "Generate professional emails with AI." },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  return (
    <AIToolShell
      title="Smart Email Generator"
      description="Describe what you need — audience, purpose, tone — and get a polished draft."
      icon={<Mail className="h-6 w-6" />}
      inputLabel="Describe the email you need"
      inputPlaceholder="e.g. Polite follow-up to a client who hasn't responded to my proposal in two weeks. Friendly but professional tone."
      systemPrompt="You are an expert professional email writer. Write clear, concise, well-structured emails with an appropriate subject line, greeting, body, and sign-off. Match the tone the user requests. Output the full email including 'Subject:' line."
    />
  );
}
