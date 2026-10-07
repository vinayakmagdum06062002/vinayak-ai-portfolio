"use client";

import { useState } from "react";
import { systems } from "@/content/systems";
import { ProvenanceBadge } from "@/components/ui/Badge";
import { Flow } from "@/components/ui/Flow";
import { ArrowIcon } from "@/components/ui/Button";
import { useTabKeyboard } from "@/lib/useTabKeyboard";
import styles from "./Systems.module.css";

export function SystemsExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { setRef, onKeyDown } = useTabKeyboard(systems.length, setActiveIndex);
  const system = systems[activeIndex] ?? systems[0];
  if (!system) return null;

  return (
    <div className={styles.explorer}>
      <div role="tablist" aria-label="Shipped AI systems" aria-orientation="vertical" className={styles.tabs}>
        {systems.map((s, i) => {
          const selected = i === activeIndex;
          return (
            <button
              key={s.id}
              ref={setRef(i)}
              id={`system-tab-${s.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`system-panel-${s.id}`}
              tabIndex={selected ? 0 : -1}
              className={styles.tab}
              onClick={() => setActiveIndex(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              <span className={styles.tabIndex}>{s.index}</span>
              <span className={styles.tabText}>
                <span className={styles.tabName}>{s.shortName}</span>
                <span className={styles.tabTags}>{s.tags.slice(0, 2).join(" · ")}</span>
              </span>
            </button>
          );
        })}
        <p className={styles.tabsNote}>
          All five are delivered work from my role at Shework. Concept work is shown separately under{" "}
          <a href="#building">Currently Building</a>.
        </p>
      </div>

      <article
        key={system.id}
        id={`system-panel-${system.id}`}
        role="tabpanel"
        aria-labelledby={`system-tab-${system.id}`}
        tabIndex={0}
        className={`card ${styles.panel}`}
      >
        <header className={styles.panelHead}>
          <div className={styles.panelMeta}>
            <ProvenanceBadge provenance={system.provenance} />
            <span className="label">{system.context}</span>
          </div>
          <h3 className={styles.panelTitle}>{system.name}</h3>
          <p className={styles.panelSummary}>{system.summary}</p>
        </header>

        {system.facts ? (
          <dl className={styles.facts}>
            {system.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.value}</dt>
                <dd>{f.label}</dd>
              </div>
            ))}
            <p className={styles.factsNote}>Figures quoted from my CV.</p>
          </dl>
        ) : null}

        <div className={styles.block}>
          <p className="label">Architecture</p>
          <Flow steps={system.pipeline} label={`${system.name} pipeline`} minColumnWidth={128} />
        </div>

        <div className={styles.twoCol}>
          <div className={styles.block}>
            <p className="label">Problem</p>
            <p className={styles.prose}>{system.problem}</p>
          </div>
          <div className={styles.block}>
            <p className="label">System</p>
            <p className={styles.prose}>{system.system}</p>
          </div>
        </div>

        <div className={styles.twoCol}>
          <div className={styles.block}>
            <p className="label">AI components</p>
            <ul className="bullet-list">
              {system.aiComponents.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div className={styles.block}>
            <p className="label">Engineering components</p>
            <ul className="bullet-list">
              {system.engineeringComponents.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.block}>
          <p className="label">Challenges → design response</p>
          <ul className={styles.challenges}>
            {system.challenges.map((c) => (
              <li key={c.challenge}>
                <span className={styles.challenge}>{c.challenge}</span>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
                <span className={styles.response}>{c.response}</span>
              </li>
            ))}
          </ul>
        </div>

        <footer className={styles.outcome}>
          <div>
            <p className="label">Outcome / status</p>
            <p className={styles.outcomeText}>{system.status}</p>
          </div>
          <a href={`#case-${system.id}`} className={styles.caseLink}>
            Read the case study <ArrowIcon />
          </a>
        </footer>
      </article>
    </div>
  );
}
