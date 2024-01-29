import {
  allowFalsyFallback,
  deepMerge,
} from "@/globals/global-helper-functions"
import { TypeProps, WithComponentPropsResponse } from "../types/component-types"
import {
  MakUiStateKey,
  MakUiThemeKey,
  MakUiThemeVariantKey,
  TailwindModifier,
} from "../types/ui-types"

export const typeProps: TypeProps = {
  //theme
  darkMode: false,
  lightMode: false,
  customMode: false,
  themeMode: "light",

  //themeVariant
  themeWhite: false,
  themeBlack: false,
  themeLight: false,
  themeDark: false,
  themePrimary: false,
  themeSecondary: false,
  themeTertiary: false,
  themeCustom: false,
  themeVariant: "primary",
  themeOpacity: 100,

  primary: false,
  secondary: false,
  tertiary: false,
  success: false,
  error: false,
  warning: false,
  danger: false,
  info: false,
  custom: false,
  variant: "primary",
  variantShade: 500,
  variantOpacity: 100,

  textPrimary: false,
  textSecondary: false,
  textTertiary: false,
  textSuccess: false,
  textError: false,
  textWarning: false,
  textDanger: false,
  textInfo: false,
  textCustom: false,
  text: "primary",
  textShade: 500,
  textOpacity: 100,

  borderPrimary: false,
  borderSecondary: false,
  borderTertiary: false,
  borderSuccess: false,
  borderError: false,
  borderWarning: false,
  borderDanger: false,
  borderInfo: false,
  borderCustom: false,
  border: "primary",
  borderShade: 500,
  borderOpacity: 100,

  textSize: undefined,
  borderPx: undefined,
  className: undefined,
  makClassName: undefined,
  state: [],
}

const getThemeModeValue = (props: TypeProps): MakUiThemeKey | undefined => {
  if (props.themeMode) return props.themeMode as MakUiThemeKey
  if (props.lightMode) return "light" as MakUiThemeKey
  if (props.darkMode) return "dark" as MakUiThemeKey
  if (props.customMode) return "custom" as MakUiThemeKey
  return undefined
}

const getThemeVariantValue = (
  props: TypeProps
): MakUiThemeVariantKey | undefined => {
  if (props.themeVariant) return props.themeVariant as MakUiThemeVariantKey
  if (props.themePrimary) return "primary" as MakUiThemeVariantKey
  if (props.themeSecondary) return "secondary" as MakUiThemeVariantKey
  if (props.themeTertiary) return "tertiary" as MakUiThemeVariantKey
  if (props.themeCustom) return "custom" as MakUiThemeVariantKey
  if (props.themeLight) return "light" as MakUiThemeVariantKey
  if (props.themeDark) return "dark" as MakUiThemeVariantKey
  if (props.themeWhite) return "white" as MakUiThemeVariantKey
  if (props.themeBlack) return "black" as MakUiThemeVariantKey
  return undefined
}

const getColorValue = (props: TypeProps) => {
  if (props.variant) return props.variant
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

export const withComputedProps = (
  props: TypeProps
): WithComponentPropsResponse => {
  // props = deepMerge(props, typeProps)
  return {
    ...props,
    mode: getThemeModeValue(props),
    theme: getThemeVariantValue(props),
    color: getColorValue(props),
    border: getBorderValue(props),
    text: getTextValue(props),
    themeOpacity: allowFalsyFallback(
      props.themeOpacity,
      typeProps.themeOpacity
    ),

    textOpacity: allowFalsyFallback(props.textOpacity, typeProps.textOpacity),
    variantOpacity: allowFalsyFallback(
      props.variantOpacity,
      typeProps.variantOpacity
    ),
    borderOpacity: allowFalsyFallback(
      props.borderOpacity,
      typeProps.borderOpacity
    ),

    textShade: allowFalsyFallback(props.textShade, typeProps.textShade),
    variantShade: allowFalsyFallback(
      props.variantShade,
      typeProps.variantShade
    ),
    borderShade: allowFalsyFallback(props.borderShade, typeProps.borderShade),
    state: allowFalsyFallback(props.state, typeProps.state),
    borderPx: allowFalsyFallback(props.borderPx, typeProps.borderPx),
    className: props.className,
    makClassName: props.makClassName,
  }
}
