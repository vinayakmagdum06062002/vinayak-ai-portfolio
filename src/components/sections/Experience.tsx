import { experience } from "@/content/experience";
import { education } from "@/content/profile";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./Experience.module.css";

export function Experience() {
  return (
    <Section id="experience" index="09" eyebrow="Experience" title="Where the work was done.">
      <div className={styles.grid}>
        <ol className={styles.timeline}>
          {experience.map((job) => (
            <Reveal as="li" key={`${job.company}-${job.period}`} className={styles.job}>
              <span className={styles.node} aria-hidden="true" />
              <header className={styles.jobHead}>
                <div>
                  <h3 className={styles.role}>{job.role}</h3>
                  <p className={styles.company}>
                    {job.company} <span className="dim">· {job.location}</span>
                  </p>
                </div>
                <p className={styles.period}>
                  <span className={styles.current} aria-hidden="true" />
                  {job.period}
                </p>
              </header>
              <p className={styles.jobSummary}>{job.summary}</p>
              <ul className={styles.highlights}>
                {job.highlights.map((h) => (
                  <li key={h.area}>
                    <span className={styles.area}>{h.area}</span>
                    <span className={styles.text}>{h.text}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>

        <Reveal as="aside" className={styles.education} delay={80}>
          <p className="label">Education</p>
          <ul>
            {education.map((e) => (
              <li key={e.degree}>
                <p className={styles.degree}>{e.degree}</p>
                <p className={styles.school}>{e.school}</p>
                <p className={styles.eduPeriod}>{e.period}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
