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
  light?: boolean
  dark?: boolean
  variant?: MakUiVariantKey | string | undefined
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
  text?: MakUiVariantKey | string | undefined
  textShade?: Shade | undefined
  textOpacity?: number | undefined

  bgPrimary?: boolean
  bgSecondary?: boolean
  bgTertiary?: boolean
  bgSuccess?: boolean
  bgError?: boolean
  bgWarning?: boolean
  bgDanger?: boolean
  bgInfo?: boolean
  bgCustom?: boolean
  bgLight?: boolean
  bgDark?: boolean
  bg?: MakUiVariantKey | string | undefined
  bgShade?: Shade | undefined
  bgOpacity?: number | undefined

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
  borderLight?: boolean
  borderDark?: boolean
  border?: MakUiVariantKey | string | undefined
  borderShade?: Shade | undefined
  borderOpacity?: number | undefined

  textSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  borderPx?: number
  className?: string
  makClassName?: string
  height?: string
  width?: string
}

export type WithComponentPropsResponse = {
  mode: MakUiThemeKey | undefined
  theme: MakUiThemeVariantKey | undefined
  color: string | undefined
  border: string | undefined
  text: string | undefined
  bg: string | undefined
  themeOpacity: number | undefined
  textOpacity: number | undefined
  bgOpacity: number | undefined
  variantOpacity: number | undefined
  borderOpacity: number | undefined

  textShade: Shade | undefined
  bgShade: Shade | undefined
  variantShade: Shade | undefined
  borderShade: Shade | undefined

  borderPx: number | undefined
  className: string | undefined
  makClassName: string | undefined
  height: string | undefined
  width: string | undefined
}

export type ObjectToClassNameObjectProp = {
  object: GenericObject
  variant: MakUiVariantKey | string
  allowedStates?: Set<string>
  allowedModifiers?: Set<string>
}

export type ClassObject =
  | {
      [k: string]: string | GenericObject
    }
  | undefined

export type ComponentWrapperResponse = {
  styleObject: {
    baseClassObject: ClassObject
    pseudoClassObject: ClassObject
  }
  componentTheme: MakUiVerboseThemeVariant
  componentText: MakUiVerboseVariant
  componentColor: MakUiVerboseVariant
  componentBorder: MakUiVerboseVariant
  fullComponentTheme: MakUiVerboseTheme
  componentThemeMode: MakUiThemeKey | undefined
  globalThemeMode: MakUiThemeKey
  globalPalette: MakUiVerbosePalette
  globalTheme: MakUiVerboseTheme
  twClassName: string | undefined
  makClassName: string | undefined
  modeVariant: MakUiThemeKey | undefined
  themeVariant: MakUiThemeVariantKey | undefined
  colorVariant: MakUiVariantKey | undefined
  borderVariant: MakUiVariantKey | undefined
  textVariant: MakUiVariantKey | undefined
  bgVariant: MakUiVariantKey | undefined
}
