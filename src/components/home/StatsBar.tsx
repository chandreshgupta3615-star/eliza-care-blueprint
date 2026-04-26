import { motion } from "framer-motion";
import { stats } from "@/content/site";

export function StatsBar() {
  return (
    <section className="relative -mt-8 z-10 mx-auto max-w-6xl px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-border shadow-card md:grid-cols-4"
      >
        {stats.map((s) => (
          <div key={s.label} className="bg-background px-4 py-6 text-center md:py-8">
            <div className="font-display text-2xl font-bold text-primary md:text-4xl">{s.value}</div>
            <div className="mt-1 text-xs font-medium text-muted-foreground md:text-sm">{s.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
