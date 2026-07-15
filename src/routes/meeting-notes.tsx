import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { AIToolShell } from "@/components/ai-tool-shell";

export const Route = createFileRoute("/meeting-notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — Workplace AI" },
      { name: "description", content: "Summarize meetings into key points and action items." },
    ],
  }),
  component: MeetingNotesPage,
});

function MeetingNotesPage() {
  return (
    <AIToolShell
      title="Meeting Notes Summarizer"
      description="Paste raw notes or a transcript. Get a clean summary with decisions and action items."
      icon={<FileText className="h-6 w-6" />}
      inputLabel="Paste your meeting notes or transcript"
      inputPlaceholder="Paste transcript or raw notes here..."
      systemPrompt={`You are a meeting-notes summarizer. Produce a well-structured markdown summary with these sections:

## Summary
A 2-3 sentence overview.

## Key Discussion Points
Bulleted list of the main topics.

## Decisions Made
Bulleted list of concrete decisions.

## Action Items
Bulleted list. For each: **[Owner]** — task — *(Deadline: date)*.

## Deadlines
Consolidated list of dates and what's due.

Be concise and only include sections that have real content.`}
      minInputHeight="min-h-[300px]"
    />
  );
}
