"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { submitContactForm, type ContactFormState } from "./actions";

const INITIAL_STATE: ContactFormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="lg"
      disabled={pending}
      className="bg-orange text-charcoal-deep hover:bg-orange-dark"
    >
      {pending ? "Sending…" : "Send Message"}
    </Button>
  );
}

export function ContactForm({ serviceOptions }: { serviceOptions: string[] }) {
  const [state, formAction] = useActionState(submitContactForm, INITIAL_STATE);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-5 max-[600px]:grid-cols-1">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" required />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="projectType">Project Type</Label>
        <select
          id="projectType"
          name="projectType"
          required
          defaultValue=""
          className="h-9 rounded-lg border border-line bg-transparent px-3 text-sm text-ink outline-none focus-visible:border-orange"
        >
          <option value="" disabled>
            Select a service
          </option>
          {serviceOptions.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" rows={5} required />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton />
        {state.status !== "idle" && state.message ? (
          <p
            role="status"
            className={cn(
              "text-sm",
              state.status === "success" ? "text-ink" : "text-rust",
            )}
          >
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
