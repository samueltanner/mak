import {
  Theme,
  ThemePalette,
  ThemeShades,
  ThemeVariant,
  ThemeInput,
  VerboseThemeVariant,
} from "../../types/theme-types"

export const uiThemes: Theme[] = ["dark", "light", "custom"]
export const uiVerboseThemes: VerboseThemeVariant[] = [
  "darkTheme",
  "lightTheme",
  "customTheme",
]

export const uiThemeVariants: ThemeVariant[] = [
  "primary",
  "secondary",
  "tertiary",
  "custom",
]

export const uiDefaultThemePaletteInput: ThemeInput = {
  dark: {
    primary: "zinc-950",
    secondary: "zinc-800",
    tertiary: "zinc-700",
    custom: "zinc-950",
  },
  light: {
    primary: "zinc-50",
    secondary: "zinc-100",
    tertiary: "zinc-200",
    custom: "zinc-50",
  },
  custom: {
    primary: "red-500",
    secondary: "blue-500",
    tertiary: "white",
    custom: "red-500",
  },
}

export const defaultThemeShades: ThemeShades = {
  dark: {
    primary: 950,
    secondary: 800,
    tertiary: 700,
    custom: 950,
  },
  light: {
    primary: 950,
    secondary: 800,
    tertiary: 700,
    custom: 950,
  },
  custom: {
    primary: 950,
    secondary: 800,
    tertiary: 700,
    custom: 950,
  },
}
