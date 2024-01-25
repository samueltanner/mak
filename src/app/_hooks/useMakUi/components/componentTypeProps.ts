import { MakUiVariant } from "../types/default-types"
import {
  MakUiStateKey,
  MakUiThemeKey,
  TailwindModifier,
} from "../types/ui-types"

export type TypeProps = {
  primary?: boolean
  secondary?: boolean
  tertiary?: boolean
  success?: boolean
  error?: boolean
  warning?: boolean
  danger?: boolean
  info?: boolean
  custom?: boolean
  colorType?: MakUiVariant | undefined
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "custom"
    | "success"
    | "error"
    | "warning"
    | "danger"
    | "info"
    | string

  textPrimary?: boolean
  textSecondary?: boolean
  textTertiary?: boolean
  textSuccess?: boolean
  textError?: boolean
  textWarning?: boolean
  textDanger?: boolean
  textInfo?: boolean
  textCustom?: boolean
  textType?: MakUiVariant | undefined
  text?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "custom"
    | "success"
    | "error"
    | "warning"
    | "danger"
    | "info"
    | string

  borderPrimary?: boolean
  borderSecondary?: boolean
  borderTertiary?: boolean
  borderSuccess?: boolean
  borderError?: boolean
  borderWarning?: boolean
  borderDanger?: boolean
  borderInfo?: boolean
  borderCustom?: boolean
  borderType?: MakUiVariant | undefined
  border?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "custom"
    | "success"
    | "error"
    | "warning"
    | "danger"
    | "info"
    | string

  themeMode?: MakUiThemeKey | undefined
  themeLight?: boolean
  themeDark?: boolean
  themePrimary?: boolean
  themeSecondary?: boolean
  themeTertiary?: boolean
  themeCustom?: boolean
  themeType?: MakUiThemeKey | undefined
  theme?: "primary" | "secondary" | "tertiary" | "custom"

  textSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  borderPx?: number

  allowedDefaults?: MakUiStateKey[]
  allowedModifiers?: TailwindModifier[]
}

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
  allowedDefaults: [],
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

const getAllowedStates = (props: TypeProps) => {
  const allowedDefaults = ["base"]
  if (props.allowedDefaults) allowedDefaults.push(...props.allowedDefaults)
  return new Set(allowedDefaults)
}

const getAllowedModifiers = (props: TypeProps) => {
  const allowedModifiers = []
  if (props.allowedModifiers) allowedModifiers.push(...props.allowedModifiers)
  return new Set(allowedModifiers)
}

export const withComputedProps = (props: TypeProps) => {
  return {
    ...props,
    theme: getThemeValue(props),
    color: getColorValue(props),
    border: getBorderValue(props),
    text: getTextValue(props),
    themeMode: getThemeModeValue(props),
    allowedDefaults: getAllowedStates(props),
    allowedModifiers: getAllowedModifiers(props),
  }
}
