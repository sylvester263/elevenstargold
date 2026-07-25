import { getSiteSettings, whatsappHref } from "@/lib/settings";
import { WhatsAppIcon } from "@/components/marketing/icons";

// Floating action button, all pages, persistent across scroll. This is the
// one place allowed to break from navy/gold — WhatsApp brand recognition
// matters more here than palette purity — 03-header-and-footer.md.
export async function WhatsAppButton() {
  const settings = await getSiteSettings();

  return (
    <a
      href={whatsappHref(settings.whatsappNumber, settings.whatsappDefaultMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
