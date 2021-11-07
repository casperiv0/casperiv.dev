import Head from "next/head";
import { Layout } from "components/Layout";
import { getAllItems } from "lib/mdx";
import { GetStaticProps } from "next";
import { Post } from "types/Post";
import { generateRSSFeed } from "lib/rss";
import { ArticlesList } from "components/blog/ArticlesList";

export default function Blog({ posts }: { posts: Post[] }) {
  return (
    <Layout>
      <Head>
        <title>Blog - Casper Iversen</title>
      </Head>

      <h1 className="text-3xl font-bold capitalize md:text-4xl">Blog Posts</h1>

      <ArticlesList articles={posts} type="blog" />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllItems<Post>("posts");
  await generateRSSFeed();

  return {
    props: { posts },
  };
};
