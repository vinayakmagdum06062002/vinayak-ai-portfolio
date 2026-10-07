import { profile } from "@/content/profile";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CopyEmailButton } from "./CopyEmailButton";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className={`section ${styles.section}`}>
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <Reveal className={styles.copy}>
          <p className="eyebrow">
            <span className="eyebrow-index">11</span>
            Contact
          </p>
          <h2 id="contact-title" className={styles.title}>
            Have an AI system you need built?
          </h2>
          <p className="lead">Let&apos;s turn the problem into a production-ready AI architecture.</p>
          <div className={styles.ctas}>
            <ButtonLink href={`mailto:${profile.email}?subject=AI%20system%20enquiry`} icon={<ArrowIcon />}>
              Start a conversation
            </ButtonLink>
            <ButtonLink
              href={profile.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              icon={<ArrowIcon direction="up-right" />}
            >
              Connect on LinkedIn
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal className={styles.channels} delay={80}>
          <div className={styles.channel}>
            <p className="label">Email</p>
            <div className={styles.channelRow}>
              <a href={`mailto:${profile.email}`} className={styles.channelValue}>
                {profile.email}
              </a>
              <CopyEmailButton email={profile.email} />
            </div>
          </div>
          <div className={styles.channel}>
            <p className="label">LinkedIn</p>
            <a href={profile.linkedin.href} target="_blank" rel="noopener noreferrer" className={styles.channelValue}>
              {profile.linkedin.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <div className={styles.channel}>
            <p className="label">Location</p>
            <p className={styles.channelValue}>{profile.location}</p>
          </div>
          <div className={styles.channel}>
            <p className="label">A good first message includes</p>
            <ul className="bullet-list">
              <li>The workflow or decision you want AI to help with</li>
              <li>Where the data lives today</li>
              <li>What &ldquo;working&rdquo; would look like for your team</li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
