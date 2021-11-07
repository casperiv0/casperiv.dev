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
      w-full p-1.5 px-2 bg-blue-1 rounded-md border-[1.5px] border-gray-600
      outline-none focus:border-gray-300
      disabled:cursor-not-allowed disabled:opacity-80
      transition-all`,
      { "border-red-500": Boolean(hasError) },
      rest.className,
    )}
  />
));
