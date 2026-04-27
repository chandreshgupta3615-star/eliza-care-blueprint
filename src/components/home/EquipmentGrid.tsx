import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { equipment } from "@/content/site";

import bed from "@/assets/equipment-bed.jpg";
import oxygen from "@/assets/equipment-oxygen.jpg";
import bipap from "@/assets/equipment-bipap.jpg";
import monitor from "@/assets/equipment-monitor.jpg";
import wheelchair from "@/assets/equipment-wheelchair.jpg";
import walker from "@/assets/equipment-walker.jpg";
import suction from "@/assets/equipment-suction.jpg";
import nebulizer from "@/assets/equipment-nebulizer.jpg";

export const equipmentImages: Record<string, string> = {
  bed,
  oxygen,
  bipap,
  monitor,
  wheelchair,
  walker,
  suction,
  nebulizer,
};

export function EquipmentGrid({ limit, withHeader = true }: { limit?: number; withHeader?: boolean }) {
  const list = limit ? equipment.slice(0, limit) : equipment;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
      {withHeader && (
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-coral">
              Home medical equipment
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
              ICU-grade equipment, delivered & installed.
            </h2>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              Hospital beds, oxygen concentrators, BiPAP/CPAP, patient monitors and mobility aids —
              brought to your home, set up by a technician, and supported 24×7.
            </p>
          </div>
          {limit && (
            <Link
              to="/equipment"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary/20 bg-background px-5 py-2 text-sm font-semibold text-foreground hover:bg-primary-soft hover:border-primary/40 transition-colors"
            >
              View all equipment <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      )}

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((e, i) => (
          <motion.article
            key={e.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
            className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={equipmentImages[e.image]}
                alt={`${e.title} — home medical equipment by ELIZA`}
                width={1024}
                height={768}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-lg font-bold leading-snug">{e.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">{e.short}</p>
              <ul className="mt-4 space-y-1.5">
                {e.uses.slice(0, 3).map((u) => (
                  <li key={u} className="flex items-center gap-2 text-xs text-foreground/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {u}
                  </li>
                ))}
              </ul>
              <Link
                to="/book"
                aria-label={`Enquire about ${e.title}`}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-coral hover:gap-2 transition-all"
              >
                Enquire now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
