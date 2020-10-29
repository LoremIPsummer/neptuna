import { createContext } from "react";

export enum Theme {
  Default = "default",
  Dark = "dark",
}

export type ThemeContextType = {
  theme: Theme;
  setTheme: (Theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: Theme.Dark,
  setTheme: (theme) => console.warn("Nincs megadva setter funkció"),
});
