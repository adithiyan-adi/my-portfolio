import { cn } from "@/lib/utils";

interface SkillChipProps {
  label: string;
  level?: number;
  variant?: "default" | "accent" | "primary" | "muted";
  className?: string;
}

export function SkillChip({
  label,
  level,
  variant = "default",
  className,
}: SkillChipProps) {
  const variantClasses = {
    default: "bg-card text-foreground",
    accent: "bg-accent/10 text-accent border border-accent/20",
    primary: "bg-primary/10 text-primary border border-primary/20",
    muted: "bg-muted text-muted-foreground",
  };

  return (
    <span
      className={cn(
        "chip-button text-xs font-medium gap-1",
        variantClasses[variant],
        className,
      )}
    >
      {label}
      {level !== undefined && (
        <span className="ml-1 opacity-60 text-[10px] font-mono">{level}%</span>
      )}
    </span>
  );
}
