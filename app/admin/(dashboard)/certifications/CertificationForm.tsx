"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { uploadToBucket } from "@/lib/supabase/storage";
import {
  createCertification,
  updateCertification,
  type CertActionState,
  type CertificationRow,
} from "./actions";

const INITIAL_STATE: CertActionState = { status: "idle" };

export function CertificationForm({ cert }: { cert?: CertificationRow }) {
  const router = useRouter();
  const action = cert
    ? updateCertification.bind(null, cert.id)
    : createCertification;
  const [state, formAction, pending] = useActionState(action, INITIAL_STATE);

  const [scanUrl, setScanUrl] = useState(cert?.scan_url ?? "");
  const [uploading, setUploading] = useState(false);

  async function handleScanUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      setScanUrl(await uploadToBucket("certification-scans", file, "scans/"));
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input type="hidden" name="scanUrl" value={scanUrl} />

      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="abbr">Abbreviation</Label>
          <Input id="abbr" name="abbr" defaultValue={cert?.abbr} required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="fullName">Full name</Label>
          <Input id="fullName" name="fullName" defaultValue={cert?.full_name} required />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={cert?.description ?? ""}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="issuingBody">Issuing body</Label>
          <Input
            id="issuingBody"
            name="issuingBody"
            defaultValue={cert?.issuing_body ?? ""}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="expiryDate">Expiry / renewal date</Label>
          <Input
            id="expiryDate"
            name="expiryDate"
            type="date"
            defaultValue={cert?.expiry_date ?? ""}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="sortOrder">Sort order</Label>
        <Input
          id="sortOrder"
          name="sortOrder"
          type="number"
          defaultValue={cert?.sort_order ?? 0}
          className="w-24"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="scan">Certificate scan</Label>
        <input
          id="scan"
          type="file"
          accept="image/*,application/pdf"
          onChange={handleScanUpload}
          className="text-sm"
        />
        {uploading ? <p className="text-xs text-muted">Uploading…</p> : null}
        {scanUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={scanUrl}
            alt=""
            className="mt-2 h-32 w-24 border border-line object-cover"
          />
        ) : null}
      </div>

      {state.status === "error" && state.message ? (
        <p className="text-sm text-rust">{state.message}</p>
      ) : null}

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={pending || uploading}
          className="bg-gold text-navy hover:bg-gold-bright"
        >
          {pending ? "Saving…" : cert ? "Save Changes" : "Create Certification"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/certifications")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
