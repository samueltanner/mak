import { TypeProps, WithComponentPropsResponse } from "../types/component-types"
import {
  MakUiStateKey,
  MakUiThemeKey,
  TailwindModifier,
} from "../types/ui-types"

export const typeProps: TypeProps = {
  primary: false,
  secondary: false,
  tertiary: false,
  success: false,
  error: false,
  warning: false,
  danger: false,
  info: false,
  custom: false,
  light: false,
  dark: false,
  colorType: "primary",

  textPrimary: false,
  textSecondary: false,
  textTertiary: false,
  textSuccess: false,
  textError: false,
  textWarning: false,
  textDanger: false,
  textInfo: false,
  textCustom: false,
  textLight: false,
  textDark: false,
  textType: "primary",

  borderPrimary: false,
  borderSecondary: false,
  borderTertiary: false,
  borderSuccess: false,
  borderError: false,
  borderWarning: false,
  borderDanger: false,
  borderInfo: false,
  borderCustom: false,
  borderLight: false,
  borderDark: false,
  borderType: "primary",

  themeMode: "light",
  themeLight: false,
  themeDark: false,
  themePrimary: false,
  themeSecondary: false,
  themeTertiary: false,
  themeCustom: false,
  themeType: undefined,

  textSize: undefined,
  borderPx: undefined,
  allowedStates: [],
  allowedModifiers: [],
  className: undefined,
  makName: undefined,
  state: [],

  textBase: true,
  textClick: false,
  textActive: false,
  textAutofill: false,
  textChecked: false,
  textClosed: false,
  textDefault: false,
  textDisabled: false,
  textEmpty: false,
  textEnabled: false,
  textFocus: false,
  textFocusVisible: false,
  textFocusWithin: false,
  textHover: false,
  textInRange: false,
  textIndeterminate: false,
  textInvalid: false,
  textOpen: false,
  textOutOfRange: false,
  textPlaceholderShown: false,
  textReadOnly: false,
  textRequired: false,
  textSelected: false,
  textSelection: false,
  textTarget: false,
  textValid: false,
  textVisited: false,

  colorBase: true,
  colorClick: false,
  colorActive: false,
  colorAutofill: false,
  colorChecked: false,
  colorClosed: false,
  colorDefault: false,
  colorDisabled: false,
  colorEmpty: false,
  colorEnabled: false,
  colorFocus: false,
  colorFocusVisible: false,
  colorFocusWithin: false,
  colorHover: false,
  colorInRange: false,
  colorIndeterminate: false,
  colorInvalid: false,
  colorOpen: false,
  colorOutOfRange: false,
  colorPlaceholderShown: false,
  colorReadOnly: false,
  colorRequired: false,
  colorSelected: false,
  colorSelection: false,
  colorTarget: false,
  colorValid: false,
  colorVisited: false,

  borderBase: true,
  borderClick: false,
  borderActive: false,
  borderAutofill: false,
  borderChecked: false,
  borderClosed: false,
  borderDefault: false,
  borderDisabled: false,
  borderEmpty: false,
  borderEnabled: false,
  borderFocus: false,
  borderFocusVisible: false,
  borderFocusWithin: false,
  borderHover: false,
  borderInRange: false,
  borderIndeterminate: false,
  borderInvalid: false,
  borderOpen: false,
  borderOutOfRange: false,
  borderPlaceholderShown: false,
  borderReadOnly: false,
  borderRequired: false,
  borderSelected: false,
  borderSelection: false,
  borderTarget: false,
  borderValid: false,
  borderVisited: false,
}

const getThemeModeValue = (props: TypeProps): MakUiThemeKey | undefined => {
  if (props.themeMode) return props.themeMode as MakUiThemeKey
  if (props.themeLight) return "light" as MakUiThemeKey
  if (props.themeDark) return "dark" as MakUiThemeKey
  return undefined
}

const getThemeValue = (props: TypeProps): MakUiThemeKey | undefined => {
  if (props.theme) return props.theme as MakUiThemeKey
  if (props.themeType) return props.themeType as MakUiThemeKey
  if (props.themePrimary) return "primary" as MakUiThemeKey
  if (props.themeSecondary) return "secondary" as MakUiThemeKey
  if (props.themeTertiary) return "tertiary" as MakUiThemeKey
  if (props.themeCustom) return "custom" as MakUiThemeKey
  if (props.themeLight) return "light" as MakUiThemeKey
  if (props.themeDark) return "dark" as MakUiThemeKey
  return undefined
}

const getColorValue = (props: TypeProps) => {
  if (props.color) return props.color
  if (props.colorType) return props.colorType
  if (props.primary) return "primary"
  if (props.secondary) return "secondary"
  if (props.tertiary) return "tertiary"
  if (props.success) return "success"
  if (props.error) return "error"
  if (props.warning) return "warning"
  if (props.danger) return "danger"
  if (props.info) return "info"
  if (props.custom) return "custom"
  return undefined
}

const getBorderValue = (props: TypeProps) => {
  if (props.border) return props.border
  if (props.borderType) return props.borderType
  if (props.borderPrimary) return "primary"
  if (props.borderSecondary) return "secondary"
  if (props.borderTertiary) return "tertiary"
  if (props.borderSuccess) return "success"
  if (props.borderError) return "error"
  if (props.borderWarning) return "warning"
  if (props.borderDanger) return "danger"
  if (props.borderInfo) return "info"
  if (props.borderCustom) return "custom"
  return undefined
}

const getTextValue = (props: TypeProps) => {
  if (props.text) return props.text
  if (props.textType) return props.textType
  if (props.textPrimary) return "primary"
  if (props.textSecondary) return "secondary"
  if (props.textTertiary) return "tertiary"
  if (props.textSuccess) return "success"
  if (props.textError) return "error"
  if (props.textWarning) return "warning"
  if (props.textDanger) return "danger"
  if (props.textInfo) return "info"
  if (props.textCustom) return "custom"
  return undefined
}

const getColorStates = (props: TypeProps): Set<MakUiStateKey> => {
  const colorStates = [] as MakUiStateKey[]
  if (props.colorBase) colorStates.push("base")
  if (props.colorClick) colorStates.push("click")
  if (props.colorActive) colorStates.push("active")
  if (props.colorAutofill) colorStates.push("autofill")
  if (props.colorChecked) colorStates.push("checked")
  if (props.colorClosed) colorStates.push("closed")
  if (props.colorDefault) colorStates.push("default")
  if (props.colorDisabled) colorStates.push("disabled")
  if (props.colorEmpty) colorStates.push("empty")
  if (props.colorEnabled) colorStates.push("enabled")
  if (props.colorFocus) colorStates.push("focus")
  if (props.colorFocusVisible) colorStates.push("focus-visible")
  if (props.colorFocusWithin) colorStates.push("focus-within")
  if (props.colorHover) colorStates.push("hover")
  if (props.colorInRange) colorStates.push("in-range")
  if (props.colorIndeterminate) colorStates.push("indeterminate")
  if (props.colorInvalid) colorStates.push("invalid")
  if (props.colorOpen) colorStates.push("open")
  if (props.colorOutOfRange) colorStates.push("out-of-range")
  if (props.colorPlaceholderShown) colorStates.push("placeholder-shown")
  if (props.colorReadOnly) colorStates.push("read-only")
  if (props.colorRequired) colorStates.push("required")
  if (props.colorSelected) colorStates.push("selected")
  if (props.colorSelection) colorStates.push("selection")
  if (props.colorTarget) colorStates.push("target")
  if (props.colorValid) colorStates.push("valid")
  if (props.colorVisited) colorStates.push("visited")

  return new Set(colorStates)
}

const getBorderStates = (props: TypeProps): Set<MakUiStateKey> => {
  const borderStates = [] as MakUiStateKey[]
  if (props.borderBase) borderStates.push("base")
  if (props.borderClick) borderStates.push("click")
  if (props.borderActive) borderStates.push("active")
  if (props.borderAutofill) borderStates.push("autofill")
  if (props.borderChecked) borderStates.push("checked")
  if (props.borderClosed) borderStates.push("closed")
  if (props.borderDefault) borderStates.push("default")
  if (props.borderDisabled) borderStates.push("disabled")
  if (props.borderEmpty) borderStates.push("empty")
  if (props.borderEnabled) borderStates.push("enabled")
  if (props.borderFocus) borderStates.push("focus")
  if (props.borderFocusVisible) borderStates.push("focus-visible")
  if (props.borderFocusWithin) borderStates.push("focus-within")
  if (props.borderHover) borderStates.push("hover")
  if (props.borderInRange) borderStates.push("in-range")
  if (props.borderIndeterminate) borderStates.push("indeterminate")
  if (props.borderInvalid) borderStates.push("invalid")
  if (props.borderOpen) borderStates.push("open")
  if (props.borderOutOfRange) borderStates.push("out-of-range")
  if (props.borderPlaceholderShown) borderStates.push("placeholder-shown")
  if (props.borderReadOnly) borderStates.push("read-only")
  if (props.borderRequired) borderStates.push("required")
  if (props.borderSelected) borderStates.push("selected")
  if (props.borderSelection) borderStates.push("selection")
  if (props.borderTarget) borderStates.push("target")
  if (props.borderValid) borderStates.push("valid")
  if (props.borderVisited) borderStates.push("visited")

  return new Set(borderStates)
}

const getTextStates = (props: TypeProps): Set<MakUiStateKey> => {
  const textStates = [] as MakUiStateKey[]
  if (props.textBase) textStates.push("base")
  if (props.textClick) textStates.push("click")
  if (props.textActive) textStates.push("active")
  if (props.textAutofill) textStates.push("autofill")
  if (props.textChecked) textStates.push("checked")
  if (props.textClosed) textStates.push("closed")
  if (props.textDefault) textStates.push("default")
  if (props.textDisabled) textStates.push("disabled")
  if (props.textEmpty) textStates.push("empty")
  if (props.textEnabled) textStates.push("enabled")
  if (props.textFocus) textStates.push("focus")
  if (props.textFocusVisible) textStates.push("focus-visible")
  if (props.textFocusWithin) textStates.push("focus-within")
  if (props.textHover) textStates.push("hover")
  if (props.textInRange) textStates.push("in-range")
  if (props.textIndeterminate) textStates.push("indeterminate")
  if (props.textInvalid) textStates.push("invalid")
  if (props.textOpen) textStates.push("open")
  if (props.textOutOfRange) textStates.push("out-of-range")
  if (props.textPlaceholderShown) textStates.push("placeholder-shown")
  if (props.textReadOnly) textStates.push("read-only")
  if (props.textRequired) textStates.push("required")
  if (props.textSelected) textStates.push("selected")
  if (props.textSelection) textStates.push("selection")
  if (props.textTarget) textStates.push("target")
  if (props.textValid) textStates.push("valid")
  if (props.textVisited) textStates.push("visited")

  return new Set(textStates)
}

const getAllowedStates = (props: TypeProps): Set<MakUiStateKey> => {
  const allowedStates = ["base" as MakUiStateKey]
  if (props.allowedStates) allowedStates.push(...props.allowedStates)
  return new Set(allowedStates)
}

const getAllowedModifiers = (props: TypeProps): Set<TailwindModifier> => {
  const allowedModifiers = [] as TailwindModifier[]
  if (props.allowedModifiers) allowedModifiers.push(...props.allowedModifiers)
  return new Set(allowedModifiers)
}

export const withComputedProps = (
  props: TypeProps
): WithComponentPropsResponse => {
  return {
    ...props,
    theme: getThemeValue(props),
    color: getColorValue(props),
    border: getBorderValue(props),
    text: getTextValue(props),
    colorStates: getColorStates(props),
    borderStates: getBorderStates(props),
    textStates: getTextStates(props),
    themeMode: getThemeModeValue(props),
    allowedStates: getAllowedStates(props),
    allowedModifiers: getAllowedModifiers(props),
    borderPx: props.borderPx,
    className: props.className,
  }
}
