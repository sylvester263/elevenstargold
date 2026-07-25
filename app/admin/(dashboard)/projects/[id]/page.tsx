import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProjectForm } from "../ProjectForm";

export default async function AdminProjectEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (!project) notFound();

  return (
    <div>
      <h1 className="text-3xl text-ink">Edit Project</h1>
      <div className="mt-8 max-w-3xl">
        <ProjectForm project={project} />
      </div>
    </div>
  );
}
