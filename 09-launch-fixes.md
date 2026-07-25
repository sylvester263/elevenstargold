# Launch Fixes — from the site audit

This file is a direct response to a full-site audit run against the live
build. Work through it in priority order. Each item names the audit finding
it addresses. Read `07-real-content-and-assets.md` alongside this file for
the actual copy needed in P1 — it now has full verbatim text, not pointers.

## P0 — Fix first (broken/embarrassing, blocks anything else mattering)

1. **Remove every literal placeholder/TODO string from production**, including
   ones that name an internal file directly (e.g. "TODO: MD pull-quote —
   source PDF p.3", "not included in the source data pulled from
   `07-real-content-and-assets.md`"). Audit found these live on the
   homepage (×2), About, Services (all 9), Projects listing, the FCCU
   project detail page, and all 5 certifications. Root cause: the original
   content spec told Claude Code to "pull text from the source PDF" instead
   of providing the text, and that instruction was used as literal body
   copy. Fix: replace every one of these fields with the actual text now in
   `07-real-content-and-assets.md`. Going forward, if a content field is
   genuinely not yet available, render an explicit empty/draft state (the
   blog's "No posts published yet" pattern is the right model) — never a
   sentence describing what should go there, and never a reference to a
   spec filename in anything that renders to the DOM.

2. **Fix the two broken headline stats** ("contracts delivered" and
   "largest single contract" render as "—" everywhere the stat strip
   appears — homepage, Projects page). Per `07-real-content-and-assets.md`,
   these should be computed live from the Projects table (`COUNT` and
   `MAX(cost)`), not typed into Site Settings. Verify both values populate
   correctly once real project rows exist.

3. **Fix the two blank/collapsed layout gaps** on the homepage: between
   "Trusted By" and "Services," and between "Safety" and the "Managing
   Director" section. These read as broken sections, not intentional
   whitespace — check for an empty wrapper, a collapsed-height container
   (e.g. a section rendering with no children yet still taking padding), or
   a missing content bind. Confirm the fix by inspecting actual rendered
   height/margins against `01-design-system.md`'s section rhythm (104px/64px
   padding) — the gaps found were noticeably larger than that spec.

4. **Build a real branded 404 page.** Currently a generic unbranded black
   screen with no header, footer, or way back to the site. Fix: use the
   standard header + footer (per `03-header-and-footer.md`), an on-brand
   message, and a clear link back to the homepage — treat it as a normal
   page in the site, not an escape hatch.

5. **Remove the "1 Issue" red badge overlay** pinned to the bottom-left
   corner on every page (it was seen overlapping real content, e.g. the
   "Industrial Construction" service card). Confirm whether this is a
   dev-only QA/annotation tool (most likely) and ensure it is excluded from
   the production build entirely — it should never be reachable outside a
   local/dev environment.

## P1 — Content (now unblocked — see `07-real-content-and-assets.md`)

6. **About page** — populate Company History (use the MD message's opening
   paragraphs as a basis), the full MD letter, Mission, Vision, and a short
   "Our Capacity" section drawing from the staff/machinery overview. This
   is flagged in the audit as the page most likely to be read by a
   government/institutional evaluator — prioritize it right after the P0
   items above.

7. **Services page** — replace all 9 placeholder descriptions with the real
   one-line descriptions now in `07-real-content-and-assets.md`.

8. **Safety page** — replace the HSE policy placeholder with the full
   verbatim text provided (do not paraphrase or shorten it — it's the
   client's own policy language). Add a short "Safety Equipment & PPE"
   section using the PPE items listed in the machinery overview (helmets,
   gloves, safety boots, first aid kits, dust masks/respirators, fire
   extinguishers).

9. **Certifications page** — replace the placeholder description text on
   all 5 entries. Certificate scan images are still pending from the
   client (see notes in `07`) — until supplied, show a clean, on-brand
   "certificate image pending" placeholder state, not descriptive text
   about what's missing.

10. **Project detail pages** — replace placeholder write-ups with short,
    real descriptions built from the project data table in `07` (client,
    scope implied by category, cost, year) — a few sentences per project is
    enough; don't invent scope detail not present in the source data.

## P2 — Technical, accessibility, and polish

11. **Header nav contrast** — audit flagged the muted-gray nav text on the
    dark background as lower-contrast than the rest of the palette. Check
    against WCAG AA using the actual token values in
    `01-design-system.md` and adjust the muted-text token's opacity/value
    if it fails, rather than a one-off fix just for the header.

12. **Per-page SEO metadata** — title tags already update correctly per
    route, but meta description is identical sitewide. Add a unique meta
    description per page (and per project/blog post once populated), plus
    Open Graph tags and a canonical URL tag — none of these were found.
    This is already specified in `06-integrations-and-seo.md`; it just
    wasn't implemented yet.

13. **Contact page map** — add an embedded map (office address from
    `07-real-content-and-assets.md`) alongside the existing contact form,
    which the audit otherwise found well-built.

14. **Verify mobile nav rendering on a real breakpoint.** The slide-in
    drawer exists in code (correctly hidden above 880px), but couldn't be
    visually verified in the audit session due to a fixed browser viewport.
    Confirm it actually renders and functions correctly at common mobile
    widths (375px, 414px) before considering navigation complete.

15. **Ignore the Grammarly-related React hydration console warning** flagged
    in the audit — it traced to a browser extension injecting DOM
    attributes, not a real site bug. No action needed.

## Not yet addressed (flag back to the client, not a code fix)

- No blog posts exist yet — the empty state is handled correctly, but it's
  worth confirming with the client whether blog content is actually planned
  soon, since an empty blog with no context can look unfinished to a visitor
  who finds it.
- Real project photography and certificate scans are still pending from the
  client for most entries — track this separately; it's a client
  deliverable, not a build task.
