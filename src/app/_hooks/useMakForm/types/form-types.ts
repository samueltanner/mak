// import { FieldConfig, ValueOptions, FieldType, OptionType } from "./field-types"

// export interface FormType {
//   [key: string]: FieldConfig
// }

// export interface FormResponse {
//   [key: string]: ValueOptions
// }

// export interface FormErrors {
//   [key: string]: string | null
// }

// export interface FormElement {
//   [key: string]: any
//   fieldName?: string
//   key?: string
//   id?: string
//   htmlFor?: string
//   type?: FieldType
//   autoComplete?: string
//   label?: string
//   value?: ValueOptions
//   required?: boolean
//   defaultValue?: string | number
//   placeholder?: string
//   pattern?: string
//   options?: OptionType[] | any[]
//   labelKey?: string
//   valueKey?: string
//   className?: string
//   onClick?: (response: any) => void
//   min?: string | number
//   max?: string | number
//   minLength?: string | number
//   maxLength?: string | number
//   step?: string | number
//   size?: string | number
//   src?: string
//   name?: string
//   readOnly?: boolean
//   hide?: boolean
//   disabled?: boolean
//   checked?: boolean
//   width?: string | number
//   height?: string | number
//   onSubmit?: (response: any) => void
//   onChange?: (response: any) => void
//   onBlur?: (response: any) => void
//   onFocus?: (response: any) => void
//   onReset?: (response: any) => void
// }

// export interface FormObject {
//   [key: string]: FormElement & {
//     // fieldName?: string
//     // inputElement?: JSX.Element
//     // errors?: string | null | string[]
//   }
// }

export type MakFormDynamicComponent = (
  props: MakFormDynamicComponentProps
) => JSX.Element

export type MakFormDynamicComponents = {
  [key: string]: MakFormDynamicComponent
}

export type MakFormComponentOutputType =
  | "makElements"
  | "htmlElements"
  | "makComponents"

export type OptionType = { [key: string]: string | number }

export type ValueOptions =
  | string
  | boolean
  | undefined
  | number
  | OptionType
  | OptionType[]
  | boolean
  | string[]
  | number[]

export type FieldType =
  | "color"
  | "button"
  | "boolean"
  | "bounded-range"
  | "button"
  | "date"
  | "datetime"
  | "datetime-local"
  | "time"
  | "week"
  | "month"
  | "multi-select"
  | "number"
  | "password"
  | "radio"
  | "radio-group"
  | "range"
  | "select"
  | "searchable-select"
  | "text"
  | "toggle"
  | "checkbox"
  | "email"
  | "search"
  | "tel"
  | "time"
  | "submit"
  | "reset"

export interface BaseFieldConfig {
  type: FieldType
  label: string
  name?: string
  id?: string
  required?: boolean
  defaultValue?: ValueOptions
  disabled?: boolean
  makClassName?: string
  className?: string
  value?: ValueOptions
  placeholder?: string
  readonly?: boolean
  hide?: boolean
  autoComplete?: string
  autoFocus?: boolean
  pattern?: string
  onClick?: (props?: any) => void
  onChange?: (props?: any) => void
  onBlur?: (props?: any) => void
  onFocus?: (props?: any) => void
  onReset?: (props?: any) => void
  onSubmit?: (props?: any) => void
}
export interface ColorFieldConfig extends BaseFieldConfig {
  type: "color"
}
export interface TextFieldConfig extends BaseFieldConfig {
  type: "text" | "password" | "email" | "search" | "tel"
  minLength?: number
  maxLength?: number
  pattern?: string
}

export interface PasswordFieldConfig extends TextFieldConfig {
  type: "password"
}

export interface SelectFieldConfig extends BaseFieldConfig {
  type:
    | "select"
    | "radio"
    | "multi-select"
    | "searchable-select"
    | "radio-group"
  options: OptionType[]
  labelKey?: string
  valueKey?: string
  multiple?: boolean
  autoComplete?: string
  size?: number
  searchable?: boolean
  clearable?: boolean
  dismissOnClick?: boolean
}

export interface BooleanFieldConfig extends BaseFieldConfig {
  type: "boolean" | "checkbox" | "toggle"
  checked?: boolean
}

export interface ButtonFieldConfig extends BaseFieldConfig {
  type: "button" | "submit" | "reset"
}

export interface NumberFieldConfig extends BaseFieldConfig {
  type: "number" | "range" | "bounded-range"
  min?: number
  max?: number
  step?: number
}

export interface DateFieldConfig extends BaseFieldConfig {
  type: "date" | "datetime" | "datetime-local" | "month" | "time" | "week"
  min?: number
  max?: number
  step?: number
}

export interface BoundedRangeFieldConfig extends NumberFieldConfig {
  type: "bounded-range"
  min0?: number
  max0?: number
  min1?: number
  max1?: number
  step?: number
  value0?: number
  value1?: number
  step0?: number
  step1?: number
  range?: [number | undefined, number | undefined]
  disabled0?: boolean
  disabled1?: boolean
  defaultValue0?: number
  defaultValue1?: number
}

export type MakFormFieldConfig =
  | TextFieldConfig
  | ColorFieldConfig
  | SelectFieldConfig
  | BooleanFieldConfig
  | ButtonFieldConfig
  | NumberFieldConfig
  | DateFieldConfig
  | PasswordFieldConfig
  | BoundedRangeFieldConfig

export type MakFormInput = {
  [key: string]: MakFormFieldConfig
}

export type MakFormElementErrors = string | null | string[] | undefined

export type MakFormErrors = {
  [key: string]: MakFormElementErrors
}

export type MakFormElement = MakFormFieldConfig & {
  errors?: MakFormElementErrors
  inputElement?: JSX.Element
  component?: MakFormDynamicComponent
}
export type MakForm = {
  [key: string]: MakFormElement | MakFormErrors | undefined
  formErrors?: MakFormErrors
  // components: MakFormDynamicComponents
}

export type MakFormDynamicComponentProps = {
  children?: React.ReactNode
  required?: boolean
  defaultValue?: ValueOptions
  disabled?: boolean
  makClassName?: string
  className?: string
  value?: ValueOptions
  placeholder?: string
  readonly?: boolean
  hide?: boolean
  autoComplete?: string
  autoFocus?: boolean
  pattern?: string

  minLength?: number
  maxLength?: number
  options?: OptionType[]
  labelKey?: string
  valueKey?: string
  multiple?: boolean
  size?: number
  searchable?: boolean
  clearable?: boolean
  dismissOnClick?: boolean
  checked?: boolean
  min?: number
  max?: number
  step?: number
  min0?: number
  max0?: number
  min1?: number
  max1?: number
  step0?: number
  step1?: number
  range?: [number | undefined, number | undefined]
  defaultValue0?: number
  defaultValue1?: number
  value0?: number
  value1?: number
  disabled0?: boolean
  disabled1?: boolean
  onClick?: (props?: any) => void
  onChange?: (props?: any) => void
  onBlur?: (props?: any) => void
  onFocus?: (props?: any) => void
  onReset?: (props?: any) => void
  onSubmit?: (props?: any) => void
}
