import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { PainPoints } from "@/components/home/PainPoints";
import { WhyUs } from "@/components/home/WhyUs";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { Faq } from "@/components/home/Faq";
import { CtaBanner } from "@/components/home/CtaBanner";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { business } from "@/content/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ELIZA — Home Nursing & Healthcare in India | Book a Nurse" },
      {
        name: "description",
        content:
          "ELIZA delivers hospital-grade home nursing, ICU nurses, elderly care, physiotherapy and doctor visits in 2 hours. Certified caregivers, transparent pricing, 24×7 support.",
      },
      { property: "og:title", content: "ELIZA — Hospital-grade Home Healthcare" },
      { property: "og:description", content: business.shortDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
      <WhyUs />
      <HowItWorks />

      <section id="book" className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-5 md:px-8">
        <div className="md:col-span-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-coral">Book in 60 seconds</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
            Tell us what you need.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Share a few details — a care coordinator will call you within 30 minutes to design the right care plan for your family.
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
