export type Theme = "dark" | "light" | "custom"
export type VerboseThemeVariant = "darkTheme" | "lightTheme" | "customTheme"

export type ThemeVariant = "primary" | "secondary" | "tertiary" | "custom"

export type ThemeRootVariant =
  | "primaryRoot"
  | "secondaryRoot"
  | "tertiaryRoot"
  | "customRoot"

export type ThemeVariantOutput = ThemeVariant | ThemeRootVariant

export type ThemeVariants = {
  [Key in ThemeVariantOutput]: string
}

export type ThemePalette = {
  [Key in Theme]: ThemeVariants
}

export type ThemeVariantInput = {
  [Key in ThemeVariant]: string
}

export type ThemeInput = {
  [Key in Theme]?: string | ThemeVariantInput
}
