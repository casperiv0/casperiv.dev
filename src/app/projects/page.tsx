import ronin from "ronin";
import NextLink from "next/link";
import { mergeSeo } from "~/lib/merge-seo";
import { Link, link } from "~/components/link";
import { Projects } from "@ronin/casper";
import Image from "next/image";
import { ArrowRight } from "~/components/icons/arrow-right";

export const revalidate = 600; // 10 minutes

async function fetchProjects() {
  const [projects] = await ronin<Projects>(({ get }) => {
    get.projects = {
      orderedBy: { ascending: ["featuredPosition"] },
      limitedTo: 1000,
    };
  });

  return {
    projects,
  };
}

const pageDescription = "A list of my projects that I'm most proud of.";

export const metadata = mergeSeo({
  title: "Projects",
  description: pageDescription,
  alternates: {
    canonical: "https://casperiv.dev/projects",
  },
  openGraph: {
    title: "Projects",
    description: pageDescription,
  },
  twitter: {
    title: "Projects",
    description: pageDescription,
  },
  keywords: ["projects casper iversen", "projects", "react hooks"],
});

export default async function ProjectsPage() {
  const { projects } = await fetchProjects();

  const projectsWithSlugs = projects.filter((project) => project.slug);
  const projectsWithoutSlug = projects.filter((project) => !project.slug);

  return (
    <main className="mt-16 mx-auto max-w-6xl pb-6 px-5 md:px-0">
      <h1 className="text-4xl font-bold capitalize md:text-5xl font-title">
        Projects<span className="text-accent">.</span>
      </h1>

      <p className="mt-4 font-normal text-secondary-light max-w-lg">
        I love building projects and learning new things. Below you can find my personal projects I
        am most proud of proud of. All my projects are{" "}
        <NextLink className="underline" href="https://github.com/casperiv0">
          available on GitHub
        </NextLink>
        .
      </p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
        {projectsWithSlugs.map((project) => {
          const projectURL = project.slug
            ? `/project/${project.slug}`
            : project.projectURL || project.addonURL || project.codeURL;

          return (
            <li
              className="p-4 rounded-lg bg-white/10 ring-2 ring-accent hover:ring-offset-2 transition group"
              key={project.id}
            >
              <a href={projectURL} rel="noreferrer" target="_blank">
                <figure className="mb-5">
                  <Image
                    width={400}
                    height={250}
                    alt={project.title}
                    draggable={false}
                    className="rounded shadow-md w-full md:h-80 object-cover"
                    src={project.coverImage.src}
                    placeholder="blur"
                    blurDataURL={project.coverImage.placeholder.base64}
                  />
                </figure>

                <header className="flex items-baseline justify-between mb-6">
                  <h3 className="font-semibold font-poppins text-xl transition-colors border-accent/10 group-hover:border-b-accent border-b-2 max-w-fit">
                    {project.title}
                  </h3>

                  <p
                    className={link({
                      className:
                        "scale-75 group-hover:scale-100 group-hover:-rotate-45 group-hover:border-accent",
                      intent: "secondary",
                      size: "square",
                    })}
                  >
                    <ArrowRight width={20} height={20} />
                  </p>
                </header>

                <p className="text-base text-gray-dark max-w-xl font-inter font-normal">
                  {project.description}
                </p>
              </a>
            </li>
          );
        })}
      </ul>

      <ul className="mt-10 flex flex-col gap-5">
        {projectsWithoutSlug.map((blogPost) => {
          const projectURL = blogPost.slug
            ? `/project/${blogPost.slug}`
            : blogPost.projectURL || blogPost.addonURL || blogPost.codeURL;

          return (
            <li key={blogPost.id} className="flex justify-between group">
              <Link size="none" className="w-full" intent="none" href={projectURL}>
                <h3 className="font-semibold font-poppins text-xl transition-colors border-accent/10 group-hover:border-b-accent border-b-2 max-w-fit">
                  {blogPost.title}
                </h3>

                <p className="mt-1 md:mt-2 text-base text-gray-dark max-w-xl font-inter font-normal">
                  {blogPost.description}
                </p>
              </Link>

              <Link
                size="square"
                className="group-hover:scale-100 scale-75 group-hover:-rotate-45 group-hover:border-accent"
                intent="secondary"
                href={projectURL}
              >
                <ArrowRight width={20} height={20} />
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
