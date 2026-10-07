import { Section } from "@/components/ui/Section";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Reveal } from "@/components/ui/Reveal";
import { Assistant } from "./Assistant";

export function AskAI() {
  return (
    <Section
      id="ask"
      index="10"
      eyebrow="Ask my AI · Portfolio demo"
      title="Ask about my work, approach or architecture."
      lead="A small, honest demonstration of grounded answering: questions are matched against a curated knowledge base with BM25-style retrieval, answers are returned verbatim with their source, and anything outside the knowledge base is declined rather than guessed."
    >
      <Reveal>
        <ErrorBoundary name="assistant demo">
          <Assistant />
        </ErrorBoundary>
      </Reveal>
    </Section>
  );
}
