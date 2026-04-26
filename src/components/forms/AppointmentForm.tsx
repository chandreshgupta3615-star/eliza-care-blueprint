import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cities, services, buildWhatsAppLink } from "@/content/site";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().regex(/^[+]?\d[\d\s-]{7,14}$/, "Enter a valid phone number"),
  city: z.string().min(1, "Please select a city"),
  service: z.string().min(1, "Please select a service"),
  duration: z.enum(["one-time", "short-term", "long-term"]),
  date: z.string().optional(),
  notes: z.string().max(500).optional(),
});

type FormValues = z.infer<typeof schema>;

export function AppointmentForm({ compact = false }: { compact?: boolean }) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { duration: "short-term" },
  });

  const onSubmit = async (data: FormValues) => {
    // Static-friendly: open WhatsApp with pre-filled details
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

    setSubmitted(true);
    window.open(buildWhatsAppLink(message), "_blank");
    reset({ duration: "short-term" });
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-primary/20 bg-card p-10 text-center shadow-card">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-whatsapp/10 text-whatsapp">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-4 font-display text-2xl font-bold">Request received!</h3>
        <p className="mt-2 text-muted-foreground">
          Our care coordinator will call you within 30 minutes. We've also opened WhatsApp so you can share more details.
        </p>
        <Button className="mt-6" variant="outline" onClick={() => setSubmitted(false)}>
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8"
      noValidate
    >
      {!compact && (
        <div className="mb-6">
          <h3 className="font-display text-2xl font-bold">Book a Caregiver</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            We'll call you back within 30 minutes — 24×7.
          </p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Patient name" error={errors.name?.message}>
          <Input placeholder="e.g. Mrs. Sharma" {...register("name")} />
        </Field>

        <Field label="Phone number" error={errors.phone?.message}>
          <Input type="tel" placeholder="+91 98xxxxxxxx" {...register("phone")} />
        </Field>

        <Field label="City" error={errors.city?.message}>
          <select
            className="flex h-11 w-full rounded-full border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            {...register("city")}
            defaultValue=""
          >
            <option value="" disabled>Select your city</option>
            {cities.map((c) => <option key={c}>{c}</option>)}
            <option value="Other">Other</option>
          </select>
        </Field>

        <Field label="Service required" error={errors.service?.message}>
          <select
            className="flex h-11 w-full rounded-full border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            {...register("service")}
            defaultValue=""
          >
            <option value="" disabled>Select a service</option>
            {services.map((s) => <option key={s.slug}>{s.title}</option>)}
          </select>
        </Field>
      </div>

      <div className="mt-4">
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

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Field label="Preferred date (optional)">
          <Input type="date" {...register("date")} />
        </Field>
      </div>

      <Field label="Brief health condition (optional)" error={errors.notes?.message} className="mt-4">
        <Textarea rows={3} placeholder="E.g. Post-knee replacement, needs 24h nursing for 2 weeks..." {...register("notes")} />
      </Field>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button type="submit" variant="coral" size="lg" disabled={isSubmitting} className="flex-1">
          <Send className="h-4 w-4" /> Get a callback in 30 min
        </Button>
        <Button asChild variant="whatsapp" size="lg" className="flex-1">
          <a
            href={buildWhatsAppLink("Hi ELIZA, I need home nursing care.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="h-4 w-4" /> Chat instead
          </a>
        </Button>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Submitting opens WhatsApp with your details — or call us directly anytime.
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
