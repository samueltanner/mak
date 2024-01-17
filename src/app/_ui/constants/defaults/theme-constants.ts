import {
  MakUiTheme,
  MakUiThemePalette,
  ThemeShades,
  ThemeVariant,
  ThemeInput,
  VerboseThemeVariant,
} from "../../types/theme-types"

export const uiThemes: MakUiTheme[] = ["dark", "light", "custom"]
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

export const uiDefaultThemePaletteInput: MakUiThemePalette = {
  dark: {
    primary: "zinc-950/100",
    primaryRoot: "zinc-950",
    secondary: "zinc-800/100",
    secondaryRoot: "zinc-800",
    tertiary: "zinc-700/100",
    tertiaryRoot: "zinc-700",
    custom: "zinc-950",
    customRoot: "zinc-950",
  },
  light: {
    primary: "zinc-50/100",
    primaryRoot: "zinc-50",
    secondary: "zinc-100/100",
    secondaryRoot: "zinc-100",
    tertiary: "zinc-200/100",
    tertiaryRoot: "zinc-200",
    custom: "zinc-50/100",
    customRoot: "zinc-50",
  },
  custom: {
    primary: "red-500/100",
    primaryRoot: "red-500",
    secondary: "blue-500/100",
    secondaryRoot: "blue-500",
    tertiary: "white/100",
    tertiaryRoot: "white",
    custom: "red-500/100",
    customRoot: "red-500",
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
    primary: 50,
    secondary: 100,
    tertiary: 200,
    custom: 300,
  },
  custom: {
    primary: 500,
    secondary: 500,
    tertiary: 500,
    custom: 500,
  },
}
