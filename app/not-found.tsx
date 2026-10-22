import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="frame px-4 md:px-10 pb-24 pt-40">
      <p className="label text-slate">404</p>
      <h1 className="display mt-4 text-display-l">Nothing here.</h1>
      <Button href="/" className="mt-8">
        Back home
      </Button>
    </div>
  );
}
