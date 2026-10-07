"use client";

import { useEffect, useRef, useState } from "react";
import { contractGuard } from "@/content/contractguard";
import { useTabKeyboard } from "@/lib/useTabKeyboard";
import styles from "./CurrentlyBuilding.module.css";

type View = "system" | "agent";

const VIEWS: { id: View; label: string }[] = [
  { id: "system", label: "System architecture" },
  { id: "agent", label: "Agentic RAG flow" },
];

/** Groups the linear system flow into architectural tiers for the diagram. */
const TIERS: { name: string; ids: string[] }[] = [
  { name: "Client", ids: ["user", "nextjs"] },
  { name: "Edge & API", ids: ["api", "fastapi"] },
  { name: "Intelligence", ids: ["orchestration", "rag", "retrieval"] },
  { name: "Data & processing", ids: ["postgres", "redis", "docs", "workflow"] },
  { name: "Foundation", ids: ["cloud"] },
];

export function ContractGuardDiagrams() {
  const [view, setView] = useState<View>("system");
  const { setRef, onKeyDown } = useTabKeyboard(VIEWS.length, (i) => setView(VIEWS[i]?.id ?? "system"), "horizontal");

  return (
    <div className={styles.diagramCard}>
      <div className={styles.diagramBar}>
        <div role="tablist" aria-label="ContractGuard diagrams" className={styles.segmented}>
          {VIEWS.map((v, i) => (
            <button
              key={v.id}
              ref={setRef(i)}
              id={`cg-tab-${v.id}`}
              type="button"
              role="tab"
              aria-selected={view === v.id}
              aria-controls={`cg-panel-${v.id}`}
              tabIndex={view === v.id ? 0 : -1}
              onClick={() => setView(v.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              {v.label}
            </button>
          ))}
        </div>
        <span className={styles.targetTag}>Target design · not deployed</span>
      </div>

      <div id={`cg-panel-${view}`} role="tabpanel" aria-labelledby={`cg-tab-${view}`} className={styles.diagramBody}>
        {view === "system" ? <SystemDiagram /> : <AgentFlow />}
      </div>
    </div>
  );
}

function SystemDiagram() {
  const nodes = contractGuard.systemFlow;
  const [selected, setSelected] = useState<string>("rag");
  const current = nodes.find((n) => n.id === selected);

  return (
    <div className={styles.system}>
      <ol className={styles.tiers} aria-label="ContractGuard system architecture, top to bottom">
        {TIERS.map((tier) => (
          <li key={tier.name} className={styles.tier}>
            <span className={styles.tierName}>{tier.name}</span>
            <ul className={styles.tierNodes} data-count={tier.ids.length}>
              {tier.ids.map((id) => {
                const node = nodes.find((n) => n.id === id);
                if (!node) return null;
                const isSelected = node.id === selected;
                return (
                  <li key={node.id}>
                    <button
                      type="button"
                      className={styles.node}
                      aria-pressed={isSelected}
                      onClick={() => setSelected(node.id)}
                    >
                      <span className={styles.nodeLabel}>{node.label}</span>
                      <span className={styles.nodeDetail}>{node.detail}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>
      <div className={styles.inspector} aria-live="polite">
        <p className="label">Selected component</p>
        <p className={styles.inspectorTitle}>{current?.label}</p>
        <p className={styles.inspectorBody}>{current?.detail}</p>
        <p className={styles.inspectorPath}>
          {nodes.map((n, i) => (
            <span key={n.id} className={n.id === selected ? styles.pathActive : undefined}>
              {n.label}
              {i < nodes.length - 1 ? <span aria-hidden="true"> → </span> : null}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

const STEP_MS = 1300;

function AgentFlow() {
  const steps = contractGuard.agentFlow;
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!playing) return;
    timer.current = window.setTimeout(() => {
      if (active >= steps.length - 1) setPlaying(false);
      else setActive((a) => a + 1);
    }, STEP_MS);
    return () => window.clearTimeout(timer.current);
  }, [playing, active, steps.length]);

  const play = () => {
    if (active >= steps.length - 1) setActive(0);
    setPlaying(true);
  };

  const step = steps[active];

  return (
    <div className={styles.agent}>
      <div className={styles.agentControls}>
        <button type="button" className={styles.playButton} onClick={playing ? () => setPlaying(false) : play}>
          <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
          {playing ? "Pause" : active > 0 ? "Replay run" : "Run the flow"}
        </button>
        <span className="dim mono" aria-live="polite">
          Step {active + 1} / {steps.length}
        </span>
      </div>

      <div className={styles.agentGrid}>
        <ol className={styles.agentSteps} aria-label="Agentic RAG flow steps">
          {steps.map((s, i) => {
            const state = i < active ? styles.done : i === active ? styles.current : "";
            return (
              <li key={s.id}>
                <button
                  type="button"
                  className={`${styles.agentStep} ${state} ${s.id === "approval" ? styles.human : ""}`}
                  aria-current={i === active ? "step" : undefined}
                  onClick={() => {
                    setPlaying(false);
                    setActive(i);
                  }}
                >
                  <span className={styles.agentDot} aria-hidden="true" />
                  <span className={styles.agentLabel}>{s.label}</span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className={styles.agentDetail} aria-live="polite">
          <p className="label">
            {String(active + 1).padStart(2, "0")} · {step?.label}
          </p>
          <p className={styles.agentText}>{step?.detail}</p>
          {step?.id === "approval" ? (
            <p className={styles.agentCallout}>Agents propose. Humans approve. Every decision is audit-logged.</p>
          ) : null}
          {step?.id === "verification" ? (
            <p className={styles.agentCallout}>Unsupported claims are removed — not softened.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
