import type * as React from "react";

type Props = JSX.IntrinsicElements["fieldset"] & {
  label: string | React.ReactFragment;
  children: React.ReactNode;
};

export const FormField = ({ id, label, children, ...rest }: Props) => {
  return (
    <fieldset {...rest} className="mb-4" >
      <label className="inline-block mb-1" htmlFor={id}>{label}</label>
      {children}
    </fieldset>
  );
};
