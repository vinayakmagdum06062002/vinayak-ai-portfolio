import type { KnowledgeEntry } from "@/content/types";

/**
 * A small, dependency-free lexical retriever (BM25-style) used by the
 * "Ask My AI" demo. It retrieves from a curated knowledge base and never
 * generates text — answers are only ever returned verbatim from sources.
 */

const STOPWORDS = new Set(
  "a an and are as at be by can could do does for from has have how i in is it its me my of on or tell the this to was what when where which who why will with you your about give explain".split(
    " ",
  ),
);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/[\s-]+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t))
    .map(stem);
}

/** Very light stemming so "agents"/"agent" and "scoring"/"score" meet. */
function stem(token: string): string {
  if (token.length > 5 && token.endsWith("ing")) return token.slice(0, -3);
  if (token.length > 4 && token.endsWith("es")) return token.slice(0, -2);
  if (token.length > 3 && token.endsWith("s")) return token.slice(0, -1);
  return token;
}

interface IndexedDoc {
  entry: KnowledgeEntry;
  tf: Map<string, number>;
  length: number;
}

export interface RetrievalHit {
  entry: KnowledgeEntry;
  score: number;
}

export interface RetrievalResult {
  hits: RetrievalHit[];
  queryTokens: string[];
}

const FIELD_WEIGHTS = { keywords: 3, title: 2, answer: 1 } as const;
const K1 = 1.2;
const B = 0.75;
/** Below this score we refuse to answer rather than guess. */
export const MIN_SCORE = 1.5;

export function buildIndex(entries: KnowledgeEntry[]) {
  const docs: IndexedDoc[] = entries.map((entry) => {
    const tf = new Map<string, number>();
    const add = (text: string, weight: number) => {
      for (const t of tokenize(text)) tf.set(t, (tf.get(t) ?? 0) + weight);
    };
    add(entry.keywords.join(" "), FIELD_WEIGHTS.keywords);
    add(entry.title, FIELD_WEIGHTS.title);
    add(entry.answer, FIELD_WEIGHTS.answer);
    const length = [...tf.values()].reduce((a, b) => a + b, 0);
    return { entry, tf, length };
  });

  const avgLength = docs.reduce((a, d) => a + d.length, 0) / Math.max(docs.length, 1);
  const df = new Map<string, number>();
  for (const d of docs) for (const t of d.tf.keys()) df.set(t, (df.get(t) ?? 0) + 1);

  const idf = (t: string) => {
    const n = df.get(t) ?? 0;
    return Math.log(1 + (docs.length - n + 0.5) / (n + 0.5));
  };

  return function search(query: string, k = 3): RetrievalResult {
    const queryTokens = [...new Set(tokenize(query))];
    const hits = docs
      .map((d) => {
        let score = 0;
        for (const t of queryTokens) {
          const f = d.tf.get(t);
          if (!f) continue;
          score += idf(t) * ((f * (K1 + 1)) / (f + K1 * (1 - B + (B * d.length) / avgLength)));
        }
        return { entry: d.entry, score };
      })
      .filter((h) => h.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, k);
    return { hits, queryTokens };
  };
}
