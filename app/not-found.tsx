import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { WhatsAppButton } from "@/components/marketing/WhatsAppButton";

// Self-contained rather than relying on app/(public)/layout.tsx: the root
// not-found.tsx is what Next.js renders for any unmatched URL, and that
// render only gets the root layout, not nested route-group layouts — so
// Header/Footer/WhatsAppButton must be composed here directly, not assumed
// to come from (public)'s layout (09-launch-fixes.md P0-4).
export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center bg-bg px-8 py-24 text-center max-[600px]:px-4 max-[600px]:py-14">
        <p className="text-xs tracking-[0.14em] text-orange uppercase">
          404
        </p>
        <h1 className="mt-4 text-4xl text-ink">Page not found</h1>
        <p className="mt-4 max-w-md text-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have
          moved. Try the homepage, or one of the links below.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className={cn(buttonVariants({ size: "lg" }), "bg-orange text-charcoal-deep hover:bg-orange-dark")}
          >
            Back to Homepage
          </Link>
          <Link
            href="/projects"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "border-line bg-transparent text-ink hover:bg-paper",
            )}
          >
            View Completed Projects
          </Link>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
