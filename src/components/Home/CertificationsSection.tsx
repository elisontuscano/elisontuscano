import { FiAward, FiExternalLink } from 'react-icons/fi';
import { SectionTitle } from '../common/SectionTitle';
import { SectionReveal } from './SectionReveal';
import { Card } from '../common/Card';
import certificationsData from '../../data/certifications.json';
import styles from './CertificationsSection.module.css';
import type { Certification } from '../../types';

const certifications = certificationsData as Certification[];

export function CertificationsSection() {
  if (certifications.length === 0) return null;

  return (
    <SectionReveal>
      <section className={`section container`}>
        <SectionTitle title="Certifications" />
        <div className={styles.list}>
          {certifications.map((cert) => (
            <Card key={cert.id}>
              <div className={styles.certItem}>
                <FiAward size={20} className={styles.icon} />
                <div>
                  <h3 className={styles.certName}>
                    {cert.credentialUrl ? (
                      <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                        {cert.name} <FiExternalLink size={14} />
                      </a>
                    ) : (
                      cert.name
                    )}
                  </h3>
                  <p className={styles.issuer}>{cert.issuer}</p>
                  {cert.date && <p className={styles.date}>{cert.date}</p>}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </SectionReveal>
  );
}
