import { BlogPostForm } from "../BlogPostForm";

export default function AdminBlogNewPage() {
  return (
    <div>
      <h1 className="text-3xl text-ink">New Blog Post</h1>
      <div className="mt-8 max-w-3xl">
        <BlogPostForm />
      </div>
    </div>
  );
}
