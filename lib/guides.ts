/**
 * Long-form guides shown under the industry pages that target "AI receptionist for ..." searches.
 * Rules: no invented statistics, no pricing, no testimonials, no compliance claims we cannot back.
 */
export type Guide = {
  title: string;
  intro: string;
  sections: { h: string; p: string[] }[];
  faq: [string, string][];
};

export const industryGuides: Record<string, Guide> = {
  "med-spas": {
    title: "An AI receptionist for med spas, explained",
    intro:
      "A med spa lives on enquiries. Someone sees a treatment on Instagram at 10pm, asks a question, and books with whoever answers first. An AI receptionist is built for exactly that gap: it answers the phone, replies to messages, and holds a consultation slot while the person is still interested.",
    sections: [
      {
        h: "What an AI receptionist does for a med spa",
        p: [
          "It answers calls in one ring and handles the questions front desks repeat all day: what a treatment involves, how long it takes, whether there is downtime, and when the next consultation is free. It then checks your real calendar and books the slot, so nobody is left waiting for a call back.",
          "The same agent replies to web forms, WhatsApp, SMS and Instagram messages in your tone. Enquiries that arrive at night are answered at night, not the next morning when they have already gone cold.",
          "Anything medical stays with your team. The agent does not give clinical advice, does not recommend a treatment for a condition, and passes the conversation to a person, with a short summary, the moment a caller needs one.",
        ],
      },
      {
        h: "How it works, step by step",
        p: [
          "We start with a call to learn how your front desk actually works: your treatments, your consultation rules, your opening hours, and the questions you never want answered wrongly. That becomes the agent's written brief.",
          "We then connect your calendar, your phone number and the message channels you use, and start with a pilot. In the first days the agent works in approve-first mode, so you read what it would send before it goes out. You relax that setting only when you trust it.",
          "Each week you get a plain summary: calls answered, consultations held, enquiries handed to staff. Tone and wording are reviewed with you, and nothing is sent that you have not agreed.",
        ],
      },
      {
        h: "Bringing lapsed clients back",
        p: [
          "Many med spa treatments repeat. The reactivation workflow reaches out to past clients you choose, with a short personal message and an easy opt-out. People who reply are offered a slot; people who decline are never contacted again. You set the weekly cap and you approve the list before anything is sent.",
        ],
      },
      {
        h: "Privacy and HIPAA, honestly",
        p: [
          "Med spas handle personal and sometimes health-related information, so we design for privacy from the start and agree data handling in writing before any work begins. That covers what is stored, where, for how long, and who can see it.",
          "We do not claim a certification we do not hold. If you are subject to HIPAA or a similar rule, we scope that requirement first, including whether every tool in the chain can be covered by the right agreement. If it cannot be done properly, we tell you before you pay for anything.",
          "Callers are always told they are speaking to an AI, and any caller can ask for a person at any time. Call recording is optional and only used with consent wording you have agreed.",
        ],
      },
      {
        h: "Languages and tone",
        p: [
          "The agent speaks English, Arabic and Urdu, which matters for med spas in the Gulf and for international clients elsewhere. Other languages are scoped on request. Tone is written with you: warm and calm for a clinical brand, or more relaxed for a lifestyle one.",
        ],
      },
      {
        h: "Is it right for you?",
        p: [
          "It fits best if you miss calls while treatments are running, get enquiries outside opening hours, or lose people between the first message and the booking. It is a poor fit if you receive very few enquiries or if every booking needs a long clinical intake before a slot can be offered. We say so on the first call.",
        ],
      },
    ],
    faq: [
      ["Can an AI receptionist book consultations for a med spa?", "Yes. It reads your live calendar, offers two or three slots and books the one the caller picks, then confirms by text. Anything in your calendar blocks the slot."],
      ["Will it give medical advice?", "No. It answers practical questions about treatments, timing and availability. Clinical questions go to your team with a summary."],
      ["What happens to calls outside opening hours?", "The agent answers them, takes the details and books a consultation slot. Urgent or unusual calls are flagged to a person on your team."],
      ["Does it work in Arabic?", "Yes. We build in English, Arabic and Urdu. Other languages are scoped on request."],
    ],
  },
  clinics: {
    title: "An AI receptionist for clinics, explained",
    intro:
      "A clinic's front desk is often the busiest person in the building and the least able to answer the phone. An AI receptionist picks up when they cannot, books and moves appointments in your calendar, and passes anything sensitive to your staff.",
    sections: [
      {
        h: "What an AI receptionist does for a clinic",
        p: [
          "It answers every call in one ring, finds out what the patient needs, and books, moves or cancels the appointment against your real calendar. It sends a text to confirm and a reminder before the visit, which cuts the gaps that come from missed calls and forgotten appointments.",
          "It also handles the routine questions: opening hours, location, which doctor sees what, what to bring. That keeps your staff free for the patient standing in front of them.",
          "It does not diagnose and it does not give clinical advice. Urgent calls are flagged and passed to a person on your team straight away, with a short summary so the patient does not have to repeat themselves.",
        ],
      },
      {
        h: "How it works, step by step",
        p: [
          "We begin with a call about how your clinic runs: departments, doctors, appointment types, opening hours, and the cases that must always go to a human. We write that into the agent's brief and agree it with you.",
          "We connect your phone number and calendar or practice software, then start with a pilot. Early on you can review what the agent would say before it goes live, and you widen its freedom as trust builds.",
          "Every week you see a one-minute summary: calls answered, appointments booked, reminders sent, and how many were handed to staff.",
        ],
      },
      {
        h: "Triage and handover to staff",
        p: [
          "The agent is built to know its limits. Calls that mention symptoms you have listed as urgent, distressed callers, and anything it is unsure about are handed to a person, with the conversation summarised. You decide the list of triggers with us, and it can be changed at any time.",
        ],
      },
      {
        h: "Privacy, HIPAA and patient data",
        p: [
          "Clinics hold some of the most sensitive data there is, so data handling is agreed in writing before we start: what is stored, where, for how long, and who has access.",
          "We do not claim a compliance certification we do not hold. If HIPAA or a regional health-data rule applies to you, we scope it first and confirm whether each tool in the chain can be covered properly. If it cannot, we say so up front.",
          "The agent always introduces itself as an AI, and any caller can ask for a human at any time.",
        ],
      },
      {
        h: "Languages for patients",
        p: [
          "The agent speaks English, Arabic and Urdu, so patients can call in the language they are most comfortable in. Other languages are scoped on request. If your clinic is in the Gulf, see our page on an AI receptionist for clinics in the Gulf.",
        ],
      },
      {
        h: "Is it right for you?",
        p: [
          "It fits if calls go unanswered while staff are with patients, if after-hours calls are lost, or if no-shows are a problem. It is less useful for a very small practice with a handful of calls a week. We will tell you honestly on the first call.",
        ],
      },
    ],
    faq: [
      ["Will patients accept talking to an AI?", "The agent introduces itself plainly and any caller can ask for a person at any time. Most routine calls, such as bookings and opening hours, are quick and simple."],
      ["Can it connect to our practice software?", "We connect to the tool you use. If an integration does not exist, we scope building it before any work starts."],
      ["Does it answer after hours?", "Yes. It answers, takes the details and books a slot, and flags anything urgent to a person on your team."],
      ["Does it send appointment reminders?", "Yes. It texts a confirmation and a reminder, and handles reschedules by phone or text."],
    ],
  },
};
