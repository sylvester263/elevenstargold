"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updatePassword, type AuthFormState } from "@/app/admin/actions";

const INITIAL_STATE: AuthFormState = { status: "idle" };

export function ResetPasswordForm() {
  const [state, formAction, pending] = useActionState(
    updatePassword,
    INITIAL_STATE,
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="password" className="text-muted-light">
          New password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          className="border-line-dark bg-navy text-bg"
        />
      </div>
      {state.status === "error" && state.message ? (
        <p className="text-sm text-rust">{state.message}</p>
      ) : null}
      <Button
        type="submit"
        disabled={pending}
        className="bg-gold text-navy hover:bg-gold-bright"
      >
        {pending ? "Saving…" : "Set New Password"}
      </Button>
    </form>
  );
}
