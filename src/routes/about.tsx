import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Shield, Sparkles, HandHeart, type LucideIcon } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { CtaBanner } from "@/components/home/CtaBanner";
import { aboutContent, business, cities } from "@/content/site";
import teamImg from "@/assets/team.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ELIZA — India's Trusted Home Healthcare Team" },
      {
        name: "description",
        content:
          "ELIZA is on a mission to make hospital-grade healthcare accessible at home. Meet the team behind 5,000+ family success stories.",
      },
      { property: "og:title", content: "About ELIZA Home Healthcare" },
      { property: "og:image", content: teamImg },
    ],
  }),
  component: AboutPage,
});

const valueIcons: Record<string, LucideIcon> = {
  "Compassion first": Heart,
  "Radical transparency": Sparkles,
  "Reliability": Shield,
  "Dignity": HandHeart,
};

function AboutPage() {
  return (
    <PageLayout>
      <section className="relative overflow-hidden bg-gradient-hero py-16 md:py-24">
        <div className="blob bg-coral/20 h-72 w-72 top-10 -right-20" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-2 md:px-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">About us</span>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-balance md:text-6xl">
              Care, the way it should be.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-foreground/85">
              {aboutContent.mission}
            </p>
          </div>
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            src={teamImg}
            alt="ELIZA healthcare team"
            width={1280}
            height={800}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-[2.5rem] object-cover shadow-elevated"
          />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-20 md:px-8">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-coral">Our story</span>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">Why ELIZA exists.</h2>
        <div className="mt-6 space-y-5 text-base leading-relaxed text-foreground/85 md:text-lg">
          {aboutContent.story.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <section className="bg-primary-soft/40 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Our values</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">What we stand for.</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {aboutContent.values.map((v) => {
              const Icon = valueIcons[v.title] ?? Heart;
              return (
                <div key={v.title} className="rounded-3xl bg-card p-6 shadow-card">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Cities we serve</h2>
          <p className="mt-3 text-muted-foreground">More cities coming soon — call us to check your location.</p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {cities.map((c) => (
            <span
              key={c}
              className="rounded-full border border-primary/20 bg-primary-soft px-5 py-2 text-sm font-semibold text-primary"
            >
              📍 {c}
            </span>
          ))}
        </div>
      </section>

      <CtaBanner />
    </PageLayout>
  );
}
