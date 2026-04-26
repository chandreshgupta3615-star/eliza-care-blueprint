import { Link } from "@tanstack/react-router";
import { HeartPulse, Mail, Phone, MapPin, Clock, Instagram, Facebook, Linkedin } from "lucide-react";
import { business, nav, services, buildWhatsAppLink } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden bg-gradient-to-b from-background to-primary-soft/40 border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground">
              <HeartPulse className="h-5 w-5" />
            </span>
            <div className="font-display text-lg font-bold">{business.name}</div>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            {business.shortDescription}
          </p>
          <div className="mt-6 flex gap-3">
            <a href={business.social.instagram} aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full bg-background border border-border hover:bg-primary hover:text-primary-foreground transition">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={business.social.facebook} aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full bg-background border border-border hover:bg-primary hover:text-primary-foreground transition">
              <Facebook className="h-4 w-4" />
            </a>
            <a href={business.social.linkedin} aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-full bg-background border border-border hover:bg-primary hover:text-primary-foreground transition">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">Company</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-primary transition-colors">{n.label}</Link>
              </li>
            ))}
            <li><Link to="/book" className="hover:text-primary transition-colors">Book Appointment</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">Services</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link to="/services" className="hover:text-primary transition-colors">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">Reach Us</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={`tel:${business.phone}`} className="flex items-start gap-3 text-muted-foreground hover:text-primary">
                <Phone className="h-4 w-4 mt-0.5 text-primary" />
                {business.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={buildWhatsAppLink("Hi ELIZA, I need home nursing care.")} className="flex items-start gap-3 text-muted-foreground hover:text-whatsapp" target="_blank" rel="noopener noreferrer">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-whatsapp text-[8px] mt-0.5">W</span>
                Chat on WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="flex items-start gap-3 text-muted-foreground hover:text-primary">
                <Mail className="h-4 w-4 mt-0.5 text-primary" />
                {business.email}
              </a>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <MapPin className="h-4 w-4 mt-0.5 text-primary" />
              {business.address}
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <Clock className="h-4 w-4 mt-0.5 text-primary" />
              {business.hours}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground md:flex-row md:px-8">
          <p>© {new Date().getFullYear()} {business.fullName}. All rights reserved.</p>
          <p>Compassionate care, delivered home.</p>
        </div>
      </div>
    </footer>
  );
}
