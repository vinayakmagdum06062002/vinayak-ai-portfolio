import type { AnchorHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
  icon?: ReactNode;
}

export function ButtonLink({ variant = "primary", children, icon, className, ...rest }: ButtonLinkProps) {
  return (
    <a className={[styles.button, styles[variant], className].filter(Boolean).join(" ")} {...rest}>
      <span>{children}</span>
      {icon ? <span className={styles.icon}>{icon}</span> : null}
    </a>
  );
}

export function ArrowIcon({ direction = "right" }: { direction?: "right" | "down" | "up-right" }) {
  const rotate = direction === "down" ? 90 : direction === "up-right" ? -45 : 0;
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
