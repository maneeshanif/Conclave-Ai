import type { Metadata } from "next";
import { LandingPage } from "@/components/LandingPage";
import { canada as page } from "@/lib/landing";

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: page.path },
};

export default function Page() {
  return <LandingPage page={page} />;
}
