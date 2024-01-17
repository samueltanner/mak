import { MakUiThemePalette } from "../types/theme-types"
import { states, variants } from "./nested-ui-constants"

export const paletteKeys = ["Color", "Text", "Border", "Background"] //"Background"

export const defaultColors = {
  primary: "blue",
  secondary: "green",
  tertiary: "yellow",
  success: "green",
  error: "red",
  danger: "red",
  warning: "yellow",
  info: "blue",
  custom: "zinc",
}

export const defaultThemeColors: MakUiThemePalette = {
  darkTheme: {
    primary: "zinc-950",
    primaryRoot: "zinc-950",
    secondary: "zinc-800",
    secondaryRoot: "zinc-800",
    tertiary: "zinc-700",
    tertiaryRoot: "zinc-700",
    custom: "zinc-950",
    customRoot: "zinc-950",
  },
  lightTheme: {
    primary: "zinc-50",
    primaryRoot: "zinc-50",
    secondary: "zinc-100",
    secondaryRoot: "zinc-100",
    tertiary: "zinc-200",
    tertiaryRoot: "zinc-200",
    custom: "zinc-50",
    customRoot: "zinc-50",
  },
  customTheme: {
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

export const defaultTextColors: TextPaletteInput = {
  primaryText: "zinc-900",
  secondaryText: "zinc-100",
  tertiaryText: "zinc-900",
  successText: "zinc-900",
  errorText: "zinc-900",
  dangerText: "zinc-900",
  warningText: "zinc-900",
  infoText: "zinc-900",
  customText: "zinc-900",
}

export const defaultBorderColors: BorderPaletteInput = {
  primaryBorder: "blue",
  secondaryBorder: "green",
  tertiaryBorder: "yellow",
  successBorder: "green",
  errorBorder: "red",
  dangerBorder: "red",
  warningBorder: "yellow",
  infoBorder: "blue",
  customBorder: "zinc",
}

export const paletteVariants: ColorPaletteVariant[] = [
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
export const paletteTextVariants: TextPaletteVariant[] = [
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

export const paletteBorderVariants: BorderPaletteVariant[] = [
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

export const elementStates: ElementState[] = [
  "default",
  "active",
  "selected",
  "disabled",
  "focused",
]

export const elementInteractions: ElementInteractionState[] = [
  "base",
  "hover",
  "click",
]

export const defaultStateShades: StateShades = {
  default: {
    base: 500,
    baseRoot: 500,
    hover: 600,
    hoverRoot: 600,
    click: 700,
    clickRoot: 700,
  },
  active: {
    base: 500,
    baseRoot: 500,
    hover: 600,
    hoverRoot: 600,
    click: 700,
    clickRoot: 700,
  },
  selected: {
    base: 500,
    baseRoot: 500,
    hover: 600,
    hoverRoot: 600,
    click: 700,
    clickRoot: 700,
  },
  disabled: {
    base: 500,
    baseRoot: 500,
    hover: 600,
    hoverRoot: 600,
    click: 700,
    clickRoot: 700,
  },
  focused: {
    base: 500,
    baseRoot: 500,
    hover: 600,
    hoverRoot: 600,
    click: 700,
    clickRoot: 700,
  },
}

export const defaultThemeShades: ThemeShades = {
  darkTheme: {
    primary: 950,
    primaryRoot: 950,
    secondary: 800,
    secondaryRoot: 800,
    tertiary: 700,
    tertiaryRoot: 700,
    custom: 950,
    customRoot: 950,
  },
  lightTheme: {
    primary: 950,
    primaryRoot: 950,
    secondary: 800,
    secondaryRoot: 800,
    tertiary: 700,
    tertiaryRoot: 700,
    custom: 950,
    customRoot: 950,
  },
  customTheme: {
    primary: 950,
    primaryRoot: 950,
    secondary: 800,
    secondaryRoot: 800,
    tertiary: 700,
    tertiaryRoot: 700,
    custom: 950,
    customRoot: 950,
  },
}

export const textVariants: TextPalette = {
  primaryText: states,
  secondaryText: states,
  tertiaryText: states,
  successText: states,
  errorText: states,
  dangerText: states,
  warningText: states,
  infoText: states,
  customText: states,
}

export const borderVariants: BorderPalette = {
  primaryBorder: states,
  secondaryBorder: states,
  tertiaryBorder: states,
  successBorder: states,
  errorBorder: states,
  dangerBorder: states,
  warningBorder: states,
  infoBorder: states,
  customBorder: states,
}

export const defaultThemeSubVariants: ThemeSubVariants = {
  primary: "",
  primaryRoot: "",
  secondary: "",
  secondaryRoot: "",
  tertiary: "",
  tertiaryRoot: "",
  custom: "",
  customRoot: "",
}

export const defaultNestedThemeVariants = {
  dark: defaultThemeSubVariants,
  light: defaultThemeSubVariants,
  custom: defaultThemeSubVariants,
}

export const defaultBackgroundPalette: MakUiThemePalette = {
  darkTheme: defaultThemeSubVariants,
  lightTheme: defaultThemeSubVariants,
  customTheme: defaultThemeSubVariants,
}

export const defaultColorPalette = variants
export const defaultTextPalette = textVariants
export const defaultBorderPalette = borderVariants
export const defaultPalettes: MakUiPalette = {
  ...defaultColorPalette,
  ...defaultTextPalette,
  ...defaultBorderPalette,
  ...defaultBackgroundPalette,
}
