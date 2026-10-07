import type { StackCategory } from "./types";

/**
 * Technical stack. ONLY technologies listed in the CV.
 * `usedIn` references system ids from systems.ts; "suite" means used across the Shework AI suite.
 */
export const stackCategories: StackCategory[] = [
  {
    id: "llm",
    name: "AI / LLM",
    description: "Model providers and the techniques that make their output dependable.",
    items: [
      { name: "Google Gemini", usedIn: ["interview"] },
      { name: "Groq API", usedIn: ["posh-rag"] },
      { name: "Prompt engineering", usedIn: ["suite"] },
      { name: "Structured outputs", usedIn: ["fit-scoring", "interview"] },
      { name: "JSON mode", usedIn: ["fit-scoring", "interview"] },
      { name: "LLM output validation", usedIn: ["fit-scoring", "interview"] },
      { name: "Schema enforcement", usedIn: ["fit-scoring", "interview"] },
      { name: "Prompt versioning", usedIn: ["suite"] },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    description: "Services, contracts and concurrency.",
    items: [
      { name: "Python", usedIn: ["suite"] },
      { name: "FastAPI", usedIn: ["suite"] },
      { name: "Pydantic", usedIn: ["fit-scoring", "interview"] },
      { name: "REST API integration", usedIn: ["suite"] },
      { name: "ThreadPoolExecutor", usedIn: ["fit-scoring"] },
      { name: "Retry & backoff", usedIn: ["fit-scoring", "interview"] },
      { name: "Error classification", usedIn: ["suite"] },
      { name: "structlog", usedIn: ["suite"] },
    ],
  },
  {
    id: "rag",
    name: "RAG / NLP",
    description: "Retrieval, matching and language processing.",
    items: [
      { name: "FAISS", usedIn: ["posh-rag"] },
      { name: "sentence-transformers", usedIn: ["posh-rag"] },
      { name: "MiniLM", usedIn: ["posh-rag"] },
      { name: "Semantic search", usedIn: ["posh-rag"] },
      { name: "Chunking & retrieval", usedIn: ["posh-rag"] },
      { name: "RapidFuzz", usedIn: ["sourcing"] },
      { name: "Entity resolution", usedIn: ["sourcing"] },
      { name: "Deduplication", usedIn: ["sourcing"] },
      { name: "Regex", usedIn: ["suite"] },
    ],
  },
  {
    id: "document",
    name: "Document AI",
    description: "Reliable text from messy real-world files.",
    items: [
      { name: "pdfplumber", usedIn: ["documents"] },
      { name: "PyPDF2", usedIn: ["documents"] },
      { name: "python-docx", usedIn: ["documents"] },
      { name: "olefile", usedIn: ["documents"] },
      { name: "Magic-byte detection", usedIn: ["documents"] },
      { name: "Text normalisation", usedIn: ["documents"] },
    ],
  },
  {
    id: "data",
    name: "Data & UI",
    description: "Reporting and interfaces around AI workflows.",
    items: [
      { name: "openpyxl", usedIn: [] },
      { name: "Excel reporting automation", usedIn: [] },
      { name: "Streamlit", usedIn: [] },
      { name: "JavaScript", usedIn: [] },
      { name: "Web Speech API", usedIn: [] },
    ],
  },
  {
    id: "testing",
    name: "Testing",
    description: "Deterministic tests for non-deterministic systems.",
    items: [
      { name: "pytest", usedIn: ["interview"] },
      { name: "Recorded model-response fixtures", usedIn: ["interview"] },
    ],
  },
  {
    id: "devops",
    name: "DevOps / Infrastructure",
    description: "Version control and engineering process.",
    items: [
      { name: "Git", usedIn: ["suite"] },
      { name: "Architecture documentation", usedIn: ["suite"] },
      { name: "Versioned design plans", usedIn: ["sourcing"] },
      { name: "Bug-tracking records", usedIn: ["suite"] },
    ],
    note: "Docker, cloud deployment, IaC and CI/CD are part of the ContractGuard build and are shown there as target architecture — not listed here as shipped experience.",
  },
];
