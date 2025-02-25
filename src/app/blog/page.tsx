import Link from 'next/link';

const posts = [
  { id: 1, title: 'Post 1', slug: 'post-1' },
  { id: 2, title: 'Post 2', slug: 'post-2' },
  { id: 3, title: 'Post 3', slug: 'post-3' },
];

export default function Blog() {
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}