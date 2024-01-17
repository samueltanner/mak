import { ThemeInput, VerboseThemeVariant } from "./theme-types";

export type Interaction = "base" | "hover" | "click"

export type RootInteraction = "baseRoot" | "hoverRoot" | "clickRoot"

export type InteractionOutput = Interaction | RootInteraction

export type State = "default" | "active" | "disabled" | "focused" | "selected"

export type Variant =
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
  | Variant
  | VerboseColorVariant
  | VerboseTextVariant
  | VerboseBorderVariant
  | VerboseThemeVariant

export type NestedPaletteVariant = "color" | "text" | "border" | "theme"

export type InteractionOutputs = {
  [Key in InteractionOutput]: string
}

export type States = {
  [Key in State]: InteractionOutputs
}

export type Variants = {
  [Key in Variant]: States
}

export type Palette = {
  [Key in Variant]: Variants
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
      [Key in State]?: StateInput
    }

export type PaletteVariantInput = {
  [Key in Variant]?: VariantInput
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

export type OvaiUiPaletteInput = VerbosePaletteInput & NestedPaletteInput

export type InteractionShades = {
  [Key in Interaction]: number
}

export type StateShades = {
  [Key in State]: InteractionShades
}
