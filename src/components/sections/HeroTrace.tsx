"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";

type TraceStatus = "ok" | "fail" | "retry";

interface TraceLine {
  stage: string;
  detail: string;
  status: TraceStatus;
  note: string;
}

/**
 * An illustrative trace of the reliability pattern used across the Shework AI
 * workflows. It deliberately shows a schema failure being retried, and contains
 * no timings or metrics — it is a diagram, not a log of a real run.
 */
const TRACE: TraceLine[] = [
  { stage: "input.detect", detail: "resume · magic bytes → DOCX", status: "ok", note: "ok" },
  { stage: "input.normalize", detail: "clean text extracted", status: "ok", note: "ok" },
  { stage: "request.validate", detail: "ScoreRequest (pydantic)", status: "ok", note: "ok" },
  { stage: "llm.generate", detail: "structured JSON output", status: "ok", note: "ok" },
  { stage: "schema.validate", detail: "FitScore · score: expected number", status: "fail", note: "invalid" },
  { stage: "retry.backoff", detail: "classified retryable · attempt 2", status: "retry", note: "retry" },
  { stage: "schema.validate", detail: "FitScore", status: "ok", note: "ok" },
  { stage: "guardrails.score", detail: "score within bounds", status: "ok", note: "ok" },
  { stage: "result", detail: "explainable recommendation", status: "ok", note: "done" },
];

const STEP_MS = 650;
const HOLD_MS = 3800;

export function HeroTrace() {
  const [visible, setVisible] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const inView = useRef(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => {
      inView.current = entry?.isIntersecting ?? true;
    });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    let timer: number;
    let step = 0;
    const tick = () => {
      // Pause the loop while off-screen or in a background tab.
      if (inView.current && !document.hidden) {
        step = step >= TRACE.length ? 0 : step + 1;
        setVisible(step);
      }
      const delay = step >= TRACE.length ? HOLD_MS : step === 0 ? 500 : STEP_MS;
      timer = window.setTimeout(tick, delay);
    };
    timer = window.setTimeout(tick, 500);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  const shown = reducedMotion ? TRACE.length : visible;
  const running = !reducedMotion && shown < TRACE.length;

  return (
    <figure ref={rootRef} className={styles.trace}>
      <div className={styles.traceBar}>
        <span className={styles.traceDots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={styles.traceTitle}>fit_scoring.pipeline</span>
        <span className={styles.traceTag}>illustrative</span>
      </div>

      <ol className={styles.traceBody} aria-hidden="true">
        {TRACE.map((line, i) => (
          <li
            key={`${line.stage}-${i}`}
            className={`${styles.traceLine} ${i < shown ? styles.traceLineIn : ""} ${styles[line.status]}`}
          >
            <span className={styles.traceIcon}>{line.status === "fail" ? "✕" : line.status === "retry" ? "↻" : "✓"}</span>
            <span className={styles.traceStage}>{line.stage}</span>
            <span className={styles.traceDetail}>{line.detail}</span>
            <span className={styles.traceNote}>{line.note}</span>
          </li>
        ))}
        <li className={`${styles.cursorLine} ${running ? styles.cursorOn : ""}`}>
          <span className={styles.cursor} />
        </li>
      </ol>

      <figcaption className={styles.traceCaption}>
        <span className="sr-only">
          Illustrative pipeline trace: input is detected and normalised, the request is validated, the model returns
          structured JSON, schema validation fails, the error is classified as retryable and retried with backoff,
          validation then passes, score guardrails are applied and an explainable recommendation is returned.
        </span>
        <span aria-hidden="true">
          Validate → fail → classify → retry → guard. The reliability pattern behind my LLM workflows.
        </span>
      </figcaption>
    </figure>
  );
}
