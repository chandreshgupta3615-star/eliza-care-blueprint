import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { X, Phone, MessageCircle, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { business, buildWhatsAppLink } from "@/content/site";

const SESSION_KEY = "eliza_book_modal_seen";
const SCROLL_THRESHOLD = 5;

/**
 * Auto-popup booking modal:
 * - Triggers after ~5 distinct scroll gestures, OR after 25s, whichever first
 * - Shows once per session (sessionStorage flag)
 * - Dismiss via close button, Escape key, or backdrop click
 * - Locks body scroll while open
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
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open) return null;

  const close = () => setOpen(false);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-popup-title"
      onClick={(e) => e.target === e.currentTarget && close()}
      className="fixed inset-0 z-[60] flex items-end justify-center bg-foreground/60 p-3 backdrop-blur-md sm:items-center sm:p-6 animate-fade-up"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-card shadow-elevated ring-1 ring-border/60">
        <button
          type="button"
          onClick={close}
          aria-label="Close booking popup"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-background/95 text-foreground shadow-soft hover:bg-background hover:scale-105 transition"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative bg-gradient-primary px-6 pt-7 pb-6 text-primary-foreground">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur">
            <ShieldCheck className="h-3 w-3" /> Free coordinator call
          </div>
          <h3 id="booking-popup-title" className="mt-3 font-display text-2xl font-bold leading-tight">
            Need a nurse or equipment at home?
          </h3>
          <p className="mt-2 text-sm text-primary-foreground/90 leading-relaxed">
            Share a few details — our care coordinator will call you back to plan the right care for your family.
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-primary-foreground/80">
            <Clock className="h-3 w-3" /> We usually reply within 30 minutes
          </div>
        </div>

        <div className="space-y-2.5 p-5">
          <Link
            to="/book"
            onClick={close}
            className="flex items-center justify-between rounded-2xl bg-coral px-4 py-3.5 text-sm font-semibold text-coral-foreground shadow-coral hover:brightness-110 active:scale-[0.99] transition"
          >
            <span>Book a free callback</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <a
            href={buildWhatsAppLink("Hi ELIZA, I'd like to enquire about home care.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="flex items-center justify-between rounded-2xl bg-whatsapp px-4 py-3.5 text-sm font-semibold text-white shadow-soft hover:brightness-110 active:scale-[0.99] transition"
          >
            <span className="inline-flex items-center gap-2">
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </span>
            <ArrowRight className="h-4 w-4" />
          </a>

          <a
            href={`tel:${business.phone}`}
            onClick={close}
            className="flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-3.5 text-sm font-semibold text-foreground hover:bg-primary-soft active:scale-[0.99] transition"
          >
            <span className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" /> Call {business.phoneDisplay}
            </span>
            <ArrowRight className="h-4 w-4" />
          </a>

          <button
            type="button"
            onClick={close}
            className="w-full pt-1 text-center text-xs text-muted-foreground hover:text-foreground transition"
          >
            Maybe later
          </button>
        </div>

        <p className="border-t border-border bg-primary-soft/30 px-5 py-3 text-center text-[11px] text-muted-foreground">
          24×7 coordinator • Mumbai, Pune & across India
        </p>
      </div>
    </div>
  );
}
