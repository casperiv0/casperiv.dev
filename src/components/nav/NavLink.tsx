import NextLink from "next/link";
import classNames from "clsx";

export function NavLink({
  menuOpen,
  isActive,
  ...props
}: JSX.IntrinsicElements["a"] & { isActive: boolean; menuOpen: boolean }) {
  return (
    <NextLink href={props.href!}>
      <a
        {...props}
        className={classNames("py-2 px-3 duration-200 transition rounded-md", {
          "my-2 block ": menuOpen,
          "bg-secondary text-white hover:brightness-125 font-medium": isActive,
          "hover:bg-secondary hover:text-white": !isActive,
        })}
      >
        {props.children}
      </a>
    </NextLink>
  );
}
