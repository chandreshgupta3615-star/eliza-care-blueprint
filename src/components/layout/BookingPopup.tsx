import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { X, Phone, MessageCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { business, buildWhatsAppLink } from "@/content/site";

const SESSION_KEY = "eliza_book_modal_seen";
const SCROLL_THRESHOLD = 5;

/**
 * Auto-popup booking modal:
 * - Triggers after the user does ~5 distinct scroll gestures
 * - Or after 25s on the page (whichever happens first)
 * - Shows once per session (sessionStorage flag)
 * - User can dismiss with the close button or Escape key
 */
export function BookingPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    let scrollCount = 0;
    let lastY = window.scrollY;
    let timeoutId: ReturnType<typeof setTimeout>;

    const trigger = () => {
      if (sessionStorage.getItem(SESSION_KEY)) return;
      sessionStorage.setItem(SESSION_KEY, "1");
      setOpen(true);
      cleanup();
    };

    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) > 120) {
        scrollCount += 1;
        lastY = y;
        if (scrollCount >= SCROLL_THRESHOLD) trigger();
      }
    };

    const cleanup = () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timeoutId);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    timeoutId = setTimeout(trigger, 25_000);

    return cleanup;
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-popup-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/55 p-3 backdrop-blur-sm sm:items-center sm:p-6 animate-fade-up"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-card shadow-elevated">
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close booking popup"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground shadow-soft hover:bg-background transition"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="bg-gradient-primary px-6 pt-7 pb-5 text-primary-foreground">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur">
            <ShieldCheck className="h-3 w-3" /> Free coordinator call
          </div>
          <h3 id="booking-popup-title" className="mt-3 font-display text-2xl font-bold leading-tight">
            Need a nurse or equipment at home?
          </h3>
          <p className="mt-2 text-sm text-primary-foreground/85">
            Tell us once — our care coordinator will call you back to design the right plan for your family.
          </p>
        </div>

        <div className="space-y-2.5 p-5">
          <Link
            to="/book"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between rounded-2xl bg-coral px-4 py-3.5 text-sm font-semibold text-coral-foreground shadow-coral hover:brightness-110 transition"
          >
            <span>Book a free callback</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <a
            href={buildWhatsAppLink("Hi ELIZA, I'd like to enquire about home care.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-2xl bg-whatsapp px-4 py-3.5 text-sm font-semibold text-white shadow-soft hover:brightness-110 transition"
          >
            <span className="inline-flex items-center gap-2">
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </span>
            <ArrowRight className="h-4 w-4" />
          </a>

          <a
            href={`tel:${business.phone}`}
            className="flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-3.5 text-sm font-semibold text-foreground hover:bg-primary-soft transition"
          >
            <span className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" /> Call {business.phoneDisplay}
            </span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <p className="border-t border-border px-5 py-3 text-center text-[11px] text-muted-foreground">
          24×7 coordinator • Available across Mumbai, Pune & India
        </p>
      </div>
    </div>
  );
}
