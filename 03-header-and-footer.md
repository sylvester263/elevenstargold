# Header & Footer

These render on every public page (not on `/admin/*`, which has its own
layout — see `05-admin-panel-and-blog.md`).

## Header

- Sticky, `--navy` background, `1px` `--line-dark` bottom border.
- Left: brand mark (square, gold outline, "ES" monogram) + wordmark
  "Eleven Star Gold" with a small tracked-out sub-label "ENGINEERING &
  CONSTRUCTION" beneath, in gold.
- Center/right: nav links — `Services / Projects / Certifications / Safety /
  Blog / Contact`. (Blog was added to nav now that the CMS exists — it
  wasn't in the original static mockup.)
- Far right: solid gold CTA button, "Request a Quote" → `/contact`.
- **Mobile (<880px):** nav links collapse into a slide-in drawer from the
  right, triggered by a hamburger button. Drawer background `--navy`, links
  in `--muted-light`/white, same order as desktop. CTA button stays visible
  in the header, outside the drawer.

## Footer

Four-column layout above a bottom bar (matches the approved mockup):

1. **Column 1 — About:** short one-line tagline ("Engineering Services — We
   Build For You.") + office address. See `07-real-content-and-assets.md`
   for exact text.
2. **Column 2 — Contact:** email (`mailto:`), both phone numbers (`tel:`),
   and the WhatsApp link (see below).
3. **Column 3 — Company:** links to `/services`, `/certifications`, `/safety`,
   `/about`.
4. **Column 4 — Work:** links to `/projects`, `/projects?category=government`
   (or whichever category is most current), and the **3 most recent blog
   posts** pulled live from the CMS — this is the standing internal-link
   backbone described in `02-sitemap-and-routes.md`, so it must be dynamic,
   not hardcoded.

Bottom bar: `© Eleven Star Gold, Sheikhupura.` on the left, domain on the
right, plus a row of **social media icons** between them:
- WhatsApp
- Facebook
- Instagram
- LinkedIn
- YouTube (only include icons for platforms the client actually has accounts
  on — don't ship dead links; make the icon list driven by a `social_links`
  entry in Site Settings in the admin panel, so icons for platforms without a
  URL simply don't render)

## WhatsApp

Two placements:
1. **Footer icon** (above) — a standard `https://wa.me/<number>` link.
2. **Floating action button** — bottom-right corner, all pages, persistent
   across scroll. Circular, WhatsApp-green icon on a white or subtle-shadow
   background (this is the one place on the site allowed to break from the
   navy/gold palette, since WhatsApp's brand recognition matters more here
   than palette purity). Opens `https://wa.me/<number>?text=Hi%2C%20I%27d%20like%20to%20request%20a%20quote%20for%20a%20project.`
   in a new tab.
3. Both the phone number and the pre-filled message text should come from
   Site Settings in the admin panel (see `05-admin-panel-and-blog.md`), not
   be hardcoded — the client will want to change the message wording without
   a code deploy.

## Social links data model

Store in Site Settings as a simple list of `{ platform, url }` pairs so the
footer and any future placements read from one source of truth:

```
whatsapp_number: string (E.164 format, e.g. +923336288862)
whatsapp_default_message: string
social_links: [
  { platform: "facebook", url: "" },
  { platform: "instagram", url: "" },
  { platform: "linkedin", url: "" },
  { platform: "youtube", url: "" }
]
```
