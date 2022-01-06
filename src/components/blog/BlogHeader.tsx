import { useSSRSafeId } from "@react-aria/ssr";
import format from "date-fns/format";
import { useViews } from "lib/hooks/useViews";
import { Clock, Eye } from "react-bootstrap-icons";
import { Post } from "types/Post";

interface Props {
  post: Post;
}

export const BlogHeader = ({ post }: Props) => {
  const views = useViews();
  const publishDateFull = format(new Date(post.createdAt), "LLLL dd, yyyy");
  const viewsText = views === 1 ? "view" : "views";

  const viewsId = useSSRSafeId();
  const readTimeId = useSSRSafeId();

  return (
    <header className="pb-2 pt-5 border-b-2 border-blue-1">
      <h1 className="mb-3 text-3xl font-bold md:text-4xl">{post.title}</h1>
      <div style={{ scrollbarWidth: "thin" }} className="flex gap-2 overflow-x-auto md:gap-5">
        <p className="font-medium min-w-max">{publishDateFull}</p>
        {post.readingTime ? (
          <p className="flex items-center gap-2 min-w-[120px]">
            <Clock aria-labelledby={readTimeId} className="text-gray-400" />{" "}
            <span id={readTimeId}>{post.readingTime}</span>
          </p>
        ) : null}

        <p className="flex items-center gap-2 min-w-[100px]">
          <Eye aria-labelledby={viewsId} className="text-gray-400" />{" "}
          {views ? Intl.NumberFormat().format(views) : "—"} <span id={viewsId}>{viewsText}</span>
        </p>
      </div>
    </header>
  );
};
