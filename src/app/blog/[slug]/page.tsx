// import { notFound } from 'next/navigation';
// // type Post = {
// //   id: number;
// //   title: string;
// //   slug: string;
// //   content: string;
// // };


// const posts = [
//   { id: 1, title: 'Post 1', slug: 'post-1', content: 'Ini adalah konten dari Post 1' },
//   { id: 2, title: 'Post 2', slug: 'post-2', content: 'Ini adalah konten dari Post 2' },
//   { id: 3, title: 'Post 3', slug: 'post-3', content: 'Ini adalah konten dari Post 3' },
// ];

// // Tipe untuk params
// type Params = Promise<{ slug: string }>

// // Fungsi untuk menghasilkan static paths
// export async function generateStaticParams():Promise<{slug:string}[]>{
//   // const response = await fetch(posts);
//   // const posts: Post[] = await response.json(); // Ganti `any` dengan tipe `Post[]`
//   // const data:Post[] = posts
//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// }

// export default async function BlogPost({ params }: { params: Params }) {
//   const { slug } = await params;
   
//   const post = posts.find((p) => p.slug === slug);

//   if (!post) {
//     notFound();
//   }

//   return (
//     <div>
//       <h1>{post.title}</h1>
//       <p>{post.content}</p>
//     </div>
//   );
// }

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { CMS_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import Alert from "@/app/_components/alert";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";

export default async function Post(props: Params) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main className="container">
      <Alert preview={post.preview} />
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
          />
          <PostBody content={content} />
        </article>
      </Container>
    </main>
  );
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`;

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
