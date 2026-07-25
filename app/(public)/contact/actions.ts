"use server";

import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

// TODO: no email provider wired yet — the submission is persisted to the
// `inquiries` table (readable in Admin > Inquiries) but not emailed. Per
// 06-integrations-and-seo.md, once an email provider is chosen this should
// also email `company.email` so nothing depends on someone remembering to
// check the admin panel.
export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const projectType = String(formData.get("projectType") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !phone || !email || !projectType || !message) {
    return { status: "error", message: "Please fill in all fields." };
  }

  if (!isSupabaseConfigured()) {
    return {
      status: "error",
      message:
        "This form isn't connected yet. Please WhatsApp or email us directly for now.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("inquiries").insert({
    name,
    phone,
    email,
    project_type: projectType,
    message,
  });

  if (error) {
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again or WhatsApp us directly.",
    };
  }

  return {
    status: "success",
    message: "Message sent. We'll reply within one business day.",
  };
}
