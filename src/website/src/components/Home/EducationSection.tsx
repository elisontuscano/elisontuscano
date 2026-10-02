import { SectionTitle } from '../common/SectionTitle';
import { SectionReveal } from './SectionReveal';
import { Card } from '../common/Card';
import educationData from '../../data/education.json';
import styles from './EducationSection.module.css';
import type { Education } from '../../types';

const education = educationData as Education[];

export function EducationSection() {
  return (
    <SectionReveal>
      <section className={`section container`}>
        <SectionTitle title="Education" />
        <div className={styles.timeline}>
          {education.map((edu) => (
            <Card key={edu.id}>
              <div className={styles.cardContent}>
                <div>
                  <h3 className={styles.degree}>
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className={styles.institution}>{edu.institution}</p>
                  {edu.location && <p className={styles.location}>{edu.location}</p>}
                </div>
                <span className={styles.date}>
                  {edu.startDate} — {edu.endDate}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </SectionReveal>
  );
}
