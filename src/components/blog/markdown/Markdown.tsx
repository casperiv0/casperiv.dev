import * as React from "react";
import dynamic from "next/dynamic";
import { getMDXComponent } from "mdx-bundler/client";
import styles from "styles/blog.module.scss";

const components = {
  a: dynamic(async () => (await import("./Link")).Link),
  code: dynamic(async () => (await import("./Code")).MDCode),
  //   Image: dynamic(() => import("./Image").then((v) => v.MdImage), {
  //     loading: () => <>Loading text..</>,
  //   }),
  //   Alert: dynamic(() => import("./Alert").then((v) => v.Alert), {
  //     loading: () => <>Loading text..</>,
  //   }),
};

interface Props {
  content: string;
}

export const Markdown = ({ content }: Props) => {
  const Component = React.useMemo(() => getMDXComponent(content), [content]);

  return (
    <main className={styles.reactMarkdown}>
      <Component components={components as any} />
    </main>
  );
};
