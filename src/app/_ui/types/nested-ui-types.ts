import { States, ThemeVariants } from "./root-types"



export type OvaiUiNestedPalette = {
  [key: string]: NestedVariants | NestedThemes
  color: NestedVariants
  text: NestedVariants
  border: NestedVariants
  theme: NestedThemes
}

export type NestedVariants = {
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

export type NestedThemes = {
  [key: string]: ThemeVariants
  dark: ThemeVariants
  light: ThemeVariants
  custom: ThemeVariants
}
