import { profile } from "@/content/profile";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.name}>
          {profile.name} <span className="dim">· AI/ML Engineer · {profile.location}</span>
        </p>
        <ul className={styles.links}>
          <li>
            <a href={`mailto:${profile.email}`}>Email</a>
          </li>
          <li>
            <a href={profile.linkedin.href} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="#top">Back to top</a>
          </li>
        </ul>
        <p className={styles.note}>
          © {year} {profile.name}. Work marked <em>Shipped</em> is delivered work from my CV. Work marked{" "}
          <em>Concept · Building</em> is in progress and not deployed.
        </p>
      </div>
    </footer>
  );
}
