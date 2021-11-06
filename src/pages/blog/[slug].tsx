import Head from "next/head";
import { Layout } from "components/Layout";
import { getAllItems, getItemBySlug } from "lib/mdx";
import { GetStaticPaths, GetStaticProps } from "next";
import { Post } from "types/Post";

export default function BlogPost({ post }: { post: Post }) {
  return (
    <Layout>
      <Head>
        <title>Blog - Casper Iversen</title>
      </Head>

      <article>
        <h1 className="text-3xl font-bold capitalize md:text-4xl">{post.title}</h1>
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
