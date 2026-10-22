import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "ghost" | "light";

const base =
  "press inline-flex h-11 items-center justify-center rounded-xl px-5 text-[0.9375rem] font-medium transition-[color,background-color,transform] duration-150 [transition-timing-function:var(--ease-out-quart)]";

const variants: Record<Variant, string> = {
  // Lime fill, Ink label: 14.37:1. The brand action colour.
  primary: "bg-lime text-ink hover:bg-ink hover:text-lime",
  // Ink fill, Paper label: 18.03:1. Used where lime would be weak on a light surface.
  dark: "bg-ink text-paper hover:bg-moss",
  // Hairline outline on light surfaces.
  ghost: "border hair bg-paper text-ink hover:bg-mist",
  // For dark sections.
  light: "bg-paper text-ink hover:bg-lime",
};

interface Props {
  href: string;
  variant?: Variant;
  className?: string;
  /** Leans toward the pointer on fine-pointer devices. Use on hero and closing actions only. */
  magnetic?: boolean;
  children: React.ReactNode;
}

export function Button({ href, variant = "primary", className, magnetic, children }: Props) {
  return (
    <Link href={href} data-magnetic={magnetic ? "" : undefined} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}
