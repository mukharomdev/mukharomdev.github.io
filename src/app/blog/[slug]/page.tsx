import { notFound } from 'next/navigation';
type Post = {
  id: number;
  title: string;
  slug: string;
  content: string;
};


const posts = [
  { id: 1, title: 'Post 1', slug: 'post-1', content: 'Ini adalah konten dari Post 1' },
  { id: 2, title: 'Post 2', slug: 'post-2', content: 'Ini adalah konten dari Post 2' },
  { id: 3, title: 'Post 3', slug: 'post-3', content: 'Ini adalah konten dari Post 3' },
];

// Tipe untuk params
type PageProps = {
  params: { slug: string };
};

// Fungsi untuk menghasilkan static paths
export async function generateStaticParams():Promise<Post[]>{
  // const response = await fetch(posts);
  // const posts: Post[] = await response.json(); // Ganti `any` dengan tipe `Post[]`
   const data:Post[] = posts
  return data.map((post) => ({
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