import * as React from "react";
import NextLink from "next/link";

export const Link = (props: JSX.IntrinsicElements["a"]) => {
  const { children, ...rest } = props;
  const href = rest.href as string;

  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href}>
      <a {...rest}>{children}</a>
    </NextLink>
  );
};
