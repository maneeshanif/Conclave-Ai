import { create } from "zustand";

type CursorMode = "default" | "view" | "book" | "hidden";
type DemoStatus = "idle" | "connecting" | "live" | "ended" | "error";

interface UIState {
  menuOpen: boolean;
  paletteOpen: boolean;
  cursor: CursorMode;
  demo: DemoStatus;
  setMenuOpen: (open: boolean) => void;
  setPaletteOpen: (open: boolean) => void;
  setCursor: (mode: CursorMode) => void;
  setDemo: (status: DemoStatus) => void;
}

export const useUI = create<UIState>((set) => ({
  menuOpen: false,
  paletteOpen: false,
  cursor: "default",
  demo: "idle",
  setMenuOpen: (menuOpen) => set({ menuOpen }),
  setPaletteOpen: (paletteOpen) => set({ paletteOpen }),
  setCursor: (cursor) => set({ cursor }),
  setDemo: (demo) => set({ demo }),
}));
