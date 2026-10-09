# Axioma development protocol

1. Inspect `git status`, recent commits, `CHANGELOG.md`, and `src/content/releases.ts`. Read the relevant spec and code before editing. Preserve unrelated work.
2. Turn the requested behaviour into acceptance criteria in `docs/specs/`. Preserve lesson IDs, saved progress, account isolation, and existing social flows.
3. Test during development: establish the baseline, add meaningful tests for changed behaviour, and run focused checks after each implementation slice.
4. Before committing, run `npm run check` with Node 24.12+, Java 21+, and Playwright Chromium. If using installed Chrome, set `PW_CHANNEL=chrome`. Report blocked checks accurately.
5. Write release notes describing user-visible changes and actual validation. Keep `package.json`, `CHANGELOG.md`, and the in-app release feed consistent. Use a version-tag link for a new entry; old entries keep their actual commit links.
6. Review the diff, commit authorized changes with a descriptive message, and create a matching local version tag for a release. Report the commit and check results. Push/deploy only when requested or already authorized.

Use the same protocol with every coding agent. Tool permissions remain those of the current environment; this document does not grant new access.
