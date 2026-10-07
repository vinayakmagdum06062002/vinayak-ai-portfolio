"use client";

import { useEffect, useState } from "react";
import { approachSteps } from "@/content/approach";
import styles from "./Approach.module.css";

const TRACE_MS = 900;

export function ApproachPipeline() {
  const [active, setActive] = useState(0);
  const [tracing, setTracing] = useState(false);

  useEffect(() => {
    if (!tracing) return;
    const t = window.setTimeout(() => {
      if (active >= approachSteps.length - 1) setTracing(false);
      else setActive((a) => a + 1);
    }, TRACE_MS);
    return () => window.clearTimeout(t);
  }, [tracing, active]);

  const startTrace = () => {
    setActive(0);
    setTracing(true);
  };

  const step = approachSteps[active];

  return (
    <div className={styles.wrap}>
      <div className={styles.naive} aria-label="A naive LLM integration">
        <span className="label">Demo</span>
        <span className={styles.naiveFlow}>
          <span>Input</span>
          <span aria-hidden="true">→</span>
          <span>LLM</span>
          <span aria-hidden="true">→</span>
          <span>Output</span>
        </span>
        <span className={styles.naiveVerdict}>Works until it doesn&apos;t.</span>
      </div>

      <div className={styles.production}>
        <div className={styles.prodHead}>
          <span className="label">Production</span>
          <button type="button" className={styles.traceButton} onClick={tracing ? () => setTracing(false) : startTrace}>
            <span aria-hidden="true">{tracing ? "❚❚" : "▶"}</span>
            {tracing ? "Stop trace" : "Trace a request"}
          </button>
        </div>

        <ol className={styles.steps}>
          {approachSteps.map((s, i) => {
            const state = i < active ? styles.passed : i === active ? styles.active : "";
            return (
              <li key={s.id} className={styles.stepItem}>
                <button
                  type="button"
                  className={`${styles.step} ${state}`}
                  aria-pressed={i === active}
                  aria-controls="approach-detail"
                  onClick={() => {
                    setTracing(false);
                    setActive(i);
                  }}
                >
                  <span className={styles.stepNum}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.stepName}>{s.name}</span>
                </button>
                {i < approachSteps.length - 1 ? (
                  <span className={`${styles.connector} ${i < active ? styles.connectorLit : ""}`} aria-hidden="true" />
                ) : null}
              </li>
            );
          })}
        </ol>

        {step ? (
          <div id="approach-detail" className={styles.detail} aria-live="polite">
            <div className={styles.detailName}>
              <span className="mono dim">{String(active + 1).padStart(2, "0")} / {approachSteps.length}</span>
              <h3>{step.name}</h3>
            </div>
            <div className={styles.detailCol}>
              <p className="label">Why it exists</p>
              <p>{step.purpose}</p>
            </div>
            <div className={styles.detailCol}>
              <p className="label">How I&apos;ve applied it</p>
              <p>{step.practice}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
