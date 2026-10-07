import { contractGuard } from "@/content/contractguard";
import { ProvenanceBadge } from "@/components/ui/Badge";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Reveal } from "@/components/ui/Reveal";
import { ContractGuardDiagrams } from "./ContractGuardDiagrams";
import styles from "./CurrentlyBuilding.module.css";

export function CurrentlyBuilding() {
  return (
    <section id="building" aria-labelledby="building-title" className={`section ${styles.section}`}>
      <div className={styles.glow} aria-hidden="true" />
      <div className="container">
        <Reveal className={styles.head}>
          <p className="eyebrow">
            <span className="eyebrow-index">03</span>
            Currently Building · Featured enterprise AI concept
          </p>
          <div className={styles.titleRow}>
            <h2 id="building-title" className="h2">
              {contractGuard.name}
            </h2>
            <ProvenanceBadge provenance="building" label={contractGuard.status} />
          </div>
          <p className={styles.subtitle}>{contractGuard.subtitle}</p>
          <p className="lead">{contractGuard.pitch}</p>
          <p className={styles.disclaimer} role="note">
            <span className={styles.disclaimerIcon} aria-hidden="true">
              i
            </span>
            {contractGuard.disclaimer}
          </p>
        </Reveal>

        <Reveal>
          <ErrorBoundary name="ContractGuard architecture diagram">
            <ContractGuardDiagrams />
          </ErrorBoundary>
        </Reveal>

        <div className={styles.lower}>
          <Reveal className={styles.capabilities}>
            <p className="label">Planned capabilities</p>
            <ul>
              {contractGuard.capabilities.map((c) => (
                <li key={c.title}>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className={styles.principles} delay={80}>
            <p className="label">Design principles</p>
            <ol>
              {contractGuard.principles.map((p, i) => (
                <li key={p}>
                  <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                  {p}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
