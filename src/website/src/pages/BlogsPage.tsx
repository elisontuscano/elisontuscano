import { SectionTitle } from '../components/common/SectionTitle';
import { BlogList } from '../components/Blogs/BlogList';
import blogsIndex from '../data/blogs-index.json';
import type { BlogMeta } from '../types';

const blogs = (blogsIndex as BlogMeta[]).sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export default function BlogsPage() {
  return (
    <div className="container section">
      <SectionTitle title="Blog" />
      <BlogList blogs={blogs} />
    </div>
  );
}
