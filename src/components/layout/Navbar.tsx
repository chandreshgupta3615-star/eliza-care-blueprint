import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { business, nav } from "@/content/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-soft"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-soft group-hover:scale-105 transition-transform">
            <HeartPulse className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <div className="font-display text-lg font-bold tracking-tight">{business.name}</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Home Healthcare
            </div>
          </div>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="relative rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground hover:bg-primary-soft"
                activeProps={{ className: "text-primary bg-primary-soft" }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${business.phone}`}
            className="flex items-center gap-2 text-sm font-semibold text-foreground/80 hover:text-primary"
          >
            <Phone className="h-4 w-4" />
            {business.phoneDisplay}
          </a>
          <Button asChild variant="coral" size="default">
            <Link to="/book">Book Now</Link>
          </Button>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <ul className="flex flex-col p-4">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="block rounded-2xl px-4 py-3 text-base font-medium hover:bg-primary-soft"
                  activeProps={{ className: "text-primary bg-primary-soft" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Button asChild variant="coral" size="lg" className="w-full">
                <Link to="/book">Book Appointment</Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
