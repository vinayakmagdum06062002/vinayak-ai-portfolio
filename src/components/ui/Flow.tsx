import type { PipelineStep } from "@/content/types";
import styles from "./Flow.module.css";

interface FlowProps {
  steps: readonly PipelineStep[];
  tone?: "accent" | "concept";
  /** Index of the highlighted step; steps before it render as completed. */
  activeIndex?: number;
  label: string;
  minColumnWidth?: number;
}

/** A responsive, wrapping pipeline stepper. Reads left-to-right, row by row. */
export function Flow({ steps, tone = "accent", activeIndex, label, minColumnWidth = 140 }: FlowProps) {
  return (
    <ol
      className={`${styles.flow} ${styles[tone]}`}
      aria-label={label}
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(${minColumnWidth}px, 100%), 1fr))` }}
    >
      {steps.map((step, i) => {
        const state =
          activeIndex === undefined ? "idle" : i < activeIndex ? "done" : i === activeIndex ? "active" : "pending";
        return (
          <li key={`${step.label}-${i}`} className={`${styles.step} ${styles[state]}`} aria-current={state === "active" ? "step" : undefined}>
            <span className={styles.track} aria-hidden="true">
              <span className={styles.dot} />
            </span>
            <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
            <span className={styles.label}>{step.label}</span>
            {step.detail ? <span className={styles.detail}>{step.detail}</span> : null}
          </li>
        );
      })}
    </ol>
  );
}
