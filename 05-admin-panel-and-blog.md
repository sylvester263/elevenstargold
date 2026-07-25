# Admin Panel & Blog CMS

## Purpose

A single non-technical admin (the client) needs to add and edit blog posts,
projects, certifications, and site-wide settings (contact info, WhatsApp
number, social links, ledger stats) without touching code or asking a
developer each time.

## Access

- `/admin` — login screen, email + password (single admin role is enough for
  v1; don't over-build a permissions system that isn't needed yet).
- All `/admin/*` routes: `noindex, nofollow`, and excluded from the public
  sitemap.xml.
- Session-based auth; a "forgot password" flow is required (email reset
  link) since this will be the client's only login.

## Admin sections

### 1. Dashboard
- Simple landing: counts of published projects, draft blog posts, and a
  shortcut to "New Blog Post."

### 2. Blog
- **List view:** title, status (draft/published), category, publish date,
  edit/delete actions.
- **Editor:** title, slug (auto-generated, editable), cover image upload,
  category (select from a small fixed list — e.g. Company News, Safety,
  Projects, Industry), excerpt, rich-text body (headings, bold/italic,
  lists, links, images — link insertion is required per the internal-linking
  rules in `02-sitemap-and-routes.md`), SEO meta title + description fields,
  publish/draft toggle, publish date.
- **Media:** image upload directly in the editor, stored and served
  optimized (see `08-tech-stack-and-conventions.md` for image handling).

### 3. Projects
- List + editor mirroring the blog structure: title, slug, client name,
  cost, completion year (or "In Progress"), category (Education / Healthcare
  / Government / Industrial / Housing), short write-up, photo gallery
  (multiple image upload, reorderable), publish/draft toggle.
- This is the same data that powers the homepage gallery preview, the full
  `/projects` page, and each `/projects/[slug]` detail page — one source of
  truth, no duplicate content entry anywhere.

### 4. Certifications
- Simpler list/editor: abbreviation, full name, description, certificate
  scan image upload, issuing body, (optional) expiry/renewal date for the
  client's own tracking.

### 5. Site Settings
Single settings screen covering everything that shouldn't require a code
change to update:
- Office address, phone numbers, email
- WhatsApp number + default prefilled message (per `03-header-and-footer.md`)
- Social links list (per `03-header-and-footer.md`)
- Homepage ledger stats (4 values + labels, per `04-homepage-sections.md`)
- Trust bar client list (add/remove/reorder names)

## What NOT to build in v1

- No multi-author roles/permissions.
- No comments system on blog posts.
- No newsletter/email capture (can be added later if requested).
- No page-builder / drag-and-drop layout editor — the homepage and other
  public pages are fixed templates that pull from the data above; only
  *content*, not *layout*, is editable from the admin panel.
