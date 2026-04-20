import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-6 shadow-glass transition-smooth",
        className,
      )}
    >
      {children}
    </div>
  );
}
