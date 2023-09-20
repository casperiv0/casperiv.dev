"use client";

import { Link } from "~/components/link";
import { allBlogPosts } from "contentlayer/generated";
import compareDesc from "date-fns/compareDesc";
import { getArticleSlug } from "~/lib/mdx/get-article-slug";
import { ArrowRight } from "../icons/arrow-right";

export function LatestBlogPosts() {
  const latestThreeBlogPosts = allBlogPosts
    .sort((a, b) => {
      return compareDesc(new Date(a.createdAt), new Date(b.createdAt));
    })
    .slice(0, 4);

  return (
    <section className="mx-auto max-w-6xl w-full py-32 px-5 md:px-0">
      <header className="flex flex-col gap-y-5 sm:flex-row md:items-center justify-between">
        <h2 className="font-poppins font-bold text-5xl md:text-6xl relative max-w-fit">
          Latest blog posts
        </h2>

        <Link className="max-w-fit" intent="secondary" extras="icon" href="/blog">
          Browse all blog posts
          <ArrowRight className="ml-1.5" width={20} height={20} />
        </Link>
      </header>

      <ul className="mt-20 flex flex-col gap-5">
        {latestThreeBlogPosts.map((blogPost) => (
          <li key={getArticleSlug(blogPost)} className="flex justify-between group">
            <Link
              size="none"
              className="w-full"
              intent="none"
              href={`/blog/${getArticleSlug(blogPost)}`}
            >
              <h3 className="font-semibold font-poppins text-xl md:text-2xl transition-colors border-accent/10 group-hover:border-b-accent border-b-2 max-w-fit">
                {blogPost.title}
              </h3>

              <p className="mt-1 md:mt-2 text-base md:text-lg text-gray-light max-w-lg font-inter">
                {blogPost.description}
              </p>
            </Link>

            <Link
              aria-label="View full blog post"
              size="square"
              className="group-hover:scale-125 group-hover:-rotate-45 group-hover:border-accent"
              intent="secondary"
              href={`/blog/${getArticleSlug(blogPost)}`}
            >
              <ArrowRight width={20} height={20} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
