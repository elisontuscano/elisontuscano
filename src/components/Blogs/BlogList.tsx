import { BlogCard } from './BlogCard';
import styles from './BlogList.module.css';
import type { BlogMeta } from '../../types';

interface BlogListProps {
  blogs: BlogMeta[];
}

export function BlogList({ blogs }: BlogListProps) {
  if (blogs.length === 0) {
    return <p className={styles.empty}>No blog posts yet. Check back soon!</p>;
  }

  return (
    <div className={styles.list}>
      {blogs.map((blog) => (
        <BlogCard key={blog.slug} blog={blog} />
      ))}
    </div>
  );
}
