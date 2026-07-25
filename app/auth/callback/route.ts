import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Exchanges a Supabase auth email-link code for a session, then redirects —
// used by the password-reset flow (app/admin/actions.ts's
// requestPasswordReset points here).
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/admin";

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(`${origin}${next}`);
}
