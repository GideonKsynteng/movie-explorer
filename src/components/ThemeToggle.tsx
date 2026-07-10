import { FaMoon, FaSun } from "react-icons/fa";

import { useTheme } from "../context/ThemeContext";

import styles from "./ThemeToggle.module.css";

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className={styles.button}
            onClick={toggleTheme}
            aria-label="Toggle Theme"
        >
            {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
    );
};

export default ThemeToggle;
