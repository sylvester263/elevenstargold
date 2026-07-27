import type { Metadata } from "next";

export const SITE_NAME = "Eleven Star Gold";
export const SITE_URL = "https://www.elevenstar.pk";

// Falls back to the site's own logo when a page/post has no dedicated
// share image (a proper marketing OG banner is a separate task) — this
// alone fixes "no image at all" on shares, which is what every page hit
// before this, per the 07-27 site audit's "no og:image" finding.
const DEFAULT_SHARE_IMAGE = `${SITE_URL}/android-chrome-512x512.png`;

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
  const shareImage = image ?? DEFAULT_SHARE_IMAGE;

  return {
    title: `${title} — ${SITE_NAME}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: shareImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage],
    },
  };
}
