import type { ProjectCategory } from "@/lib/supabase/queries";

// First-pass service → project-category mapping so services and projects
// can link to each other per the internal-linking rules in
// 02-sitemap-and-routes.md ("services claim nothing that projects don't
// back up"). Only one pairing is given explicitly in the spec (Renovation
// & Remodeling ↔ Healthcare); the rest are an editorial best guess — review
// with the client once more project data exists.
export const SERVICE_CATEGORY: Record<string, ProjectCategory> = {
  "Building Construction": "Education",
  "Road Construction": "Government",
  "Project Management": "Government",
  "Civil Engineering": "Government",
  "Renovation & Remodeling": "Healthcare",
  "Interior and Exterior Finishing": "Education",
  "Industrial Construction": "Industrial",
  "Real Estate Development": "Housing",
  "Maintenance & Repairs": "Healthcare",
};

export function serviceForCategory(category: ProjectCategory): string | undefined {
  return Object.entries(SERVICE_CATEGORY).find(([, cat]) => cat === category)?.[0];
}
