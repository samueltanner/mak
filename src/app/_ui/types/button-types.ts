export type MakUiButtonConfig = {
  [key: string]: string | undefined
  borderRadius?: string
  borderWidth?: string
  borderStyle?: string
  className?: string
  text?: string
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

