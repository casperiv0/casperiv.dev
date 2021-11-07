import Head from "next/head";
import { Layout } from "components/Layout";
import { getAllItems, getItemBySlug } from "lib/mdx";
import { GetStaticPaths, GetStaticProps } from "next";
import { Post } from "types/Post";
import { Article } from "components/blog/Article";
import { Seo } from "components/Seo";

export default function BlogPost({ post }: { post: Post }) {
  return (
    <Layout>
      <Seo
        title={`${post.title} - Casper Iversen`}
        description={post.intro ?? undefined}
        keywords={["blog", "blog casper iversen", ...(post.keywords ?? [])]}
        url={`https://caspertheghost.me/blog/${post.slug}`}
        date={post.createdAt}
      />

      <Head>
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
