import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PageCta } from "@/components/PageCta";

export const metadata: Metadata = {
  title: "Receipts: our numbers, in public",
  description: "A running ledger of real numbers and build logs from Conclave AI demos and pilots.",
  alternates: { canonical: "/receipts" },
};

const ledger = [
  ["Time to answer a call", "Demo line call logs", "Starts with the first live demo"],
  ["Bookings made by the agent", "Calendar entries created", "Starts with the first pilot"],
  ["Hours saved per week", "Call and message logs", "Starts with the first pilot"],
  ["Build time per agent", "Our own build logs", "Published with each case"],
] as const;

export default function ReceiptsPage() {
  return (
    <>
      <PageHeader eyebrow="Receipts" title="Receipts, not claims." lead="Big firms hide behind logos. We publish the numbers and the build logs, once they exist and are real." />
      <div data-reveal className="frame border-t hair px-4 py-10 md:px-10">
        <h2 className="head">The ledger</h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border hair bg-paper">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <caption className="sr-only">Metrics we will publish, their source and status</caption>
            <thead className="bg-mist/60">
              <tr className="label text-slate">
                <th scope="col" className="px-5 py-3 font-medium">Metric</th>
                <th scope="col" className="px-5 py-3 font-medium">Source</th>
                <th scope="col" className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgb(11_21_18/0.12)]">
              {ledger.map(([m, s, st]) => (
                <tr key={m}>
                  <th scope="row" className="px-5 py-3.5 font-medium">{m}</th>
                  <td className="px-5 py-3.5 text-slate">{s}</td>
                  <td className="px-5 py-3.5"><span className="rounded-md bg-mist px-2 py-0.5 text-xs text-slate">{st}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="frame grid gap-px border-t hair bg-[rgb(11_21_18/0.12)] md:grid-cols-2">
        <section data-reveal className="bg-paper p-8">
          <h2 className="head">Build logs</h2>
          <p className="mt-3 max-w-md text-slate">Short, dated entries: what we built, what broke, what we changed. The first one is posted with the first pilot.</p>
        </section>
        <section data-reveal className="bg-paper p-8">
          <h2 className="head">The rules</h2>
          <ul className="mt-3 max-w-md list-disc space-y-1.5 pl-5 text-slate">
            <li>Every number links to where it came from.</li>
            <li>No client is named until they agree.</li>
            <li>A figure is dated, and a stale one is marked as such.</li>
          </ul>
        </section>
      </div>
      <PageCta />
    </>
  );
}
