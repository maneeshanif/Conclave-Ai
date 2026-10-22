import { Button } from "./ui/Button";

/** Closing call to action for inner pages: one primary action, one secondary. */
export function PageCta({ title = "Hear it, then book it.", body = "A short call. We listen first and tell you honestly if an agent will help." }: { title?: string; body?: string }) {
  return (
    <section data-reveal className="frame border-t hair px-4 py-16 md:px-10">
      <h2 className="head max-w-xl">{title}</h2>
      <p className="mt-3 max-w-md text-slate">{body}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/contact">Book a call</Button>
        <Button href="/demos" variant="ghost">
          Hear a live agent
        </Button>
      </div>
    </section>
  );
}
