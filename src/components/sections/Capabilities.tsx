import { capabilityGroups } from "@/content/capabilities";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ProvenanceBadge } from "@/components/ui/Badge";
import styles from "./Capabilities.module.css";

export function Capabilities() {
  return (
    <Section
      id="capabilities"
      index="05"
      eyebrow="Engineering capabilities"
      title="The whole system, not just the model call."
      lead="Capabilities grouped by the layer they serve. Each is marked by where it comes from: shipped work, or the ContractGuard build."
      headAside={
        <div className={styles.legend}>
          <ProvenanceBadge provenance="shipped" label="Shipped work" size="sm" />
          <ProvenanceBadge provenance="building" label="Applying in ContractGuard" size="sm" />
        </div>
      }
    >
      <div className={styles.grid}>
        {capabilityGroups.map((group, i) => (
          <Reveal as="article" key={group.id} className={styles.group} delay={(i % 3) * 60}>
            <header className={styles.groupHead}>
              <span className={styles.groupIndex}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={styles.groupName}>{group.name}</h3>
              <p className={styles.groupDesc}>{group.description}</p>
            </header>
            <ul className={styles.items}>
              {group.items.map((item) => (
                <li key={item.name} className={styles[item.provenance]} title={item.note}>
                  <span className={styles.marker} aria-hidden="true" />
                  <span>{item.name}</span>
                  <span className="sr-only">
                    {item.provenance === "shipped" ? "(shipped work)" : "(applying in ContractGuard concept)"}
                  </span>
                  {item.note ? <span className={styles.note}>{item.note}</span> : null}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
        <Reveal as="aside" className={`${styles.group} ${styles.summary}`} delay={120}>
          <p className="label">Reading this honestly</p>
          <p>
            Everything marked <strong className={styles.shippedText}>shipped</strong> is backed by delivered work in my
            CV. Items marked <strong className={styles.buildingText}>building</strong> are being applied in ContractGuard
            and are not presented as production experience.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
