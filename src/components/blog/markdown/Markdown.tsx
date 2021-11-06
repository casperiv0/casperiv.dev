import * as React from "react";
import dynamic from "next/dynamic";
import { getMDXComponent } from "mdx-bundler/client";
import styles from "styles/blog.module.scss";

const components = {
  a: dynamic(async () => (await import("./Link")).Link),
  code: dynamic(async () => (await import("./Code")).MDCode),
  Alert: dynamic(async () => (await import("./Alert")).Alert),
  Image: dynamic(async () => (await import("next/image")).default),
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
