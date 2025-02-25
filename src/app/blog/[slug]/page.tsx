export async function generateStaticParams(){}

export default function BlogPostPage({ params }: { params: { slug: string } }):PageProps {
  return <div>Blog Post: {params.slug}</div>;
}