import type * as React from "react";
import classNames from "clsx";

type Props = JSX.IntrinsicElements["fieldset"] & {
  label: string | React.ReactFragment;
  children: React.ReactNode;
};

export const FormField = ({ id, label, children, ...rest }: Props) => {
  return (
    <fieldset {...rest} className={classNames("mb-4", rest.className)}>
      <label className="inline-block mb-1" htmlFor={id}>
        {label}
      </label>
      {children}
    </fieldset>
  );
};
