import { MessageCircle, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { business, buildWhatsAppLink } from "@/content/site";

/** Floating WhatsApp button (desktop + mobile) */
export function WhatsAppFloat() {
  return (
    <a
      href={buildWhatsAppLink("Hi ELIZA, I need home nursing care.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-24 right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-elevated pulse-ring hover:scale-110 transition-transform md:bottom-6 md:right-6 md:h-16 md:w-16"
    >
      <MessageCircle className="h-7 w-7" fill="currentColor" />
    </a>
  );
}

/** Mobile-only sticky bottom CTA bar (call + WhatsApp + book) */
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
