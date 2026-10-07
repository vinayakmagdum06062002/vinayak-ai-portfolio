import { systems } from "@/content/systems";
import type { CaseStudy } from "@/content/types";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ProvenanceBadge } from "@/components/ui/Badge";
import { HashDetailsOpener } from "./HashDetailsOpener";
import styles from "./CaseStudies.module.css";

const STAGES: { key: keyof CaseStudy; label: string }[] = [
  { key: "problem", label: "Problem" },
  { key: "architecture", label: "Architecture" },
  { key: "aiApproach", label: "AI approach" },
  { key: "engineering", label: "Engineering" },
  { key: "reliability", label: "Reliability" },
  { key: "testing", label: "Testing" },
  { key: "result", label: "Result / status" },
];

export function CaseStudies() {
  return (
    <Section
      id="case-studies"
      index="07"
      eyebrow="Case studies"
      title="From problem to shipped system."
      lead="Each case study follows the same path a real build does — problem, architecture, AI approach, engineering, reliability, testing and result. Everything here is from delivered work; no metrics are estimated."
    >
      <HashDetailsOpener prefix="case-" />
      <div className={styles.list}>
        {systems.map((s, i) => (
          <Reveal key={s.id} delay={i * 40}>
            <details id={`case-${s.id}`} className={styles.item} name="case-study">
              <summary className={styles.summary}>
                <span className={styles.index}>{s.index}</span>
                <span className={styles.titleWrap}>
                  <span className={styles.title}>{s.name}</span>
                  <span className={styles.teaser}>{s.summary}</span>
                </span>
                <span className={styles.badge}>
                  <ProvenanceBadge provenance={s.provenance} size="sm" />
                </span>
                <span className={styles.toggle} aria-hidden="true" />
              </summary>

              <div className={styles.body}>
                <ol className={styles.stages}>
                  {STAGES.map((stage, si) => (
                    <li key={stage.key} className={styles.stage}>
                      <span className={styles.stageRail} aria-hidden="true">
                        <span className={styles.stageDot} />
                      </span>
                      <div className={styles.stageContent}>
                        <p className={styles.stageLabel}>
                          <span className="mono dim">{String(si + 1).padStart(2, "0")}</span> {stage.label}
                        </p>
                        <p className={styles.stageText}>{s.caseStudy[stage.key]}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <aside className={styles.aside}>
                  <p className="label">Stack</p>
                  <ul className="kbd-list">
                    {s.tags.map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                  </ul>
                  {s.facts ? (
                    <>
                      <p className="label">From the CV</p>
                      <dl className={styles.facts}>
                        {s.facts.map((f) => (
                          <div key={f.label}>
                            <dt>{f.value}</dt>
                            <dd>{f.label}</dd>
                          </div>
                        ))}
                      </dl>
                    </>
                  ) : null}
                  <p className="label">Context</p>
                  <p className={styles.context}>{s.context}</p>
                </aside>
              </div>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
