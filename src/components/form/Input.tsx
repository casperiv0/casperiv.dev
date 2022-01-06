import * as React from "react";
import classNames from "clsx";

type Props = JSX.IntrinsicElements["input"] & {
  hasError?: boolean | string;
};

export const Input = React.forwardRef<HTMLInputElement, Props>(({ hasError, ...rest }, ref) => (
  <input
    ref={ref}
    {...rest}
    className={classNames(
      `
      dark:bg-blue-1 bg-gray-300/80
      w-full p-1.5 px-2 rounded-md border-[1.75px]
      focus:outline-none
      disabled:cursor-not-allowed disabled:opacity-80
      transition-colors`,
      hasError
        ? "border-red-500 focus:border-red-700"
        : `
      dark:border-gray-600   dark:focus:border-gray-300/80
      border-gray-500   focus:border-gray-800`,
      rest.className,
    )}
  />
));
