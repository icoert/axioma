# Agent adapters

Reviewed 2026-10-09. Product specs and release acceptance criteria should not differ by model. A mathematical result, storage contract, accessibility requirement, or passing test is independent of the assistant that implements it. There is no evidence from this repository to justify different requirements or stronger claims about a particular model.

Only discovery differs:

| Tool | Entry point in this repository | Skill loading |
| --- | --- | --- |
| Codex | `AGENTS.md` | Explicit pointer to the canonical skill; no claim of automatic skill-menu discovery at this path |
| Claude Code | `CLAUDE.md` | Thin `.claude/skills/axioma-development/SKILL.md` adapter reads the canonical skill |
| GitHub Copilot | `.github/copilot-instructions.md` | Canonical `.github/skills/axioma-development/SKILL.md` |

The canonical skill uses the shared `name` and `description` frontmatter plus plain Markdown. This matches the documented [OpenAI skill format](https://learn.chatgpt.com/docs/build-skills). Claude Code documents [project discovery under `.claude/skills`](https://code.claude.com/docs/en/skills), while Copilot documents [project skills under `.github/skills`](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills). These sources describe tool discovery, not evidence that product specs should change with a model.

This workspace protects `.agents` from writes, so the canonical skill uses `.github/skills`. Codex is instructed to read it through `AGENTS.md`; Claude's small adapter supplies native discovery without duplicating the protocol. No user-level configuration is changed. For future tool versions, verify discovery against official documentation and update adapters, keeping the shared spec intact.

Validate with the repository checks. Skill metadata validation does not prove every vendor UI discovers a skill; that requires a session in each tool. If a model needs extra guidance after a reproducible failure, add a concrete example or test to the shared protocol first, then consider a tool-specific adapter only for a demonstrated integration constraint.
