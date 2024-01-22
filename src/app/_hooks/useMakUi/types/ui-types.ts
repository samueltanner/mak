// KEYS

export type MakUiThemeKeysSH = "drk" | "lgt" | "cst"

export type MakUiPaletteKeysSH = "col" | "txt" | "bor" | "thm"

export type MakUiThemeVariantKeysSH = "pri" | "sec" | "ter" | "cst"

export type MakUiVariantKeysSH =
  | MakUiThemeVariantKeysSH
  | "suc"
  | "err"
  | "dng"
  | "war"
  | "inf"

export type MakUiThemeKeys = "dark" | "light" | "custom"

export type MakUiPaletteKeys = "color" | "text" | "border" | "theme"

export type MakUiThemeVariantKeys =
  | "primary"
  | "secondary"
  | "tertiary"
  | "custom"

export type MakUiVariantRootKeys =
  | "primaryRoot"
  | "secondaryRoot"
  | "tertiaryRoot"
  | "customRoot"

export type MakUiVariantKeys =
  | MakUiThemeVariantKeys
  | "success"
  | "error"
  | "danger"
  | "warning"
  | "info"

export type MakUiStateKeys =
  | "default"
  | "active"
  | "autofill"
  | "checked"
  | "closed"
  | "disabled"
  | "empty"
  | "enabled"
  | "focus"
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
  | "valid"
  | "visited"

export type MakUiRootStateKeys =
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
  [Key in MakUiThemeKeys]: MakUiVerboseTheme
}

export type MakUiVerboseTheme = {
  color: MakUiVerboseVariant
  text: MakUiVerboseVariant
  border: MakUiVerboseVariant
  theme: MakUiVerboseThemeVariant
}

export type MakUiVerboseVariant = {
  [Key in MakUiVariantKeys]: MakUiState
}

export type MakUiVerboseThemeVariant = {
  [Key in MakUiThemeVariantKeys]: string
}

export type MakUiState = {
  [Key in MakUiStateKeys]: string
}

// SIMPLE OUTPUT TYPES

export type MakUiSimplePalette = {
  [Key in MakUiThemeKeys | MakUiThemeKeysSH]: MakUiSimpleTheme
}

export type MakUiSimpleTheme = {
  color: MakUiSimpleVariant
  text: MakUiSimpleVariant
  border: MakUiSimpleVariant
  theme: MakUiSimpleThemeVariant

  col: MakUiSimpleVariant
  txt: MakUiSimpleVariant
  bor: MakUiSimpleVariant
  thm: MakUiSimpleThemeVariant
}

export type MakUiSimpleVariant = {
  [Key in MakUiVariantKeys | MakUiVariantKeysSH]: string
}

export type MakUiSimpleThemeVariant = {
  [Key in MakUiThemeVariantKeys | MakUiThemeVariantKeysSH]: string
}

export type MakUiSimpleState = {
  [Key in MakUiStateKeys]: string
}

// INPUTS

export type MakUiPaletteInput = {
  [Key in MakUiThemeKeys]?: string
}

export type MakUiThemeInput = {
  color?: string | MakUiVariantInput
  text?: string | MakUiVariantInput
  border?: string | MakUiVariantInput
  theme?: string | MakUiThemeVariantInput
}

export type MakUiVariantInput = {
  [Key in MakUiVariantKeys]?: string
}

export type MakUiThemeVariantInput = {
  [Key in MakUiThemeVariantKeys]?: string
}

export type MakUiStateInput = {
  [Key in MakUiStateKeys]?: string
}
