export type States = {
  [key: string]: Interactions
  default: Interactions
  active: Interactions
  selected: Interactions
  disabled: Interactions
  focused: Interactions
}

export type Interactions = {
  [key: string]: any
  base: any
  baseRoot: any
  hover: any
  hoverRoot: any
  click: any
  clickRoot: any
}
