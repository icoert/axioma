# Axioma repository guidance

Read [docs/development-protocol.md](docs/development-protocol.md) for the development and release workflow. Product acceptance criteria live in `docs/specs/`; read the spec relevant to the task.

- Educational UI and content are Romanian. Preserve curriculum-version mappings and existing lesson/question IDs.
- Keep Firebase access checks, account isolation, and participant-only social data intact.
- Mathematical calculations belong in testable modules; cover boundary cases rather than duplicating UI implementation in tests.
- Update release notes with each product release and commit the requested changes after validation.

The repository skill is [.github/skills/axioma-development/SKILL.md](.github/skills/axioma-development/SKILL.md). Use it for Axioma feature and release work.
