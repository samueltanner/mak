import { Theme, ThemePalette, ThemeVariant } from "../../types/theme-types"

export const uiThemes: Theme[] = ["dark", "light", "custom"]

export const uiThemeVariants: ThemeVariant[] = [
  "primary",
  "secondary",
  "tertiary",
  "custom",
]

export const uiDefaultTheme: ThemePalette = {
  dark: {
    primary: "zinc-950",
    primaryRoot: "zinc-950",
    secondary: "zinc-800",
    secondaryRoot: "zinc-800",
    tertiary: "zinc-700",
    tertiaryRoot: "zinc-700",
    custom: "zinc-950",
    customRoot: "zinc-950",
  },
  light: {
    primary: "zinc-50",
    primaryRoot: "zinc-50",
    secondary: "zinc-100",
    secondaryRoot: "zinc-100",
    tertiary: "zinc-200",
    tertiaryRoot: "zinc-200",
    custom: "zinc-50",
    customRoot: "zinc-50",
  },
  custom: {
    primary: "red-500",
    primaryRoot: "red-500",
    secondary: "blue-500",
    secondaryRoot: "blue-500",
    tertiary: "white",
    tertiaryRoot: "white",
    custom: "red-500",
    customRoot: "red-500",
  },
}
