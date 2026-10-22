import { Button } from "@/components/ui/Button";
import { Character } from "@/components/Cast";

export default function NotFound() {
  return (
    <div className="frame grid items-center gap-8 px-4 pb-24 pt-40 md:grid-cols-[1fr_auto] md:px-10">
      <div>
        <p className="label text-slate">404</p>
        <h1 className="display mt-4 text-display-l">Nothing here.</h1>
        <p className="mt-4 max-w-md text-slate">Echo looked everywhere. That page does not exist, or it moved.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/">Back home</Button>
          <Button href="/services" variant="ghost">
            See services
          </Button>
        </div>
      </div>
      <Character id="echo" mood="oops" className="mx-auto h-56 w-56 md:h-72 md:w-72" label="Echo, confused" />
    </div>
  );
}
