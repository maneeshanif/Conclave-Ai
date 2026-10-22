/**
 * Notes (posts). A post is published here only when it carries a real number, a worked method or a diagram.
 * Example figures inside a post are labelled as examples. Planned posts live in lib/content.ts (notesPlanned).
 */
export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; text: string }
  | { t: "list"; items: string[] }
  | { t: "formula"; lines: [string, string][] }
  | { t: "callout"; text: string };

export interface Post {
  slug: string;
  title: string;
  topic: string;
  date: string; // ISO
  summary: string;
  blocks: Block[];
  cta: { href: string; label: string };
}

export const posts: Post[] = [
  {
    slug: "missed-call-cost",
    title: "What a missed call really costs a clinic",
    topic: "Missed-call math",
    date: "2026-10-22",
    summary: "A four-line formula you can run on your own phone log in five minutes, with a worked example.",
    cta: { href: "/demos#calculator", label: "Run it on your own numbers" },
    blocks: [
      { t: "p", text: "Most owners know calls are being missed. Few know what that is worth, because the number sounds too awkward to measure. It is not. You need four inputs and a phone log." },
      { t: "h2", text: "The formula" },
      {
        t: "formula",
        lines: [
          ["Missed calls per week × share that would have booked", "bookings lost per week"],
          ["bookings lost per week × 4.33 weeks", "bookings lost per month"],
          ["bookings lost per month × average value of a visit", "revenue lost per month"],
          ["revenue lost per month × 12", "revenue lost per year"],
        ],
      },
      { t: "h2", text: "A worked example (made-up round numbers, not our data)" },
      {
        t: "formula",
        lines: [
          ["10 missed calls × 30%", "3 bookings lost per week"],
          ["3 × 4.33", "about 13 bookings lost per month"],
          ["13 × 100 per visit", "about 1,300 lost per month"],
          ["1,300 × 12", "about 15,600 lost per year"],
        ],
      },
      { t: "callout", text: "Those inputs are examples to show the method. Your numbers will differ, and that is the point of running it on yours." },
      { t: "h2", text: "Where each input comes from" },
      {
        t: "list",
        items: [
          "Missed calls per week: your phone provider's call log, filtered to unanswered inbound calls, for a normal week.",
          "Share that would have booked: of the calls you do answer, the fraction that end in a booking. Your booking system has it.",
          "Average value of a visit: total revenue from visits divided by number of visits, over the same period.",
        ],
      },
      { t: "h2", text: "What an agent changes, and what it does not" },
      { t: "p", text: "A voice agent answers the call in one ring, so fewer calls go unanswered. It does not change how many callers would have booked, and it will not catch every call: urgent or unusual ones should still reach a person. So treat the share an agent could answer as your own assumption, and test it in a short pilot before relying on it." },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
