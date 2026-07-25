import { createClient } from "@/lib/supabase/server";
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
