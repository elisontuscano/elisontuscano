import { SectionTitle } from '../components/common/SectionTitle';
import { ProjectGrid } from '../components/Projects/ProjectGrid';
import projectsData from '../data/projects.json';
import type { Project } from '../types';

const projects = projectsData as Project[];

export default function ProjectsPage() {
  return (
    <div className="container section">
      <SectionTitle title="Projects" />
      <ProjectGrid projects={projects} />
    </div>
  );
}
