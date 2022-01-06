import type * as React from "react";

type DivProps = JSX.IntrinsicElements["div"];

interface Props extends DivProps {
  title?: string;
  color?: string;
}

export function Info({ children, title, color, ...rest }: Props) {
  const borderColor = color || "#60A5FA";

  return (
    <div
      {...rest}
      style={{ borderColor, ...rest.style }}
      className="p-2 px-4 my-3 mb-5 text-lg border-l-[3px] rounded-md rounded-l-none shadow bg-gray-300/80 dark:bg-blue-1/60"
    >
      {title ? (
        <h1
          style={{
            fontSize: "1.35rem",
            lineHeight: "1.75rem",
            margin: "10px 0",
            fontWeight: 700,
          }}
          className="dark:text-gray-100  text-neutral-900"
        >
          {title}
        </h1>
      ) : null}

      <span>{children}</span>
    </div>
  );
}
