# duta-teknologi-mandiri-landing-page

Public marketing landing page for [dutateknologimandiri.com](https://dutateknologimandiri.com).
Built as a pre-rendered static site that consumes the dashboard's CMS API.

## Stack

- TanStack Router (file-based) + Vite + React 19
- Tailwind CSS v4 (design tokens 1:1 with the dashboard)
- Zod for runtime validation
- react-hook-form + Zod resolvers for the contact form
- TanStack Query for client-side revalidation of CMS data
- Vitest for unit tests, Playwright for e2e

## Project structure

```
.
├── .agents/                  # Subagent infrastructure (roles, prompts, context)
│   ├── context/              # Project context the subagents read
│   ├── prompts/              # 5 role prompt templates
│   ├── roles/                # 5 role definitions
│   └── runbooks/             # Pipeline playbook
├── public/                   # Static assets (logo, favicon)
├── scripts/                  # Agent orchestrator + build scripts
├── src/
│   ├── components/           # UI components (sections, layout, primitives)
│   ├── content/              # id/en static copy
│   ├── lib/                  # cms, seo, utils
│   ├── routes/               # TanStack Router file-based routes
│   ├── styles.css            # Tailwind v4 + design tokens (1:1 with dashboard)
│   ├── App.tsx               # Root component (placeholder until TASK-002)
│   └── main.tsx              # React entry
├── tasks/                    # Per-task artifacts (see .template/)
│   └── .template/            # 00-request through 05-reviewed templates
├── tracker.html              # Task tracker (Pending / In Progress / Approved)
├── index.html                # HTML entry
├── package.json
├── tsconfig.app.json         # TS strict + noImplicitAny + path alias
└── vite.config.ts
```

## Local development

```sh
npm install
npm run dev          # Vite dev server
```

## Build

```sh
npm run build        # Memory-capped at 512MB; produces dist/
npm run start        # Preview the static build
```

## Tests

```sh
npm run lint
npm run test         # Vitest
npm run test:e2e     # Playwright
```

## Subagent pipeline

This repo is built by a 5-role subagent pipeline. See
`.agents/runbooks/subagent-development-driven-pipeline-worktrees.md`
for the full playbook and `.agents/AGENTS.md` for the role structure.
The current task status is visible at
[`tracker.html`](./tracker.html).

## Deploy

The static `dist/` is uploaded to Biznet Neo Web Hosting via FTP or the
hPanel File Manager. See `deploy.md` (added in TASK-005) for the full
upload procedure.

## Reference

- Design system: `../duta-teknologi-mandiri-web-app/DESIGN.md`
- Development rules: `../duta-teknologi-mandiri-web-app/RULES.md`
- CMS API contract: `../duta-teknologi-mandiri-web-app/docs/api/landing-page.md`
