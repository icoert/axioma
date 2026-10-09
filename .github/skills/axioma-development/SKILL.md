---
name: axioma-development
description: Develop, test, review, and release Axioma curriculum, interactive labs, assessments, or account features. Use for work in this repository; not for unrelated apps or deployment without a deployment request.
---

Read `AGENTS.md`, `docs/development-protocol.md`, and the relevant `docs/specs/` file from the repository root. Use their acceptance criteria rather than inventing model-specific requirements.

Inspect Git status, recent commits, `CHANGELOG.md`, and `src/content/releases.ts` before editing. Preserve unrelated work. Keep lesson and mastery question IDs stable; place supplementary questions in their separate bank. Check mathematical domains, endpoints, option uniqueness, and worked explanations.

Keep student-facing content Romanian. Explanations must support hover, focus, tap, and dismissal. Preserve reduced motion, mobile layouts, timed assessment integrity, guest access, account isolation, and Firestore permissions.

Run focused checks while developing, then `npm run check` before a release commit. Report failures and environmental blockers accurately. Update the spec, changelog, package version, and in-app release feed together. Use a version tag for the new release link, then create that local tag after the commit when a release is requested. Pushing and publishing require authorization in the session.
