"use client";
import { useGlobalState } from "one-global-state";

const MENU_STATE_KEY = "hamburgerMenuOpen";

export function useHamburgerMenu() {
  const [open, setOpen] = useGlobalState(
    MENU_STATE_KEY,
    localStorage.getItem(MENU_STATE_KEY) === "true",
  );

  return {
    open,
    toggle: () => {
      setOpen((state) => !state);
      localStorage.setItem(MENU_STATE_KEY, String(!open));
    },
  };
}
