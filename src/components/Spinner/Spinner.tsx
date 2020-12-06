import React from "react";
import "./Spinner.scoped.scss";
import { Image } from "react-bootstrap";
import { useTheme } from "../../hooks/useTheme";
import { Theme } from "../../context/ThemeContext";

export default function Spinner() {
  const { theme } = useTheme();
  return (
    <>
      <Image
        src="images/spinner.svg"
        className={`spinner ${theme === Theme.Dark && "inverted"}`}
      />
    </>
  );
}
