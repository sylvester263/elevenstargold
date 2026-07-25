# Eleven Star Gold — Website Build Spec (index)

This folder is the complete build spec for elevenstar.pk. It is split into
focused documents so a coding session only needs to open the file relevant to
the task at hand — not the whole folder, and not the codebase from scratch
each time.

**Rule for Claude Code:** before starting any task, identify which file below
covers it and read only that file (plus `01-design-system.md`, which applies
everywhere). Do not re-read files unrelated to the current task. Do not
re-derive design decisions already made in these docs — implement them as
specified.

## Revision note

`01-design-system.md` was rewritten after the client shared the real logo
(charcoal `#545454` + orange `#FF6600`) and asked for a modern, animated,
image-forward direction rather than the original gold/navy "government
ledger" treatment. **`01-design-system.md` is the source of truth on color,
type, and motion.** Any mention of gold, navy, Zilla Slab, or "no animation"
in the other files below is leftover from the earlier direction and is
superseded — apply the current `01` file instead wherever they conflict.
The other files' *structural* content (sitemap, admin panel scope, content
data, tech stack) is still accurate and unaffected by this change.

## Files in this spec

| File | Covers |
|---|---|
| `01-design-system.md` | Colors, type, spacing, the signature "ledger" component, responsive rules — applies to every page |
| `02-sitemap-and-routes.md` | Every URL the site has, page-by-page purpose, and the internal linking map |
| `03-header-and-footer.md` | Global nav, footer, WhatsApp button, social links |
| `04-homepage-sections.md` | Section-by-section spec for the homepage, in build order |
| `05-admin-panel-and-blog.md` | Admin login, CMS screens, blog system |
| `06-integrations-and-seo.md` | WhatsApp, social platforms, contact form, schema markup, sitemap.xml |
| `07-real-content-and-assets.md` | The actual company data (projects, certifications, HSE text, MD quote) and real-photo requirements — replaces all placeholder content |
| `08-tech-stack-and-conventions.md` | Stack choice, folder structure, naming conventions, component sourcing |
| `09-launch-fixes.md` | **Current priority** — a prioritized punch list fixing everything found in the client's live-site audit (broken placeholders, missing content, layout bugs, SEO gaps) |

## Right now: work from `09-launch-fixes.md`

The site is already built. The active task is no longer greenfield build —
it's the fix list in `09-launch-fixes.md`, which references the corrected
`07-real-content-and-assets.md` for all real copy. Read `09` first; open the
other files only as it points you to them.

## Build order (recommended, for reference / future greenfield sections)

1. Scaffold project per `08-tech-stack-and-conventions.md`
2. Implement design tokens from `01-design-system.md`
3. Build header + footer (`03`) — they appear on every page
4. Build homepage (`04`), wired to real content (`07`)
5. Build remaining public pages from the sitemap (`02`)
6. Build admin panel + blog (`05`)
7. Wire integrations + SEO (`06`)
8. Replace every placeholder image with real photography (`07`)

## What this project is

Eleven Star Gold is a Punjab-based civil contractor whose real clients are
government and institutional bodies (PESSI, PWWF, PHE, TMA, HISDU, PHFMC),
plus a few prestige private jobs (FCCU, Sacred Heart School). The design
direction — already approved — is **"Institutional Trust & Scale"**: the site
sells credibility, certifications, safety record, and completed-project
evidence, not lifestyle imagery. Every doc below assumes this positioning;
don't drift toward a generic "modern construction company" template.
