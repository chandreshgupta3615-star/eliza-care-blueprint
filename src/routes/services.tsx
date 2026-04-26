import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Faq } from "@/components/home/Faq";
import serviceImg from "@/assets/service-nursing.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Home Nursing Services | ICU Nurse, Elderly Care, Physio | ELIZA" },
      {
        name: "description",
        content:
          "Explore ELIZA's full range of home healthcare services — ICU nurses, elderly care, physiotherapy, doctor visits, wound care, newborn care and more across India.",
      },
      { property: "og:title", content: "ELIZA Home Healthcare Services" },
      { property: "og:description", content: "Complete home healthcare services from certified professionals." },
      { property: "og:image", content: serviceImg },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <PageLayout>
      <section className="relative overflow-hidden bg-gradient-hero py-16 md:py-24">
        <div className="blob bg-primary/30 h-72 w-72 -top-20 right-0" />
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Services</span>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-balance md:text-6xl">
            Every kind of care, in the comfort of home.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Whether you need a single dressing change or 24×7 ICU support, our certified caregivers bring hospital-grade expertise to your doorstep.
          </p>
        </div>
      </section>

      <ServicesGrid />
      <Faq />
      <CtaBanner />
    </PageLayout>
  );
}
