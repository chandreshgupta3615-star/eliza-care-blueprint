import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, ShieldCheck, Wrench, Phone } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { EquipmentGrid } from "@/components/home/EquipmentGrid";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Faq } from "@/components/home/Faq";
import { equipment, business } from "@/content/site";
import bedImg from "@/assets/equipment-bed.jpg";

const SITE_URL = "https://elizahealthcare.in";

export const Route = createFileRoute("/equipment")({
  head: () => ({
    meta: [
      {
        title:
          "Home Medical Equipment Rental | Hospital Bed, Oxygen, BiPAP | ELIZA",
      },
      {
        name: "description",
        content:
          "Rent or buy hospital beds, oxygen concentrators, BiPAP/CPAP, patient monitors, wheelchairs, walkers, suction & nebulizers — delivered, installed and supported across Mumbai, Pune & India.",
      },
      {
        name: "keywords",
        content:
          "home medical equipment rental, hospital bed on rent Mumbai, oxygen concentrator rent Pune, BiPAP machine rent India, patient monitor home, wheelchair rental, walker for elderly, suction machine home, nebulizer home, ICU setup at home",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Home Medical Equipment by ELIZA" },
      {
        property: "og:description",
        content: "ICU-grade equipment delivered, installed and supported at home.",
      },
      { property: "og:image", content: bedImg },
      { property: "og:url", content: SITE_URL + "/equipment" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: bedImg },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/equipment" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Home Medical Equipment by ELIZA",
          itemListElement: equipment.map((e, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Product",
              name: e.title,
              description: e.long,
            },
          })),
        }),
      },
    ],
  }),
  component: EquipmentPage,
});

const valueProps = [
  {
    icon: Truck,
    title: "Delivered & installed",
    body: "Our technician brings the equipment to your door, sets it up and trains the family.",
  },
  {
    icon: ShieldCheck,
    title: "Sanitised & quality-checked",
    body: "Every unit is serviced, sanitised and quality-tested before it reaches your home.",
  },
  {
    icon: Wrench,
    title: "24×7 service support",
    body: "Anything stops working? Call us — we replace or repair on priority.",
  },
];

function EquipmentPage() {
  return (
    <PageLayout>
      <section className="relative overflow-hidden bg-gradient-hero py-16 md:py-24">
        <div className="blob bg-primary/30 h-72 w-72 -top-20 right-0" />
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Equipment rental
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-balance md:text-6xl">
            Bring the hospital ward home — minus the ward.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Hospital beds, oxygen concentrators, BiPAP/CPAP, multi-para monitors, wheelchairs and
            more — delivered, installed and supported by our trained technicians.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/book"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-coral px-6 py-3 text-sm font-semibold text-coral-foreground shadow-coral hover:brightness-110 transition"
            >
              Enquire about equipment <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${business.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary/20 bg-background px-6 py-3 text-sm font-semibold hover:bg-primary-soft hover:border-primary/40 transition"
            >
              <Phone className="h-4 w-4 text-primary" /> Call {business.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {valueProps.map((v) => (
            <div
              key={v.title}
              className="rounded-3xl border border-border bg-card p-6 shadow-soft"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-soft">
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <EquipmentGrid />
      <Faq />
      <CtaBanner />
    </PageLayout>
  );
}
