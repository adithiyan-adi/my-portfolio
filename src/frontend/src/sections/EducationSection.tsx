import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import { NeumorphicCard } from "@/components/ui/NeumorphicCard";
import { SectionHeading } from "@/components/ui/SectionWrapper";
import { Badge } from "@/components/ui/badge";
import type { Education } from "@/types/portfolio";
import { Award, BookOpen, Calendar, GraduationCap, MapPin } from "lucide-react";

const educationData: Education[] = [
  {
    id: "hits",
    institution: "Hindustan Institute of Technology & Science (HITS)",
    degree: "B.Tech · Electronics and Communication Engineering",
    period: "Aug 2023 – Present (Expected 2027)",
    location: "Chennai, Tamil Nadu",
    score: "8.71 / 10",
    scoreLabel: "CGPA",
    courses: [
      "VLSI Design",
      "Automated Testing Equipment",
      "Digital Electronics",
      "Microprocessors",
    ],
    highlights: [
      "PALS innoWAH Finalist",
      "2× Internships",
      "Multiple hardware projects",
    ],
    accentFrom: "from-primary/20",
    accentTo: "to-accent/10",
    icon: "university",
    image: "/assets/hindustan-campus.jpg",
  },
  {
    id: "petit-seminaire",
    institution: "Petit Seminaire Higher Secondary School",
    degree: "Higher Secondary Certificate (HSC) + School Education",
    period: "2009 – 2023",
    location: "Puducherry",
    score: "75%",
    scoreLabel: "12th Grade (HSC) Score",
    courses: [],
    highlights: ["General Proficiency Award"],
    accentFrom: "from-accent/20",
    accentTo: "to-primary/5",
    icon: "school",
    image: "/assets/petit-seminaire.jpg",
  },
];

function EducationCard({ edu }: { edu: Education }) {
  const isUniversity = edu.icon === "university";

  return (
    <NeumorphicCard hoverable className="relative p-0 overflow-hidden h-full">
      {/* Institution photo preview */}
      {edu.image && (
        <div
          className="relative w-full overflow-hidden"
          style={{ height: "180px" }}
        >
          <img
            src={edu.image}
            alt={`${edu.institution} campus`}
            className="w-full h-full object-cover object-center"
            style={{ display: "block", minHeight: "180px" }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
              const parent = e.currentTarget.parentElement;
              if (parent) parent.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card/80" />
        </div>
      )}

      {/* Top accent line (when no image) */}
      {!edu.image && (
        <div
          className={`relative h-2 bg-gradient-to-r ${edu.accentFrom} ${edu.accentTo}`}
        />
      )}

      <div className="p-6 flex flex-col gap-4 h-full">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${edu.accentFrom} ${edu.accentTo} border border-border/50 flex items-center justify-center flex-shrink-0 shadow-sm`}
          >
            {isUniversity ? (
              <GraduationCap className="w-6 h-6 text-primary" />
            ) : (
              <BookOpen className="w-6 h-6 text-accent" />
            )}
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold font-display text-foreground leading-snug">
              {edu.institution}
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5 font-body leading-snug">
              {edu.degree}
            </p>
          </div>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground font-mono">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-primary/60" />
            {edu.period}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-accent/60" />
            {edu.location}
          </span>
        </div>

        {/* Score badge */}
        <div className="flex items-center gap-2">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r ${edu.accentFrom} ${edu.accentTo} border border-border/50`}
          >
            <span className="text-xs text-muted-foreground font-mono">
              {edu.scoreLabel}:
            </span>
            <span className="text-sm font-bold font-display text-foreground">
              {edu.score}
            </span>
          </div>
        </div>

        {/* Courses */}
        {edu.courses.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 font-mono">
              Key Courses
            </p>
            <div className="flex flex-wrap gap-1.5">
              {edu.courses.map((course) => (
                <Badge
                  key={course}
                  variant="outline"
                  className="text-xs font-mono px-2 py-0.5 border-border/60 text-muted-foreground"
                >
                  {course}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Highlights */}
        {edu.highlights.length > 0 && (
          <div className="mt-auto pt-2 border-t border-border/40">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 font-mono">
              Notable
            </p>
            <div className="flex flex-wrap gap-1.5">
              {edu.highlights.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 text-xs font-semibold text-primary/80 bg-primary/8 border border-primary/20 px-2.5 py-1 rounded-lg"
                >
                  <Award className="w-3 h-3 text-primary/60" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </NeumorphicCard>
  );
}

export function EducationSection() {
  return (
    <section id="education">
      <AnimatedSection direction="up">
        <SectionHeading
          label="Academic Background"
          title="Education"
          subtitle="Strong theoretical foundations from premier institutions, backed by practical engineering experience."
        />
      </AnimatedSection>

      <StaggerContainer
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        staggerDelay={0.08}
      >
        {educationData.map((edu) => (
          <StaggerItem key={edu.id}>
            <EducationCard edu={edu} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
