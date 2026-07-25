import Link from "next/link";
import { Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Certifications", href: "/certifications" },
  { label: "Safety", href: "/safety" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line-dark bg-navy">
      <div className="mx-auto flex max-w-[1160px] items-center justify-between px-8 py-4 max-[600px]:px-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold font-display text-sm font-semibold text-gold-bright">
            ES
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-base font-semibold text-bg">
              Eleven Star Gold
            </span>
            <span className="text-[10px] uppercase tracking-[0.14em] text-gold">
              Engineering &amp; Construction
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 min-[880px]:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-light transition-colors hover:text-bg"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-gold text-navy hover:bg-gold-bright",
            )}
          >
            Request a Quote
          </Link>

          <Sheet>
            <SheetTrigger
              aria-label="Open menu"
              className="flex size-9 items-center justify-center text-bg transition-colors hover:text-gold-bright min-[880px]:hidden"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-line-dark bg-navy text-bg"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="mt-16 flex flex-col gap-6 px-6">
                {NAV_LINKS.map((link) => (
                  <SheetClose
                    key={link.href}
                    nativeButton={false}
                    render={
                      <Link
                        href={link.href}
                        className="text-lg text-muted-light hover:text-bg"
                      >
                        {link.label}
                      </Link>
                    }
                  />
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
