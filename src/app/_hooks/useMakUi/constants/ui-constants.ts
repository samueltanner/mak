import {
  MakUiComponentConfigInput,
  MakUiRootComponentConfigInput,
} from "../types/component-types"
import {
  HtmlElementKey,
  MakUiCustomInteractionStateKey,
  MakUiDefaultColors,
  MakUiDefaultPalette,
  MakUiDefaultStateColors,
  MakUiInteractionStateKey,
  MakUiPaletteKey,
  MakUiStateKey,
  MakUiStateShades,
  MakUiThemeKey,
  MakUiThemeShades,
  MakUiThemeVariantKey,
  MakUiVariantKey,
  TailwindVariantKey,
} from "../types/ui-types"

export const tailwindVariants: TailwindVariantKey[] = [
  "bg",
  "text",
  "border",
  "ring",
  "outline",
  "ring-offset",
  "fill",
  "stroke",
]

export const htmlElements: HtmlElementKey[] = [
  "button",
  "input",
  "text",
  "form",
  "dialog",
  "select",
  "textarea",
]

export const tailwindVariantsSet: Set<TailwindVariantKey> = new Set(
  tailwindVariants
)

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

export const makUiThemeVariantsSet: Set<MakUiThemeVariantKey> = new Set(
  makUiThemeVariants
)

export const makUiVariants: MakUiVariantKey[] = [
  ...makUiThemeVariants,
  "success",
  "error",
  "danger",
  "warning",
  "info",
]

export const makUiVariantsSet: Set<MakUiVariantKey> = new Set(makUiVariants)

export const makUiInteractionStates: MakUiInteractionStateKey[] = [
  "active",
  "autofill",
  "checked",
  "closed",
  "default",
  "disabled",
  "empty",
  "enabled",
  "focus",
  "focus-visible",
  "focus-within",
  "hover",
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
  "target",
  "valid",
  "visited",
]

export const makUiCustomInteractionStates: MakUiCustomInteractionStateKey[] = [
  "base",
  "click",
]

export const makUiStates: MakUiStateKey[] = [
  ...makUiCustomInteractionStates,
  ...makUiInteractionStates,
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
  disabled: 300,
  empty: 500,
  enabled: 500,
  focus: 500,
  "focus-visible": 500,
  "focus-within": 500,
  hover: 300,
  "group-hover": 300,
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
  hover: "zinc-300",
  "group-hover": "zinc-300",
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

export const defaultButtonConfig: MakUiRootComponentConfigInput = {
  className:
    "h-fit w-fit px-2 py-1 text-sm rounded-md font-semibold fade-in-out",
  enabledStates: ["hover", "focus", "disabled"],
}

export const defaultInputConfig: MakUiRootComponentConfigInput = {
  className: "h-fit w-fit px-2 py-1 text-sm rounded-md font-semibold",
  enabledStates: ["hover", "focus", "disabled"],
}

export const defaultComponentConfig: MakUiComponentConfigInput = {
  buttonConfig: defaultButtonConfig,
  inputConfig: defaultInputConfig,
}
