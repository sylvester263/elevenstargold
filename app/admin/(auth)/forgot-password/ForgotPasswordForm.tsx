"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { requestPasswordReset, type AuthFormState } from "@/app/admin/actions";

const INITIAL_STATE: AuthFormState = { status: "idle" };

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(
    requestPasswordReset,
    INITIAL_STATE,
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-muted-light">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          className="border-line-dark bg-navy text-bg"
        />
      </div>
      {state.message ? (
        <p
          className={cn(
            "text-sm",
            state.status === "error" ? "text-rust" : "text-muted-light",
          )}
        >
          {state.message}
        </p>
      ) : null}
      <Button
        type="submit"
        disabled={pending}
        className="bg-gold text-navy hover:bg-gold-bright"
      >
        {pending ? "Sending…" : "Send Reset Link"}
      </Button>
    </form>
  );
}
