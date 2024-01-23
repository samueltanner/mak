import {
  MakUiDefaultColors,
  MakUiDefaultPalette,
  MakUiDefaultStateColors,
  MakUiPaletteInput,
  MakUiPaletteKey,
  MakUiStateKey,
  MakUiStateShades,
  MakUiThemeKey,
  MakUiThemeShades,
  MakUiThemeShadesInput,
  MakUiThemeVariantKey,
  MakUiVariantKey,
} from "../types/ui-types"

export const makUiThemes: MakUiThemeKey[] = ["dark", "light", "custom"]

export const makUiThemesSet: Set<MakUiThemeKey> = new Set(makUiThemes)

export const makUiPalettes: MakUiPaletteKey[] = [
  "color",
  "text",
  "border",
  "theme",
]

export const makUiPalettesSet: Set<MakUiPaletteKey> = new Set(makUiPalettes)

export const makUiThemeVariants: MakUiThemeVariantKey[] = [
  "primary",
  "secondary",
  "tertiary",
  "custom",
]

export const makUiVariants: MakUiVariantKey[] = [
  ...makUiThemeVariants,
  "success",
  "error",
  "danger",
  "warning",
  "info",
]

export const makUiVariantsSet: Set<MakUiVariantKey> = new Set(makUiVariants)

export const makUiStates: MakUiStateKey[] = [
  "base",
  "active",
  "default",
  "enabled",
  "hover",
  "target",
  "click",

  "autofill",
  "checked",
  "closed",
  "disabled",
  "empty",
  "focus",
  "focus-visible",
  "focus-within",
  "in-range",
  "indeterminate",
  "invalid",
  "open",
  "out-of-range",
  "placeholder-shown",
  "read-only",
  "required",
  "selected",
  "selection",
  "valid",
  "visited",
]

export const makUiStatesSet: Set<MakUiStateKey> = new Set(makUiStates)

export const makUiDefaultColors: MakUiDefaultColors = {
  primary: "mak-teal",
  secondary: "green",
  tertiary: "yellow",
  success: "green",
  error: "red",
  danger: "red",
  warning: "yellow",
  info: "blue",
  custom: "zinc",
}

export const makUiDefaultPalette: MakUiDefaultPalette = {
  light: {
    color: makUiDefaultColors,
    text: "zinc-50",
    border: "mak-teal-300",
    theme: {
      primary: "zinc-50",
      secondary: "zinc-100",
      tertiary: "zinc-200",
      custom: "zinc-950",
    },
  },
  dark: {
    color: makUiDefaultColors,
    text: "zinc-950",
    border: "mak-teal-600",
    theme: {
      primary: "zinc-950",
      secondary: "zinc-900",
      tertiary: "zinc-800",
      custom: "zinc-700",
    },
  },
  custom: {
    color: makUiDefaultColors,
    text: "zinc-900",
    border: "zinc-900",
    theme: {
      primary: "zinc-50",
      secondary: "zinc-100",
      tertiary: "zinc-200",
      custom: "zinc-950",
    },
  },
}

export const makUiDefaultThemeShades: MakUiThemeShades = {
  light: {
    primary: 50,
    secondary: 100,
    tertiary: 200,
    custom: 950,
  },
  dark: {
    primary: 950,
    secondary: 900,
    tertiary: 800,
    custom: 700,
  },
  custom: {
    primary: 50,
    secondary: 100,
    tertiary: 200,
    custom: 950,
  },
}

export const makUiDefaultStateShades: MakUiStateShades = {
  base: 500,
  active: 600,
  autofill: 500,
  click: 400,
  checked: 500,
  closed: 500,
  default: 500,
  disabled: 500,
  empty: 500,
  enabled: 500,
  focus: 500,
  "focus-visible": 500,
  "focus-within": 500,
  hover: 400,
  "in-range": 500,
  indeterminate: 500,
  invalid: 500,
  open: 500,
  "out-of-range": 500,
  "placeholder-shown": 500,
  "read-only": 500,
  required: 500,
  selected: 500,
  selection: 500,
  target: 500,
  valid: 500,
  visited: 500,
}

export const makUiDefaultStates: MakUiDefaultStateColors = {
  base: "zinc-500",
  click: "zinc-600",
  active: "zinc-600",
  autofill: "zinc-500",
  checked: "zinc-500",
  closed: "zinc-500",
  default: "zinc-500",
  disabled: "zinc-500",
  empty: "zinc-500",
  enabled: "zinc-500",
  focus: "zinc-500",
  "focus-visible": "zinc-500",
  "focus-within": "zinc-500",
  hover: "zinc-400",
  "in-range": "zinc-500",
  indeterminate: "zinc-500",
  invalid: "zinc-500",
  open: "zinc-500",
  "out-of-range": "zinc-500",
  "placeholder-shown": "zinc-500",
  "read-only": "zinc-500",
  required: "zinc-500",
  selected: "zinc-500",
  selection: "zinc-500",
  target: "zinc-500",
  valid: "zinc-500",
  visited: "zinc-500",
}
