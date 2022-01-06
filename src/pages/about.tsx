import Link from "next/link";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Age } from "components/Age";
import { Layout } from "components/Layout";
import { GetStaticProps } from "next";
import { TimelineItem } from "types/Timeline";
import { Timeline } from "components/timeline/Timeline";
import { Seo } from "components/Seo";

export default function About({ timelineData }: { timelineData: TimelineItem[] }) {
  // this is roughly the date I started programing according to GitHub 😅!
  const started = new Date("2019-08-08");

  return (
    <Layout>
      <Seo title="About - Casper Iversen" />

      <section id="about">
        <h1 className="section-title">About Me</h1>

        <div className="max-w-3xl mt-5 text-neutral-800 dark:text-gray-200">
          <p>
            Hello, I am Casper! {"I'm"} a <Age />
            -year-old programmer and student based in Belgium. I adore building accessible,
            responsive and fast code. Furthermore, {"I'm"} also a big fan of open-source, I
            contribute to open-source as much as I can, I also have{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-black dark:text-white underline"
              href="https://github.com/dev-caspertheghost?tab=repositories"
            >
              many open-source projects
            </a>
            .
          </p>
          <p className="mt-5">
            I have been developing web applications, Discord bots and npm packages for{" "}
            {formatDistanceToNow(started)} and love it! I learn something new almost every day!
            Currently, {"I'm"} focusing on frontend web development, specifically working with
            React.js, TypeScript, CSS, HTML and much more!
          </p>
          <p className="mt-5">
            When {"I'm"} not programming or in school, I enjoy going mountain biking. I also love
            skiing!
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
  const timelineData = await (await import("../data/timeline")).timeline;

  return {
    props: {
      timelineData,
    },
  };
};
