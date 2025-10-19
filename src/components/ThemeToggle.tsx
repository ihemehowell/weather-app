// src/components/ThemeToggle.tsx
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import useDarkMode from "../hooks/useDarkMode";

export default function ThemeToggle() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="relative w-14 h-8 flex items-center rounded-full bg-gray-200 dark:bg-slate-700 transition-colors duration-300"
      aria-label="Toggle dark mode"
    >
      {/* Icon track */}
      <div className="absolute inset-0 flex justify-between items-center px-2 text-yellow-400 dark:text-slate-300">
        <Sun className="w-4 h-4" />
        <Moon className="w-4 h-4" />
      </div>

      {/* Animated circle */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`absolute w-6 h-6 bg-white dark:bg-slate-900 rounded-full shadow-md ${
          isDark ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
