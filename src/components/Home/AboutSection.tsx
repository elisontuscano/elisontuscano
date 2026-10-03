import { SectionTitle } from '../common/SectionTitle';
import { SectionReveal } from './SectionReveal';
import profileData from '../../data/profile.json';
import styles from './AboutSection.module.css';
import type { Profile } from '../../types';

const profile = profileData as Profile;

export function AboutSection() {
  return (
    <SectionReveal>
      <section className={`section container`}>
        <SectionTitle title="About Me" />
        <p className={styles.bio}>{profile.bio}</p>
      </section>
    </SectionReveal>
  );
}
