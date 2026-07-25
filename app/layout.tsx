import type { Metadata } from "next";
import { Sora, Zilla_Slab, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Sora is the public-site display font — 01-design-system.md (charcoal/
// orange revision). Zilla Slab is kept loaded, but only feeds
// --font-display-admin now: app/admin/layout.tsx pins the admin panel's
// --font-display back to it, since the admin panel is explicitly out of
// scope for this retrofit and headings share one global CSS variable.
const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const zillaSlab = Zilla_Slab({
  variable: "--font-display-admin",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Eleven Star Gold — Engineering Services",
  description: "Engineering Services — We Build For You.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${zillaSlab.variable} ${inter.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
