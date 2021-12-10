import type { Post } from "types/Post";
import Link from "next/link";
import format from "date-fns/format";
import classNames from "clsx";

interface Props {
  isFeatured?: boolean;
  article: Post;
  type: "blog" | "snippets";
}

export function ArticleListItem({ isFeatured, article, type }: Props) {
  const publishedAt = format(new Date(article.createdAt), "dd MMMM yyyy");
  const extraAProps = isFeatured
    ? {
        style: { borderRadius: 3.5 },
        className: "z-20 block p-3 bg-gray-50 dark:bg-blue w-full h-full",
      }
    : {};

  return (
    <li
      className={classNames({
        "my-4 first:mt-0": true,
        "z-10 mt-0 p-1 bg-gradient-to-tr from-[#1150d4] to-[#a245fc] shadow-[#1150d430] dark:shadow-blue rounded-md shadow-lg transition-shadow":
          isFeatured,
      })}
    >
      <Link href={`/${type}/${article.slug}`}>
        <a {...extraAProps}>
          <h3 className="text-xl font-semibold">{article.title}</h3>
          <p className="mt-1 text-neutral-700 dark:text-gray-100">{article.intro}</p>

          {isFeatured ? null : (
            <span className="block mt-1.5 font-normal text-neutral-600 dark:text-gray-300">
              {publishedAt}
            </span>
          )}
        </a>
      </Link>
    </li>
  );
}
