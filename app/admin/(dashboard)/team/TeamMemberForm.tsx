"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { uploadToBucket } from "@/lib/supabase/storage";
import {
  createTeamMember,
  updateTeamMember,
  type TeamActionState,
  type TeamMemberRow,
} from "./actions";

const INITIAL_STATE: TeamActionState = { status: "idle" };

export function TeamMemberForm({ member }: { member?: TeamMemberRow }) {
  const router = useRouter();
  const action = member
    ? updateTeamMember.bind(null, member.id)
    : createTeamMember;
  const [state, formAction, pending] = useActionState(action, INITIAL_STATE);

  const [photoUrl, setPhotoUrl] = useState(member?.photo_url ?? "");
  const [uploading, setUploading] = useState(false);

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      setPhotoUrl(await uploadToBucket("team-photos", file, "team/"));
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input type="hidden" name="photoUrl" value={photoUrl} />

      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" defaultValue={member?.name} required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="role">Role / title</Label>
          <Input id="role" name="role" defaultValue={member?.role} required />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="bio">Bio / short description</Label>
        <Textarea
          id="bio"
          name="bio"
          defaultValue={member?.bio ?? ""}
          rows={3}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="sortOrder">Sort order</Label>
        <Input
          id="sortOrder"
          name="sortOrder"
          type="number"
          defaultValue={member?.sort_order ?? 0}
          className="w-24"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="photo">Photo</Label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="text-sm"
        />
        {uploading ? <p className="text-xs text-muted">Uploading…</p> : null}
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoUrl}
            alt=""
            className="mt-2 h-32 w-32 border border-line object-cover"
          />
        ) : null}
      </div>

      <label className="flex items-center gap-2 text-sm text-ink">
        <input
          type="checkbox"
          name="published"
          defaultChecked={member?.published ?? false}
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
          {pending ? "Saving…" : member ? "Save Changes" : "Create Team Member"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/team")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
