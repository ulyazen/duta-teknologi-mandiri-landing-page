# TASK-004 Implementation Notes

## Deviations
- **window.location.assign instead of window.location.href** to
  satisfy the `react-hooks/immutability` lint rule.
- **JSON-LD structure** mirrors the dashboard's pattern: one
  Organization graph, one WebSite graph (with publisher), one
  ContactPage graph. No LocalBusiness since the dashboard doesn't
  surface that.

## Known issues
- **mailto: requires a mail client.** On a tablet or kiosk without
  a configured mail client, the form fails silently. v1 accepts
  this; v1.1 swaps to a server route function.
