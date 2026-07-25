import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteProject } from "./actions";

export default async function AdminProjectsListPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("id, title, client, category, year, published, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-ink">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="bg-gold px-4 py-2 text-sm font-medium text-navy hover:bg-gold-bright"
        >
          + New Project
        </Link>
      </div>

      <table className="mt-8 w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-line text-left text-xs text-muted uppercase">
            <th className="py-2 font-normal">Title</th>
            <th className="py-2 font-normal">Client</th>
            <th className="py-2 font-normal">Category</th>
            <th className="py-2 font-normal">Year</th>
            <th className="py-2 font-normal">Status</th>
            <th className="py-2" />
          </tr>
        </thead>
        <tbody>
          {(projects ?? []).map((project) => (
            <tr key={project.id} className="border-b border-line">
              <td className="py-3">
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="text-ink hover:text-gold"
                >
                  {project.title}
                </Link>
              </td>
              <td className="py-3 text-muted">{project.client}</td>
              <td className="py-3 text-muted">{project.category}</td>
              <td className="py-3 font-mono text-xs text-muted">{project.year}</td>
              <td className="py-3 text-muted">
                {project.published ? "Published" : "Draft"}
              </td>
              <td className="py-3 text-right">
                <DeleteButton action={deleteProject.bind(null, project.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {(projects ?? []).length === 0 ? (
        <p className="mt-8 text-sm text-muted">No projects yet.</p>
      ) : null}
    </div>
  );
}
