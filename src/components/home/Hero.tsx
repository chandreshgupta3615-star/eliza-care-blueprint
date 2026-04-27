import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hero, business, buildWhatsAppLink } from "@/content/site";
import heroImg from "@/assets/hero-nurse.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="blob bg-primary/30 h-72 w-72 -top-20 -left-20" />
      <div className="blob bg-coral/20 h-96 w-96 top-40 -right-20" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pt-12 pb-16 md:grid-cols-2 md:gap-8 md:pt-20 md:pb-28 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
            <span className="grid h-1.5 w-1.5 place-items-center rounded-full bg-whatsapp pulse-ring" />
            {hero.eyebrow}
          </span>

          <h1 className="mt-5 font-display text-[2.25rem] font-extrabold leading-[1.1] tracking-tight text-balance text-foreground md:text-6xl lg:text-7xl">
            Hospital-grade care,{" "}
            <span className="relative whitespace-nowrap text-primary">
              gently
              <svg
                aria-hidden="true"
                viewBox="0 0 200 14"
                className="absolute -bottom-1 left-0 w-full text-coral/70"
                preserveAspectRatio="none"
              >
                <path d="M2 10 Q 50 2 100 8 T 198 6" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>{" "}
            at home.
          </h1>

          <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
            {hero.subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="coral" size="xl">
              <Link to={hero.primaryCta.to}>
                {hero.primaryCta.label} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="whatsapp" size="xl">
              <a
                href={buildWhatsAppLink("Hi ELIZA, I'd like to enquire about home nursing.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" /> {hero.secondaryCta.label}
              </a>
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
            {hero.trustChips.map((c) => (
              <li
                key={c}
                className="flex items-center gap-1.5 text-xs font-medium text-foreground/80 md:text-sm"
              >
                <CheckCircle2 className="h-4 w-4 text-primary" />
                {c}
              </li>
            ))}
          </ul>

          <a
            href={`tel:${business.phone}`}
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            Or call us 24×7 — <span className="font-bold text-foreground">{business.phoneDisplay}</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] shadow-elevated">
            <img
              src={heroImg}
              alt="Certified ELIZA home nurse caring for an elderly patient at home in India"
              width={1600}
              height={1200}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute -left-2 top-10 max-w-[200px] rounded-2xl bg-background/95 p-3 shadow-card backdrop-blur md:-left-8"
          >
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-whatsapp/10 text-whatsapp">
                ★
              </div>
              <div>
                <div className="text-sm font-bold">4.9 / 5</div>
                <div className="text-[10px] text-muted-foreground">5,000+ families</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute -right-2 bottom-10 max-w-[220px] rounded-2xl bg-background/95 p-3 shadow-card backdrop-blur md:-right-8 animate-float"
          >
            <div className="text-[10px] font-semibold uppercase tracking-wider text-primary">
              Coordinator online
            </div>
            <div className="mt-1 text-sm font-semibold">24×7 callback</div>
            <div className="text-[10px] text-muted-foreground">Mumbai • Pune • across India</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
