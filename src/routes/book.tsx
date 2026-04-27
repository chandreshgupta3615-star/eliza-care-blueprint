import { createFileRoute } from "@tanstack/react-router";
import { Phone, MessageCircle, Mail, Clock, ShieldCheck } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { business, buildWhatsAppLink } from "@/content/site";

const SITE_URL = "https://elizahealthcare.in";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Home Nurse Online | Care Coordinator Callback | ELIZA" },
      {
        name: "description",
        content:
          "Book ELIZA home nursing in 60 seconds. A care coordinator calls you back to plan certified ANM/GNM caregivers, ICU nurses or medical equipment across Mumbai, Pune & India.",
      },
      {
        name: "keywords",
        content:
          "book home nurse, online nurse appointment, hire home nurse Mumbai, nurse booking Pune, ICU nurse booking, elderly care booking, home medical equipment booking",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Book ELIZA Home Healthcare" },
      { property: "og:description", content: "Book a certified home nurse — coordinator calls you back fast." },
      { property: "og:url", content: SITE_URL + "/book" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/book" }],
  }),
  component: BookPage,
});

function BookPage() {
  return (
    <PageLayout>
      <section className="relative overflow-hidden bg-gradient-hero py-12 md:py-20">
        <div className="blob bg-coral/25 h-72 w-72 -top-20 -right-10" />
        <div className="blob bg-primary/30 h-72 w-72 -bottom-20 -left-10" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-5 md:gap-12 md:px-8">
          <div className="md:col-span-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Book appointment</span>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-balance md:text-5xl">
              Care arranged in
              <br />
              <span className="relative inline-block text-primary">
                60 seconds.
                <svg
                  aria-hidden="true"
                  viewBox="0 0 200 14"
                  className="absolute -bottom-1 left-0 w-full text-coral/70"
                  preserveAspectRatio="none"
                >
                  <path d="M2 10 Q 50 2 100 8 T 198 6" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">
              Tell us a little about your patient. Our care coordinator will call you back to design the right care plan and timing for your family.
            </p>

            <div className="mt-8 space-y-3">
              <ContactRow icon={Phone} label="Call us 24×7" value={business.phoneDisplay} href={`tel:${business.phone}`} />
              <ContactRow
                icon={MessageCircle}
                label="WhatsApp instantly"
                value="Click to chat"
                href={buildWhatsAppLink("Hi ELIZA, I need home nursing care.")}
                accent="whatsapp"
              />
              <ContactRow icon={Mail} label="Email" value={business.email} href={`mailto:${business.email}`} />
              <ContactRow icon={Clock} label="Hours" value={business.hours} />
            </div>

            <div className="mt-8 rounded-2xl border border-primary/20 bg-primary-soft/60 p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                <p className="text-sm text-foreground/85">
                  <span className="font-semibold">Your data is safe.</span> We never share your details — used only to coordinate care.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <AppointmentForm />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  accent,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
  accent?: "whatsapp";
}) {
  const inner = (
    <>
      <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${accent === "whatsapp" ? "bg-whatsapp text-white" : "bg-gradient-primary text-primary-foreground"} shadow-soft`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="font-semibold truncate">{value}</div>
      </div>
    </>
  );

  if (href)
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 transition-all hover:shadow-soft hover:-translate-y-0.5">
        {inner}
      </a>
    );

  return <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">{inner}</div>;
}
