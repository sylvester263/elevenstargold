"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { uploadToBucket } from "@/lib/supabase/storage";
import { slugify } from "@/lib/slug";
import {
  createProject,
  updateProject,
  type ProjectActionState,
  type ProjectRow,
  type ProjectImage,
} from "./actions";

const CATEGORIES = [
  "Education",
  "Healthcare",
  "Government",
  "Industrial",
  "Housing",
];
const INITIAL_STATE: ProjectActionState = { status: "idle" };

export function ProjectForm({ project }: { project?: ProjectRow }) {
  const router = useRouter();
  const action = project ? updateProject.bind(null, project.id) : createProject;
  const [state, formAction, pending] = useActionState(action, INITIAL_STATE);

  const [slug, setSlug] = useState(project?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(project));
  const [images, setImages] = useState<ProjectImage[]>(project?.images ?? []);
  const [uploading, setUploading] = useState(false);

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!slugTouched) setSlug(slugify(e.target.value));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    try {
      const uploaded = await Promise.all(
        Array.from(files).map(async (file) => ({
          url: await uploadToBucket("project-images", file, "projects/"),
          alt: "",
        })),
      );
      setImages((prev) => [...prev, ...uploaded]);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function move(index: number, dir: -1 | 1) {
    setImages((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function remove(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  function updateAlt(index: number, alt: string) {
    setImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, alt } : img)),
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input type="hidden" name="images" value={JSON.stringify(images)} />

      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            defaultValue={project?.title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugTouched(true);
            }}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="client">Client</Label>
          <Input id="client" name="client" defaultValue={project?.client} required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="cost">Contract value</Label>
          <Input
            id="cost"
            name="cost"
            defaultValue={project?.cost}
            placeholder="₨0,000,000"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            name="year"
            defaultValue={project?.year}
            placeholder="2025 or 2025–26"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          name="category"
          defaultValue={project?.category ?? CATEGORIES[0]}
          className="h-9 w-fit rounded-lg border border-line bg-transparent px-3 text-sm text-ink"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="writeUp">Write-up</Label>
        <Textarea
          id="writeUp"
          name="writeUp"
          defaultValue={project?.write_up ?? ""}
          rows={4}
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="images">Gallery</Label>
        <input
          id="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="text-sm"
        />
        {uploading ? <p className="text-xs text-muted">Uploading…</p> : null}

        {images.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {images.map((img, i) => (
              <li
                key={img.url}
                className="flex items-center gap-3 border border-line p-2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt="" className="h-14 w-20 object-cover" />
                <Input
                  value={img.alt}
                  onChange={(e) => updateAlt(i, e.target.value)}
                  placeholder="Alt text"
                  className="flex-1"
                />
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => move(i, -1)}
                    className="px-2 text-sm text-muted hover:text-ink"
                    aria-label="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, 1)}
                    className="px-2 text-sm text-muted hover:text-ink"
                    aria-label="Move down"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(i)}
                    className="px-2 text-sm text-rust hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <label className="flex items-center gap-2 text-sm text-ink">
        <input
          type="checkbox"
          name="published"
          defaultChecked={project?.published ?? false}
        />
        Published
      </label>

      {state.status === "error" && state.message ? (
        <p className="text-sm text-rust">{state.message}</p>
      ) : null}

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={pending || uploading}
          className="bg-gold text-navy hover:bg-gold-bright"
        >
          {pending ? "Saving…" : project ? "Save Changes" : "Create Project"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/projects")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
