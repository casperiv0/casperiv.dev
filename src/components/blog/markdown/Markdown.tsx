import * as React from "react";
import { getMDXComponent } from "mdx-bundler/client";
import styles from "styles/blog.module.scss";

import { Link } from "./Link";
import { MDCode } from "./Code";
import { Info } from "./Info";
import Image from "next/image";

// importing this with next/dynamic will have some flickers..
const components = {
  a: Link,
  code: MDCode,
  Info,
  Image,
};

interface Props {
  content: string;
}

export const Markdown = ({ content }: Props) => {
  const Component = React.useMemo(() => getMDXComponent(content), [content]);

  return (
    <main className={["prose dark:prose-dark max-w-none", styles.reactMarkdown].join(" ")}>
      <Component components={components as any} />
    </main>
  );
};
