"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type BlogPostRow = {
  id: string;
  slug: string;
  title: string;
  cover_image_url: string | null;
  category: string;
  excerpt: string | null;
  body: unknown;
  seo_title: string | null;
  seo_description: string | null;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type BlogActionState = { status: "idle" | "error"; message?: string };

function parseForm(formData: FormData) {
  const status = String(formData.get("status") ?? "draft") as
    | "draft"
    | "published";

  return {
    title: String(formData.get("title") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim() || null,
    cover_image_url:
      String(formData.get("coverImageUrl") ?? "").trim() || null,
    body: (() => {
      try {
        return JSON.parse(String(formData.get("body") ?? "null"));
      } catch {
        return null;
      }
    })(),
    seo_title: String(formData.get("seoTitle") ?? "").trim() || null,
    seo_description:
      String(formData.get("seoDescription") ?? "").trim() || null,
    status,
  };
}

export async function createPost(
  _prevState: BlogActionState,
  formData: FormData,
): Promise<BlogActionState> {
  const values = parseForm(formData);
  if (!values.title || !values.slug) {
    return { status: "error", message: "Title and slug are required." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("blog_posts").insert({
    ...values,
    published_at: values.status === "published" ? new Date().toISOString() : null,
  });

  if (error) {
    return { status: "error", message: error.message };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/", "layout");
  redirect("/admin/blog");
}

export async function updatePost(
  id: string,
  _prevState: BlogActionState,
  formData: FormData,
): Promise<BlogActionState> {
  const values = parseForm(formData);
  if (!values.title || !values.slug) {
    return { status: "error", message: "Title and slug are required." };
  }

  const supabase = await createClient();

  let publishedAt: string | null = null;
  if (values.status === "published") {
    const { data: existing } = await supabase
      .from("blog_posts")
      .select("published_at")
      .eq("id", id)
      .single();
    publishedAt = existing?.published_at ?? new Date().toISOString();
  }

  const { error } = await supabase
    .from("blog_posts")
    .update({ ...values, published_at: publishedAt })
    .eq("id", id);

  if (error) {
    return { status: "error", message: error.message };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/", "layout");
  redirect("/admin/blog");
}

export async function deletePost(id: string) {
  const supabase = await createClient();
  await supabase.from("blog_posts").delete().eq("id", id);
  revalidatePath("/admin/blog");
  revalidatePath("/", "layout");
}
