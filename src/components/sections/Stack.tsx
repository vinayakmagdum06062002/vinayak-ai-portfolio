import { Section } from "@/components/ui/Section";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Reveal } from "@/components/ui/Reveal";
import { StackMap } from "./StackMap";

export function Stack() {
  return (
    <Section
      id="stack"
      index="06"
      eyebrow="Technical stack"
      title="A stack map, not a logo wall."
      lead="Only technologies listed in my CV. Pick a technology to see which shipped system it was used in."
    >
      <Reveal>
        <ErrorBoundary name="stack map">
          <StackMap />
        </ErrorBoundary>
      </Reveal>
    </Section>
  );
}
