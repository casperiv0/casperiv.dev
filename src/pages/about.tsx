import Link from "next/link";
import { Age } from "components/Age";
import { Layout } from "components/Layout";
import { GetStaticProps } from "next";
import { TimelineItem } from "types/Timeline";
import { Timeline } from "components/Timeline/Timeline";
import { Seo } from "components/Seo";

export default function About({ timelineData }: { timelineData: TimelineItem[] }) {
  return (
    <Layout>
      <Seo title="About - Casper Iversen" />

      <section id="about">
        <h1 className="section-title">About Me</h1>

        <div className="max-w-3xl mt-5">
          <p>
            Hello, I am Casper! {"I'm"} a <Age /> year old programmer and student based in Belgium.
            I adore building accessible and fast code. {"I'm"} also a big fan of open-source, I
            contribute to open-source as much as I can, I also have{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              href="https://github.com/dev-caspertheghost?tab=repositories"
            >
              many open-source projects
            </a>{" "}
            of my own.
          </p>
          <p className="mt-5">
            I have been developing web applications, Discord bots and npm packages for about 2 years
            and love it! {"I'm"} learning something new almost every day! I am currently focusing on
            frontend web development. Specifically working with React.js, TypeScript, CSS, HTML and
            much more!
          </p>
          <p className="mt-5">
            I also like interacting with GitHub repositories to expand my knowledge about
            technologies and web development in general.
          </p>
          <p className="mt-5">
            When {"I'm"} not programming or in school, I enjoy to go mountain biking in my local
            town. I also love skiing!
          </p>
          <p className="mt-5 text-base italic">
            PS: If there is something that {"you'd"} like to know more about me, {"don't"} hesitate
            to{" "}
            <Link href="/#contact">
              <a className="underline">contact me</a>
            </Link>
            !
          </p>
        </div>
      </section>

      <section className="mt-10" id="timeline">
        <h1 className="section-title">Timeline</h1>

        <Timeline timelineData={timelineData} />
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // get data from github
  const timelineData = await (await import("../data/timeline")).timeline;

  return {
    props: {
      timelineData,
    },
    // 1 week
    revalidate: 604_800,
  };
};
