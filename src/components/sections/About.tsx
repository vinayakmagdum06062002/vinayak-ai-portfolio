import { principles, profile } from "@/content/profile";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./About.module.css";

const LAYERS = ["AI", "Backend", "Frontend", "Data", "Infrastructure", "Security", "Observability", "Testing", "CI/CD"];

export function About() {
  return (
    <Section
      id="about"
      index="01"
      eyebrow="About · Engineering philosophy"
      title={
        <>
          Calling an LLM is easy.
          <span className="dim"> Making it a dependable part of a product is the job.</span>
        </>
      }
    >
      <div className={styles.grid}>
        <Reveal className={styles.bio}>
          <p className="lead">{profile.headline}</p>
          <p className="muted">
            I&apos;m an AI/ML Engineer at Shework, where I&apos;ve built and shipped a suite of AI systems: candidate
            sourcing, JD generation, resume and JD parsing, candidate fit scoring, interview question generation and
            answer evaluation. My background is an MSc in Data Science and Analytics from Cardiff University and a BSc
            in Computer Science from MIT-WPU.
          </p>
          <p className="muted">
            I think in systems: what comes in, what the contract is, what happens when the model is wrong, how we know
            it&apos;s working, and how the rest of the product integrates with it.
          </p>

          <div className={styles.layers} aria-label="Layers of a production AI product">
            <p className="label">What a production AI product actually spans</p>
            <ul>
              {LAYERS.map((layer, i) => (
                <li key={layer}>
                  {i > 0 ? (
                    <span className={styles.plus} aria-hidden="true">
                      +
                    </span>
                  ) : null}
                  {layer}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <ol className={styles.principles}>
          {principles.map((p, i) => (
            <Reveal as="li" key={p.title} className={styles.principle} delay={i * 70}>
              <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={styles.pTitle}>{p.title}</h3>
              <p className={styles.pBody}>{p.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
