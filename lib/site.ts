export const site = {
  name: "Conclave AI",
  tagline: "Agents, convened.",
  email: "hello@conclave.ai",
  url: "https://conclave.ai",
  calLink: process.env.NEXT_PUBLIC_CAL_LINK ?? "",
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8010",
};

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/demos", label: "Demos" },
  { href: "/about", label: "About" },
] as const;

export const allRoutes = [
  { href: "/", label: "Home" },
  ...nav,
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
] as const;

export const services = [
  { n: "01", slug: "voice", short: "Voice agents", title: "Voice agents that answer every call", body: "Picks up in one ring, in the caller's language, and never puts anyone on hold." },
  { n: "02", slug: "follow-up", short: "Follow-up", title: "Follow-up in seconds, not days", body: "Every enquiry gets a reply while the lead is still looking at their phone." },
  { n: "03", slug: "booking", short: "Booking", title: "Bookings straight into your calendar", body: "The agent checks real availability and books the slot, with no back and forth." },
  { n: "04", slug: "reactivation", short: "Reactivation", title: "Reactivation of lapsed customers", body: "Quietly reaches out to people who stopped coming, and brings the right ones back." },
  { n: "05", slug: "reporting", short: "Reporting", title: "Reporting you can read in a minute", body: "Calls answered, slots booked and revenue recovered, in one plain weekly summary." },
] as const;
