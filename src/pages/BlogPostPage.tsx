import { useParams } from 'react-router-dom';
import { BlogPost } from '../components/Blogs/BlogPost';
import blogsIndex from '../data/blogs-index.json';
import type { BlogMeta } from '../types';

const blogs = blogsIndex as BlogMeta[];

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const meta = blogs.find((b) => b.slug === slug);

  if (!meta) {
    return (
      <div className="container section" style={{ textAlign: 'center' }}>
        <h2>Post Not Found</h2>
        <p>Sorry, the blog post you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <BlogPost meta={meta} />
    </div>
  );
}
