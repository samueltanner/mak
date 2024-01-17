import {
  ThemeInput,
  MakUiThemePalette,
  VerboseThemeVariant,
  MakUiThemeVariants,
} from "./theme-types"

export type SimpleRecord = Record<string, any>

export type Interaction = "base" | "hover" | "click"

export type RootInteraction = "baseRoot" | "hoverRoot" | "clickRoot"

export type MakUiInteractionOutput = Interaction | RootInteraction

export type MakUiState =
  | "default"
  | "active"
  | "disabled"
  | "focused"
  | "selected"

export type MakUiVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "error"
  | "danger"
  | "warning"
  | "info"
  | "custom"

export type VerboseColorVariant =
  | "primaryColor"
  | "secondaryColor"
  | "tertiaryColor"
  | "successColor"
  | "errorColor"
  | "dangerColor"
  | "warningColor"
  | "infoColor"
  | "customColor"

export type VerboseTextVariant =
  | "primaryText"
  | "secondaryText"
  | "tertiaryText"
  | "successText"
  | "errorText"
  | "dangerText"
  | "warningText"
  | "infoText"
  | "customText"

export type VerboseBorderVariant =
  | "primaryBorder"
  | "secondaryBorder"
  | "tertiaryBorder"
  | "successBorder"
  | "errorBorder"
  | "dangerBorder"
  | "warningBorder"
  | "infoBorder"
  | "customBorder"

export type VerboseVariant =
  | MakUiVariant
  | VerboseColorVariant
  | VerboseTextVariant
  | VerboseBorderVariant
  | VerboseThemeVariant

export type NestedPaletteVariant = "color" | "text" | "border" | "theme"

export type MakUiInteractions = {
  [Key in Interaction]: string
}

export type MakUiStates = {
  [Key in MakUiInteractionOutput]: string
}

export type MakUiVariants = {
  [Key in MakUiState]: MakUiStates
}

export type MakUiPalette = {
  [Key in MakUiVariant]: MakUiVariants
}

export type StateInput =
  | string
  | {
      base: string
      hover?: string
      click?: string
    }

export type VariantInput =
  | string
  | {
      [Key in MakUiState]?: StateInput
    }

export type PaletteVariantInput = {
  [Key in MakUiVariant]?: VariantInput
}

export type VerbosePaletteInput = {
  [Key in VerboseVariant]?: string | VariantInput
}

export type NestedPaletteInput = {
  color?: PaletteVariantInput
  text?: PaletteVariantInput
  border?: PaletteVariantInput
  theme?: ThemeInput
}

export type MakUiPaletteInput = VerbosePaletteInput & NestedPaletteInput

export type MakUiActiveThemePalette = MakUiThemeVariants & {
  text: MakUiPalette
}

export type MakUiNestedPalette = {
  color: MakUiPalette
  text: MakUiPalette
  border: MakUiPalette
  theme: MakUiThemePalette
}

export type InteractionShades = {
  [Key in Interaction]: number
}

export type StateShades = {
  [Key in MakUiState]: InteractionShades
}

export type TWColorHelperResponse = {
  absolute: boolean
  isTwColor: boolean
  color: string
  shade: number | undefined
  autoShade: boolean
  opacity: number
  colorString: string
  rootString: string
  hex: string
}
