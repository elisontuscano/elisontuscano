import { SocialPill } from '../common/SocialPill';
import profileData from '../../data/profile.json';
import type { Profile } from '../../types';
import styles from './Footer.module.css';

const currentYear = new Date().getFullYear();
const profile = profileData as Profile;

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
        <div className={styles.social}>
          {profile.socialLinks.map((link) => (
            <SocialPill key={link.platform} link={link} />
          ))}
        </div>
        <p className={styles.copyright}>
          &copy; {currentYear} {profile.firstName} {profile.lastName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
