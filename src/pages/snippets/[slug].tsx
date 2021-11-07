import Head from "next/head";
import { Layout } from "components/Layout";
import { getAllItems, getItemBySlug } from "lib/mdx";
import { GetStaticPaths, GetStaticProps } from "next";
import { Post } from "types/Post";
import { Article } from "components/blog/Article";

export default function BlogPost({ snippet }: { snippet: Post }) {
  return (
    <Layout>
      <Head>
        <title>{snippet.title} - Casper Iversen</title>
        <link rel="preload" href="/fonts/CascadiaMono.woff2" as="font" type="font/woff2" />
      </Head>

      <Article article={snippet} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const snippets = await getAllItems<Post>("snippets", true);

  return {
    fallback: false,
    paths: snippets.map((snippet) => ({
      params: {
        slug: snippet.slug,
      },
    })),
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const snippet = await getItemBySlug<Post>(params?.slug as string, "snippets");

  if (!snippet) {
    return {
      notFound: true,
    };
  }

  return {
    props: { snippet },
  };
};
