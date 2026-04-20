import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  alt?: boolean;
}

export function SectionWrapper({
  id,
  children,
  className,
  alt,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn("py-20 scroll-mt-20", alt && "section-alt", className)}
    >
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-14", centered && "text-center")}>
      {label && (
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-3 font-mono">
          {label}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold font-display text-foreground mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className={cn("text-lg text-muted-foreground max-w-2xl leading-relaxed", centered && "mx-auto")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
