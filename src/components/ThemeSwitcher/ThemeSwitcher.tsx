import React from "react";
import "./ThemeSwitcher.scoped.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { Theme } from "../../util/ThemeContext";
import { useTheme } from "../../hooks/useTheme";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <div
      className="lead d-inline-block"
      onClick={() =>
        setTheme(theme === Theme.Default ? Theme.Dark : Theme.Default)
      }
    >
      {theme === Theme.Default && (
        <p className="mb-0">
          <FontAwesomeIcon icon={faMoon} /> Sötét mód
        </p>
      )}
      {theme === Theme.Dark && (
        <p className="mb-0">
          <FontAwesomeIcon icon={faSun} /> Világos mód
        </p>
      )}
    </div>
  );
}
