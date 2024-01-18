import { FieldConfig, ValueOptions, FieldType, OptionType } from "./field-types"

export interface FormType {
  [key: string]: FieldConfig
}

export interface FormResponse {
  [key: string]: ValueOptions
}

export interface FormErrors {
  [key: string]: string | null
}

export interface FormElement {
  [key: string]: any
  fieldName?: string
  key?: string
  id?: string
  htmlFor?: string
  type?: FieldType
  autoComplete?: string
  label?: string
  value?: ValueOptions
  required?: boolean
  defaultValue?: string | number
  placeholder?: string
  pattern?: string
  options?: OptionType[] | any[]
  labelKey?: string
  valueKey?: string
  className?: string
  onClick?: (response: any) => void
  min?: string | number
  max?: string | number
  minLength?: string | number
  maxLength?: string | number
  step?: string | number
  size?: string | number
  src?: string
  name?: string
  readOnly?: boolean
  hide?: boolean
  disabled?: boolean
  checked?: boolean
  width?: string | number
  height?: string | number
  onSubmit?: (response: any) => void
  onChange?: (response: any) => void
  onBlur?: (response: any) => void
  onFocus?: (response: any) => void
  onReset?: (response: any) => void
}

export interface FormObject {
  [key: string]: FormElement & {
    fieldName?: string
    inputElement?: JSX.Element
    errors?: string | null | string[]
  }
}
