export interface Post {
  title: string;
  createdAt: string;
  updatedAt: string | null;
  slug: string;
  content: string;
  intro: string | null;
  keywords: string | null;
  readingTime: number;
  draft: boolean;
  frontmatter: {
    [key: string]: any;
  };
}
