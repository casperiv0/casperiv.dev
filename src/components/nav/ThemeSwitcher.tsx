import { useTheme } from "lib/hooks/useTheme";
import { MoonFill, SunFill } from "react-bootstrap-icons";

export function ThemeSwitcher() {
  const { theme, changeTheme } = useTheme();

  return (
    <button
      className="group grid place-items-center w-10 h-10 relative overflow-hidden rounded-md"
      onClick={() => changeTheme(theme)}
    >
      <div className="absolute inset-0 transition-opacity duration-200 opacity-0 group-hover:opacity-100 bg-gradient-to-tr hover:from-[#1150d4] hover:to-[#a245fc] z-0" />

      {theme === "dark" ? (
        <SunFill
          className="group-hover:text-white pointer-events-none z-10 fill-current text-neutral-800 dark:text-gray-200"
          width={21}
          height={21}
          aria-label="Change to light theme"
        />
      ) : (
        <MoonFill
          className="group-hover:text-white pointer-events-none z-10 fill-current text-neutral-800 dark:text-gray-200"
          width={21}
          height={21}
          aria-label="Change to dark theme"
        />
      )}
    </button>
  );
}
