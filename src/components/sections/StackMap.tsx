"use client";

import { useState } from "react";
import { stackCategories } from "@/content/stack";
import { systems } from "@/content/systems";
import { useTabKeyboard } from "@/lib/useTabKeyboard";
import styles from "./Stack.module.css";

export function StackMap() {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const category = stackCategories[categoryIndex] ?? stackCategories[0];
  const [techName, setTechName] = useState<string | null>(category?.items[0]?.name ?? null);

  const selectCategory = (i: number) => {
    setCategoryIndex(i);
    setTechName(stackCategories[i]?.items[0]?.name ?? null);
  };
  const { setRef, onKeyDown } = useTabKeyboard(stackCategories.length, selectCategory, "horizontal");

  if (!category) return null;
  const tech = category.items.find((t) => t.name === techName) ?? category.items[0];
  const usedIn = new Set(tech?.usedIn ?? []);
  const acrossSuite = usedIn.has("suite");
  const cvOnly = tech !== undefined && tech.usedIn.length === 0;

  return (
    <div className={styles.map}>
      <div role="tablist" aria-label="Stack categories" className={styles.categories}>
        {stackCategories.map((c, i) => (
          <button
            key={c.id}
            ref={setRef(i)}
            id={`stack-tab-${c.id}`}
            type="button"
            role="tab"
            aria-selected={i === categoryIndex}
            aria-controls="stack-panel"
            tabIndex={i === categoryIndex ? 0 : -1}
            className={styles.category}
            onClick={() => selectCategory(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {c.name}
            <span className={styles.count}>{c.items.length}</span>
          </button>
        ))}
      </div>

      <div id="stack-panel" role="tabpanel" aria-labelledby={`stack-tab-${category.id}`} className={styles.panel}>
        <div className={styles.techPane}>
          <p className={styles.categoryDesc}>{category.description}</p>
          <ul className={styles.techList}>
            {category.items.map((t) => (
              <li key={t.name}>
                <button
                  type="button"
                  className={styles.tech}
                  aria-pressed={t.name === tech?.name}
                  onClick={() => setTechName(t.name)}
                >
                  {t.name}
                </button>
              </li>
            ))}
          </ul>
          {category.note ? <p className={styles.note}>{category.note}</p> : null}
        </div>

        <div className={styles.usagePane} aria-live="polite">
          <p className="label">
            Where <span className={styles.techName}>{tech?.name}</span> is used
          </p>
          <ul className={styles.systems}>
            {systems.map((s) => {
              const lit = usedIn.has(s.id) || acrossSuite;
              return (
                <li key={s.id} className={lit ? styles.lit : styles.unlit}>
                  <span className={styles.sysIndex}>{s.index}</span>
                  <span>{s.shortName}</span>
                  <span className="sr-only">{lit ? "— uses this technology" : ""}</span>
                </li>
              );
            })}
          </ul>
          <p className={styles.usageNote}>
            {acrossSuite
              ? "Used across the Shework AI suite."
              : cvOnly
                ? "Listed in my CV skills; not attributed to a specific system here."
                : "Highlighted systems use this technology."}
          </p>
        </div>
      </div>
    </div>
  );
}
