import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { CertificationForm } from "../CertificationForm";

export default async function AdminCertificationEditPage({
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
  const { data: cert } = await supabase
    .from("certifications")
    .select("*")
    .eq("id", id)
    .single();

  if (!cert) notFound();

  return (
    <div>
      <h1 className="text-3xl text-ink">Edit Certification</h1>
      <div className="mt-8 max-w-2xl">
        <CertificationForm cert={cert} />
      </div>
    </div>
  );
}
