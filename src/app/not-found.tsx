import type { Metadata } from "next";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main" className="container" style={{ minHeight: "100vh", display: "grid", placeContent: "center", gap: 20, justifyItems: "start" }}>
      <p className="eyebrow">
        <span className="eyebrow-index">404</span> Not found
      </p>
      <h1 className="h2">This route doesn&apos;t exist.</h1>
      <p className="lead">Nothing was retrieved for this path — and nothing was made up to fill the gap.</p>
      <ButtonLink href="/" icon={<ArrowIcon />}>
        Back to the portfolio
      </ButtonLink>
    </main>
  );
}
