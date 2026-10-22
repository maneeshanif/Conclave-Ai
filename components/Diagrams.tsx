import { cn } from "@/lib/utils";

/**
 * Call flow: the steps as connected nodes. Vertical on phones, horizontal from md. Arrows are drawn with CSS so they
 * stay crisp and wrap with the layout. `data-stagger` lets MotionRoot bring the steps in one by one.
 */
export function FlowDiagram({ steps, label = "Call flow" }: { steps: string[]; label?: string }) {
  return (
    <ol data-stagger aria-label={label} className="grid gap-3 md:grid-flow-col md:auto-cols-fr md:gap-0">
      {steps.map((s, i) => (
        <li key={s} className="relative md:px-2">
          <div className="flex h-full flex-col rounded-2xl border border-ink/80 bg-paper p-4 shadow-[3px_3px_0_0_#0B1512]">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-xs font-semibold text-paper">{i + 1}</span>
            <p className="mt-3 text-[0.9375rem]">{s}</p>
          </div>
          {i < steps.length - 1 && (
            <>
              <span aria-hidden="true" className="absolute -bottom-3 left-8 h-3 w-0.5 bg-ink md:hidden" />
              <span aria-hidden="true" className="absolute right-[-6px] top-1/2 hidden h-0.5 w-4 -translate-y-1/2 bg-ink md:block">
                <span className="absolute -right-0.5 -top-[3px] h-2 w-2 rotate-45 border-r-2 border-t-2 border-ink" />
              </span>
            </>
          )}
        </li>
      ))}
    </ol>
  );
}

/** Stack diagram for a case study: the tools it was built with as connected blocks. Order is illustrative, not a request path. */
export function ArchDiagram({ stack }: { stack: string[] }) {
  const tones = ["bg-lime", "bg-lilac", "bg-moss text-paper", "bg-steel", "bg-mist"];
  return (
    <figure>
      <ul data-stagger className="flex flex-wrap items-center gap-2" aria-label="Stack">
        {stack.map((t, i) => (
          <li key={t} className="flex items-center gap-2">
            <span className={cn("rounded-xl border border-ink/80 px-4 py-2.5 text-[0.9375rem] font-medium shadow-[3px_3px_0_0_#0B1512]", tones[i % tones.length])}>{t}</span>
            {i < stack.length - 1 && <span aria-hidden="true" className="h-0.5 w-5 bg-ink" />}
          </li>
        ))}
      </ul>
      <figcaption className="mt-3 text-xs text-slate">Built with these. The order shown is illustrative; a full architecture diagram is added with each write-up.</figcaption>
    </figure>
  );
}

/** ERP and CRM module map: the modules around one shared set of data. Example structure, not a screenshot. */
export function ModuleMap({ modules }: { modules: string[] }) {
  return (
    <figure>
      <div data-stagger className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {modules.map((m, i) => (
          <div key={m} className={cn("rounded-2xl border border-ink/80 bg-paper p-4 shadow-[3px_3px_0_0_#0B1512]", false)}>
            <span className="label text-plum">{String(i + 1).padStart(2, "0")}</span>
            <p className="mt-2 text-[0.9375rem] font-medium">{m}</p>
          </div>
        ))}
        <div className="col-span-2 rounded-2xl border border-ink/80 bg-ink p-4 text-paper sm:col-span-4">
          <span className="label text-lilac">Underneath</span>
          <p className="mt-1 font-medium">One database you own, with every module reading the same customers, orders and stock.</p>
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-slate">Example structure. Screens are added, labelled Example, as modules are built.</figcaption>
    </figure>
  );
}
