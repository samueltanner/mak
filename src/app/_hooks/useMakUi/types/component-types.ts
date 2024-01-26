import {
  MakUiInteractionStateKey,
  MakUiStateKey,
  MakUiThemeKey,
  MakUiVariantKey,
  MakUiVerbosePalette,
  MakUiVerboseTheme,
  MakUiVerboseThemeVariant,
  MakUiVerboseVariant,
  TailwindModifier,
} from "./ui-types"

export type MakUiRootComponentConfigInput = {
  [key: string]: string | undefined | MakUiInteractionStateKey[]
  borderRadius?: string
  borderWidth?: string
  borderStyle?: string
  className?: string
  text?: string
  enabledStates?: MakUiInteractionStateKey[]
}
export type MakUiRootComponentConfig = {
  [key: string]: string | undefined | MakUiInteractionStateKey[]
  borderRadius?: string
  borderWidth?: string
  borderStyle?: string
  className: string
  text?: string
  enabledStates: MakUiInteractionStateKey[]
}
export type MakUiComponentConfigInput = {
  buttonConfig?: MakUiRootComponentConfigInput
  inputConfig?: MakUiRootComponentConfigInput
  textConfig?: MakUiRootComponentConfigInput
  formConfig?: MakUiRootComponentConfigInput
  dialogConfig?: MakUiRootComponentConfigInput
  selectConfig?: MakUiRootComponentConfigInput
  textareaConfig?: MakUiRootComponentConfigInput
}

export type MakUiComponentConfig = {
  buttonConfig: MakUiRootComponentConfig
  inputConfig: MakUiRootComponentConfig
  textConfig: MakUiRootComponentConfig
  formConfig: MakUiRootComponentConfig
  dialogConfig: MakUiRootComponentConfig
  selectConfig: MakUiRootComponentConfig
  textareaConfig: MakUiRootComponentConfig
}
export type ButtonVariants = {
  [key: string]: ButtonStates
  primary: ButtonStates
  secondary: ButtonStates
  tertiary: ButtonStates
  success: ButtonStates
  danger: ButtonStates
  warning: ButtonStates
  info: ButtonStates
  custom: ButtonStates
}

export type ButtonStates = {
  [key: string]: ButtonSubStates
  default: ButtonSubStates
  active: ButtonSubStates
  disabled: ButtonSubStates
}

export type ButtonSubStates = {
  [key: string]: string
  normal: string
  hover: string
  focus: string
  clicked: string
  normalBorder: string
  hoverBorder: string
  focusBorder: string
  clickedBorder: string
}

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
  light?: boolean
  dark?: boolean
  colorType?: MakUiVariantKey | undefined
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
    | "light"
    | "dark"
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
  textLight?: boolean
  textDark?: boolean
  textType?: MakUiVariantKey | undefined
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
    | "light"
    | "dark"
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
  borderLight?: boolean
  borderDark?: boolean
  borderType?: MakUiVariantKey | undefined
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
    | "light"
    | "dark"
    | string
    | undefined

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
  className?: string
  makName?: string
  state?: MakUiStateKey[]

  // textNotBase?: boolean
  // textBase?: boolean
  // textClick?: boolean
  // textActive?: boolean
  // textAutofill?: boolean
  // textChecked?: boolean
  // textClosed?: boolean
  // textDefault?: boolean
  // textDisabled?: boolean
  // textEmpty?: boolean
  // textEnabled?: boolean
  // textFocus?: boolean
  // textFocusVisible?: boolean
  // textFocusWithin?: boolean
  // textHover?: boolean
  // textInRange?: boolean
  // textIndeterminate?: boolean
  // textInvalid?: boolean
  // textOpen?: boolean
  // textOutOfRange?: boolean
  // textPlaceholderShown?: boolean
  // textReadOnly?: boolean
  // textRequired?: boolean
  // textSelected?: boolean
  // textSelection?: boolean
  // textTarget?: boolean
  // textValid?: boolean
  // textVisited?: boolean
  // textStates?: MakUiStateKey[]

  // colorNotBase?: boolean
  // colorBase?: boolean
  // colorClick?: boolean
  // colorActive?: boolean
  // colorAutofill?: boolean
  // colorChecked?: boolean
  // colorClosed?: boolean
  // colorDefault?: boolean
  // colorDisabled?: boolean
  // colorEmpty?: boolean
  // colorEnabled?: boolean
  // colorFocus?: boolean
  // colorFocusVisible?: boolean
  // colorFocusWithin?: boolean
  // colorHover?: boolean
  // colorInRange?: boolean
  // colorIndeterminate?: boolean
  // colorInvalid?: boolean
  // colorOpen?: boolean
  // colorOutOfRange?: boolean
  // colorPlaceholderShown?: boolean
  // colorReadOnly?: boolean
  // colorRequired?: boolean
  // colorSelected?: boolean
  // colorSelection?: boolean
  // colorTarget?: boolean
  // colorValid?: boolean
  // colorVisited?: boolean
  // colorStates?: MakUiStateKey[]

  // borderNotBase?: boolean
  // borderBase?: boolean
  // borderClick?: boolean
  // borderActive?: boolean
  // borderAutofill?: boolean
  // borderChecked?: boolean
  // borderClosed?: boolean
  // borderDefault?: boolean
  // borderDisabled?: boolean
  // borderEmpty?: boolean
  // borderEnabled?: boolean
  // borderFocus?: boolean
  // borderFocusVisible?: boolean
  // borderFocusWithin?: boolean
  // borderHover?: boolean
  // borderInRange?: boolean
  // borderIndeterminate?: boolean
  // borderInvalid?: boolean
  // borderOpen?: boolean
  // borderOutOfRange?: boolean
  // borderPlaceholderShown?: boolean
  // borderReadOnly?: boolean
  // borderRequired?: boolean
  // borderSelected?: boolean
  // borderSelection?: boolean
  // borderTarget?: boolean
  // borderValid?: boolean
  // borderVisited?: boolean
  // borderStates?: MakUiStateKey[]
}

export type WithComponentPropsResponse = {
  theme: MakUiThemeKey | undefined
  color: string | undefined
  border: string | undefined
  text: string | undefined
  // colorStates: Set<MakUiStateKey | "not-base">
  // textStates: Set<MakUiStateKey | "not-base">
  // borderStates: Set<MakUiStateKey | "not-base">
  themeMode: MakUiThemeKey | undefined
  borderPx: number | undefined
  className: string | undefined
}

export type ObjectToClassNameObjectProp = {
  object: GenericObject
  variant: MakUiVariantKey | string
  allowedStates?: Set<string>
  allowedModifiers?: Set<string>
}

export type ComponentWrapperResponse = {
  textString: string | undefined
  colorString: string | undefined
  borderString: string | undefined
  componentTheme: MakUiVerboseThemeVariant
  componentText: MakUiVerboseVariant
  componentColor: MakUiVerboseVariant
  componentBorder: MakUiVerboseVariant
  componentPalette: MakUiVerboseTheme
  componentThemeMode: MakUiThemeKey | undefined
  globalThemeMode: MakUiThemeKey
  globalPalette: MakUiVerbosePalette
  globalTheme: MakUiVerboseTheme
  borderPx: number | undefined
  className: string | undefined
  objectToClassName: (args: ObjectToClassNameObjectProp) => string
}
