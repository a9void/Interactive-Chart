import IconButton from "../../UI/IconButton/IconButton";
import type { Theme } from "../../types/types";
interface Props {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export default function ThemeToggle({ theme, onThemeChange }: Props) {
  const toggleTheme = () => {
    onThemeChange(theme === "light" ? "dark" : "light");
  };

  return (
    <IconButton
      icon={theme === "light" ? "☀️" : "🌙"}
      onClick={toggleTheme}
      title={
        theme === "light" ? "Switch to dark theme" : "Switch to light theme"
      }
    />
  );
}
