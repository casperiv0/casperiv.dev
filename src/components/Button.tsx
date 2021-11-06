import * as React from "react";
import classNames from "clsx";

export const Button = React.forwardRef<HTMLButtonElement, JSX.IntrinsicElements["button"]>(
  (props, ref) => (
    <button
      {...props}
      className={classNames(
        "p-1.5 px-3 duration-200 transition-colors rounded-md hover:bg-blue-1",
        props.className,
      )}
      ref={ref}
    />
  ),
);
