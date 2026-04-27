import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  Syringe, Activity, Users, User, Dumbbell, Stethoscope, Bandage, Baby, ArrowRight, type LucideIcon,
} from "lucide-react";
import { services } from "@/content/site";
import { Button } from "@/components/ui/button";

const icons: Record<string, LucideIcon> = {
  Syringe, Activity, Users, User, Dumbbell, Stethoscope, Bandage, Baby,
};

export function ServicesGrid({ limit }: { limit?: number }) {
  const list = limit ? services.slice(0, limit) : services;
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-coral">Our services</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
            Complete home healthcare under one roof.
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            From routine nursing to ICU-level care — every service delivered by certified professionals.
          </p>
        </div>
        {limit && (
          <Button asChild variant="outline">
            <Link to="/services">View all <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        )}
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((s, i) => {
          const Icon = icons[s.icon] ?? Syringe;
          return (
            <motion.article
              key={s.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all"
            >
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary group-hover:bg-gradient-primary group-hover:text-primary-foreground transition-all">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">{s.short}</p>
              <ul className="mt-4 space-y-1.5">
                {s.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-xs text-foreground/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center justify-between gap-2">
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
                  aria-label={`Learn more about ${s.title}`}
                >
                  Learn more
                </Link>
                <Link
                  to="/book"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-coral hover:gap-2 transition-all"
                  aria-label={`Book ${s.title}`}
                >
                  Book <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
