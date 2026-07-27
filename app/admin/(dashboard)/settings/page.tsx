import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { SettingsForm } from "./SettingsForm";
import type { SiteSettingsRow } from "./actions";

const EMPTY_SETTINGS: SiteSettingsRow = {
  id: 1,
  office_address: "",
  phones: [],
  email: "",
  whatsapp_number: "",
  whatsapp_default_message: "",
  social_links: [],
  ledger_stats: [],
  trust_bar_clients: [],
};

export default async function AdminSettingsPage() {
  // The layout already blocks unconfigured access at runtime; this only
  // guards Next's build-time static generation attempt, which runs this
  // page's body independently of the layout's early return.
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .single();

  return (
    <div>
      <h1 className="text-3xl text-ink">Site Settings</h1>
      <div className="mt-8 max-w-2xl">
        <SettingsForm settings={settings ?? EMPTY_SETTINGS} />
      </div>
    </div>
  );
}
