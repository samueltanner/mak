import { MakUiButtonConfig } from "./button-types"

export type SimpleRecord = Record<string, any>

export type MakUiInteraction = "base" | "hover" | "click"

export type MakUiDarkInteraction = "baseDark" | "hoverDark" | "clickDark"

export type MakUiCustomInteraction =
  | "baseCustom"
  | "hoverCustom"
  | "clickCustom"

export type MakUiRootInteraction = "baseRoot" | "hoverRoot" | "clickRoot"

export type MakUiDarkRootInteraction =
  | "baseRootDark"
  | "hoverRootDark"
  | "clickRootDark"

export type MakUiCustomRootInteraction =
  | "baseRootCustom"
  | "hoverRootCustom"
  | "clickRootCustom"

export type MakUiThemeMode = "dark" | "light" | "custom"
export type VerboseThemeVariant = "darkTheme" | "lightTheme" | "customTheme"

export type MakUiThemeVariant = "primary" | "secondary" | "tertiary" | "custom"

export type ThemeRootVariant =
  | "primaryRoot"
  | "secondaryRoot"
  | "tertiaryRoot"
  | "customRoot"

export type ThemeVariantOutput = MakUiThemeVariant | ThemeRootVariant

export type MakUiThemeVariants = {
  [Key in ThemeVariantOutput]: string
}

export type MakUiThemePalette = {
  [Key in MakUiThemeMode]: MakUiThemeVariants
}

export type ThemeVariantInput =
  | string
  | {
      primary: string
      secondary?: string
      tertiary?: string
      custom?: string
    }

export type ThemeInput = {
  [Key in MakUiThemeMode]?: string | ThemeVariantInput
}

export type MakUiThemeVariantShades = {
  [Key in MakUiThemeVariant]: number
}

export type ThemeShades = {
  [Key in MakUiThemeMode]: MakUiThemeVariantShades
}

export type MakUiActivePalette = {
  theme: MakUiThemeVariants
  text: MakUiPalette
  border: MakUiPalette
  color: MakUiPalette
}

export type MakUiInteractionOutput =
  | MakUiInteraction
  | MakUiRootInteraction
  | MakUiDarkInteraction
  | MakUiDarkRootInteraction
  | MakUiCustomInteraction
  | MakUiCustomRootInteraction

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

export type MakUiDarkVariant =
  | "primaryDark"
  | "secondaryDark"
  | "tertiaryDark"
  | "customDark"
  | "successDark"
  | "errorDark"
  | "dangerDark"
  | "warningDark"
  | "infoDark"

export type MakUiCustomVariant =
  | "primaryCustom"
  | "secondaryCustom"
  | "tertiaryCustom"
  | "customCustom"
  | "successCustom"
  | "errorCustom"
  | "dangerCustom"
  | "warningCustom"
  | "infoCustom"

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

export type MakUiNestedPaletteVariant = "color" | "text" | "border" | "theme"

export type MakUiInteractions = {
  [Key in
    | MakUiInteraction
    | MakUiDarkInteraction
    | MakUiCustomInteraction]: string
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

export type MakUiNestedPalette = {
  color: MakUiPalette
  text: MakUiPalette
  border: MakUiPalette
  theme: MakUiThemePalette
}

export type MakUiSimpleNestedPalette = {
  color: MakUiSimplePalette
  text: MakUiSimplePalette
  border: MakUiSimplePalette
  theme: MakUiSimpleThemePalette
}

export type MakUiSimpleThemeVariant = {
  [Key in MakUiThemeVariant]: string
}

export type MakUiSimplePalette = {
  [Key in MakUiVariant | MakUiDarkVariant | MakUiCustomVariant]: string
}

export type MakUiSimpleThemePalette = {
  [Key in MakUiThemeMode]: {
    [Key in MakUiThemeVariant]: string
  }
}

export type MakUiSimpleSeparatedPaletteVariants = {
  [Key in MakUiVariant]: string
}

export type MakUiSimpleTheme = {
  color: MakUiSimpleSeparatedPaletteVariants
  text: MakUiSimpleSeparatedPaletteVariants
  border: MakUiSimpleSeparatedPaletteVariants
  theme: MakUiSimpleThemeVariant
}

export type MakUiSimplePalettes = {
  [Key in MakUiThemeMode]: MakUiSimpleTheme
}
export type MakUiSeparatedPalette = {
  [Key in MakUiVariant]: {
    [Key in MakUiState]: {
      [Key in MakUiInteraction | MakUiRootInteraction]: string
    }
  }
}
export type MakUiVerboseTheme = {
  text: MakUiSeparatedPalette
  border: MakUiSeparatedPalette
  color: MakUiSeparatedPalette
  theme: MakUiThemeVariants
}

export type MakUiVerbosePalettes = {
  dark: MakUiVerboseTheme
  light: MakUiVerboseTheme
  custom: MakUiVerboseTheme
}

export type InteractionShades = {
  [Key in MakUiInteraction]: number
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

export type MakUiComponentConfig = {
  buttonConfig?: MakUiButtonConfig
}