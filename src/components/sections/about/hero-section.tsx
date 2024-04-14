"use client";

import * as React from "react";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { Variants, m } from "framer-motion";
import classNames from "classnames";

const wheelVariants = {
  idle: { rotate: 0 },
  active: {
    rotate: 360,
    transition: {
      duration: 2,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
      damping: 10,
      mass: 0.27,
      stiffness: 100,
    },
  },
} satisfies Variants;

const bikeVariants = {
  idle: { scale: 1 },
  active: {
    scale: [1, 1.03, 1],
    transition: {
      duration: 1.25,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
} satisfies Variants;

export function AboutHeroSection() {
  const startDate = new Date("2019-08-08");
  const formattedStartDate = formatDistanceToNow(startDate);
  const [bikeState, setBikeState] = React.useState<keyof typeof wheelVariants>("idle");

  return (
    <section className="mx-auto max-w-6xl w-full pb-32 px-5 md:px-0 flex items-end justify-between">
      <div className="max-w-xl">
        <h1 className="font-poppins font-bold text-5xl md:text-6xl relative max-w-fit">
          Who am I?
        </h1>

        <div className="max-w-xl font-medium">
          <p className="mt-10">
            Hey there! {"Let's"} get straight to it! {"I'm"} Casper, a motivated web developer and
            student based in Belgium. I am an 18-year-old developer building cutting-edge web
            applications using the latest technologies such as React.js, Next.js, TypeScript, and
            much more for {formattedStartDate} now.
          </p>

          <p className="mt-4">
            I started back when I was a 14-year-old kid that had an extreme passion for creating
            stuff, building simple static web pages and expanding my CSS knowledge by recreating
            awesome designs. {"I've"} continued to grow and evolve as a developer, taking on new
            challenges and learning the latest technologies along the way.
          </p>

          <p className="mt-4">
            When {"I'm"} not in full-on developer mode, you will find me blasting down a dirt track
            or the streets of my city. {"There's"} nothing quite like the rush of adrenaline that
            comes from going ultra-fast, and for me, {"there's"} no better way to experience that
            than on my trusty mountain bike. I also have a deep appreciation for music, listening to
            a wide range of genres that I thoroughly enjoy.
          </p>
        </div>
      </div>

      <m.svg
        animate={bikeState}
        variants={bikeVariants}
        className={classNames("hidden md:block cursor-pointer drop-shadow-xl", {
          "opacity-50": bikeState === "idle",
        })}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 400 210"
        width="450"
        height="210"
        xmlSpace="preserve"
        onClick={() => setBikeState(bikeState === "idle" ? "active" : "idle")}
      >
        <m.g variants={wheelVariants}>
          <ellipse fill="#353030" cx="57.31" cy="138.91" rx="57.31" ry="57.09" />
          <line
            opacity="0.51"
            fill="none"
            strokeWidth="2"
            stroke="#e97451"
            x1="86.48"
            y1="188.06"
            x2="69.22"
            y2="160.74"
          />
        </m.g>
        <m.g variants={wheelVariants}>
          <ellipse fill="#353030" cx="342.69" cy="138.91" rx="57.31" ry="57.09" />
          <line
            opacity="0.51"
            fill="none"
            strokeWidth="2"
            stroke="#e97451"
            x1="371.86"
            y1="188.06"
            x2="354.6"
            y2="160.74"
          />
        </m.g>
        <polygon
          fill="#101010"
          points="150.47,24.98 184.85,84.3 219.24,143.63 150.47,143.63 81.69,143.63 116.08,84.3 	"
        />
        <polygon
          fill="#101010"
          className="fill-accent transition outline-none"
          points="246.58,143.63 206.99,75.33 167.41,7.04 246.58,7.04 325.75,7.04 286.16,75.33 	"
        />
        <line
          fill="none"
          stroke="#353030"
          strokeWidth="3"
          strokeMiterlimit="10"
          x1="138.57"
          y1="7.04"
          x2="57.31"
          y2="7.04"
        />
        <ellipse fill="#353030" cx="345.63" cy="7.04" rx="7.07" ry="7.04" />
      </m.svg>
    </section>
  );
}
