# Progress

Running note of what's built and what's left, per the working conventions in
`08-tech-stack-and-conventions.md`. Keep this updated; a new session should
be able to resume from this file without re-reading the whole spec folder.

## ✅ 09-launch-fixes.md — all 15 items worked through

Note first: `00-README.md`'s revision note claims `01-design-system.md` was
rewritten to a charcoal/orange "animated, image-forward" direction, but the
actual file (unchanged mtime) still has the gold/navy/Zilla Slab/
no-animation system described below — the rewrite never got saved. Per the
user, proceeded with 09's punch list using the design system actually in
the repo (gold/navy), not the described-but-missing rebrand. Flagged, not
fixed — a real rebrand would need the actual new spec supplied first.

**P0 (all done):**
- Removed every literal TODO/placeholder string that rendered to the DOM
  (homepage ×2, About ×5, Services ×9, Safety, Certifications ×5, all 20
  project write-ups) — replaced with the real verbatim copy now in
  `07-real-content-and-assets.md`. `content/site-copy.ts` carries
  `companyHistory` (derived from the MD letter's opening, not invented),
  `capacity` (staff/machinery highlights), `ppe` (rendered as a real list
  on `/safety`), full `mdMessage`/`missionVision`/`hsePolicy`/`services`.
- `contracts delivered` / `largest single contract` are now **computed
  live** (`lib/supabase/queries.ts`'s `getLedgerComputedStats()` — COUNT +
  parsed MAX(cost), since cost is stored as formatted text like
  "₨560,000,000" not numeric) instead of typed into Site Settings.
  `lib/settings.ts` merges those 2 computed cells with the 2 remaining
  admin-editable ones (registrations/accidents) from `site_settings.
  ledger_stats`, which now only stores those 2. Admin Settings form/actions
  updated to only edit 2 cells, with a note explaining why the other 2
  aren't there. **Caught a real overflow bug** while verifying this: the
  long `₨560,000,000` string doesn't fit the ledger cell at the default
  `text-4xl` — `LedgerStrip.tsx` now scales down to `text-xl` for values
  over 9 characters.
  Projects table expanded from 12 to the full 20-row seed list in `07`
  (added the 3 HISDU, 2 more PHFMC, Palm Villas, and 2 PWWF rows).
- The two "broken/collapsed" homepage gaps: **Trusted-By→Services measured
  out as completely normal** (pixel-sampled the actual rendered background/
  content boundaries — 63px + 100px, matching each section's own declared
  padding, no bug, no change made). The Safety→MD gap **was real**: the MD
  section's placeholder image box used a flat `bg-paper` fill on a
  near-identical `--bg` page background (contrast so low it read as empty
  space) instead of the diagonal hairline pattern used by every other
  placeholder in the codebase — fixed to match.
- `app/not-found.tsx` — real branded 404 (self-contained Header/Footer/
  WhatsAppButton, since the root `not-found.tsx` only gets the root layout,
  not `(public)/layout.tsx`'s nested one — confirmed against the bundled
  Next.js docs, not memory).
- The "1 Issue" badge was Next's own dev-only route indicator (bottom-left
  `N` icon) — confirmed already stripped from production builds by Next
  itself; disabled it in dev too via `devIndicators: false` in
  `next.config.ts` since it visually overlapped content during dev/demo.

**P2 (all done):**
- Nav contrast: precisely computed (not eyeballed) — `text-muted-light` on
  `bg-navy` composites to a **6.52:1** contrast ratio, well above WCAG AA's
  4.5:1. Verified compliant, no change needed.
- SEO metadata: `lib/seo/metadata.ts`'s `buildMetadata()` already produces
  unique descriptions + canonical + OG/Twitter tags per page (verified via
  raw HTML, not just source) — the ONE real gap was the **homepage itself**
  had no metadata export at all, silently falling back to the bare root
  layout metadata (title/description only, no canonical/OG). Fixed by
  giving `/` its own `buildMetadata()` call.
- Contact page map: the iframe embed URL is correct and returns real map
  HTML on a real GET (verified — a HEAD-request curl check misleadingly
  404s; Google's embed endpoint doesn't handle HEAD). Map tile *imagery*
  doesn't render under headless-Chromium screenshots (a known limitation
  of that tooling for Maps embeds), but the embed's own "Open in Maps"
  control rendering confirms successful load/init.
- Mobile nav at 375px/414px: the first screenshot attempt (plain
  `msedge --window-size=375,700`) showed severe horizontal overflow —
  turned out to be a **testing-tool artifact** (Windows DPI scaling
  interacting with the CLI flag), not a real bug: confirmed via real CDP
  (`Emulation.setDeviceMetricsOverride`) that `document.body.scrollWidth`
  exactly matches the viewport at both widths, zero overflow, and a CDP
  screenshot shows correct single-column layout + working hamburger
  trigger. Clicking it via CDP (`Input.dispatchMouseEvent`) confirmed the
  slide-in drawer opens correctly with all 6 links.
  **Did catch a real issue this way**: a Base UI console warning ("1 Issue"
  dev overlay, distinct from the P0-5 route-indicator badge — this one
  Next surfaces even with `devIndicators: false` since it's a real runtime
  warning) — `Header.tsx`'s mobile `SheetClose` renders a `<Link>` instead
  of a native `<button>` without telling Base UI that's intentional. Fixed
  with `nativeButton={false}`.
- P2-15 (Grammarly hydration warning): per the audit's own note, no action
  needed.

## ✅ Supabase is live and the admin panel is reachable

The Supabase MCP is connected (project ref `pjfrbjnxfhejoofbmude`,
`https://pjfrbjnxfhejoofbmude.supabase.co`) and the schema migration has
been **applied to the live project** via `mcp__supabase__apply_migration`
(migrations: `initial_schema`, `fix_set_updated_at_search_path`) — all 5
tables (`projects`, `certifications`, `blog_posts`, `site_settings`,
`inquiries`), RLS policies, storage buckets (`project-images`,
`certification-scans`, `blog-media`), `updated_at` triggers, and the
seeded `site_settings` singleton row (`id=1`) exist for real now.
`supabase/schema.sql` is kept in sync as the source of record but is no
longer what needs running — the live DB already reflects it.

Security advisors ran clean except intentional-by-design "RLS policy always
true" warnings on the `authenticated`-role admin-write policies — expected,
since there's a single admin login with no per-row ownership model
(05-admin-panel-and-blog.md), not a bug.

`.env.local` is fully populated (URL, anon key, service role key,
`NEXT_PUBLIC_SITE_URL=http://localhost:3000` for dev) and the admin user
(`info@elevenstar.pk`) has been created in Authentication > Users.
Verified via headless screenshot of `/admin/login` on a fresh `npm run
dev` — real login form renders (no "Supabase isn't configured" notice, no
middleware 500). Have not yet verified an actual sign-in / CRUD round
trip since that needs the real password, which isn't available in this
session.

## ✅ Public site now reads from Supabase (projects, certifications, site settings)

The public site no longer reads from `content/projects.ts` (deleted) or
the static `certifications`/`trustBarClients` in `content/site-copy.ts`
(removed — moved to DB). Before swapping the reads, the live DB was seeded
via `execute_sql` with the exact same values the static files held, so the
visible content didn't change — verified with headless screenshots of `/`,
`/projects`, a project detail page, `/certifications`, and `/contact`
against a fresh `npm run dev`, byte-for-byte matching pre-swap content
(12 projects, 5 certifications, ledger stats, trust bar, office/phone/
email/WhatsApp).

- **`lib/supabase/queries.ts`** (new) — `getPublishedProjects()`,
  `getProjectBySlug()`, `getCertifications()`. Uses a plain
  `@supabase/supabase-js` client (not the cookie-aware
  `@/lib/supabase/server` one) because every read here is public/
  anon-readable RLS with no session to forward, and
  `/projects/[slug]`'s `generateStaticParams` runs at build time with no
  request context — `cookies()` throws there if you use the SSR client.
  Hit and fixed this for real (500 in dev) before landing on the plain
  client.
- **`lib/settings.ts`** — `getSiteSettings()` now queries the
  `site_settings` singleton row instead of returning a static object.
  Every call site already awaited it, so this was a one-line-per-field
  implementation swap, not a call-site rewrite (as the original TODO
  comment predicted).
- **`lib/blog.ts`** — `getRecentPosts()`/`getAllPosts()` now query
  `blog_posts` (`status = 'published'`). Table is still empty, so the
  footer's recent-posts column and `/blog`'s empty state look identical
  to before — zero visible change, just no longer hardcoded.
- **Call sites updated**: homepage, `/projects`, `/projects/[slug]`,
  `/certifications`, `components/marketing/ProjectGallery.tsx` (type
  import), `lib/service-category.ts` (type import).
- **`/projects/[slug]`** and **`/certifications`** now render
  `write_up`/`images` and `description`/`issuing_body`/`scan_url` from the
  DB when present (via `next/image`), falling back to the same TODO/
  placeholder blocks as before when those fields are empty — which they
  are for all seeded rows right now, so output is unchanged today but an
  admin edit will show up on the public site immediately, which is the
  actual point of the swap.
- **`next.config.ts`** — added an `images.remotePatterns` entry for
  `pjfrbjnxfhejoofbmude.supabase.co/storage/v1/object/public/**` so those
  `next/image` calls won't throw once an admin actually uploads a photo/
  scan.
- **`content/projects.ts`** deleted (superseded, per its own comment).
  `content/site-copy.ts` keeps only what's genuinely still static per
  `08-tech-stack-and-conventions.md` (`company` name/tagline/web/md,
  `mdMessage`, `missionVision`, `services`, `hsePolicy`) —
  `certifications`/`trustBarClients` removed since those are DB-backed
  now. Note: `company.address/email/phones` are still in that file as
  historical/seed reference but nothing reads them anymore — `settings.*`
  (DB-backed) is the live source for those three now.

Not done: swapping the *admin panel's own* reads was never needed (it
already queried Supabase directly per-page, inline — see
`app/admin/(dashboard)/*`). Blog content itself is still unpopulated —
that's a content task, not a wiring one.

## Done

- Next.js (App Router, TypeScript, Tailwind v4) scaffolded at repo root.
- Core deps installed: `@supabase/supabase-js`, `@supabase/ssr`, Tiptap
  (`@tiptap/react`, `starter-kit`, `link`, `image`).
- shadcn/ui initialized (uses `@base-ui/react`, not Radix — `Button` has no
  `asChild`; use the exported `buttonVariants()` + a plain `<Link>` for
  link-styled buttons, or the primitive's `render` prop, e.g.
  `<SheetClose render={<Link .../>} />`). Primitives added: button, input,
  label, textarea, select, dialog, dropdown-menu, card, badge, separator,
  sheet. (`form` not yet added — needs `react-hook-form`, add when building
  the first real form.)
- Design tokens wired in `app/globals.css` (`@theme`): all 12 colors from
  `01-design-system.md`, exposed as Tailwind utilities (`bg-navy`,
  `text-gold`, etc.) and mapped onto shadcn's semantic slots.
  `prefers-reduced-motion` handled globally. Note: Tailwind v4 uses a
  **trailing** `!` for `!important` (`py-16!`), not a leading one.
- Fonts wired in `app/layout.tsx`: Zilla Slab (`--font-display`, headings —
  applied globally to h1–h3 in `globals.css`), Inter (`--font-sans`, body),
  IBM Plex Mono (`--font-mono`, used explicitly on every stat/cost/date via
  `font-mono` — ledger numbers, project cost/year rows).
- Full route skeleton: every route from `02-sitemap-and-routes.md` builds
  clean under `app/(public)/*` and `app/admin/*`. Only `/` has real content;
  the rest are still `// TODO` stubs. `app/admin/layout.tsx` sets
  `noindex, nofollow` but has no real auth gate yet.
- `lib/supabase/client.ts` + `server.ts` — browser/server Supabase clients
  via `@supabase/ssr`. Needs `.env.local` populated from
  `.env.local.example` (Supabase project not yet created/connected) — not
  actually queried by anything yet.
- `lib/seo/metadata.ts` (OG/Twitter fallback builder) and `lib/seo/schema.ts`
  (GeneralContractor + Article JSON-LD builders) — stubs, not wired into any
  page yet.
- `lib/settings.ts` — interim static Site Settings source (whatsapp number/
  message, social links, ledger stats, trust bar list), matching the shape
  in `03-header-and-footer.md`/`05-admin-panel-and-blog.md` so swapping to a
  real Supabase-backed query later is a one-line change inside
  `getSiteSettings()`, not a call-site rewrite. Ledger's "contracts
  delivered" and "largest single contract" are intentionally left as `—`
  placeholders — the sample project data is a subset, don't ship a possibly
  wrong total.
- `lib/blog.ts` — `getRecentPosts()` stub returning `[]` until the blog CMS
  exists; footer's "recent posts" column correctly omits itself rather than
  showing dead links.
- `content/site-copy.ts` — real company basics filled in; mission/vision,
  MD's full letter, HSE full text, and all 9 service descriptions are
  `TODO` — **need the actual text from
  `COMPANY_FILE_ELEVEN_STAR_6-7-2026.pdf`**, do not invent copy for these.
- `content/projects.ts` — the 12 sample projects from
  `07-real-content-and-assets.md`, slugged, typed by category. Subset only —
  the source PDF's full completed-projects tables have more; add the rest
  via the Projects CMS once it exists, then delete this file.
- **Header** (`components/marketing/Header.tsx`) — sticky navy header, nav
  links, gold CTA, mobile slide-in drawer via shadcn `Sheet` at <880px.
- **Footer** (`components/marketing/Footer.tsx`) — 4-column layout + bottom
  bar with social icons (only rendered when a URL is set) + WhatsApp.
  Brand icons (WhatsApp/Facebook/Instagram/LinkedIn/YouTube) are hand-rolled
  inline SVGs in `components/marketing/icons.tsx` (lucide-react is a
  generic icon set, no brand marks).
- **WhatsApp FAB** (`components/marketing/WhatsAppButton.tsx`) — fixed
  bottom-right, all pages, WhatsApp green (the one deliberate palette
  break, per spec).
- **LedgerStrip**, **CertSeal**, **ServiceCard**, **ProjectCard**,
  **Section**/**SectionHeader** — signature marketing components in
  `components/marketing/`, per `01-design-system.md`.
- **Homepage** (`app/(public)/page.tsx`) — all 9 sections built in order:
  hero, ledger strip, trust bar, services grid, certifications, project
  gallery preview, HSE stats, MD message, footer CTA band.
- **Breadcrumbs** (`components/marketing/Breadcrumbs.tsx`) — real
  `<nav aria-label="breadcrumb">`, used on every non-homepage page. Note:
  it's styled for a **light** background only (`text-muted`/`text-ink`) —
  don't drop it on a navy strip without adding a dark variant (this bit us
  once on `/safety`, fixed by using the same light breadcrumb bar as every
  other page instead).
- **`components/marketing/ProjectGallery.tsx`** — the shared, reusable
  filterable project grid (superseded the homepage-only
  `ProjectFilterPreview.tsx`, which is deleted). Takes `projects`, optional
  `limit` (homepage preview caps at 9 + "view all" link), optional
  `initialCategory` + `syncUrl` (the `/projects` page reads
  `?category=` server-side and passes it in — avoids needing
  `useSearchParams`/`Suspense` client-side).
- **`lib/service-category.ts`** — the service→project-category mapping
  (moved out of the homepage into a shared module since `/services` and
  `/projects/[slug]` both need it). Still a first-pass editorial guess
  beyond the one example the spec gives (Renovation & Remodeling ↔
  Healthcare) — flag for client review.
- **`lib/slug.ts`** — tiny `slugify()` helper, used for `/services` section
  anchors (`#building-construction` etc.) that `/projects/[slug]` links to.
- **All remaining public pages built**, each with a light breadcrumb bar
  (`bg-paper`) + real data where available, TODO-boxes (not fabricated
  copy) where the source PDF content is still missing:
  - `/projects` — full filterable gallery (all 12 seed projects), category
    synced to `?category=` query param, compact light `LedgerStrip` at top.
  - `/projects/[slug]` — client/cost/year meta, placeholder gallery image,
    links back to category filter + relevant service, 2–3 related
    projects. Statically generated for all 12 known slugs
    (`generateStaticParams`).
  - `/services` — all 9 lines as anchored sections (numbered, id=slugified
    name), each linking to its mapped project-category filter.
  - `/certifications` — all 5 certs, each with a seal, TODO description
    block, and a placeholder A4-portrait scan block.
  - `/safety` — real headline stat + 3-up zero stats reused from the
    homepage; full policy text and PPE overview are TODO.
  - `/about` — compact ledger strip, MD full-letter/mission/vision TODO
    blocks, staff & machinery TODO.
  - `/contact` — **working form UI**: name/phone/email/project-type
    (native `<select>`, not shadcn's — see note below)/message, wired to a
    real Next.js Server Action (`app/(public)/contact/actions.ts`) via
    `useActionState`, inline (non-popup) confirmation message matching the
    spec's exact copy. **Not yet wired to email or a database** — the
    action validates and `console.log`s the submission only; see the
    `TODO` comment in `actions.ts` before treating this as a working
    contact channel. Office info + a Google Maps `output=embed` iframe
    (no API key needed) alongside the form.
  - `/blog` — real empty state ("No posts published yet") instead of fake
    sample posts, since there's no CMS/DB yet. `/blog/[slug]` 404s for any
    slug (`lib/blog.ts`'s `getAllPosts()`/`getRecentPosts()` both return
    `[]` until the CMS exists).
- Fixed a real layout bug caught during visual verification: applying grid/
  flex classes directly to the `Section` component's className doesn't
  work as expected — `Section` wraps `children` in its own inner
  `max-w-[1160px]` div, so a grid/flex utility on `Section` itself only
  ever has one grid/flex *item* (that inner div), not your actual content.
  Always put layout classes (`grid grid-cols-2`, `flex justify-between`,
  etc.) on a wrapper **inside** `Section`'s children, never on `Section`
  itself. Hit this in the hero, MD message, and footer-CTA sections on the
  homepage — all fixed.
- shadcn's `Select` (base-ui) wasn't used for the contact form's project
  type field — used a plain styled native `<select>` instead, to avoid
  unverified risk around base-ui's form-`name` integration. If a real
  shadcn `Select` is wanted later, check `@base-ui/react/select`'s form
  participation API first.
- Verified all of the above visually via headless Edge screenshots (Chrome
  browser tools weren't enabled this session — run `/chrome` to enable for
  next time) at multiple pages/viewport sizes; this is how the `Section`
  grid bug and the `/safety` breadcrumb-contrast bug were both caught.

### Admin panel + Supabase (this round)

- **`supabase/schema.sql`** — full schema: `projects`, `certifications`,
  `blog_posts`, `site_settings` (singleton, `id=1`), `inquiries`. RLS on
  every table (public reads published/all-settings rows; authenticated
  = full CRUD; `inquiries` is public-insert/admin-read-only). Storage
  buckets `project-images`, `certification-scans`, `blog-media` (public
  read, authenticated write) with policies. `updated_at` triggers. Not yet
  run against a real project — see the setup section above.
- **Auth**: `proxy.ts` (renamed from `middleware.ts` — Next.js 16 deprecated
  the `middleware` file convention in favor of `proxy`, same behavior/API,
  see `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`)
  + `lib/supabase/middleware.ts` (the
  `@supabase/ssr` session-refresh pattern) gate every `/admin/*` route
  except `/admin/login`, `/admin/forgot-password`, `/admin/reset-password`.
  `app/admin/actions.ts` has `login`/`logout`/`requestPasswordReset`/
  `updatePassword`; `app/auth/callback/route.ts` exchanges the
  password-reset email's code for a session. Routes reorganized into
  `app/admin/(auth)/*` (no shell) and `app/admin/(dashboard)/*` (sidebar
  shell, in `(dashboard)/layout.tsx`).
- **Graceful fallback when Supabase isn't configured** (`lib/supabase/is-configured.ts`,
  `isSupabaseConfigured()`): without this, `createServerClient()` throws on
  the empty/invalid URL, which crashed `proxy.ts` (then still
  `middleware.ts`) with a 500 on *every* `/admin/*` request — including the
  login page itself, caught via a real headless-browser check, not just
  reasoning about it. Now: proxy lets requests through unauthenticated when
  unconfigured, the
  `(dashboard)` layout shows a "Supabase isn't configured yet" notice
  instead of crashing, the auth Server Actions return a clean error state,
  and the public contact form shows an inline "not connected yet" message.
  All of this stops being hit once real credentials exist.
- **Dashboard** (`(dashboard)/page.tsx`) — live counts (published projects,
  draft posts) + "New Blog Post" shortcut.
- **Blog CRUD** (`(dashboard)/blog/`) — list, shared `BlogPostForm` (new +
  edit), `components/admin/RichTextEditor.tsx` (Tiptap, small fixed
  toolbar: bold/italic/h2/lists/link/image — JSON body stored in a hidden
  input, serialized on submit), cover image upload, category/status
  selects, SEO fields, delete. `published_at` only refreshes on the
  draft→published transition, not on every edit.
- **Projects CRUD** (`(dashboard)/projects/`) — list, shared `ProjectForm`,
  ordered image gallery (multi-upload, per-image alt text, ↑/↓ reorder,
  remove — plain buttons, not drag-and-drop), publish toggle, delete.
- **Certifications CRUD** (`(dashboard)/certifications/`) — simpler
  list/editor: abbr, full name, description, issuing body, scan upload,
  expiry date, sort order.
- **Site Settings** (`(dashboard)/settings/`) — one form over the
  `site_settings` singleton row: address/phones/email, WhatsApp
  number+message, the 4 fixed social platforms, the 4 fixed ledger cells,
  trust-bar client list (one per line).
- **Inquiries** (`(dashboard)/inquiries/`) — read-only list of contact-form
  submissions + delete. `app/(public)/contact/actions.ts` now actually
  `insert()`s into `inquiries` (still no email provider — see its TODO).
- **`lib/supabase/storage.ts`** (`uploadToBucket`) and
  **`components/admin/DeleteButton.tsx`** (confirm + `useTransition`,
  reused by all three CRUD list pages) — shared admin-only helpers.
- Server Actions needing a bound id use the `action.bind(null, id)` pattern
  with `useActionState` (e.g. `updatePost.bind(null, post.id)`) — bound
  args come first, `(prevState, formData)` are supplied by the hook.
- Import-path bug caught by the build (not just visual check): moving
  `login`/`forgot-password`/`reset-password` into the `(auth)` route group
  added a directory level, breaking their relative `../actions` imports.
  Fixed by switching those three to the `@/app/admin/actions` alias — more
  robust than relative paths across route-group moves.

## Not started

- Actually signing into `/admin` and exercising the CRUD screens against
  the live database — login form renders correctly (see setup section
  above) but no sign-in has been attempted in this session.
- Contact form → email notification (DB insert now works once Supabase is
  configured; see TODO in `app/(public)/contact/actions.ts`).
- sitemap.xml generation, robots.txt, schema markup usage (builders exist
  in `lib/seo/schema.ts` but aren't called anywhere yet) —
  `06-integrations-and-seo.md`.
- Real assets (`07-real-content-and-assets.md`): certification scans,
  trust-bar client logos, MD portrait, project photos — all placeholders
  currently (neutral hairline-pattern blocks, not stock photography).
- Remaining historical projects from the source data (older PESSI hospital
  repairs, PHE drainage/soling schemes, TMA street/sewerage works, the
  general list's church/BHU/school jobs, in-progress PESSI contracts) — 20
  of ~100 are entered now (the "highest-value/most presentable" set per
  `07-real-content-and-assets.md`); `contracts delivered`/`largest single
  contract` are computed live so adding more via the admin panel just
  works, no code change needed.
- Real copy is now fully wired (company history, MD's full letter, mission/
  vision, HSE policy, PPE, all 9 service descriptions, all 20 project
  write-ups) — see the 09-launch-fixes.md section above. What's still
  outstanding is *assets*, not copy: certification scans, trust-bar client
  logos, MD portrait, and most project photos are still placeholders
  (client hasn't supplied usable files yet — see `07`'s photography notes).

## Environment notes

- Node.js is installed at `C:\Program Files\nodejs`; added to User PATH,
  but this tool's PowerShell session doesn't pick up env changes made via
  the registry mid-session — prepend `$env:PATH = "C:\Program
  Files\nodejs;$env:PATH"` at the start of any command that needs
  `node`/`npm` until a fresh session confirms the PATH change stuck.
- No git repository initialized in this directory yet.
- Chrome browser tools weren't enabled this session (`claude-in-chrome`
  skill reported browser tools off) — visual verification was done via
  `msedge.exe --headless --screenshot` instead. Run `/chrome` to enable
  Chrome tools for a more interactive check next time.
- Dev server (`npm run dev`) was left running on port 3000 during this
  session for visual verification — check if it's still up before starting
  a new one.
- `middleware.ts` → `proxy.ts`: Next.js 16 renamed the file convention
  (`export function middleware` → `export function proxy`, same behavior/
  matcher config) — done, confirmed via
  `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`.
  `lib/supabase/middleware.ts` is an unrelated plain helper module, not the
  file convention, and keeps its name. Verified with a clean `npm run dev`
  (deleted `.next`, killed orphaned dev-server processes first — Next's
  dev-server lock will refuse to start a second instance in the same dir,
  and on Windows a killed `run_in_background` bash wrapper doesn't always
  take the child `node.exe` with it, so check `netstat`/`Get-Process` for
  leftovers if `npm run dev` errors with "already running") + headless
  screenshot: no deprecation warning, `/admin` still redirects to
  `/admin/login` exactly as before.
