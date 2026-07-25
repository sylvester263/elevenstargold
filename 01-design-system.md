# Design System

**Revision note (superseding earlier version):** the first draft of this file
was built around a "gold" accent inferred from the company name before the
real logo was available. The client has since shared the actual brand mark
(charcoal + orange) and asked for a modern, animated, image-forward site in
the register of contractor sites like Maveric Contractors and Avendo
Construction (Webflow) rather than the earlier austere "government ledger"
treatment. This file reflects the corrected direction. Discard the gold/navy
palette and the "no animation" rule from any earlier notes — they no longer
apply.

## Design philosophy

**"Modern Industrial Professional."** Confident, current, and built around
real project imagery — not a static document. The audience is still
institutional and B2B (see `07-real-content-and-assets.md` for who the real
clients are), so the site should stay credible and evidence-backed, but the
*expression* is contemporary: big photography, smooth scroll-driven
animation, subtle depth/3D touches — closer to a polished agency-built
Webflow site than a printed company profile.

## Color tokens (sourced directly from the client logo)

```css
--ink:          #232323;   /* primary text, near-black */
--charcoal:     #545454;   /* primary brand gray — exact value from logo */
--charcoal-dark:#3A3A3A;   /* darker surface, header/footer/hero backgrounds */
--charcoal-deep:#1E1E1E;   /* deepest surface, for high-contrast hero sections */
--orange:       #FF6600;   /* primary brand accent — exact value from logo */
--orange-dark:  #E05A00;   /* pressed/active state */
--orange-tint:  #FFF1E6;   /* very light orange wash for subtle section backgrounds */
--bg:           #F7F7F5;   /* page background, light sections */
--paper:        #FFFFFF;   /* card/panel background */
--line:         #E4E3E0;   /* hairline rules on light backgrounds */
--line-dark:    rgba(255,255,255,0.14); /* hairline rules on dark backgrounds */
--muted:        #6E6E6E;   /* secondary text on light */
--muted-light:  rgba(255,255,255,0.66); /* secondary text on dark */
```

Orange is the **only** accent color. Never introduce a second accent hue
(no blue links, no green success states) — everything that needs to draw
the eye uses `--orange`, everything structural uses `--charcoal` /
`--charcoal-dark`.

## Logo usage

- Use the supplied logo file as-is (building icon + "ESG Engineering
  Services / We Build For You" wordmark). Do not recolor it, do not
  simplify it into a monogram for the header — the full lockup is small
  enough to work in the header at an appropriate size.
- On dark backgrounds (header, hero, footer), the logo's charcoal reads
  fine against `--charcoal-dark`/`--charcoal-deep` as long as there's enough
  contrast — test at actual header height; if contrast is too low, use the
  client's reversed/white version of the logo if one exists, otherwise ask
  the client for one rather than recoloring it yourself.
- Minimum clear space and minimum size: keep the logo readable at mobile
  header height (~40px tall) — don't let the wordmark shrink past
  legibility; drop to icon-only on very small screens if needed.

## Typography

Move away from the earlier slab-serif "official document" pairing — it read
too formal for this direction. Use a modern geometric/grotesk pairing:

- **Display / headings:** **Sora** (600/700) — confident, geometric, reads
  as contemporary-industrial. Used for all `h1`–`h3` and big stat numbers.
- **Body:** **Inter** (400/500/600) — paragraphs, nav, buttons, labels, forms.
- **Numerals/stats (optional accent use):** IBM Plex Mono can still be used
  sparingly for small data labels (project cost/year tags on cards) if you
  want a technical touch, but it is no longer the dominant typographic
  signature it was in the earlier draft — don't force it everywhere.

Google Fonts import:
```
Sora:wght@400;500;600;700;800
Inter:wght@400;500;600;700;800
IBM+Plex+Mono:wght@400;500 (optional, small-scale use only)
```

## Hero & imagery direction

- Full-bleed, high-quality photography is now the primary visual language —
  not typography-on-texture as in the earlier draft.
- **Header/hero images:** until the client's own project photography is
  fully supplied, source professional, royalty-free construction/
  engineering photography (e.g. Unsplash) for placeholder hero imagery —
  never AI-generated "fake" construction photos, and never a competitor's
  copyrighted photography. Mark every placeholder clearly (e.g. a
  `data-placeholder="true"` attribute or a code comment) so they're easy to
  find and swap once real photos arrive.
- Treat the hero as: full-bleed photo → dark gradient overlay
  (`--charcoal-deep` at 55–75% opacity, heavier at the bottom where text
  sits) → logo-accurate orange used only for the headline emphasis word and
  the primary CTA button.
- Apply a subtle parallax or slow Ken-Burns-style scale (imperceptibly slow
  zoom, 20–40s duration) on hero imagery for a modern feel — always paired
  with a `prefers-reduced-motion` fallback that freezes the image.

## Motion (revised — animation is now a deliberate feature, not something to avoid)

- **Scroll-reveal animations:** sections and cards fade/slide in on scroll
  (8–16px translate + opacity, 400–600ms, eased) — this is expected and
  desired now, unlike the earlier draft.
- **Card hover:** lift (`translateY(-4px)`) + shadow growth + a slight
  image zoom inside the card (`scale(1.04)` on the photo only, clipped by
  `overflow:hidden`) — a common, effective "3D-ish" touch for project cards
  without needing true 3D.
- **Numbers that count up** (e.g. "500+ projects delivered") are appropriate
  for a stat section here, animated once when scrolled into view.
- **True 3D:** if the client wants literal 3D (rotating building model,
  WebGL scene), that's a distinct, heavier scope — flag it back to the
  client to confirm before building, since it affects load time and the
  tech stack (would need a library like Three.js/Spline embed). Default to
  well-executed 2.5D (parallax layers, tilt-on-hover cards) unless true 3D
  is explicitly confirmed.
- Every animation must have a `prefers-reduced-motion: reduce` fallback that
  shows content in its final state with no motion.
- Avoid animation that delays the user from reading real content — reveal
  animations should never exceed ~600ms or block scrolling.

## Certification / credential component

Keep the circular "seal" concept from the earlier draft, restyled to the new
palette:
- Circular, `1px dashed rgba(255,102,0,0.5)` border (orange, not gold), with
  a thin solid inset ring.
- Center: abbreviation in Sora bold + `--charcoal`, full name in small
  `--muted` text beneath.

## Layout rules

- Max content width: `1200px`, centered, `32px` side padding (`16px` mobile).
- Section vertical rhythm: `104px` top/bottom padding desktop, `64px` mobile
  — slightly more generous than the earlier draft to let large imagery
  breathe.
- Cards use soft shadows on hover (see Motion) rather than the earlier
  hairline-only treatment — imagery-led cards read better with a touch of
  elevation.

## Responsive breakpoints

- `880px`: collapse multi-column grids to 2 columns, stack hero content
  over/under imagery, collapse nav into a slide-in drawer.
- `600px`: collapse to 1 column everywhere.

## Accessibility floor (unchanged)

- Visible keyboard focus states on every interactive element.
- Color contrast: body text on `--bg`/`--paper` and on `--charcoal-dark`/
  `--charcoal-deep` must both meet WCAG AA — check specifically where text
  sits directly on a photo; the gradient overlay must be dark enough to
  guarantee this, not just look good.
- All images require real, descriptive alt text.
- All scroll/hover/parallax animation respects `prefers-reduced-motion`.
