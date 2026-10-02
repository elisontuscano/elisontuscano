import { SectionTitle } from '../common/SectionTitle';
import { SectionReveal } from './SectionReveal';
import { SkillBadge } from '../common/SkillBadge';
import skillsData from '../../data/skills.json';
import styles from './SkillsSection.module.css';
import type { SkillCategory } from '../../types';

const skills = skillsData as SkillCategory[];

export function SkillsSection() {
  return (
    <SectionReveal>
      <section className={`section container`}>
        <SectionTitle title="Skills" />
        <div className={styles.categories}>
          {skills.map((cat) => (
            <div key={cat.category} className={styles.category}>
              <h3 className={styles.categoryTitle}>{cat.category}</h3>
              <div className={styles.pills}>
                {cat.skills.map((skill) => (
                  <SkillBadge key={skill} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </SectionReveal>
  );
}
