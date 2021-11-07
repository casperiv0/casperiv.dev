import { Post } from "types/Post";
import { BlogFooter } from "./BlogFooter";
import { BlogHeader } from "./BlogHeader";
import { Markdown } from "./markdown/Markdown";

interface Props {
  article: Post;
}

export const Article = ({ article }: Props) => {
  return (
    <article className="pb-5">
      <BlogHeader post={article} />

      <Markdown content={article.content} />

      <BlogFooter post={article} />
    </article>
  );
};
