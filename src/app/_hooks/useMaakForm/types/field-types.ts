export type OptionType = { [key: string]: string }

export type ValueOptions = string | boolean | undefined | number | OptionType

export type FieldType =
  | "boolean"
  | "bounded-range"
  | "button"
  | "date"
  | "datetime"
  | "multiselect"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "select"
  | "searchable-select"
  | "text"
  | undefined
  | string

export interface BaseFieldConfig {
  type: FieldType
  label?: string
  required?: boolean
  defaultValue?: ValueOptions
  className?: string
  value?: ValueOptions
  placeholder?: string
  readonly?: boolean
  hide?: boolean
  disabled?: boolean
}

export interface TextFieldConfig extends BaseFieldConfig {
  type: "text" | "password"
  minLength?: number
  maxLength?: number
  pattern?: string
}

export interface PasswordFieldConfig extends TextFieldConfig {
  type: "password"
}

export interface SelectFieldConfig extends BaseFieldConfig {
  type: "select" | "radio" | "multiselect" | "searchable-select"
  options?: OptionType[]
  labelKey?: string
  valueKey?: string
}

export interface BooleanFieldConfig extends BaseFieldConfig {
  type: "boolean"
}

export interface ButtonFieldConfig extends BaseFieldConfig {
  type: "button"
  onClick?: (props?: any) => void
}

export interface NumberFieldConfig extends BaseFieldConfig {
  type: "number" | "range" | "bounded-range"
  min?: number
  max?: number
  step?: number
}

export interface DateFieldConfig extends BaseFieldConfig {
  type: "date" | "datetime"
  min?: number
  max?: number
  step?: number
}

export interface DateTimeFieldConfig extends DateFieldConfig {
  type: "datetime"
}

export interface RadioFieldConfig extends SelectFieldConfig {
  type: "radio"
}

export interface RangeFieldConfig extends NumberFieldConfig {
  type: "range" | "bounded-range"
}

// Union type for FieldConfig
export type FieldConfig =
  | TextFieldConfig
  | SelectFieldConfig
  | BooleanFieldConfig
  | ButtonFieldConfig
  | NumberFieldConfig
  | DateFieldConfig
  | DateTimeFieldConfig
  | PasswordFieldConfig
  | RadioFieldConfig
  | RangeFieldConfig
