"use client";

import type { BlogPost, Project, CodeSnippet } from "contentlayer/generated";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { usePathname } from "next/navigation";

interface Props {
  post: BlogPost | CodeSnippet | Project;
}

const types = {
  "/blog/": "posts",
  "/snippets/": "snippets",
  "/project/": "project",
};

export function BlogFooter({ post }: Props) {
  const pathname = usePathname();
  const type = findTypeByPathname(pathname);
  const startDate = new Date("2019-08-08");
  const formattedStartDate = formatDistanceToNow(startDate);

  const GITHUB_REPO_LINK = "https://github.com/casperiv0/casperiv.dev/edit/main/src/data";
  const link = `${GITHUB_REPO_LINK}/${post._raw.flattenedPath}.mdx`;

  return type ? (
    <footer className="pt-12 mb-5 max-w-3xl mx-auto">
      <div className="w-full pb-2 border-b border-secondary flex justify-end">
        <a target="_blank" rel="noreferrer noopener" className="hover:underline" href={link}>
          Edit On GitHub
        </a>
      </div>

      <div className="mt-4">
        <h5 className="font-medium text-lg">Article written by Casper Iversen</h5>

        <p className="mt-2">
          Casper is an 18-year-old web developer from Belgium. He adores building accessible,
          responsive and performant code. Furthermore, He is also a huge fan of open-source. Casper
          has been building web apps for {formattedStartDate} and loves it. Learning something new
          every week. Currently focused on Frontend Web Development and a bit of Web Design.
        </p>
      </div>
    </footer>
  ) : null;
}

function findTypeByPathname(pathname: string | null) {
  if (!pathname) return null;
  return Object.entries(types).find(([key]) => pathname.startsWith(key))?.[1];
}
