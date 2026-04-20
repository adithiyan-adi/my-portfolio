import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionWrapper";
import { TiltCard } from "@/components/ui/TiltCard";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Award,
  Calendar,
  ChevronRight,
  ExternalLink,
  Lightbulb,
  MapPin,
  Star,
  Trophy,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const achievement = {
  id: "pals-innowha",
  title: "Finalist – PALS INNOWHA Innovation Challenge",
  organization: "IIT Madras",
  year: "2025",
  badge: "National Finalist",
  description:
    "Selected as a national finalist among hundreds of student innovators at IIT Madras's prestigious PALS INNOWHA Innovation Challenge 2025. We built a smart parking space rental platform that connects parking space owners with drivers — monitored and managed entirely in real-time using cameras and embedded systems.",
  solution:
    "Proposed an IoT-based Smart Parking Management System designed to address urban parking inefficiency through real-time occupancy tracking and dynamic pricing. The solution integrates embedded sensor nodes for live parking slot detection, a mobile application for users to view availability and book slots in real time, and cloud-based dynamic pricing logic that adjusts rates based on demand and occupancy data.",
  context:
    "PALS INNOWHA is IIT Madras's flagship innovation challenge where teams pitch solutions to urban infrastructure and sustainability problems. Finalists present before a panel of industry veterans, faculty, and investors. Our project addressed the growing urban problem of inefficient parking by combining a rental marketplace with IoT-driven real-time slot monitoring.",
  highlights: [
    "Real-time parking occupancy detection using embedded sensor nodes",
    "Mobile application interface for slot availability, booking, and navigation",
    "Cloud-integrated dynamic pricing based on real-time demand data",
    "Scalable smart city deployment model presented to IIT Madras faculty and industry panel",
    "Recognized for technical innovation, feasibility, and real-world deployment potential",
  ],
};

interface CertPhoto {
  src: string;
  title: string;
}

const certPhotos: CertPhoto[] = [
  {
    src: "/assets/pals_finals_cert.jpeg",
    title: "Certificate of Appreciation – PALS innoWAH! Finals 2024-25",
  },
  {
    src: "/assets/pals_prefinals_cert.jpeg",
    title: "Certificate of Participation – PALS innoWAH! Pre-Finals",
  },
];

function CertLightbox({
  src,
  title,
  onClose,
}: { src: string; title: string; onClose: () => void }) {
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
          className="relative max-w-2xl w-full bg-card rounded-2xl overflow-hidden shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={src}
            alt={title}
            className="w-full max-h-[70vh] object-contain"
          />
          <div className="p-4 flex items-center justify-between gap-3">
            <p className="text-sm text-foreground font-medium flex-1">
              {title}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
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

export function AchievementsSection() {
  const [open, setOpen] = useState(false);
  const [lightbox, setLightbox] = useState<CertPhoto | null>(null);

  return (
    <section>
      <AnimatedSection direction="up">
        <SectionHeading
          label="Recognition"
          title="Achievements"
          subtitle="Competing at the national stage with engineering solutions that matter."
        />
      </AnimatedSection>

      <div className="flex justify-center">
        <TiltCard intensity={6} className="w-full max-w-2xl">
          <AnimatedSection direction="up" delay={0.15}>
            <GlassCard className="relative overflow-hidden cursor-pointer group">
              {/* Background gradient accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10 pointer-events-none rounded-2xl" />

              {/* Top row */}
              <div className="flex items-start gap-5 mb-5">
                {/* Trophy with animated glow */}
                <div className="relative flex-shrink-0">
                  <motion.div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20"
                    animate={{
                      boxShadow: [
                        "0 0 0px oklch(var(--primary)/0.3)",
                        "0 0 20px oklch(var(--primary)/0.5)",
                        "0 0 0px oklch(var(--primary)/0.3)",
                      ],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <Trophy className="w-8 h-8 text-primary" />
                  </motion.div>
                  {/* Animated star badge */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <Star className="w-3 h-3 text-accent-foreground fill-current" />
                  </motion.div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <Badge
                      variant="secondary"
                      className="text-xs font-mono font-semibold bg-primary/10 text-primary border-primary/20"
                    >
                      {achievement.badge}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold font-display text-foreground leading-tight mb-1">
                    {achievement.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-accent" />
                      {achievement.organization}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      {achievement.year}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {achievement.description}
              </p>

              {/* Real event photos */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="relative rounded-xl overflow-hidden aspect-video">
                  <img
                    src="/assets/pals_jury.jpg"
                    alt="Presenting to Jury at PALS INNOWHA"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/50 to-transparent p-2">
                    <p className="text-white text-[10px] font-medium leading-tight">
                      Presenting to Jury at PALS INNOWHA
                    </p>
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden aspect-video">
                  <img
                    src="/assets/pals_finals_photo.jpg"
                    alt="PALS INNOWHA Finals 2025 – Stage Ceremony"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/50 to-transparent p-2">
                    <p className="text-white text-[10px] font-medium leading-tight">
                      PALS INNOWHA Finals 2025 – Stage Ceremony
                    </p>
                  </div>
                </div>
              </div>

              {/* Highlights chips */}
              <div className="flex flex-wrap gap-2 mb-5">
                {achievement.highlights.slice(0, 3).map((h) => (
                  <span
                    key={h}
                    className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border/60 font-mono"
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-accent transition-colors duration-200"
                data-ocid="achievement-detail-btn"
              >
                View Full Details
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </GlassCard>
          </AnimatedSection>
        </TiltCard>
      </div>

      {/* Certificates Grid */}
      <AnimatedSection direction="up" delay={0.25}>
        <div className="mt-8 max-w-2xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground text-center mb-4">
            Certificates
          </p>
          <div className="grid grid-cols-2 gap-4">
            {certPhotos.map((cert) => (
              <button
                key={cert.src}
                type="button"
                onClick={() => setLightbox(cert)}
                className="group relative rounded-xl overflow-hidden border border-border/60 hover:border-primary/40 transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                aria-label={cert.title}
                data-ocid={`cert-${cert.src.split("/").pop()}`}
              >
                <img
                  src={cert.src}
                  alt={cert.title}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/15 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-foreground/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    View Certificate
                  </span>
                </div>
                <div className="p-2 bg-card border-t border-border/40">
                  <p className="text-[10px] text-muted-foreground font-mono leading-tight line-clamp-2">
                    {cert.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Detail Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
          data-ocid="achievement-modal"
        >
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20">
                <Trophy className="w-5 h-5 text-primary" />
              </div>
              <DialogTitle className="font-display text-xl leading-tight">
                {achievement.title}
              </DialogTitle>
            </div>
            <div className="flex flex-wrap gap-2 mt-1">
              <Badge
                variant="secondary"
                className="text-xs font-mono bg-primary/10 text-primary border-primary/20"
              >
                {achievement.badge}
              </Badge>
              <Badge variant="outline" className="text-xs font-mono">
                {achievement.organization} · {achievement.year}
              </Badge>
            </div>
          </DialogHeader>

          {/* Event photos in modal */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="rounded-2xl overflow-hidden aspect-video">
              <img
                src="/assets/pals_jury.jpg"
                alt="Presenting to jury at PALS INNOWHA"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-video">
              <img
                src="/assets/pals_finals_photo.jpg"
                alt="PALS INNOWHA Finals Stage Ceremony"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-5">
            {/* Event Context */}
            <div>
              <h4 className="text-sm font-semibold font-display text-foreground mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" /> About the Event
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {achievement.context}
              </p>
            </div>

            {/* Solution */}
            <div>
              <h4 className="text-sm font-semibold font-display text-foreground mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-primary" /> Solution
                Presented
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {achievement.solution}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h4 className="text-sm font-semibold font-display text-foreground mb-3 flex items-center gap-2">
                <Star className="w-4 h-4 text-accent fill-accent/40" /> Key
                Highlights
              </h4>
              <ul className="space-y-2">
                {achievement.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Certificates links */}
            <div>
              <h4 className="text-sm font-semibold font-display text-foreground mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" /> Certificates
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {certPhotos.map((cert) => (
                  <a
                    key={cert.src}
                    href={cert.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 p-2.5 rounded-lg border border-border hover:border-primary/40 transition-all text-sm text-muted-foreground hover:text-primary"
                    data-ocid={`cert-link-${cert.src.split("/").pop()}`}
                  >
                    <Award className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs leading-tight line-clamp-2 flex-1">
                      {cert.title}
                    </span>
                    <ExternalLink className="w-3 h-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Certificate Lightbox */}
      {lightbox && (
        <CertLightbox
          src={lightbox.src}
          title={lightbox.title}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
}
