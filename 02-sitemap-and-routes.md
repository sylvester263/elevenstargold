# Sitemap, Routes & Internal Linking

## Public routes

| Route | Purpose |
|---|---|
| `/` | Homepage — see `04-homepage-sections.md` |
| `/about` | Company history, MD message, mission/vision, staff & machinery overview (from `07-real-content-and-assets.md`) |
| `/services` | All 9 service lines, each with its own anchor or sub-section |
| `/services/[slug]` | Optional: one page per service line if content grows (e.g. `/services/road-construction`) — start as anchors on `/services`, split out later if needed |
| `/projects` | Full filterable project gallery (categories: Education, Healthcare, Government, Industrial, Housing) |
| `/projects/[slug]` | Individual project detail page — photos, client, cost, year, category, a short write-up. **Every project card everywhere links here.** |
| `/certifications` | Full certification detail page — each seal expands to the actual registration (with a real scanned image where available) |
| `/safety` | HSE policy in full, zero-accident record, safety equipment/PPE overview |
| `/blog` | Blog index, paginated, filterable by category |
| `/blog/[slug]` | Individual blog post |
| `/contact` | Contact form, office address, map embed, WhatsApp + phone + email |
| `/admin/*` | Admin panel — see `05-admin-panel-and-blog.md` (not indexed, `noindex` + auth-gated) |

## Internal linking rules

Internal linking is a deliberate SEO structure, not incidental. Implement all
of the following:

1. **Every project card** (on `/`, `/projects`, and category filters) links
   to its own `/projects/[slug]` detail page.
2. **Every project detail page** links back to:
   - its category filter on `/projects?category=...`
   - 2–3 "related projects" in the same category (footer of the page)
   - the relevant service line on `/services` (e.g. a hospital repair project
     links to the "Renovation & Remodeling" service)
3. **Service cards on `/services`** link to `/projects?category=...` showing
   evidence of that service actually being delivered — services claim
   nothing that projects don't back up.
4. **Certification seals** on the homepage link to their full entry on
   `/certifications`.
5. **Footer** (see `03-header-and-footer.md`) links to every top-level route
   plus the 3 most recent blog posts — this is the standing internal-link
   backbone that appears sitewide.
6. **Blog posts** should internally link back to relevant project pages or
   service pages where the topic overlaps (e.g. a post about hospital
   maintenance standards links to the Healthcare project filter and to the
   `/safety` page). This is a manual editorial step for whoever writes the
   post in the admin panel, not an automated feature — but the blog post
   editor's rich-text field must support standard link insertion.
7. **Breadcrumbs** on every non-homepage page: `Home / Section / Page Title`,
   using real `<nav aria-label="breadcrumb">` markup, not decorative text.

## URL & slug conventions

- Lowercase, hyphenated, no dates in slugs: `/projects/fccu-campus-center`,
  not `/projects/2023-fccu-campus-center`.
- Category filters use query params, not separate routes:
  `/projects?category=healthcare`.
- Blog slugs are editorial-controlled from the admin panel (auto-generated
  from title, editable before publish).
