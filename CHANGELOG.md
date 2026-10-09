# Axioma · release notes

## 1.2.3 — 2026-10-09

- Fixed clipped dashboard hero labels, including “∞ posibilități”, by containing artwork and formulas in responsive flow. Checks now inspect child bounds as well as document overflow, at 12 sizes and enlarged text.
- Added three original daily Romanian brain puzzles covering number patterns, balance equations and counting. Everyone receives the same UTC-day set, with hints, rendered math, exploratory grids, worked solutions, local resumption and unranked retry practice. Existing lesson progress and XP remain unchanged.
- Added local guest timing and a single daily account attempt measured by Firestore server timestamps, including pauses. Rules validate the date, correct answers, ownership, immutable start/finish and public score timestamps.
- Added an opt-in time ranking with a chosen alias, exact-time ties, withdrawal and bounded pagination. Rankings explicitly remain partial until all pages are loaded. Public records contain only alias and timestamps; these source-visible puzzles are friendly training rather than a proctored competition.
- Added generation, rendering, session/offline retry, privacy, server timing, rollover, clipping and browser accessibility coverage.

Validation: `npm run check` passed with Node 24, Java 21 and `PW_CHANNEL=chrome`: production build, 66 unit/component tests, 76 desktop/mobile Playwright scenarios, and 17 Firestore rules tests. Coverage includes 6,000 daily parameter sets, rendered math, trusted timing and immutable attempts, opt-in publication/withdrawal, offline retry, UTC rollover, corrupted session recovery, negative answers on mobile, counting-grid interaction, accessibility, and clipping checks at 12 widths plus enlarged text. The mobile hero and puzzle screen were visually reviewed.

## 1.2.2 — 2026-10-09

- Added private feedback, problem reports and feature requests, guest drafts, account-scoped history and administrator replies/status triage. Firestore validates content, identity, timestamps and an atomic one-message-per-minute cooldown.
- Added unread release announcements for guests and signed-in users, persistent acknowledgement, and an uncached deployment manifest that checks for newer versions while the app is open. Updates offer a manual reload without interrupting assessments.
- Added opt-in local study reminders with daily/weekday schedules, editable times and unsubscribe controls. Hosted recurring calendar feeds support calendar subscriptions and .ics downloads; calendar apps provide reminders while Axioma is closed.
- Added animated quiz journeys, practice answer streaks, encouragement, keyboard selection/continuation and resumable mistake retries that preserve the original score and XP. Timed tests still withhold correctness until submission.
- Added inline KaTeX/MathML across teaching prose, examples, recap material, prompts, answers, feedback, glossary explanations, and laboratory math captions/labels. Made two ambiguous radical prompts explicit. Question IDs and saved progress remain stable.
- Added engagement, rendered-content integrity, privacy/rules, accessibility and responsive tests.

Validation: `npm run check` passed with Node 24, Java 21, and `PW_CHANNEL=chrome`: production build, 57 unit/component tests, 64 desktop/mobile Playwright scenarios, and 13 Firestore rules tests. The suite includes a full authored math-content parse/source-integrity audit, private feedback permissions and atomic cooldown, release detection, reminder scheduling/cancellation, no-XP mistake retries, timed-test integrity, accessibility, and the 12-size responsive matrix. Desktop quiz/recap and mobile reminder screens were visually reviewed.

## 1.2.1 — 2026-10-09

- Replaced the lab's native example/progression dropdowns with a styled accessible picker: names, short descriptions, selected state, keyboard navigation, touch selection, Escape/outside dismissal, and viewport-aware popup placement. Reset still returns to the selected example.
- Added an optional recap hub for grades V–VIII and IX–XII. Middle-school recap contains 16 original topic summaries, formulas, worked examples, and 48 exercises, plus a combined V–VIII bridge with one question per topic.
- Added a class-start choice: recap V–VIII before IX, IX before X, X before XI, and XI before XII, or start the new class directly. Recaps remain accessible from the course area and footer.
- High-school recaps follow the selected curriculum. Reviewing a previous class leaves the current class unchanged. Recap practice resumes in the current browser session, with worked feedback and no mastery/XP/social score changes.
- Improved narrow phone layouts, grid sizing, text wrapping, popup bounds, recap contrast, and mobile safe-area spacing. Responsive scenarios cover 12 representative viewport sizes across primary pages.
- Added content integrity, keyboard/pointer, recap resumption, curriculum isolation, no-XP, responsive, and accessibility tests.

Validation: `npm run check` passed with Node 24, Java 21, and `PW_CHANNEL=chrome`: production build, 47 unit/component tests, 50 Playwright scenarios across desktop/mobile, and 10 Firestore rules tests. Responsive checks cover 15 primary routes at 12 representative viewport sizes (320–2560 CSS pixels), including landscape and reduced viewports; keyboard, touch, reduced motion, and accessibility checks pass.

## 1.2.0 — 2026-10-09

- Added four interactive labs: complex numbers, exponential functions, arithmetic/geometric progressions, and binomial probability. All nine labs offer three named guided examples (27 total), investigations, and reset to the selected example.
- Added Romanian explanations for mathematical terms and symbols in lessons, worked examples, formulas, and lab guidance. Supports hover, keyboard focus, tap, Escape, outside dismissal, and mobile viewport positioning. Formula help controls preserve KaTeX MathML accessibility.
- Added 177 supplementary exercises, three for each of the 59 lessons, with distinct choices and worked explanations. Practice resumes after reload in the current browser session and does not change mastery, XP, daily quizzes, or social challenge scores.
- Added keyboard navigation across laboratory tabs. Preserved reduced motion and withheld hints during timed assessments.
- Added a shared development/release protocol, acceptance spec, canonical skill, and Codex/Claude/Copilot entry points. Agent differences concern discovery, not product requirements.
- Updated the in-app release feed and package version. The feed uses the `v1.2.0` tag; its GitHub link becomes available after the commit and tag are pushed.
- CI now includes Java 21 and Firestore rules validation alongside the build, unit tests, and Playwright checks.

Validation: `npm run check` passed with Node 24, Java 21, and `PW_CHANNEL=chrome`: production build, 40 unit/component tests, 34 Playwright scenarios across desktop/mobile (including accessibility), and 10 Firestore rules tests. Both skill files passed the skill-creator metadata validator. No deployment or push performed by this release task.

## 1.1.0 — 2026-10-09

Commit: `586f02b` — Add admin analytics and social challenges.

- Friend codes, private invitations, shared learning streaks, direct daily/test challenges, live scores, and notifications.
- Administrator statistics and user progress reporting, with Firestore rules for private social data and administrator access.
- Release history subsequently added in commit `6e3f2df`.

## 1.0.0 — 2026-10-09

Commit: `96a425e` — Build Axioma mathematics learning platform.

- Romanian high-school mathematics learning paths, separate curriculum cohorts, worked examples, mastery checks, and interactive labs.
- Daily missions, timed assessments, session resumption, XP, ranks, achievements, and optional Google/Firebase progress sync.
