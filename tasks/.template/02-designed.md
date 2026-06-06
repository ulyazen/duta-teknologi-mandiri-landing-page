# TASK-NNN Design

## Architecture (System Architect)

### Data Flow
<Text-based diagram from CMS API to rendered HTML.>

### API Contracts
- `<function signature>`
- Zod schema: <name>

### File Layout
- `path/to/file.ts` — <one-line purpose>

### Prerender Strategy
- Routes: <list>
- Order: <list>
- Data source: <CMS API | stub>

### Build Constraints
- Memory cap: 512MB
- Time target: <seconds>
- Network: <required|optional>

### TypeScript Contracts
- `<InterfaceName>` — <fields>

## UI Specs (Design Engineer)

### Component Inventory
- `<ComponentName>` — <purpose>

### Per-component Spec
For each component:
- **Layout:** <grid|flex|block>
- **Tokens:** <list of CSS variables used>
- **Responsive:** <breakpoint behavior>
- **States:** hover, focus, disabled, loading, error

### Token Audit
| Element | Token | Value |
|---------|-------|-------|
| Card surface | `--color-surface` | `#ffffff` |
| Primary card radius | `--radius-card` | `22px` |

### Responsive Strategy
- <425px: <behavior>
- 425-640px: <behavior>
- 640-1024px: <behavior>
- 1024-1440px: <behavior>
- 1440px+: <behavior>

### Accessibility Notes
- <Focus order, aria labels, contrast>
