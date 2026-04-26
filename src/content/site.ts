/**
 * ELIZA Remote Nursing & Healthcare — Centralized Content
 * ----------------------------------------------------------------
 * Edit this single file to change ALL copy across the website.
 * Do not hardcode strings inside components — add them here instead.
 */

export const business = {
  name: "ELIZA",
  fullName: "ELIZA Remote Nursing & Healthcare",
  tagline: "Hospital-grade care, gently delivered to your home.",
  shortDescription:
    "Certified nurses, attendants, and physiotherapists for compassionate at-home medical care across India.",
  phone: "+919876543210",
  phoneDisplay: "+91 98765 43210",
  whatsapp: "919876543210",
  email: "care@elizahealthcare.in",
  address: "Mumbai • Thane • Navi Mumbai • Pune",
  hours: "24 / 7 — including holidays",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
  },
};

export const buildWhatsAppLink = (message?: string) =>
  `https://wa.me/${business.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const nav = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const hero = {
  eyebrow: "Trusted by 5,000+ families",
  title: "Hospital-grade care,\ngently at home.",
  subtitle:
    "Certified nurses, doctors, and attendants delivered to your doorstep within 2 hours — so your loved ones heal in the comfort of home.",
  primaryCta: { label: "Book a Nurse Now", to: "/book" },
  secondaryCta: { label: "Talk on WhatsApp" },
  trustChips: [
    "ANM / GNM Certified",
    "2-Hour Deployment",
    "24×7 Coordinator",
    "Free Replacement",
  ],
};

export const stats = [
  { value: "5,000+", label: "Families served" },
  { value: "2 hrs", label: "Avg. deployment" },
  { value: "24×7", label: "Live coordinator" },
  { value: "4.9★", label: "Family rating" },
];

export const painPoints = [
  {
    title: "Hospital bills draining ₹8–15K / day",
    body: "Get the same trained care at a fraction of the cost — without compromising on quality.",
  },
  {
    title: "Family caregivers burning out",
    body: "Sleep through the night. Our nurses handle medication, vitals, and emergencies.",
  },
  {
    title: "Hospital-acquired infection risk",
    body: "Recover safely at home, away from crowded wards and superbugs.",
  },
  {
    title: "Loneliness slows recovery",
    body: "Familiar faces, familiar walls — proven to speed healing for elders and post-op patients.",
  },
];

export const whyUs = [
  {
    icon: "ShieldCheck",
    title: "Verified & Certified",
    body: "Every caregiver is ANM/GNM/B.Sc qualified, police-verified, and Nursing Council registered.",
  },
  {
    icon: "Clock",
    title: "2-Hour Deployment",
    body: "Emergency? A trained nurse is at your door within 2 hours, day or night.",
  },
  {
    icon: "HeartHandshake",
    title: "Free Replacement",
    body: "Not the right fit? We replace your caregiver within 24 hours, no questions asked.",
  },
  {
    icon: "Wallet",
    title: "Transparent Pricing",
    body: "No hidden charges. Clear daily and monthly packages tailored to your need.",
  },
  {
    icon: "Phone",
    title: "Always-On Coordinator",
    body: "A dedicated care manager monitors every case 24×7 — one call away.",
  },
  {
    icon: "Stethoscope",
    title: "Doctor-Supervised",
    body: "Care plans reviewed by qualified physicians for medically complex cases.",
  },
];

export type Service = {
  slug: string;
  icon: string;
  title: string;
  short: string;
  long: string;
  highlights: string[];
};

export const services: Service[] = [
  {
    slug: "home-nursing",
    icon: "Syringe",
    title: "Home Nursing Care",
    short: "Short or long-term nursing for post-op, chronic, and recovering patients.",
    long: "Trained ANM/GNM nurses provide medication management, IV administration, vitals monitoring, and round-the-clock care in the comfort of your home.",
    highlights: ["12 / 24 hour shifts", "Post-surgical recovery", "Vitals & medication"],
  },
  {
    slug: "icu-nurse",
    icon: "Activity",
    title: "ICU-Trained Nurses",
    short: "Critical care nurses for ventilator, tracheostomy, and high-dependency cases.",
    long: "Hospital-experienced ICU nurses bring intensive-care skills home — for ventilator support, tracheostomy care, and complex monitoring.",
    highlights: ["Ventilator support", "Tracheostomy care", "Cardiac monitoring"],
  },
  {
    slug: "elderly-care",
    icon: "Users",
    title: "Elderly & Senior Care",
    short: "Compassionate companions and trained attendants for daily living support.",
    long: "From mobility help and meals to medication reminders and emotional companionship — dignified care that lets seniors stay home, safely.",
    highlights: ["Mobility assistance", "Meal & medication", "Companionship"],
  },
  {
    slug: "patient-attendant",
    icon: "User",
    title: "Patient Care Attendants",
    short: "Affordable trained attendants for hygiene, mobility, and daily routines.",
    long: "Patient care attendants assist with bathing, feeding, mobility, and basic daily care — perfect for non-medical support needs.",
    highlights: ["Bathing & hygiene", "Feeding support", "Mobility help"],
  },
  {
    slug: "physiotherapy",
    icon: "Dumbbell",
    title: "Physiotherapy at Home",
    short: "Personalized rehabilitation by licensed physiotherapists.",
    long: "Recover from surgery, stroke, or injury with personalised in-home physiotherapy from licensed BPT/MPT specialists.",
    highlights: ["Post-stroke rehab", "Orthopaedic recovery", "Mobility restoration"],
  },
  {
    slug: "doctor-visit",
    icon: "Stethoscope",
    title: "Doctor Home Visits",
    short: "MBBS and specialist consultations at your doorstep.",
    long: "Skip the waiting room. Qualified physicians and specialists visit your home for consultations, prescriptions, and follow-ups.",
    highlights: ["GP & specialist", "Prescriptions", "Follow-up care"],
  },
  {
    slug: "wound-care",
    icon: "Bandage",
    title: "Wound Care & Dressing",
    short: "Sterile wound dressing, suture removal, and post-op wound management.",
    long: "Trained nurses provide sterile dressing, suture removal, and ongoing wound assessment to prevent infection and speed healing.",
    highlights: ["Sterile dressing", "Suture removal", "Diabetic wounds"],
  },
  {
    slug: "newborn-care",
    icon: "Baby",
    title: "Newborn & NICU Care",
    short: "NICU-trained nurses for newborns and post-natal mothers.",
    long: "Specialized care for newborns, premature babies, and post-natal mothers from NICU-experienced nursing professionals.",
    highlights: ["Premature newborns", "Lactation support", "Post-natal mom care"],
  },
];

export const howItWorks = [
  {
    step: "01",
    title: "Tell us your need",
    body: "Book in 60 seconds via form, call, or WhatsApp — share the patient condition.",
  },
  {
    step: "02",
    title: "Free assessment call",
    body: "A care coordinator calls within 30 minutes to design the right care plan.",
  },
  {
    step: "03",
    title: "Caregiver at your door",
    body: "A verified, matched caregiver arrives at your home — typically within 2 hours.",
  },
];

export const testimonials = [
  {
    name: "Priya Sharma",
    role: "Daughter • Mumbai",
    text: "After my mother's hip surgery, ELIZA's nurse was an angel. Punctual, gentle, and genuinely caring. We finally slept through the night.",
    rating: 5,
  },
  {
    name: "Rajesh Kulkarni",
    role: "Son • Thane",
    text: "Booked an ICU nurse at 11 PM. By 1 AM she was at our home with full equipment. Saved us a panic hospital admission.",
    rating: 5,
  },
  {
    name: "Anita Desai",
    role: "Wife • Pune",
    text: "Three months of physiotherapy at home helped my husband walk again after his stroke. The team felt like family.",
    rating: 5,
  },
  {
    name: "Mohammed Khan",
    role: "Grandson • Navi Mumbai",
    text: "Transparent pricing, no hidden costs. The attendant for my grandfather is now part of our household. Highly recommend.",
    rating: 5,
  },
];

export const faqs = [
  {
    q: "How quickly can a nurse reach my home?",
    a: "For most metros, our caregivers reach you within 2 hours. For planned bookings, we deploy at your preferred date and time.",
  },
  {
    q: "Are your nurses qualified and verified?",
    a: "Yes — every caregiver is ANM/GNM/B.Sc Nursing certified, registered with the State Nursing Council, and police-verified before deployment.",
  },
  {
    q: "What if the caregiver isn't a good fit?",
    a: "We offer free replacement within 24 hours if you're not fully satisfied — no questions, no extra charges.",
  },
  {
    q: "How is pricing structured?",
    a: "Transparent daily and monthly packages based on care type (12 / 24 hours, nurse / attendant / ICU). No hidden fees — share your need and we'll quote upfront.",
  },
  {
    q: "Which cities do you serve?",
    a: "We currently serve Mumbai, Thane, Navi Mumbai, Pune, and surrounding areas — and are expanding rapidly.",
  },
  {
    q: "Do you handle medical emergencies?",
    a: "Our coordinator is on-call 24×7 and our nurses are trained to stabilize and escalate emergencies, coordinating with your physician or hospital.",
  },
];

export const cities = ["Mumbai", "Thane", "Navi Mumbai", "Pune", "Nashik", "Nagpur"];

export const aboutContent = {
  mission:
    "To make hospital-grade healthcare accessible, affordable, and human — right where people heal best: at home.",
  story: [
    "ELIZA was born from a simple, painful truth — every Indian family eventually faces a moment when a loved one needs more care than the home can provide, and the hospital feels too cold, too far, too expensive.",
    "We built ELIZA so that families never have to choose between quality care and the comfort of home. From a small Mumbai team in 2020, we now serve thousands of families across India with verified nurses, doctors, and attendants.",
    "Every caregiver we send to your home is someone we'd send to our own.",
  ],
  values: [
    { title: "Compassion first", body: "We hire for kindness as much as skill." },
    { title: "Radical transparency", body: "Honest pricing, honest updates, always." },
    { title: "Reliability", body: "When we say 2 hours, we mean 2 hours." },
    { title: "Dignity", body: "Every patient is treated like our own family." },
  ],
};
