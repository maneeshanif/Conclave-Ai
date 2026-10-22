import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";

// Placeholder text: not indexed until the real, professionally reviewed text is in (Change Spec v3).
export const metadata: Metadata = { title: "Privacy", robots: { index: false, follow: true } };

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy" />
      <p className="frame px-4 md:px-10 pb-24 text-slate">Text to be added before launch.</p>
    </>
  );
}
