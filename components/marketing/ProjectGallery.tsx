"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProjectCard } from "@/components/marketing/ProjectCard";
import type { Project, ProjectCategory } from "@/lib/supabase/queries";
import { cn } from "@/lib/utils";

const CATEGORIES: ("All" | ProjectCategory)[] = [
  "All",
  "Education",
  "Healthcare",
  "Government",
  "Industrial",
  "Housing",
];

export function ProjectGallery({
  projects,
  limit,
  initialCategory = "All",
  syncUrl = false,
}: {
  projects: Project[];
  limit?: number;
  initialCategory?: (typeof CATEGORIES)[number];
  syncUrl?: boolean;
}) {
  const router = useRouter();
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>(initialCategory);

  function handleSelect(cat: (typeof CATEGORIES)[number]) {
    setActive(cat);
    // Category filters live in the query string, not a separate route —
    // 02-sitemap-and-routes.md.
    if (syncUrl) {
      const qs = cat === "All" ? "" : `?category=${cat.toLowerCase()}`;
      router.replace(`/projects${qs}`, { scroll: false });
    }
  }

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);
  const visible = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => handleSelect(cat)}
            aria-pressed={active === cat}
            className={cn(
              "border px-4 py-2 text-sm",
              active === cat
                ? "border-orange bg-orange text-charcoal-deep"
                : "border-line text-muted hover:border-orange",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-3 gap-6 max-[880px]:grid-cols-2 max-[600px]:grid-cols-1">
        {visible.map((project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-8 text-sm text-muted">
          No projects in this category yet.
        </p>
      ) : null}

      {limit && filtered.length > limit ? (
        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="text-sm font-medium text-orange hover:text-orange-dark"
          >
            View all projects →
          </Link>
        </div>
      ) : null}
    </div>
  );
}
