import {
  MakUiInteractionStateKey,
  MakUiStateKey,
  MakUiThemeKey,
  MakUiThemeVariantKey,
  MakUiVariantKey,
  MakUiVerbosePalette,
  MakUiVerboseTheme,
  MakUiVerboseThemeVariant,
  MakUiVerboseVariant,
  Shade,
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
  //theme
  darkMode?: boolean
  lightMode?: boolean
  customMode?: boolean
  themeMode?: MakUiThemeKey | undefined

  //theme variant
  themeWhite?: boolean
  themeBlack?: boolean
  themeLight?: boolean
  themeDark?: boolean
  themeCustom?: boolean
  themePrimary?: boolean
  themeSecondary?: boolean
  themeTertiary?: boolean
  themeVariant?: MakUiThemeVariantKey | undefined
  themeOpacity?: number | undefined

  //variant
  primary?: boolean
  secondary?: boolean
  tertiary?: boolean
  success?: boolean
  error?: boolean
  warning?: boolean
  danger?: boolean
  info?: boolean
  custom?: boolean
  variant?:
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
    | undefined
  variantShade?: Shade | undefined
  variantOpacity?: number | undefined

  //text
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
    | undefined
  textShade?: Shade | undefined
  textOpacity?: number | undefined

  //border
  borderPrimary?: boolean
  borderSecondary?: boolean
  borderTertiary?: boolean
  borderSuccess?: boolean
  borderError?: boolean
  borderWarning?: boolean
  borderDanger?: boolean
  borderInfo?: boolean
  borderCustom?: boolean
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
    | undefined
  borderShade?: Shade | undefined
  borderOpacity?: number | undefined

  textSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  borderPx?: number
  className?: string
  makClassName?: string
  state?: MakUiStateKey[]
}

export type WithComponentPropsResponse = {
  mode: MakUiThemeKey | undefined
  theme: MakUiThemeVariantKey | undefined
  color: string | undefined
  border: string | undefined
  text: string | undefined
  themeOpacity: number | undefined
  textOpacity: number | undefined
  variantOpacity: number | undefined
  borderOpacity: number | undefined

  textShade: Shade | undefined
  variantShade: Shade | undefined
  borderShade: Shade | undefined

  state: MakUiStateKey[] | undefined

  borderPx: number | undefined
  className: string | undefined
  makClassName: string | undefined
}

export type ObjectToClassNameObjectProp = {
  object: GenericObject
  variant: MakUiVariantKey | string
  allowedStates?: Set<string>
  allowedModifiers?: Set<string>
}

export type ComponentWrapperResponse = {
  styleObject: GenericObject
  themeString: string | undefined
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
