import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initTouchPress } from "./lib/touch-press";

initTouchPress();

document.addEventListener("contextmenu", (e) => {
  if ((e.target as HTMLElement).tagName === "IMG") e.preventDefault();
});

// WebMCP: expose portfolio tools to AI agents via the browser (navigator.modelContext)
// https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
if ("modelContext" in navigator) {
  (navigator as unknown as { modelContext: { provideContext: (ctx: unknown) => void } })
    .modelContext.provideContext({
      tools: [
        {
          name: "get-profile",
          description:
            "Get Israt Jahan Khan's academic profile: bio, research interests, publications, experience, education, awards, and contact links.",
          inputSchema: { type: "object", properties: {}, required: [] },
          async execute() {
            const res = await fetch("/llms.txt");
            return { text: await res.text() };
          },
        },
        {
          name: "get-full-content",
          description:
            "Get the complete portfolio content including all publications with summaries, projects, full experience, education, and awards.",
          inputSchema: { type: "object", properties: {}, required: [] },
          async execute() {
            const res = await fetch("/llms-full.txt");
            return { text: await res.text() };
          },
        },
      ],
    });
}

createRoot(document.getElementById("root")!).render(<App />);
