// Generic Types

export type GenericObject = Record<string, any>

// KEYS

export type TailwindVariantKey =
  | "bg"
  | "text"
  | "border"
  | "ring"
  | "outline"
  | "ring-offset"
  | "fill"
  | "stroke"

export type TailwindModifier =
  | "peer"
  | "group"
  | "has"
  | "group-has"
  | "peer-has"

export type HtmlElementKey =
  | "button"
  | "input"
  | "text"
  | "form"
  | "dialog"
  | "select"
  | "textarea"

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
  | "light"
  | "dark"


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
  | "light"
  | "dark"

export type MakUiCustomInteractionStateKey = "base" | "click"

export type MakUiInteractionStateKey =
  | "active"
  | "autofill"
  | "checked"
  | "closed"
  | "default"
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

export type MakUiStateKey =
  | MakUiInteractionStateKey
  | MakUiCustomInteractionStateKey

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
  [Key in MakUiThemeKey]: MakUiSimpleTheme
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
  [Key in MakUiVariantKey]: {
    base: string
    active: string
    click: string
    default: string
    focus: string
    hover: string
    disabled: string
    selected: string
  }
}

export type MakUiSimpleThemeVariant = {
  [Key in MakUiThemeVariantKey]: string
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
  [Key in MakUiVariantKey]?: string | MakUiStateInput
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
      light: string
      dark: string
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

export type ParsedClassNameResponse = {
  theme: MakUiThemeKey | undefined
  palette: MakUiPaletteKey
  variant: MakUiVariantKey
  themeVariant: MakUiThemeVariantKey
  state: MakUiStateKey | undefined
  twVariant: TailwindVariantKey
  opacity: string | undefined
  string: string
}
