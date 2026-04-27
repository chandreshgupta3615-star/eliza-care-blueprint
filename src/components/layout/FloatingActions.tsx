import { MessageCircle, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { business, buildWhatsAppLink } from "@/content/site";

/**
 * Floating action stack — WhatsApp + Call buttons.
 * On mobile, sits just above the sticky CTA bar so it never overlaps content.
 * On desktop, anchored bottom-right.
 */
export function FloatingActions() {
  return (
    <div
      aria-label="Quick contact"
      className="fixed right-3 z-40 flex flex-col items-end gap-3 bottom-[5.5rem] md:bottom-6 md:right-6"
    >
      <a
        href={`tel:${business.phone}`}
        aria-label={`Call ELIZA at ${business.phoneDisplay}`}
        className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-elevated hover:scale-110 transition-transform md:h-14 md:w-14"
      >
        <Phone className="h-5 w-5 md:h-6 md:w-6" />
      </a>
      <a
        href={buildWhatsAppLink("Hi ELIZA, I need home nursing care.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative grid h-12 w-12 place-items-center rounded-full bg-whatsapp text-white shadow-elevated pulse-ring hover:scale-110 transition-transform md:h-14 md:w-14"
      >
        <MessageCircle className="h-5 w-5 md:h-6 md:w-6" fill="currentColor" />
      </a>
    </div>
  );
}

/** Mobile-only sticky bottom CTA bar (call + book) */
export function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 md:hidden">
      <div className="mx-2 mb-2 flex items-center gap-2 rounded-2xl bg-background/95 p-2 shadow-elevated backdrop-blur-xl border border-border">
        <a
          href={`tel:${business.phone}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-3 py-3 text-sm font-semibold text-primary-foreground"
        >
          <Phone className="h-4 w-4" /> Call
        </a>
        <Link
          to="/book"
          className="flex flex-1 items-center justify-center rounded-xl bg-coral px-3 py-3 text-sm font-semibold text-coral-foreground"
        >
          Book
        </Link>
      </div>
    </div>
  );
}

/** @deprecated kept for backwards compat — use <FloatingActions /> */
export function WhatsAppFloat() {
  return <FloatingActions />;
}
