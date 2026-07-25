import type { Metadata } from "next";
import { Zilla_Slab } from "next/font/google";

// noindex/nofollow + auth-gated per 05-admin-panel-and-blog.md
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Loaded here (not app/layout.tsx) so it's scoped only to this subtree —
// app/layout.tsx now only knows about Sora, per 01-design-system.md (the
// charcoal/orange revision removed Zilla Slab from the public site
// entirely). The admin panel is explicitly out of scope for that retrofit,
// and h1–h3 everywhere read --font-display via one shared global rule
// (app/globals.css), so the wrapping div below both generates this
// variable's CSS (via .variable) and pins --font-display back to it for
// every admin page. This is the only change made to an admin file for the
// retrofit, and it exists solely to keep the admin panel's rendered output
// unchanged.
const zillaSlab = Zilla_Slab({
  variable: "--font-display-admin",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

// Auth gating happens in proxy.ts (redirects unauthenticated requests
// to /admin/login before this layout ever renders).
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={zillaSlab.variable}
      style={{ "--font-display": "var(--font-display-admin)" } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
