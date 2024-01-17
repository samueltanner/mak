export type InputState = "default" | "active" | "selected" | "disabled" | "focused"

export type InputInteraction = "base" | "hover" | "click"

export type VariantsInput = {
  [Key in InputInteraction]: string
}

export type InteractionsInput = {
  [Key in InputState]: string
}

export type InteractionAndVariantInput = VariantsInput & InteractionsInput

export type ColorPaletteInput 