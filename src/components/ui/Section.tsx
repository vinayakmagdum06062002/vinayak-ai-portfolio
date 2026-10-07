import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionProps {
  id: string;
  index?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
  className?: string;
  headAside?: ReactNode;
}

/** Standard section shell: anchored landmark, numbered eyebrow, heading and lead. */
export function Section({ id, index, eyebrow, title, lead, children, className, headAside }: SectionProps) {
  const headingId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={headingId} className={["section", className].filter(Boolean).join(" ")}>
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">
            {index ? <span className="eyebrow-index">{index}</span> : null}
            {eyebrow}
          </p>
          <h2 id={headingId} className="h2">
            {title}
          </h2>
          {lead ? <p className="lead">{lead}</p> : null}
          {headAside}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
