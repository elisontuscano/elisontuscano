import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../hooks/useTheme';
import styles from './ThemeToggle.module.css';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className={`${styles.icon} ${theme === 'light' ? styles.visible : ''}`}>
        <FiMoon size={18} />
      </span>
      <span className={`${styles.icon} ${theme === 'dark' ? styles.visible : ''}`}>
        <FiSun size={18} />
      </span>
    </button>
  );
}
