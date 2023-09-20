import format from "date-fns/format";
import classNames from "clsx";
import type { BlogPost, Project, CodeSnippet } from "contentlayer/generated";
import { getArticleSlug } from "~/lib/mdx/get-article-slug";
import { Link } from "../link";
import NextLink from "next/link";
import { ArrowRight } from "../icons/arrow-right";

interface Props {
  isFeatured?: boolean;
  article: BlogPost | CodeSnippet | Project;
  type: "blog" | "snippets";
}

export function ArticleListItem({ isFeatured, article, type }: Props) {
  const publishedAt = format(new Date(article.createdAt), "dd MMMM yyyy");
  const extraAProps = isFeatured
    ? {
        className: "z-20 block p-4 w-full h-full border-accent border-2 transition rounded-2xl",
      }
    : {};

  return (
    <li
      className={classNames("my-4 first:mt-0 group relative", {
        "z-10 mt-0 py-0.5": isFeatured,
      })}
    >
      {isFeatured ? (
        <Link
          size="square"
          className="absolute -top-3 right-3.5 group-hover:scale-125 group-hover:-rotate-45 group-hover:border-accent"
          intent="secondary"
          href={`/blog/${getArticleSlug(article)}`}
        >
          <ArrowRight width={20} height={20} />
        </Link>
      ) : null}

      <NextLink href={`/${type}/${getArticleSlug(article)}`} {...extraAProps}>
        <h2
          className={classNames(
            "font-semibold font-poppins text-[1.25rem] transition-colors max-w-fit",
            { "border-accent/10 group-hover:border-b-accent border-b-2": !isFeatured },
          )}
        >
          {article.title}
        </h2>

        <p className="mt-1 md:mt-2 text-base md:text-lg text-gray-dark max-w-xl font-inter">
          {article.description}
        </p>

        {isFeatured ? null : (
          <span className="block mt-1.5 font-normal text-gray-light">{publishedAt}</span>
        )}
      </NextLink>
    </li>
  );
}
