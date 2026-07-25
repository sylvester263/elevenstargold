"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";

export type AuthFormState = { status: "idle" | "error"; message?: string };

const NOT_CONFIGURED: AuthFormState = {
  status: "error",
  message:
    "Supabase isn't configured yet — see supabase/schema.sql and .env.local.example.",
};

export async function login(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  if (!isSupabaseConfigured()) return NOT_CONFIGURED;

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { status: "error", message: error.message };
  }

  redirect("/admin");
}

export async function logout() {
  if (!isSupabaseConfigured()) {
    redirect("/admin/login");
  }

  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function requestPasswordReset(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  if (!isSupabaseConfigured()) return NOT_CONFIGURED;

  const email = String(formData.get("email") ?? "");
  const supabase = await createClient();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/auth/callback?next=/admin/reset-password`,
  });

  if (error) {
    return { status: "error", message: error.message };
  }

  return { status: "idle", message: "Check your email for a reset link." };
}

export async function updatePassword(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  if (!isSupabaseConfigured()) return NOT_CONFIGURED;

  const password = String(formData.get("password") ?? "");
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { status: "error", message: error.message };
  }

  redirect("/admin");
}
