import "server-only";

import * as Log from "next/dist/build/output/log";
import RSS from "rss";
import fs from "node:fs/promises";
import { allDocuments } from ".contentlayer/generated";
import { formatArticleSlugPath } from "./mdx/get-article-slug";
import { env } from "~/env.mjs";

const OUT_FILE_PATH = "./public/rss.xml";
const SITE_URL = "https://casperiv.dev";

export async function generateRSSFeed() {
  try {
    if (env.NODE_ENV === "development") return;

    const rss = new RSS({
      title: "Casper's Blog",
      site_url: SITE_URL,
      feed_url: `${SITE_URL}/rss.xml`,
    });

    for (const post of allDocuments) {
      // skip archived posts
      if (post.archived) continue;

      rss.item({
        categories: [post.type],
        title: post.title,
        date: post.createdAt,
        author: "Casper Iversen",
        description: post.description || "",
        guid: `${SITE_URL}${formatArticleSlugPath(post)}`,
        url: `${SITE_URL}${formatArticleSlugPath(post)}`,
      });
    }

    const fullRSS = rss.xml({ indent: true });

    await fs.writeFile(OUT_FILE_PATH, fullRSS);

    console.log();
    Log.info(`Generated RSS feed. (${OUT_FILE_PATH})`);
  } catch (err) {
    console.log();
    Log.error("Could not generate the RSS feed.");
    console.log();
    console.error(err);
  }
}
