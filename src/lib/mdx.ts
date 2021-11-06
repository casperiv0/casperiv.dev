import readingTime from "reading-time";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { bundleMDXFile } from "mdx-bundler";
import { Post } from "types/Post";

import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export function getSlugsFromDir(dir: string): string[] {
  return readdirSync(dir);
}

export type Fields<T> = (keyof T)[];
type Types = "posts" | "snippets" | "case-studies";

/**
 * @param type The type of item (blog post, snippet, case study)
 * @param includeDrafts Defaults to `false`
 */
export async function getAllItems<T extends Post>(
  type: Types,
  includeDrafts = false,
): Promise<T[]> {
  const slugs = getSlugsFromDir(join(process.cwd(), "src", "data", type)).filter((v) =>
    /\.mdx?$/.test(v),
  );

  let posts = await Promise.all(slugs.map(async (slug) => getItemBySlug<T>(slug, type)));
  posts = posts.sort((post1, post2) =>
    new Date(post1.createdAt) > new Date(post2.createdAt) ? -1 : 1,
  );

  if (!includeDrafts) {
    posts = posts.filter((v) => !v.draft);
  }

  return posts as unknown as Pick<T, keyof T>[];
}

export async function getItemBySlug<T = unknown>(slug: string, type: Types): Promise<T> {
  const dir = join(process.cwd(), "src", "data", type);
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(dir, `${realSlug}.mdx`);

  const { code: content, frontmatter } = await bundleMDXFile(fullPath, {
    xdmOptions: (options) => {
      options.remarkPlugins = [...(options?.remarkPlugins ?? []), remarkGfm];

      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        rehypeSlug,
        rehypeCodeTitles,
        rehypeAutolinkHeadings,
      ];

      return options;
    },
    esbuildOptions: (options) => {
      options.loader = {
        ...options.loader,
        ".png": "dataurl",
      };

      return options;
    },
  });

  const { text } = readingTime(content);

  return {
    slug: realSlug,
    content,
    readingTime: text,
    frontmatter,
    createdAt: frontmatter.createdAt,
    intro: frontmatter.intro,
    keywords: frontmatter.keywords ?? "",
    title: frontmatter.title,
    updatedAt: frontmatter.updatedAt ?? null,
    draft: frontmatter.draft ?? false,
  } as any as T;
}
