import * as React from "react";
import classNames from "clsx";

export const Button = React.forwardRef<HTMLButtonElement, JSX.IntrinsicElements["button"]>(
  (props, ref) => (
    <button
      {...props}
      className={classNames(
        "text-white-800 bg-gray-400 hover:bg-gray-500/80 dark:bg-blue-1 dark:hover:bg-gray-700/60",
        "p-1.5 px-3 duration-200 transition-colors rounded-md",
        "disabled:cursor-not-allowed disabled:opacity-80",
        props.className,
      )}
      ref={ref}
    />
  ),
);
