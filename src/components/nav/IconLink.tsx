import { useSSRSafeId } from "@react-aria/ssr";
import * as React from "react";

type AProps = JSX.IntrinsicElements["a"];
interface Props extends AProps {
  children: Omit<React.ReactSVGElement, "ref">;
}

export function IconLink({ children, ...rest }: Props) {
  const githubId = useSSRSafeId();

  const element = React.cloneElement(children, {
    "aria-labelledby": githubId,
    width: 21,
    height: 21,
    className:
      "group-hover:text-white pointer-events-none z-10 fill-current text-neutral-800 dark:text-gray-200",
  });

  return (
    <a
      className="group grid place-items-center w-10 h-10 relative overflow-hidden rounded-md"
      id={githubId}
      {...rest}
    >
      <div className="absolute inset-0 transition-opacity duration-200 opacity-0 group-hover:opacity-100 bg-gradient-to-tr hover:from-[#1150d4] hover:to-[#a245fc] z-0" />
      {element}
    </a>
  );
}
