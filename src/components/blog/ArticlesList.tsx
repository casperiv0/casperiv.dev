import Link from "next/link";
import { Post } from "types/Post";

interface Props {
  articles: Post[];
  type: "blog" | "snippets";
}

export const ArticlesList = ({ type, articles }: Props) => {
  return (
    <ul className="flex flex-col mt-5">
      {articles.map((article) => (
        <li className="my-3.5 first:mt-0" key={article.slug}>
          <Link href={`/${type}/${article.slug}`}>
            <a>
              <h3 className="text-xl font-semibold">{article.title}</h3>
              <p className="mt-1 text-gray-300">{article.intro}</p>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
