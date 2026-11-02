import fs from "node:fs";
import path from "node:path";
import { supabase } from "./supabase";

export interface Project {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  stack: string[];
  cover_video_url: string | null;
  gallery: string[];
  body: string;
  results: { label: string; value: string }[];
  featured: boolean;
  sort_order: number;
  role: string;
  /** Screenshot path under /public, found automatically: drop public/work/<slug>.png (or .jpg, .webp) and it is used. */
  image?: string | null;
}

/**
 * The builds shown on Work and on the home page. `featured: true` means the owner is happy to show it openly.
 * OWNER TO CONFIRM: the tags, stack and role below are working labels. Correct them here (or in the Supabase `projects` table),
 * and add `summary`, `body` and `results` as they are written. Anything left empty is simply not shown.
 * Rows from the Supabase `projects` table replace this list when the table has data.
 */
const seed: Project[] = [
  {
    slug: "bazar-flow",
    title: "BazaarFlow",
    summary: "An AI back office for small retailers. The owner runs the shop by chatting, and nothing touching money, stock or public posts happens without their approval.",
    tags: ["AI agents", "Platform", "Web app"],
    stack: ["Next.js", "FastAPI", "Postgres", "OpenAI Agents SDK", "Twilio WhatsApp", "VAPI voice"],
    cover_video_url: null,
    gallery: ["/work/bazar-flow.jpg", "/work/bazar-flow-2.jpg", "/work/bazar-flow-3.jpg", "/work/bazar-flow-4.jpg"],
    body: "Small shopkeepers juggle stock, sales, customer credit, suppliers and social media across notebooks and chat apps.\n\nBazaarFlow gives each shop one place to run all of it. The owner types or says a sale, the agent drafts it, and the owner approves before anything is saved. Customer credit (udhaar), products, stock, orders and finance sit on the same dashboard, with a daily briefing.\n\nAgents answer customer questions and draft marketing posts, but anything that moves money, stock or public content goes through an approvals queue first. Every business's data is isolated with row-level security, actions are audit-logged, and AI spend is capped per shop.",
    results: [
      { label: "Lines of code", value: "~50,000" },
      { label: "Automated tests", value: "~700" },
      { label: "Agent writes", value: "Approval-gated" },
    ],
    featured: true,
    sort_order: 1,
    role: "Design and full-stack build",
  },
  {
    slug: "vespera-ai",
    title: "Vespera AI",
    summary: "A multi-clinic platform for med spas: it captures after-hours leads, screens them against each clinic's own safety rules, and hands booking to the front desk.",
    tags: ["AI agent", "Platform"],
    stack: ["Next.js", "FastAPI", "Supabase", "Qdrant", "Gemini", "Retell AI", "LiveKit"],
    cover_video_url: null,
    gallery: ["/work/vespera-ai.jpg", "/work/vespera-ai-2.jpg", "/work/vespera-ai-3.jpg"],
    body: "Med spas lose leads that message after hours, and a wrong answer about a treatment is a safety problem, not just a lost sale.\n\nVespera answers on the web chat, Instagram and voice. Each reply is checked against the clinic's own uploaded protocols: a contraindication such as pregnancy or recent isotretinoin stops the booking link and flags the lead for a human. The booking link is issued by code from facts, never by the model.\n\nThe dashboard gives the front desk an inbox with human takeover, a patient CRM, an approvals queue for outbound messages, a visual builder for voice workflows, an audit log, retention controls and per-tenant isolation.",
    results: [],
    featured: true,
    sort_order: 2,
    role: "Product, agent design and full-stack build",
  },
  {
    slug: "divine-group",
    title: "Divine Group",
    summary: "A live website for a freight and commercial truck insurance brokerage, built to turn visitors into quote requests.",
    tags: ["Website", "Web app"],
    stack: ["Next.js 16", "React 19", "GSAP", "Lenis", "Zod", "Resend", "Vercel"],
    cover_video_url: null,
    gallery: ["/work/divine-group.jpg", "/work/divine-group-2.jpg"],
    body: "A trucking insurance brokerage needed a professional online presence that makes asking for a quote the obvious next step.\n\nWe designed and shipped the full site: scroll-driven motion, nine coverage-line pages, and a validated quote form (DOT number, phone, garaging address) that emails the team instantly so no lead is lost. It is deployed on Vercel on the client's own domain and set up for search with a sitemap and Google Search Console.",
    results: [{ label: "Status", value: "Live" }],
    featured: true,
    sort_order: 3,
    role: "Design and build, with Conclave AI",
  },
  {
    slug: "midnight-revenue-rescuer",
    title: "Midnight Revenue Rescuer + Ava",
    summary: "An n8n workflow and a Retell voice agent that answer after-hours enquiries, screen them for safety, and phone the leads who never booked.",
    tags: ["Automation", "Voice agent"],
    stack: ["n8n", "Gemini", "Retell AI", "Airtable", "Twilio", "Slack alerts"],
    cover_video_url: null,
    gallery: ["/work/medspa-voice-agent.jpg", "/work/medspa-voice-agent-2.jpg"],
    body: "Midnight Revenue Rescuer is an event-driven n8n pipeline. An inbound Instagram DM goes to Gemini with a structured output (intent, medical-clearance flag, treatment, reply), then routes: cleared leads are saved as Qualified, and messages mentioning red flags such as pregnancy or isotretinoin never get an auto-booking reply; they are logged for review with an alert to the owner. A lead nobody has contacted for 60 minutes triggers an outbound call.\n\nAva is that caller: a Retell conversation flow, built as a state machine instead of one freeform prompt. A mandatory safety gate comes before any scheduling talk. Two live tools check availability and write the booking, and Ava only says the patient is booked after the write succeeds. She discloses she is an AI, never invents prices, and hands over to a human on request.",
    results: [],
    featured: true,
    sort_order: 4,
    role: "Workflow and voice-agent design and build",
  },
  {
    slug: "assignment-auto-checker",
    title: "Student Assignment Auto-Checker",
    summary: "An n8n workflow that collected, recorded and graded hundreds of student submissions automatically.",
    tags: ["Automation"],
    stack: ["n8n", "Google Forms", "Google Sheets", "Gmail"],
    cover_video_url: null,
    gallery: [],
    body: "A summer-camp cohort of about 300 students submitted assignments, and checking each by hand would have taken the teachers days.\n\nEach submission comes in through a Google Form, is recorded in a Google Sheet, and the student is emailed their result automatically. Built with a fellow lead teacher for the GIAIC summer camp.",
    results: [],
    featured: true,
    sort_order: 5,
    role: "Workflow design and build",
  },
  {
    slug: "furniro",
    title: "Furniro",
    summary: "A furniture e-commerce store with a managed catalogue and online payments.",
    tags: ["Web app", "E-commerce"],
    stack: ["Next.js", "Sanity CMS"],
    cover_video_url: null,
    gallery: ["/work/furniro.jpg", "/work/furniro-2.jpg", "/work/furniro-3.jpg"],
    body: "A full storefront: home, shop grid, product pages, cart and checkout, blog and contact. Products and content are managed in Sanity CMS, so the owner can change the catalogue without touching code.",
    results: [],
    featured: true,
    sort_order: 6,
    role: "Full-stack build",
  },
  {
    slug: "task-whisper",
    title: "Task Whisper",
    summary: "An agentic to-do app with an MCP server, built to learn cloud-native tooling end to end.",
    tags: ["AI agent", "Platform"],
    stack: ["Next.js", "FastAPI", "MCP", "Kafka", "Dapr", "Kubernetes"],
    cover_video_url: null,
    gallery: [],
    body: "A task manager you can talk to. An MCP server exposes the task tools to the agent, and the app runs on an event-driven, cloud-native stack with Kafka, Dapr and Kubernetes.",
    results: [],
    featured: true,
    sort_order: 7,
    role: "Full-stack and agent build",
  },
  {
    slug: "physical-ai-textbook",
    title: "Physical AI Textbook",
    summary: "A 15-week interactive textbook with an AI tutor that answers from the course material.",
    tags: ["AI agent", "RAG"],
    stack: ["Docusaurus", "FastAPI", "Qdrant", "Gemini"],
    cover_video_url: null,
    gallery: [],
    body: "Students learning Physical AI had no guided, interactive resource. This textbook has a retrieval-based tutor chatbot: questions are answered from the course chapters, using vector search over the content.",
    results: [],
    featured: true,
    sort_order: 8,
    role: "Full-stack and RAG build",
  },
  { slug: "owner-ai", title: "Owner AI", summary: "An AI agent project.", tags: ["AI agent"], stack: [], cover_video_url: null, gallery: [], body: "", results: [], featured: true, sort_order: 9, role: "Agent design and build" },
];

/** Looks for public/work/<slug>.(png|jpg|jpeg|webp) at build or request time. */
function findImage(slug: string): string | null {
  for (const ext of ["png", "jpg", "jpeg", "webp"]) {
    if (fs.existsSync(path.join(process.cwd(), "public", "work", `${slug}.${ext}`))) return `/work/${slug}.${ext}`;
  }
  return null;
}

/** Shown publicly when the owner has marked it as showable. Missing details are left out rather than faked. */
export const isShowable = (p: Project) => p.featured;

/** True when a project has a real written case: a body and at least one result. Controls indexing of its page. */
export const hasWriteUp = (p: Project) => p.body.trim().length > 0;

export async function getProjects(): Promise<Project[]> {
  let rows = seed;
  if (supabase) {
    const { data, error } = await supabase.from("projects").select("*").order("sort_order");
    if (!error && data?.length) rows = data as Project[];
  }
  return rows.map((p) => ({ ...p, image: p.image ?? p.gallery[0] ?? findImage(p.slug) }));
}

export async function getShowcaseProjects(): Promise<Project[]> {
  return (await getProjects()).filter(isShowable);
}

export async function getProject(slug: string) {
  const all = await getShowcaseProjects();
  const i = all.findIndex((p) => p.slug === slug);
  return i < 0 ? null : { project: all[i], next: all[(i + 1) % all.length] };
}
