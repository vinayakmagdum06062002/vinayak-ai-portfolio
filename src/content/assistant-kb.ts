import type { KnowledgeEntry } from "./types";

/**
 * Curated knowledge base for the "Ask My AI" demo.
 * Loaded lazily (dynamic import) the first time the assistant is used.
 * Every answer is written from the CV and the content on this site.
 */
export const knowledgeBase: KnowledgeEntry[] = [
  {
    id: "overview",
    title: "Who Vinayak is",
    source: "Profile · CV",
    keywords: ["who", "about", "vinayak", "background", "summary", "introduce", "yourself", "profile", "engineer", "role", "education", "msc", "degree", "cardiff"],
    answer:
      "Vinayak is an AI/ML Engineer at Shework (since 09/2025) with an MSc in Data Science and Analytics from Cardiff University and a BSc in Computer Science from MIT-WPU. He specialises in LLM application engineering, NLP and retrieval-augmented systems, and has built and shipped a suite of AI systems covering candidate sourcing, JD generation, resume/JD parsing, fit scoring, interview question generation and answer evaluation.",
  },
  {
    id: "approach",
    title: "Engineering approach",
    source: "AI Engineering Approach",
    keywords: ["approach", "philosophy", "how", "work", "production", "principles", "think", "methodology", "build", "process"],
    answer:
      "The core idea: production AI is a system, not an API call. Input is detected and normalised, requests are validated, prompts are versioned, retrieval grounds the model, outputs are structured and schema-validated, guardrails enforce domain rules, failures are retried with backoff and degrade gracefully, and every stage is instrumented and tested — at Shework this included a 26-test pytest suite driven by 10 recorded model-response fixtures.",
  },
  {
    id: "reliability",
    title: "LLM reliability",
    source: "Experience · Shework",
    keywords: ["reliability", "reliable", "retry", "backoff", "validation", "schema", "pydantic", "guardrails", "fail", "failure", "errors", "degradation", "hallucination", "structured", "json", "robust"],
    answer:
      "Vinayak treats model output as a proposal until it passes a contract. Across Shework's AI workflows he implemented reusable reliability patterns: structured JSON outputs, schema validation with Pydantic, score/type normalisation, score guardrails, retry and backoff strategies, error classification and graceful degradation. This very assistant degrades gracefully too: if a live backend is unavailable it falls back to local retrieval.",
  },
  {
    id: "agentic-rag",
    title: "Agentic RAG",
    source: "ContractGuard AI (concept)",
    keywords: ["agentic", "agent", "agents", "supervisor", "planning", "tools", "tool", "calling", "multi-agent", "orchestration", "rag"],
    answer:
      "In Vinayak's design, Agentic RAG goes beyond 'retrieve then generate': a supervisor agent classifies the question, plans sub-tasks, calls retrieval, SQL and other tools, aggregates evidence with source references, reasons only over that evidence, verifies each claim against its citation, and then responds or proposes a workflow action — which always requires human approval. This is the target architecture of ContractGuard AI, a concept he is currently building; it is not a deployed product.",
  },
  {
    id: "rag",
    title: "RAG experience",
    source: "POSH Compliance RAG Assistant",
    keywords: ["rag", "retrieval", "faiss", "embeddings", "minilm", "vector", "semantic", "search", "chunking", "posh", "compliance", "grounded", "knowledge", "sentence-transformers", "groq"],
    answer:
      "Vinayak built a retrieval-augmented POSH compliance assistant: a curated legal knowledge base is split with recursive chunking, embedded with MiniLM (sentence-transformers), indexed in FAISS, and queried with top-k semantic retrieval so generated answers (via Groq) are grounded in retrieved source content rather than model memory.",
  },
  {
    id: "sourcing",
    title: "Candidate sourcing engine",
    source: "AI Candidate Sourcing & Intelligence Engine",
    keywords: ["sourcing", "candidate", "candidates", "linkedin", "naukri", "github", "shortlist", "ranking", "dedup", "deduplication", "fuzzy", "rapidfuzz", "recruiter", "hiring", "jd"],
    answer:
      "At Shework, Vinayak built a multi-source sourcing engine that converts a job description into a ranked shortlist using LinkedIn, Naukri and recruiter-uploaded CVs, with GitHub enrichment, fuzzy skill matching, deduplication and ranking. It was iterated across 25 documented versions based on recruiter feedback.",
  },
  {
    id: "fit-scoring",
    title: "Candidate fit scoring",
    source: "AI Candidate Fit Scoring System",
    keywords: ["fit", "scoring", "score", "match", "matching", "explainable", "bulk", "concurrent", "concurrency", "instrumentation", "performance", "threadpool"],
    answer:
      "Vinayak developed single and bulk LLM-based fit-scoring systems with explainable recommendations. Scores pass through schema validation and score guardrails; bulk mode processes 3 resumes concurrently, and the pipeline has 8-stage performance instrumentation to show where time is spent.",
  },
  {
    id: "interview",
    title: "Interview automation",
    source: "AI Interview Automation System",
    keywords: ["interview", "questions", "question", "gemini", "google", "coding", "evaluation", "evaluate", "answer", "pytest", "test", "testing", "fixtures"],
    answer:
      "Vinayak built an interview automation pipeline using Google Gemini for JD-to-question generation (including coding questions) and an LLM-based answer-evaluation engine, with Pydantic validation and retry handling. It is covered by a 26-test pytest suite using 10 recorded model-response fixtures, so behaviour is tested deterministically without live API calls.",
  },
  {
    id: "documents",
    title: "Document intelligence",
    source: "Document Intelligence Layer",
    keywords: ["document", "documents", "pdf", "docx", "doc", "txt", "parsing", "parser", "magic", "bytes", "word", "legacy", "ocr", "extraction", "files", "resume"],
    answer:
      "Vinayak engineered a multi-format document layer supporting PDF, DOCX, TXT and legacy DOC. It detects the real file type with magic bytes, routes to the right extractor (pdfplumber, PyPDF2, python-docx), normalises the text, and handles Word 97–2003 files with a custom binary parser he implemented in Python.",
  },
  {
    id: "contractguard",
    title: "ContractGuard AI",
    source: "Currently Building (concept)",
    keywords: ["contractguard", "contract", "contracts", "vendor", "enterprise", "saas", "multi-tenant", "tenant", "building", "current", "concept", "flagship"],
    answer:
      "ContractGuard AI is a concept Vinayak is currently building: an enterprise, multi-tenant platform that uses Agentic RAG to analyse vendor contracts, obligations, policies, compliance requirements, renewals and risks. Its target stack is Next.js, FastAPI, PostgreSQL, Redis, hybrid retrieval, a workflow engine and cloud infrastructure. It is clearly a concept — not deployed and without customers.",
  },
  {
    id: "enterprise",
    title: "Enterprise AI systems",
    source: "Architecture",
    keywords: ["enterprise", "architecture", "architect", "system", "design", "scalable", "security", "rbac", "observability", "infrastructure", "cloud", "devops", "ci", "cd", "layers"],
    answer:
      "Vinayak approaches enterprise AI as layered software: a typed frontend, a FastAPI service layer with Pydantic contracts, an AI layer for generation, retrieval, agents and evaluation, a data layer, async workers for heavy jobs, infrastructure as code with CI/CD, observability down to per-stage AI telemetry, and security including RBAC, tenant isolation and audit logs. Patterns from the API, AI and reliability layers are proven in his Shework work; the full stack is the target architecture for ContractGuard.",
  },
  {
    id: "stack",
    title: "Technical stack",
    source: "Technical Stack · CV",
    keywords: ["stack", "technologies", "tech", "tools", "python", "fastapi", "languages", "frameworks", "skills", "libraries", "javascript"],
    answer:
      "Vinayak's CV-backed stack: Python and JavaScript; Google Gemini and Groq; FastAPI, Pydantic, REST APIs, ThreadPoolExecutor and structlog; FAISS, sentence-transformers, MiniLM and RapidFuzz; pdfplumber, PyPDF2, python-docx and olefile; pytest and Git; plus Streamlit, the Web Speech API and openpyxl.",
  },
  {
    id: "hire",
    title: "Working together",
    source: "Contact",
    keywords: ["hire", "contact", "email", "available", "work", "together", "freelance", "project", "build", "reach", "linkedin", "collaborate"],
    answer:
      "The best way to start is a short email describing the problem you want AI to solve: vinumagdum114@gmail.com. You can also reach Vinayak on LinkedIn at linkedin.com/in/vinayak-magdum62002. He is based in Pune, India.",
  },
];
