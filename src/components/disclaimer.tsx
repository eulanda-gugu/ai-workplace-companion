import { Info } from "lucide-react";

export function Disclaimer() {
  return (
    <div className="border-t border-border bg-muted/40 px-4 py-2.5 text-xs text-muted-foreground">
      <div className="mx-auto flex max-w-6xl items-start gap-2">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <p className="leading-relaxed">
          AI-generated content may contain inaccuracies or incomplete information. Users should review and verify all
          AI-generated responses before using them for professional, academic, legal, financial, or medical purposes.
          Do not enter confidential or sensitive information into the application.
        </p>
      </div>
    </div>
  );
}
