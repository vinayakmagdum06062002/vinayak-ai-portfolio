import { Section } from "@/components/ui/Section";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Reveal } from "@/components/ui/Reveal";
import { SystemsExplorer } from "./Systems";

export function SelectedSystems() {
  return (
    <Section
      id="systems"
      index="02"
      eyebrow="Selected AI systems · Shipped"
      title="Five AI systems, built and shipped as working software."
      lead="Each one is a pipeline, not a prompt: sourcing, scoring, interviewing, document ingestion and retrieval — with the contracts, failure handling and tests that make them usable by a real team."
    >
      <Reveal>
        <ErrorBoundary name="systems explorer">
          <SystemsExplorer />
        </ErrorBoundary>
      </Reveal>
    </Section>
  );
}
