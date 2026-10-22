import type { MetadataRoute } from "next";
import { site, services, allRoutes } from "@/lib/site";
import { industries } from "@/lib/content";
import { getProjects } from "@/lib/projects";
import { posts } from "@/lib/notes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const paths = [
    ...allRoutes.map((r) => r.href),
    "/privacy",
    "/terms",
    ...services.map((s) => `/services/${s.slug}`),
    ...industries.map((i) => `/industries/${i.slug}`),
    ...projects.map((p) => `/work/${p.slug}`),
    ...posts.map((p) => `/notes/${p.slug}`),
  ];
  return [...new Set(paths)].map((p) => ({ url: `${site.url}${p === "/" ? "" : p}`, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}
