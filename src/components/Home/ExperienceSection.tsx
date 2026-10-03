import { useState } from 'react';
import { SectionTitle } from '../common/SectionTitle';
import { SectionReveal } from './SectionReveal';
import { Card } from '../common/Card';
import { SkillBadge } from '../common/SkillBadge';
import experienceData from '../../data/experience.json';
import styles from './ExperienceSection.module.css';
import type { Experience } from '../../types';

const experiences = experienceData as Experience[];

function ExperienceCard({ exp }: { exp: Experience }) {
  const [expanded, setExpanded] = useState(false);
  const visibleBullets = expanded ? exp.bullets : exp.bullets.slice(0, 3);
  const hasMore = exp.bullets.length > 3;

  return (
    <Card>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.company}>{exp.company}</h3>
          <p className={styles.role}>{exp.role}</p>
        </div>
        <div className={styles.meta}>
          <span className={styles.date}>
            {exp.startDate} — {exp.endDate}
          </span>
          {exp.location && <span className={styles.location}>{exp.location}</span>}
        </div>
      </div>

      <div className={styles.techStack}>
        {exp.techStack.map((tech) => (
          <SkillBadge key={tech} skill={tech} />
        ))}
      </div>

      <ul className={styles.bullets}>
        {visibleBullets.map((bullet, i) => (
          <li key={i}>{bullet}</li>
        ))}
      </ul>

      {hasMore && (
        <button className={styles.showMore} onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show less' : `Show ${exp.bullets.length - 3} more`}
        </button>
      )}
    </Card>
  );
}

export function ExperienceSection() {
  return (
    <SectionReveal>
      <section className={`section container`}>
        <SectionTitle title="Experience" />
        <div className={styles.cards}>
          {experiences.map((exp) => (
            <ExperienceCard key={exp.id} exp={exp} />
          ))}
        </div>
      </section>
    </SectionReveal>
  );
}
