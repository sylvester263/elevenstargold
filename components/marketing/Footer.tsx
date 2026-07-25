import Link from "next/link";
import { getSiteSettings, whatsappHref } from "@/lib/settings";
import { getRecentPosts } from "@/lib/blog";
import { company } from "@/content/site-copy";
import {
  WhatsAppIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "@/components/marketing/icons";

const SOCIAL_ICONS = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
} as const;

export async function Footer() {
  const settings = await getSiteSettings();
  const recentPosts = await getRecentPosts(3);

  return (
    <footer className="border-t border-line-dark bg-charcoal-dark text-muted-light">
      <div className="mx-auto max-w-[1160px] px-8 py-16 max-[600px]:px-4 max-[600px]:py-10">
        <div className="grid grid-cols-4 gap-10 max-[880px]:grid-cols-2 max-[600px]:grid-cols-1">
          <div>
            <p className="font-display text-sm font-semibold text-bg">
              {company.name}
            </p>
            <p className="mt-2 text-sm">{company.tagline}.</p>
            <p className="mt-4 text-sm">{settings.officeAddress}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-orange">
              Contact
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              <li>
                <a href={`mailto:${settings.email}`} className="hover:text-bg">
                  {settings.email}
                </a>
              </li>
              {settings.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="hover:text-bg"
                  >
                    {phone}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={whatsappHref(
                    settings.whatsappNumber,
                    settings.whatsappDefaultMessage,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-bg"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-orange">
              Company
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              <li>
                <Link href="/services" className="hover:text-bg">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="hover:text-bg">
                  Certifications
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-bg">
                  Safety
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-bg">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-orange">
              Work
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              <li>
                <Link href="/projects" className="hover:text-bg">
                  All Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/projects?category=government"
                  className="hover:text-bg"
                >
                  Government Projects
                </Link>
              </li>
              {recentPosts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="hover:text-bg">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 border-t border-line-dark pt-6 min-[600px]:flex-row min-[600px]:justify-between">
          <p className="text-xs">© {company.name}, Sheikhupura.</p>

          <div className="flex items-center gap-4">
            <a
              href={whatsappHref(
                settings.whatsappNumber,
                settings.whatsappDefaultMessage,
              )}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-muted-light transition-colors hover:text-bg"
            >
              <WhatsAppIcon className="size-4" />
            </a>
            {settings.socialLinks
              .filter((link) => link.url)
              .map((link) => {
                const Icon = SOCIAL_ICONS[link.platform];
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.platform}
                    className="text-muted-light transition-colors hover:text-bg"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
          </div>

          <p className="text-xs">{company.web}</p>
        </div>
      </div>
    </footer>
  );
}
