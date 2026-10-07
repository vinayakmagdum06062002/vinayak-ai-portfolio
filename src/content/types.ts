/**
 * Content model for the portfolio.
 *
 * Every piece of content carries an explicit provenance so the UI can never
 * blur the line between work that shipped and work that is a concept.
 *   - "shipped": delivered work, sourced from the CV.
 *   - "building": a concept / currently-building project. Not deployed.
 */
export type Provenance = "shipped" | "building";

export interface PipelineStep {
  label: string;
  detail?: string;
}

export interface AISystem {
  id: string;
  index: string;
  name: string;
  shortName: string;
  summary: string;
  provenance: Provenance;
  context: string;
  problem: string;
  system: string;
  pipeline: PipelineStep[];
  aiComponents: string[];
  engineeringComponents: string[];
  challenges: { challenge: string; response: string }[];
  status: string;
  /** Concrete, CV-backed facts. Never estimated or invented. */
  facts?: { value: string; label: string }[];
  tags: string[];
  caseStudy: CaseStudy;
}

export interface CaseStudy {
  problem: string;
  architecture: string;
  aiApproach: string;
  engineering: string;
  reliability: string;
  testing: string;
  result: string;
}

export interface ArchitectureLayer {
  id: string;
  name: string;
  tagline: string;
  technologies: string[];
  responsibilities: string[];
  decisions: string[];
  /** Where this layer's patterns are proven in shipped work (CV-backed). */
  shippedEvidence: string[];
  /** Where this layer appears only in the concept / target architecture. */
  targetOnly: string[];
}

export interface CapabilityGroup {
  id: string;
  name: string;
  description: string;
  items: { name: string; provenance: Provenance; note?: string }[];
}

export interface StackCategory {
  id: string;
  name: string;
  description: string;
  items: { name: string; usedIn: string[] }[];
  note?: string;
}

export interface ApproachStep {
  id: string;
  name: string;
  purpose: string;
  practice: string;
}

export interface KnowledgeEntry {
  id: string;
  title: string;
  source: string;
  keywords: string[];
  answer: string;
}
