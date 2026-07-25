"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type CertificationRow = {
  id: string;
  abbr: string;
  full_name: string;
  description: string | null;
  issuing_body: string | null;
  scan_url: string | null;
  expiry_date: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type CertActionState = { status: "idle" | "error"; message?: string };

function parseForm(formData: FormData) {
  return {
    abbr: String(formData.get("abbr") ?? "").trim(),
    full_name: String(formData.get("fullName") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    issuing_body: String(formData.get("issuingBody") ?? "").trim() || null,
    scan_url: String(formData.get("scanUrl") ?? "").trim() || null,
    expiry_date: String(formData.get("expiryDate") ?? "").trim() || null,
    sort_order: Number(formData.get("sortOrder") ?? 0) || 0,
  };
}

export async function createCertification(
  _prevState: CertActionState,
  formData: FormData,
): Promise<CertActionState> {
  const values = parseForm(formData);
  if (!values.abbr || !values.full_name) {
    return { status: "error", message: "Abbreviation and full name are required." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("certifications").insert(values);

  if (error) return { status: "error", message: error.message };

  revalidatePath("/admin/certifications");
  redirect("/admin/certifications");
}

export async function updateCertification(
  id: string,
  _prevState: CertActionState,
  formData: FormData,
): Promise<CertActionState> {
  const values = parseForm(formData);
  if (!values.abbr || !values.full_name) {
    return { status: "error", message: "Abbreviation and full name are required." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("certifications")
    .update(values)
    .eq("id", id);

  if (error) return { status: "error", message: error.message };

  revalidatePath("/admin/certifications");
  redirect("/admin/certifications");
}

export async function deleteCertification(id: string) {
  const supabase = await createClient();
  await supabase.from("certifications").delete().eq("id", id);
  revalidatePath("/admin/certifications");
}
