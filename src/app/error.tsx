"use client";

import { useEffect } from "react";

export default function RouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") console.error(error);
  }, [error]);

  return (
    <main id="main" className="container" style={{ minHeight: "100vh", display: "grid", placeContent: "center", gap: 20, justifyItems: "start" }}>
      <p className="eyebrow">
        <span className="eyebrow-index">Error</span> Degraded gracefully
      </p>
      <h1 className="h2">Something went wrong rendering this page.</h1>
      <p className="lead">The error has been contained. You can retry, or reach me directly at vinumagdum114@gmail.com.</p>
      <button type="button" className="chip" onClick={reset} style={{ height: 40, padding: "0 18px", fontSize: 14 }}>
        Try again
      </button>
    </main>
  );
}
