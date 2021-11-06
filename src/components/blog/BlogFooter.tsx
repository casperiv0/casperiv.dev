import { Post } from "types/Post";

interface Props {
  post: Post;
}

export const BlogFooter = ({ post }: Props) => {
  const GITHUB_REPO_LINK =
    "https://github.com/Dev-CasperTheGhost/caspertheghost.me/edit/main/src/data/posts";
  const link = `${GITHUB_REPO_LINK}/${post.slug}.mdx`;

  return (
    <footer className="flex justify-end pt-10 pb-2 mb-10 border-b-2 border-blue-1">
      <a className="hover:underline" href={link}>
        Edit On GitHub
      </a>
    </footer>
  );
};
