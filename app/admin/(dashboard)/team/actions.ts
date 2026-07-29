"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type TeamMemberRow = {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  photo_url: string | null;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type TeamActionState = { status: "idle" | "error"; message?: string };

function parseForm(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    role: String(formData.get("role") ?? "").trim(),
    bio: String(formData.get("bio") ?? "").trim() || null,
    photo_url: String(formData.get("photoUrl") ?? "").trim() || null,
    sort_order: Number(formData.get("sortOrder") ?? 0) || 0,
    published: formData.get("published") === "on",
  };
}

export async function createTeamMember(
  _prevState: TeamActionState,
  formData: FormData,
): Promise<TeamActionState> {
  const values = parseForm(formData);
  if (!values.name || !values.role) {
    return { status: "error", message: "Name and role are required." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("team_members").insert(values);

  if (error) return { status: "error", message: error.message };

  revalidatePath("/admin/team");
  revalidatePath("/", "layout");
  redirect("/admin/team");
}

export async function updateTeamMember(
  id: string,
  _prevState: TeamActionState,
  formData: FormData,
): Promise<TeamActionState> {
  const values = parseForm(formData);
  if (!values.name || !values.role) {
    return { status: "error", message: "Name and role are required." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("team_members")
    .update(values)
    .eq("id", id);

  if (error) return { status: "error", message: error.message };

  revalidatePath("/admin/team");
  revalidatePath("/", "layout");
  redirect("/admin/team");
}

export async function deleteTeamMember(id: string) {
  const supabase = await createClient();
  await supabase.from("team_members").delete().eq("id", id);
  revalidatePath("/admin/team");
  revalidatePath("/", "layout");
}
