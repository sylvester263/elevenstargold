// Plain anon client, not the cookie-aware @/lib/supabase/server one — see
// lib/supabase/public.ts for why (Batch A perf audit: this file is called
// from Footer/WhatsAppButton in the shared public layout, so a cookies()
// dependency here was forcing every public page on the site into dynamic
// rendering, making per-page `revalidate` exports inert).
import { createClient } from "@/lib/supabase/public";
import { getLedgerComputedStats } from "@/lib/supabase/queries";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";

// Site Settings data model — 03-header-and-footer.md, 05-admin-panel-and-blog.md.
// Backed by the site_settings singleton row (id=1), editable from
// /admin/settings.

export type SocialPlatform = "facebook" | "instagram" | "linkedin" | "youtube";

export type SiteSettings = {
  officeAddress: string;
  phones: string[];
  email: string;
  whatsappNumber: string;
  whatsappDefaultMessage: string;
  socialLinks: { platform: SocialPlatform; url: string }[];
  // [0]/[1] ("contracts delivered"/"largest single contract") are computed
  // live from the Projects table by default — 09-launch-fixes.md P0-2 — but
  // [0]'s value can be overridden via site_settings.contracts_delivered_override
  // (e.g. the real historical total exceeds what's entered in the Projects
  // table). [2]/[3] are the remaining admin-editable cells stored in
  // site_settings.ledger_stats.
  ledgerStats: { value: string; label: string }[];
  trustBarClients: string[];
};

export async function getSiteSettings(): Promise<SiteSettings> {
  // Degrade to defaults rather than crashing build-time static generation
  // (e.g. home/about/contact/projects) when Supabase isn't configured.
  const [{ data }, computed] = isSupabaseConfigured()
    ? await Promise.all([
        createClient()
          .from("site_settings")
          .select("*")
          .eq("id", 1)
          .single(),
        getLedgerComputedStats(),
      ])
    : [{ data: null }, await getLedgerComputedStats()];

  const editableStats = (data?.ledger_stats ??
    []) as SiteSettings["ledgerStats"];

  return {
    officeAddress: data?.office_address ?? "",
    phones: data?.phones ?? [],
    email: data?.email ?? "",
    whatsappNumber: data?.whatsapp_number ?? "",
    whatsappDefaultMessage: data?.whatsapp_default_message ?? "",
    socialLinks: (data?.social_links ?? []) as SiteSettings["socialLinks"],
    ledgerStats: [
      {
        value: data?.contracts_delivered_override || String(computed.contractsDelivered),
        label: "contracts delivered",
      },
      { value: computed.largestContract, label: "largest single contract" },
      ...editableStats,
    ],
    trustBarClients: data?.trust_bar_clients ?? [],
  };
}

export function whatsappHref(number: string, message: string) {
  return `https://wa.me/${number.replace(/^\+/, "")}?text=${encodeURIComponent(message)}`;
}
