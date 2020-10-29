import React from "react";
import "./Spinner.scoped.scss";
import Image from "react-bootstrap/Image";
import { useTheme } from "../../hooks/useTheme";
import { Theme } from "../../util/ThemeContext";

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
