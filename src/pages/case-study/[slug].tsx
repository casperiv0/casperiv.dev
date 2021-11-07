import Head from "next/head";
import { Layout } from "components/Layout";
import { getAllItems, getItemBySlug } from "lib/mdx";
import { GetStaticPaths, GetStaticProps } from "next";
import { Post } from "types/Post";
import { Article } from "components/blog/Article";

export default function BlogPost({ caseStudy }: { caseStudy: Post }) {
  return (
    <Layout>
      <Head>
        <title>{caseStudy.title} - Casper Iversen</title>
        <link rel="preload" href="/fonts/CascadiaMono.woff2" as="font" type="font/woff2" />
      </Head>

      <Article article={caseStudy} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const caseStudies = await getAllItems<Post>("case-studies", true);

  return {
    fallback: false,
    paths: caseStudies.map((snippet) => ({
      params: {
        slug: snippet.slug,
      },
    })),
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const caseStudy = await getItemBySlug<Post>(params?.slug as string, "case-studies");

  if (!caseStudy) {
    return {
      notFound: true,
    };
  }

  return {
    props: { caseStudy },
  };
};
