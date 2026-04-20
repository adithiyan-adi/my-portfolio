import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ChevronDown, Cpu, Download, Mail } from "lucide-react";
import { motion } from "motion/react";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const badges = [
  { label: "VLSI", color: "text-primary", delay: 0 },
  { label: "Embedded Systems", color: "text-accent", delay: 0.8 },
  { label: "IoT", color: "text-foreground", delay: 0.4 },
  { label: "Electronics", color: "text-primary", delay: 1.2 },
];

export function HeroSection() {
  return (
    <div
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background"
    >
      {/* Animated SVG Circuit Background */}
      <CircuitBackground />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(var(--primary) / 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 flex-1 flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left: Text */}
          <div className="order-2 lg:order-1">
            <AnimatedSection direction="left" delay={0.1}>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-accent mb-5 font-mono">
                <Cpu size={12} className="opacity-70" />
                B.Tech ECE · Hindustan University · 2023–2027
              </span>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.2}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-display leading-[1.1] mb-5">
                <span className="text-foreground">ADITHIYAN </span>
                <span className="gradient-text">A</span>
              </h1>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.3}>
              <p className="text-xl sm:text-2xl font-display font-semibold text-muted-foreground mb-3 leading-snug">
                Aspiring VLSI &amp; Embedded Systems Engineer
              </p>
              <p className="text-base text-muted-foreground mb-10 max-w-md leading-relaxed italic">
                "Designing intelligence at the hardware level"
              </p>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.45}>
              <div className="flex flex-wrap gap-3" data-ocid="hero-cta">
                <button
                  type="button"
                  onClick={() => scrollToSection("projects")}
                  className="chip-button bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 text-sm font-semibold gap-2"
                  data-ocid="hero-cta-projects"
                >
                  View Projects
                </button>
                <a
                  href="/assets/adithiyan_resume.pdf"
                  download="Adithiyan_Resume.pdf"
                  className="chip-button bg-card text-foreground border border-border px-6 py-3 text-sm font-semibold gap-2 inline-flex items-center"
                  data-ocid="hero-cta-resume"
                >
                  <Download size={14} />
                  Download Resume
                </a>
                <button
                  type="button"
                  onClick={() => scrollToSection("contact")}
                  className="chip-button bg-accent/10 text-accent border border-accent/20 px-6 py-3 text-sm font-semibold gap-2 inline-flex items-center"
                  data-ocid="hero-cta-contact"
                >
                  <Mail size={14} />
                  Contact Me
                </button>
              </div>
            </AnimatedSection>
          </div>

          {/* Right: Visual */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <AnimatedSection direction="right" delay={0.25}>
              <div className="relative flex justify-center items-center">
                {/* Photo frame */}
                <div className="relative w-72 h-80 sm:w-80 sm:h-96">
                  <div className="absolute inset-0 rounded-3xl neumorphic overflow-hidden">
                    <img
                      src="/assets/profile_photo_3.jpg"
                      alt="Adithiyan A - VLSI & Embedded Systems Engineer"
                      className="w-full h-full object-cover object-top"
                    />
                    {/* Overlay gradient */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-1/3"
                      style={{
                        background:
                          "linear-gradient(to top, oklch(var(--card) / 0.6), transparent)",
                      }}
                    />
                  </div>
                  {/* Decorative ring */}
                  <div
                    className="absolute -inset-3 rounded-3xl pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(var(--primary) / 0.15), oklch(var(--accent) / 0.15))",
                      zIndex: -1,
                    }}
                  />
                  {/* Floating badges */}
                  {badges.map((badge) => (
                    <motion.div
                      key={badge.label}
                      className="absolute glass rounded-xl px-3 py-2 shadow-sm"
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: badge.delay,
                      }}
                      style={getBadgePosition(badge.label)}
                    >
                      <span
                        className={`text-xs font-mono font-bold ${badge.color}`}
                      >
                        {badge.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-smooth"
        animate={{ y: [0, 6, 0] }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        aria-label="Scroll to about section"
        data-ocid="hero-scroll-indicator"
      >
        <span className="text-xs font-mono tracking-widest uppercase opacity-60">
          Scroll
        </span>
        <ChevronDown size={20} />
      </motion.button>
    </div>
  );
}

function getBadgePosition(label: string): React.CSSProperties {
  const positions: Record<string, React.CSSProperties> = {
    VLSI: { top: "-1rem", right: "-1.5rem" },
    "Embedded Systems": { bottom: "-1rem", left: "-1.5rem" },
    IoT: { top: "40%", right: "-2.5rem" },
    Electronics: { bottom: "25%", left: "-2rem" },
  };
  return positions[label] ?? {};
}

function CircuitBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06] dark:opacity-[0.04] z-0"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <style>{`
          @keyframes circuit-dash {
            from { stroke-dashoffset: 1000; }
            to   { stroke-dashoffset: 0; }
          }
          @keyframes circuit-pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          .circuit-line {
            stroke: currentColor;
            fill: none;
            stroke-width: 1.5;
            stroke-dasharray: 8 4;
            animation: circuit-dash 20s linear infinite;
          }
          .circuit-line-slow {
            stroke: currentColor;
            fill: none;
            stroke-width: 1;
            stroke-dasharray: 5 8;
            animation: circuit-dash 30s linear infinite reverse;
          }
          .circuit-dot {
            fill: currentColor;
            animation: circuit-pulse 3s ease-in-out infinite;
          }
        `}</style>
      </defs>
      <g className="text-primary">
        {/* Horizontal lines */}
        <path
          className="circuit-line"
          d="M0 150 H200 V80 H500 V150 H800 V220 H1200 V150 H1600"
        />
        <path
          className="circuit-line-slow"
          d="M0 320 H300 V260 H600 V320 H900 V380 H1200 V320 H1600"
        />
        <path
          className="circuit-line"
          d="M0 550 H150 V490 H400 V550 H750 V620 H1100 V550 H1600"
          style={{ animationDelay: "4s" }}
        />
        <path
          className="circuit-line-slow"
          d="M0 750 H250 V690 H550 V750 H850 V820 H1200 V750 H1600"
          style={{ animationDelay: "8s" }}
        />
        {/* Vertical connectors */}
        <path className="circuit-line" d="M200 0 V150" />
        <path
          className="circuit-line"
          d="M500 0 V80"
          style={{ animationDelay: "2s" }}
        />
        <path className="circuit-line-slow" d="M800 150 V350" />
        <path
          className="circuit-line"
          d="M1100 320 V550"
          style={{ animationDelay: "6s" }}
        />
        <path
          className="circuit-line-slow"
          d="M350 550 V800"
          style={{ animationDelay: "1s" }}
        />
        {/* Nodes */}
        <circle className="circuit-dot" cx="200" cy="150" r="3" />
        <circle
          className="circuit-dot"
          cx="500"
          cy="150"
          r="3"
          style={{ animationDelay: "1s" }}
        />
        <circle
          className="circuit-dot"
          cx="800"
          cy="220"
          r="4"
          style={{ animationDelay: "2s" }}
        />
        <circle
          className="circuit-dot"
          cx="1200"
          cy="150"
          r="3"
          style={{ animationDelay: "0.5s" }}
        />
        <circle
          className="circuit-dot"
          cx="300"
          cy="320"
          r="3"
          style={{ animationDelay: "1.5s" }}
        />
        <circle
          className="circuit-dot"
          cx="600"
          cy="320"
          r="4"
          style={{ animationDelay: "3s" }}
        />
        <circle
          className="circuit-dot"
          cx="900"
          cy="380"
          r="3"
          style={{ animationDelay: "0.8s" }}
        />
        <circle
          className="circuit-dot"
          cx="400"
          cy="550"
          r="3"
          style={{ animationDelay: "2.5s" }}
        />
        <circle
          className="circuit-dot"
          cx="750"
          cy="620"
          r="4"
          style={{ animationDelay: "1.2s" }}
        />
        <circle
          className="circuit-dot"
          cx="1100"
          cy="550"
          r="3"
          style={{ animationDelay: "3.5s" }}
        />
      </g>
    </svg>
  );
}
