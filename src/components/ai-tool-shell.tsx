import { useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Copy, RefreshCw, Sparkles, Check } from "lucide-react";
import { toast } from "sonner";
import { generateAI } from "@/lib/ai.functions";

interface AIToolShellProps {
  title: string;
  description: string;
  icon: ReactNode;
  inputLabel: string;
  inputPlaceholder: string;
  systemPrompt: string;
  buildPrompt?: (input: string) => string;
  extraFields?: ReactNode;
  minInputHeight?: string;
}

export function AIToolShell({
  title,
  description,
  icon,
  inputLabel,
  inputPlaceholder,
  systemPrompt,
  buildPrompt,
  minInputHeight = "min-h-[220px]",
}: AIToolShellProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const runAI = useServerFn(generateAI);

  const generate = async () => {
    if (!input.trim()) {
      toast.error("Please provide some input first.");
      return;
    }
    setLoading(true);
    try {
      const prompt = buildPrompt ? buildPrompt(input) : input;
      const res = await runAI({ data: { system: systemPrompt, prompt } });
      setOutput(res.text);
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-4 md:p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Input</CardTitle>
            <CardDescription>{inputLabel}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={inputPlaceholder}
              className={minInputHeight}
            />
            <Button onClick={generate} disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" /> Generate
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Output</CardTitle>
            <CardDescription>Editable AI response — review before use.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              placeholder="AI response will appear here..."
              className={minInputHeight}
            />
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={copy} disabled={!output}>
                {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                Copy
              </Button>
              <Button variant="outline" onClick={generate} disabled={loading || !input.trim()}>
                <RefreshCw className="mr-2 h-4 w-4" /> Regenerate
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
