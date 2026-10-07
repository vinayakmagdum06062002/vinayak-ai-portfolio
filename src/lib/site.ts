import { profile } from "@/content/profile";

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

/** Canonical site URL. Falls back to localhost so builds never fail on a missing env var. */
export const siteUrl = (rawUrl && rawUrl.length > 0 ? rawUrl : "http://localhost:3000").replace(/\/$/, "");

export const siteConfig = {
  title: `${profile.name} — AI/ML Engineer · GenAI, Agentic AI & RAG Systems`,
  shortTitle: `${profile.name} — AI/ML Engineer`,
  description:
    "Vinayak Magdum is an AI/ML Engineer building production-grade AI systems: LLM applications, Agentic RAG, retrieval, document intelligence and reliable FastAPI backends — from AI architecture to shipped software.",
  keywords: [
    "AI/ML Engineer",
    "AI Engineer",
    "GenAI Developer",
    "Agentic AI Engineer",
    "RAG Developer",
    "LLM Engineer",
    "AI Automation Developer",
    "AI Product Engineer",
    "FastAPI",
    "Python",
    "Vinayak Magdum",
  ],
} as const;

export const navItems = [
  { id: "systems", label: "Systems" },
  { id: "building", label: "Building" },
  { id: "architecture", label: "Architecture" },
  { id: "case-studies", label: "Case studies" },
  { id: "approach", label: "Approach" },
  { id: "experience", label: "Experience" },
  { id: "ask", label: "Ask AI" },
] as const;
