import { Section } from "@/components/ui/Section";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Reveal } from "@/components/ui/Reveal";
import { ArchitectureExplorer } from "./ArchitectureExplorer";

export function Architecture() {
  return (
    <Section
      id="architecture"
      index="04"
      eyebrow="Architecture · Reference design"
      title="How I architect a production AI product."
      lead="A layered reference architecture. Select a layer to see its responsibilities, the design decisions behind it, and an honest split between patterns proven in shipped work and parts that exist only in the ContractGuard target design."
    >
      <Reveal>
        <ErrorBoundary name="architecture diagram">
          <ArchitectureExplorer />
        </ErrorBoundary>
      </Reveal>
    </Section>
  );
}
