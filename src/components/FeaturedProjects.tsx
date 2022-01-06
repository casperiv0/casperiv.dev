import { Project } from "types/Project";
import { Link } from "./blog/markdown/Link";

export const FeaturedProjectsSection = ({ projects }: { projects: Project[] }) => {
  return (
    <section className="pb-5 mt-14" id="projects">
      <h1 className="section-title">Featured Projects</h1>

      <ul className="grid grid-cols-1 gap-3 mt-5 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectItem key={project.title} project={project} />
        ))}
      </ul>
    </section>
  );
};

const ProjectItem = ({ project }: { project: Project }) => {
  return (
    <li className="flex flex-col justify-between p-4 transition-transform rounded-md shadow-sm bg-gray-300/80 dark:bg-blue-1 focus-within:scale-[1.008] hover:scale-[1.008] cursor-default">
      <h2 className="text-2xl font-semibold">{project.title}</h2>

      <p className="my-3 text-neutral-800 dark:text-gray-300">{project.description}</p>

      <ul className="flex gap-1 mt-2">
        {project.buttons.map((button) => (
          <li key={button.name}>
            <Link
              href={button.url}
              className="p-2 px-3.5 rounded-md bg-gray-400 focus:bg-gray-500/80 hover:bg-gray-500/80  dark:bg-blue dark:focus:bg-blue-2 dark:hover:bg-blue-2 transition-colors"
            >
              {button.name}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};
