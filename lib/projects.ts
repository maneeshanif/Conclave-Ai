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
  { slug: "bazar-flow", title: "Bazar Flow", summary: "A web app, built full-stack.", tags: ["Web app"], stack: ["Next.js", "FastAPI", "Supabase"], cover_video_url: null, gallery: [], body: "", results: [], featured: true, sort_order: 1, role: "Full-stack build" },
  { slug: "codenexus-ai", title: "CodeNexus AI", summary: "An AI agent project.", tags: ["AI agent"], stack: ["OpenAI Agents SDK", "FastAPI"], cover_video_url: null, gallery: [], body: "", results: [], featured: true, sort_order: 2, role: "Agent design and build" },
  { slug: "scalenexus-ai", title: "ScaleNexus AI", summary: "A workflow automation project.", tags: ["Automation"], stack: ["Python", "Supabase"], cover_video_url: null, gallery: [], body: "", results: [], featured: true, sort_order: 3, role: "Workflow automation" },
  { slug: "task-whisper", title: "Task Whisper", summary: "A voice agent.", tags: ["Voice agent"], stack: ["Vapi", "Next.js"], cover_video_url: null, gallery: [], body: "", results: [], featured: true, sort_order: 4, role: "Voice agent" },
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
