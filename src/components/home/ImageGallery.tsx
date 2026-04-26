import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

const slides = [
  { src: g1, title: "Bedside Nursing", caption: "Vitals, medication & gentle bedside care" },
  { src: g2, title: "Home Physiotherapy", caption: "Personalised rehab in your living room" },
  { src: g3, title: "Doctor Home Visits", caption: "MBBS & specialist consults at your door" },
  { src: g4, title: "Newborn & NICU Care", caption: "NICU-trained nurses for new parents" },
  { src: g5, title: "ICU at Home", caption: "Ventilator, tracheostomy & monitoring" },
  { src: g6, title: "Elderly Care", caption: "Mobility, companionship & daily living" },
];

export function ImageGallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", containScroll: "trimSnaps" },
    [Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })],
  );
  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    setSnapCount(emblaApi.scrollSnapList().length);
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi]);

  return (
    <section className="bg-gradient-hero py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-coral">
            Inside ELIZA care
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
            Real care, in real homes.
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            A glimpse into how our nurses, physios, and doctors deliver hospital-grade care to families across India.
          </p>
        </motion.div>

        <div className="mt-12 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 md:gap-5">
            {slides.map((s, i) => (
              <div
                key={i}
                className="relative min-w-0 flex-[0_0_85%] sm:flex-[0_0_55%] md:flex-[0_0_40%] lg:flex-[0_0_32%]"
              >
                <div className="group relative aspect-[4/5] overflow-hidden rounded-3xl shadow-card hover:shadow-elevated transition-all">
                  <img
                    src={s.src}
                    alt={`${s.title} — ELIZA home healthcare in India`}
                    width={1280}
                    height={896}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-coral">
                      {s.title}
                    </div>
                    <div className="mt-1 font-display text-lg font-bold text-white md:text-xl">
                      {s.caption}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {snapCount > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: snapCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to gallery slide ${i + 1}`}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-2 rounded-full transition-all ${
                  selected === i ? "w-8 bg-primary" : "w-2 bg-primary/25 hover:bg-primary/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
