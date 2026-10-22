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
}

/**
 * Honest placeholders until real case-study data is added to the Supabase
 * `projects` table. Results stay empty on purpose: real numbers only.
 */
const seed: Project[] = [
  { slug: "bazar-flow", title: "Bazar Flow", summary: "Outcome to be added once confirmed.", tags: ["Web app"], stack: ["Next.js", "FastAPI", "Supabase"], cover_video_url: null, gallery: [], body: "", results: [], featured: true, sort_order: 1, role: "Full-stack build" },
  { slug: "codenexus-ai", title: "CodeNexus AI", summary: "Outcome to be added once confirmed.", tags: ["AI agent"], stack: ["OpenAI Agents SDK", "FastAPI"], cover_video_url: null, gallery: [], body: "", results: [], featured: true, sort_order: 2, role: "Agent design and build" },
  { slug: "scalenexus-ai", title: "ScaleNexus AI", summary: "Outcome to be added once confirmed.", tags: ["Automation"], stack: ["Python", "Supabase"], cover_video_url: null, gallery: [], body: "", results: [], featured: true, sort_order: 3, role: "Workflow automation" },
  { slug: "task-whisper", title: "Task Whisper", summary: "Outcome to be added once confirmed.", tags: ["Voice agent"], stack: ["Vapi", "Next.js"], cover_video_url: null, gallery: [], body: "", results: [], featured: true, sort_order: 4, role: "Voice agent" },
];

/** A case is real when it has a screenshot or loop and at least one result with a number. Placeholders are never shown publicly. */
export const isReal = (p: Project) => (!!p.cover_video_url || p.gallery.length > 0) && p.results.length > 0;

export async function getProjects(): Promise<Project[]> {
  if (!supabase) return seed;
  const { data, error } = await supabase.from("projects").select("*").order("sort_order");
  return error || !data?.length ? seed : (data as Project[]);
}

export async function getRealProjects(): Promise<Project[]> {
  return (await getProjects()).filter(isReal);
}

export async function getProject(slug: string) {
  const all = await getRealProjects();
  const i = all.findIndex((p) => p.slug === slug);
  return i < 0 ? null : { project: all[i], next: all[(i + 1) % all.length] };
}
