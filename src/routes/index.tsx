import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { PainPoints } from "@/components/home/PainPoints";
import { WhyUs } from "@/components/home/WhyUs";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { EquipmentGrid } from "@/components/home/EquipmentGrid";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ImageGallery } from "@/components/home/ImageGallery";
import { Testimonials } from "@/components/home/Testimonials";
import { Faq } from "@/components/home/Faq";
import { CtaBanner } from "@/components/home/CtaBanner";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { business, faqs } from "@/content/site";
import heroImg from "@/assets/hero-nurse.jpg";

const SITE_URL = "https://elizahealthcare.in";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ELIZA — Home Nursing & Medical Equipment in Mumbai, Pune & India" },
      {
        name: "description",
        content:
          "ELIZA delivers hospital-grade home nursing, ICU nurses, elderly care, physiotherapy, doctor visits and medical equipment rental across Mumbai, Thane, Navi Mumbai, Pune & India. Certified ANM/GNM caregivers, 24×7 coordinator.",
      },
      {
        name: "keywords",
        content:
          "home nursing care, home nurse near me, ICU nurse at home, elderly care at home, patient attendant, home physiotherapy, doctor home visit, wound care at home, newborn care, hospital bed on rent, oxygen concentrator rent, BiPAP rent, home medical equipment, home healthcare Mumbai, home nursing Pune, nursing services Thane, ANM GNM nurse, 24x7 home care India, ELIZA healthcare",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "googlebot", content: "index, follow" },
      { name: "geo.region", content: "IN-MH" },
      { name: "geo.placename", content: "Mumbai" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:title", content: "ELIZA — Hospital-grade Home Healthcare in India" },
      { property: "og:description", content: business.shortDescription },
      { property: "og:image", content: heroImg },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ELIZA — Home Nursing & Healthcare" },
      { name: "twitter:description", content: business.shortDescription },
      { name: "twitter:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "MedicalBusiness",
              "@id": SITE_URL + "/#org",
              name: business.fullName,
              alternateName: business.name,
              url: SITE_URL,
              telephone: business.phone,
              email: business.email,
              image: SITE_URL + heroImg,
              priceRange: "₹₹",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Mumbai",
                addressRegion: "MH",
                addressCountry: "IN",
              },
              areaServed: ["Mumbai", "Thane", "Navi Mumbai", "Pune", "Nashik", "Nagpur"],
              openingHours: "Mo-Su 00:00-23:59",
              sameAs: [
                business.social.instagram,
                business.social.facebook,
                business.social.linkedin,
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <PageLayout>
      <Hero />
      <StatsBar />
      <PainPoints />
      <ServicesGrid limit={8} />
      <EquipmentGrid limit={4} />
      <WhyUs />
      <HowItWorks />
      <ImageGallery />

      <section
        id="book"
        className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-5 md:px-8"
      >
        <div className="md:col-span-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-coral">
            Book in 60 seconds
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
            Tell us what you need.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Share a few details — a care coordinator will call you back to design the right care plan for your family.
          </p>
        </div>
        <div className="md:col-span-3">
          <AppointmentForm compact />
        </div>
      </section>

      <Testimonials />
      <Faq />
      <CtaBanner />
    </PageLayout>
  );
}
