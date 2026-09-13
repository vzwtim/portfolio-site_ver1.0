# Portfolio refresh — Phase 1 discovery

Updated: 2026-09-13

This document records decisions that are safe to keep in the public repository. Interview notes that contain internal information must not be added here, to `src/data`, or to any client-delivered asset until their publication scope has been confirmed.

## What was reviewed

- Repository structure, routes, dependencies, content data, image library, metadata, and Git state.
- The deployed URL was requested, but this environment's network proxy returned HTTP 403. The repository implementation is therefore the primary source for this first review; a real-browser comparison with production remains open.
- Existing routes: Home, Works, work detail, Photos, Apps, About, Contact, and Special.
- Existing assets include architecture drawings, maps, research figures, travel/film photography, application screenshots, illustrations, and the gomoku-rice hero.

## Current-site assessment

### Keep and reinterpret

1. **Keep 「ぼくは、五目飯。」, but make it an opening thesis rather than the whole explanation.** It is memorable, personal, and already supported by a strong original photograph. Its current follow-up describes variety but does not show how that variety creates value. The refresh should pair it immediately with a concrete editorial sentence and direct links to representative work.
2. **Keep the green `#008877` and red `#bb5555`.** Use green as the navigational/editorial baseline and red only for annotations, active states, and moments of emphasis. Avoid equal-weight color blocks.
3. **Keep original evidence.** Maps, drawings, field photographs, diagrams, and application screens have more authorship than stock imagery and can connect observation to execution.
4. **Keep the breadth, change the hierarchy.** Architecture, research, property, organization, small tools, and travel should remain present, but representative cases need editorial scale while the remainder becomes an explorable archive.

### Improve

1. Home currently delays substantive content behind a 300vh scroll-controlled hero. The key proposition and representative-case links should exist in the first viewport without waiting for animation.
2. Works presents all entries in a uniform card grid and hides its filter UI. It does not communicate role, status, period, decision, or outcome at scanning speed.
3. Work data is a single JSON list with only title, description, images, colors, tags, and occasional links. It needs public-safe structured fields and explicit publication/status controls before new employment cases are added.
4. About mixes verified history with several speculative “Future” roles. Aspirations can remain, but should be clearly labeled as interests rather than read like experience or promises.
5. Motion is split across GSAP, Framer Motion, Lenis, and custom effects. The refresh should choose a small set of signature behaviors, preserve native scrolling, and define reduced-motion fallbacks rather than animate every section similarly.
6. Metadata is generic and English-only despite a Japanese-first site. Page-level titles, descriptions, and share imagery need an explicit content pass.

## Editorial hypothesis

### Working sentence

> 場所をよく見て、まだ言葉になっていない価値を読み解き、人と仕組みをつなぎながら、使える形まで持っていく。

This is intentionally provisional. It connects the observable evidence already in the repository—fieldwork, maps, architecture, making, and tools—with the newly listed work experience, without claiming unverified outcomes or leadership. Interview answers should determine whether 「人と仕組みをつなぐ」 and 「持っていく」 sound like the person and accurately describe their role.

### Reader paths

- **Fast / recruiting:** one-sentence identity → 2–3 representative cases → role, period, status, and verified result/progress above the fold → About/Contact.
- **Deep / curious:** visual opening → cross-disciplinary project index → case process and evidence → Journey / Field Notes → archive.

### Provisional information architecture

1. **Home / Index** — identity, editorial statement, representative cases, a visual field-note strip, concise profile and contact route.
2. **Projects** — work, research, and making together; 2–3 featured stories followed by a denser archive. Existing `/works` URLs should be retained or redirected.
3. **Project detail** — summary block (overview / role / period / result or progress), then a case-specific sequence of context, decisions, actions, evidence, limits, and learning.
4. **Field Notes** — old-road bicycle journeys, videos, photography, maps, and observations. Only verified routes and supplied media appear.
5. **About** — factual chronology, recurring interests, working approach, and clearly separated current/future interests.
6. **Contact** — only confirmed channels. Existing public social links still require the owner's confirmation before the refresh republishes them.

## Two design directions

The comparison mock is in [`home-directions.svg`](./home-directions.svg). It is a compositional prototype, not approved production UI.

### A — Field Ledger / 観察台帳 (recommended)

- **Color:** warm paper and charcoal form the field; `#008877` structures navigation and routes; `#bb5555` acts like an editor's pencil.
- **Type:** expressive Japanese Mincho for propositions and case titles; restrained Gothic for metadata and controls; tabular numerals for dates and indexes.
- **Composition:** an asymmetric editorial grid; one large photographic plate with marginal notes; featured work varies in scale; project facts sit in a stable rail.
- **Images:** preserve documentary crops, captions, dates, source/type labels, maps, and drawings. Use contact-sheet sequences for field notes rather than decorative collages.
- **Motion:** (1) hero plate/title settle into one composition, (2) shared image geometry between project list and detail, (3) journey route progressively reveals at native-scroll pace. On mobile, remove parallax and use discrete image swaps. With reduced motion, show final compositions immediately and use no route drawing.
- **Why recommended:** the same visual grammar can hold property analysis, organizational practice, architecture, maps, and travel without making work corporate or hobbies ornamental.

### B — Gomoku Broadside / 五目新聞

- **Color:** white base, large solid green fields, sharper red stamps/rules, and high-contrast black type.
- **Type:** bold Gothic headlines with compact Mincho essays; oversized issue numbers and vertical Japanese labels.
- **Composition:** poster-like opening, modular story strips, bold cropping, and playful changes of reading direction. The gomoku metaphor becomes a recurring “ingredient/index” system.
- **Images:** tighter, energetic crops and serial frames; diagrams become full-bleed interludes; archive reads like newspaper classifieds.
- **Motion:** (1) headline/photograph mask assembly, (2) horizontal story-strip transitions without hijacking vertical scroll, (3) tactile stamp-like link response. Mobile collapses strips to vertical snap-free sequences. Reduced motion uses static masks and underline/color states.
- **Trade-off:** more immediately playful and memorable, but its louder grammar risks competing with sensitive case evidence and becoming tiring on long detail pages.

## Shared motion contract

| Treatment | Target | Trigger | Meaning | Mobile | Reduced motion |
| --- | --- | --- | --- | --- | --- |
| Editorial assembly | hero image, title, thesis | first paint; content is already readable | many interests resolve into one point of view | transform distance ≤ 16px; no parallax | final state immediately |
| Case continuity | featured image/list label → detail header | navigation | the reader has entered the same story | image continuity only if cheap; otherwise normal navigation | normal navigation, no transform |
| Route narrative | verified route line + field images | native section scroll | connect movement, place, and observation | discrete steps; no continuous blur/filter | complete route plus all controls visible |
| Micro response | links, filters, media controls | hover, focus, press | affordance and editorial annotation | press/focus states, no hover dependency | color/underline only |

All motion must preserve native scrolling, keyboard focus, browser back behavior, and immediately available primary links. Use one shared duration/easing scale. Do not autoplay audio, and do not add WebGL unless later evidence demonstrates a unique need.

## Public content model (proposal only)

Each publishable case should carry: `slug`, `title`, `deck`, `domain`, `status`, `periodLabel`, `roleSummary`, `resultOrProgress`, `featured`, `visibility`, `cover`, and flexible narrative sections. `visibility` must default to draft/non-public. Internal interview notes and source documents stay outside the public repository; only an explicitly approved, redacted summary is copied into public content.

## First interview — five questions

1. **Which one or two activities best represent the work you want to be hired to do next, and why?** Please choose from property portfolio analysis, hotel income/expense review and acquisition, organizational-culture improvement, DX study sessions, culture-club planning/operations, government-collaboration competition support, or another activity.
2. **For the top candidate, what did you personally own?** What did you decide or create yourself, what was collaborative, and what was owned by a manager, specialist, partner, or public body?
3. **What problem or change triggered that activity, and what alternatives did you compare before acting?** For the culture project, please also explain why the measure changed from roundtables to 360-degree feedback/coaching, without assuming it was a pre-planned multi-year strategy.
4. **What can be stated as an observed result or current progress—and what did not work or remains unresolved?** Qualitative reactions and continuation decisions are welcome; no numerical result is required.
5. **For that candidate, what may be public?** Please identify usable dates/period wording, organization/project names, numbers, images/documents/links, whether anonymization is needed, and whether it is completed, ongoing, or planned. Also clarify how 360-degree feedback differs from any personnel evaluation process and which future involvement of HR is only planned.

## Independent next steps while answers are pending

- Inventory dimensions/resolution and likely editorial use of existing originals.
- Define a type-safe public content schema with draft-by-default visibility, without inserting unconfirmed employment content.
- Prototype the selected direction on Home and one verified existing case after direction approval.
- Preserve existing URLs and establish redirects only after the final route map is approved.
- Browser-test desktop, mobile, keyboard, back navigation, touch-equivalent controls, and `prefers-reduced-motion`; record actual performance conditions rather than claiming an unmeasured score.

