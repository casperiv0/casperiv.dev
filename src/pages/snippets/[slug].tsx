import Head from "next/head";
import { Layout } from "components/Layout";
import { getAllItems, getItemBySlug } from "lib/mdx";
import { GetStaticPaths, GetStaticProps } from "next";
import { Post } from "types/Post";
import { Article } from "components/blog/Article";
import { Seo } from "components/Seo";

export default function BlogPost({ snippet }: { snippet: Post }) {
  return (
    <Layout>
      <Seo
        title={`${snippet.title} - Casper Iversen`}
        description={snippet.intro ?? undefined}
        keywords={["code snippets", "snippets casper iversen", ...(snippet.keywords ?? [])]}
        url={`https://caspertheghost.me/snippets/${snippet.slug}`}
        date={snippet.createdAt}
      />

      <Head>
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
