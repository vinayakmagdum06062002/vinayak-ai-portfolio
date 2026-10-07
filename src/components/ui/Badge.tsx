import type { Provenance } from "@/content/types";
import styles from "./Badge.module.css";

const LABELS: Record<Provenance, string> = {
  shipped: "Shipped",
  building: "Concept · Building",
};

interface ProvenanceBadgeProps {
  provenance: Provenance;
  label?: string;
  size?: "sm" | "md";
}

/** The visual contract that separates delivered work from concepts. */
export function ProvenanceBadge({ provenance, label, size = "md" }: ProvenanceBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[provenance]} ${styles[size]}`}>
      <span className={styles.dot} aria-hidden="true" />
      {label ?? LABELS[provenance]}
    </span>
  );
}
