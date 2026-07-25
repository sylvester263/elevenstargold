# Design System

Applies to every page. This is the approved direction from the homepage
mockup — implement it exactly, don't reinterpret.

## Design philosophy

"Institutional Trust & Scale." The audience is government procurement
officers, institutional facilities managers, and tender committees — not
homeowners. Every design decision should read as *credible and evidenced*,
never as *decorative or aspirational*. When in doubt, choose the more
document-like, less lifestyle-marketing option.

## Color tokens

```css
--bg:          #F5F3EE;   /* page background, light sections */
--paper:       #FBFAF7;   /* card / panel background */
--ink:         #191C20;   /* primary text on light */
--navy:        #0F1E33;   /* dark section background (header, hero, footer) */
--navy-2:      #16263F;   /* secondary dark surface */
--gold:        #C6A130;   /* primary accent — ties to "Gold" in the name */
--gold-bright: #E4C563;   /* accent on dark backgrounds, hover states */
--line:        #DAD5C8;   /* hairline rules on light backgrounds */
--line-dark:   rgba(255,255,255,0.14); /* hairline rules on dark backgrounds */
--muted:       #6B6E74;   /* secondary text on light */
--muted-light: rgba(245,243,238,0.62); /* secondary text on dark */
--rust:        #9C4430;   /* sparing use only — safety/warning accents */
```

Never introduce a second accent hue (no blue links, no green success color)
without checking here first — the palette is deliberately narrow.

## Typography

- **Display / headings:** Zilla Slab (600/700). Used for all `h1`–`h3`,
  the MD quote, and big ledger numbers.
- **Body:** Inter (400/500/600). Used for paragraphs, nav, buttons, labels.
- **Data / figures:** IBM Plex Mono (400/500/600). Used for **every number**
  that represents money, a date, a count, or a stat — project costs, years,
  the ledger strip, project meta rows. This is a deliberate signature: numbers
  always look like ledger/tender-document entries, never like marketing
  copy.

Google Fonts import:
```
Zilla+Slab:wght@400;500;600;700
Inter:wght@400;500;600;700;800
IBM+Plex+Mono:wght@400;500;600
```

## Signature component: the Ledger strip

This is the one memorable element of the site — reuse it, don't dilute it
by inventing a second "stats bar" style elsewhere.

- A horizontal strip of stat cells separated by 1px hairlines (`--line-dark`
  on dark backgrounds, `--line` on light).
- Each cell: a large IBM Plex Mono number (`--gold-bright` on dark, `--ink`
  on light) + a short lowercase label beneath in `--muted-light` / `--muted`.
- Optional small monospace tag in the corner (e.g. `LOG.01`) — this is a
  deliberate "ruled ledger page" reference, drawn from the client's own
  cost-table documents. Keep it subtle (low opacity), never decorative.
- Used on: homepage hero (main appearance), and as a compact variant at the
  top of the Projects and About pages (e.g. "46+ contracts / ₨900M+
  delivered / 0 accidents").

## Certification "seal" component

- Circular, dashed gold border (`1px dashed rgba(198,161,48,0.55)`), with a
  second thin solid ring inset 8px.
- Center: an abbreviation in Zilla Slab bold + gold-bright, and the full name
  in small muted-light text beneath.
- Used only for statutory registrations/certifications — don't reuse this
  shape for anything else, it should stay meaningfully tied to "this is an
  official credential."

## Layout rules

- Max content width: `1160px`, centered, `32px` side padding (`16px` on
  mobile).
- Section vertical rhythm: `96px` top/bottom padding on desktop, `56px` on
  mobile.
- Section headers: eyebrow (uppercase, gold, 12px, letter-spacing 0.14em) →
  heading → optional right-aligned description, all above a `1px` `--line`
  rule.
- Cards and grids use `1px` hairline borders (`--line`), not drop shadows, as
  the primary separator. Shadows are reserved for hover states only.

## Responsive breakpoints

- `880px`: collapse multi-column grids to 2 columns, stack hero, hide nav
  links (replace with a menu button — spec a simple slide-in drawer, not a
  full mega-menu).
- `600px`: collapse to 1 column everywhere except the ledger strip, which
  stays 2 columns.

## Motion

Minimal and intentional only:
- Card hover: `translateY(-3px)` + soft shadow, 150–180ms ease.
- Filter button state changes: instant background swap, no animation.
- Respect `prefers-reduced-motion: reduce` — disable all transitions.
- No scroll-triggered reveal animations, no auto-playing carousels. This
  audience reads as more credible when the site behaves like a stable
  document, not an interactive showcase.

## Accessibility floor

- Visible keyboard focus states on every interactive element (don't remove
  default outlines without replacing them).
- Color contrast: body text on `--bg`/`--paper` and on `--navy` must both
  meet WCAG AA.
- All images require real, descriptive alt text (see `07-real-content-and-assets.md`
  for content — never leave alt text empty on meaningful images).
