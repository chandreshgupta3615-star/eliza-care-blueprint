import { createFileRoute } from "@tanstack/react-router";
import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { Faq } from "@/components/home/Faq";
import { business, buildWhatsAppLink } from "@/content/site";

const SITE_URL = "https://elizahealthcare.in";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact ELIZA Home Healthcare | Call, WhatsApp, Email 24×7" },
      {
        name: "description",
        content:
          "Reach ELIZA Home Healthcare 24×7 by phone, WhatsApp or email. Coordinators respond within 30 minutes for home nursing, elderly care and medical services in Mumbai, Pune & India.",
      },
      {
        name: "keywords",
        content:
          "contact home nurse, ELIZA contact, home nursing helpline, WhatsApp nurse Mumbai, 24x7 nursing contact India",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Contact ELIZA Home Healthcare" },
      { property: "og:description", content: "Talk to a real coordinator in minutes — call, WhatsApp or email." },
      { property: "og:url", content: SITE_URL + "/contact" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageLayout>
      <section className="relative overflow-hidden bg-gradient-hero py-16 md:py-24">
        <div className="blob bg-primary/30 h-72 w-72 -top-20 -left-10" />
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Contact</span>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-balance md:text-6xl">
            Talk to a real human, fast.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Our coordinators are awake when you need us — call, WhatsApp, or write in. We respond within 30 minutes, day or night.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          <ChannelCard
            icon={Phone}
            title="Call us"
            value={business.phoneDisplay}
            cta="Tap to dial"
            href={`tel:${business.phone}`}
            theme="primary"
          />
          <ChannelCard
            icon={MessageCircle}
            title="WhatsApp"
            value="Instant chat"
            cta="Open WhatsApp"
            href={buildWhatsAppLink("Hi ELIZA, I'd like to enquire.")}
            theme="whatsapp"
          />
          <ChannelCard
            icon={Mail}
            title="Email"
            value={business.email}
            cta="Send mail"
            href={`mailto:${business.email}`}
            theme="coral"
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 md:grid-cols-5 md:px-8">
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <h3 className="font-display text-xl font-bold">Reach our office</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3"><MapPin className="h-4 w-4 mt-0.5 text-primary" />{business.address}</li>
              <li className="flex items-start gap-3"><Clock className="h-4 w-4 mt-0.5 text-primary" />{business.hours}</li>
              <li className="flex items-start gap-3"><Mail className="h-4 w-4 mt-0.5 text-primary" />{business.email}</li>
            </ul>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-card">
            <iframe
              title="ELIZA Mumbai location"
              src="https://www.google.com/maps?q=Mumbai&output=embed"
              loading="lazy"
              className="block h-72 w-full border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div className="md:col-span-3">
          <AppointmentForm />
        </div>
      </section>

      <Faq />
    </PageLayout>
  );
}

function ChannelCard({
  icon: Icon, title, value, cta, href, theme,
}: {
  icon: typeof Phone;
  title: string;
  value: string;
  cta: string;
  href: string;
  theme: "primary" | "whatsapp" | "coral";
}) {
  const bg = theme === "whatsapp" ? "bg-whatsapp" : theme === "coral" ? "bg-gradient-coral" : "bg-gradient-primary";
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="group flex flex-col rounded-3xl border border-border bg-card p-6 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all"
    >
      <div className={`grid h-14 w-14 place-items-center rounded-2xl text-white shadow-soft ${bg}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="mt-5 text-xs uppercase tracking-wider text-muted-foreground">{title}</div>
      <div className="mt-1 font-display text-xl font-bold">{value}</div>
      <div className="mt-4 text-sm font-semibold text-primary group-hover:text-coral transition-colors">{cta} →</div>
    </a>
  );
}
