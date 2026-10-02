import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css'; // Added syntax highlighting theme
import { FiArrowLeft } from 'react-icons/fi';
import styles from './BlogPost.module.css';
import type { BlogMeta } from '../../types';

interface BlogPostProps {
  meta: BlogMeta;
}

export function BlogPost({ meta }: BlogPostProps) {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    
    const loadPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/blog-content/${meta.slug}.md`, {
          signal: abortController.signal
        });
        if (!response.ok) throw new Error('Post not found');
        const text = await response.text();
        const contentWithoutFrontmatter = text.replace(/^---[\s\S]*?---\n*/m, '');
        setContent(contentWithoutFrontmatter);
      } catch (error: any) {
        if (error.name === 'AbortError') return;
        setContent('# Post not found\n\nSorry, this blog post could not be loaded.');
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadPost();
    
    return () => {
      abortController.abort();
    };
  }, [meta.slug]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <article className={styles.post}>
      <Link to="/blogs" className={styles.backLink}>
        <FiArrowLeft size={16} />
        Back to all posts
      </Link>

      <header className={styles.header}>
        <h1 className={styles.title}>{meta.title}</h1>
        <div className={styles.meta}>
          <span>{meta.date}</span>
          {meta.readingTime && <span>{meta.readingTime}</span>}
        </div>
      </header>

      <div className={styles.content}>
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
