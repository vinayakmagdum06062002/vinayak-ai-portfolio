export const experience = [
  {
    role: "AI/ML Engineer",
    company: "Shework",
    period: "09/2025 – Present",
    location: "Pune, India",
    summary:
      "Built and shipped a suite of AI systems covering candidate sourcing, JD generation, resume/JD parsing, candidate fit scoring, interview question generation and answer evaluation.",
    highlights: [
      {
        area: "Candidate sourcing",
        text: "Built a multi-source AI sourcing engine converting JDs into ranked shortlists using LinkedIn, Naukri, recruiter-uploaded CVs, GitHub enrichment, fuzzy skill matching, deduplication and ranking — iterated across 25 documented versions based on recruiter feedback.",
      },
      {
        area: "Fit scoring",
        text: "Developed single and bulk LLM-based candidate fit-scoring with explainable recommendations, schema validation, score guardrails, concurrent processing of 3 resumes and 8-stage performance instrumentation.",
      },
      {
        area: "Interview automation",
        text: "Built an interview pipeline with Google Gemini for JD-to-question generation and an LLM answer-evaluation engine, with Pydantic validation, coding-question generation, retry handling and a 26-test pytest suite using 10 recorded model-response fixtures.",
      },
      {
        area: "Document intelligence",
        text: "Engineered a multi-format document layer for PDF, DOCX, TXT and legacy DOC using magic-byte detection, normalisation and a custom Word 97–2003 binary parser in Python.",
      },
      {
        area: "RAG",
        text: "Developed a retrieval-augmented POSH compliance assistant using FAISS, MiniLM embeddings, recursive chunking and top-k retrieval over a curated legal knowledge base.",
      },
      {
        area: "LLM reliability",
        text: "Implemented reusable reliability patterns — structured JSON outputs, schema validation, score/type normalisation, retry and backoff, error classification and graceful degradation — across AI workflows.",
      },
      {
        area: "Architecture",
        text: "Designed modular, UI-independent pipelines and a stateless JSON contract for portal integration, supported by architecture documentation, versioned design plans and formal bug-tracking records.",
      },
    ],
  },
] as const;
