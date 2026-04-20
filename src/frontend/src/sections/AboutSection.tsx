import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import { NeumorphicCard } from "@/components/ui/NeumorphicCard";
import { SectionHeading, SectionWrapper } from "@/components/ui/SectionWrapper";
import { Cpu, Factory, GraduationCap, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const stats = [
  { label: "CGPA", value: 8.71, suffix: "", decimals: 2 },
  { label: "Internships", value: 2, suffix: "+", decimals: 0 },
  { label: "Projects", value: 6, suffix: "+", decimals: 0 },
  { label: "Years Ahead", value: 3, suffix: "yr", decimals: 0 },
];

const specializations = [
  {
    icon: Cpu,
    title: "VLSI & FPGA Design",
    description:
      "RTL design with Verilog/VHDL, logic synthesis and simulation using Xilinx Vivado and ModelSim.",
  },
  {
    icon: Zap,
    title: "Embedded Systems",
    description:
      "Firmware development on Arduino and ESP32 platforms — from bare-metal to IoT-connected prototypes.",
  },
  {
    icon: Factory,
    title: "Industrial Automation",
    description:
      "PCB design, sensor integration, and IoT-based monitoring systems for real-world industrial environments.",
  },
];

function AnimatedCounter({
  target,
  decimals,
  suffix,
  duration = 1.2,
}: {
  target: number;
  decimals: number;
  suffix: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = (now - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - (1 - progress) ** 3;
            setCount(eased * target);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
}

export function AboutSection() {
  return (
    <SectionWrapper id="about" alt>
      <SectionHeading
        label="About Me"
        title="Engineering at the Intersection of Silicon & Software"
        subtitle="A hardware engineer who thinks in systems — from gate-level logic to cloud-connected devices."
      />

      <div className="grid lg:grid-cols-2 gap-14 items-start">
        {/* Left: Image */}
        <AnimatedSection direction="left">
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative w-72 sm:w-80">
              {/* Neumorphic frame */}
              <div className="neumorphic rounded-3xl overflow-hidden aspect-[4/5]">
                <img
                  src="/assets/profile_photo_2.jpg"
                  alt="Adithiyan A"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Floating credential badge */}
              <motion.div
                className="absolute -bottom-5 -right-5 glass rounded-2xl px-4 py-3 shadow-sm"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center gap-2">
                  <GraduationCap size={16} className="text-primary" />
                  <div>
                    <p className="text-xs font-bold text-foreground font-display leading-none mb-0.5">
                      Hindustan University
                    </p>
                    <p className="text-[10px] text-muted-foreground font-mono">
                      B.Tech ECE · 2023–2027
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Right: Text */}
        <AnimatedSection direction="right" delay={0.15}>
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-base text-muted-foreground leading-relaxed">
                I'm{" "}
                <strong className="text-foreground font-semibold">
                  Adithiyan A
                </strong>
                , an Electronics &amp; Communication Engineering student at
                Hindustan University (CGPA:{" "}
                <strong className="text-primary">8.71</strong>), deeply
                passionate about building real hardware systems that operate at
                the boundary of physics and computation.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                My focus spans{" "}
                <strong className="text-foreground font-semibold">
                  VLSI design, FPGA implementation, and embedded systems
                </strong>{" "}
                — designing everything from FSM-based traffic controllers in
                Verilog to ESP32-powered IoT healthcare devices. I believe every
                great product starts with mastering the hardware it runs on.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                With hands-on internship experience at QMOS Technologies and
                NSIC, I've moved beyond textbooks into real FPGA workflows, PCB
                fabrication, and industrial IoT deployments — bridging the gap
                between academic knowledge and production-ready hardware
                engineering.
              </p>
            </div>

            {/* Specialization chips */}
            <StaggerContainer className="grid gap-3" staggerDelay={0.12}>
              {specializations.map((spec) => (
                <StaggerItem key={spec.title}>
                  <NeumorphicCard
                    className="p-4 flex items-start gap-4"
                    hoverable
                  >
                    <div className="flex-shrink-0 w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
                      <spec.icon size={18} className="text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold font-display text-foreground mb-1">
                        {spec.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {spec.description}
                      </p>
                    </div>
                  </NeumorphicCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </AnimatedSection>
      </div>

      {/* Stats Row */}
      <AnimatedSection direction="up" delay={0.2}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14">
          {stats.map((stat) => (
            <NeumorphicCard key={stat.label} className="text-center py-6 px-4">
              <div className="text-3xl font-bold font-display gradient-text mb-1">
                <AnimatedCounter
                  target={stat.value}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </NeumorphicCard>
          ))}
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
