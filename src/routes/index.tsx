import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, FileText, CalendarCheck, Search, MessagesSquare, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

const tools = [
  {
    title: "Smart Email Generator",
    description: "Draft professional emails in seconds — tone, purpose, and audience aware.",
    url: "/email",
    icon: Mail,
  },
  {
    title: "Meeting Notes Summarizer",
    description: "Turn transcripts into key points, decisions, action items, and deadlines.",
    url: "/meeting-notes",
    icon: FileText,
  },
  {
    title: "AI Task Planner",
    description: "Generate prioritized daily or weekly schedules with productivity tips.",
    url: "/task-planner",
    icon: CalendarCheck,
  },
  {
    title: "AI Research Assistant",
    description: "Summarize topics with insights, advantages, challenges, and recommendations.",
    url: "/research",
    icon: Search,
  },
  {
    title: "AI Chatbot",
    description: "An interactive workplace assistant for writing, planning, and research.",
    url: "/chat",
    icon: MessagesSquare,
  },
];

function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-6xl p-4 md:p-8">
      <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-accent/40 to-background p-6 md:p-10">
        <div className="flex items-center gap-2 text-sm font-medium text-primary">
          <Sparkles className="h-4 w-4" />
          <span>Welcome</span>
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Your AI-powered workplace assistant
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
          Automate everyday tasks — drafting emails, summarizing meetings, planning your day, and researching topics.
          Start with any tool below. No sign-in, no saved history.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight">AI Tools</h2>
        <p className="mt-1 text-sm text-muted-foreground">Quick access to every assistant.</p>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link key={tool.url} to={tool.url} className="group">
            <Card className="h-full transition-all hover:border-primary/40 hover:shadow-md">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <tool.icon className="h-5 w-5" />
                </div>
                <CardTitle className="mt-3 text-base">{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Open <ArrowRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
