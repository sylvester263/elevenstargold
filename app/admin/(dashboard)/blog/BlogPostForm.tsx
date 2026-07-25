"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { uploadToBucket } from "@/lib/supabase/storage";
import { slugify } from "@/lib/slug";
import { createPost, updatePost, type BlogActionState, type BlogPostRow } from "./actions";

const CATEGORIES = ["Company News", "Safety", "Projects", "Industry"];
const INITIAL_STATE: BlogActionState = { status: "idle" };

export function BlogPostForm({ post }: { post?: BlogPostRow }) {
  const router = useRouter();
  const action = post ? updatePost.bind(null, post.id) : createPost;
  const [state, formAction, pending] = useActionState(action, INITIAL_STATE);

  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post));
  const [coverUrl, setCoverUrl] = useState(post?.cover_image_url ?? "");
  const [uploading, setUploading] = useState(false);
  const [body, setBody] = useState<unknown>(post?.body ?? null);

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!slugTouched) setSlug(slugify(e.target.value));
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      setCoverUrl(await uploadToBucket("blog-media", file, "covers/"));
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input type="hidden" name="body" value={JSON.stringify(body)} />
      <input type="hidden" name="coverImageUrl" value={coverUrl} />

      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            defaultValue={post?.title}
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

      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            name="category"
            defaultValue={post?.category ?? CATEGORIES[0]}
            className="h-9 rounded-lg border border-line bg-transparent px-3 text-sm text-ink"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="cover">Cover image</Label>
          <input
            id="cover"
            type="file"
            accept="image/*"
            onChange={handleCoverUpload}
            className="text-sm"
          />
          {uploading ? <p className="text-xs text-muted">Uploading…</p> : null}
          {coverUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={coverUrl}
              alt=""
              className="mt-2 h-24 w-40 border border-line object-cover"
            />
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          defaultValue={post?.excerpt ?? ""}
          rows={2}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Body</Label>
        <RichTextEditor value={body} onChange={setBody} />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="seoTitle">SEO Title</Label>
          <Input id="seoTitle" name="seoTitle" defaultValue={post?.seo_title ?? ""} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="seoDescription">SEO Description</Label>
          <Input
            id="seoDescription"
            name="seoDescription"
            defaultValue={post?.seo_description ?? ""}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          name="status"
          defaultValue={post?.status ?? "draft"}
          className="h-9 rounded-lg border border-line bg-transparent px-3 text-sm text-ink"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {state.status === "error" && state.message ? (
        <p className="text-sm text-rust">{state.message}</p>
      ) : null}

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={pending || uploading}
          className="bg-gold text-navy hover:bg-gold-bright"
        >
          {pending ? "Saving…" : post ? "Save Changes" : "Create Post"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/blog")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
