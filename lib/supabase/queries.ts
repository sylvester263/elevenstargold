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

export type Project = {
  slug: string;
  title: string;
  client: string;
  cost: string;
  year: string;
  category: ProjectCategory;
};

export type ProjectImage = { url: string; alt: string; sortOrder: number };

export type ProjectDetail = Project & {
  writeUp: string | null;
  images: ProjectImage[];
};

export async function getPublishedProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = createClient();
  const { data } = await supabase
    .from("projects")
    .select("slug, title, client, cost, year, category")
    .eq("published", true)
    .order("created_at", { ascending: true });

  return data ?? [];
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectDetail | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = createClient();
  const { data } = await supabase
    .from("projects")
    .select("slug, title, client, cost, year, category, write_up, images")
    .eq("slug", slug)
    .eq("published", true)
    .single();

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
  const { data } = await supabase
    .from("certifications")
    .select("abbr, full_name, description, issuing_body, scan_url, expiry_date")
    .order("sort_order", { ascending: true });

  return (data ?? []).map((c) => ({
    abbr: c.abbr,
    fullName: c.full_name,
    description: c.description,
    issuingBody: c.issuing_body,
    scanUrl: c.scan_url,
    expiryDate: c.expiry_date,
  }));
}
