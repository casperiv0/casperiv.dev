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
      bg-gray-100 border-neutral-700 focus:border-neutral-800 hover:border-neutral-800
      w-full min-h-[3rem] p-1.5 px-2 dark:bg-blue-1 rounded-md border-[1.5px] dark:border-gray-600
      dark:focus:border-gray-300
      disabled:cursor-not-allowed disabled:opacity-80
      transition-colors resize-y`,
        { "border-red-500": Boolean(hasError) },
        rest.className,
      )}
    />
  ),
);
