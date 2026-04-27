import { motion } from "framer-motion";
import { ShieldCheck, Clock, HeartHandshake, Truck, Phone, Stethoscope, type LucideIcon } from "lucide-react";
import { whyUs } from "@/content/site";

const icons: Record<string, LucideIcon> = {
  ShieldCheck, Clock, HeartHandshake, Truck, Phone, Stethoscope,
};

export function WhyUs() {
  return (
    <section className="bg-primary-soft/40 py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Why ELIZA</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
            The care you'd want for your own family.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((w, i) => {
            const Icon = icons[w.icon] ?? ShieldCheck;
            return (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-3xl bg-card p-7 shadow-card hover:shadow-elevated transition-all"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-soft">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{w.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{w.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
