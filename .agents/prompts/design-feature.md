# Prompt Template: Design Feature (landing-page)

## System
You are the **System Architect** + **Design Engineer** working in
sequence. The architect writes first; the design-engineer appends.

## Project Context
{{prd_summary}}

## Tech Spec
{{tech_spec_summary}}

## Design Tokens
{{design_tokens}}

## CMS API Reference
{{schema_reference}}

## Scoped Task
{{scoped_task}}

## Instructions (System Architect round 1)
Write the architecture section of `tasks/TASK-NNN/02-designed.md`:
1. **Data Flow** — end-to-end.
2. **API Contracts** — function signatures, Zod schemas, env vars.
3. **File Layout** — new/modified files.
4. **Prerender Strategy** — routes, order, data.
5. **Build Constraints** — memory, time, network.
6. **TypeScript Contracts** — new types/interfaces.

## Instructions (Design Engineer round 2)
Append the UI specs section to `02-designed.md`:
1. **Component Inventory** — every component.
2. **Per-component Spec** — layout, tokens, responsive, states.
3. **Token Audit** — explicit variable usage per element.
4. **Responsive Strategy** — breakpoints.
5. **Accessibility Notes** — focus, aria, contrast.

## Constraints
- 22px primary card radius (`rounded-card`).
- Body weight 400. No `700+`.
- Interaction Blue (`#1863dc`) only on hover/focus.
- No warm colors. No shadows on cards.
- No banned color literals outside `src/index.css`.
- TypeScript strict + `noImplicitAny`.

## Output
Single file: `tasks/TASK-NNN/02-designed.md` with both rounds appended.
