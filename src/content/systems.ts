import type { AISystem } from "./types";

/**
 * Shipped AI systems. Source of truth: Vinayak_Magdum_CV.pdf.
 * Numbers in `facts` are quoted from the CV verbatim — no derived or estimated metrics.
 */
export const systems: AISystem[] = [
  {
    id: "sourcing",
    index: "01",
    name: "AI Candidate Sourcing & Intelligence Engine",
    shortName: "Candidate Sourcing",
    summary:
      "A multi-source engine that converts a job description into a ranked, de-duplicated candidate shortlist.",
    provenance: "shipped",
    context: "Shework · AI/ML Engineer",
    problem:
      "Turning a job description into a qualified shortlist means searching fragmented sources — LinkedIn, Naukri and recruiter-uploaded CVs — each with different formats, overlapping profiles and inconsistent skill vocabulary.",
    system:
      "A JD-to-shortlist pipeline that sources candidates from LinkedIn, Naukri and uploaded CVs, enriches profiles with GitHub signals, normalises skills with fuzzy matching, resolves duplicates across sources and ranks the result.",
    pipeline: [
      { label: "Job description", detail: "JD parsed into structured requirements" },
      { label: "Multi-source sourcing", detail: "LinkedIn · Naukri · recruiter-uploaded CVs" },
      { label: "GitHub enrichment", detail: "Additional technical signal per candidate" },
      { label: "Fuzzy skill matching", detail: "Vocabulary normalisation with RapidFuzz" },
      { label: "Deduplication", detail: "Entity resolution across sources" },
      { label: "Ranking", detail: "Ordered shortlist for recruiters" },
    ],
    aiComponents: [
      "JD and resume parsing",
      "Fuzzy skill matching (RapidFuzz)",
      "Entity resolution & deduplication",
      "Candidate ranking",
    ],
    engineeringComponents: [
      "Modular, UI-independent processing pipeline",
      "Stateless JSON contract for portal integration",
      "Versioned design plans & architecture documentation",
      "Formal bug-tracking records",
    ],
    challenges: [
      {
        challenge: "The same person appears in several sources with differently formatted profiles.",
        response: "Entity resolution and deduplication before ranking, so recruiters see each candidate once.",
      },
      {
        challenge: "Skills are written inconsistently across JDs, profiles and CVs.",
        response: "Fuzzy skill matching to normalise vocabulary instead of brittle exact matches.",
      },
      {
        challenge: "Ranking quality is ultimately judged by recruiters, not by the model.",
        response: "Recruiter feedback loops with every iteration captured as a documented version.",
      },
    ],
    status: "Shipped at Shework and iterated across 25 documented versions based on recruiter feedback.",
    facts: [{ value: "25", label: "documented versions, driven by recruiter feedback" }],
    tags: ["Sourcing", "Entity resolution", "RapidFuzz", "Ranking"],
    caseStudy: {
      problem:
        "Recruiters needed a way to go from a JD to a credible shortlist without manually searching and reconciling profiles across job platforms, professional networks and their own CV uploads.",
      architecture:
        "A staged, UI-independent pipeline: JD parsing → multi-source sourcing (LinkedIn, Naukri, uploaded CVs) → GitHub enrichment → fuzzy skill matching → deduplication → ranking. A stateless JSON contract exposes the result to the portal.",
      aiApproach:
        "Structured requirement extraction from the JD, fuzzy matching to bridge skill vocabulary differences, and entity resolution to merge the same candidate across sources before ranking.",
      engineering:
        "Each stage is an isolated module with explicit inputs and outputs, so sources and scoring logic can change without touching the UI or the integration contract.",
      reliability:
        "Deduplication protects shortlist quality; the stateless contract keeps the portal integration predictable as internals evolve.",
      testing:
        "Changes were validated against recruiter feedback and recorded as versioned design plans, with formal bug-tracking records.",
      result:
        "Shipped at Shework. Iterated across 25 documented versions based on recruiter feedback.",
    },
  },
  {
    id: "fit-scoring",
    index: "02",
    name: "AI Candidate Fit Scoring System",
    shortName: "Fit Scoring",
    summary:
      "Single and bulk LLM-based fit scoring with explainable recommendations and guarded, schema-validated scores.",
    provenance: "shipped",
    context: "Shework · AI/ML Engineer",
    problem:
      "Recruiters need to know not only whether a candidate fits a JD, but why. Raw LLM scoring is not dependable on its own: output can be malformed, scores can be out of range and types inconsistent.",
    system:
      "Single and bulk fit-scoring services that evaluate resumes against a JD, return structured, explainable recommendations, and enforce schemas and score guardrails before anything reaches the user.",
    pipeline: [
      { label: "Resume + JD", detail: "Single candidate or bulk batch" },
      { label: "Parse & normalise", detail: "Via the document intelligence layer" },
      { label: "LLM scoring", detail: "Structured JSON output" },
      { label: "Schema validation", detail: "Pydantic contracts" },
      { label: "Score guardrails", detail: "Range and type normalisation" },
      { label: "Explainable recommendation", detail: "Score with reasons" },
    ],
    aiComponents: [
      "LLM-based candidate / JD matching",
      "Explainable recommendations",
      "Structured outputs & JSON mode",
      "Score guardrails",
    ],
    engineeringComponents: [
      "Concurrent processing of 3 resumes (ThreadPoolExecutor)",
      "8-stage performance instrumentation",
      "Single and bulk processing modes",
      "Score and type normalisation",
    ],
    challenges: [
      {
        challenge: "Model output can be malformed or return scores of the wrong type or range.",
        response: "Schema validation plus score/type normalisation and guardrails on every response.",
      },
      {
        challenge: "Bulk scoring is slow when resumes are processed one by one.",
        response: "Bounded concurrent processing of 3 resumes at a time.",
      },
      {
        challenge: "Without visibility it is unclear where time is spent in the pipeline.",
        response: "8-stage performance instrumentation across the scoring flow.",
      },
    ],
    status: "Shipped at Shework in both single and bulk modes.",
    facts: [
      { value: "3", label: "resumes processed concurrently" },
      { value: "8", label: "instrumented pipeline stages" },
    ],
    tags: ["Structured outputs", "Guardrails", "Concurrency", "Explainability"],
    caseStudy: {
      problem:
        "Recruiters needed a fit score they could trust and act on — with reasons attached — for one candidate or a whole batch.",
      architecture:
        "Resume and JD flow through parsing and normalisation into an LLM scoring stage that emits structured JSON, followed by schema validation, score guardrails and an explainable recommendation. Bulk mode runs the same pipeline with bounded concurrency.",
      aiApproach:
        "The model is asked for structured output, not prose. Its score is treated as a proposal that must pass validation and guardrails before it is accepted.",
      engineering:
        "ThreadPoolExecutor-based concurrent processing of 3 resumes, and 8-stage performance instrumentation to see where latency comes from.",
      reliability:
        "Schema validation, score/type normalisation, score guardrails, retry and backoff, error classification and graceful degradation.",
      testing:
        "Contracts are enforced at runtime through schema validation; instrumentation provides per-stage visibility during iteration.",
      result: "Shipped at Shework as single and bulk fit-scoring systems with explainable recommendations.",
    },
  },
  {
    id: "interview",
    index: "03",
    name: "AI Interview Automation System",
    shortName: "Interview Automation",
    summary:
      "Gemini-powered JD-to-question generation, coding questions, and an LLM answer-evaluation engine — with a deterministic test suite.",
    provenance: "shipped",
    context: "Shework · AI/ML Engineer",
    problem:
      "Writing role-specific interview questions — including coding questions — for every JD, and evaluating answers consistently, is slow and varies between interviewers.",
    system:
      "An interview automation pipeline that generates questions from a JD with Google Gemini, produces coding questions, and evaluates candidate answers with an LLM-based evaluation engine, all behind Pydantic contracts.",
    pipeline: [
      { label: "Job description", detail: "Role and skill requirements" },
      { label: "Question generation", detail: "Google Gemini" },
      { label: "Coding questions", detail: "Role-relevant technical prompts" },
      { label: "Pydantic validation", detail: "Typed question set" },
      { label: "Answer evaluation", detail: "LLM-based evaluation engine" },
      { label: "Validated result", detail: "Structured evaluation" },
    ],
    aiComponents: [
      "JD-to-question generation (Google Gemini)",
      "Coding-question generation",
      "LLM-based answer evaluation",
      "Prompt engineering & versioning",
    ],
    engineeringComponents: [
      "Pydantic validation of every model response",
      "Retry handling",
      "26-test pytest suite",
      "10 recorded model-response fixtures",
    ],
    challenges: [
      {
        challenge: "Generated questions and evaluations must be machine-usable, not free text.",
        response: "Pydantic models validate every response before it enters the workflow.",
      },
      {
        challenge: "External model calls fail intermittently.",
        response: "Retry handling around generation and evaluation calls.",
      },
      {
        challenge: "Testing LLM features against a live API is slow and non-deterministic.",
        response: "A pytest suite driven by recorded model-response fixtures.",
      },
    ],
    status: "Shipped at Shework with a 26-test pytest suite using 10 recorded model-response fixtures.",
    facts: [
      { value: "26", label: "pytest tests" },
      { value: "10", label: "recorded model-response fixtures" },
    ],
    tags: ["Google Gemini", "Pydantic", "pytest", "Evaluation"],
    caseStudy: {
      problem:
        "Hiring teams needed consistent, role-specific interview questions and a consistent way to evaluate answers, without writing everything by hand for each JD.",
      architecture:
        "JD → Gemini question generation (including coding questions) → Pydantic validation → candidate answers → LLM answer evaluation → validated, structured result.",
      aiApproach:
        "Prompted generation with structured outputs for question sets, and a separate LLM evaluation engine for answers — two distinct responsibilities with their own contracts.",
      engineering:
        "Pydantic models define the shape of questions and evaluations; generation and evaluation are separate, testable components.",
      reliability: "Pydantic validation on every response and retry handling around model calls.",
      testing:
        "26 pytest tests using 10 recorded model-response fixtures, so behaviour is verified deterministically without live API calls.",
      result: "Shipped at Shework.",
    },
  },
  {
    id: "documents",
    index: "04",
    name: "Document Intelligence Layer",
    shortName: "Document Intelligence",
    summary:
      "Multi-format ingestion for PDF, DOCX, TXT and legacy DOC — including a custom Word 97–2003 binary parser written in Python.",
    provenance: "shipped",
    context: "Shework · AI/ML Engineer",
    problem:
      "Every AI workflow downstream depends on clean text, but CVs arrive as PDF, DOCX, TXT and legacy .doc. File extensions are unreliable, and legacy Word 97–2003 binaries are poorly supported by common Python tooling.",
    system:
      "A shared ingestion layer that identifies the real file type by magic bytes, routes it to the right extractor, parses legacy DOC with a custom binary parser, and normalises text for downstream AI.",
    pipeline: [
      { label: "Upload", detail: "PDF · DOCX · TXT · DOC" },
      { label: "Magic-byte detection", detail: "Trust content, not extension" },
      { label: "Format routing", detail: "Per-format extractor" },
      { label: "Extraction", detail: "pdfplumber · PyPDF2 · python-docx" },
      { label: "Legacy DOC parser", detail: "Custom Word 97–2003 parser (olefile)" },
      { label: "Normalisation", detail: "Clean text for AI pipelines" },
    ],
    aiComponents: [
      "Text normalisation for LLM input",
      "Feeds JD / resume parsing",
      "Feeds fit scoring and sourcing",
    ],
    engineeringComponents: [
      "Magic-byte file detection",
      "Custom Word 97–2003 binary parser in Python",
      "pdfplumber, PyPDF2, python-docx, olefile",
      "Single interface for all formats",
    ],
    challenges: [
      {
        challenge: "File extensions do not reliably describe file contents.",
        response: "Magic-byte detection determines the real format before parsing.",
      },
      {
        challenge: "Legacy .doc (Word 97–2003) files are a binary format with limited library support.",
        response: "A custom binary parser implemented in Python.",
      },
      {
        challenge: "Each extractor produces differently shaped text.",
        response: "A normalisation step gives downstream AI one consistent input.",
      },
    ],
    status: "Shipped at Shework as the shared ingestion layer for the AI workflows.",
    tags: ["Document AI", "Magic bytes", "Binary parsing", "Normalisation"],
    caseStudy: {
      problem:
        "AI features were only as good as the text they received, and recruiter uploads came in four formats — one of them a legacy binary format.",
      architecture:
        "Upload → magic-byte detection → format router → extractor (pdfplumber / PyPDF2 / python-docx / plain text / custom DOC parser) → normalisation → downstream AI pipelines.",
      aiApproach:
        "Not a model problem — a data-quality problem that every model depends on. Normalised text improves everything built on top of it.",
      engineering:
        "A custom Word 97–2003 binary parser in Python, alongside established extraction libraries, behind one interface.",
      reliability:
        "Content-based detection instead of extension-based detection; one normalised output shape regardless of input format.",
      testing: "Each format path is an isolated extractor that can be exercised independently.",
      result: "Shipped at Shework as the document layer for sourcing, parsing and fit scoring.",
    },
  },
  {
    id: "posh-rag",
    index: "05",
    name: "POSH Compliance RAG Assistant",
    shortName: "POSH Compliance RAG",
    summary:
      "A retrieval-augmented assistant that grounds answers about POSH compliance in a curated legal knowledge base.",
    provenance: "shipped",
    context: "Shework · AI/ML Engineer · also a standalone project",
    problem:
      "Questions about POSH (Prevention of Sexual Harassment) compliance need answers grounded in actual legal source material — an ungrounded LLM answer is not acceptable in a compliance context.",
    system:
      "A RAG assistant that chunks a curated legal knowledge base, embeds it with MiniLM, indexes it in FAISS and retrieves the top-k passages to ground each generated answer.",
    pipeline: [
      { label: "Curated legal KB", detail: "Source documents" },
      { label: "Recursive chunking", detail: "Context-preserving segments" },
      { label: "MiniLM embeddings", detail: "sentence-transformers" },
      { label: "FAISS index", detail: "Vector search" },
      { label: "Top-k retrieval", detail: "Most relevant passages per query" },
      { label: "Grounded answer", detail: "LLM generation (Groq) over retrieved content" },
    ],
    aiComponents: [
      "Retrieval-augmented generation",
      "MiniLM embeddings (sentence-transformers)",
      "FAISS semantic search",
      "Grounded response generation",
    ],
    engineeringComponents: [
      "Recursive text chunking",
      "Top-k retrieval",
      "Curated knowledge base",
      "Python · FAISS · sentence-transformers · Groq",
    ],
    challenges: [
      {
        challenge: "Compliance answers must not be invented.",
        response: "Responses are generated from retrieved source content rather than model memory.",
      },
      {
        challenge: "Legal text loses meaning when split naively.",
        response: "Recursive chunking keeps passages coherent for retrieval.",
      },
      {
        challenge: "Keyword search misses paraphrased questions.",
        response: "Dense MiniLM embeddings with FAISS semantic search.",
      },
    ],
    status: "Built — part of the Shework AI suite and a standalone project.",
    tags: ["RAG", "FAISS", "MiniLM", "Groq"],
    caseStudy: {
      problem:
        "Provide reliable answers to POSH compliance questions where accuracy and traceability to source material matter more than fluency.",
      architecture:
        "Offline: curated legal KB → recursive chunking → MiniLM embeddings → FAISS index. Online: question → embedding → top-k retrieval → grounded generation.",
      aiApproach:
        "Classic retrieval-augmented generation: semantic retrieval first, then generation constrained to the retrieved passages.",
      engineering: "Python with FAISS, sentence-transformers and Groq; a curated rather than scraped knowledge base.",
      reliability:
        "Grounding in retrieved content is the primary reliability mechanism — the knowledge base, not the model, is the source of truth.",
      testing: "Retrieval quality depends on chunking and top-k choices, which are tunable independently of generation.",
      result: "Built as part of the Shework AI suite and as a standalone project.",
    },
  },
];

export const systemById = (id: string) => systems.find((s) => s.id === id);
