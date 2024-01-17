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

 let classNameObj = {
   default: {
     color: "",
     border: "",
     hover: "",
     hoverBorder: "",
     clicked: "",
     clickedBorder: "",
   },
   active: {
     color: "",
     border: "",
     hover: "",
     hoverBorder: "",
     clicked: "",
     clickedBorder: "",
   },
   selected: {
     color: "",
     border: "",
     hover: "",
     hoverBorder: "",
     clicked: "",
     clickedBorder: "",
   },
   disabled: {
     color: "",
     border: "",
     hover: "",
     hoverBorder: "",
     clicked: "",
     clickedBorder: "",
   },
 }