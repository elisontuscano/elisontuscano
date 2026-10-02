import { Link } from 'react-router-dom';
import { Card } from '../common/Card';
import styles from './BlogCard.module.css';
import type { BlogMeta } from '../../types';

interface BlogCardProps {
  blog: BlogMeta;
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link to={`/blogs/${blog.slug}`} className={styles.cardLink}>
      <Card>
        <div className={styles.header}>
          <span className={styles.date}>{blog.date}</span>
          {blog.readingTime && <span className={styles.readTime}>{blog.readingTime}</span>}
        </div>
        <h3 className={styles.title}>{blog.title}</h3>
        <p className={styles.summary}>{blog.summary}</p>
        <div className={styles.tags}>
          {blog.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </Card>
    </Link>
  );
}
