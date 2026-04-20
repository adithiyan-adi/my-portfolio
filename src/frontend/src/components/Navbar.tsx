import { cn } from "@/lib/utils";
import { Cpu, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ui/ThemeToggle";

const NAV_LINKS = [
  { label: "About", href: "about" },
  { label: "Experience", href: "experience" },
  { label: "Projects", href: "projects" },
  { label: "Skills", href: "skills" },
  { label: "Languages", href: "languages" },
  { label: "Achievements", href: "achievements" },
  { label: "Contact", href: "contact" },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const sections = NAV_LINKS.map((l) => l.href);
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-smooth",
        isScrolled
          ? "glass shadow-glass border-b border-border/40"
          : "bg-transparent",
      )}
      style={{
        transition:
          "background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease",
      }}
      data-ocid="nav"
    >
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center transition-smooth group-hover:bg-primary/20">
              <Cpu className="w-4 h-4 text-primary" />
            </div>
            <span className="font-display font-bold text-lg gradient-text">
              Adithiyan A
            </span>
          </button>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => scrollToSection(link.href)}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-lg transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    activeSection === link.href
                      ? "text-primary bg-primary/8"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                  )}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center neumorphic transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
              data-ocid="mobile-menu-trigger"
            >
              {isMobileOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div
          className="md:hidden glass border-t border-border/40 animate-slide-up"
          data-ocid="mobile-menu"
        >
          <ul className="container px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => {
                    scrollToSection(link.href);
                    setIsMobileOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-smooth hover:bg-muted/60 text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
