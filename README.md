# Vinayak Magdum — AI Systems Portfolio

Portfolio site for an AI/ML Engineer. It shows shipped AI systems, the ContractGuard concept, a reference architecture, and a demo assistant that answers questions from a curated knowledge base.

## Stack

- Next.js 16 (App Router, statically prerendered), React 19
- TypeScript with `strict` and `noUncheckedIndexedAccess`
- CSS Modules plus a global token layer (`src/app/globals.css`). There is no UI framework.
- `next/font` (Geist, self-hosted) and `next/og` (generated Open Graph image)

## Getting started

```bash
npm install
cp .env.example .env.local   # optional
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
npm run typecheck && npm run lint
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used for metadata, OG tags, the sitemap and robots.txt. |
| `NEXT_PUBLIC_ASSISTANT_ENDPOINT` | Optional live backend for "Ask My AI". It must accept `POST { question }` and return `{ answer, sources? }`. If it is unset, the assistant runs in labelled demo mode. If it is set, the site falls back to local retrieval whenever the backend times out, returns an error or sends an invalid payload. |

The source contains no secrets.

## Structure

```
src/
  app/            layout (metadata, JSON-LD), page, OG image, icon, robots, sitemap, error/404
  content/        typed content: the single source of truth for every claim on the site
  components/
    layout/       Header (scroll spy, accessible mobile menu), Footer
    sections/     one component per page section, with an interactive client island where needed
    ui/           Section, ProvenanceBadge, ButtonLink, Flow, Reveal, ErrorBoundary
  lib/            site config, BM25-style retriever, assistant service, tabs keyboard hook
```

## Content rules

- `src/content/*` is sourced from `Vinayak_Magdum_CV.pdf`. Figures such as 25 versions, 3 concurrent resumes, 8 stages, 26 tests and 10 fixtures are quoted from the CV. None are estimated.
- Every item has a provenance of `"shipped"` or `"building"`. The UI renders it as a badge, so concept work can never pass as delivered work.
- Technologies that are not in the CV (PostgreSQL, Redis, Next.js, Docker, CI/CD, etc.) appear only in the ContractGuard concept and in the "target design only" parts of the architecture.
- To edit content, change the typed files in `src/content/`. Components read from them.

## Quality notes

- Error boundaries around every interactive island
- Loading, empty, validation and refusal states in the assistant
- The knowledge base is lazy-loaded as its own chunk
- Keyboard-accessible tabs (arrow keys, Home and End), a skip link and native `<details>` case studies
- Reveal animations hide content only when JavaScript is running, and `prefers-reduced-motion` turns motion off
