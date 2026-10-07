import type { RetrievalHit } from "./retrieval";

export type AnswerMode = "demo" | "live" | "fallback";

export interface AssistantAnswer {
  kind: "answer" | "refusal";
  text: string;
  sources: string[];
  mode: AnswerMode;
  /** Retrieval details for the trace panel (local retrieval only). */
  trace?: { queryTokens: string[]; hits: { title: string; score: number }[] };
}

export const MAX_QUESTION_LENGTH = 300;

const ENDPOINT = process.env.NEXT_PUBLIC_ASSISTANT_ENDPOINT?.trim() || "";
const TIMEOUT_MS = 12_000;

export const assistantMode: "demo" | "live" = ENDPOINT ? "live" : "demo";

export function validateQuestion(raw: string): { ok: true; value: string } | { ok: false; error: string } {
  const value = raw.trim().replace(/\s+/g, " ");
  if (value.length === 0) return { ok: false, error: "Type a question first." };
  if (value.length < 3) return { ok: false, error: "That's a little short — try a full question." };
  if (value.length > MAX_QUESTION_LENGTH) {
    return { ok: false, error: `Keep questions under ${MAX_QUESTION_LENGTH} characters.` };
  }
  return { ok: true, value };
}

type Search = (query: string, k?: number) => { hits: RetrievalHit[]; queryTokens: string[] };
let searchPromise: Promise<{ search: Search; minScore: number }> | null = null;

/** Lazily loads the knowledge base and builds the index once (separate JS chunk). */
function loadSearch() {
  if (!searchPromise) {
    searchPromise = Promise.all([import("@/content/assistant-kb"), import("./retrieval")])
      .then(([kb, retrieval]) => ({
        search: retrieval.buildIndex(kb.knowledgeBase),
        minScore: retrieval.MIN_SCORE,
      }))
      .catch((err: unknown) => {
        searchPromise = null; // allow a retry on the next question
        throw err;
      });
  }
  return searchPromise;
}

/** Warm the index (e.g. when the section scrolls into view). */
export function preloadAssistant() {
  void loadSearch().catch(() => undefined);
}

async function answerLocally(question: string, mode: AnswerMode): Promise<AssistantAnswer> {
  const { search, minScore } = await loadSearch();
  const { hits, queryTokens } = search(question, 3);
  const trace = { queryTokens, hits: hits.map((h) => ({ title: h.entry.title, score: h.score })) };
  const top = hits[0];

  if (!top || top.score < minScore) {
    return {
      kind: "refusal",
      text: "I don't have a grounded answer for that. This demo only answers from its knowledge base about Vinayak's work, engineering approach and projects — rather than guessing, it declines.",
      sources: [],
      mode,
      trace,
    };
  }

  return { kind: "answer", text: top.entry.answer, sources: [top.entry.source], mode, trace };
}

async function answerLive(question: string): Promise<AssistantAnswer> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Assistant endpoint returned ${res.status}`);
    const data: unknown = await res.json();
    if (!isLiveResponse(data)) throw new Error("Assistant endpoint returned an invalid payload");
    return { kind: "answer", text: data.answer, sources: data.sources ?? [], mode: "live" };
  } finally {
    clearTimeout(timer);
  }
}

function isLiveResponse(data: unknown): data is { answer: string; sources?: string[] } {
  if (typeof data !== "object" || data === null) return false;
  const d = data as Record<string, unknown>;
  if (typeof d.answer !== "string" || d.answer.length === 0) return false;
  if (d.sources !== undefined && !(Array.isArray(d.sources) && d.sources.every((s) => typeof s === "string"))) {
    return false;
  }
  return true;
}

/**
 * Answers a question. With a configured endpoint, tries it first and degrades
 * gracefully to local retrieval on any failure (timeout, HTTP error, bad schema).
 */
export async function ask(question: string): Promise<AssistantAnswer> {
  if (ENDPOINT) {
    try {
      return await answerLive(question);
    } catch {
      return answerLocally(question, "fallback");
    }
  }
  return answerLocally(question, "demo");
}
