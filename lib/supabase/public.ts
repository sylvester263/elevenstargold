// Plain @supabase/supabase-js client for public, anon-readable RLS reads —
// no cookies forwarded, no session. Batch A perf audit: lib/settings.ts and
// lib/blog.ts previously used the cookie-aware @/lib/supabase/server client
// (which calls next/headers' cookies()) for these same anon-readable reads.
// Since cookies() is a Request-time API, and getSiteSettings()/getRecentPosts()
// are called from Footer/WhatsAppButton in the shared (public) layout, that
// forced *every* public page on the site into fully dynamic rendering —
// the root cause of the page-level `revalidate` exports otherwise being
// inert. RLS (site_settings_public_read, blog_posts_public_read_published)
// grants `anon` the same read access as `authenticated`, so there was never
// a session-dependent reason to use the cookie client here — this matches
// the pattern lib/supabase/queries.ts already used for projects/certifications/
// team_members.
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are not set. Check .env.local for local dev, or your build/deploy environment configuration.",
    );
  }

  return createSupabaseClient(url, key);
}
