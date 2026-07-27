import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteTeamMember } from "./actions";

export default async function AdminTeamPage() {
  // The layout already blocks unconfigured access at runtime; this only
  // guards Next's build-time static generation attempt, which runs this
  // page's body independently of the layout's early return.
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const { data: members } = await supabase
    .from("team_members")
    .select("id, name, role, published, sort_order")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-ink">Team</h1>
        <Link
          href="/admin/team/new"
          className="bg-gold px-4 py-2 text-sm font-medium text-navy hover:bg-gold-bright"
        >
          + New Team Member
        </Link>
      </div>

      <table className="mt-8 w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-line text-left text-xs text-muted uppercase">
            <th className="py-2 font-normal">Name</th>
            <th className="py-2 font-normal">Role</th>
            <th className="py-2 font-normal">Status</th>
            <th className="py-2" />
          </tr>
        </thead>
        <tbody>
          {(members ?? []).map((member) => (
            <tr key={member.id} className="border-b border-line">
              <td className="py-3">
                <Link
                  href={`/admin/team/${member.id}`}
                  className="text-ink hover:text-gold"
                >
                  {member.name}
                </Link>
              </td>
              <td className="py-3 text-muted">{member.role}</td>
              <td className="py-3 text-muted">
                {member.published ? "Published" : "Draft"}
              </td>
              <td className="py-3 text-right">
                <DeleteButton action={deleteTeamMember.bind(null, member.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {(members ?? []).length === 0 ? (
        <p className="mt-8 text-sm text-muted">No team members yet.</p>
      ) : null}
    </div>
  );
}
