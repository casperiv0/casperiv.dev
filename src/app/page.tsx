import { MyBackpackSection } from "~/components/sections/backpack-section";
import { HeroSection } from "~/components/sections/hero-section";
import { batch, get } from "ronin";
import { ProjectsSection } from "~/components/sections/projects-section";
import { LatestBlogPosts } from "~/components/sections/latest-blog-posts";
import { ContactSection } from "~/components/sections/contact/contact-section";
import { allBlogPosts } from "contentlayer/generated";
import { getArticleSlug } from "~/lib/mdx/get-article-slug";
import { compareDesc } from "date-fns/compareDesc";

async function fetchHomePageData() {
  const [backpack, featuredProjects] = await batch(() => [
    get.mySkills.orderedBy.ascending(["ronin.createdAt"]),
    get.projects({
      with: { isFeatured: true },
      orderedBy: { ascending: ["featuredPosition"] },
    }),
  ]);

  return { backpack, featuredProjects };
}

const latestBlogPosts = allBlogPosts
  .map((blogPost) => ({
    slug: getArticleSlug(blogPost),
    title: blogPost.title,
    description: blogPost.description,
    createdAt: blogPost.createdAt,
  }))
  .sort((a, b) => compareDesc(new Date(a.createdAt), new Date(b.createdAt)))
  .slice(0, 4);

export default async function Home() {
  const { backpack, featuredProjects } = await fetchHomePageData();

  return (
    <main>
      <HeroSection />
      <MyBackpackSection backpack={backpack} />
      <ProjectsSection featuredProjects={featuredProjects} />
      <LatestBlogPosts blogPosts={latestBlogPosts} />
      <ContactSection />
    </main>
  );
}
