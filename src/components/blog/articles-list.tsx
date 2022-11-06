import { Post } from "types/post";
import { ArticleListItem } from "./articles-list-item";

interface Props {
  articles: Post[];
  type: "blog" | "snippets";
}

export function ArticlesList({ type, articles }: Props) {
  return (
    <ul className="flex flex-col mt-5">
      {articles.map((article) => (
        <ArticleListItem article={article} key={article.slug} type={type} />
      ))}
    </ul>
  );
}