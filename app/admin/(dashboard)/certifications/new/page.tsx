import { CertificationForm } from "../CertificationForm";

export default function AdminCertificationNewPage() {
  return (
    <div>
      <h1 className="text-3xl text-ink">New Certification</h1>
      <div className="mt-8 max-w-2xl">
        <CertificationForm />
      </div>
    </div>
  );
}
