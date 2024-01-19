import {
  MakUiVariant,
  MakUiState,
  Interaction,
  MakUiPalette,
  MakUiPaletteInput,
  VerboseTextVariant,
  VerboseBorderVariant,
  VerboseColorVariant,
  StateShades,
  NestedPaletteVariant,
  MakUiThemePalette,
  ThemeVariant,
  VerboseThemeVariant,
  MakUiTheme,
  ThemeShades,
  MakUiSimplePalette,
  MakUiSimpleThemePalette,
} from "../../types/default-types"

export const absoluteRegex =
  /^((white|black)\/\[*0*(?:[0-9][0-9]?|100)%*\]*|(white|black))$/

export const uiPaletteVariants: NestedPaletteVariant[] = [
  "color",
  "text",
  "border",
  // "theme",
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
]

export const uiInteractions: Interaction[] = ["base", "hover", "click"]

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
// export const uiDefaultTextPaletteInput: MakUiPalette = {
//   primary: {
//     default: {
//       base: "zinc-900/100",
//       baseRoot: "zinc-900",
//       hover: "zinc-950/100",
//       hoverRoot: "zinc-950",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//     active: {
//       base: "zinc-800/100",
//       baseRoot: "zinc-800",
//       hover: "zinc-900/100",
//       hoverRoot: "zinc-900",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//     selected: {
//       base: "zinc-800/100",
//       baseRoot: "zinc-800",
//       hover: "zinc-900/100",
//       hoverRoot: "zinc-900",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//     disabled: {
//       base: "zinc-700/100",
//       baseRoot: "zinc-700",
//       hover: "zinc-700/100",
//       hoverRoot: "zinc-700",
//       click: "zinc-700/100",
//       clickRoot: "zinc-700",
//     },
//     focused: {
//       base: "zinc-900/100",
//       baseRoot: "zinc-900",
//       hover: "zinc-950/100",
//       hoverRoot: "zinc-950",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//   },
//   secondary: {
//     default: {
//       base: "zinc-50/100",
//       baseRoot: "zinc-50",
//       hover: "zinc-150/100",
//       hoverRoot: "zinc-150",
//       click: "zinc-250/100",
//       clickRoot: "zinc-250",
//     },
//     active: {
//       base: "zinc-50/100",
//       baseRoot: "zinc-50",
//       hover: "zinc-50/100",
//       hoverRoot: "zinc-50",
//       click: "zinc-150/100",
//       clickRoot: "zinc-150",
//     },
//     selected: {
//       base: "zinc-50/100",
//       baseRoot: "zinc-50",
//       hover: "zinc-50/100",
//       hoverRoot: "zinc-50",
//       click: "zinc-150/100",
//       clickRoot: "zinc-150",
//     },
//     disabled: {
//       base: "zinc-50/100",
//       baseRoot: "zinc-50",
//       hover: "zinc-50/100",
//       hoverRoot: "zinc-50",
//       click: "zinc-50/100",
//       clickRoot: "zinc-50",
//     },
//     focused: {
//       base: "zinc-50/100",
//       baseRoot: "zinc-50",
//       hover: "zinc-250/100",
//       hoverRoot: "zinc-250",
//       click: "zinc-250/100",
//       clickRoot: "zinc-250",
//     },
//   },
//   tertiary: {
//     default: {
//       base: "zinc-900/100",
//       baseRoot: "zinc-900",
//       hover: "zinc-950/100",
//       hoverRoot: "zinc-950",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//     active: {
//       base: "zinc-800/100",
//       baseRoot: "zinc-800",
//       hover: "zinc-900/100",
//       hoverRoot: "zinc-900",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//     selected: {
//       base: "zinc-800/100",
//       baseRoot: "zinc-800",
//       hover: "zinc-900/100",
//       hoverRoot: "zinc-900",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//     disabled: {
//       base: "zinc-700/100",
//       baseRoot: "zinc-700",
//       hover: "zinc-700/100",
//       hoverRoot: "zinc-700",
//       click: "zinc-700/100",
//       clickRoot: "zinc-700",
//     },
//     focused: {
//       base: "zinc-900/100",
//       baseRoot: "zinc-900",
//       hover: "zinc-950/100",
//       hoverRoot: "zinc-950",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//   },
//   success: {
//     default: {
//       base: "zinc-900/100",
//       baseRoot: "zinc-900",
//       hover: "zinc-950/100",
//       hoverRoot: "zinc-950",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//     active: {
//       base: "zinc-800/100",
//       baseRoot: "zinc-800",
//       hover: "zinc-900/100",
//       hoverRoot: "zinc-900",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//     selected: {
//       base: "zinc-800/100",
//       baseRoot: "zinc-800",
//       hover: "zinc-900/100",
//       hoverRoot: "zinc-900",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//     disabled: {
//       base: "zinc-700/100",
//       baseRoot: "zinc-700",
//       hover: "zinc-700/100",
//       hoverRoot: "zinc-700",
//       click: "zinc-700/100",
//       clickRoot: "zinc-700",
//     },
//     focused: {
//       base: "zinc-900/100",
//       baseRoot: "zinc-900",
//       hover: "zinc-950/100",
//       hoverRoot: "zinc-950",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//   },
//   error: {
//     default: {
//       base: "zinc-900/100",
//       baseRoot: "zinc-900",
//       hover: "zinc-950/100",
//       hoverRoot: "zinc-950",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//     active: {
//       base: "zinc-800/100",
//       baseRoot: "zinc-800",
//       hover: "zinc-900/100",
//       hoverRoot: "zinc-900",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//     selected: {
//       base: "zinc-800/100",
//       baseRoot: "zinc-800",
//       hover: "zinc-900/100",
//       hoverRoot: "zinc-900",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//     disabled: {
//       base: "zinc-700/100",
//       baseRoot: "zinc-700",
//       hover: "zinc-700/100",
//       hoverRoot: "zinc-700",
//       click: "zinc-700/100",
//       clickRoot: "zinc-700",
//     },
//     focused: {
//       base: "zinc-900/100",
//       baseRoot: "zinc-900",
//       hover: "zinc-950/100",
//       hoverRoot: "zinc-950",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//   },
//   danger: {
//     default: {
//       base: "zinc-900/100",
//       baseRoot: "zinc-900",
//       hover: "zinc-950/100",
//       hoverRoot: "zinc-950",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//     active: {
//       base: "zinc-800/100",
//       baseRoot: "zinc-800",
//       hover: "zinc-900/100",
//       hoverRoot: "zinc-900",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//     selected: {
//       base: "zinc-800/100",
//       baseRoot: "zinc-800",
//       hover: "zinc-900/100",
//       hoverRoot: "zinc-900",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//     disabled: {
//       base: "zinc-700/100",
//       baseRoot: "zinc-700",
//       hover: "zinc-700/100",
//       hoverRoot: "zinc-700",
//       click: "zinc-700/100",
//       clickRoot: "zinc-700",
//     },
//     focused: {
//       base: "zinc-900/100",
//       baseRoot: "zinc-900",
//       hover: "zinc-950/100",
//       hoverRoot: "zinc-950",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//   },
//   warning: {
//     default: {
//       base: "zinc-900/100",
//       baseRoot: "zinc-900",
//       hover: "zinc-950/100",
//       hoverRoot: "zinc-950",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//     active: {
//       base: "zinc-800/100",
//       baseRoot: "zinc-800",
//       hover: "zinc-900/100",
//       hoverRoot: "zinc-900",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//     selected: {
//       base: "zinc-800/100",
//       baseRoot: "zinc-800",
//       hover: "zinc-900/100",
//       hoverRoot: "zinc-900",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//     disabled: {
//       base: "zinc-700/100",
//       baseRoot: "zinc-700",
//       hover: "zinc-700/100",
//       hoverRoot: "zinc-700",
//       click: "zinc-700/100",
//       clickRoot: "zinc-700",
//     },
//     focused: {
//       base: "zinc-900/100",
//       baseRoot: "zinc-900",
//       hover: "zinc-950/100",
//       hoverRoot: "zinc-950",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//   },
//   info: {
//     default: {
//       base: "zinc-900/100",
//       baseRoot: "zinc-900",
//       hover: "zinc-950/100",
//       hoverRoot: "zinc-950",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//     active: {
//       base: "zinc-800/100",
//       baseRoot: "zinc-800",
//       hover: "zinc-900/100",
//       hoverRoot: "zinc-900",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//     selected: {
//       base: "zinc-800/100",
//       baseRoot: "zinc-800",
//       hover: "zinc-900/100",
//       hoverRoot: "zinc-900",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//     disabled: {
//       base: "zinc-700/100",
//       baseRoot: "zinc-700",
//       hover: "zinc-700/100",
//       hoverRoot: "zinc-700",
//       click: "zinc-700/100",
//       clickRoot: "zinc-700",
//     },
//     focused: {
//       base: "zinc-900/100",
//       baseRoot: "zinc-900",
//       hover: "zinc-950/100",
//       hoverRoot: "zinc-950",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//   },
//   custom: {
//     default: {
//       base: "zinc-900/100",
//       baseRoot: "zinc-900",
//       hover: "zinc-950/100",
//       hoverRoot: "zinc-950",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//     active: {
//       base: "zinc-800/100",
//       baseRoot: "zinc-800",
//       hover: "zinc-900/100",
//       hoverRoot: "zinc-900",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//     selected: {
//       base: "zinc-800/100",
//       baseRoot: "zinc-800",
//       hover: "zinc-900/100",
//       hoverRoot: "zinc-900",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//     disabled: {
//       base: "zinc-700/100",
//       baseRoot: "zinc-700",
//       hover: "zinc-700/100",
//       hoverRoot: "zinc-700",
//       click: "zinc-700/100",
//       clickRoot: "zinc-700",
//     },
//     focused: {
//       base: "zinc-900/100",
//       baseRoot: "zinc-900",
//       hover: "zinc-950/100",
//       hoverRoot: "zinc-950",
//       click: "zinc-950/100",
//       clickRoot: "zinc-950",
//     },
//   },
// }

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
