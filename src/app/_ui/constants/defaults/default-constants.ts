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

export const uiDefaultPalette = ""

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
