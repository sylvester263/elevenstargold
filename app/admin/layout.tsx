import type { Metadata } from "next";

// noindex/nofollow + auth-gated per 05-admin-panel-and-blog.md
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Auth gating happens in proxy.ts (redirects unauthenticated requests
// to /admin/login before this layout ever renders).
//
// The style override below pins --font-display back to Zilla Slab for this
// subtree: app/layout.tsx made Sora the site-wide default as part of the
// charcoal/orange retrofit (01-design-system.md), but the admin panel is
// explicitly out of scope for that retrofit and h1–h3 everywhere read
// --font-display via one shared global rule (app/globals.css). This is the
// only change made to an admin file for the retrofit, and it exists solely
// to keep the admin panel's rendered output unchanged.
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ "--font-display": "var(--font-display-admin)" } as React.CSSProperties}>
      {children}
    </div>
  );
}
