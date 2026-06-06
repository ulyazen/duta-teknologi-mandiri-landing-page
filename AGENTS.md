# AGENTS.md (landing-page)

Agent role definitions and worktree convention for the
duta-teknologi-mandiri-landing-page project. This file is the
landing-page-specific companion to the dashboard's
`duta-teknologi-mandiri-web-app/AGENTS.md`.

## Pipeline

7-stage flow: `pending -> scoped -> designed -> implemented -> tested -> reviewed -> approved`.

| # | Role | Branch slug | Worktree path |
|---|------|-------------|---------------|
| 1 | product-owner | scope | `.worktrees/scope` |
| 2 | system-architect | design | `.worktrees/design` |
| 3 | design-engineer | design (round 2) | `.worktrees/design` |
| 4 | fullstack-feature-agent | implement | `.worktrees/implement` |
| 5 | qa-testing-agent | test | `.worktrees/test` |
| 6 | lead-review (leader) | review | `.worktrees/review` |
| 7 | leader (parent) | main | the main checkout |

## Worktree rules

- One worktree per role per task.
- Path: `.worktrees/<role>/`
- Branch: `feature/TASK-NNN-<role-slug>`
- Created from `main` via `npm run agent:worktree -- --task=TASK-NNN --role=<role>`.
- After the role finishes, the leader fast-forward merges into `main`
  and runs `npm run agent:worktree -- --task=TASK-NNN --role=<role> --action=remove`.

## Roles

- `product-owner` (`.agents/roles/product-owner.md`)
- `system-architect` (`.agents/roles/system-architect.md`)
- `design-engineer` (`.agents/roles/design-engineer.md`)
- `fullstack-feature-agent` (`.agents/roles/fullstack-feature-agent.md`)
- `qa-testing-agent` (`.agents/roles/qa-testing-agent.md`)

## Runbook

The full playbook is at
`.agents/runbooks/subagent-development-driven-pipeline-worktrees.md`.
It includes copy-paste commands, the leader merge checklist, the
tracker convention, and failure recovery procedures.

## Inter-Agent Protocol

1. **product-owner** defines the feature scope (writes `01-scoped.md`).
2. **system-architect** approves or vetoes the technical approach
   (writes the architecture section of `02-designed.md`).
3. **design-engineer** reviews UI output before implementation
   (appends the UI specs to `02-designed.md`).
4. **fullstack-feature-agent** implements the approved scope
   (writes `03-implementation/{summary,notes}.md` and commits the code).
5. **qa-testing-agent** validates before merge (writes `04-tested.md`).
6. **lead-review** (leader) gives final APPROVE / REQUEST CHANGES
   (writes `05-reviewed.md`).
7. **leader** merges, advances the orchestrator state, and updates
   `tracker.html`.

Round-trip: if QA finds a calculation error or a UI token violation,
the leader loops back to the fullstack or design stage with specific
feedback.
