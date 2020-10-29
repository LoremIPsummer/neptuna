import { useContext } from "react";
import { ThemeContext } from "../util/ThemeContext";

export const useTheme = () => useContext(ThemeContext);
