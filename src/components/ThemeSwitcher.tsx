import { useSSRSafeId } from "@react-aria/ssr";
import * as React from "react";
import { Moon, Sun } from "react-bootstrap-icons";

export function ThemeSwitcher() {
  const [theme, setTheme] = React.useState<"dark" | "light">("light");
  const id = useSSRSafeId();

  const svgProps = {
    width: 20,
    height: 20,
    "aria-labelledby": id,
  };

  function handleThemeClick() {
    setTheme(theme === "dark" ? "light" : "dark");
    document.body.classList.toggle("dark");
  }

  return (
    <button
      id={id}
      onClick={handleThemeClick}
      className="p-2 -ml-1.5 transition-colors rounded-md hover:bg-gray-300 dark:hover:bg-blue-2"
      aria-label="Switch theme"
      title="Switch theme"
    >
      {theme === "dark" ? <Sun {...svgProps} /> : <Moon {...svgProps} />}
    </button>
  );
}
