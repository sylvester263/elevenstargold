import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { logout } from "../actions";

const NAV = [
  { label: "Dashboard", href: "/admin" },
  { label: "Blog", href: "/admin/blog" },
  { label: "Projects", href: "/admin/projects" },
  { label: "Certifications", href: "/admin/certifications" },
  { label: "Inquiries", href: "/admin/inquiries" },
  { label: "Settings", href: "/admin/settings" },
];

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!isSupabaseConfigured()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy px-4">
        <div className="max-w-md border border-line-dark bg-navy-2 p-8 text-center">
          <p className="text-xs tracking-[0.14em] text-gold uppercase">
            Setup required
          </p>
          <h1 className="mt-2 text-2xl text-bg">
            Supabase isn&apos;t configured yet
          </h1>
          <p className="mt-4 text-sm text-muted-light">
            Run <code className="text-gold-bright">supabase/schema.sql</code>{" "}
            against a Supabase project, create the admin user, then add
            NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and
            SUPABASE_SERVICE_ROLE_KEY to <code className="text-gold-bright">.env.local</code>{" "}
            (see .env.local.example).
          </p>
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen bg-bg">
      <aside className="w-60 shrink-0 border-r border-line-dark bg-navy p-6">
        <Link href="/admin" className="block">
          <p className="font-display text-sm font-semibold text-bg">
            Eleven Star Gold
          </p>
          <p className="text-[10px] tracking-[0.14em] text-gold uppercase">
            Admin
          </p>
        </Link>

        <nav className="mt-10 flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded px-3 py-2 text-sm text-muted-light hover:bg-navy-2 hover:text-bg"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-10 border-t border-line-dark pt-4">
          <p className="truncate text-xs text-muted-light">{user?.email}</p>
          <form action={logout}>
            <button
              type="submit"
              className="mt-2 text-sm text-gold hover:text-gold-bright"
            >
              Log out
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
