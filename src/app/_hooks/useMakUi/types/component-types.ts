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
  className?: string

  allowedStates?: MakUiStateKey[]
  allowedModifiers?: TailwindModifier[]
}

export type WithComponentPropsResponse = {
  theme: MakUiThemeKey | undefined
  color: string
  border: string
  text: string
  themeMode: MakUiThemeKey | undefined
  allowedStates: Set<MakUiStateKey>
  allowedModifiers: Set<TailwindModifier>
  borderPx: number | undefined
  className: string | undefined
}

export type ObjectToClassNameObjectProp = {
  object: GenericObject
  variant: MakUiVariantKey | string
  modifier?: TailwindModifier
  allowedStates?: Set<string>
  allowedModifiers?: Set<string>
}
export type ObjectToClassNameArrayProp = [
  GenericObject,
  MakUiVariantKey | string,
  TailwindModifier?
]
export type ObjectToClassNameProps =
  | ObjectToClassNameArrayProp
  | ObjectToClassNameObjectProp

export type ComponentWrapperResponse = {
  textString: string
  colorString: string
  borderString: string
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
  objectToClassName: (
    ...args: ObjectToClassNameArrayProp | ObjectToClassNameObjectProp[]
  ) => string
}
