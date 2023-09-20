"use client";

import * as React from "react";
import type { BlogPost, Project, CodeSnippet } from "contentlayer/generated";
import format from "date-fns/format";
import { useViews } from "~/lib/hooks/use-views";
import { getArticleSlug } from "~/lib/mdx/get-article-slug";
import type { Project as RONINProject } from "@ronin/casper";
import { Link } from "../link";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import * as HoverCard from "@radix-ui/react-hover-card";
import { m } from "framer-motion";
import { Balancer } from "react-wrap-balancer";
import { ArrowUpRight, Clock, Eye } from "@phosphor-icons/react";

interface Props extends Partial<RONINProject> {
  post: BlogPost | CodeSnippet | Project;
}

export function BlogHeader({ post, projectURL, npmURL, codeURL }: Props) {
  const views = useViews(getArticleSlug(post));
  const publishDateFull = format(new Date(post.createdAt), "LLLL dd, yyyy");
  const viewsText = views === 1 ? "view" : "views";
  const readingTime = post.readingTime || (post as any).computedReadingTime;
  const updatedAtFormatted = post.updatedAt
    ? formatDistanceToNow(new Date(post.updatedAt), { addSuffix: true })
    : null;

  const viewsId = React.useId();
  const readTimeId = React.useId();

  return (
    <header className="bg-secondary text-primary py-14 mb-6">
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(post.structuredData)}
      </script>

      <div className="max-w-3xl mx-auto px-5 md:px-0">
        <div className="border-b-2 border-accent/70 mb-5 pb-5 flex flex-col md:flex-row md:justify-between">
          <div>
            <h1 className="mb-4 text-2xl font-bold md:text-3xl font-title">
              <Balancer>{post.title}</Balancer>
            </h1>
            <p className="text-gray-extralight">{post.description}</p>
          </div>

          <div className="flex flex-col gap-2 items-end">
            {projectURL ? (
              <Link extras="icon" size="sm" intent="secondary-light" href={projectURL}>
                Open Project
                <ArrowUpRight className="w-4 h-4 fill-primary" />
              </Link>
            ) : null}
            {npmURL ? (
              <Link extras="icon" size="sm" intent="secondary-light" href={npmURL}>
                View on npm
                <ArrowUpRight className="w-4 h-4 fill-primary" />
              </Link>
            ) : null}
            {codeURL ? (
              <Link extras="icon" size="sm" intent="secondary-light" href={codeURL}>
                View on GitHub
                <ArrowUpRight className="w-4 h-4 fill-primary" />
              </Link>
            ) : null}
          </div>
        </div>

        <div style={{ scrollbarWidth: "thin" }} className="flex gap-6 overflow-x-auto">
          <HoverCard.Root open={!post.updatedAt ? false : undefined} closeDelay={100} openDelay={0}>
            <HoverCard.Trigger asChild>
              <p className="cursor-default min-w-fit">
                <time dateTime={new Date(post.createdAt).toISOString()}>{publishDateFull}</time>
              </p>
            </HoverCard.Trigger>
            <HoverCard.Content
              asChild
              sideOffset={5}
              align="center"
              className="border-2 border-gray-light bg-gray-dark shadow-md rounded-2xl font-normal p-2 px-3 text-base max-w-sm"
            >
              <m.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: -5 }}>
                {post.updatedAt ? (
                  <time
                    className="text-sm font-normal ml-2 select-none cursor-default"
                    dateTime={new Date(post.updatedAt).toISOString()}
                  >
                    Updated {updatedAtFormatted}
                  </time>
                ) : null}
              </m.div>
            </HoverCard.Content>
          </HoverCard.Root>

          {readingTime ? (
            <p className="flex items-center gap-2 min-w-fit">
              <Clock aria-labelledby={readTimeId} className="fill-gray-extralight" />{" "}
              <span id={readTimeId}>{readingTime}</span>
            </p>
          ) : null}

          <p className="flex items-center gap-2 min-w-fit">
            <Eye aria-labelledby={viewsId} className="fill-gray-extralight" />{" "}
            {views ? Intl.NumberFormat().format(views) : "—"} <span id={viewsId}>{viewsText}</span>
          </p>
        </div>
      </div>
    </header>
  );
}
