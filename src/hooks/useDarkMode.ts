// src/hooks/useDarkMode.ts
import { useEffect, useState, useCallback } from "react";

const LOCAL_STORAGE_KEY = "theme-preference";

export default function useDarkMode() {
  // Initialize dark mode by checking saved preference or system setting
  const [isDark, setIsDark] = useState<boolean>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored === "dark") return true;
    if (stored === "light") return false;
    // fallback: match system
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Synchronize the class on <html> and store preference
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
      localStorage.setItem(LOCAL_STORAGE_KEY, "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem(LOCAL_STORAGE_KEY, "light");
    }
  }, [isDark]);

  // Toggle function
  const toggleDarkMode = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  return { isDark, toggleDarkMode };
}
