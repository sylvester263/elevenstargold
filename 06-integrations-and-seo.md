# Integrations & SEO

## WhatsApp
See `03-header-and-footer.md` for placement. Technical note: `wa.me` links
need no API/token — they're plain URLs, so no integration credentials are
required for this piece.

## Social links
Plain outbound links driven by Site Settings (`05-admin-panel-and-blog.md`).
No API integration needed unless the client later asks for live feed embeds
(not in scope for v1).

## Contact form
- Fields: name, phone, email, project type (select, matching the 6 service
  lines), message.
- On submit: send to the client's email (from Site Settings) and show a
  confirmation state in the form's own voice — e.g. "Message sent. We'll
  reply within one business day." Not a generic "Thank you!" popup.
- Store submissions in the database as well as emailing them, so nothing is
  lost if an email bounces — surface them in a simple "Inquiries" list in
  the admin panel (add this as a 6th admin section if time allows; otherwise
  email-only is an acceptable v1 cut).

## SEO fundamentals
- `sitemap.xml` auto-generated from all published public routes (projects,
  blog posts, static pages) — regenerate on every publish, not just at
  build time, since projects/blog posts are added via the CMS.
- `robots.txt` disallowing `/admin/`.
- Meta title + description on every page; blog posts and projects use their
  own SEO fields from the admin panel, falling back to a sensible default
  built from the title if left blank.
- **Schema.org markup:** mark the site up as a `GeneralContractor` /
  `LocalBusiness` entity on the homepage (name, address, phone, founding
  info if available), and as `Article` on blog posts. This directly
  supports the "credibility and evidence" positioning — structured data is
  something a government tender reviewer's own tools may check.
- Open Graph + Twitter Card tags on every page, using the relevant cover
  image (project photo, blog cover, or a default site image for static
  pages).
- Image alt text is mandatory and content-specific (see
  `01-design-system.md` accessibility floor and `07-real-content-and-assets.md`
  for real project names/descriptions to use as the basis for alt text).

## Performance targets
- Lighthouse Performance ≥ 90 on the homepage and a representative project
  page.
- All images served through an optimized pipeline (responsive `srcset`,
  modern formats) — see `08-tech-stack-and-conventions.md`.
- No render-blocking third-party scripts beyond what's strictly required
  (font loading, and later, the client's own analytics tag if requested).
