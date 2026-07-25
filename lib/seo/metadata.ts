import type { Metadata } from "next";

const SITE_NAME = "Eleven Star Gold";
const SITE_URL = "https://www.elevenstar.pk";

// Falls back to a title/description built from the given fields when a
// page/post has no explicit SEO meta set in the CMS — 06-integrations-and-seo.md
export function buildMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title: `${title} — ${SITE_NAME}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
