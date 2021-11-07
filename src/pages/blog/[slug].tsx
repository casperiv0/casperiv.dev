import Head from "next/head";
import { Layout } from "components/Layout";
import { getAllItems, getItemBySlug } from "lib/mdx";
import { GetStaticPaths, GetStaticProps } from "next";
import { Post } from "types/Post";
import { Article } from "components/blog/Article";

export default function BlogPost({ post }: { post: Post }) {
  return (
    <Layout>
      <Head>
        <title>{post.title} - Casper Iversen</title>
        <link rel="preload" href="/fonts/CascadiaMono.woff2" as="font" type="font/woff2" />
      </Head>

      <Article article={post} />
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
