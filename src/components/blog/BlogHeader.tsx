import format from "date-fns/format";
import { useViews } from "lib/useViews";
import { Clock, Eye } from "react-bootstrap-icons";
import { Post } from "types/Post";

interface Props {
  post: Post;
}

export const BlogHeader = ({ post }: Props) => {
  const views = useViews();
  const publishDateFull = format(new Date(post.createdAt), "LLLL dd, yyyy");
  const viewsText = views === 1 ? "view" : "views";

  return (
    <header className="pb-2 border-b-2 border-blue-1">
      <h1 className="mb-3 text-3xl font-bold md:text-4xl">{post.title}</h1>
      <div className="flex gap-5">
        <p className="font-medium">{publishDateFull}</p>
        {post.readingTime ? (
          <p className="flex items-center gap-2">
            <Clock className="text-gray-400" /> {post.readingTime}
          </p>
        ) : null}

        <p className="flex items-center gap-2">
          <Eye className="text-gray-400" /> {views ? Intl.NumberFormat().format(views) : "—"}{" "}
          {viewsText}
        </p>
      </div>
    </header>
  );
};
