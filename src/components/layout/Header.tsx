"use client";

import { useEffect, useRef, useState } from "react";
import { navItems } from "@/lib/site";
import { profile } from "@/content/profile";
import styles from "./Header.module.css";

export function Header() {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Scroll spy: highlight the section currently in view.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0 || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: close on Escape, lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header className={`${styles.header} ${scrolled || open ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.brand} aria-label={`${profile.name} — back to top`}>
          <span className={styles.mark} aria-hidden="true">
            VM
          </span>
          <span className={styles.brandText}>
            <span className={styles.brandName}>{profile.name}</span>
            <span className={styles.brandRole}>AI Systems Engineer</span>
          </span>
        </a>

        <nav aria-label="Primary" className={styles.nav}>
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={styles.link}
                  aria-current={active === item.id ? "location" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#contact" className={styles.cta}>
          Contact
        </a>

        <button
          ref={menuButtonRef}
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className={`${styles.burger} ${open ? styles.burgerOpen : ""}`} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <div id="mobile-nav" className={`${styles.mobile} ${open ? styles.mobileOpen : ""}`} hidden={!open}>
        <nav aria-label="Mobile" className="container">
          <ul>
            {navItems.map((item, i) => (
              <li key={item.id} style={{ transitionDelay: `${i * 30}ms` }}>
                <a href={`#${item.id}`} onClick={() => setOpen(false)}>
                  <span className="mono dim">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" onClick={() => setOpen(false)}>
                <span className="mono dim">{String(navItems.length + 1).padStart(2, "0")}</span>
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
