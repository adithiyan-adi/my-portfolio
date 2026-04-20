import { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { NeumorphicCard } from "@/components/ui/NeumorphicCard";
import { SectionHeading } from "@/components/ui/SectionWrapper";
import type { Language } from "@/types/portfolio";
import { Globe } from "lucide-react";

const LANGUAGES: Language[] = [
  {
    id: "tamil",
    name: "Tamil",
    proficiency: "Native",
    level: 5,
    maxLevel: 5,
    accent: "primary",
  },
  {
    id: "english",
    name: "English",
    proficiency: "Professional Working Proficiency",
    level: 4,
    maxLevel: 5,
    accent: "accent",
  },
];

function ProficiencyDots({
  level,
  maxLevel,
  accent,
}: {
  level: number;
  maxLevel: number;
  accent: "primary" | "accent";
}) {
  return (
    <div
      className="flex items-center gap-1.5"
      aria-label={`${level} of ${maxLevel}`}
    >
      {Array.from({ length: maxLevel }, (_, i) => i).map((i) => (
        <span
          key={i}
          className={[
            "w-3 h-3 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            i < level
              ? accent === "primary"
                ? "bg-primary shadow-[0_0_6px_var(--primary)]"
                : "bg-accent shadow-[0_0_6px_var(--accent)]"
              : "bg-muted border border-border",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

function LanguageCard({ lang }: { lang: Language }) {
  const isNative = lang.level === lang.maxLevel;

  return (
    <NeumorphicCard className="flex flex-col gap-5">
      {/* Icon + name row */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl neumorphic-inset flex items-center justify-center flex-shrink-0">
          <Globe
            className={`w-5 h-5 ${lang.accent === "primary" ? "text-primary" : "text-accent"}`}
          />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-bold font-display text-foreground leading-tight">
            {lang.name}
          </h3>
          {isNative && (
            <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-primary/70">
              Mother Tongue
            </span>
          )}
        </div>
      </div>

      {/* Proficiency dots */}
      <div className="flex items-center justify-between">
        <ProficiencyDots
          level={lang.level}
          maxLevel={lang.maxLevel}
          accent={lang.accent}
        />
        <span
          className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-full border ${
            lang.accent === "primary"
              ? "border-primary/30 bg-primary/8 text-primary"
              : "border-accent/30 bg-accent/8 text-accent"
          }`}
        >
          {lang.level}/{lang.maxLevel}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Proficiency label */}
      <p className="text-sm text-muted-foreground font-medium leading-snug">
        {lang.proficiency}
      </p>
    </NeumorphicCard>
  );
}

export function LanguagesSection() {
  return (
    <>
      <SectionHeading
        label="Communication"
        title="Languages"
        subtitle="Languages I communicate in — professionally and natively."
        centered
      />

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto gap-6">
        {LANGUAGES.map((lang) => (
          <StaggerItem key={lang.id}>
            <LanguageCard lang={lang} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </>
  );
}
