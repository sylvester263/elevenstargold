// Schema.org JSON-LD builders — 06-integrations-and-seo.md
// GeneralContractor/LocalBusiness on the homepage, Article on blog posts.

export function generalContractorSchema({
  name,
  address,
  phone,
  url,
  logo,
}: {
  name: string;
  address: string;
  phone: string;
  url: string;
  // Google's logo requirement (developers.google.com/search/docs/appearance/
  // structured-data/logo): GeneralContractor extends LocalBusiness extends
  // Organization, so `logo` here satisfies it directly — min 112x112px, on
  // a distinct (non-transparent) background, absolute URL. Points at the
  // same opaque android-chrome-512x512.png used for the manifest/app icons.
  logo?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name,
    address,
    telephone: phone,
    url,
    ...(logo ? { logo } : {}),
  };
}

export function articleSchema({
  headline,
  description,
  datePublished,
  image,
  url,
}: {
  headline: string;
  description: string;
  datePublished: string;
  image?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished,
    image,
    url,
  };
}
