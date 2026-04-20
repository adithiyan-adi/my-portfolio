import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading, SectionWrapper } from "@/components/ui/SectionWrapper";
import type { Experience } from "@/types/portfolio";
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  ExternalLink,
  MapPin,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const experiences: Experience[] = [
  {
    id: "qmos",
    company: "QMOS Technologies",
    role: "FPGA Engineer Intern",
    duration: "May 2025 – Jun 2025",
    location: "Chennai, Tamil Nadu",
    description:
      "Worked on FPGA-based digital design projects within a professional R&D workflow, gaining hands-on exposure to the complete FPGA design cycle from RTL coding to physical implementation.",
    highlights: [
      "Developed and debugged VHDL-based RTL modules for FPGA targets using Xilinx Vivado design suite",
      "Performed functional verification using ModelSim simulation — writing testbenches and analyzing waveforms",
      "Executed complete FPGA workflow: synthesis, implementation, bitstream generation, and hardware testing on FPGA boards",
      "Optimized timing constraints and resource utilization for clock-critical logic blocks",
    ],
    type: "internship",
  },
  {
    id: "nsic",
    company: "NSIC Technical Services Centre",
    role: "Embedded Systems Intern",
    duration: "Jun 2024 – Jul 2024",
    location: "Chennai, Tamil Nadu",
    description:
      "Gained foundational industry exposure to embedded systems and industrial electronics within a government technical center environment, focusing on core design and prototyping practices.",
    highlights: [
      "Studied industrial electronics principles including component identification, circuit behaviour, and PCB layout fundamentals from an application-oriented perspective",
      "Implemented basic microcontroller control logic using Arduino through guided exercises, developing understanding of I/O programming and embedded system operation",
      "Designed and validated basic electronic circuits using Proteus simulation tools, practising schematic design and PCB layout workflows",
      "Developed familiarity with structured prototyping documentation practices followed in industrial electronics design environments",
    ],
    type: "internship",
  },
];

const companyColors: Record<string, string> = {
  qmos: "text-primary",
  nsic: "text-accent",
};

const companyBg: Record<string, string> = {
  qmos: "bg-primary/10",
  nsic: "bg-accent/10",
};

interface MediaItem {
  src: string;
  caption: string;
}

const qmosMedia: MediaItem[] = [
  {
    src: "/assets/qmos_working_1.jpg",
    caption: "Working at QMOS Technologies",
  },
  { src: "/assets/qmos_working_2.jpg", caption: "FPGA Development Work" },
  {
    src: "/assets/qmos_cert_photo.jpg",
    caption: "Internship Certificate Ceremony",
  },
];

function PhotoLightbox({
  src,
  caption,
  onClose,
}: { src: string; caption: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/70 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-3xl w-full bg-card rounded-2xl overflow-hidden shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={src}
            alt={caption}
            className="w-full max-h-[70vh] object-contain"
          />
          <div className="p-4 flex items-center justify-between">
            <p className="text-sm text-foreground font-medium">{caption}</p>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function QmosMediaGallery() {
  const [lightbox, setLightbox] = useState<MediaItem | null>(null);

  return (
    <div className="mt-5 pt-4 border-t border-border space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
          Internship Gallery
        </p>
        <a
          href="/assets/qmos_cert.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
          data-ocid="qmos-cert-link"
        >
          <ExternalLink className="w-3 h-3" />
          View Certificate
        </a>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {qmosMedia.map((photo) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setLightbox(photo)}
            className="group relative rounded-xl overflow-hidden aspect-video cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={photo.caption}
            data-ocid={`qmos-photo-${photo.src.split("/").pop()}`}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-all duration-300 flex items-end p-2">
              <p className="text-white text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-tight">
                {photo.caption}
              </p>
            </div>
          </button>
        ))}
      </div>
      {lightbox && (
        <PhotoLightbox
          src={lightbox.src}
          caption={lightbox.caption}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}

const nsicMedia: MediaItem[] = [
  {
    src: "/assets/nsic_internship_working.jpg",
    caption: "Working at NSIC Technical Services Centre",
  },
  {
    src: "/assets/nsic_cert.jpg",
    caption:
      "NSIC – National Small Industries Corporation · Internship Certificate",
  },
];

function NsicMediaSection() {
  const [lightbox, setLightbox] = useState<MediaItem | null>(null);

  return (
    <div className="mt-5 pt-4 border-t border-border space-y-3">
      <p className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
        Internship Gallery
      </p>
      <div className="grid grid-cols-2 gap-2">
        {nsicMedia.map((photo) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setLightbox(photo)}
            className="group relative rounded-xl overflow-hidden aspect-video cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={photo.caption}
            data-ocid={`nsic-photo-${photo.src.split("/").pop()}`}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-all duration-300 flex items-end p-2">
              <p className="text-white text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-tight">
                {photo.caption}
              </p>
            </div>
          </button>
        ))}
      </div>
      {lightbox && (
        <PhotoLightbox
          src={lightbox.src}
          caption={lightbox.caption}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}

export function ExperienceSection() {
  return (
    <SectionWrapper id="experience">
      <SectionHeading
        label="Experience"
        title="Where Theory Meets Real Hardware"
        subtitle="Hands-on internships that shaped my understanding of professional FPGA and embedded systems engineering."
        centered
      />

      {/* Timeline container */}
      <div className="relative mt-16">
        {/* Center connector line (desktop) */}
        <div
          className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
          style={{
            background:
              "linear-gradient(to bottom, transparent, oklch(var(--primary) / 0.4), oklch(var(--accent) / 0.4), transparent)",
          }}
        />

        <div className="space-y-12 lg:space-y-24">
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            return (
              <TimelineItem
                key={exp.id}
                exp={exp}
                index={index}
                isLeft={isLeft}
                colorClass={companyColors[exp.id] ?? "text-primary"}
                bgClass={companyBg[exp.id] ?? "bg-primary/10"}
              />
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}

interface TimelineItemProps {
  exp: Experience;
  index: number;
  isLeft: boolean;
  colorClass: string;
  bgClass: string;
}

function TimelineItem({
  exp,
  index,
  isLeft,
  colorClass,
  bgClass,
}: TimelineItemProps) {

  // The main experience card
  const Card = (
    <AnimatedSection
      direction={isLeft ? "left" : "right"}
      delay={index * 0.15}
    >
      <GlassCard className="relative overflow-visible">
        {/* Company logo placeholder */}
        <div className="flex items-start gap-4 mb-5">
          <div
            className={`flex-shrink-0 w-12 h-12 rounded-2xl ${bgClass} flex items-center justify-center neumorphic`}
          >
            <Briefcase size={20} className={colorClass} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold font-display text-foreground leading-tight">
              {exp.role}
            </h3>
            <p className={`text-sm font-semibold ${colorClass} mt-0.5`}>
              {exp.company}
            </p>
          </div>
        </div>

        {/* Meta (mobile only) */}
        <div className="lg:hidden flex flex-wrap gap-4 mb-5">
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
            <Calendar size={11} />
            {exp.duration}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
            <MapPin size={11} />
            {exp.location}
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          {exp.description}
        </p>

        {/* Highlights */}
        <ul className="space-y-2.5">
          {exp.highlights.map((point) => (
            <li
              key={point}
              className="flex items-start gap-2.5 text-sm text-foreground/80"
            >
              <CheckCircle2
                size={14}
                className={`flex-shrink-0 mt-0.5 ${colorClass}`}
              />
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>

        {/* Type badge */}
        <div className="mt-5 pt-4 border-t border-border">
          <span
            className={`text-xs font-mono font-semibold uppercase tracking-wider ${colorClass} rounded-full px-3 py-1 bg-current/10`}
          >
            {exp.type}
          </span>
        </div>

        {/* Media Gallery per company */}
        {exp.id === "qmos" && <QmosMediaGallery />}
        {exp.id === "nsic" && <NsicMediaSection />}
      </GlassCard>
    </AnimatedSection>
  );

  // The decorative opposite side to fill empty space
  const Opposite = (
    <AnimatedSection
      direction={isLeft ? "right" : "left"}
      delay={index * 0.15 + 0.1}
      className={`hidden lg:flex flex-col pt-10 ${
        isLeft ? "items-start pl-12" : "items-end pr-12 text-right"
      }`}
    >
      <div
        className={`text-sm font-mono font-bold tracking-widest uppercase mb-3 ${colorClass}`}
      >
        {exp.duration}
      </div>
      <div className="text-3xl font-bold font-display text-foreground mb-2 leading-tight">
        {exp.company}
      </div>
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-mono">
        <MapPin size={14} />
        {exp.location}
      </div>
      
      {/* Decorative large icon */}
      <div className="mt-8 opacity-[0.03] pointer-events-none">
        <Briefcase size={120} />
      </div>
    </AnimatedSection>
  );

  return (
    <div className="relative">
      
      {/* Desktop Layout: 3 columns */}
      <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] gap-0 w-full items-start">
        
        {/* Left Side */}
        <div className="w-full">
          {isLeft ? Card : Opposite}
        </div>

        {/* Center Center Dot (The w-px line goes right through the middle of this w-12 column) */}
        <div className="relative flex justify-center w-16 pt-10">
          <motion.div
            className="relative z-10"
            whileInView={{ scale: [0, 1.2, 1] }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.15 + 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div
              className={`w-6 h-6 rounded-full ${bgClass} border-2 flex items-center justify-center`}
              style={{
                borderColor: colorClass.includes("primary")
                  ? "oklch(var(--primary))"
                  : "oklch(var(--accent))",
              }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: colorClass.includes("primary")
                    ? "oklch(var(--primary))"
                    : "oklch(var(--accent))",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Right Side */}
        <div className="w-full">
          {!isLeft ? Card : Opposite}
        </div>

      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {Card}
      </div>

    </div>
  );
}
