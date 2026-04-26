import { createFileRoute } from "@tanstack/react-router";
import { Phone, MessageCircle, Mail, Clock, ShieldCheck } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { business, buildWhatsAppLink } from "@/content/site";

const SITE_URL = "https://elizahealthcare.in";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Home Nurse Online | Same-Day Appointment | ELIZA" },
      {
        name: "description",
        content:
          "Book ELIZA home nursing in 60 seconds. Care coordinator calls back in 30 minutes. ANM/GNM certified caregivers deployed within 2 hours across Mumbai, Pune & India.",
      },
      {
        name: "keywords",
        content:
          "book home nurse, online nurse appointment, hire home nurse Mumbai, same day nurse Pune, ICU nurse booking, elderly care booking",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Book ELIZA Home Healthcare" },
      { property: "og:description", content: "Book a certified home nurse in 60 seconds — coordinator calls back in 30 minutes." },
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
              <span className="bg-gradient-primary bg-clip-text text-transparent">60 seconds.</span>
            </h1>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">
              Tell us a little about your patient. Our care coordinator will call you within 30 minutes — and we typically deploy a caregiver within 2 hours.
            </p>

            <div className="mt-8 space-y-4">
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
      <div className={`grid h-11 w-11 place-items-center rounded-2xl ${accent === "whatsapp" ? "bg-whatsapp text-white" : "bg-gradient-primary text-primary-foreground"} shadow-soft`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="font-semibold">{value}</div>
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
