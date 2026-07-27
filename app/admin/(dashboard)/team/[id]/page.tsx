import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { TeamMemberForm } from "../TeamMemberForm";

export default async function AdminTeamMemberEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // The layout already blocks unconfigured access at runtime; this only
  // guards Next's build-time static generation attempt, which runs this
  // page's body independently of the layout's early return.
  if (!isSupabaseConfigured()) return null;

  const { id } = await params;
  const supabase = await createClient();
  const { data: member } = await supabase
    .from("team_members")
    .select("*")
    .eq("id", id)
    .single();

  if (!member) notFound();

  return (
    <div>
      <h1 className="text-3xl text-ink">Edit Team Member</h1>
      <div className="mt-8 max-w-2xl">
        <TeamMemberForm member={member} />
      </div>
    </div>
  );
}
