/**
 * Copy and structure from "Conclave AI Website Review and Upgrade Plan.md" and "Conclave AI Claude Code Change Spec (v3).md".
 * No invented numbers: anything that needs a real figure, price or name is marked `pending` and shown as such.
 */

import type { AgentId } from "./studs/patterns";

/** The Studio offer (Change Spec v3): business systems and automations in place of the CMS card. Chips list only what we can demonstrate. */
export const studio = [
  { slug: "agents", name: "Agents", job: "Voice, follow-up, booking, reactivation, reporting agents.", buyer: "Clinics and local businesses", tag: "14-day pilot", stack: ["Vapi", "LiveKit", "OpenAI"] },
  { slug: "automations", name: "Automations", job: "Workflows that move data between your tools and run on triggers.", buyer: "Teams re-typing data between apps", tag: "1 to 2 week build", stack: ["n8n", "Webhooks", "Zapier", "APIs"] },
  { slug: "erp-crm", name: "ERP and CRM", job: "Custom business systems: customers, orders, inventory, billing, POS.", buyer: "Businesses outgrowing spreadsheets", tag: "Fixed scope per module", stack: ["Next.js", "FastAPI", "Postgres"] },
  { slug: "apps", name: "Apps", job: "Web and mobile apps with agent features; marketing sites included when needed.", buyer: "Startups and anyone who needs a product or a face", tag: "Fixed scope per milestone", stack: ["Next.js", "React Native", "Flutter"] },
  { slug: "platforms", name: "Platforms", job: "Multi-service systems with an event backbone and monitoring.", buyer: "Funded startups and scale-ups", tag: "Retainer or milestone", stack: ["Dapr", "Kafka", "Kubernetes"] },
] as const;
export type StudioSlug = (typeof studio)[number]["slug"];

export interface StudioDetail {
  h1: string;
  problem: string;
  build: string[];
  /** Which diagram the page draws. */
  diagram: "flow" | "modules" | "stack" | "arch";
  steps?: string[];
  modules?: string[];
  faq: [string, string][];
  related: string;
}

export const studioDetail: Record<StudioSlug, StudioDetail> = {
  agents: {
    h1: "Agents that take the calls",
    problem: "Calls that ring out and enquiries that wait are customers you paid to attract and then lost.",
    build: ["Voice agents that answer, ask what is needed and book", "Follow-up that replies to every enquiry in seconds", "Booking against your real calendar", "Reactivation of customers who stopped coming", "A weekly report you can read in a minute"],
    diagram: "flow",
    steps: ["A call or message arrives", "The agent answers and asks what is needed", "It checks your live calendar", "It books, confirms and reminds", "Anything it cannot handle goes to a person with a summary"],
    faq: [
      ["How long is the pilot?", "A pilot is planned for 14 days on one job. The exact scope is written down before we start."],
      ["Which languages?", "English, Arabic and Urdu. Other languages are scoped on request."],
      ["Do I own it?", "Yes. You own the code, and handover and training are part of the build."],
    ],
    related: "See the five service pages for each job in detail.",
  },
  automations: {
    h1: "Workflows that move your data",
    problem: "Your team re-types the same details between tools, and things fall through the gaps between them.",
    build: ["Lead captured, then added to the CRM, answered and a task created", "Invoices and reminders sent on a schedule", "Reports assembled and emailed each week", "Alerts when something looks wrong", "Clean hand-offs between your apps"],
    diagram: "flow",
    steps: ["A trigger fires (a form, an email, a payment, a schedule)", "The data is checked and cleaned", "The right tool is updated", "The right person is told", "Failures retry, then raise an alert"],
    faq: [
      ["n8n, Zapier or code?", "We use n8n or Zapier where they fit and code you own where volume, cost or compliance means they do not."],
      ["What happens when a step fails?", "It retries, then alerts a person with what failed, so nothing disappears silently."],
      ["How long does a workflow take?", "Typically a one to two week build, scoped per workflow before we start."],
    ],
    related: "Pairs with Agents: an agent takes the call, an automation does the follow-through.",
  },
  "erp-crm": {
    h1: "A system built around you",
    problem: "Customers, orders and stock live in spreadsheets and three apps that do not talk to each other.",
    build: ["Customers and leads", "Appointments", "Inventory", "Invoicing", "Staff and roles", "Reports", "Integrations with the tools you already use"],
    diagram: "modules",
    modules: ["Customers and leads", "Appointments", "Inventory", "Invoicing", "Staff and roles", "Reports", "Integrations"],
    faq: [
      ["Do I have to build all of it?", "No. It is scoped per module, so you start with the one that hurts most and add the rest later."],
      ["Can it replace my spreadsheets?", "That is usually the first job: import what you have, then retire the sheets."],
      ["Who owns the data?", "You do, in a database you can export from at any time."],
    ],
    related: "Example screens are added here, labelled Example, as modules are built.",
  },
  apps: {
    h1: "Apps with agent features",
    problem: "You need a product, or a site, that works on a phone and does something clever without a fragile pile of plug-ins.",
    build: ["Web apps and dashboards", "Mobile apps in React Native or Flutter", "Agent features inside the app: copilots, search over your documents, tool use", "Marketing sites with a headless CMS, SEO and booking built in"],
    diagram: "arch",
    faq: [
      ["Do you build marketing sites too?", "Yes. Sites with a headless CMS, SEO and booking built in are part of this offer, scoped as one milestone."],
      ["React Native or Flutter?", "We pick with you, based on your team and the features you need."],
      ["How is it priced?", "Fixed scope per milestone, agreed before each one starts."],
    ],
    related: "Need the agent first and the app later? Start with Agents.",
  },
  platforms: {
    h1: "Built to keep running at volume",
    problem: "One agent is easy. Many services at many times the volume need an event backbone and boring infrastructure underneath.",
    build: ["Event-driven services between your systems", "Containers and orchestration", "Monitoring and alerting", "A handover your team can run"],
    diagram: "stack",
    faq: [
      ["Is this overkill for a small team?", "Often, and we will say so. Platform work is for products that already have volume or are about to."],
      ["Retainer or milestones?", "Either: a retainer for ongoing operation, or milestones for a defined build."],
      ["What do you actually run?", "We list only tools we can demonstrate: Dapr, Kafka and Kubernetes."],
    ],
    related: "Friendly on the surface, serious underneath.",
  },
};

export const trust = [
  ["Fixed scope", "You know what you get before we start."],
  ["You own the code", "Handover and training are part of every build."],
  ["Live in 14 days", "A pilot is planned for 14 days, scoped up front."],
] as const;

/** Compat shape for older call sites: the crew is now the stud patterns in lib/studs/patterns.ts. */
export type CastId = AgentId;
export const industries = [
  {
    slug: "clinics",
    name: "Clinics",
    figure: "aria" as AgentId,
    pain: "Calls go unanswered while the front desk is with a patient.",
    h1: "A front desk that never steps away",
    flows: ["Answer and triage the call", "Book, move or cancel in your calendar", "Text a reminder and a follow-up"],
    objection: ["Will patients accept an AI?", "Aria introduces itself plainly and any caller can ask for a person at any time."],
  },
  {
    slug: "med-spas",
    name: "Med spas",
    figure: "echo" as AgentId,
    pain: "Enquiries arrive at night and are cold by morning.",
    h1: "Reply to every enquiry while it is warm",
    flows: ["Reply to web and social enquiries in seconds", "Hold a consultation slot", "Bring lapsed clients back with a personal message"],
    objection: ["Will it sound salesy?", "Tone is written with you and reviewed each week. Nothing goes out that you have not approved."],
  },
  {
    slug: "dental",
    name: "Dental",
    figure: "slot" as AgentId,
    pain: "Gaps in the schedule and no-shows that nobody has time to chase.",
    h1: "Fewer gaps, fewer no-shows",
    flows: ["Confirm and reschedule by phone or text", "Fill a cancelled slot from your waiting list", "Recall patients who are due a visit"],
    objection: ["Does it connect to our practice software?", "We connect to the tool you use. If an integration does not exist, we scope building it."],
  },
  {
    slug: "real-estate",
    name: "Real estate",
    figure: "tally" as AgentId,
    pain: "Portal leads ask once and move on to whoever replies first.",
    h1: "Be the first to reply, every time",
    flows: ["Answer portal and website enquiries instantly", "Qualify the lead and book a viewing", "Reactivate old enquiries when new stock arrives"],
    objection: ["Can it handle several languages?", "We build in English, Arabic and Urdu. Other languages are scoped on request."],
  },
  {
    slug: "home-services",
    name: "Home services",
    figure: "boomerang" as AgentId,
    pain: "The owner is on a job and the phone rings out.",
    h1: "Pick up while you are on the roof",
    flows: ["Answer, take the job details and book a visit", "Send quotes and chase the reply", "Summarise the week in one message"],
    objection: ["What about emergencies?", "Urgent calls are flagged and passed to a person on your team straight away."],
  },
  {
    slug: "startups",
    name: "Startups",
    figure: "gate" as AgentId,
    pain: "You need an agent, an app or a platform and a team that ships.",
    h1: "Agent-first software, built like a platform",
    flows: ["Agent apps and copilots in weeks", "Web and mobile products with agent features", "Event-driven backbone when volume grows"],
    objection: ["Why not a freelancer?", "A flow works until it fails at 6pm on a Friday. We ship monitoring, retries and handover."],
  },
] as const;

/** Labels for the example dashboard on each industry page. The figures drawn are sample values and the card says so. */
export const industryDash: Record<string, { title: string; tiles: [string, string][] }> = {
  clinics: { title: "A week at a clinic", tiles: [["Calls answered", "128"], ["Appointments booked", "41"], ["Reminders sent", "96"], ["Handed to staff", "7"]] },
  "med-spas": { title: "A week at a med spa", tiles: [["Enquiries answered", "64"], ["Consultations held", "18"], ["Win-back replies", "9"], ["Handed to staff", "5"]] },
  dental: { title: "A week at a dental practice", tiles: [["Confirmations", "88"], ["Slots refilled", "12"], ["Recalls sent", "54"], ["Handed to staff", "6"]] },
  "real-estate": { title: "A week at an agency", tiles: [["Portal leads answered", "72"], ["Viewings booked", "23"], ["Old leads revived", "11"], ["Handed to agents", "8"]] },
  "home-services": { title: "A week at a home-services firm", tiles: [["Calls answered", "57"], ["Visits booked", "19"], ["Quotes chased", "14"], ["Urgent, flagged", "4"]] },
  startups: { title: "A week on a platform build", tiles: [["Deploys", "6"], ["Alerts resolved", "11"], ["Agent runs", "420"], ["Escalations", "2"]] },
};

export const serviceDetail: Record<
  string,
  { problem: string; flow: string[]; integrations: string[]; faq: [string, string][]; related: string }
> = {
  voice: {
    problem: "Calls that ring out are customers you paid to attract and then lost.",
    flow: ["Caller rings your number", "Aria answers in one ring and asks what they need", "She checks real availability", "The slot is booked and a text confirms it", "Anything she cannot handle goes to a person with a summary"],
    integrations: ["Twilio", "Vapi", "LiveKit", "Google Calendar", "Cal.com", "Your CRM"],
    faq: [
      ["Will callers know it is an AI?", "We never hide it. Aria introduces itself plainly, and any caller can ask for a human."],
      ["Which languages?", "English, Arabic and Urdu. Other languages are scoped on request."],
      ["Are calls recorded?", "Only if you want them to be, with the consent wording agreed in writing first."],
    ],
    related: "Hear it on the demo page, then see the clinic case.",
  },
  "follow-up": {
    problem: "An enquiry answered after an hour is usually an enquiry lost.",
    flow: ["A form, message or missed call arrives", "The agent replies within seconds in your tone", "It answers the first questions and offers a slot", "It keeps the thread going until a person is needed"],
    integrations: ["WhatsApp", "SMS", "Email", "Web forms", "Instagram", "Your CRM"],
    faq: [
      ["Does it message people who did not ask?", "No. Follow-up only goes to people who contacted you."],
      ["Can I approve messages first?", "Yes. Start in approve-first mode and relax it when you trust it."],
      ["What if the lead replies angrily?", "The thread is handed to a person immediately."],
    ],
    related: "Pairs with booking so the reply ends in a calendar slot.",
  },
  booking: {
    problem: "Booking by back and forth costs minutes every time and loses people on the way.",
    flow: ["The agent asks what and when", "It reads your real calendar", "It offers two or three slots", "It books, confirms and reminds", "It handles the reschedule too"],
    integrations: ["Google Calendar", "Outlook", "Cal.com", "Practice software", "Stripe deposits"],
    faq: [
      ["Does it double-book?", "It reads your live calendar before it offers a slot."],
      ["Can it take a deposit?", "Yes, where your booking flow needs one."],
      ["What about staff holidays?", "Anything in your calendar blocks the slot."],
    ],
    related: "Built on the same calendar link as the voice agent.",
  },
  reactivation: {
    problem: "Your best next customers are the ones who already came once and quietly stopped.",
    flow: ["We pull a list of lapsed customers you choose", "The agent writes a short personal message", "People who reply are offered a slot", "People who decline are never contacted again"],
    integrations: ["CRM export", "SMS", "WhatsApp", "Email", "Cal.com"],
    faq: [
      ["Is this spam?", "No. It only contacts people with an existing relationship, with an easy opt-out."],
      ["How many messages go out?", "You set the cap. Small and steady beats a blast."],
      ["Can we exclude people?", "Yes. You approve the list before anything is sent."],
    ],
    related: "The weekly report shows who came back.",
  },
  reporting: {
    problem: "If you cannot read the results in a minute, you will stop reading them.",
    flow: ["Every call, message and booking is logged", "Each week the agent writes a plain summary", "It names what worked and what to change", "You get it by email on the same day each week"],
    integrations: ["Resend email", "Supabase", "Looker Studio", "Slack"],
    faq: [
      ["Which numbers are shown?", "Calls answered, slots booked, follow-ups sent and missed calls. Figures come from your own logs."],
      ["Can I export the data?", "Yes. It is yours."],
      ["Who reads the report with me?", "We review it with you on a short weekly call."],
    ],
    related: "This is where the Receipts page gets its numbers.",
  },
};

export const compare = {
  cols: ["Conclave AI", "Freelancer", "n8n or no-code flow", "Big agency", "In-house receptionist"],
  rows: [
    ["Live demo before you hire", "Rarely", "Sometimes", "Rarely", "Not applicable"],
    ["Scope and price known up front", "Often", "Often", "Rarely", "Salary"],
    ["Monitoring, retries and handover", "Varies", "You build it", "Yes", "Not applicable"],
    ["You own the code", "Varies", "You own the flow", "Varies", "Not applicable"],
    ["Works at 6pm on a Friday", "Varies", "Until it fails", "Yes", "Shift hours"],
    ["Time to first live version", "14-day pilot", "Days", "Weeks to months", "Weeks to hire"],
  ],
} as const;

export const security = [
  ["Data we handle", "Only what the agent needs to do its job, stored in an access-controlled database you can audit."],
  ["Consent and recording", "Call recording is off unless you turn it on, and the consent wording is agreed in writing first."],
  ["Who can see it", "Named people on your team and ours. Access is removed when a project ends."],
  ["Subprocessors", "The services we build on are listed here and in your project scope. You approve any change."],
  ["Model training", "We do not use your customers' data to train models. This is written into the project agreement."],
  ["When the agent is unsure", "It hands over to a person and keeps a log of what happened."],
] as const;

/** Written for the Notes index. Posts are published only with a real number or diagram. */
export const notesPlanned = [
  ["missed-call-cost", "What a missed call really costs a clinic", "Missed-call math"],
  ["voice-agent-costs", "What a voice agent costs to run, line by line", "Costs"],
  ["hipaa-basics", "Voice agents and patient data: the basics", "Privacy"],
  ["dapr-kafka-small-team", "Dapr and Kafka for a small team: when it is worth it", "Engineering"],
  ["vapi-vs-livekit", "Vapi or LiveKit: the trade-offs we have seen", "Engineering"],
] as const;

export const guild = [
  ["Careers", "Open roles appear here when we are hiring. Until then, send a note and a link to your best work.", "/join#careers"],
  ["Open-source templates", "Voice agent, retrieval and booking agent starters, published on GitHub.", "/join#open-source"],
  ["Bounties", "Small, paid tasks with clear acceptance tests.", "/join#bounties"],
  ["Partner programme", "Vetted freelancers and engineers who take pilot work on revenue share.", "/join#partners"],
] as const;

export const processSteps = [
  ["001", "Audit", "2 days", "We listen to a week of your calls and find where revenue leaks.", "A short audit write-up"],
  ["002", "Build", "7 to 10 days", "One agent, one job, wired into your phone line and calendar.", "A live agent you can call"],
  ["003", "Run", "Weekly", "We monitor, tune and report every week. You keep the results.", "A one-page weekly summary"],
] as const;
