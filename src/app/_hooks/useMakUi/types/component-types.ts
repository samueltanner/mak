import { MakUiInteractionStateKey } from "./ui-types"

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
