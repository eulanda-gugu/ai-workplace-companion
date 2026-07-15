import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { AIToolShell } from "@/components/ai-tool-shell";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — Workplace AI" },
      { name: "description", content: "Summarize research topics with key insights." },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <AIToolShell
      title="AI Research Assistant"
      description="Enter a topic or paste an article. Get a structured, easy-to-scan summary."
      icon={<Search className="h-6 w-6" />}
      inputLabel="Topic or article text"
      inputPlaceholder="e.g. 'Remote work productivity best practices' — or paste an article to summarize."
      systemPrompt={`You are a research analyst. Produce a well-structured markdown briefing:

## Overview
2-3 sentence summary of the topic.

## Key Insights
Bulleted list of the most important findings or ideas.

## Advantages / Opportunities
Bulleted list.

## Challenges / Risks
Bulleted list.

## Recommendations
3-5 concrete, actionable recommendations.

Be objective and concise. If summarizing a specific article, stay faithful to its content.`}
      minInputHeight="min-h-[260px]"
    />
  );
}
