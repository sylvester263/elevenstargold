"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { login, type AuthFormState } from "@/app/admin/actions";

const INITIAL_STATE: AuthFormState = { status: "idle" };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, INITIAL_STATE);

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
      <div className="flex flex-col gap-2">
        <Label htmlFor="password" className="text-muted-light">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
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
        {pending ? "Signing in…" : "Sign In"}
      </Button>
      <Link
        href="/admin/forgot-password"
        className="text-center text-sm text-gold hover:text-gold-bright"
      >
        Forgot password?
      </Link>
    </form>
  );
}
