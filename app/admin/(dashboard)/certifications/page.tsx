import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteCertification } from "./actions";

export default async function AdminCertificationsPage() {
  const supabase = await createClient();
  const { data: certifications } = await supabase
    .from("certifications")
    .select("id, abbr, full_name, issuing_body, expiry_date")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-ink">Certifications</h1>
        <Link
          href="/admin/certifications/new"
          className="bg-gold px-4 py-2 text-sm font-medium text-navy hover:bg-gold-bright"
        >
          + New Certification
        </Link>
      </div>

      <table className="mt-8 w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-line text-left text-xs text-muted uppercase">
            <th className="py-2 font-normal">Abbr</th>
            <th className="py-2 font-normal">Full name</th>
            <th className="py-2 font-normal">Issuing body</th>
            <th className="py-2 font-normal">Expiry</th>
            <th className="py-2" />
          </tr>
        </thead>
        <tbody>
          {(certifications ?? []).map((cert) => (
            <tr key={cert.id} className="border-b border-line">
              <td className="py-3">
                <Link
                  href={`/admin/certifications/${cert.id}`}
                  className="text-ink hover:text-gold"
                >
                  {cert.abbr}
                </Link>
              </td>
              <td className="py-3 text-muted">{cert.full_name}</td>
              <td className="py-3 text-muted">{cert.issuing_body ?? "—"}</td>
              <td className="py-3 font-mono text-xs text-muted">
                {cert.expiry_date ?? "—"}
              </td>
              <td className="py-3 text-right">
                <DeleteButton action={deleteCertification.bind(null, cert.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {(certifications ?? []).length === 0 ? (
        <p className="mt-8 text-sm text-muted">No certifications yet.</p>
      ) : null}
    </div>
  );
}
