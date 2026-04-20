import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface NeumorphicCardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  inset?: boolean;
}

export function NeumorphicCard({
  children,
  className,
  hoverable = false,
  inset = false,
}: NeumorphicCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-smooth",
        inset ? "neumorphic-inset" : "neumorphic",
        hoverable && "hover:-translate-y-1 cursor-pointer",
        className,
      )}
    >
      {children}
    </div>
  );
}
