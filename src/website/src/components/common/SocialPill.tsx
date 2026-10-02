import { FiMail, FiPhone, FiLinkedin, FiGithub, FiExternalLink } from 'react-icons/fi';
import styles from './SocialPill.module.css';
import type { SocialLink } from '../../types';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  FiMail,
  FiPhone,
  FiLinkedin,
  FiGithub,
  FiExternalLink,
};

interface SocialPillProps {
  link: SocialLink;
}

export function SocialPill({ link }: SocialPillProps) {
  const Icon = iconMap[link.icon] || FiExternalLink;

  return (
    <a
      href={link.url}
      className={styles.pill}
      target={link.platform === 'email' || link.platform === 'phone' ? undefined : '_blank'}
      rel={
        link.platform === 'email' || link.platform === 'phone' ? undefined : 'noopener noreferrer'
      }
    >
      <Icon size={16} />
      <span>{link.label}</span>
    </a>
  );
}
