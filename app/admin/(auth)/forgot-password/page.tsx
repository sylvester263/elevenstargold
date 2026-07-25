import type { Metadata } from "next";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export const metadata: Metadata = { title: "Reset Password" };

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-navy px-4">
      <div className="w-full max-w-sm border border-line-dark bg-navy-2 p-8">
        <p className="text-xs tracking-[0.14em] text-gold uppercase">
          Eleven Star Gold
        </p>
        <h1 className="mt-2 text-2xl text-bg">Reset Password</h1>
        <p className="mt-2 text-sm text-muted-light">
          Enter your admin email and we&apos;ll send a reset link.
        </p>
        <div className="mt-8">
          <ForgotPasswordForm />
        </div>
      </div>
    </main>
  );
}
