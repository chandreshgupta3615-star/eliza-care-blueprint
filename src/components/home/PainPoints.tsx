import { motion } from "framer-motion";
import { painPoints } from "@/content/site";

export function PainPoints() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-coral">The struggle is real</span>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
          Caring for a loved one shouldn't break you.
        </h2>
        <p className="mt-4 text-base text-muted-foreground md:text-lg">
          We've seen what families go through. Here's what we fix.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {painPoints.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="group relative rounded-3xl border border-border bg-card p-6 shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all"
          >
            <div className="absolute -top-3 left-6 grid h-8 w-8 place-items-center rounded-full bg-gradient-coral text-coral-foreground text-xs font-bold shadow-coral">
              {i + 1}
            </div>
            <h3 className="font-display text-lg font-bold leading-snug">{p.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
