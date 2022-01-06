import NextLink from "next/link";
import classNames from "clsx";

export function Link({
  menuOpen,
  isActive,
  ...props
}: JSX.IntrinsicElements["a"] & { isActive: boolean; menuOpen: boolean }) {
  return (
    <NextLink href={props.href!}>
      <a
        {...(props as any)}
        className={classNames("p-2 px-3 duration-200 transition-colors rounded-md", {
          "my-2 block": menuOpen,
          "dark:bg-blue-1/80 dark:shadow-md font-medium": isActive,
        })}
      >
        {props.children}
      </a>
    </NextLink>
  );
}
