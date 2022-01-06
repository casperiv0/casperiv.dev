import * as React from "react";

export function useViewport() {
  const [width, setWidth] = React.useState(
    (typeof window !== "undefined" && window.innerWidth) ?? 0,
  );

  React.useEffect(() => {
    const handler = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return width;
}
