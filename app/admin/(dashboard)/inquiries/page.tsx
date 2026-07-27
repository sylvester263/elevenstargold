import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteInquiry } from "./actions";

export default async function AdminInquiriesPage() {
  // The layout already blocks unconfigured access at runtime; this only
  // guards Next's build-time static generation attempt, which runs this
  // page's body independently of the layout's early return.
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const { data: inquiries } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-3xl text-ink">Inquiries</h1>
      <p className="mt-2 text-sm text-muted">
        Contact form submissions from the public site.
      </p>

      <div className="mt-8 flex flex-col divide-y divide-line border-t border-b border-line">
        {(inquiries ?? []).map((inquiry) => (
          <div key={inquiry.id} className="flex items-start justify-between gap-6 py-4">
            <div>
              <p className="text-sm text-ink">
                <span className="font-medium">{inquiry.name}</span>{" "}
                <span className="text-muted">— {inquiry.project_type}</span>
              </p>
              <p className="mt-1 text-xs text-muted">
                <a href={`mailto:${inquiry.email}`} className="hover:text-gold">
                  {inquiry.email}
                </a>{" "}
                ·{" "}
                <a href={`tel:${inquiry.phone}`} className="hover:text-gold">
                  {inquiry.phone}
                </a>
              </p>
              <p className="mt-2 max-w-xl text-sm text-ink">{inquiry.message}</p>
              <p className="mt-2 font-mono text-xs text-muted">
                {new Date(inquiry.created_at).toLocaleString()}
              </p>
            </div>
            <DeleteButton action={deleteInquiry.bind(null, inquiry.id)} />
          </div>
        ))}
      </div>

      {(inquiries ?? []).length === 0 ? (
        <p className="mt-8 text-sm text-muted">No inquiries yet.</p>
      ) : null}
    </div>
  );
}
