import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { GalleryItem } from "@/types/portfolio";
import {
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  X,
  ZoomIn,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface GalleryTile extends GalleryItem {
  gradient: string;
  span?: "tall" | "wide" | "normal";
}

const galleryItems: GalleryTile[] = [
  {
    id: "g1",
    src: "/assets/pals_jury.jpg",
    alt: "Presenting to jury at PALS INNOWHA Innovation Challenge",
    caption: "PALS INNOWHA – Jury Presentation",
    category: "event",
    gradient: "from-primary/25 to-accent/25",
    span: "tall",
  },
  {
    id: "g2",
    src: "/assets/qmos_working_1.jpg",
    alt: "FPGA development work at QMOS Technologies",
    caption: "FPGA Development at QMOS Technologies",
    category: "internship",
    gradient: "from-accent/20 to-indigo-500/20",
  },
  {
    id: "g3",
    src: "/assets/pals_finals_photo.jpg",
    alt: "PALS INNOWHA Finals 2025 stage ceremony",
    caption: "PALS INNOWHA Finals 2025",
    category: "event",
    gradient: "from-emerald-500/20 to-accent/25",
  },
  {
    id: "g4",
    src: "/assets/profile_photo_4.jpg",
    alt: "Adithiyan A – Professional Portrait",
    caption: "Professional Portrait",
    category: "portrait",
    gradient: "from-violet-500/20 to-primary/20",
    span: "tall",
  },
  {
    id: "g5",
    src: "/assets/qmos_working_2.jpg",
    alt: "Technical work session at QMOS Technologies",
    caption: "Technical Work Session",
    category: "internship",
    gradient: "from-primary/20 to-violet-500/20",
  },
  {
    id: "g6",
    src: "/assets/qmos_cert_photo.jpg",
    alt: "QMOS Technologies internship certificate ceremony",
    caption: "QMOS Internship Certificate Ceremony",
    category: "internship",
    gradient: "from-amber-500/15 to-primary/20",
  },
];

const categoryLabels: Record<string, string> = {
  event: "Event",
  project: "Project",
  internship: "Internship",
  portrait: "Portrait",
};

const categoryColors: Record<string, string> = {
  event: "bg-primary/10 text-primary border-primary/20",
  project: "bg-accent/10 text-accent border-accent/20",
  internship: "bg-muted text-muted-foreground border-border",
  portrait: "bg-muted text-muted-foreground border-border",
};

export function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(
      (selectedIndex - 1 + galleryItems.length) % galleryItems.length,
    );
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % galleryItems.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  return (
    <section>
      <AnimatedSection direction="up">
        <SectionHeading
          label="Moments"
          title="Gallery"
          subtitle="Snapshots from competitions, internships, and hardware builds that define the journey."
          centered
        />
      </AnimatedSection>

      {/* Masonry grid */}
      <StaggerContainer
        className="columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-0"
        staggerDelay={0.07}
      >
        {galleryItems.map((item, index) => (
          <StaggerItem key={item.id} className="break-inside-avoid mb-4">
            <GalleryTileCard
              item={item}
              onClick={() => setSelectedIndex(index)}
            />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Lightbox Dialog */}
      <Dialog
        open={selectedIndex !== null}
        onOpenChange={(open) => !open && setSelectedIndex(null)}
      >
        <DialogContent
          className="max-w-3xl bg-card border-border p-0 overflow-hidden"
          onKeyDown={handleKeyDown}
          data-ocid="gallery-lightbox"
        >
          {selectedIndex !== null && (
            <div className="relative">
              {/* Image area */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={`h-80 sm:h-[420px] bg-gradient-to-br ${galleryItems[selectedIndex].gradient} flex items-center justify-center relative overflow-hidden`}
                >
                  {galleryItems[selectedIndex].src ? (
                    <img
                      src={galleryItems[selectedIndex].src}
                      alt={galleryItems[selectedIndex].alt}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <>
                      <div
                        className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(0deg, transparent, transparent 28px, oklch(var(--border)) 28px, oklch(var(--border)) 29px), repeating-linear-gradient(90deg, transparent, transparent 28px, oklch(var(--border)) 28px, oklch(var(--border)) 29px)",
                        }}
                      />
                      <div className="relative flex flex-col items-center gap-3 text-center px-6">
                        <ImageIcon className="w-12 h-12 text-foreground/20" />
                        <p className="text-sm text-muted-foreground font-mono">
                          {galleryItems[selectedIndex].alt}
                        </p>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:bg-card transition-colors shadow-sm"
                aria-label="Previous image"
                data-ocid="gallery-prev"
              >
                <ChevronLeft className="w-4 h-4 text-foreground" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:bg-card transition-colors shadow-sm"
                aria-label="Next image"
                data-ocid="gallery-next"
              >
                <ChevronRight className="w-4 h-4 text-foreground" />
              </button>

              {/* Caption area */}
              <div className="p-5 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm font-display text-foreground">
                    {galleryItems[selectedIndex].caption}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {selectedIndex + 1} / {galleryItems.length}
                  </p>
                </div>
                {galleryItems[selectedIndex].category && (
                  <Badge
                    variant="outline"
                    className={`text-xs font-mono ${categoryColors[galleryItems[selectedIndex].category ?? "event"]}`}
                  >
                    {
                      categoryLabels[
                        galleryItems[selectedIndex].category ?? "event"
                      ]
                    }
                  </Badge>
                )}
              </div>

              {/* Dot indicators */}
              <div className="flex justify-center gap-1.5 pb-4">
                {galleryItems.map((item, i) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setSelectedIndex(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === selectedIndex ? "w-4 bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"}`}
                    aria-label={`Go to image ${i + 1}`}
                    data-ocid={`gallery-dot-${i}`}
                  />
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function GalleryTileCard({
  item,
  onClick,
}: {
  item: GalleryTile;
  onClick: () => void;
}) {
  const heightClass =
    item.span === "tall" ? "h-64" : item.span === "wide" ? "h-40" : "h-48";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onKeyUp={(e) => e.key === "Enter" && onClick()}
      className={`group relative w-full ${heightClass} rounded-2xl overflow-hidden bg-gradient-to-br ${item.gradient} border border-border/40 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      aria-label={item.alt}
      data-ocid={`gallery-tile-${item.id}`}
    >
      {item.src ? (
        <img
          src={item.src}
          alt={item.alt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <>
          {/* Grid texture fallback */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 20px, oklch(var(--border)) 20px, oklch(var(--border)) 21px), repeating-linear-gradient(90deg, transparent, transparent 20px, oklch(var(--border)) 20px, oklch(var(--border)) 21px)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 group-hover:opacity-0">
            <ImageIcon className="w-6 h-6 text-foreground/20" />
          </div>
        </>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
        <div className="w-10 h-10 rounded-full bg-card/90 flex items-center justify-center shadow-lg">
          <ZoomIn className="w-5 h-5 text-foreground" />
        </div>
      </div>

      {/* Caption overlay */}
      {item.caption && (
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-xs font-semibold text-white truncate">
            {item.caption}
          </p>
          {item.category && (
            <span
              className={`text-xs font-mono px-1.5 py-0.5 rounded-full ${categoryColors[item.category]} bg-card/80 inline-block mt-1`}
            >
              {categoryLabels[item.category]}
            </span>
          )}
        </div>
      )}
    </motion.button>
  );
}
