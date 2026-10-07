import type { CapabilityGroup } from "./types";

/**
 * "shipped" = demonstrated in delivered work (CV).
 * "building" = being applied in the ContractGuard concept.
 */
export const capabilityGroups: CapabilityGroup[] = [
  {
    id: "ai",
    name: "AI Engineering",
    description: "Turning models into dependable product features.",
    items: [
      { name: "LLM applications", provenance: "shipped" },
      { name: "RAG", provenance: "shipped" },
      { name: "Semantic search", provenance: "shipped" },
      { name: "Embeddings", provenance: "shipped" },
      { name: "Structured outputs", provenance: "shipped" },
      { name: "Prompt engineering & versioning", provenance: "shipped" },
      { name: "AI reliability", provenance: "shipped" },
      { name: "Agentic workflows", provenance: "building" },
      { name: "AI evaluation harness", provenance: "building", note: "LLM answer evaluation is shipped; offline evaluation of AI quality is being built." },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    description: "Services and contracts that AI features plug into.",
    items: [
      { name: "Python", provenance: "shipped" },
      { name: "FastAPI", provenance: "shipped" },
      { name: "REST APIs", provenance: "shipped" },
      { name: "Service-layer architecture", provenance: "shipped" },
      { name: "Pydantic", provenance: "shipped" },
      { name: "Concurrent processing", provenance: "shipped" },
      { name: "Background jobs", provenance: "building" },
    ],
  },
  {
    id: "data",
    name: "Data",
    description: "Getting the right information to the model.",
    items: [
      { name: "Vector search (FAISS)", provenance: "shipped" },
      { name: "Document processing", provenance: "shipped" },
      { name: "Data pipelines", provenance: "shipped" },
      { name: "Entity resolution", provenance: "shipped" },
      { name: "PostgreSQL", provenance: "building" },
    ],
  },
  {
    id: "reliability",
    name: "Reliability",
    description: "Designing for the failure cases first.",
    items: [
      { name: "Schema validation", provenance: "shipped" },
      { name: "Retries", provenance: "shipped" },
      { name: "Backoff", provenance: "shipped" },
      { name: "Error classification", provenance: "shipped" },
      { name: "Graceful degradation", provenance: "shipped" },
      { name: "Instrumentation & structured logging", provenance: "shipped" },
      { name: "Tracing & AI telemetry", provenance: "building" },
    ],
  },
  {
    id: "quality",
    name: "Quality",
    description: "Proving behaviour instead of assuming it.",
    items: [
      { name: "pytest", provenance: "shipped" },
      { name: "Recorded model-response fixtures", provenance: "shipped" },
      { name: "Regression testing", provenance: "shipped" },
      { name: "Integration testing", provenance: "building" },
      { name: "AI evaluation", provenance: "building" },
    ],
  },
];
