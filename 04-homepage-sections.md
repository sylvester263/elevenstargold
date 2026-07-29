# Homepage Sections

Build in this order. Copy is already final (from the approved mockup) — pull
exact strings from `07-real-content-and-assets.md`, don't rewrite them.

## 1. Hero
- `--navy` background with the subtle diagonal hairline texture from the
  mockup (a faint repeating diagonal line pattern at ~5% gold opacity — not
  a photo background).
- Left: eyebrow, `h1` ("We build the buildings *government trusts.*" — "government
  trusts" in gold), lede paragraph, two CTAs ("View Completed Projects" →
  `/projects`, "See Our Certifications" → `/certifications`).
- Right: MD quote pull, sourced live from the same content used on `/about`
  (don't duplicate as static copy — pull from one field so an edit in the
  admin panel updates both places).
- **Real image requirement:** this section currently has no photo — keep it
  that way for the initial build (the texture + typography carry it), OR if
  the client supplies a strong hero photo (e.g. the FCCU campus building
  exterior, finished), add it as a right-aligned or full-bleed background
  image at low opacity behind the navy overlay. Do not use a stock
  construction photo. Confirm with the client before adding any hero photo.

## 2. Ledger stat strip
- 4 cells: contracts count, largest single contract value, number of
  registrations held, safety target. See `01-design-system.md` for the
  component spec. Values should be **editable from Site Settings** in the
  admin panel (they'll need updating as contract counts grow) — don't
  hardcode the numbers in the template.

## 3. Trust bar
- Light `--paper` strip: "Trusted by" label + client names (PESSI, FCCU,
  PWWF, HISDU, PHFMC, HUBCO, TMA, PHE).
- Real logos: request actual client/government-body logos where usage is
  permitted (many public bodies have official emblems). Where a logo can't
  be used, keep the plain-text wordmark treatment from the mockup rather
  than fabricating a logo.

## 4. Services
- 6–9 cards (numbered `01`–`0X`), 3-column grid, 1px hairline dividers.
  Content in `07-real-content-and-assets.md`. Each card links through to its
  relevant project category per the internal linking rules.

## 5. Certifications
- `--navy` background, 5 seal components (PEC, PRA, FBR, Professional Tax
  Certificate, Chamber of Commerce).
- **Real image requirement:** each seal should link to `/certifications`,
  where the actual scanned certificate images (from the client's PDF pages
  05–08) are displayed at readable resolution. Request the original
  certificate scans/photos from the client rather than re-cropping the
  compressed PDF export — the PDF images are low-quality photocopies.

## 6. Project gallery preview
- Filter bar (All / Education / Healthcare / Government / Industrial /
  Housing) + 9-card grid, exactly as built in the mockup, but:
  - Each card's photo area must use a real project photo, not the gradient
    placeholder. See `07-real-content-and-assets.md` for which photo maps to
    which project and file-naming convention.
  - Cards link to `/projects/[slug]`.
  - This is a **preview** — show up to 9, with a "View all projects" link to
    the full `/projects` page for anything beyond that.

## 7. HSE / Safety
- Dark section, "zero accidents / zero injuries / zero property damage"
  three-up stat cards. Links through to `/safety` for the full policy text.

## 8. MD message
- Two stacked blocks, same layout: portrait + pull quote + signature block,
  for Asif Nemat (CEO) then Sir Atif Nemat (Co-Partner).
- **Real image requirement:** replace the gradient portrait block with an
  actual photo if the client provides one and approves its use publicly. If
  not provided, keep the styled placeholder — do not use a stock
  "businessman" photo.
- A third leadership block for the Managing Director will be added in a
  future update once that person is confirmed — do not add a placeholder
  for it now.

## 9. Footer CTA + footer
- See `03-header-and-footer.md`.

## Image specifications (all real-photo placements above)

| Placement | Aspect ratio | Min resolution | Notes |
|---|---|---|---|
| Hero background (optional) | 16:9 or wider | 1920×1080 | Low-opacity, behind navy overlay |
| Trust bar logos | square-ish, transparent PNG | 200×200 | Transparent background required |
| Project card thumbnail | 3:2 | 800×533 | Consistent crop across all cards |
| Project detail gallery | mixed, original crop OK | 1600px on longest side | Multiple photos per project allowed |
| Certification scan | as scanned, portrait | 1240×1754 (A4 at 150dpi) | Prefer original scan over PDF export |
| MD portrait | 3:3.6 | 900×1080 | Matches the panel shape in the mockup |

File naming convention: `/images/<section>/<project-or-cert-slug>-<n>.jpg`,
e.g. `/images/projects/fccu-campus-center-01.jpg`.
