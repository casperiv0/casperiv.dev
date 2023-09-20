import { allProjects } from "contentlayer/generated";
import { getArticleSlug } from "~/lib/mdx/get-article-slug";
import { getProject } from "~/lib/mdx/get-project";
import { notFound } from "next/navigation";
import { mergeSeo } from "~/lib/merge-seo";
import { BlogHeader } from "~/components/blog/blog-header";
import { Markdown } from "~/components/blog/markdown/markdown";
import { BlogFooter } from "~/components/blog/blog-footer";
import ronin from "ronin";
import { Project } from "@ronin/casper";

export const revalidate = 600; // 10 minutes

interface ProjectSlugPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProjectSlugPageProps) {
  const item = getProject(params.slug);

  if (!item) {
    return {};
  }

  return mergeSeo({
    title: item.title,
    description: item.description,
    alternates: {
      canonical: `https://casperiv.dev/project/${getArticleSlug(item)}`,
    },
    openGraph: {
      title: item.title,
      description: item.description,
      publishedTime: item.createdAt,
      type: "article",
      modifiedTime: item.updatedAt,
    },
    twitter: {
      title: item.title,
      description: item.description,
    },
    keywords: ["project casper iversen", item.title, ...(item.keywords ?? [])],
  });
}

async function getProjectInformationFromRONIN(slug: string) {
  const [project] = await ronin<[Project | null]>(({ get }) => {
    get.project = {
      where: { slug: { is: slug } },
    };
  });
  return project;
}

export default async function ProjectPage({ params }: ProjectSlugPageProps) {
  const project = getProject(params.slug);
  const roninInformation = (await getProjectInformationFromRONIN(params.slug)) ?? {};

  if (!project) {
    return notFound();
  }

  return (
    <main>
      <BlogHeader {...roninInformation} post={project} />
      <section className="max-w-6xl mx-auto pb-6 px-5 md:px-0">
        <Markdown code={project.body.code} />
        <BlogFooter post={project} />
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: getArticleSlug(project),
  }));
}
