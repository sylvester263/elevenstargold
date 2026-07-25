"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type ProjectImage = { url: string; alt: string };

export type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  client: string;
  cost: string;
  year: string;
  category: string;
  write_up: string | null;
  images: ProjectImage[];
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type ProjectActionState = { status: "idle" | "error"; message?: string };

function parseForm(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    client: String(formData.get("client") ?? "").trim(),
    cost: String(formData.get("cost") ?? "").trim(),
    year: String(formData.get("year") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim(),
    write_up: String(formData.get("writeUp") ?? "").trim() || null,
    images: (() => {
      try {
        return JSON.parse(String(formData.get("images") ?? "[]"));
      } catch {
        return [];
      }
    })(),
    published: formData.get("published") === "on",
  };
}

export async function createProject(
  _prevState: ProjectActionState,
  formData: FormData,
): Promise<ProjectActionState> {
  const values = parseForm(formData);
  if (!values.title || !values.slug || !values.client) {
    return { status: "error", message: "Title, slug, and client are required." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("projects").insert(values);

  if (error) return { status: "error", message: error.message };

  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(
  id: string,
  _prevState: ProjectActionState,
  formData: FormData,
): Promise<ProjectActionState> {
  const values = parseForm(formData);
  if (!values.title || !values.slug || !values.client) {
    return { status: "error", message: "Title, slug, and client are required." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("projects").update(values).eq("id", id);

  if (error) return { status: "error", message: error.message };

  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  await supabase.from("projects").delete().eq("id", id);
  revalidatePath("/admin/projects");
}
