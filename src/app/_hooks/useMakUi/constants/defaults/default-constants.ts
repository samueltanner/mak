import {
  MakUiVariant,
  MakUiState,
  MakUiInteraction,
  MakUiPalette,
  MakUiPaletteInput,
  VerboseTextVariant,
  VerboseBorderVariant,
  VerboseColorVariant,
  StateShades,
  MakUiNestedPaletteVariant,
  MakUiThemePalette,
  MakUiThemeVariant,
  VerboseThemeVariant,
  MakUiThemeMode,
  ThemeShades,
  MakUiSimplePalette,
  MakUiSimpleThemePalette,
  MakUiRootInteraction,
} from "../../types/default-types"

export const absoluteRegex =
  /^((white|black)\/\[*0*(?:[0-9][0-9]?|100)%*\]*|(white|black))$/

export const uiPaletteVariants: MakUiNestedPaletteVariant[] = [
  "color",
  "text",
  "border",
  "theme",
]
export const uiVariants: MakUiVariant[] = [
  "primary",
  "secondary",
  "tertiary",
  "success",
  "error",
  "danger",
  "warning",
  "info",
  "custom",
]

export const uiVerboseTextVariants: VerboseTextVariant[] = [
  "primaryText",
  "secondaryText",
  "tertiaryText",
  "successText",
  "errorText",
  "dangerText",
  "warningText",
  "infoText",
  "customText",
]

export const uiVerboseBorderVariants: VerboseBorderVariant[] = [
  "primaryBorder",
  "secondaryBorder",
  "tertiaryBorder",
  "successBorder",
  "errorBorder",
  "dangerBorder",
  "warningBorder",
  "infoBorder",
  "customBorder",
]

export const uiVerboseColorVariants: VerboseColorVariant[] = [
  "primaryColor",
  "secondaryColor",
  "tertiaryColor",
  "successColor",
  "errorColor",
  "dangerColor",
  "warningColor",
  "infoColor",
  "customColor",
]

export const uiStates: MakUiState[] = [
  "active",
  "default",
  "disabled",
  "focused",
  "selected",
  "invalid"
]

export const uiInteractions: MakUiInteraction[] = ["base", "hover", "click"]

export const uiRootInteractions: MakUiRootInteraction[] = [
  "baseRoot",
  "hoverRoot",
  "clickRoot",
]

export const uiDefaultColorPaletteInput: MakUiPaletteInput = {
  primary: "mak-teal-500",
  secondary: "green-500",
  tertiary: "yellow-500",
  success: "green-500",
  error: "red-500",
  danger: "red-500",
  warning: "yellow-500",
  info: "blue-500",
  custom: "zinc-500",
}

export const uiDefaultSimplColorPalette =
  uiDefaultColorPaletteInput as MakUiSimplePalette

export const uiDefaultSimpleBorderPalette = uiDefaultSimplColorPalette

export const uiDefaultBorderPaletteInput = uiDefaultColorPaletteInput

export const uiDefaultSimpleTextPalette: MakUiSimplePalette = {
  primary: "zinc-900",
  primaryDark: "zinc-900",
  primaryCustom: "zinc-900",
  secondary: "zinc-100",
  secondaryDark: "zinc-100",
  secondaryCustom: "zinc-100",
  tertiary: "zinc-900",
  tertiaryDark: "zinc-900",
  tertiaryCustom: "zinc-900",
  success: "zinc-900",
  successDark: "zinc-900",
  successCustom: "zinc-900",
  error: "zinc-900",
  errorDark: "zinc-900",
  errorCustom: "zinc-900",
  danger: "zinc-900",
  dangerDark: "zinc-900",
  dangerCustom: "zinc-900",
  warning: "zinc-900",
  warningDark: "zinc-900",
  warningCustom: "zinc-900",
  info: "zinc-900",
  infoDark: "zinc-900",
  infoCustom: "zinc-900",
  custom: "zinc-900",
  customDark: "zinc-900",
  customCustom: "zinc-900",
}

export const uiDefaultSimpleThemePalette: MakUiSimpleThemePalette = {
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

export const uiDefaultTextPaletteInput: MakUiPaletteInput = {
  primary: "zinc-900",
  secondary: "zinc-100",
  tertiary: "zinc-900",
  success: "zinc-900",
  error: "zinc-900",
  danger: "zinc-900",
  warning: "zinc-900",
  info: "zinc-900",
  custom: "zinc-900",
}

export const uiDefaultShades: StateShades = {
  default: {
    base: 500,
    hover: 600,
    click: 700,
  },
  active: {
    base: 400,
    hover: 500,
    click: 600,
  },
  selected: {
    base: 400,
    hover: 500,
    click: 600,
  },
  invalid: {
    base: 400,
    hover: 500,
    click: 600,
  },
  disabled: {
    base: 300,
    hover: 300,
    click: 300,
  },
  focused: {
    base: 500,
    hover: 700,
    click: 700,
  },
}

export const uiThemes: MakUiThemeMode[] = ["dark", "light", "custom"]

export const uiVerboseThemes: VerboseThemeVariant[] = [
  "darkTheme",
  "lightTheme",
  "customTheme",
]

export const uiThemeVariants: MakUiThemeVariant[] = [
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

export const uiDefaultThemeShades: ThemeShades = {
  dark: {
    primary: 950,
    secondary: 900,
    tertiary: 800,
    custom: 700,
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
