// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';

interface BlogPostProps {
  params: {
    slug: string;
  };
}

export default function BlogPost({ params }: BlogPostProps) {
  if (!params.slug) {
    notFound();
  }

  return (
    <div>
      <h1>Blog Post: {params.slug}</h1>
      <p>This is the content for the blog post with slug: {params.slug}.</p>
    </div>
  );
}