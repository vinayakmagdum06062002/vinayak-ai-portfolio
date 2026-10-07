import { Section } from "@/components/ui/Section";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Reveal } from "@/components/ui/Reveal";
import { ApproachPipeline } from "./ApproachPipeline";

export function Approach() {
  return (
    <Section
      id="approach"
      index="08"
      eyebrow="AI engineering approach"
      title={
        <>
          Production AI is everything
          <span className="dim"> around the model call.</span>
        </>
      }
      lead="A demo is input → LLM → output. A product needs every stage below. Select a stage — or trace a request through all of them — to see why it exists and where I've applied it."
    >
      <Reveal>
        <ErrorBoundary name="approach pipeline">
          <ApproachPipeline />
        </ErrorBoundary>
      </Reveal>
    </Section>
  );
}
