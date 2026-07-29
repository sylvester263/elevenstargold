"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type SettingsActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export type SiteSettingsRow = {
  id: number;
  office_address: string;
  phones: string[];
  email: string;
  whatsapp_number: string;
  whatsapp_default_message: string;
  social_links: { platform: string; url: string }[];
  ledger_stats: { value: string; label: string }[];
  trust_bar_clients: string[];
  contracts_delivered_override: string;
};

const PLATFORMS = ["facebook", "instagram", "linkedin", "youtube"] as const;

export async function updateSettings(
  _prevState: SettingsActionState,
  formData: FormData,
): Promise<SettingsActionState> {
  const officeAddress = String(formData.get("officeAddress") ?? "").trim();
  const phones = String(formData.get("phones") ?? "")
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  const email = String(formData.get("email") ?? "").trim();
  const whatsappNumber = String(formData.get("whatsappNumber") ?? "").trim();
  const whatsappDefaultMessage = String(
    formData.get("whatsappDefaultMessage") ?? "",
  ).trim();

  const socialLinks = PLATFORMS.map((platform) => ({
    platform,
    url: String(formData.get(`social_${platform}`) ?? "").trim(),
  }));

  const ledgerStats = [0, 1].map((i) => ({
    value: String(formData.get(`ledger_value_${i}`) ?? "").trim(),
    label: String(formData.get(`ledger_label_${i}`) ?? "").trim(),
  }));

  const trustBarClients = String(formData.get("trustBarClients") ?? "")
    .split("\n")
    .map((c) => c.trim())
    .filter(Boolean);

  const contractsDeliveredOverride = String(
    formData.get("contractsDeliveredOverride") ?? "",
  ).trim();

  const supabase = await createClient();
  const { error } = await supabase
    .from("site_settings")
    .update({
      office_address: officeAddress,
      phones,
      email,
      whatsapp_number: whatsappNumber,
      whatsapp_default_message: whatsappDefaultMessage,
      social_links: socialLinks,
      ledger_stats: ledgerStats,
      trust_bar_clients: trustBarClients,
      contracts_delivered_override: contractsDeliveredOverride,
    })
    .eq("id", 1);

  if (error) {
    return { status: "error", message: error.message };
  }

  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");
  return { status: "success", message: "Settings saved." };
}
