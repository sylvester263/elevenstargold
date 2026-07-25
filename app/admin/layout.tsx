import type { Metadata } from "next";

// noindex/nofollow + auth-gated per 05-admin-panel-and-blog.md
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Auth gating happens in proxy.ts (redirects unauthenticated requests
// to /admin/login before this layout ever renders).
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
