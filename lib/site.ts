export const site = {
  name: "Conclave AI",
  tagline: "Agents, convened.",
  // Domain from the upgrade plan ("we agreed hello@conclaveai.com"). One constant, so a change is one line.
  email: "hello@conclaveai.com",
  url: "https://conclaveai.com",
  city: "Karachi",
  serving: "US, Gulf and Europe",
  calLink: process.env.NEXT_PUBLIC_CAL_LINK ?? "",
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8010",
  /** One line used in titles, social bios and JSON-LD so the brand phrase repeats the same way everywhere. */
  description: "Voice agents, AI automation and full-stack software for clinics, local businesses and startups.",
};

/** Seven top-level items is the ceiling (upgrade plan section 4). */
export const nav = [
  { href: "/services", label: "Services" },
  { href: "/studio", label: "Studio" },
  { href: "/work", label: "Work" },
  { href: "/demos", label: "Demos" },
  { href: "/pricing", label: "Pricing" },
] as const;

export const company = [
  { href: "/about", label: "About", note: "Who we are and how we work" },
  { href: "/crew", label: "The crew", note: "Meet the seven agents" },
  { href: "/join", label: "Join", note: "Careers, guild, open source" },
  { href: "/notes", label: "Notes", note: "Playbooks and engineering posts" },
  { href: "/receipts", label: "Receipts", note: "Real numbers, in public" },
  { href: "/compare", label: "Compare", note: "Us versus the alternatives" },
  { href: "/security", label: "Security", note: "How we handle data" },
] as const;

export const allRoutes = [
  { href: "/", label: "Home" },
  ...nav,
  ...company.map(({ href, label }) => ({ href, label })),
  { href: "/contact", label: "Contact" },
] as const;

export const services = [
  { n: "01", slug: "voice", short: "Voice agents", title: "Voice agents that answer every call", body: "Picks up in one ring, in the caller's language, and never puts anyone on hold." },
  { n: "02", slug: "follow-up", short: "Follow-up", title: "Follow-up in seconds, not days", body: "Every enquiry gets a reply while the lead is still looking at their phone." },
  { n: "03", slug: "booking", short: "Booking", title: "Bookings straight into your calendar", body: "The agent checks real availability and books the slot, with no back and forth." },
  { n: "04", slug: "reactivation", short: "Reactivation", title: "Reactivation of lapsed customers", body: "Quietly reaches out to people who stopped coming, and brings the right ones back." },
  { n: "05", slug: "reporting", short: "Reporting", title: "Reporting you can read in a minute", body: "Calls answered, slots booked and revenue recovered, in one plain weekly summary." },
] as const;
