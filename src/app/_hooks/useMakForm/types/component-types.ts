import { FormElement } from "./form-types"

export type DynamicComponentProps = FormElement

export type DynamicComponentType = React.ComponentType<DynamicComponentProps>

export type DynamicComponents = {
  [key: string]: DynamicComponentType
}
