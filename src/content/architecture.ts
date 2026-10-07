import type { ArchitectureLayer } from "./types";

/**
 * Reference architecture for production AI products.
 * `shippedEvidence` cites CV-backed work; `targetOnly` lists parts that exist
 * only in the ContractGuard concept / target design.
 */
export const architectureLayers: ArchitectureLayer[] = [
  {
    id: "frontend",
    name: "Frontend",
    tagline: "Next.js · React · TypeScript",
    technologies: ["Next.js", "React", "TypeScript"],
    responsibilities: [
      "Tenant-aware UI for documents, answers and approvals",
      "Streaming responses with visible citations",
      "Accessible, responsive interfaces for review workflows",
    ],
    decisions: [
      "The UI consumes stable JSON contracts — AI internals can change without UI rewrites",
      "Every AI answer renders its evidence alongside it",
    ],
    shippedEvidence: ["Stateless JSON contract designed for portal integration (Shework)", "Streamlit interfaces for AI tools"],
    targetOnly: ["Next.js / React / TypeScript application (ContractGuard)"],
  },
  {
    id: "api",
    name: "API & Application",
    tagline: "FastAPI · REST · Service layer",
    technologies: ["FastAPI", "REST APIs", "Pydantic", "Service layer"],
    responsibilities: [
      "Request validation and typed contracts at the boundary",
      "Business logic in a service layer, separate from transport",
      "Orchestrating AI pipelines behind clean endpoints",
    ],
    decisions: [
      "Pipelines are UI-independent modules with explicit inputs and outputs",
      "Pydantic models are the single definition of every contract",
    ],
    shippedEvidence: [
      "FastAPI service-layer development",
      "REST API integration",
      "Modular, UI-independent processing pipelines",
    ],
    targetOnly: ["API gateway with tenant resolution"],
  },
  {
    id: "ai",
    name: "AI",
    tagline: "LLMs · Agentic RAG · Retrieval · Evaluation",
    technologies: ["LLMs", "Agentic RAG", "Embeddings", "Hybrid search", "Reranking", "Tool calling", "Evaluation"],
    responsibilities: [
      "Structured generation with validated outputs",
      "Retrieval that grounds answers in source content",
      "Agent planning, tool use and verification",
      "Measuring quality before release",
    ],
    decisions: [
      "Model output is a proposal until it passes schema validation and guardrails",
      "Retrieval quality is tuned independently from generation",
      "Agents may propose actions; humans approve them",
    ],
    shippedEvidence: [
      "Google Gemini and Groq LLM integrations",
      "RAG with FAISS + MiniLM embeddings",
      "Structured outputs, schema enforcement, prompt versioning",
    ],
    targetOnly: ["Agentic RAG supervisor", "Hybrid search + reranking", "Tool calling", "Offline evaluation harness"],
  },
  {
    id: "data",
    name: "Data",
    tagline: "PostgreSQL · Redis · Object storage",
    technologies: ["PostgreSQL", "Redis", "Object storage", "Vector index"],
    responsibilities: [
      "System of record for documents, obligations and audit trails",
      "Vector storage for semantic retrieval",
      "Caching and short-lived state",
    ],
    decisions: [
      "Every row and vector is tenant-scoped",
      "Raw documents live in object storage; derived text and embeddings are reproducible",
    ],
    shippedEvidence: ["FAISS vector index", "Multi-format document intelligence layer", "Excel reporting automation (openpyxl)"],
    targetOnly: ["PostgreSQL", "Redis", "Object storage"],
  },
  {
    id: "async",
    name: "Async Processing",
    tagline: "Celery · Queues · Workers",
    technologies: ["Celery", "Task queues", "Workers"],
    responsibilities: [
      "Document ingestion and embedding off the request path",
      "Bulk AI jobs with bounded concurrency",
      "Scheduled checks such as renewal reminders",
    ],
    decisions: [
      "Long-running AI work is never done inside a request",
      "Concurrency is bounded to respect provider rate limits",
    ],
    shippedEvidence: ["Concurrent processing with ThreadPoolExecutor (3 resumes in parallel)", "Bulk fit-scoring mode"],
    targetOnly: ["Celery workers and queues"],
  },
  {
    id: "infra",
    name: "Infrastructure",
    tagline: "Docker · Cloud · IaC · CI/CD",
    technologies: ["Docker", "Cloud", "Infrastructure as Code", "CI/CD"],
    responsibilities: [
      "Reproducible environments from laptop to production",
      "Automated test and deploy pipelines",
      "Declarative, reviewable infrastructure",
    ],
    decisions: ["Tests — including recorded-fixture LLM tests — gate every deploy", "Infrastructure changes go through code review like application code"],
    shippedEvidence: ["Git-based workflow", "pytest suites suitable for CI gating"],
    targetOnly: ["Docker", "Cloud deployment", "Infrastructure as Code", "CI/CD pipelines"],
  },
  {
    id: "observability",
    name: "Observability",
    tagline: "Logs · Metrics · Tracing · AI telemetry",
    technologies: ["Structured logs", "Metrics", "Tracing", "AI telemetry"],
    responsibilities: [
      "Per-stage latency and failure visibility",
      "Token, cost and retry telemetry for model calls",
      "Traces that follow a request through agents and tools",
    ],
    decisions: ["Instrument stages, not just endpoints", "Classify errors so alerts are actionable"],
    shippedEvidence: ["structlog structured logging", "8-stage performance instrumentation", "Error classification"],
    targetOnly: ["Distributed tracing", "Metrics dashboards", "AI telemetry"],
  },
  {
    id: "security",
    name: "Security",
    tagline: "AuthN · RBAC · Tenant isolation · Audit",
    technologies: ["Authentication", "Authorization", "RBAC", "Tenant isolation", "Audit logs", "AI security"],
    responsibilities: [
      "Identity, roles and least-privilege access",
      "Hard tenant boundaries across data and retrieval",
      "Audit trails for every AI-proposed and human-approved action",
      "Defending against prompt injection and data leakage",
    ],
    decisions: [
      "Retrieval filters by tenant before similarity, never after",
      "Tool permissions are scoped per role; agents inherit the user's access, nothing more",
    ],
    shippedEvidence: ["Schema validation on all model output", "Grounded generation over a curated knowledge base"],
    targetOnly: ["Authentication & RBAC", "Tenant isolation", "Audit logs", "AI security controls"],
  },
];
