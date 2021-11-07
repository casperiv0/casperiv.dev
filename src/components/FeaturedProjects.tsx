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
    <li className="flex flex-col justify-between p-4 transition-transform rounded-md shadow-sm bg-blue-1 focus-within:translate-y-[-2px] hover:translate-y-[-2px]">
      <h2 className="text-2xl font-semibold">{project.title}</h2>

      <p className="my-3 text-gray-300">{project.description}</p>

      <ul className="flex gap-1 mt-2">
        {project.buttons.map((button) => (
          <li key={button.name}>
            <Link href={button.url} className="p-1.5 px-3 rounded-md bg-blue">
              {button.name}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};
