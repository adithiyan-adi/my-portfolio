import { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { NeumorphicCard } from "@/components/ui/NeumorphicCard";
import { SectionHeading } from "@/components/ui/SectionWrapper";
import { SkillChip } from "@/components/ui/SkillChip";
import type { Skill, SkillGroup } from "@/types/portfolio";
import { CircuitBoard, Code2, Cpu, ExternalLink, Wrench } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "VLSI / FPGA",
    icon: "cpu",
    skills: [
      { name: "Verilog", level: 85 },
      { name: "VHDL", level: 80 },
      { name: "Xilinx Vivado", level: 75 },
      { name: "Tanner EDA", level: 65 },
    ],
  },
  {
    category: "Embedded Systems",
    icon: "circuit",
    skills: [
      { name: "ESP32", level: 85 },
      { name: "IoT Systems", level: 75 },
      { name: "Arduino", level: 60 },
    ],
  },
  {
    category: "Programming",
    icon: "code",
    skills: [
      { name: "MATLAB", level: 80 },
      { name: "C / C++", level: 75 },
    ],
  },
  {
    category: "Tools & Design",
    icon: "tools",
    skills: [
      { name: "Proteus", level: 80 },
      { name: "PCB Design", level: 75 },
      { name: "ModelSim", level: 85 },
    ],
  },
];

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  cpu: Cpu,
  circuit: CircuitBoard,
  code: Code2,
  tools: Wrench,
};

const GROUP_ACCENT: Record<number, string> = {
  0: "text-primary",
  1: "text-accent",
  2: "text-primary",
  3: "text-accent",
};

const BAR_COLOR: Record<number, string> = {
  0: "from-primary to-primary/70",
  1: "from-accent to-accent/70",
  2: "from-primary to-primary/70",
  3: "from-accent to-accent/70",
};

function SkillBar({
  skill,
  colorClass,
  delay,
}: {
  skill: Skill;
  colorClass: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <div ref={ref} className="mb-4 last:mb-0">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-foreground">
          {skill.name}
        </span>
        <span className="text-xs font-mono font-semibold text-muted-foreground">
          {skill.level}%
        </span>
      </div>
      <div className="h-2 rounded-full neumorphic-inset overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${colorClass}`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{
            duration: 1,
            delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
    </div>
  );
}

function SkillGroupCard({
  group,
  index,
}: {
  group: SkillGroup;
  index: number;
}) {
  const Icon = ICON_MAP[group.icon] ?? Cpu;
  const accentColor = GROUP_ACCENT[index] ?? "text-primary";
  const barColor = BAR_COLOR[index] ?? "from-primary to-primary/70";

  return (
    <NeumorphicCard className="h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl neumorphic-inset flex items-center justify-center flex-shrink-0">
          <Icon className={`w-5 h-5 ${accentColor}`} />
        </div>
        <h3 className="text-base font-bold font-display text-foreground">
          {group.category}
        </h3>
      </div>

      {/* Skill bars */}
      <div className="mb-6">
        {group.skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            skill={skill}
            colorClass={barColor}
            delay={0.1 + i * 0.12}
          />
        ))}
      </div>

      {/* Chip tags */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
        {group.skills.map((skill) => (
          <SkillChip
            key={skill.name}
            label={skill.name}
            variant={index % 2 === 0 ? "primary" : "accent"}
          />
        ))}
      </div>
    </NeumorphicCard>
  );
}

export function SkillsSection() {
  return (
    <>
      <SectionHeading
        label="Capabilities"
        title="Skills & Expertise"
        subtitle="A hardware-first skill set spanning FPGA synthesis, embedded firmware, scientific computing, and professional EDA tooling."
        centered
      />

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {SKILL_GROUPS.map((group, index) => (
          <StaggerItem key={group.category}>
            <SkillGroupCard group={group} index={index} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Summary chip cloud */}
      <div className="mt-12 text-center" data-ocid="skills-chip-cloud">
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
          All Technologies
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {SKILL_GROUPS.flatMap((g) => g.skills).map((skill) => (
            <SkillChip key={skill.name} label={skill.name} variant="muted" />
          ))}
        </div>
      </div>

      {/* Credentials */}
      <div className="mt-10 text-center" data-ocid="skills-credentials">
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
          Credentials
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="/assets/matlab_cert.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold font-mono hover:border-primary/60 hover:bg-primary/10 transition-all duration-200 group"
            data-ocid="credential-matlab"
          >
            <span>MathWorks MATLAB Onramp</span>
            <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </>
  );
}
