import * as React from "react";
import classNames from "clsx";

type Props = JSX.IntrinsicElements["textarea"] & {
  hasError?: boolean | string;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ hasError, ...rest }, ref) => (
    <textarea
      ref={ref}
      {...rest}
      className={classNames(
        `
      w-full p-1.5 px-2 bg-blue-1 rounded-md border-[1.5px] border-gray-600
      outline-none focus:border-gray-300
      disabled:cursor-not-allowed disabled:opacity-80
      transition-colors resize-y`,
        { "border-red-500": Boolean(hasError) },
        rest.className,
      )}
    />
  ),
);
