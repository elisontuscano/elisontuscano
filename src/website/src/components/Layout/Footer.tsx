import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import styles from './Footer.module.css';

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
        <div className={styles.social}>
          <a
            href="https://github.com/elisontuscano"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FiGithub size={20} />
          </a>
          <a
            href="https://linkedin.com/in/elisontuscano"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FiLinkedin size={20} />
          </a>
          <a href="mailto:elisontuscano@gmail.com" aria-label="Email">
            <FiMail size={20} />
          </a>
        </div>
        <p className={styles.copyright}>
          &copy; {currentYear} Elison Tuscano. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
