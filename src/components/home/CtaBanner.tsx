import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { business, buildWhatsAppLink } from "@/content/site";

export function CtaBanner() {
  return (
    <section className="px-4 py-16 md:px-8 md:py-20">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-primary px-6 py-14 text-primary-foreground shadow-elevated md:px-14 md:py-20">
        <div className="blob bg-coral/40 h-60 w-60 -top-20 -right-10" />
        <div className="blob bg-primary-foreground/15 h-72 w-72 -bottom-20 -left-10" />

        <div className="relative grid items-center gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-balance md:text-5xl">
              Need care today? We can be there in 2 hours.
            </h2>
            <p className="mt-3 max-w-xl text-primary-foreground/85 md:text-lg">
              Speak to a care coordinator now — or send a quick message and we'll call you back within 30 minutes.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button asChild variant="coral" size="lg">
              <a href={`tel:${business.phone}`}>
                <Phone className="h-4 w-4" /> Call {business.phoneDisplay}
              </a>
            </Button>
            <Button asChild variant="whatsapp" size="lg">
              <a href={buildWhatsAppLink("Hi ELIZA, I need home care urgently.")} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" /> WhatsApp Us
              </a>
            </Button>
            <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
              <Link to="/book">
                Book Online <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
