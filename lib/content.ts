/**
 * Copy and structure from "Conclave AI Website Review and Upgrade Plan.md".
 * No invented numbers: anything that needs a real figure, price or name is marked `pending` and shown as such.
 */

export const studio = [
  { slug: "agents", name: "Agents", job: "Voice, follow-up, booking, reactivation and reporting agents.", buyer: "Clinics and local businesses", timeline: "14-day pilot", stack: ["Vapi", "LiveKit", "OpenAI", "Cal.com"] },
  { slug: "agent-apps", name: "Agent apps", job: "Internal copilots, retrieval over your documents, tool-using agents.", buyer: "Startups and SMEs", timeline: "3 to 4 week build", stack: ["OpenAI Agents SDK", "FastAPI", "Supabase", "pgvector"] },
  { slug: "sites", name: "Websites with CMS", job: "Animated Next.js sites with a headless CMS, SEO and booking built in.", buyer: "Anyone who needs a face", timeline: "Fixed fee", stack: ["Next.js", "Tailwind", "GSAP", "Headless CMS"] },
  { slug: "mobile", name: "Mobile apps", job: "React Native or Flutter apps with agent features.", buyer: "Startups", timeline: "Fixed scope per milestone", stack: ["React Native", "Flutter", "FastAPI", "Supabase"] },
  { slug: "platforms", name: "Platforms", job: "Multi-service systems with an event backbone, containers and observability.", buyer: "Funded startups and scale-ups", timeline: "Retainer or milestone", stack: ["Dapr", "Kafka", "Kubernetes", "Postgres"] },
] as const;

export const trust = [
  ["No lock-in", "Leave any time. Your agent keeps working."],
  ["You own the code", "Handover and training are part of every build."],
  ["Fixed scope", "You know what you get before we start."],
  ["Data stays yours", "Only what the agent needs, stored where you can audit it."],
] as const;

/** The Brick Crew: seven characters from one toy-brick kit (studs are the dots). Art in components/Cast.tsx, research in docs/mascot-research.md. */
export const cast = [
  { id: "aria", name: "Aria", job: "Answers calls", fill: "#C8F169", trait: "Warm, quick", sig: "Headset and a waveform smile", line: "Picks up in one ring." },
  { id: "echo", name: "Echo", job: "Follows up", fill: "#CFC4FF", trait: "Persistent, polite", sig: "Ghost copies stepping away behind it", line: "Sent. Sending again, politely." },
  { id: "slot", name: "Slot", job: "Books the slot", fill: "#0B1512", trait: "Precise", sig: "A calendar on its belly, one lime day", line: "Thursday, 10:30. Done." },
  { id: "boomerang", name: "Boomerang", job: "Wins customers back", fill: "#7C5CFF", trait: "Cheeky", sig: "A curved lime boomerang tail", line: "Remember us? We saved you a seat." },
  { id: "tally", name: "Tally", job: "Reports the week", fill: "#F1F4EC", trait: "Calm, nerdy", sig: "A rising three-bar chart for a belly", line: "Here is the week in one minute." },
  { id: "gate", name: "Gate", job: "Hands over to a human", fill: "#14302A", trait: "Honest", sig: "An arch body with a lime door ajar", line: "This one needs a person. Passing it on." },
  { id: "ledger", name: "Ledger", job: "Keeps the receipts", fill: "#8FA39A", trait: "Dry humour", sig: "A wide ruled page and a pen", line: "Every number has a source." },
] as const;export type CastId = (typeof cast)[number]["id"];

export const industries = [
  {
    slug: "clinics",
    name: "Clinics",
    figure: "aria" as CastId,
    pain: "Calls go unanswered while the front desk is with a patient.",
    h1: "A front desk that never steps away",
    flows: ["Answer and triage the call", "Book, move or cancel in your calendar", "Text a reminder and a follow-up"],
    objection: ["Will patients accept an AI?", "Aria introduces itself plainly and any caller can ask for a person at any time."],
  },
  {
    slug: "med-spas",
    name: "Med spas",
    figure: "echo" as CastId,
    pain: "Enquiries arrive at night and are cold by morning.",
    h1: "Reply to every enquiry while it is warm",
    flows: ["Reply to web and social enquiries in seconds", "Hold a consultation slot", "Bring lapsed clients back with a personal message"],
    objection: ["Will it sound salesy?", "Tone is written with you and reviewed each week. Nothing goes out that you have not approved."],
  },
  {
    slug: "dental",
    name: "Dental",
    figure: "slot" as CastId,
    pain: "Gaps in the schedule and no-shows that nobody has time to chase.",
    h1: "Fewer gaps, fewer no-shows",
    flows: ["Confirm and reschedule by phone or text", "Fill a cancelled slot from your waiting list", "Recall patients who are due a visit"],
    objection: ["Does it connect to our practice software?", "We connect to the tool you use. If an integration does not exist, we scope building it."],
  },
  {
    slug: "real-estate",
    name: "Real estate",
    figure: "boomerang" as CastId,
    pain: "Portal leads ask once and move on to whoever replies first.",
    h1: "Be the first to reply, every time",
    flows: ["Answer portal and website enquiries instantly", "Qualify the lead and book a viewing", "Reactivate old enquiries when new stock arrives"],
    objection: ["Can it handle several languages?", "We build in English, Arabic and Urdu. Other languages are scoped on request."],
  },
  {
    slug: "home-services",
    name: "Home services",
    figure: "tally" as CastId,
    pain: "The owner is on a job and the phone rings out.",
    h1: "Pick up while you are on the roof",
    flows: ["Answer, take the job details and book a visit", "Send quotes and chase the reply", "Summarise the week in one message"],
    objection: ["What about emergencies?", "Urgent calls are flagged and passed to a person on your team straight away."],
  },
  {
    slug: "startups",
    name: "Startups",
    figure: "gate" as CastId,
    pain: "You need an agent, an app or a platform and a team that ships.",
    h1: "Agent-first software, built like a platform",
    flows: ["Agent apps and copilots in weeks", "Web and mobile products with agent features", "Event-driven backbone when volume grows"],
    objection: ["Why not a freelancer?", "A flow works until it fails at 6pm on a Friday. We ship monitoring, retries and handover."],
  },
] as const;

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
  cols: ["Conclave", "Freelancer", "n8n or no-code flow", "Big agency", "In-house receptionist"],
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
