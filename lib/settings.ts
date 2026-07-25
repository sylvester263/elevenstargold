import { createClient } from "@/lib/supabase/server";
import { getLedgerComputedStats } from "@/lib/supabase/queries";

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
  // [0]/[1] ("contracts delivered"/"largest single contract") are always
  // computed live from the Projects table, never admin-typed — 09-launch-
  // fixes.md P0-2. [2]/[3] are the remaining admin-editable cells stored in
  // site_settings.ledger_stats.
  ledgerStats: { value: string; label: string }[];
  trustBarClients: string[];
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = await createClient();
  const [{ data }, computed] = await Promise.all([
    supabase.from("site_settings").select("*").eq("id", 1).single(),
    getLedgerComputedStats(),
  ]);

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
      { value: String(computed.contractsDelivered), label: "contracts delivered" },
      { value: computed.largestContract, label: "largest single contract" },
      ...editableStats,
    ],
    trustBarClients: data?.trust_bar_clients ?? [],
  };
}

export function whatsappHref(number: string, message: string) {
  return `https://wa.me/${number.replace(/^\+/, "")}?text=${encodeURIComponent(message)}`;
}
