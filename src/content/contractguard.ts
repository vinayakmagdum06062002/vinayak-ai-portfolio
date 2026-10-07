/**
 * ContractGuard AI — CONCEPT / CURRENTLY BUILDING.
 * This describes a target design. It is not deployed and has no users.
 * The UI must always render it with a concept label.
 */
export const contractGuard = {
  name: "ContractGuard AI",
  subtitle: "Enterprise Vendor Contract Intelligence & Compliance Platform",
  status: "Concept · Currently Building",
  disclaimer:
    "ContractGuard is a concept I am currently building to demonstrate end-to-end enterprise AI architecture. It is not deployed and has no customers. Everything below is target design.",
  pitch:
    "A multi-tenant SaaS platform that uses Agentic RAG to analyse vendor contracts, obligations, policies, compliance requirements, renewals, risks and workflows — with every answer tied to evidence and every action gated by a human.",
  capabilities: [
    { title: "Obligation tracking", body: "Extract obligations, owners and deadlines from contracts into structured records." },
    { title: "Renewal & risk radar", body: "Surface upcoming renewals, auto-renew clauses and risk terms before they bite." },
    { title: "Policy compliance checks", body: "Compare contract terms against internal policies and flag deviations with citations." },
    { title: "Evidence-cited answers", body: "Ask questions across the contract estate; every claim links to the clause it came from." },
    { title: "Approval workflows", body: "Agent-proposed actions route through human approval with a full audit trail." },
    { title: "Tenant isolation", body: "Strict per-tenant separation of documents, embeddings, data and audit logs." },
  ],
  systemFlow: [
    { id: "user", label: "User", detail: "Legal, procurement & compliance teams" },
    { id: "nextjs", label: "Next.js", detail: "TypeScript web app, tenant-aware UI" },
    { id: "api", label: "API Gateway", detail: "AuthN, rate limits, tenant resolution" },
    { id: "fastapi", label: "FastAPI", detail: "Service layer, Pydantic contracts" },
    { id: "orchestration", label: "AI Orchestration", detail: "Agents, prompts, tools, guardrails" },
    { id: "rag", label: "Agentic RAG", detail: "Plan → retrieve → reason → verify" },
    { id: "retrieval", label: "Hybrid Retrieval", detail: "Vector + keyword search, reranking" },
    { id: "postgres", label: "PostgreSQL", detail: "Contracts, obligations, vectors, audit" },
    { id: "redis", label: "Redis", detail: "Caching, sessions, queue broker" },
    { id: "docs", label: "Document Processing", detail: "Ingestion, OCR-ready parsing, chunking" },
    { id: "workflow", label: "Workflow Engine", detail: "Renewals, approvals, notifications" },
    { id: "cloud", label: "Cloud Infrastructure", detail: "Containers, IaC, CI/CD, observability" },
  ],
  agentFlow: [
    { id: "question", label: "User question", detail: "“Which vendor contracts auto-renew next quarter without a termination notice on file?”" },
    { id: "supervisor", label: "Supervisor agent", detail: "Classifies intent and owns the run end-to-end." },
    { id: "planning", label: "Planning", detail: "Decomposes the question into retrieval, SQL and tool sub-tasks." },
    { id: "tools", label: "Retrieval · SQL · Tools", detail: "Hybrid search over clauses, SQL over obligations, calendar and policy tools." },
    { id: "evidence", label: "Evidence aggregation", detail: "Collects clauses, rows and tool outputs with source references." },
    { id: "reasoning", label: "Reasoning", detail: "Synthesises an answer strictly from the gathered evidence." },
    { id: "verification", label: "Verification", detail: "Checks each claim against its citation; unsupported claims are dropped." },
    { id: "response", label: "Response / workflow", detail: "Cited answer, or a proposed action such as a renewal task." },
    { id: "approval", label: "Human approval", detail: "No side-effecting action runs without explicit sign-off." },
  ],
  principles: [
    "Evidence before eloquence — unverifiable claims are removed, not softened.",
    "Agents propose, humans approve — side effects are always gated.",
    "Tenant isolation at every layer — data, vectors, cache keys and logs.",
    "Evaluation as a release gate — retrieval and answer quality are measured, not assumed.",
  ],
} as const;
