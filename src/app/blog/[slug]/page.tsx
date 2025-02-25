import { notFound } from 'next/navigation';


const posts = [
  { id: 1, title: 'Post 1', slug: 'post-1', content: 'Ini adalah konten dari Post 1' },
  { id: 2, title: 'Post 2', slug: 'post-2', content: 'Ini adalah konten dari Post 2' },
  { id: 3, title: 'Post 3', slug: 'post-3', content: 'Ini adalah konten dari Post 3' },
];

// Tipe untuk params
type PageProps = {
  params: { slug: string };
} | any;

// Fungsi untuk menghasilkan static paths
export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
   
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}