import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/content/site";

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-coral">Family stories</span>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
          Trusted by thousands of Indian families.
        </h2>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex flex-col rounded-3xl bg-card p-6 shadow-card hover:shadow-elevated transition-all"
          >
            <div className="flex gap-0.5 text-coral">
              {Array.from({ length: t.rating }).map((_, idx) => (
                <Star key={idx} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/85">
              "{t.text}"
            </blockquote>
            <figcaption className="mt-5 border-t border-border pt-4">
              <div className="font-semibold text-sm">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role}</div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
