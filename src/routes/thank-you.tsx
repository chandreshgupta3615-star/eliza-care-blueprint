import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { CheckCircle2, Phone, MessageCircle, ArrowRight, Clock, ShieldCheck } from "lucide-react";
import { z } from "zod";
import { PageLayout } from "@/components/layout/PageLayout";
import { business, buildWhatsAppLink } from "@/content/site";

const SITE_URL = "https://elizahealthcare.in";

const searchSchema = z.object({ name: z.string().optional() });

export const Route = createFileRoute("/thank-you")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Thank You — We'll Call You Back Shortly | ELIZA" },
      {
        name: "description",
        content:
          "Your home nursing request is received. ELIZA's care coordinator will call you back as soon as possible to design the right care plan.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/thank-you" }],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  const search = useSearch({ from: "/thank-you" });
  const name = (search as { name?: string }).name;

  return (
    <PageLayout>
      <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-28">
        <div className="blob bg-primary/30 h-72 w-72 -top-20 -right-10" />
        <div className="blob bg-coral/20 h-72 w-72 -bottom-20 -left-10" />

        <div className="relative mx-auto max-w-2xl px-4 text-center md:px-8 animate-fade-up">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-whatsapp/15 text-whatsapp shadow-soft">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <h1 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight text-balance md:text-5xl">
            {name ? `Thank you, ${name}!` : "Thank you!"}
            <br />
            <span className="text-primary">We've received your request.</span>
          </h1>

          <p className="mt-5 text-base text-muted-foreground md:text-lg">
            Our care coordinator will call you back shortly to understand your needs and design the
            right care plan for your family. You can also reach us instantly below.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <a
              href={`tel:${business.phone}`}
              className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-elevated transition"
            >
              <Phone className="h-4 w-4" /> Call us
            </a>
            <a
              href={buildWhatsAppLink("Hi ELIZA, I just submitted a booking request.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl bg-whatsapp px-4 py-3.5 text-sm font-semibold text-white shadow-soft hover:brightness-110 transition"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <Link
              to="/services"
              className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-background px-4 py-3.5 text-sm font-semibold hover:bg-primary-soft transition"
            >
              Explore services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-3 rounded-3xl border border-border bg-card p-5 text-left shadow-card sm:grid-cols-2">
            <Detail
              icon={Clock}
              title="What happens next?"
              body="A coordinator reviews your request and calls you back to discuss the care plan and timing."
            />
            <Detail
              icon={ShieldCheck}
              title="Your data is private"
              body="We use your details only to coordinate care. We never share or sell them."
            />
          </div>

          <p className="mt-8 text-xs text-muted-foreground">
            Didn't get a call? Reach us 24×7 at{" "}
            <a href={`tel:${business.phone}`} className="font-semibold text-foreground hover:text-primary">
              {business.phoneDisplay}
            </a>
            .
          </p>
        </div>
      </section>
    </PageLayout>
  );
}

function Detail({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Clock;
  title: string;
  body: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{body}</div>
      </div>
    </div>
  );
}
