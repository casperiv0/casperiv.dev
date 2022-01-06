import Link from "next/link";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export const HeroSection = () => {
  // this is roughly the date I started programing according to GitHub 😅!
  const started = new Date("2019-08-08");

  return (
    <section className="flex flex-col justify-center mx-auto min-h-[40em]" id="top">
      <div>
        <h4 className="text-2xl sm: md:text-3xl mb-3 text-neutral-700 dark:text-[#CDD6E2]">
          <span className="inline-block animate-wave" aria-label="Waving" role="img">
            👋
          </span>{" "}
          Hello! I am
        </h4>
        <h1 className="text-5xl font-bold sm:text-6xl md:text-7xl lg:text-8xl">
          Casper<span className="hidden xs:inline"> Iversen</span>,
        </h1>
        <h2 className="mt-2 text-4xl font-medium sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl">
          and {"I'm"} a web developer.
        </h2>
      </div>

      <p className="max-w-3xl mt-8 text-neutral-800 dark:text-gray-300 md:text-xl">
        I am an extremely motivated programmer and student from Belgium. {"I'm"} a self-taught
        developer and have been programming for {formatDistanceToNow(started)} and still learning
        new technologies every week, mostly focusing on frontend related technologies.{" "}
        <Link href="/about">
          <a className="font-medium underline">Read more.</a>
        </Link>
      </p>
    </section>
  );
};
