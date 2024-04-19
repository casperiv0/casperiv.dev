import { batch, get } from "ronin";
import { mergeSeo } from "~/lib/merge-seo";
import { HorizontalScroll } from "~/components/sections/about/horizontal-scroll";
import { Timeline } from "~/components/sections/about/timeline";
import { StackSection } from "~/components/sections/about/stack";
import { AboutHeroSection } from "~/components/sections/about/hero-section";
import { ExperienceSection } from "~/components/sections/about/experience";

export const revalidate = 600; // 10 minutes

async function getAboutPageData() {
  const [timelineItems, stackItems, experienceItems] = await batch(() => [
    get.timelineItems({
      limitedTo: 1000,
      orderedBy: { descending: ["year"] },
    }),
    get.stackItems({
      limitedTo: 1000,
      orderedBy: { descending: ["isFullSizeIcon"] },
    }),
    get.experienceItems.orderedBy.ascending(["position"]),
  ]);

  return {
    stackItems,
    timelineData: timelineItems,
    experienceItems,
  };
}

export const metadata = mergeSeo({
  title: "About",
  description: "Get to know more about me and some of my accomplishments.",
  openGraph: {
    title: "About",
    description: "Get to know more about me and some of my accomplishments.",
  },
  twitter: {
    title: "About",
    description: "Get to know more about me and some of my accomplishments.",
  },
  alternates: {
    canonical: "https://casperiv.dev/about",
  },
});

export default async function AboutPage() {
  const { timelineData, stackItems, experienceItems } = await getAboutPageData();

  return (
    <main className="mt-[clamp(64px,10%,192px)]">
      <AboutHeroSection />
      <ExperienceSection experienceItems={experienceItems} />
      <StackSection stackItems={stackItems} />

      {/* timeline section */}
      <HorizontalScroll
        headerRenderer={
          <>
            <h2 className="text-5xl md:text-6xl font-bold">Timeline</h2>
            <p className="text-lg font-medium max-w-lg mt-5 text-primary/80">
              I try to regularly update the timeline with new accomplishments and achievements.{" "}
              <span className="text-base font-normal border-b border-accent/50">
                Start scrolling down to experience the timeline!
              </span>
            </p>
          </>
        }
      >
        <Timeline timelineData={timelineData} />
      </HorizontalScroll>
    </main>
  );
}
