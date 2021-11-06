import * as React from "react";
import { ExclamationCircle, ExclamationTriangle, InfoCircle } from "react-bootstrap-icons";
import classNames from "clsx";

type AlertIconType = "info" | "error" | "warn";
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  type: AlertIconType;
  children: React.ReactChild;
}

export const Alert = ({ children, type, ...rest }: Props) => {
  const styles = {
    info: "bg-blue-1/50",
    error: "bg-red-500",
    warn: "bg-yellow-500",
  };

  return (
    <div
      role="alert"
      className={classNames(
        "text-white p-1 px-3 rounded-md flex items-center text-base",
        styles[type],
      )}
      {...rest}
    >
      <Icon type={type} />
      <span className="ml-3">{children}</span>
    </div>
  );
};

const Icon = ({ type }: { type: AlertIconType }) => {
  switch (type) {
    case "error":
      return <ExclamationCircle height={20} width={20} />;
    case "info":
      return <InfoCircle height={20} width={20} />;
    case "warn":
      return <ExclamationTriangle height={20} width={20} />;
    default:
      return null;
  }
};
