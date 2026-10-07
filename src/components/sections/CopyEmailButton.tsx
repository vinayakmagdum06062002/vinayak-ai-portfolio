"use client";

import { useEffect, useState } from "react";
import styles from "./Contact.module.css";

type CopyState = "idle" | "copied" | "error";

export function CopyEmailButton({ email }: { email: string }) {
  const [state, setState] = useState<CopyState>("idle");

  useEffect(() => {
    if (state === "idle") return;
    const t = window.setTimeout(() => setState("idle"), 2000);
    return () => window.clearTimeout(t);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("error");
    }
  };

  return (
    <button type="button" className={styles.copy} onClick={copy} aria-live="polite">
      {state === "copied" ? "Copied" : state === "error" ? "Copy failed" : "Copy"}
    </button>
  );
}
