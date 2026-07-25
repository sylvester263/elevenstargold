import type { Metadata } from "next";
import { ResetPasswordForm } from "./ResetPasswordForm";

export const metadata: Metadata = { title: "Set New Password" };

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-navy px-4">
      <div className="w-full max-w-sm border border-line-dark bg-navy-2 p-8">
        <p className="text-xs tracking-[0.14em] text-gold uppercase">
          Eleven Star Gold
        </p>
        <h1 className="mt-2 text-2xl text-bg">Set New Password</h1>
        <div className="mt-8">
          <ResetPasswordForm />
        </div>
      </div>
    </main>
  );
}
