import { PaperCard } from './PaperCard';
import styles from './PaperList.module.css';
import type { Paper } from '../../types';

interface PaperListProps {
  papers: Paper[];
}

export function PaperList({ papers }: PaperListProps) {
  if (papers.length === 0) {
    return <p className={styles.empty}>No papers yet. Check back soon!</p>;
  }

  return (
    <div className={styles.list}>
      {papers.map((paper) => (
        <PaperCard key={paper.id} paper={paper} />
      ))}
    </div>
  );
}
