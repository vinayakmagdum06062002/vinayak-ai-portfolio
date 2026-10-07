"use client";

import { useEffect } from "react";

/** Opens a <details> element whose id matches the URL hash (e.g. #case-sourcing). */
export function HashDetailsOpener({ prefix }: { prefix: string }) {
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id.startsWith(prefix)) return;
      const el = document.getElementById(id);
      if (el instanceof HTMLDetailsElement) {
        el.open = true;
        // Re-scroll after expanding so the layout shift doesn't hide the target.
        requestAnimationFrame(() => el.scrollIntoView({ block: "start" }));
      }
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, [prefix]);

  return null;
}
