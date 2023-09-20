"use client";

import { Link } from "~/components/link";
import { m as motion, useScroll, useSpring, useTransform } from "framer-motion";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { ArrowRight } from "@phosphor-icons/react";

export function HeroSection() {
  const { scrollYProgress } = useScroll();
  const startDate = new Date("2019-08-08");
  const formattedStartDate = formatDistanceToNow(startDate);

  const x = useTransform(scrollYProgress, [0, 0.5], [0, 800]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [0, 720]);

  const physics = { damping: 10, mass: 0.27, stiffness: 100 };
  const spring = useSpring(rotate, physics);

  function handlePolygonClick() {
    window.scrollTo({
      behavior: "smooth",
      top: window.innerHeight,
    });
  }

  return (
    <section className="min-h-[calc(100vh-60px)] flex flex-col justify-between gap-y-20 overflow-x-hidden pb-32 md:pb-0">
      <div className="px-5 md:px-0 mt-12 flex flex-col md:flex-row w-full max-w-6xl mx-auto min-h-[70vh] tall:min-h-[50vh] md:items-center gap-5 md:justify-between">
        <h1 className="text-[clamp(2.5rem,10vw,5rem)] font-bold leading-tight w-full md:min-w-[530px]">
          A bright
          <br /> frontend web <br /> developer <br /> from Belgium
        </h1>

        <div className="mt-5 md:mt-0 text-base sm:text-lg md:text-xl max-w-lg w-fit font-medium font-inter text-gray-light">
          <p>
            {"I'm"} a highly motivated developer and student from Belgium. I adore building
            accessible, responsive and performant code. Furthermore, {"I'm"} also a huge fan of
            open-source.
            <br /> <br />I have been building web apps for {formattedStartDate} and still love it.
            Learning something new every week. Currently focused on Frontend Web Development and a
            bit of Web Design.
          </p>

          <div className="flex items-center gap-3 mt-7 w-full">
            <Link extras="icon" intent="primary" href="/about">
              About Me
              <ArrowRight className="ml-1.5" width={20} height={20} />
            </Link>
            <Link intent="secondary" href="/projects">
              Projects
            </Link>
          </div>
        </div>
      </div>

      <motion.svg
        style={{ x }}
        className="mx-auto hidden md:block"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 400 210"
        width="450"
        height="260"
        xmlSpace="preserve"
      >
        <motion.g origin="center" style={{ rotate: spring }}>
          <ellipse fill="#353030" cx="57.31" cy="138.91" rx="57.31" ry="57.09" />
          <line
            strokeWidth="2"
            opacity="0.51"
            fill="none"
            stroke="#e97451"
            x1="86.48"
            y1="188.06"
            x2="69.22"
            y2="160.74"
          />
        </motion.g>
        <motion.g origin="center" style={{ rotate: spring }}>
          <ellipse fill="#353030" cx="342.69" cy="138.91" rx="57.31" ry="57.09" />
          <line
            strokeWidth="2"
            opacity="0.51"
            fill="none"
            stroke="#e97451"
            x1="371.86"
            y1="188.06"
            x2="354.6"
            y2="160.74"
          />
        </motion.g>
        <polygon
          fill="#101010"
          points="150.47,24.98 184.85,84.3 219.24,143.63 150.47,143.63 81.69,143.63 116.08,84.3 	"
        />
        <motion.polygon
          onClick={handlePolygonClick}
          animate={{ scale: [1, 1.02] }}
          transition={{ repeat: Infinity, repeatDelay: 0.5, repeatType: "reverse", duration: 1 }}
          whileTap={{ scale: 0.9 }}
          fill="#101010"
          className="hover:fill-accent transition outline-none cursor-pointer"
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
        <motion.ellipse
          transition={{ repeat: Infinity, repeatDelay: 0.5, repeatType: "reverse", duration: 1 }}
          animate={{ scale: [1, 1.2] }}
          fill="#353030"
          cx="345.63"
          cy="7.04"
          rx="7.07"
          ry="7.04"
        />
      </motion.svg>
    </section>
  );
}
