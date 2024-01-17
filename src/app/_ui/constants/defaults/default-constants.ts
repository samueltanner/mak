import {
  Variant,
  State,
  Interaction,
  Palette,
  OvaiUiPaletteInput,
} from "../../types/default-types"

export const uiVariants: Variant[] = [
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

export const uiStates: State[] = [
  "default",
  "active",
  "selected",
  "disabled",
  "focused",
]

export const uiInteractions: Interaction[] = ["base", "hover", "click"]

export const uiDefaultColorPaletteInput: OvaiUiPaletteInput = {
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

export const uiDefaultBorderPaletteInput = uiDefaultColorPaletteInput

export const uiDefaultTextPaletteInput: OvaiUiPaletteInput = {
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
