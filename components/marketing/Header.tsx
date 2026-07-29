import Link from "next/link";
import Image from "next/image";
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
  { label: "Gallery", href: "/gallery" },
  { label: "Certifications", href: "/certifications" },
  { label: "Team", href: "/team" },
  { label: "Safety", href: "/safety" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <div className="mx-auto flex max-w-[1160px] items-center justify-between px-8 py-4 max-[600px]:px-4">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/esg-logo.png"
            alt="ESG Engineering Services — We Build For You"
            width={1262}
            height={445}
            priority
            sizes="120px"
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 min-[880px]:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-ink"
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
              "bg-orange text-charcoal-deep hover:bg-orange-dark",
            )}
          >
            Request a Quote
          </Link>

          <Sheet>
            <SheetTrigger
              aria-label="Open menu"
              className="flex size-9 items-center justify-center text-ink transition-colors hover:text-orange min-[880px]:hidden"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-line-dark bg-charcoal-dark text-bg"
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
