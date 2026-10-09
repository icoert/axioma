# Optional recaps and lab picker · 1.2.1

## Acceptance criteria

- Replace the lab example native select with a styled, accessible picker. Show example names and short guidance, selected state, keyboard navigation (arrows, Home/End, Enter/Space, Escape, Tab), touch selection, outside dismissal, and viewport-aware popup placement. Preserve reset to the selected example.
- Offer a permanent recap hub for grades V–VIII and IX–XII. Middle-school recap includes authored theory, formulas, worked examples, and exercises grouped by grade. It is a foundation recap, not a replacement for a complete middle-school course.
- Before a high-school course starts, suggest an optional recap: V–VIII before IX, IX before X, X before XI, XI before XII. Offer both recap and direct course entry. Never lock the course or change the selected curriculum while reviewing a previous grade.
- High-school recaps reuse the selected curriculum's lesson concepts and explanations; grade XII recap is available for revision too. Preserve current lesson/question IDs, mastery, XP, daily missions, account isolation, and social scores.
- Recap quizzes resume after reload, show worked feedback, and award no XP. Session IDs include recap and curriculum identity. Invalid recap IDs have a useful fallback.
- Verify narrow phones (320/360/393 px), landscape phones, tablets (768/820/1024 px), laptops (1280/1440 px), large desktops (1920/2560 px), and browser zoom represented by a reduced CSS viewport. Check overflow, readable wrapped text, popup bounds, keyboard focus, touch, reduced motion, and accessibility. These checks cover representative sizes; no claim of testing every physical device.
- Release as 1.2.1, update package/changelog/feed, run the full validation gate, commit/tag/push, deploy Firebase Hosting, and smoke-test the public site.

## Content and storage

Use the Ministry's middle-school programme publication as the curriculum reference, with source links on the recap page. Author original concise recap material. The high-school recap follows existing `courseLessons` mappings, not the raw stored grade. Recap progress is browser-session practice, separately keyed per account, without Firestore schema/rule changes.

## Entry points

Dashboard start actions offer the optional recap when no lesson in the selected course is mastered. The curriculum page has the same invitation. A recap hub link remains available in the course area and footer. Direct lesson links and previously started study continue working.

Validation: implemented and visually reviewed on desktop and phone. The full `npm run check` gate passed: production build, 47 unit/component tests, 50 Playwright desktop/mobile scenarios, and 10 Firestore rules tests. The responsive matrix verifies 15 primary routes at all 12 representative viewport sizes; recap/session/curriculum isolation, no-XP behavior, keyboard/touch picker interactions, popup bounds, reduced motion, and accessibility checks pass.
