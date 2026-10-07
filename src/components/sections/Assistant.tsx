"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import {
  ask,
  assistantMode,
  MAX_QUESTION_LENGTH,
  preloadAssistant,
  validateQuestion,
  type AssistantAnswer,
} from "@/lib/assistant";
import styles from "./Assistant.module.css";

const SUGGESTIONS = [
  "How do you make LLM output reliable?",
  "What is Agentic RAG in your design?",
  "Tell me about the candidate sourcing engine",
  "How do you approach enterprise AI architecture?",
  "What is ContractGuard AI?",
];

type Message =
  | { id: number; role: "user"; text: string }
  | ({ id: number; role: "assistant" } & AssistantAnswer)
  | { id: number; role: "error"; text: string };

const MODE_LABEL = {
  demo: "Retrieved · local knowledge base",
  live: "Live backend",
  fallback: "Live backend unavailable · answered from local knowledge base",
} as const;

export function Assistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [trace, setTrace] = useState<AssistantAnswer["trace"] | null>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);
  const inputId = useId();
  const errorId = useId();

  // Warm the lazily-loaded index once the assistant approaches the viewport.
  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          preloadAssistant();
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // Keep the thread scrolled to the latest message without moving the page.
  useEffect(() => {
    const thread = threadRef.current;
    if (thread) thread.scrollTo({ top: thread.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  const submit = async (raw: string) => {
    if (pending) return;
    const result = validateQuestion(raw);
    if (!result.ok) {
      setValidationError(result.error);
      return;
    }
    setValidationError(null);
    setInput("");
    setMessages((m) => [...m, { id: nextId.current++, role: "user", text: result.value }]);
    setPending(true);
    try {
      const answer = await ask(result.value);
      setMessages((m) => [...m, { id: nextId.current++, role: "assistant", ...answer }]);
      setTrace(answer.trace ?? null);
    } catch {
      setMessages((m) => [
        ...m,
        { id: nextId.current++, role: "error", text: "The knowledge base failed to load. Check your connection and try again." },
      ]);
    } finally {
      setPending(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void submit(input);
  };

  const reset = () => {
    setMessages([]);
    setTrace(null);
    setValidationError(null);
  };

  return (
    <div ref={rootRef} className={styles.shell}>
      <div className={styles.chat}>
        <div className={styles.bar}>
          <span className={styles.barTitle}>
            <span className={styles.liveDot} aria-hidden="true" />
            portfolio-assistant
          </span>
          <span className={styles.modeTag}>{assistantMode === "live" ? "Live backend" : "Demo mode · no LLM"}</span>
          {messages.length > 0 ? (
            <button type="button" className={styles.reset} onClick={reset}>
              Clear
            </button>
          ) : null}
        </div>

        <div ref={threadRef} className={styles.thread} role="log" aria-live="polite" aria-relevant="additions" aria-busy={pending}>
          {messages.length === 0 ? (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>Ask about projects, Agentic RAG, LLM reliability or enterprise AI.</p>
              <p className={styles.emptyBody}>
                This is a portfolio demonstration. It does not call a language model — it retrieves pre-written answers
                from a curated knowledge base and shows its sources.
              </p>
            </div>
          ) : (
            messages.map((m) => <MessageBubble key={m.id} message={m} />)
          )}
          {pending ? (
            <div className={styles.pending} role="status">
              <span className={styles.pendingDots} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              Retrieving…
            </div>
          ) : null}
        </div>

        <div className={styles.suggestions} aria-label="Suggested questions">
          {SUGGESTIONS.map((q) => (
            <button key={q} type="button" className={styles.suggestion} onClick={() => void submit(q)} disabled={pending}>
              {q}
            </button>
          ))}
        </div>

        <form className={styles.form} onSubmit={onSubmit} noValidate>
          <label htmlFor={inputId} className="sr-only">
            Ask a question about Vinayak&apos;s work
          </label>
          <input
            id={inputId}
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (validationError) setValidationError(null);
            }}
            placeholder="Ask a question…"
            maxLength={MAX_QUESTION_LENGTH + 50}
            autoComplete="off"
            aria-invalid={validationError ? true : undefined}
            aria-describedby={validationError ? errorId : undefined}
            className={styles.input}
          />
          <button type="submit" className={styles.send} disabled={pending}>
            Ask
          </button>
          {validationError ? (
            <p id={errorId} className={styles.validation} role="alert">
              {validationError}
            </p>
          ) : null}
        </form>
      </div>

      <aside className={styles.trace} aria-label="Retrieval trace">
        <p className="label">Retrieval trace</p>
        {trace ? (
          <>
            <div className={styles.traceBlock}>
              <p className={styles.traceKey}>query tokens</p>
              <p className={styles.tokens}>
                {trace.queryTokens.length > 0
                  ? trace.queryTokens.map((t) => (
                      <span key={t} className={styles.token}>
                        {t}
                      </span>
                    ))
                  : "—"}
              </p>
            </div>
            <div className={styles.traceBlock}>
              <p className={styles.traceKey}>top-k candidates</p>
              {trace.hits.length > 0 ? (
                <ol className={styles.hits}>
                  {trace.hits.map((h, i) => {
                    const max = trace.hits[0]?.score ?? 1;
                    return (
                      <li key={h.title}>
                        <span className={styles.hitTitle}>
                          {i + 1}. {h.title}
                        </span>
                        <span className={styles.hitScore}>{h.score.toFixed(2)}</span>
                        <span className={styles.hitBar} aria-hidden="true">
                          <span style={{ width: `${Math.max(6, (h.score / max) * 100)}%` }} />
                        </span>
                      </li>
                    );
                  })}
                </ol>
              ) : (
                <p className={styles.traceEmpty}>No matching documents.</p>
              )}
            </div>
          </>
        ) : (
          <p className={styles.traceEmpty}>Ask a question to see how it is matched against the knowledge base.</p>
        )}
        <ul className={styles.traceNotes}>
          <li>Lexical BM25-style scoring over keywords, titles and answers</li>
          <li>Below a minimum score, the assistant declines instead of guessing</li>
          <li>Knowledge base is loaded lazily as its own bundle</li>
        </ul>
      </aside>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  if (message.role === "user") {
    return (
      <div className={`${styles.msg} ${styles.user}`}>
        <span className="sr-only">You asked:</span>
        {message.text}
      </div>
    );
  }
  if (message.role === "error") {
    return (
      <div className={`${styles.msg} ${styles.error}`} role="alert">
        {message.text}
      </div>
    );
  }
  return (
    <div className={`${styles.msg} ${styles.assistant} ${message.kind === "refusal" ? styles.refusal : ""}`}>
      <span className="sr-only">Assistant answered:</span>
      <p>{message.text}</p>
      <p className={styles.meta}>
        <span>{message.kind === "refusal" ? "Declined · no grounded match" : MODE_LABEL[message.mode]}</span>
        {message.sources.map((s) => (
          <span key={s} className={styles.source}>
            Source: {s}
          </span>
        ))}
      </p>
    </div>
  );
}
