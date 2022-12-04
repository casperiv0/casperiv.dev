import { BlogFooter } from "components/blog/blog-footer";
import { BlogHeader } from "components/blog/blog-header";
import { Markdown } from "components/blog/markdown/markdown";
import { allCodeSnippets } from "contentlayer/generated";
import { getArticleSlug } from "lib/mdx/get-article-slug";
import { getCodeSnippet } from "lib/mdx/get-code-snippet";
import { notFound } from "next/navigation";

interface CodeSnippetsSlugPageProps {
  params: { slug: string };
}

export default async function CodeSnippetsSlugPage({ params }: CodeSnippetsSlugPageProps) {
  const item = getCodeSnippet(params.slug);

  if (!item) {
    return notFound();
  }

  return (
    <>
      <BlogHeader post={item} />
      <Markdown code={item.body.code} />
      <BlogFooter post={item} />
    </>
  );
}

export async function generateStaticParams() {
  return allCodeSnippets.map((snippet) => ({
    slug: getArticleSlug(snippet),
  }));
}
