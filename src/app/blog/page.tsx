
export default async function Blog({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const { slug } = await params
   
    return <h1>Blog Post: {slug}</h1>
  }