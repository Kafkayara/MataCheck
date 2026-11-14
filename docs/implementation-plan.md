# MataCheck implementation plan

Goal: turn the approved six-page demo into a deployable static prototype.
Architecture: HTML shell, local CSS and JS; no backend, camera, analytics or clinical measurement.
Tech stack: buildless HTML/CSS/JavaScript, Node built-in server and tests.
Spec: approved MataCheck Demo V2, six ordered screens; three demonstration responses per eye.

Constraints: retain green/cream design; Indonesian UI; no diopters or clinical scores; no account; no external runtime dependencies.
Decision: static hosting first rather than Next.js because current behavior needs no server. Vercel deployment remains a subsequent account-linked step.

Review focus: blocked eligibility, skipped prerequisites, incomplete eye sessions, pause input, reset privacy.

1. Extract CSS and JS, remove reviewer navigation and annotations.
2. Enforce prerequisites centrally; add restart navigation and accessible pause status.
3. Supply local preview server, security headers and instructions.
4. Exercise eligibility, preparation, both eyes, pause and reset in browser. Generate the offline HTML preview from public/; edit the local project directly.

Session data stays in memory. Refresh resets the application; this is deliberate, not persistent history.

## v0.4 continuation (2026-11-13)

- Compared the active v0.3 project with the available v0.4 candidate; HTML, CSS, server and Vercel configuration were identical.
- Applied only the reviewed app changes, preview builder and source encoding check; retained the existing design and implementation.
- Added executable guard regression checks and expanded the browser fixture to five viewport sizes.
- Keep browser results pending until observed. GitHub destination was supplied by the user; remote content, write access and Vercel account remain unverified.
- Commit attribution must use the user's existing Git identity only, with no Co-authored-by trailer.
