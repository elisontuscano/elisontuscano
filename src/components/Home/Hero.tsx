import { FiDownload } from 'react-icons/fi';
import { TypingAnimation } from '../common/TypingAnimation';
import { SocialPill } from '../common/SocialPill';
import profileData from '../../data/profile.json';
import styles from './Hero.module.css';
import type { Profile } from '../../types';

const profile = profileData as Profile;

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.avatarWrapper}>
          <img
            src={profile.avatarUrl}
            alt={`${profile.firstName} ${profile.lastName}`}
            className={styles.avatar}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling;
              if (fallback) (fallback as HTMLElement).style.display = 'flex';
            }}
          />
          <div className={styles.avatarFallback} style={{ display: 'none' }}>
            {profile.firstName[0]}
            {profile.lastName[0]}
          </div>
        </div>

        <h1 className={styles.name}>
          <span className={styles.firstName}>{profile.firstName}</span>{' '}
          <span className={styles.lastName}>{profile.lastName}</span>
        </h1>

        <p className={styles.subtitle}>
          <TypingAnimation titles={profile.titles} />
        </p>

        <a href={profile.resumeUrl} download className={styles.resumeLink}>
          <FiDownload size={16} />
          Download Resume
        </a>

        <div className={styles.contacts}>
          {profile.socialLinks.map((link) => (
            <SocialPill key={link.platform} link={link} />
          ))}
        </div>
      </div>
    </section>
  );
}
