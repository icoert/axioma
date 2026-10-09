# Learning expansion · 1.2.0

Status: implemented and validated for version 1.2.0.

## Outcomes

Students can explore more examples, understand unfamiliar terminology without leaving a lesson, and practise beyond the mastery check. All visible educational content remains Romanian.

## Acceptance criteria

- Nine interactive labs: the existing five plus complex numbers, exponentials, progressions, and binomial probability. Each has three named examples, a guided investigation, correct numerical output, and a reset to the selected example.
- Parameter changes update diagrams and captions immediately. Probability handles p=0 and p=1; progressions handle q=1; complex argument is undefined at zero. Arithmetic and geometric progression sums distinguish these cases.
- Terms in lesson theory and worked examples expose concise explanations on hover, keyboard focus, and tap. Formula symbols expose explanations too. Escape and outside interaction dismiss explanations. Popups remain readable inside mobile viewports and can be hovered without disappearing.
- Every existing lesson gets three new topic-specific exercises, each with four distinct options and a worked explanation. Supplementary practice is available from the lesson and can resume after reload.
- Existing lesson/question IDs, mastery rewards, daily question selection, saved best scores, and social challenge behaviour remain compatible. Supplementary practice gives feedback without additional XP or changes to mastery.
- Timed assessments do not expose terminology hints before completion.
- Test mathematical invariants, keyboard/touch interactions, exercise completeness, resumed practice, and zero extra XP. Run the build, unit/component suite, desktop/mobile Playwright suite, and Firestore rules before committing.

## Content policy

Keep original lesson IDs stable. New exercises live in a separate content bank. Lab calculations live outside rendering so they can be tested against independent mathematical expectations. Content follows the existing profile and curriculum mappings; adding examples does not claim a newly approved textbook or new curriculum coverage.

## Release contract

Update package version, repository changelog, and the Romanian in-app release feed. Link the new feed entry to a version tag, since a commit cannot embed its own hash. Commit the implementation and release notes together; create the matching local tag after the commit. Publishing is a separate action.

## Validation record

2026-10-09: `npm run check` passed (production build, 40 unit/component tests, 34 desktop/mobile Playwright scenarios, and 10 Firestore rules tests). Playwright used installed Chrome with `PW_CHANNEL=chrome`. The canonical skill and Claude discovery adapter passed metadata validation. Browser tests cover resumed practice without mastery/XP changes, all nine lab example menus, new lab boundary cases, keyboard tabs, mobile tooltip placement, hover/focus/tap/dismissal, and focused help contrast.
