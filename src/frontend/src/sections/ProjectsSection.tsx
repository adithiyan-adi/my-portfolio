import { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionWrapper";
import { SkillChip } from "@/components/ui/SkillChip";
import { TiltCard } from "@/components/ui/TiltCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Project, ProjectFilter } from "@/types/portfolio";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Cpu,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Leaf,
  TrafficCone,
  X,
  ZoomIn,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface ProjectMediaItem {
  type: "image" | "pdf";
  src: string;
  label: string;
  thumb?: string; // optional dedicated thumbnail for PDFs
}

interface ProjectWithMedia extends Project {
  media?: ProjectMediaItem[];
}

const PROJECTS: ProjectWithMedia[] = [
  {
    id: "medication-robot",
    title: "Automated Medication Dispensing Robot",
    description:
      "An IoT-powered robotic system that automates medication dispensing for hospitals and elderly care facilities, ensuring precise dosage delivery with real-time cloud tracking.",
    problem:
      "Manual medication dispensing is error-prone and time-consuming, leading to missed doses and inconsistent schedules — particularly challenging for elderly patients and assisted-care settings.",
    solution:
      "Designing an ESP32-based automated medication dispensing system with time-scheduled control logic for automated dispensing sequences. The system architecture is being developed with modular firmware to support future IoT cloud integration for real-time tracking and remote scheduling by caregivers. Project is in active prototype development. Core ESP32 control logic and time-scheduling modules are being built and validated iteratively. IoT connectivity and mobile dashboard features are planned for subsequent development phases.",
    impact:
      "Aims to reduce manual medication handling, improve dispensing accuracy through scheduled automation, and enable remote caregiver monitoring — directly supporting patient safety and medication adherence in healthcare and assisted-care environments.",
    techStack: ["ESP32", "IoT", "Cloud API", "MQTT", "React Dashboard", "C++"],
    category: "iot",
    image: "/assets/generated/project-med-robot.dim_800x500.jpg",
    media: [
      {
        type: "image",
        src: "/assets/block_diagram_modibot.jpg",
        label: "Block Diagram",
      },
    ],
  },
  {
    id: "climate-detector",
    title: "AI-Based Climate Change Detector",
    description:
      "A satellite imagery analysis system that uses NDVI (Normalized Difference Vegetation Index) and machine learning to detect deforestation, land-use changes, and climate anomalies.",
    problem:
      "Traditional environmental monitoring is slow and expensive, failing to capture rapid deforestation or land degradation in real time.",
    solution:
      "Leveraged MATLAB for image processing pipelines, applying NDVI algorithms on multi-spectral satellite data to classify vegetation health, detect change over time, and generate heatmaps of affected areas.",
    impact:
      "Enables rapid environmental assessment with 85% classification accuracy, supporting NGOs and policy makers with actionable deforestation insights at scale.",
    techStack: [
      "MATLAB",
      "NDVI",
      "Satellite Imagery",
      "Image Processing",
      "ML",
    ],
    category: "ai",
    image: "/assets/generated/project-climate.dim_800x500.jpg",
    media: [
      {
        type: "pdf",
        src: "/assets/climate_change_output.pdf",
        label: "Output Report",
      },
    ],
  },
  {
    id: "traffic-controller",
    title: "Smart Traffic Light Controller",
    description:
      "An FPGA-based traffic management system using Finite State Machine (FSM) design to intelligently control multi-intersection traffic flow, implemented on Basys3 (Artix-7) hardware.",
    problem:
      "Fixed-timer traffic lights cause unnecessary congestion and inefficient flow at intersections, particularly during variable traffic density periods and emergency situations.",
    solution:
      "Implemented an adaptive traffic signal controller using FSM-based logic in Verilog HDL, incorporating density-based signal prioritization and emergency vehicle override capability. The design was synthesized and deployed on a Basys3 board (Artix-7 FPGA) using Xilinx Vivado, achieving stable 100 MHz clock operation with glitch-free signal transitions validated through on-FPGA testing across all defined traffic states.",
    impact:
      "Achieves deterministic, glitch-free timing with full hardware synthesis at 100 MHz on Artix-7 FPGA, demonstrating production-grade digital design skills directly applicable to embedded industrial control systems.",
    techStack: [
      "VHDL",
      "FSM",
      "Basys3",
      "Artix-7",
      "Xilinx Vivado",
      "ModelSim",
    ],
    category: "fpga",
    image: "/assets/generated/project-traffic.dim_800x500.jpg",
    media: [
      {
        type: "image",
        src: "/assets/block_diagram_traffic.jpg",
        label: "Block Diagram",
      },
      {
        type: "image",
        src: "/assets/simulation_traffic.png",
        label: "Simulation Output",
      },
      {
        type: "image",
        src: "/assets/basys_board_traffic.png",
        label: "Basys3 Board",
      },
    ],
  },
];

const FILTERS: { label: string; value: ProjectFilter }[] = [
  { label: "All", value: "all" },
  { label: "FPGA", value: "fpga" },
  { label: "IoT", value: "iot" },
  { label: "AI", value: "ai" },
];

const CATEGORY_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  iot: TrafficCone,
  ai: Leaf,
  fpga: Cpu,
  embedded: Cpu,
};

const CATEGORY_COLORS: Record<string, string> = {
  iot: "bg-primary/10 text-primary border-primary/20",
  ai: "bg-accent/10 text-accent border-accent/20",
  fpga: "bg-secondary text-secondary-foreground border-border",
  embedded: "bg-muted text-muted-foreground border-border",
};

// ─── Media lightbox (image only) ─────────────────────────────────────────────
function MediaLightbox({
  media,
  startIndex,
  onClose,
}: {
  media: ProjectMediaItem[];
  startIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIndex);
  const current = media[idx];

  const prev = () => setIdx((idx - 1 + media.length) % media.length);
  const next = () => setIdx((idx + 1) % media.length);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-3xl p-0 overflow-hidden bg-card border-border"
        onKeyDown={handleKey}
        data-ocid="project-media-lightbox"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-muted flex items-center justify-center"
            style={{ minHeight: "340px", maxHeight: "70vh" }}
          >
            {current.type === "image" ? (
              <img
                src={current.src}
                alt={current.label}
                className="max-w-full max-h-[65vh] object-contain"
              />
            ) : (
              <div className="flex flex-col items-center gap-4 py-16 px-8">
                <FileText className="w-16 h-16 text-primary/40" />
                <p className="text-sm text-muted-foreground font-mono text-center">
                  {current.label}
                </p>
                <a
                  href={current.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold font-mono hover:border-primary/60 hover:bg-primary/10 transition-all duration-200"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open PDF
                </a>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows — only when multiple items */}
        {media.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:bg-card transition-colors shadow-sm z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4 text-foreground" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:bg-card transition-colors shadow-sm z-10"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4 text-foreground" />
            </button>
          </>
        )}

        {/* Caption + dot indicators */}
        <div className="p-4 flex flex-col items-center gap-2">
          <p className="text-xs font-semibold text-foreground font-display">
            {current.label}
          </p>
          {media.length > 1 && (
            <div className="flex justify-center gap-1.5">
              {media.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIdx(i)}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    i === idx
                      ? "w-4 bg-primary"
                      : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  }`}
                  aria-label={`Go to ${media[i].label}`}
                />
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Media thumbnail strip ────────────────────────────────────────────────────
function ProjectMediaStrip({
  media,
  onOpen,
}: {
  media: ProjectMediaItem[];
  onOpen: (index: number) => void;
}) {
  return (
    <div className="mt-6">
      <h4 className="text-xs font-bold uppercase tracking-wider mb-3 font-mono text-muted-foreground">
        Project Media
      </h4>
      <div className="flex flex-wrap gap-3">
        {media.map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onOpen(i)}
            className="group relative flex flex-col items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
            aria-label={`View ${item.label}`}
          >
            {/* Thumbnail box */}
            <div className="relative w-24 h-16 rounded-xl overflow-hidden border border-border/50 bg-muted flex items-center justify-center transition-all duration-200 group-hover:border-primary/40 group-hover:shadow-md">
              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <FileText className="w-7 h-7 text-primary/40 group-hover:text-primary/70 transition-colors duration-200" />
              )}
              {/* Hover zoom overlay */}
              <div className="absolute inset-0 bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center backdrop-blur-[1px]">
                <div className="w-7 h-7 rounded-full bg-card/90 flex items-center justify-center shadow">
                  {item.type === "pdf" ? (
                    <ExternalLink className="w-3.5 h-3.5 text-foreground" />
                  ) : (
                    <ZoomIn className="w-3.5 h-3.5 text-foreground" />
                  )}
                </div>
              </div>
            </div>
            {/* Label + type badge */}
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-[10px] font-semibold text-foreground/80 font-mono leading-tight text-center max-w-[6rem] truncate">
                {item.label}
              </span>
              <Badge
                variant="outline"
                className={`text-[9px] font-mono px-1.5 py-0 h-4 ${
                  item.type === "pdf"
                    ? "border-accent/30 text-accent"
                    : "border-primary/30 text-primary"
                }`}
              >
                {item.type === "pdf" ? "PDF" : "IMG"}
              </Badge>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Project Modal ────────────────────────────────────────────────────────────
function ProjectModal({
  project,
  open,
  onClose,
}: {
  project: ProjectWithMedia | null;
  open: boolean;
  onClose: () => void;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!project) return null;
  const Icon = CATEGORY_ICONS[project.category] ?? Cpu;

  const handleOpenMedia = (index: number) => {
    const item = project.media?.[index];
    if (!item) return;
    // PDFs open directly in a new tab instead of lightbox
    if (item.type === "pdf") {
      window.open(item.src, "_blank", "noopener,noreferrer");
    } else {
      setLightboxIndex(index);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[project.category]}`}
              >
                <Icon className="w-3 h-3" />
                {project.category.toUpperCase()}
              </span>
            </div>
            <DialogTitle className="text-2xl font-bold font-display text-foreground leading-snug">
              {project.title}
            </DialogTitle>
          </DialogHeader>

          <p className="text-muted-foreground leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="space-y-5">
            {[
              {
                label: "Problem",
                text: project.problem,
                color: "text-destructive",
              },
              {
                label: "Solution",
                text: project.solution,
                color: "text-primary",
              },
              { label: "Impact", text: project.impact, color: "text-accent" },
            ].map(({ label, text, color }) => (
              <div key={label} className="rounded-xl p-4 neumorphic-inset">
                <h4
                  className={`text-xs font-bold uppercase tracking-wider mb-2 font-mono ${color}`}
                >
                  {label}
                </h4>
                <p className="text-sm text-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider mb-3 font-mono text-muted-foreground">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <SkillChip key={tech} label={tech} variant="primary" />
              ))}
            </div>
          </div>

          {/* Project media strip */}
          {project.media && project.media.length > 0 && (
            <ProjectMediaStrip
              media={project.media}
              onOpen={handleOpenMedia}
            />
          )}

          <button
            type="button"
            onClick={onClose}
            onKeyDown={(e) => e.key === "Enter" && onClose()}
            className="absolute top-4 right-4 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </DialogContent>
      </Dialog>

      {/* Image lightbox — separate from modal */}
      {lightboxIndex !== null && project.media && (
        <MediaLightbox
          media={project.media.filter((m) => m.type === "image")}
          startIndex={
            // map back to image-only index
            project.media
              .filter((m) => m.type === "image")
              .findIndex(
                (m) => m.src === project.media![lightboxIndex]?.src,
              ) ?? 0
          }
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  onView,
}: {
  project: ProjectWithMedia;
  onView: (p: ProjectWithMedia) => void;
}) {
  const Icon = CATEGORY_ICONS[project.category] ?? Cpu;

  return (
    <TiltCard className="h-full group cursor-pointer" intensity={6}>
      <div className="neumorphic rounded-2xl overflow-hidden h-full flex flex-col relative">
        {/* Invisible click layer for accessibility */}
        <button
          type="button"
          aria-label={`View details for ${project.title}`}
          className="absolute inset-0 z-10 opacity-0"
          onClick={() => onView(project)}
        />
        {/* Project image */}
        <div className="relative h-48 overflow-hidden bg-muted">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/assets/images/placeholder.svg";
            }}
          />
          {/* Category badge overlay */}
          <div className="absolute top-3 left-3">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border glass ${CATEGORY_COLORS[project.category]}`}
            >
              <Icon className="w-3 h-3" />
              {project.category.toUpperCase()}
            </span>
          </div>
          {/* Media count badge */}
          {project.media && project.media.length > 0 && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full border glass bg-card/60 text-foreground border-border/40">
                <ImageIcon className="w-3 h-3" />
                {project.media.length}
              </span>
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-lg font-bold font-display text-foreground mb-2 leading-snug group-hover:text-primary transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech chips */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.techStack.slice(0, 4).map((tech) => (
              <SkillChip key={tech} label={tech} variant="muted" />
            ))}
            {project.techStack.length > 4 && (
              <SkillChip
                label={`+${project.techStack.length - 4}`}
                variant="muted"
              />
            )}
          </div>

          {/* View details button — always visible, accent on hover */}
          <div className="mt-auto relative z-20">
            <Button
              variant="outline"
              size="sm"
              className="w-full group/btn border-border text-muted-foreground hover:border-accent hover:text-accent hover:bg-accent/5 transition-smooth"
              onClick={(e) => {
                e.stopPropagation();
                onView(project);
              }}
              data-ocid="project-view-details"
            >
              <span className="flex items-center gap-2">
                View Details
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
export function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [selected, setSelected] = useState<ProjectWithMedia | null>(null);

  const filtered =
    filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <>
      <SectionHeading
        label="What I've Built"
        title="Featured Projects"
        subtitle="Real-world systems spanning FPGA design, embedded IoT, and AI-powered analysis — each built to solve genuine engineering problems."
        centered
      />

      {/* Filter buttons */}
      <div
        className="flex justify-center gap-2 mb-12"
        data-ocid="project-filters"
      >
        {FILTERS.map(({ label, value }) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            onKeyDown={(e) => e.key === "Enter" && setFilter(value)}
            data-ocid={`filter-${value}`}
            className={`chip-button px-5 py-2 text-sm font-semibold transition-smooth ${
              filter === value
                ? "bg-accent text-accent-foreground shadow-md"
                : "bg-card text-muted-foreground hover:text-foreground border border-border"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Project cards grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <StaggerItem key={project.id}>
                <ProjectCard project={project} onView={setSelected} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </motion.div>
      </AnimatePresence>

      <ProjectModal
        project={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
