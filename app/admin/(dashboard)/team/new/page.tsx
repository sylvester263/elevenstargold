import { TeamMemberForm } from "../TeamMemberForm";

export default function AdminTeamMemberNewPage() {
  return (
    <div>
      <h1 className="text-3xl text-ink">New Team Member</h1>
      <div className="mt-8 max-w-2xl">
        <TeamMemberForm />
      </div>
    </div>
  );
}
