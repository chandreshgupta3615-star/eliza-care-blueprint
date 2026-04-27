import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Phone, MessageCircle } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Faq } from "@/components/home/Faq";
import { services, business, buildWhatsAppLink, equipment } from "@/content/site";
import { equipmentImages } from "@/components/home/EquipmentGrid";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

const SITE_URL = "https://elizahealthcare.in";

const serviceImageMap: Record<string, string> = {
  "home-nursing": g1,
  physiotherapy: g2,
  "doctor-visit": g3,
  "newborn-care": g4,
  "icu-nurse": g5,
  "elderly-care": g6,
  "patient-attendant": g1,
  "wound-care": g2,
};

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    if (!s) return {};
    const img = serviceImageMap[s.slug] || g1;
    return {
      meta: [
        { title: `${s.title} at Home | ELIZA Home Healthcare` },
        { name: "description", content: `${s.long} Available in Mumbai, Pune & across India.` },
        {
          name: "keywords",
          content: `${s.title.toLowerCase()}, ${s.title.toLowerCase()} at home, ${s.title.toLowerCase()} Mumbai, ${s.title.toLowerCase()} Pune, home healthcare India`,
        },
        { name: "robots", content: "index, follow" },
        { property: "og:type", content: "article" },
        { property: "og:title", content: `${s.title} — ELIZA Home Healthcare` },
        { property: "og:description", content: s.long },
        { property: "og:image", content: img },
        { property: "og:url", content: `${SITE_URL}/services/${s.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: img },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/services/${s.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            name: s.title,
            description: s.long,
            provider: { "@type": "MedicalBusiness", name: "ELIZA Home Healthcare" },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <PageLayout>
      <div className="mx-auto max-w-md px-4 py-32 text-center">
        <h1 className="font-display text-4xl font-bold">Service not found</h1>
        <p className="mt-3 text-muted-foreground">The service you're looking for doesn't exist.</p>
        <Link to="/services" className="mt-6 inline-flex items-center gap-2 text-primary font-semibold">
          ← Back to all services
        </Link>
      </div>
    </PageLayout>
  ),
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { service: s } = Route.useLoaderData();
  const img = serviceImageMap[s.slug] || g1;
  const related = services.filter((x) => x.slug !== s.slug).slice(0, 3);
  const equipmentSuggestion = equipment.slice(0, 3);

  return (
    <PageLayout>
      <section className="relative overflow-hidden bg-gradient-hero py-12 md:py-20">
        <div className="blob bg-primary/25 h-72 w-72 -top-20 -left-10" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-2 md:px-8">
          <div>
            <Link
              to="/services"
              className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary hover:gap-2 transition-all"
            >
              ← All services
            </Link>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-balance md:text-6xl">
              {s.title} <span className="text-primary">at home.</span>
            </h1>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">{s.long}</p>

            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {s.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm font-medium text-foreground/85">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/book"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-coral px-6 py-3 text-sm font-semibold text-coral-foreground shadow-coral hover:brightness-110 transition"
              >
                Book {s.title} <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={buildWhatsAppLink(`Hi ELIZA, I'd like to enquire about ${s.title}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-white shadow-soft hover:brightness-110 transition"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp us
              </a>
            </div>

            <a
              href={`tel:${business.phone}`}
              className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
            >
              <Phone className="h-4 w-4" /> Or call {business.phoneDisplay}
            </a>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-elevated md:aspect-[4/5]">
            <img
              src={img}
              alt={`${s.title} by ELIZA — certified caregivers in India`}
              width={1280}
              height={1600}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 md:px-8">
        <h2 className="font-display text-2xl font-bold md:text-3xl">
          What's included with {s.title}
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { t: "Certified caregivers", b: "ANM/GNM/B.Sc qualified, background-verified, Nursing Council registered." },
            { t: "Care plan & updates", b: "Daily nursing notes and family updates — coordinated with your doctor." },
            { t: "Free replacement", b: "Not the right fit? We replace your caregiver — no questions asked." },
          ].map((item) => (
            <div key={item.t} className="rounded-3xl border border-border bg-card p-5 shadow-soft">
              <h3 className="font-display text-base font-bold">{item.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary-soft/30 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            Equipment that pairs well with {s.title}
          </h2>
          <p className="mt-2 text-muted-foreground">Add these to your care plan if needed — we deliver and install at home.</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {equipmentSuggestion.map((e) => (
              <Link
                key={e.slug}
                to="/equipment"
                className="group flex gap-4 rounded-3xl border border-border bg-card p-4 shadow-soft hover:shadow-elevated transition"
              >
                <div className="aspect-square h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-primary-soft/40">
                  <img
                    src={equipmentImages[e.image]}
                    alt={`${e.title} for ${s.title}`}
                    width={200}
                    height={200}
                    loading="lazy"
                    className="h-full w-full object-contain p-1.5"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display text-base font-bold leading-tight">{e.title}</div>
                  <div className="mt-1 text-xs text-muted-foreground line-clamp-2">{e.short}</div>
                  <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-coral group-hover:gap-2 transition-all">
                    See details <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <h2 className="font-display text-2xl font-bold md:text-3xl">Related services</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {related.map((r) => (
            <Link
              key={r.slug}
              to="/services/$slug"
              params={{ slug: r.slug }}
              className="group rounded-3xl border border-border bg-card p-5 shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all"
            >
              <h3 className="font-display text-lg font-bold">{r.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{r.short}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-coral group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Faq />
      <CtaBanner />
    </PageLayout>
  );
}
