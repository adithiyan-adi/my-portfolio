import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import { NeumorphicCard } from "@/components/ui/NeumorphicCard";
import { SectionHeading } from "@/components/ui/SectionWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Certificate } from "@/types/portfolio";
import { Award, Building, Calendar, ExternalLink, Eye, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface CertificateCardData extends Certificate {
  accentFrom: string;
  accentTo: string;
  orgColor: string;
}

const certificates: CertificateCardData[] = [
  {
    id: "vlsi-coursera",
    title: "VLSI Design Fundamentals",
    issuer: "Coursera",
    date: "Oct 2024",
    accentFrom: "from-primary/20",
    accentTo: "to-primary/5",
    orgColor: "text-primary",
  },
  {
    id: "fpga-xilinx",
    title: "FPGA Programming with Vivado",
    issuer: "Xilinx / AMD",
    date: "Dec 2024",
    accentFrom: "from-accent/20",
    accentTo: "to-accent/5",
    orgColor: "text-accent",
  },
  {
    id: "embedded-nptel",
    title: "Embedded Systems Essentials",
    issuer: "NPTEL",
    date: "Jan 2025",
    accentFrom: "from-accent/15",
    accentTo: "to-primary/10",
    orgColor: "text-accent",
  },
  {
    id: "iot-udemy",
    title: "IoT with ESP32 & Arduino",
    issuer: "Udemy",
    date: "Mar 2025",
    accentFrom: "from-primary/15",
    accentTo: "to-accent/15",
    orgColor: "text-primary",
  },
  {
    id: "matlab-mathworks",
    title: "MATLAB Onramp",
    issuer: "MathWorks",
    date: "2024",
    credentialUrl: "/assets/matlab_cert.pdf",
    accentFrom: "from-accent/20",
    accentTo: "to-primary/10",
    orgColor: "text-accent",
  },
];

function CertificateCard({
  cert,
  onView,
}: {
  cert: CertificateCardData;
  onView: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <NeumorphicCard
      hoverable
      className="group relative p-0 overflow-hidden cursor-pointer"
    >
      {/* Thumbnail placeholder */}
      <div
        className={`relative h-40 bg-gradient-to-br ${cert.accentFrom} ${cert.accentTo} border-b border-border/50 flex items-center justify-center overflow-hidden`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Grid overlay texture */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 18px, oklch(var(--border)) 18px, oklch(var(--border)) 19px), repeating-linear-gradient(90deg, transparent, transparent 18px, oklch(var(--border)) 18px, oklch(var(--border)) 19px)",
          }}
        />

        {/* Certificate icon */}
        <motion.div
          animate={{ scale: hovered ? 0.8 : 1, opacity: hovered ? 0.3 : 1 }}
          transition={{ duration: 0.2 }}
          className="relative flex flex-col items-center gap-2"
        >
          <Award className="w-10 h-10 text-primary/50" />
          <span className="text-xs font-mono text-muted-foreground">
            Certificate
          </span>
        </motion.div>

        {/* View overlay */}
        <motion.button
          type="button"
          onClick={onView}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.85 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex flex-col items-center justify-center bg-foreground/10 backdrop-blur-sm gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`View ${cert.title} certificate`}
          data-ocid={`cert-view-${cert.id}`}
        >
          <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-lg">
            <Eye className="w-5 h-5 text-foreground" />
          </div>
          <span className="text-xs font-semibold text-foreground bg-card/80 px-2.5 py-0.5 rounded-full">
            View Certificate
          </span>
        </motion.button>
      </div>

      {/* Card body */}
      <div className="p-5">
        <h3 className="text-sm font-bold font-display text-foreground mb-2 leading-snug group-hover:text-primary transition-colors duration-200">
          {cert.title}
        </h3>
        <div className="flex items-center justify-between">
          <span
            className={`flex items-center gap-1.5 text-xs font-semibold ${cert.orgColor} font-mono`}
          >
            <Building className="w-3 h-3" />
            {cert.issuer}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            {cert.date}
          </span>
        </div>
      </div>
    </NeumorphicCard>
  );
}

export function CertificationsSection() {
  const [selected, setSelected] = useState<CertificateCardData | null>(null);

  return (
    <section>
      <AnimatedSection direction="up">
        <SectionHeading
          label="Credentials"
          title="Certifications"
          subtitle="Industry-recognized certifications validating VLSI, FPGA, and embedded systems expertise."
        />
      </AnimatedSection>

      <StaggerContainer
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        staggerDelay={0.1}
      >
        {certificates.map((cert) => (
          <StaggerItem key={cert.id}>
            <CertificateCard cert={cert} onView={() => setSelected(cert)} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Certificate Detail Modal */}
      <Dialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent className="max-w-xl" data-ocid="cert-modal">
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center border border-primary/20 flex-shrink-0 mt-0.5">
                    <Award className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div>
                    <DialogTitle className="font-display text-lg leading-tight">
                      {selected.title}
                    </DialogTitle>
                    <div className="flex flex-wrap gap-2 mt-1.5">
                      <Badge variant="outline" className="text-xs font-mono">
                        {selected.issuer}
                      </Badge>
                      <Badge variant="secondary" className="text-xs font-mono">
                        {selected.date}
                      </Badge>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              {/* Large certificate placeholder */}
              <div
                className={`rounded-2xl h-72 bg-gradient-to-br ${selected.accentFrom} ${selected.accentTo} border border-border/50 flex items-center justify-center overflow-hidden relative mt-2`}
              >
                <div
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 24px, oklch(var(--border)) 24px, oklch(var(--border)) 25px), repeating-linear-gradient(90deg, transparent, transparent 24px, oklch(var(--border)) 24px, oklch(var(--border)) 25px)",
                  }}
                />
                <div className="relative flex flex-col items-center gap-3 text-center px-6">
                  <Award className="w-14 h-14 text-primary/30" />
                  <div>
                    <p className="text-base font-semibold font-display text-foreground/60">
                      {selected.title}
                    </p>
                    <p className="text-sm text-muted-foreground font-mono mt-1">
                      Issued by {selected.issuer} · {selected.date}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground/70 font-mono">
                    Certificate preview — upload image to display
                  </p>
                </div>
              </div>

              {selected.credentialUrl && (
                <div className="mt-1">
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={selected.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5"
                      data-ocid="cert-credential-link"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Verify Credential
                    </a>
                  </Button>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
