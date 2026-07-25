// Brand icons lucide-react doesn't ship (it's a generic icon set, not brand
// marks) — kept minimal and inline rather than pulling in a brand-icon pkg.

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.004 2C6.486 2 2 6.486 2 12.004c0 1.858.502 3.66 1.454 5.242L2 22l4.897-1.412a9.96 9.96 0 0 0 5.106 1.404h.004c5.518 0 10.004-4.486 10.004-10.004S17.522 2 12.004 2zm0 18.164h-.003a8.13 8.13 0 0 1-4.14-1.133l-.297-.176-2.906.838.85-2.834-.194-.29a8.135 8.135 0 0 1-1.246-4.348c0-4.502 3.664-8.166 8.169-8.166 2.182 0 4.233.85 5.775 2.393a8.106 8.106 0 0 1 2.39 5.776c0 4.502-3.664 8.166-8.398 8.166z" />
    </svg>
  );
}

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.87.24-1.46 1.5-1.46H16.6V4.36C16.32 4.32 15.36 4.25 14.24 4.25c-2.34 0-3.94 1.43-3.94 4.05V10.5H7.75v3H10.3V21h3.2z" />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M6.94 8.5H4.02V20h2.92V8.5zM5.48 4a1.69 1.69 0 1 0 0 3.38A1.69 1.69 0 0 0 5.48 4zM20 13.34c0-3.14-1.68-4.6-3.92-4.6-1.81 0-2.62 1-3.07 1.7V8.5H10.1c.04.86 0 11.5 0 11.5H13v-6.42c0-.34.02-.68.12-.93.27-.68.9-1.38 1.94-1.38 1.37 0 1.92 1.04 1.92 2.57V20H20v-6.66z" />
    </svg>
  );
}

export function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.6 7.6a2.7 2.7 0 0 0-1.9-1.9C18 5.2 12 5.2 12 5.2s-6 0-7.7.5a2.7 2.7 0 0 0-1.9 1.9A28.4 28.4 0 0 0 2 12a28.4 28.4 0 0 0 .4 4.4 2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9A28.4 28.4 0 0 0 22 12a28.4 28.4 0 0 0-.4-4.4zM10 15V9l5.2 3-5.2 3z" />
    </svg>
  );
}
