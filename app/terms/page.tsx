import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = { title: "Terms" };

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms" />
      <p className="frame px-4 md:px-10 pb-24 text-slate">Text to be added before launch.</p>
    </>
  );
}
