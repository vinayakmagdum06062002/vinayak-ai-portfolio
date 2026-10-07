import type { ApproachStep } from "./types";

export const approachSteps: ApproachStep[] = [
  {
    id: "input",
    name: "Input",
    purpose: "Real-world input is messy: wrong file types, odd encodings, missing fields.",
    practice: "Magic-byte detection and normalisation across PDF, DOCX, TXT and legacy DOC.",
  },
  {
    id: "validation",
    name: "Validation",
    purpose: "Reject or repair bad input before it costs a model call.",
    practice: "Typed request contracts with Pydantic at every service boundary.",
  },
  {
    id: "agent",
    name: "Prompt / Agent",
    purpose: "Versioned prompts or agent plans — treated as code, not strings.",
    practice: "Prompt engineering and prompt versioning across the Shework AI suite.",
  },
  {
    id: "retrieval",
    name: "Retrieval",
    purpose: "Ground the model in the right evidence instead of its memory.",
    practice: "FAISS + MiniLM top-k retrieval over a curated legal knowledge base.",
  },
  {
    id: "structured",
    name: "Structured Output",
    purpose: "Ask for data, not prose, so the rest of the system can use it.",
    practice: "Structured JSON outputs and JSON mode for scoring and interview generation.",
  },
  {
    id: "schema",
    name: "Schema Validation",
    purpose: "Model output is a proposal until it passes the contract.",
    practice: "Pydantic validation plus score and type normalisation on every response.",
  },
  {
    id: "guardrails",
    name: "Guardrails",
    purpose: "Enforce domain rules the schema alone cannot express.",
    practice: "Score guardrails on candidate fit scoring.",
  },
  {
    id: "retry",
    name: "Retry",
    purpose: "Transient failures should not become user-facing failures.",
    practice: "Retry and backoff with error classification; graceful degradation when retries run out.",
  },
  {
    id: "verification",
    name: "Verification",
    purpose: "Check that claims are supported before they are shown.",
    practice: "Grounded responses in RAG; claim-level verification is designed into the ContractGuard concept.",
  },
  {
    id: "observability",
    name: "Observability",
    purpose: "Know where time and failures go, per stage.",
    practice: "8-stage performance instrumentation and structlog structured logging.",
  },
  {
    id: "evaluation",
    name: "Evaluation",
    purpose: "Prove behaviour, and catch regressions, without a live API.",
    practice: "26-test pytest suite driven by 10 recorded model-response fixtures.",
  },
];
