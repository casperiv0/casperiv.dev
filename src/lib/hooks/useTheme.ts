import * as React from "react";

type Theme = "dark" | "light";

export function useTheme() {
  const [theme, setTheme] = React.useState<Theme>("dark");

  React.useEffect(() => {
    const t = (localStorage.getItem("caspertheghost.me_theme") as Theme) ?? "dark";
    setTheme(t);
    document.body.classList.add(t);
  }, []);

  function changeTheme(previousTheme: Theme) {
    const newTheme = previousTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.body.classList.toggle("dark");
    localStorage.setItem("caspertheghost.me_theme", newTheme);
  }

  return { theme, changeTheme };
}
