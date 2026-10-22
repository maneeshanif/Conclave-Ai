import Link from "next/link";

/** Official wordmark (supplied pack, public/brand). Light and dark variants. */
export function Logo({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const src = tone === "light" ? "/brand/conclave-logo-on-light.svg" : "/brand/conclave-logo-on-dark.svg";
  return (
    <Link href="/" aria-label="Conclave AI, home" className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="Conclave AI" width={148} height={28} className="h-7 w-auto" />
    </Link>
  );
}
