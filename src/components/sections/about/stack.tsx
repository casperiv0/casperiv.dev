"use client";

import { StackItem } from "@ronin/casper";
import Image from "next/image";
import * as HoverCard from "@radix-ui/react-hover-card";
import { m as motion } from "framer-motion";

interface StackSectionProps {
  stackItems: StackItem[];
}

export function StackSection(props: StackSectionProps) {
  return (
    <section className="mx-auto max-w-6xl w-full pb-32 px-5 md:px-0">
      <header>
        <h2 className="text-3xl md:text-4xl font-semibold">Tools I use </h2>
        <h3 className="text-gray-dark text-lg mt-3 font-medium">
          The tools and stack I use daily.{" "}
          <span className="text-base font-normal border-b border-accent/50">
            Hover over an icon for more information.
          </span>
        </h3>
      </header>

      <ul className="flex flex-wrap mt-5">
        {props.stackItems.map((item) => (
          <li key={item.id} className="mt-5 w-20 flex flex-col items-center relative">
            <HoverCard.Root closeDelay={100} openDelay={0}>
              <HoverCard.Trigger asChild>
                <Image
                  placeholder="blur"
                  className="w-16 h-16 rounded-2xl object-cover shadow-lg shadow-gray-300"
                  width={64}
                  height={64}
                  src={item.logo.src}
                  alt={item.name}
                  blurDataURL={item.logo.placeholder.base64}
                />
              </HoverCard.Trigger>
              <HoverCard.Content
                sideOffset={10}
                asChild
                className="z-50 ml-3 border-2 border-secondary/20 bg-primary shadow-md rounded-2xl font-normal p-4 px-3 text-base max-w-sm pointer-events-none"
              >
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: -5 }}>
                  <h3 className="text-lg font-medium">{item.name}</h3>

                  <p className="mt-1 text-gray-dark">{item.description}</p>
                </motion.div>
              </HoverCard.Content>
            </HoverCard.Root>
          </li>
        ))}
      </ul>
    </section>
  );
}
