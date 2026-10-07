"use client";

import { useState } from "react";
import { architectureLayers } from "@/content/architecture";
import type { ArchitectureLayer } from "@/content/types";
import { ProvenanceBadge } from "@/components/ui/Badge";
import styles from "./Architecture.module.css";

const STACK_IDS = ["frontend", "api", "ai", "data", "async", "infra"];
const CROSS_IDS = ["observability", "security"];

const byId = (id: string) => architectureLayers.find((l) => l.id === id);

export function ArchitectureExplorer() {
  const [selectedId, setSelectedId] = useState("ai");
  const selected = byId(selectedId) ?? architectureLayers[0];

  const stack = STACK_IDS.map(byId).filter((l): l is ArchitectureLayer => Boolean(l));
  const cross = CROSS_IDS.map(byId).filter((l): l is ArchitectureLayer => Boolean(l));

  return (
    <div className={styles.wrap}>
      <div className={styles.diagram} role="group" aria-label="Architecture layers. Select a layer for details.">
        <ol className={styles.stack}>
          {stack.map((layer, i) => (
            <li key={layer.id}>
              <button
                type="button"
                className={styles.layer}
                aria-pressed={layer.id === selectedId}
                aria-controls="architecture-detail"
                onClick={() => setSelectedId(layer.id)}
              >
                <span className={styles.layerIndex}>L{i + 1}</span>
                <span className={styles.layerName}>{layer.name}</span>
                <span className={styles.layerTagline}>{layer.tagline}</span>
              </button>
            </li>
          ))}
        </ol>
        <ul className={styles.cross} aria-label="Cross-cutting concerns">
          {cross.map((layer) => (
            <li key={layer.id}>
              <button
                type="button"
                className={styles.crossLayer}
                aria-pressed={layer.id === selectedId}
                aria-controls="architecture-detail"
                onClick={() => setSelectedId(layer.id)}
              >
                <span className={styles.crossName}>{layer.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selected ? <LayerDetail layer={selected} /> : null}
    </div>
  );
}

function LayerDetail({ layer }: { layer: ArchitectureLayer }) {
  return (
    <article id="architecture-detail" className={styles.detail} aria-live="polite" key={layer.id}>
      <header className={styles.detailHead}>
        <p className="label">Layer</p>
        <h3 className={styles.detailTitle}>{layer.name}</h3>
        <ul className="kbd-list" aria-label="Technologies">
          {layer.technologies.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
      </header>

      <div className={styles.detailGrid}>
        <div>
          <p className="label">Responsibilities</p>
          <ul className="bullet-list">
            {layer.responsibilities.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label">Design decisions</p>
          <ul className="bullet-list">
            {layer.decisions.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.evidence}>
        <div className={styles.evidenceCol}>
          <ProvenanceBadge provenance="shipped" label="Proven in shipped work" size="sm" />
          <ul>
            {layer.shippedEvidence.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
        <div className={styles.evidenceCol}>
          <ProvenanceBadge provenance="building" label="Target design only" size="sm" />
          <ul>
            {layer.targetOnly.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
