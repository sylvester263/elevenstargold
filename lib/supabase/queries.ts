// Public-site read queries against the live Supabase tables — replaces the
// old content/projects.ts static array and content/site-copy.ts's
// certifications list, per 08-tech-stack-and-conventions.md ("lib/supabase/
// -> client + queries"). Admin CRUD screens query these same tables
// directly inline (see app/admin/(dashboard)/*) rather than through here,
// since their column selections and write paths differ from what the
// public site needs.
//
// Uses the plain @supabase/supabase-js client rather than the cookie-aware
// @/lib/supabase/server one: every read here is public/anon-readable RLS,
// there's no session to forward, and generateStaticParams runs at build
// time with no request context — cookies() throws there.
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";

function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are not set. Check .env.local for local dev, or your build/deploy environment configuration (these are required at build time because generateStaticParams for /projects/[slug] queries Supabase).",
    );
  }

  return createSupabaseClient(url, key);
}

export type ProjectCategory =
  | "Education"
  | "Healthcare"
  | "Government"
  | "Industrial"
  | "Housing";

export type ProjectImage = { url: string; alt: string; sortOrder: number };

export type Project = {
  slug: string;
  title: string;
  client: string;
  cost: string;
  year: string;
  category: ProjectCategory;
  // First image in the array is the card/hero cover — set by admin gallery
  // order (the ↑/↓ reorder controls in ProjectForm), no separate is_cover
  // flag. Matches the convention /projects/[slug] already used for its hero
  // image before this card-thumbnail fix existed.
  images: ProjectImage[];
};

export type ProjectDetail = Project & {
  writeUp: string | null;
  images: ProjectImage[];
};

export async function getPublishedProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("slug, title, client, cost, year, category, images")
    .eq("published", true)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getPublishedProjects: Supabase query failed", error);
  }

  return (data ?? []).map((p) => ({ ...p, images: p.images ?? [] }));
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectDetail | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("slug, title, client, cost, year, category, write_up, images")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  // PGRST116 = "no rows" from .single() — a normal 404 (bad/unpublished
  // slug), not a failure worth logging. Anything else (auth, RLS, network)
  // is a real problem and should surface.
  if (error && error.code !== "PGRST116") {
    console.error(`getProjectBySlug(${slug}): Supabase query failed`, error);
  }

  if (!data) return null;

  return {
    slug: data.slug,
    title: data.title,
    client: data.client,
    cost: data.cost,
    year: data.year,
    category: data.category,
    writeUp: data.write_up,
    images: data.images ?? [],
  };
}

function parseCost(cost: string): number {
  const digits = cost.replace(/[^0-9]/g, "");
  return digits ? parseInt(digits, 10) : 0;
}

// contracts_delivered / largest_single_contract must be computed live from
// the Projects table, never typed into Site Settings — 07-real-content-and-
// assets.md, 09-launch-fixes.md P0-2. Cost is stored as formatted text
// (e.g. "₨560,000,000"), so the numeric max is computed here rather than
// via SQL MAX(cost).
export async function getLedgerComputedStats(): Promise<{
  contractsDelivered: number;
  largestContract: string;
}> {
  const projects = await getPublishedProjects();
  const amounts = projects.map((p) => parseCost(p.cost));
  const max = amounts.length ? Math.max(...amounts) : 0;

  return {
    contractsDelivered: projects.length,
    largestContract: max > 0 ? `₨${max.toLocaleString("en-US")}` : "—",
  };
}

export type GalleryImage = {
  url: string;
  alt: string;
  projectSlug: string;
  projectTitle: string;
};

// Reuses getPublishedProjects() rather than a separate query — /gallery has
// no content of its own, it's every published project's images flattened
// into one grid (02-sitemap-and-routes.md's "no separate content entry"
// principle, applied to a new route instead of a new table).
export async function getGalleryImages(): Promise<GalleryImage[]> {
  const projects = await getPublishedProjects();

  return projects.flatMap((p) =>
    p.images.map((img) => ({
      url: img.url,
      alt: img.alt || p.title,
      projectSlug: p.slug,
      projectTitle: p.title,
    })),
  );
}

export type TeamMember = {
  name: string;
  role: string;
  bio: string | null;
  photoUrl: string | null;
};

export async function getTeamMembers(): Promise<TeamMember[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = createClient();
  const { data, error } = await supabase
    .from("team_members")
    .select("name, role, bio, photo_url")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getTeamMembers: Supabase query failed", error);
  }

  return (data ?? []).map((m) => ({
    name: m.name,
    role: m.role,
    bio: m.bio,
    photoUrl: m.photo_url,
  }));
}

export type Certification = {
  abbr: string;
  fullName: string;
  description: string | null;
  issuingBody: string | null;
  scanUrl: string | null;
  expiryDate: string | null;
};

export async function getCertifications(): Promise<Certification[]> {
  // /certifications has no dynamic API usage (no params/cookies), so Next
  // attempts to statically prerender it at build time — unlike
  // /projects/[slug], there's no generateStaticParams to skip here. Same
  // build-safety guard as /projects/[slug]: degrade to an empty list rather
  // than crashing the build when Supabase isn't configured.
  if (!isSupabaseConfigured()) return [];

  const supabase = createClient();
  const { data, error } = await supabase
    .from("certifications")
    .select("abbr, full_name, description, issuing_body, scan_url, expiry_date")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getCertifications: Supabase query failed", error);
  }

  return (data ?? []).map((c) => ({
    abbr: c.abbr,
    fullName: c.full_name,
    description: c.description,
    issuingBody: c.issuing_body,
    scanUrl: c.scan_url,
    expiryDate: c.expiry_date,
  }));
}
