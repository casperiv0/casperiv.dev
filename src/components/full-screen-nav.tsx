"use client";

import { Variants, m as motion } from "framer-motion";
import Link from "next/link";
import { socialLinks } from "./sections/contact/contact-section";
import { X } from "@phosphor-icons/react";

const links = [
  {
    name: "Home",
    pathname: "/",
  },
  {
    name: "About",
    pathname: "/about",
  },
  {
    name: "Contact",
    pathname: "/#contact",
  },
  {
    name: "Projects",
    pathname: "/projects",
  },
  {
    name: "Blog",
    pathname: "/blog",
  },
  {
    name: "Code Snippets",
    pathname: "/snippets",
  },
  {
    name: "Sponsors",
    pathname: "/thanks",
  },
  {
    name: "Gallery",
    pathname: "/gallery",
  },
];

interface FullScreenNavProps {
  isOpen: boolean;
  onClose(): void;
}

const variants: Variants = {
  open: {
    height: "100%",
    pointerEvents: "all",
    opacity: 1,
  },
  closed: {
    height: 0,
    pointerEvents: "none",
    opacity: 0,
  },
};

export function FullScreenNav(props: FullScreenNavProps) {
  return (
    <motion.div
      initial="closed"
      animate={props.isOpen ? "open" : "closed"}
      variants={variants}
      className="bg-secondary text-primary fixed top-0 left-0 w-screen min-h-screen py-10 md:py-32 overflow-auto"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-0">
        <div className="flex flex-row justify-between">
          <ul className="flex flex-col gap-y-8">
            {links.map((link) => (
              <li key={link.pathname}>
                <Link
                  onClick={props.onClose}
                  className="text-4xl sm:text-5xl md:text-6xl font-bold hover:text-accent transition"
                  href={link.pathname}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <motion.button
            aria-label="Close Menu"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.92 }}
            onClick={props.onClose}
            className="h-16 group"
          >
            <X className="h-16 w-16 group-hover:fill-accent transition" />
          </motion.button>
        </div>

        <ul className="mt-20 md:mt-32 flex flex-row gap-10">
          {socialLinks.map((link) => (
            <li key={link.url}>
              <Link aria-label={link.name} onClick={props.onClose} href={link.url}>
                <link.icon className="w-9 h-9 sm:w-12 sm:h-12 md:w-16 md:h-16 hover:fill-accent transition" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
