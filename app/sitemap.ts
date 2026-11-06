import type { MetadataRoute } from "next";
import { site, services, allRoutes } from "@/lib/site";
import { industries, studio } from "@/lib/content";
import { getShowcaseProjects, hasWriteUp } from "@/lib/projects";
import { posts } from "@/lib/notes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = (await getShowcaseProjects()).filter(hasWriteUp);
  const paths = [
    ...allRoutes.map((r) => r.href),
    "/ai-receptionist-gulf-clinics",
    "/after-hours-answering-service",
    "/ai-receptionist-uk",
    "/ai-receptionist-canada",
    "/services/outbound-calling",
    ...services.map((s) => `/services/${s.slug}`),
    ...studio.map((s) => `/studio/${s.slug}`),
    ...industries.map((i) => `/industries/${i.slug}`),
    ...projects.map((p) => `/work/${p.slug}`),
    ...posts.map((p) => `/notes/${p.slug}`),
  ];
  return [...new Set(paths)].map((p) => ({ url: `${site.url}${p === "/" ? "" : p}`, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}
