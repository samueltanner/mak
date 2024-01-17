import {
  Interactions,
  OvaiUiNestedPalette,
  States,
  ThemeVariants,
  Themes,
  Variants,
} from "../_types/nested-ui-types"
export const interactions: Interactions = {
  base: "",
  baseRoot: "",
  hover: "",
  hoverRoot: "",
  click: "",
  clickRoot: "",
}

export const states: States = {
  default: interactions,
  focused: interactions,
  active: interactions,
  selected: interactions,
  disabled: interactions,
}

export const variants: Variants = {
  primary: states,
  secondary: states,
  tertiary: states,
  success: states,
  error: states,
  danger: states,
  warning: states,
  info: states,
  custom: states,
}

export const themeVariants: ThemeVariants = {
  primary: "",
  primaryRoot: "",
  secondary: "",
  secondaryRoot: "",
  tertiary: "",
  tertiaryRoot: "",
  custom: "",
  customRoot: "",
}

export const themes: Themes = {
  dark: themeVariants,
  light: themeVariants,
  custom: themeVariants,
}

export const defaultNestedPalette: OvaiUiNestedPalette = {
  color: variants,
  text: variants,
  border: variants,
  theme: themes,
}
