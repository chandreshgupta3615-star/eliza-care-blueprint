import { motion } from "framer-motion";
import { howItWorks } from "@/content/site";

export function HowItWorks() {
  return (
    <section className="bg-gradient-hero py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">How it works</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
            Care arranged in 3 simple steps.
          </h2>
        </div>

        <div className="relative mt-16 grid gap-8 md:grid-cols-3">
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent md:block" />
          {howItWorks.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="relative mx-auto grid h-24 w-24 place-items-center rounded-full bg-background shadow-elevated">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-primary text-primary-foreground font-display text-2xl font-bold">
                  {s.step}
                </div>
              </div>
              <h3 className="mt-6 font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-2 mx-auto max-w-xs text-sm text-muted-foreground">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
