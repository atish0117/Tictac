import { useTheme } from "./Context/ThemeContext"

export const ThemeToggleButton = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="bg-gray-300 dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded shadow hover:scale-105 transition"
    >
      {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};
