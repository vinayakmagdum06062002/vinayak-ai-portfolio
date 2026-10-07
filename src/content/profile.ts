export const profile = {
  name: "Vinayak Magdum",
  role: "AI/ML Engineer",
  focus: ["GenAI", "Agentic AI", "RAG", "AI Systems"],
  headline:
    "I build production-grade AI systems — from intelligent workflows and Agentic RAG to reliable backend services and enterprise-ready infrastructure.",
  statement:
    "I design and build production-oriented AI systems that connect intelligent models with real products, data, workflows, and infrastructure.",
  location: "Pune, India",
  email: "vinumagdum114@gmail.com",
  linkedin: {
    label: "linkedin.com/in/vinayak-magdum62002",
    href: "https://www.linkedin.com/in/vinayak-magdum62002",
  },
  currentRole: { title: "AI/ML Engineer", company: "Shework", since: "09/2025" },
} as const;

export const education = [
  {
    degree: "MSc Data Science and Analytics",
    school: "Cardiff University",
    period: "09/2023 – 09/2024",
  },
  {
    degree: "BSc Computer Science",
    school: "MIT-WPU",
    period: "07/2020 – 06/2023",
  },
] as const;

export const principles = [
  {
    title: "The model is a component, not the product",
    body: "An LLM call is one step in a system. Inputs, contracts, retrieval, validation, failure handling and integration decide whether it is useful in production.",
  },
  {
    title: "Contracts over prompts",
    body: "Structured outputs, schema validation and stateless JSON contracts turn probabilistic model output into data the rest of the product can depend on.",
  },
  {
    title: "Fail gracefully, never silently",
    body: "Retries with backoff, error classification and graceful degradation are designed in from the start — not added after the first outage.",
  },
  {
    title: "Ground it, then prove it",
    body: "Answers should trace back to evidence, and behaviour should be pinned down with tests and recorded fixtures rather than spot checks.",
  },
] as const;
