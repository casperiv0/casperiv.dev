import { Layout } from "components/Layout";
import { getAllItems } from "lib/mdx";
import { GetStaticProps } from "next";
import { Post } from "types/Post";
import { generateRSSFeed } from "lib/rss";
import { ArticlesList } from "components/blog/ArticlesList";
import { Seo } from "components/Seo";

export default function CodeSnippets({ snippets }: { snippets: Post[] }) {
  return (
    <Layout>
      <Seo
        title="Code snippets - Casper Iversen"
        description="Small code snippets that I have found useful"
        keywords={["code snippets", "code examples", "react hooks"]}
        url="https://caspertheghost.me/snippets"
      />

      <h1 className="section-title">Code Snippets</h1>

      <ArticlesList articles={snippets} type="snippets" />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const snippets = await getAllItems<Post>("snippets");
  await generateRSSFeed();

  return {
    props: { snippets },
  };
};
