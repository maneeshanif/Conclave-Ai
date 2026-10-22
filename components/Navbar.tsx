"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Button } from "./ui/Button";
import { nav } from "@/lib/site";
import { useUI } from "@/stores/ui";
import { cn } from "@/lib/utils";

/** Floating white pill, 16px radius, 64px high (measured from lemlist: 16px radius, 68px high, 16px from top). */
export function Navbar() {
  const pathname = usePathname();
  const { menuOpen, setMenuOpen, setPaletteOpen } = useUI();

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname, setMenuOpen]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, setMenuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 px-4">
        <nav
          aria-label="Main"
          className={cn(
            "mx-auto flex h-16 max-w-[1240px] items-center justify-between rounded-2xl border hair bg-paper pl-5 pr-2.5 transition-shadow duration-200",
            scrolled && "shadow-[0_8px_24px_rgb(11_21_18/0.08)]",
          )}
        >
          <Logo />
          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={pathname.startsWith(l.href) ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-2 text-[0.9375rem] text-ink transition-colors duration-150 hover:bg-mist",
                    pathname.startsWith(l.href) && "bg-mist",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/pricing" className="rounded-lg px-3 py-2 text-[0.9375rem] text-ink transition-colors hover:bg-mist">
                Pricing
              </Link>
            </li>
          </ul>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="label hidden h-11 items-center rounded-xl border hair px-3 text-slate transition-colors hover:bg-mist lg:flex"
              aria-label="Open command palette"
            >
              Ctrl K
            </button>
            <Button href="/demos" variant="ghost" className="hidden md:inline-flex">
              Hear Aria
            </Button>
            <Button href="/contact" className="hidden md:inline-flex">
              Book a call
            </Button>
            <button
              type="button"
              className="label h-11 rounded-xl px-4 text-ink md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </nav>
      </header>

      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-40 flex flex-col bg-chalk px-4 pb-8 pt-28"
        >
          <ul className="flex flex-1 flex-col justify-center gap-2">
            {[...nav, { href: "/pricing", label: "Pricing" }].map((l, i) => (
              <li key={l.href} className="menu-item border-b hair" style={{ "--i": i } as React.CSSProperties}>
                <Link href={l.href} className="flex items-baseline gap-3 py-4 text-[1.75rem] font-semibold tracking-tight text-ink">
                  <span className="label text-slate">{String(i + 1).padStart(2, "0")}</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button href="/contact" className="h-14 w-full">
            Book a call
          </Button>
        </div>
      )}
    </>
  );
}
