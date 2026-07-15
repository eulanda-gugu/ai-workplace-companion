import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck } from "lucide-react";
import { AIToolShell } from "@/components/ai-tool-shell";

export const Route = createFileRoute("/task-planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Workplace AI" },
      { name: "description", content: "Generate prioritized daily or weekly schedules." },
    ],
  }),
  component: TaskPlannerPage,
});

function TaskPlannerPage() {
  return (
    <AIToolShell
      title="AI Task Planner"
      description="List your tasks and constraints. Get a prioritized schedule with productivity tips."
      icon={<CalendarCheck className="h-6 w-6" />}
      inputLabel="List your tasks, deadlines, and any constraints"
      inputPlaceholder={`e.g.
- Finish Q3 report (due Friday)
- Prepare slides for Monday's exec review
- 3 client calls this week
- Review team pull requests
- Plan for Wednesday's offsite
Available: 8h/day, avoid deep work after 4pm.`}
      systemPrompt={`You are an expert productivity coach and planner. Given a user's tasks, deadlines, and constraints, produce a clear, prioritized plan.

Output a well-structured markdown plan:

## Priorities (Urgent + Important First)
Rank tasks using the Eisenhower matrix idea (urgent/important).

## Suggested Schedule
A day-by-day or hour-by-hour breakdown depending on scope. Group deep work early. Batch similar tasks. Include short breaks.

## Productivity Tips
3-5 tailored, actionable tips for this specific workload.

Be realistic and specific.`}
      minInputHeight="min-h-[260px]"
    />
  );
}
