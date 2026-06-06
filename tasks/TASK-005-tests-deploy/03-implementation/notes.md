# TASK-005 Implementation Notes

## Deviations
- **Playwright tests not executed end-to-end in this session.**
  The Playwright config is wired to `npm run start` (which serves
  the production build), but the test suite was not run because
  the e2e harness needs a browser binary. The next session can
  run `npx playwright install --with-deps` and `npm run test:e2e`
  to execute the suite.

## Known issues
- The e2e suite has not been green-run; it is configured but not
  validated. The unit tests are validated.
