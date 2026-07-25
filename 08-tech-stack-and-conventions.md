# Tech Stack & Conventions

## Recommended stack

- **Framework:** Next.js (App Router), for built-in routing, image
  optimization, and SEO primitives (metadata API, sitemap generation).
- **Styling:** Tailwind CSS, with the tokens from `01-design-system.md`
  defined once in `tailwind.config` / CSS variables — never hardcode hex
  values in components.
- **Component primitives:** shadcn/ui for accessible base components
  (buttons, form fields, dialogs, dropdowns) — restyle every primitive with
  the design tokens rather than shipping shadcn's default theme. When
  composing a section that needs a well-proven layout pattern (e.g. a
  filterable grid, a stat strip, a pricing-style card), it's fine to look at
  component patterns from a reference library like **21st.dev** for
  structural/UX inspiration — but always re-skin the result fully to this
  design system. Never ship a section that visually reads as a generic
  template; the point of referencing these libraries is proven UX
  structure, not visual identity.
- **Database + Auth + storage (blog/projects/certifications/media, admin
  login):** Supabase — Postgres for content, Supabase Auth for the single
  admin login, Supabase Storage for uploaded images. (A connector for
  Supabase is already available in this environment if building here.)
- **Rich text editor (blog body):** a lightweight editor (e.g. Tiptap) is
  sufficient — full page-builder editors are out of scope per
  `05-admin-panel-and-blog.md`.
- **Image handling:** Next.js `<Image>` for all real photography, sourced
  from Supabase Storage; responsive `srcset` generated automatically.
  Never inline base64 images in components.

## Folder structure (indicative)

```
/app
  /(public)
    /page.tsx                 -> homepage
    /about/page.tsx
    /services/page.tsx
    /projects/page.tsx
    /projects/[slug]/page.tsx
    /certifications/page.tsx
    /safety/page.tsx
    /blog/page.tsx
    /blog/[slug]/page.tsx
    /contact/page.tsx
  /admin
    /page.tsx                 -> dashboard
    /login/page.tsx
    /blog/...
    /projects/...
    /certifications/...
    /settings/page.tsx
/components
  /ui/                         -> restyled shadcn primitives
  /marketing/                  -> Ledger, Seal, ProjectCard, ServiceCard, etc.
  /admin/                      -> admin-only components
/lib
  /supabase/                   -> client + queries
  /seo/                        -> metadata helpers, schema.org builders
/content
  /site-copy.ts or .json       -> static copy from 07-real-content-and-assets.md
                                  that isn't in the CMS (mission/vision, HSE
                                  policy full text, service descriptions)
```

## Naming conventions
- Components: PascalCase, one per file (`LedgerStrip.tsx`, `ProjectCard.tsx`,
  `CertSeal.tsx`).
- Routes/slugs: kebab-case (see `02-sitemap-and-routes.md`).
- CSS variables: as defined in `01-design-system.md`, never renamed or
  duplicated with different values elsewhere.

## What content lives in the CMS vs. in code
- **In the CMS (admin-editable):** blog posts, projects, certifications,
  site settings (contact info, WhatsApp, social links, ledger stats, trust
  bar names).
- **In code/static content file:** mission/vision statement, full HSE policy
  text, service line descriptions, MD's full "about" letter — these change
  rarely enough that a code deploy for edits is acceptable, and keeping them
  static avoids over-building CMS screens the client won't use often. If the
  client asks to edit these themselves later, add them to Site Settings as a
  follow-up — don't over-build for that up front.

## Working conventions for the coding session itself
- Read only the spec file(s) relevant to the current task (per
  `00-README.md`) — don't re-read the whole spec folder on every turn.
- Once a page or component is built, don't regenerate it from scratch for
  small copy or content changes — edit in place.
- Keep a running note (e.g. `PROGRESS.md` in the repo root, not in this spec
  folder) of what's been built and what's left, so a new session can resume
  without re-reading every file to reconstruct state.
