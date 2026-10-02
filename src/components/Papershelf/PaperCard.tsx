import { FiExternalLink, FiFileText } from 'react-icons/fi';
import { Card } from '../common/Card';
import styles from './PaperCard.module.css';
import type { Paper } from '../../types';

interface PaperCardProps {
  paper: Paper;
}

export function PaperCard({ paper }: PaperCardProps) {
  return (
    <Card>
      <div className={styles.paperContent}>
        <div className={styles.main}>
          <h3 className={styles.title}>
            <a href={paper.url} target="_blank" rel="noopener noreferrer">
              {paper.title}
              <FiExternalLink size={14} className={styles.linkIcon} />
            </a>
          </h3>
          <p className={styles.authors}>
            {paper.authors.join(', ')} · {paper.year}
          </p>
          {paper.summary && <p className={styles.summary}>{paper.summary}</p>}
          <div className={styles.tags}>
            {paper.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        {paper.notesUrl && (
          <a
            href={paper.notesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.notesLink}
            aria-label="View notes"
          >
            <FiFileText size={18} />
            Notes
          </a>
        )}
      </div>
    </Card>
  );
}
