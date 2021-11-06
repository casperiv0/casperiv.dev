import Head from "next/head";
import { Layout } from "components/Layout";
import { getAllItems, getItemBySlug } from "lib/mdx";
import { GetStaticPaths, GetStaticProps } from "next";
import { Post } from "types/Post";
import { BlogHeader } from "components/blog/BlogHeader";
import { Markdown } from "components/blog/markdown/Markdown";
import { BlogFooter } from "components/blog/BlogFooter";

export default function BlogPost({ post }: { post: Post }) {
  return (
    <Layout>
      <Head>
        <title>Blog - Casper Iversen</title>
      </Head>

      <article className="pb-5">
        <BlogHeader post={post} />

        <Markdown content={post.content} />

        <BlogFooter post={post} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllItems<Post>("posts", true);

  return {
    fallback: false,
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getItemBySlug<Post>(params?.slug as string, "posts");

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post },
  };
};
