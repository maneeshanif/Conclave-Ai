"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { allRoutes } from "@/lib/site";
import { useUI } from "@/stores/ui";

const item =
  "flex h-11 cursor-pointer items-center rounded-lg px-3 text-sm data-[selected=true]:bg-mist";

export function CommandPalette() {
  const router = useRouter();
  const { paletteOpen, setPaletteOpen } = useUI();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(!useUI.getState().paletteOpen);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setPaletteOpen]);

  const go = (href: string) => {
    setPaletteOpen(false);
    router.push(href);
  };

  return (
    <Command.Dialog
      open={paletteOpen}
      onOpenChange={setPaletteOpen}
      label="Jump to a page"
      className="fixed left-1/2 top-[20%] z-[60] w-[min(92vw,520px)] -translate-x-1/2 overflow-hidden rounded-2xl border hair bg-paper text-ink"
    >
      <Command.Input
        placeholder="Jump to a page"
        className="h-14 w-full border-b hair bg-transparent px-4 text-base outline-none placeholder:text-slate"
      />
      <Command.List className="max-h-72 overflow-auto p-2">
        <Command.Empty className="px-3 py-6 text-center text-sm text-slate">No match.</Command.Empty>
        {allRoutes.map((r) => (
          <Command.Item key={r.href} value={r.label} onSelect={() => go(r.href)} className={item}>
            {r.label}
            <span className="label ml-auto text-slate">{r.href}</span>
          </Command.Item>
        ))}
        <Command.Item value="Book a call" onSelect={() => go("/contact")} className={item}>
          Book a call
        </Command.Item>
      </Command.List>
    </Command.Dialog>
  );
}
