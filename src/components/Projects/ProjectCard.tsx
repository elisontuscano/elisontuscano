import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { Card } from '../common/Card';
import { SkillBadge } from '../common/SkillBadge';
import styles from './ProjectCard.module.css';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className={styles.projectCard}>
      {project.imageUrl && (
        <img src={project.imageUrl} alt={project.name} className={styles.thumbnail} />
      )}
      <div className={styles.content}>
        <h3 className={styles.name}>{project.name}</h3>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.techStack}>
          {project.techStack.map((tech) => (
            <SkillBadge key={tech} skill={tech} />
          ))}
        </div>
        <div className={styles.links}>
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              aria-label="GitHub repository"
            >
              <FiGithub size={18} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              aria-label="Live demo"
            >
              <FiExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
