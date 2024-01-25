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
  return "primary"
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
  return "primary"
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
  return "primary"
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
    themeMode: getThemeModeValue(props),
    allowedStates: getAllowedStates(props),
    allowedModifiers: getAllowedModifiers(props),
    borderPx: props.borderPx,
    className: props.className,
  }
}
