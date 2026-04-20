import { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionWrapper";
import { TiltCard } from "@/components/ui/TiltCard";

interface Milestone {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: "primary" | "accent";
  emoji: string;
}

const milestones: Milestone[] = [
  {
    number: "01",
    title: "VLSI Design",
    subtitle: "Silicon Architecture",
    description:
      "Mastering RTL-to-GDSII flows with hands-on Verilog/VHDL design, timing analysis, and physical design using industry tools. Targeting roles at top semiconductor fabs and EDA companies.",
    tags: ["RTL Design", "Tanner EDA", "Physical Design", "ASIC Flow"],
    color: "primary",
    emoji: "💎",
  },
  {
    number: "02",
    title: "Embedded AI",
    subtitle: "Intelligence at the Edge",
    description:
      "Combining embedded systems expertise with ML inference to deploy neural networks on microcontrollers and FPGAs. Building intelligent edge devices that process data locally with minimal latency.",
    tags: ["TinyML", "ESP32", "FPGA Inference", "IoT + AI"],
    color: "accent",
    emoji: "🤖",
  },
  {
    number: "03",
    title: "Industrial Automation",
    subtitle: "Smart Manufacturing",
    description:
      "Engineering intelligent manufacturing systems using PLCs, SCADA, and industrial IoT protocols. Bridging the gap between traditional automation and modern connected Industry 4.0 architectures.",
    tags: ["PLC/SCADA", "Industry 4.0", "IIoT", "Automation"],
    color: "primary",
    emoji: "⚙️",
  },
];

function MilestoneCard({
  milestone,
  index,
  isLast,
}: {
  milestone: Milestone;
  index: number;
  isLast: boolean;
}) {
  const isAccent = milestone.color === "accent";

  return (
    <div className="flex lg:flex-col lg:flex-1 flex-col items-stretch lg:items-stretch min-w-0">
      <StaggerItem className="flex-1 min-w-0">
        <TiltCard intensity={6} className="h-full">
          <GlassCard className="h-full flex flex-col gap-4 relative overflow-hidden">
            {/* Number badge */}
            <div
              className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                isAccent
                  ? "bg-accent/15 text-accent border border-accent/25"
                  : "bg-primary/15 text-primary border border-primary/25"
              }`}
            >
              {milestone.number}
            </div>

            {/* Icon */}
            <div
              className="animate-icon-float"
              style={{ animationDelay: `${index * 0.4}s` }}
              aria-hidden="true"
            >
              <span
                className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl text-2xl ${
                  isAccent
                    ? "bg-accent/10 border border-accent/20"
                    : "bg-primary/10 border border-primary/20"
                }`}
              >
                {milestone.emoji}
              </span>
            </div>

            {/* Title */}
            <div>
              <p
                className={`text-xs font-semibold tracking-widest uppercase font-mono mb-1 ${
                  isAccent ? "text-accent" : "text-primary"
                }`}
              >
                {milestone.subtitle}
              </p>
              <h3 className="text-xl font-bold font-display text-foreground">
                {milestone.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              {milestone.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/50">
              {milestone.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-medium ${
                    isAccent
                      ? "bg-accent/10 text-accent/80 border border-accent/15"
                      : "bg-primary/10 text-primary/80 border border-primary/15"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </GlassCard>
        </TiltCard>
      </StaggerItem>

      {/* Connector between cards (desktop: horizontal, mobile: vertical) */}
      {!isLast && (
        <div className="flex items-center justify-center lg:hidden py-3">
          <div className="relative h-10 w-0.5">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-accent/50 to-primary/30 rounded-full" />
            <div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-accent to-transparent rounded-full animate-connector-pulse"
              style={{ animationDuration: "2.5s" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function CareerVisionSection() {
  return (
    <div data-ocid="career-vision-section">
      <style>{`
        @keyframes connector-pulse {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 1; }
        }
        .animate-connector-pulse {
          animation: connector-pulse 2.5s ease-in-out infinite;
        }
        @keyframes icon-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .animate-icon-float {
          animation: icon-float 3s ease-in-out infinite;
        }
      `}</style>

      <SectionHeading
        label="Future Direction"
        title="Career Vision"
        subtitle="A deliberate path from silicon design to edge intelligence to smart manufacturing — building systems that define the future of technology."
        centered
      />

      {/* Desktop layout: cards + connectors in a single flex row */}
      <StaggerContainer
        className="hidden lg:flex flex-row items-stretch gap-0"
        staggerDelay={0.08}
      >
        {milestones.map((milestone, index) => (
          <div
            key={milestone.number}
            className="flex items-stretch flex-1 min-w-0"
          >
            <StaggerItem className="flex-1 min-w-0">
              <TiltCard intensity={6} className="h-full">
                <GlassCard className="h-full flex flex-col gap-4 relative overflow-hidden">
                  <div
                    className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                      milestone.color === "accent"
                        ? "bg-accent/15 text-accent border border-accent/25"
                        : "bg-primary/15 text-primary border border-primary/25"
                    }`}
                  >
                    {milestone.number}
                  </div>
                  <div
                    className="animate-icon-float"
                    style={{ animationDelay: `${index * 0.4}s` }}
                    aria-hidden="true"
                  >
                    <span
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl text-2xl ${milestone.color === "accent" ? "bg-accent/10 border border-accent/20" : "bg-primary/10 border border-primary/20"}`}
                    >
                      {milestone.emoji}
                    </span>
                  </div>
                  <div>
                    <p
                      className={`text-xs font-semibold tracking-widest uppercase font-mono mb-1 ${milestone.color === "accent" ? "text-accent" : "text-primary"}`}
                    >
                      {milestone.subtitle}
                    </p>
                    <h3 className="text-xl font-bold font-display text-foreground">
                      {milestone.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {milestone.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/50">
                    {milestone.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-medium ${milestone.color === "accent" ? "bg-accent/10 text-accent/80 border border-accent/15" : "bg-primary/10 text-primary/80 border border-primary/15"}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </TiltCard>
            </StaggerItem>
            {index < milestones.length - 1 && (
              <div className="flex items-center justify-center w-12 flex-shrink-0">
                <div className="relative w-full h-0.5">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent/50 to-primary/30 rounded-full" />
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full animate-connector-pulse"
                    style={{
                      animationDuration: "2.5s",
                      animationDelay: "0.5s",
                    }}
                  />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[7px] border-l-accent/50" />
                </div>
              </div>
            )}
          </div>
        ))}
      </StaggerContainer>

      {/* Mobile layout: stacked cards with vertical connectors */}
      <StaggerContainer
        className="flex lg:hidden flex-col gap-0"
        staggerDelay={0.08}
      >
        {milestones.map((milestone, index) => (
          <MilestoneCard
            key={milestone.number}
            milestone={milestone}
            index={index}
            isLast={index === milestones.length - 1}
          />
        ))}
      </StaggerContainer>

      {/* Phase legend */}
      <div className="mt-12 flex justify-center">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground font-mono">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-primary/60" />
            Current Phase
          </span>
          <span className="text-border hidden sm:inline">|</span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-accent/60" />
            Immediate Goal
          </span>
          <span className="text-border hidden sm:inline">|</span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-muted-foreground/40" />
            Long-term Vision
          </span>
        </div>
      </div>
    </div>
  );
}
