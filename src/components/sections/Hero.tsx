import { profile, education } from "@/content/profile";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { HeroTrace } from "./HeroTrace";
import styles from "./Hero.module.css";

export function Hero() {
  const msc = education[0];
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.status}>
            <span className={styles.pulse} aria-hidden="true" />
            <span>AI Systems Engineer</span>
            <span className={styles.statusSep} aria-hidden="true" />
            <span className={styles.statusStack}>Python · FastAPI · LLMs · RAG</span>
          </p>

          <h1 id="hero-title" className={`h1 ${styles.title}`}>
            Vinayak
            <br />
            Magdum
          </h1>

          <p className={styles.role}>
            <span className={styles.roleTitle}>{profile.role}</span>
            <span className={styles.roleFocus}>{profile.focus.join(" • ")}</span>
          </p>

          <p className={`lead ${styles.statement}`}>{profile.statement}</p>

          <div className={styles.ctas}>
            <ButtonLink href="#systems" icon={<ArrowIcon direction="down" />}>
              View AI Systems
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary" icon={<ArrowIcon />}>
              Let&apos;s Build Something
            </ButtonLink>
          </div>

          <dl className={styles.facts}>
            <div>
              <dt>Currently</dt>
              <dd>
                {profile.currentRole.title}, {profile.currentRole.company}
              </dd>
            </div>
            <div>
              <dt>Education</dt>
              <dd>
                MSc Data Science, {msc.school}
              </dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>{profile.location}</dd>
            </div>
          </dl>
        </div>

        <div className={styles.visual}>
          <HeroTrace />
        </div>
      </div>
    </section>
  );
}
