import { Layout } from "./components/Layout";
import { SectionWrapper } from "./components/ui/SectionWrapper";
import { AboutSection } from "./sections/AboutSection";
import { AchievementsSection } from "./sections/AchievementsSection";
import { CareerVisionSection } from "./sections/CareerVisionSection";
import { ContactSection } from "./sections/ContactSection";
import { EducationSection } from "./sections/EducationSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { GallerySection } from "./sections/GallerySection";
import { HeroSection } from "./sections/HeroSection";
import { LanguagesSection } from "./sections/LanguagesSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { SkillsSection } from "./sections/SkillsSection";

export default function App() {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <SectionWrapper id="education" alt>
        <EducationSection />
      </SectionWrapper>
      <ExperienceSection />
      <SectionWrapper id="projects" alt>
        <ProjectsSection />
      </SectionWrapper>
      <SectionWrapper id="skills">
        <SkillsSection />
      </SectionWrapper>
      <SectionWrapper id="languages" alt>
        <LanguagesSection />
      </SectionWrapper>
      <SectionWrapper id="achievements">
        <AchievementsSection />
      </SectionWrapper>
      <SectionWrapper id="gallery" alt>
        <GallerySection />
      </SectionWrapper>
      <SectionWrapper id="career-vision">
        <CareerVisionSection />
      </SectionWrapper>
      <SectionWrapper id="contact" alt>
        <ContactSection />
      </SectionWrapper>
    </Layout>
  );
}
