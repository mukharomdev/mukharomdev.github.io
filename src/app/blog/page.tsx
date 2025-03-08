import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";
// import { handleClose } from '@/app/_components/tagAction';

export default function Index() {
  const allPosts = getAllPosts();
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  /* edit */
  const label = allPosts.map(lbl=>lbl.title)
  const color = ""
  console.log(label[0])
 
  return (
    <main>
      <Container>
        <Intro />
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        {/* <Tag
          label={label}
          color={color?"bg-blue-500": ""}
          Close={()=>handleClose(label)}
          /> */}
      </Container>
    </main>
  );
}
