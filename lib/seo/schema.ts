// Schema.org JSON-LD builders — 06-integrations-and-seo.md
// GeneralContractor/LocalBusiness on the homepage, Article on blog posts.

export function generalContractorSchema({
  name,
  address,
  phone,
  url,
}: {
  name: string;
  address: string;
  phone: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name,
    address,
    telephone: phone,
    url,
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
