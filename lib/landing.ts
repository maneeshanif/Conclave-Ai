/**
 * Search landing pages from the Search & AI Recommendation Strategy (7 Nov 2026).
 * Rules for every page: answer-first opening, FAQ, "last updated" date, no invented numbers, no prices, no compliance claims we cannot back.
 * Bump `updated` when the copy is reviewed or changed.
 */
export type Landing = {
  path: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  /** The 2 to 3 sentence direct answer shown as the lead and quoted by AI assistants. */
  answer: string;
  updated: string;
  sections: { h: string; p?: string[]; list?: string[] }[];
  faq: [string, string][];
  related: { href: string; label: string }[];
};

const UPDATED = "2026-11-07";

export const afterHours: Landing = {
  path: "/after-hours-answering-service",
  metaTitle: "After hours answering service with an AI receptionist",
  metaDescription:
    "An AI after hours answering service for clinics and local businesses. It answers nights and weekends, books the appointment and flags urgent calls to your team. Hear a demo call.",
  eyebrow: "After hours answering service",
  h1: "After hours answering, handled by AI",
  answer:
    "An AI after hours answering service picks up every call outside your opening hours, finds out what the caller needs and books a slot in your real calendar. Anything urgent is flagged to a person on your team with a short summary. Callers are always told they are speaking to an AI, and can ask for a human at any time.",
  updated: UPDATED,
  sections: [
    {
      h: "How it answers nights and weekends",
      list: [
        "It answers in one ring, at any hour, in English, Arabic or Urdu.",
        "It asks what the caller needs and answers the routine questions: hours, location, services, what to bring.",
        "It checks your live calendar and books, moves or cancels the appointment, then texts a confirmation.",
        "It flags urgent or sensitive calls to a person on your team straight away, with a summary so the caller does not repeat themselves.",
        "In the morning you get a plain summary of what came in overnight and what was booked.",
      ],
    },
    {
      h: "AI versus a human answering service",
      p: [
        "A human answering service takes a message or follows a script and usually passes the details to you to act on. Costs are typically billed per minute or per call, so they rise with call volume.",
        "An AI receptionist does the follow-through itself: it books into your calendar and sends the reminder, so the caller is not waiting for a call back. A person is better when a caller is distressed, the situation is unusual, or judgment is needed. That is why every call we set up has a clear handover to your team.",
        "We discuss scope and running costs on a call before any work begins, so you can compare it with what you pay for your current service.",
      ],
    },
    {
      h: "Which calls it should hand to a person",
      p: [
        "You decide the list with us. Typical triggers are urgent symptoms or emergencies, an upset or distressed caller, a request for a person, and anything the agent is not sure about. The list can be changed at any time.",
      ],
    },
    {
      h: "Hear it before you decide",
      p: ["The demo page lets you talk to Aria, our voice agent, so you can judge the voice, the pace and how she handles interruptions."],
    },
  ],
  faq: [
    ["What is an after hours answering service?", "It is a service that answers your business phone when you are closed. An AI version also books appointments and follows up, instead of only taking a message."],
    ["Can an AI answer calls on nights and weekends?", "Yes. It answers at any hour, takes the details, books the next free slot and flags urgent calls to your team."],
    ["What happens with an emergency call?", "Calls you have listed as urgent are flagged and passed to a person on your team straight away, with a short summary."],
    ["Will callers know they are talking to an AI?", "Yes. The agent introduces itself plainly and any caller can ask for a person."],
    ["Can it keep my existing phone number?", "Yes. We connect to the number you already use, for example by forwarding calls outside your opening hours."],
  ],
  related: [
    { href: "/services/voice", label: "AI voice agents" },
    { href: "/services/booking", label: "Booking" },
    { href: "/industries/clinics", label: "AI receptionist for clinics" },
    { href: "/demos", label: "Hear a live agent" },
  ],
};

export const uk: Landing = {
  path: "/ai-receptionist-uk",
  metaTitle: "AI receptionist UK: answers every call for UK clinics and businesses",
  metaDescription:
    "An AI receptionist for UK clinics, practices and local businesses. Answers every call, books the appointment and hands urgent cases to your team. UK GDPR-aware setup.",
  eyebrow: "AI receptionist UK",
  h1: "An AI receptionist for the UK",
  answer:
    "An AI receptionist answers every call to your UK business, books the appointment in your calendar and hands urgent or sensitive calls to your staff. We set it up around UK data protection rules and agree data handling in writing before we start. It works with your existing UK number.",
  updated: UPDATED,
  sections: [
    {
      h: "What it does",
      list: [
        "Answers in one ring and finds out what the caller needs.",
        "Books, moves or cancels appointments against your real calendar and texts a confirmation.",
        "Answers routine questions: opening hours, location, services, parking.",
        "Passes urgent or sensitive calls to a person on your team with a short summary.",
        "Sends you a plain weekly summary of calls answered and slots booked.",
      ],
    },
    {
      h: "UK numbers and call routing",
      p: [
        "We connect to the UK number you already use, for example by forwarding calls when your team is busy or the office is closed. A new UK number can be set up where the telephony provider supports it. We confirm this on the first call.",
      ],
    },
    {
      h: "UK GDPR and call recording",
      p: [
        "Calls can involve personal data, and sometimes health information. We agree what is stored, where, for how long and who can see it in writing before work begins, and we design the setup around UK GDPR and the Data Protection Act 2018.",
        "We do not claim a certification we do not hold. Call recording is optional and only used with consent wording you have agreed. The agent always says it is an AI, and any caller can ask for a person. If you need advice on your legal duties, speak to your own adviser or the ICO guidance.",
      ],
    },
    {
      h: "Languages",
      p: ["The agent speaks English, Arabic and Urdu, which suits UK practices serving diverse communities. Other languages are scoped on request."],
    },
    {
      h: "Cost",
      p: ["We quote in pounds sterling on a call after we understand your call volume and the systems involved. We do not publish prices until the scope is clear."],
    },
  ],
  faq: [
    ["Does it work with a UK phone number?", "Yes. We connect to your existing UK number, or set up a new one where the provider supports it."],
    ["Is it UK GDPR compliant?", "We design the setup around UK GDPR and agree data handling in writing first. We do not claim a certification we do not hold, and any specific requirement is scoped before we start."],
    ["Can it handle NHS or private clinic bookings?", "It books into the calendar or practice software you use. If an integration does not exist, we scope building it before work starts."],
    ["Which languages does it speak?", "English, Arabic and Urdu. Other languages are scoped on request."],
    ["Will callers know it is an AI?", "Yes. It introduces itself plainly and any caller can ask for a person."],
  ],
  related: [
    { href: "/services/voice", label: "AI voice agents" },
    { href: "/after-hours-answering-service", label: "After hours answering" },
    { href: "/industries/clinics", label: "AI receptionist for clinics" },
    { href: "/studio/automations", label: "AI automation" },
  ],
};

export const canada: Landing = {
  path: "/ai-receptionist-canada",
  metaTitle: "AI receptionist Canada: answers every call for clinics and businesses",
  metaDescription:
    "An AI receptionist for Canadian clinics and local businesses. Answers every call, books the appointment and flags urgent calls to your team. Set up around PIPEDA and provincial privacy rules.",
  eyebrow: "AI receptionist Canada",
  h1: "An AI receptionist for Canada",
  answer:
    "An AI receptionist answers every call to your Canadian business, books the appointment and passes urgent calls to your staff. We agree data handling in writing first and design the setup around PIPEDA and any provincial rules that apply to you. English is standard, and French is scoped on request.",
  updated: UPDATED,
  sections: [
    {
      h: "What it does",
      list: [
        "Answers in one ring and finds out what the caller needs.",
        "Books, moves or cancels appointments against your real calendar and texts a confirmation.",
        "Covers evenings and weekends, so calls outside opening hours are not lost.",
        "Passes urgent or sensitive calls to a person on your team with a short summary.",
      ],
    },
    {
      h: "Privacy: PIPEDA and provincial rules",
      p: [
        "Calls can include personal and sometimes health information. We agree what is stored, where, for how long and who can see it in writing before work begins. We design around PIPEDA, and provincial rules such as Quebec's Law 25 or provincial health-privacy laws may also apply to you.",
        "We do not claim a certification we do not hold, and any specific requirement is scoped first, including where data may be stored. For legal advice, speak to your own adviser.",
      ],
    },
    {
      h: "English and French",
      p: [
        "The agent speaks English as standard. French is scoped on request, so tell us on the first call if you need it. We also build in Arabic and Urdu.",
      ],
    },
    {
      h: "Canadian numbers",
      p: ["We connect to the number you already use, for example by forwarding calls when your team is busy or closed. We confirm number options on the first call."],
    },
  ],
  faq: [
    ["Does it work in French?", "French is scoped on request. English, Arabic and Urdu are available as standard."],
    ["How does it handle PIPEDA?", "We design the setup around PIPEDA and agree data handling in writing first. Provincial rules may also apply, and we scope them before we start."],
    ["Can it work with my existing Canadian phone number?", "Yes. We connect to your current number, for example by forwarding calls."],
    ["Will callers know it is an AI?", "Yes. It introduces itself plainly and any caller can ask for a person."],
  ],
  related: [
    { href: "/services/voice", label: "AI voice agents" },
    { href: "/after-hours-answering-service", label: "After hours answering" },
    { href: "/industries/clinics", label: "AI receptionist for clinics" },
  ],
};

export const outbound: Landing = {
  path: "/services/outbound-calling",
  metaTitle: "AI outbound calling: callbacks, reminders and win-back calls",
  metaDescription:
    "AI outbound calling for people who already know you: lead callbacks, appointment reminders and win-back calls. Consent-first, with opt-outs honoured and a clear handover to your team.",
  eyebrow: "Service / Outbound calling",
  h1: "AI outbound calling, with consent",
  answer:
    "AI outbound calling means a voice agent phones people on your behalf, for example to call back a new enquiry, confirm an appointment or invite a past client to return. We only set it up for people who already have a relationship with you or have asked to be contacted. We do not run bulk calls to purchased lists.",
  updated: UPDATED,
  sections: [
    {
      h: "What it is used for",
      list: [
        "Lead callback: ring a new enquiry within moments of them asking, while they are still interested.",
        "Appointment confirmations and reminders, with a reschedule if the time no longer works.",
        "Win-back calls to past clients you choose, with an easy opt-out.",
        "Chasing a quote or an unfinished booking.",
      ],
    },
    {
      h: "AI cold calling: what we will and will not do",
      p: [
        "Many people search for AI cold calling. We do not build untargeted calling to purchased lists, because it often breaks consent rules and damages the brand that pays for it.",
        "We build calling for warm contacts: people who enquired, booked before, or asked to hear from you. That is where it works best and where the rules are clearest.",
      ],
    },
    {
      h: "Consent and calling rules",
      p: [
        "Rules differ by country and by type of call, for example the TCPA in the US, PECR and the Telephone Preference Service in the UK, and the CRTC's rules in Canada. We agree who may be called, at what times and how opt-outs are handled in writing before any call is made.",
        "The agent always says it is an AI, honours a request to stop straight away, and passes the call to a person when needed. This is not legal advice; check your own obligations with an adviser.",
      ],
    },
    {
      h: "How it works",
      list: [
        "You approve the list of people to contact before anything is sent.",
        "You set the weekly cap, calling hours and the script, and review the first calls before widening it.",
        "People who want to book are booked into your calendar; people who decline are never contacted again.",
        "You get a plain summary of calls made, outcomes and handovers.",
      ],
    },
  ],
  faq: [
    ["What is AI outbound calling?", "A voice agent phones people on your behalf, for example to call back an enquiry, confirm an appointment or invite a past client to return."],
    ["Can you do AI cold calling?", "We do not build untargeted calling to purchased lists. We build calling for people who already know you or asked to be contacted."],
    ["Is outbound AI calling legal?", "It depends on the country, the type of call and the consent you hold. We agree the rules in writing before any call is made. This is not legal advice."],
    ["What happens if someone asks to stop?", "The agent stops straight away and the number is never called again."],
    ["Will the person know it is an AI?", "Yes. The agent says so at the start of every call."],
  ],
  related: [
    { href: "/services/reactivation", label: "Reactivation" },
    { href: "/services/follow-up", label: "Follow-up" },
    { href: "/services/voice", label: "AI voice agents" },
  ],
};
