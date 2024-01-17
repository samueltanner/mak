export type ColorPaletteVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "error"
  | "danger"
  | "warning"
  | "info"
  | "custom"

export type TextPaletteVariant =
  | "primaryText"
  | "secondaryText"
  | "tertiaryText"
  | "successText"
  | "errorText"
  | "dangerText"
  | "warningText"
  | "infoText"
  | "customText"

export type BorderPaletteVariant =
  | "primaryBorder"
  | "secondaryBorder"
  | "tertiaryBorder"
  | "successBorder"
  | "errorBorder"
  | "dangerBorder"
  | "warningBorder"
  | "infoBorder"
  | "customBorder"

export type ThemePaletteVariant = "darkTheme" | "lightTheme" | "customTheme"
export type NestedThemePaletteVariant = "dark" | "light" | "custom"
export type MakUiPaletteVariant =
  | ColorPaletteVariant
  | TextPaletteVariant
  | BorderPaletteVariant
  | ThemePaletteVariant

export type ElementState =
  | "default"
  | "active"
  | "selected"
  | "disabled"
  | "focused"

export type ThemePaletteSubVariant =
  | "primary"
  | "primaryRoot"
  | "secondary"
  | "secondaryRoot"
  | "tertiary"
  | "tertiaryRoot"
  | "custom"
  | "customRoot"

export type ElementInteractionState =
  | "base"
  | "hover"
  | "click"
  | "baseRoot"
  | "hoverRoot"
  | "clickRoot"

export type ElementStates = {
  default?: ElementInteractions
  active?: ElementInteractions
  selected?: ElementInteractions
  disabled?: ElementInteractions
  focused?: ElementInteractions
}

export type ElementInteractionShades = {
  [key: string]: number
  base: number
  hover: number
  click: number
  baseRoot: number
  hoverRoot: number
  clickRoot: number
}

export type ElementInteractions = {
  [key: string]: string
  base: string
  hover: string
  click: string
  baseRoot: string
  hoverRoot: string
  clickRoot: string
}

export type ColorPalette = {
  [key in ColorPaletteVariant]?: ElementStates
}

export type TextPalette = {
  [key in TextPaletteVariant]?: ElementStates
}

export type BorderPalette = {
  [key in BorderPaletteVariant]?: ElementStates
}

export type ThemeSubVariants = {
  [key in ThemePaletteSubVariant]: string
}

export type ThemePalette = {
  [key in ThemePaletteVariant]?: ThemeSubVariants
}
export type NestedThemePalette = {
  [key in NestedThemePaletteVariant]?: ThemeSubVariants
}

export type NestedDefaultPalette = {
  [key in ColorPaletteVariant]: {
    [key in ElementState]: {
      [key in ElementInteractionState]: string
    }
  }
}

export type MakUiPalette = ColorPalette &
  TextPalette &
  BorderPalette &
  ThemePalette

export type MakUiNestedPalette = {
  color: NestedDefaultPalette
  text: NestedDefaultPalette
  border: NestedDefaultPalette
  theme: NestedThemePalette
}

export type StateShades = {
  [key: string]: ElementInteractionShades
  default: ElementInteractionShades
  active: ElementInteractionShades
  selected: ElementInteractionShades
  disabled: ElementInteractionShades
  focused: ElementInteractionShades
}

export type ThemeShades = {
  [key in ThemePaletteVariant]: {
    [key in ThemePaletteSubVariant]: number
  }
}

export type MakUiPaletteInput = {
  [key in MakUiPaletteVariant]?: PaletteInput &
    TextPaletteInput &
    BorderPaletteInput &
    ThemePaletteInput
}

export type PaletteInput = {
  [key in ColorPaletteVariant]?: VariantInput
}

export type TextPaletteInput = {
  [key in TextPaletteVariant]?: VariantTextInput
}

export type BorderPaletteInput = {
  [key in BorderPaletteVariant]?: VariantBorderInput
}

export type ThemePaletteInput = {
  [key in ThemePaletteVariant]?: ThemeInput
}

export type ThemeInput = {
  [Key in Theme]?: string | ThemeVariantInput
}

export type VariantInput = string | VariantInputObject

export type VariantBorderInput = string | VariantBorderInputObject

export type VariantTextInput = string | VariantTextInputObject

export type VariantInputObject = {
  [key in ElementState]?: StateInput
}

export type VariantTextInputObject = {
  [key in ElementState]?: string
}

export type VariantBorderInputObject = {
  [key in ElementState]?: string
}

export type StateInputObject = {
  [key: string]: string | undefined
  base: string
  hover?: string
  click?: string
}

export type BorderStateInputObject = {
  baseBorder?: string
  hoverBorder?: string
  clickBorder?: string
}

export type TextStateInputObject = {
  baseText?: string
  hoverText?: string
  clickText?: string
}

export type ThemeInputObject = {
  primary: string
  secondary?: string
  tertiary?: string
  custom?: string
}

export type StateInput = string | StateInputObject | InteractionInput

export type BorderStateInput = string | BorderStateInputObject

export type TextStateInput = string | TextStateInputObject

export type InteractionInput = StateInputObject

export type TWColorHelperResponse = {
  absolute: boolean
  isTwColor: boolean
  color: string
  shade: number | undefined
  autoShade: boolean
  opacity: number
  colorString: string
  rootString: string
}

export type ElementInteractionShadesInput = {
  base?: number
  hover?: number
  click?: number
}
export type ThemeSubVariantShadeInput = {
  primary?: number
  secondary?: number
  tertiary?: number
  custom?: number
}
