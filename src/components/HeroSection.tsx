import Link from "next/link";
import { Age } from "./Age";

export const HeroSection = () => {
  return (
    <section className="flex flex-col justify-center mx-auto h-[40em]" id="top">
      <div>
        <h4 className="text-2xl sm: md:text-3xl mb-3 text-[#CDD6E2]">
          <span className="inline-block animate-wave" aria-label="Waving" role="img">
            👋
          </span>{" "}
          Hello! I am
        </h4>
        <h1 className="text-6xl font-bold md:text-7xl lg:text-8xl">
          Casper<span className="hidden sm:inline"> Iversen</span>,
        </h1>
        <h2 className="mt-5 text-4xl font-bold md:text-5xl lg:text-6xl">
          and {"I'm"} a web developer.
        </h2>
      </div>

      <p className="max-w-3xl mt-8 text-gray-300 md:text-xl">
        I am a <Age /> year old programmer and student based in Belgium. {"I'm"} a self taught
        developer and I have been programming for about 2 years and still learning new technologies
        every day, mostly focusing on frontend related technologies.{" "}
        <Link href="/about">
          <a className="font-medium underline">Read more.</a>
        </Link>
      </p>
    </section>
  );
};
