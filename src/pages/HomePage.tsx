import { Hero } from '../components/Home/Hero';
import { AboutSection } from '../components/Home/AboutSection';
import { ExperienceSection } from '../components/Home/ExperienceSection';
import { SkillsSection } from '../components/Home/SkillsSection';
import { EducationSection } from '../components/Home/EducationSection';
import { CertificationsSection } from '../components/Home/CertificationsSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <CertificationsSection />
    </>
  );
}
