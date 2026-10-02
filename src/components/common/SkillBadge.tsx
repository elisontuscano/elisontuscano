import styles from './SkillBadge.module.css';

interface SkillBadgeProps {
  skill: string;
}

export function SkillBadge({ skill }: SkillBadgeProps) {
  return <span className={styles.badge}>{skill}</span>;
}
