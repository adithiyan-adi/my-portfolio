import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative w-10 h-10 rounded-full flex items-center justify-center transition-smooth neumorphic hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      data-ocid="theme-toggle"
    >
      <span className="relative w-5 h-5">
        <Sun
          className={`absolute inset-0 w-5 h-5 text-accent transition-all duration-300 ${
            isDark ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
          }`}
        />
        <Moon
          className={`absolute inset-0 w-5 h-5 text-primary transition-all duration-300 ${
            isDark ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"
          }`}
        />
      </span>
    </button>
  );
}
