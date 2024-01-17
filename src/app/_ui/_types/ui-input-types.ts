export type State = "default" | "active" | "selected" | "disabled" | "focused"

export type Interaction = "base" | "hover" | "click"

export type VariantsInput = {
  [Key in Interaction]?: string
}

export type InteractionsInput = {
  [Key in State]?: string
}

export type InteractionAndVariantInput = VariantsInput & InteractionsInput
