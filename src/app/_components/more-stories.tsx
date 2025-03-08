import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";
import Carousel from "./carousel"

type Props = {
  posts: Post[];
};

export function MoreStories({ posts }: Props) {
  return (
    <section>
      <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      {/* update pertama */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">     */}
      {/* update kedua */}
    <Carousel>
    {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4"> */}
     {posts.map((post) => (
          <PostPreview
            key={post.slug}
             title={post.title}
coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}            
          />
        ))}
       {/* </div> */}
      </Carousel>
    </section>
  );
}
