import Head from "next/head";
import Link from "next/link";
import { Layout } from "components/Layout";
import { getAllItems } from "lib/mdx";
import { GetStaticProps } from "next";
import { Post } from "types/Post";

export default function Blog({ posts }: { posts: Post[] }) {
  return (
    <Layout>
      <Head>
        <title>Blog - Casper Iversen</title>
      </Head>

      <h1 className="text-3xl font-bold capitalize md:text-4xl">Blog Posts</h1>

      <ul className="flex flex-col mt-5">
        {posts.map((post) => (
          <li className="my-3 first:mt-0" key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <a>
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="mt-1 text-gray-300">{post.intro}</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllItems<Post>("posts");

  return {
    props: { posts },
  };
};
