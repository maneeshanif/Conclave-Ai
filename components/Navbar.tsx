"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Button } from "./ui/Button";
import { company, nav } from "@/lib/site";
import { useUI } from "@/stores/ui";
import { cn } from "@/lib/utils";

const linkCls = "rounded-lg px-3 py-2 text-[0.9375rem] text-ink transition-colors duration-150 hover:bg-mist";

/** Company dropdown: opens on click or hover, closes on Escape, outside click or navigation. Keyboard reachable. */
function CompanyMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const active = company.some((c) => pathname.startsWith(c.href));

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <li ref={ref} className="relative" onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)} onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="company-menu"
        onClick={() => setOpen((o) => !o)}
        className={cn(linkCls, "inline-flex items-center gap-1.5", (active || open) && "bg-mist")}
      >
        Company
        <svg aria-hidden="true" viewBox="0 0 16 16" className={cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")}>
          <path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        id="company-menu"
        inert={!open}
        className={cn(
          "absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3 transition-[opacity,translate] duration-200 [transition-timing-function:var(--ease-out-quart)]",
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0",
        )}
      >
        <ul className="rounded-2xl border hair bg-paper p-2 shadow-[0_12px_32px_rgb(11_21_18/0.1)]">
          {company.map((c) => (
            <li key={c.href}>
              <Link href={c.href} className="block rounded-xl px-3 py-2.5 transition-colors duration-150 hover:bg-mist">
                <span className="block text-[0.9375rem] font-medium">{c.label}</span>
                <span className="block text-sm text-slate">{c.note}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

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

  const mobileLinks = [...nav, ...company.map(({ href, label }) => ({ href, label }))];

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
                <Link href={l.href} aria-current={pathname.startsWith(l.href) ? "page" : undefined} className={cn(linkCls, pathname.startsWith(l.href) && "bg-mist")}>
                  {l.label}
                </Link>
              </li>
            ))}
            <CompanyMenu pathname={pathname} />
          </ul>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="label hidden h-11 items-center rounded-xl border hair px-3 text-slate transition-colors hover:bg-mist xl:flex"
              aria-label="Open command palette"
            >
              Ctrl K
            </button>
            <Button href="/demos" variant="ghost" className="hidden lg:inline-flex">
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
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-chalk px-4 pb-8 pt-28">
          <ul className="flex flex-1 flex-col justify-center gap-1">
            {mobileLinks.map((l, i) => (
              <li key={l.href} className="menu-item border-b hair" style={{ "--i": i } as React.CSSProperties}>
                <Link href={l.href} className="flex items-baseline gap-3 py-2.5 text-[1.5rem] font-semibold tracking-tight text-ink">
                  <span className="label text-slate">{String(i + 1).padStart(2, "0")}</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button href="/contact" className="mt-6 h-14 w-full">
            Book a call
          </Button>
        </div>
      )}
    </>
  );
}
