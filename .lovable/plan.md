
## AI Workplace Productivity Assistant

A no-auth, session-only SaaS-style productivity app with 5 AI tools powered by Lovable AI Gateway (Gemini 3 Flash).

### Stack
- TanStack Start (existing template)
- Tailwind + shadcn/ui components
- Lovable AI Gateway (`google/gemini-3-flash-preview`) via server functions
- No database, no auth, no persistence

### Layout
- `SidebarProvider` shell in `__root.tsx` with `AppSidebar` (Dashboard, Email, Meeting Notes, Task Planner, Research, Chatbot)
- Persistent disclaimer banner at the bottom of the main content area on every page
- Responsive: sidebar collapses to icons on mobile

### Routes
- `/` — Dashboard: welcome + 5 quick-access feature cards
- `/email` — Smart Email Generator
- `/meeting-notes` — Meeting Notes Summarizer
- `/task-planner` — AI Task Planner
- `/research` — AI Research Assistant
- `/chat` — AI Chatbot

### AI Backend
One shared server function `src/lib/ai.functions.ts`:
- `generateAI({ system, prompt })` — returns text via `generateText` from AI SDK + Lovable Gateway
- Streaming chat endpoint at `src/routes/api/chat.ts` for the chatbot using `streamText` + `useChat`

Each tool page structure:
- Input section (textarea + tool-specific fields)
- "Generate" button with loading spinner
- Editable output (textarea) with Copy + Regenerate buttons
- Tool-specific system prompts to shape output (e.g. structured markdown with sections)

### Chatbot
- `useChat` with `DefaultChatTransport({ api: "/api/chat" })`
- Renders `message.parts` with `react-markdown`
- Session-only (state resets on refresh)

### Design
- Modern SaaS palette: neutral background, single accent color, generous spacing
- Semantic tokens defined in `src/styles.css` (no hardcoded colors)
- Card-based dashboard with icons (lucide-react)
- Clean typography, subtle shadows, rounded corners

### Disclaimer
Small persistent footer/banner visible on all routes with the exact required disclaimer text.

### Files to create/modify
- `src/routes/__root.tsx` — add SidebarProvider shell, real meta (title: "AI Workplace Productivity Assistant"), disclaimer footer
- `src/routes/index.tsx` — Dashboard (replace placeholder)
- `src/routes/email.tsx`, `meeting-notes.tsx`, `task-planner.tsx`, `research.tsx`, `chat.tsx`
- `src/routes/api/chat.ts` — streaming chat endpoint
- `src/components/app-sidebar.tsx`
- `src/components/disclaimer.tsx`
- `src/components/ai-tool-shell.tsx` — reusable input/output layout
- `src/lib/ai-gateway.server.ts` — provider helper
- `src/lib/ai.functions.ts` — `generateAI` server function
- `src/styles.css` — refined tokens

### Dependencies to install
`ai`, `@ai-sdk/react`, `@ai-sdk/openai-compatible`, `react-markdown`

Lovable AI Gateway will be enabled to provide `LOVABLE_API_KEY`.
