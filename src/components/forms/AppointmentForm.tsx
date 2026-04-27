import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { Send, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cities, services, equipment, buildWhatsAppLink, business } from "@/content/site";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[+]?\d[\d\s-]{7,14}$/, "Enter a valid phone number"),
  city: z.string().min(1, "Please select a city"),
  service: z.string().min(1, "Please select a service"),
  duration: z.enum(["one-time", "short-term", "long-term"]),
  date: z.string().optional(),
  notes: z.string().max(500).optional(),
  // honeypot — must stay empty
  website: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

/**
 * STATIC FORM SUBMISSION
 * ----------------------
 * Set VITE_FORM_ENDPOINT in your env (Brevo / Formspree / FormSubmit / Google
 * Sheets web-app URL) and the form will POST JSON there before redirecting to
 * the /thank-you confirmation page. If no endpoint is set, we still open
 * WhatsApp with the pre-filled details so no lead is lost.
 */
const FORM_ENDPOINT =
  (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_FORM_ENDPOINT) || "";

export function AppointmentForm({ compact = false }: { compact?: boolean }) {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { duration: "short-term" },
  });

  const onSubmit = async (data: FormValues) => {
    if (submitting) return; // prevent double submit
    if (data.website) return; // honeypot
    setSubmitting(true);

    const payload = {
      ...data,
      source: typeof window !== "undefined" ? window.location.href : "elizahealthcare.in",
      submittedAt: new Date().toISOString(),
    };

    // 1. Try the static form endpoint (Brevo / Sheets / etc.) — never blocks UX
    try {
      if (FORM_ENDPOINT) {
        await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
    } catch {
      // swallow — WhatsApp fallback below ensures the lead still reaches us
    }

    // 2. Open WhatsApp pre-filled (works even if endpoint fails / not set)
    const message = [
      `New appointment request — ELIZA`,
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `City: ${data.city}`,
      `Service: ${data.service}`,
      `Duration: ${data.duration}`,
      data.date ? `Preferred date: ${data.date}` : null,
      data.notes ? `Notes: ${data.notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    if (typeof window !== "undefined") {
      window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
    }

    // 3. Navigate to confirmation page
    navigate({ to: "/thank-you", search: { name: data.name } as any });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl border border-border bg-card p-5 shadow-card md:p-8"
      noValidate
    >
      {!compact && (
        <div className="mb-6">
          <h3 className="font-display text-2xl font-bold">Book a Caregiver</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Share a few details — our care coordinator will call you back soon.
          </p>
        </div>
      )}

      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        {...register("website")}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Patient name" error={errors.name?.message}>
          <Input placeholder="e.g. Mrs. Sharma" autoComplete="name" {...register("name")} />
        </Field>

        <Field label="Phone number" error={errors.phone?.message}>
          <Input type="tel" autoComplete="tel" placeholder="+91 98xxxxxxxx" {...register("phone")} />
        </Field>

        <Field label="City" error={errors.city?.message}>
          <select
            className="flex h-11 w-full rounded-full border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            {...register("city")}
            defaultValue=""
          >
            <option value="" disabled>
              Select your city
            </option>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
            <option value="Other">Other</option>
          </select>
        </Field>

        <Field label="Service or equipment" error={errors.service?.message}>
          <select
            className="flex h-11 w-full rounded-full border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            {...register("service")}
            defaultValue=""
          >
            <option value="" disabled>
              Select what you need
            </option>
            <optgroup label="Nursing & Care">
              {services.map((s) => (
                <option key={s.slug}>{s.title}</option>
              ))}
            </optgroup>
            <optgroup label="Medical Equipment">
              {equipment.map((e) => (
                <option key={e.slug}>{e.title}</option>
              ))}
            </optgroup>
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Label className="mb-2 block text-sm font-medium">Care duration</Label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: "one-time", label: "One visit" },
            { value: "short-term", label: "Short-term" },
            { value: "long-term", label: "Long-term" },
          ].map((opt) => {
            const active = watch("duration") === opt.value;
            return (
              <label
                key={opt.value}
                className={`cursor-pointer rounded-full border px-3 py-2.5 text-center text-xs font-semibold transition-all md:text-sm ${
                  active
                    ? "border-primary bg-primary text-primary-foreground shadow-soft"
                    : "border-border bg-background text-foreground/70 hover:border-primary/40"
                }`}
              >
                <input type="radio" value={opt.value} className="sr-only" {...register("duration")} />
                {opt.label}
              </label>
            );
          })}
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Field label="Preferred date (optional)">
          <Input type="date" {...register("date")} />
        </Field>
      </div>

      <Field
        label="Brief health condition (optional)"
        error={errors.notes?.message}
        className="mt-5"
      >
        <Textarea
          rows={3}
          placeholder="E.g. Post-knee replacement, needs nursing for 2 weeks…"
          {...register("notes")}
        />
      </Field>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button
          type="submit"
          variant="coral"
          size="lg"
          disabled={submitting}
          className="flex-1"
          aria-label="Request a callback"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" /> Request a callback
            </>
          )}
        </Button>
        <Button asChild variant="whatsapp" size="lg" className="flex-1">
          <a
            href={buildWhatsAppLink("Hi ELIZA, I need home nursing care.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
          </a>
        </Button>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        We'll call you back as soon as possible. Or reach us 24×7 at{" "}
        <a href={`tel:${business.phone}`} className="font-semibold text-foreground hover:text-primary">
          {business.phoneDisplay}
        </a>
        .
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label className="mb-1.5 block text-sm font-medium">{label}</Label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
