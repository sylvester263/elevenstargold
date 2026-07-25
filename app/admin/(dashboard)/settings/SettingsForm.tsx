"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  updateSettings,
  type SettingsActionState,
  type SiteSettingsRow,
} from "./actions";

const PLATFORMS = ["facebook", "instagram", "linkedin", "youtube"] as const;
const INITIAL_STATE: SettingsActionState = { status: "idle" };

export function SettingsForm({ settings }: { settings: SiteSettingsRow }) {
  const [state, formAction, pending] = useActionState(
    updateSettings,
    INITIAL_STATE,
  );

  const socialByPlatform = Object.fromEntries(
    settings.social_links.map((l) => [l.platform, l.url]),
  );
  const ledgerStats = Array.from({ length: 2 }, (_, i) => settings.ledger_stats[i] ?? { value: "", label: "" });

  return (
    <form action={formAction} className="flex flex-col gap-10">
      <section className="flex flex-col gap-5">
        <h2 className="text-lg text-ink">Contact</h2>
        <div className="flex flex-col gap-2">
          <Label htmlFor="officeAddress">Office address</Label>
          <Textarea
            id="officeAddress"
            name="officeAddress"
            defaultValue={settings.office_address}
            rows={2}
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="phones">Phone numbers (comma-separated)</Label>
            <Input id="phones" name="phones" defaultValue={settings.phones.join(", ")} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" defaultValue={settings.email} />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-5 border-t border-line pt-8">
        <h2 className="text-lg text-ink">WhatsApp</h2>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="whatsappNumber">Number (E.164, e.g. +923336288862)</Label>
            <Input
              id="whatsappNumber"
              name="whatsappNumber"
              defaultValue={settings.whatsapp_number}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="whatsappDefaultMessage">Default message</Label>
            <Input
              id="whatsappDefaultMessage"
              name="whatsappDefaultMessage"
              defaultValue={settings.whatsapp_default_message}
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-5 border-t border-line pt-8">
        <h2 className="text-lg text-ink">Social links</h2>
        <p className="text-xs text-muted">
          Leave a URL blank to hide that platform&apos;s icon in the footer.
        </p>
        <div className="grid grid-cols-2 gap-5">
          {PLATFORMS.map((platform) => (
            <div key={platform} className="flex flex-col gap-2">
              <Label htmlFor={`social_${platform}`} className="capitalize">
                {platform}
              </Label>
              <Input
                id={`social_${platform}`}
                name={`social_${platform}`}
                defaultValue={socialByPlatform[platform] ?? ""}
                placeholder="https://…"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-5 border-t border-line pt-8">
        <h2 className="text-lg text-ink">Homepage ledger stats</h2>
        <p className="text-xs text-muted">
          &quot;Contracts delivered&quot; and &quot;largest single
          contract&quot; are computed automatically from published projects
          and aren&apos;t edited here.
        </p>
        <div className="grid grid-cols-2 gap-5">
          {ledgerStats.map((stat, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-1 flex-col gap-2">
                <Label htmlFor={`ledger_value_${i}`}>Value</Label>
                <Input
                  id={`ledger_value_${i}`}
                  name={`ledger_value_${i}`}
                  defaultValue={stat.value}
                />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <Label htmlFor={`ledger_label_${i}`}>Label</Label>
                <Input
                  id={`ledger_label_${i}`}
                  name={`ledger_label_${i}`}
                  defaultValue={stat.label}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-5 border-t border-line pt-8">
        <h2 className="text-lg text-ink">Trust bar clients</h2>
        <div className="flex flex-col gap-2">
          <Label htmlFor="trustBarClients">One name per line</Label>
          <Textarea
            id="trustBarClients"
            name="trustBarClients"
            defaultValue={settings.trust_bar_clients.join("\n")}
            rows={6}
          />
        </div>
      </section>

      {state.message ? (
        <p
          className={cn(
            "text-sm",
            state.status === "error" ? "text-rust" : "text-ink",
          )}
        >
          {state.message}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={pending}
        className="w-fit bg-gold text-navy hover:bg-gold-bright"
      >
        {pending ? "Saving…" : "Save Settings"}
      </Button>
    </form>
  );
}
