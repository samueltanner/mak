// Generic Types

import { makUiThemeVariants } from "../constants/ui-constants"
import { MakUiButtonConfigInput } from "./button-types"

export type GenericObject = Record<string, any>

// KEYS

export type MakUiThemeKeySH = "drk" | "lgt" | "cst"

export type MakUiPaletteKeySH = "col" | "txt" | "bor" | "thm"

export type MakUiThemeVariantKeySH = "pri" | "sec" | "ter" | "cst"

export type MakUiVariantKeySH =
  | MakUiThemeVariantKeySH
  | "suc"
  | "err"
  | "dng"
  | "war"
  | "inf"

export type MakUiThemeKey = "dark" | "light" | "custom"

export type MakUiPaletteKey = "color" | "text" | "border" | "theme"

export type MakUiThemeVariantKey =
  | "primary"
  | "secondary"
  | "tertiary"
  | "custom"

export type MakUiVariantRootKey =
  | "primaryRoot"
  | "secondaryRoot"
  | "tertiaryRoot"
  | "customRoot"

export type MakUiVariantKey =
  | MakUiThemeVariantKey
  | "success"
  | "error"
  | "danger"
  | "warning"
  | "info"

export type MakUiStateKey =
  | "base"
  | "active"
  | "autofill"
  | "checked"
  | "closed"
  | "default"
  | "click"
  | "disabled"
  | "empty"
  | "enabled"
  | "focus"
  | "focus-visible"
  | "focus-within"
  | "hover"
  | "in-range"
  | "indeterminate"
  | "invalid"
  | "open"
  | "out-of-range"
  | "placeholder-shown"
  | "read-only"
  | "required"
  | "selected"
  | "selection"
  | "target"
  | "valid"
  | "visited"

export type MakUiRootStateKey =
  | "openRoot"
  | "closedRoot"
  | "defaultRoot"
  | "emptyRoot"
  | "disabledRoot"
  | "enabledRoot"
  | "checkedRoot"
  | "indeterminateRoot"
  | "requiredRoot"
  | "invalidRoot"
  | "validRoot"
  | "in-rangeRoot"
  | "out-of-rangeRoot"
  | "placeholder-shownRoot"
  | "read-onlyRoot"
  | "autofillRoot"
  | "hoverRoot"
  | "focusRoot"
  | "activeRoot"
  | "visitedRoot"
  | "selectionRoot"
  | "selectedRoot"

// VERBOSE OUTPUT TYPES

export type MakUiVerbosePalette = {
  [Key in MakUiThemeKey]: MakUiVerboseTheme
}

export type MakUiVerboseTheme = {
  color: MakUiVerboseVariant
  text: MakUiVerboseVariant
  border: MakUiVerboseVariant
  theme: MakUiVerboseThemeVariant
}

export type MakUiVerboseVariant = {
  [Key in MakUiVariantKey]: MakUiState
}

export type MakUiVerboseThemeVariant = {
  [Key in MakUiThemeVariantKey]: string
}

export type MakUiState = {
  [Key in MakUiStateKey]: string
}

// SIMPLE OUTPUT TYPES

export type MakUiSimplePalette = {
  [Key in MakUiThemeKey | MakUiThemeKeySH]: MakUiSimpleTheme
}

export type MakUiSimpleTheme = {
  color: MakUiSimpleVariant
  text: MakUiSimpleVariant
  border: MakUiSimpleVariant
  theme: MakUiSimpleThemeVariant

  // col: MakUiSimpleVariant
  // txt: MakUiSimpleVariant
  // bor: MakUiSimpleVariant
  // thm: MakUiSimpleThemeVariant
}

export type MakUiSimpleVariant = {
  [Key in MakUiVariantKey | MakUiVariantKeySH]: string
}

export type MakUiSimpleThemeVariant = {
  [Key in MakUiThemeVariantKey | MakUiThemeVariantKeySH]: string
}

export type MakUiSimpleState = {
  [Key in MakUiStateKey]: string
}

// INPUTS

export type MakUiPaletteInput = {
  [Key in MakUiThemeKey]?: MakUiThemeInput
}

export type MakUiThemePaletteInput = {
  color?: string | MakUiVariantInput
  text?: string | MakUiVariantInput
  border?: string | MakUiVariantInput
  theme?: string | MakUiThemeVariantInput
}

export type MakUiVariantPaletteInput = {
  [Key in MakUiVariantKey]: string | MakUiStateInput
}

export type MakUiFlexiblePaletteInput =
  | MakUiPaletteInput
  | MakUiThemePaletteInput
  | MakUiVariantPaletteInput

export type MakUiThemeInput = {
  color?: MakUiVariantInput
  text?: MakUiVariantInput
  border?: MakUiVariantInput
  theme?: MakUiThemeVariantInput
}

export type MakUiVariantInput =
  | string
  | {
      [Key in MakUiVariantKey]?: string | MakUiStateInput
    }

export type MakUiThemeVariantInput =
  | string
  | {
      [Key in MakUiThemeVariantKey]?: string
    }

export type MakUiStateInput = {
  [Key in MakUiStateKey]?: string
}

export type MakUiThemeShadesInput = {
  [Key in MakUiThemeKey]?: {
    [Key in MakUiThemeVariantKey]?: number
  }
}

export type MakUiComponentConfigInput = {
  buttonConfig?: MakUiButtonConfigInput
}

// Default Types

export type MakUiThemeVariantShades = {
  [Key in MakUiThemeVariantKey]: number
}
export type MakUiThemeShades = {
  [Key in MakUiThemeKey]: MakUiThemeVariantShades
}

export type MakUiStateShades = {
  [Key in MakUiStateKey]: number
}
export type MakUiThemeColors = {
  [Key in MakUiThemeKey]: {
    [Key in MakUiThemeVariantKey]: string
  }
}

export type MakUiDefaultColors = {
  [Key in MakUiVariantKey]: string
}

export type MakUiDefaultStateColors = {
  [Key in MakUiStateKey]: string
}

export type MakUiDefaultPalette = {
  [Key in MakUiThemeKey]: {
    color: {
      [Key in MakUiVariantKey]: string
    }
    text: string
    border: string
    theme: {
      primary: string
      secondary: string
      tertiary: string
      custom: string
    }
  }
}
// Helper Function Types

export type TWColorHelperResponse = {
  absolute: boolean
  isTwColor: boolean
  color: string | undefined
  shade: number | undefined
  autoShade: boolean
  autoColor: boolean
  opacity: number
  colorString: string
  rootString: string
  hex: string
}
