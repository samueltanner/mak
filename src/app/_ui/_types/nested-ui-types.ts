export type OvaiUiNestedPalette = {
  [key: string]: Variants | Themes
  color: Variants
  text: Variants
  border: Variants
  theme: Themes
}

export type Variants = {
  [key: string]: States
  primary: States
  secondary: States
  tertiary: States
  success: States
  error: States
  danger: States
  warning: States
  info: States
  custom: States
}

export type Themes = {
  [key: string]: ThemeVariants
  dark: ThemeVariants
  light: ThemeVariants
  custom: ThemeVariants
}

export type ThemeVariants = {
  [key: string]: string
  primary: string
  primaryRoot: string
  secondary: string
  secondaryRoot: string
  tertiary: stri
  tertiaryRoot: string
  custom: string
  customRoot: string
}

export type States = {
  [key: string]: Interactions
  default: Interactions
  active: Interactions
  selected: Interactions
  disabled: Interactions
  focused: Interactions
}

export type Interactions = {
  [key: string]: any
  base: any
  baseRoot: any
  hover: any
  hoverRoot: any
  click: any
  clickRoot: any
}
