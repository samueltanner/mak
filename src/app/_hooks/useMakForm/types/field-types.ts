// import { Dispatch, SetStateAction } from "react"
// import { FormErrors, FormObject } from "../types/form-types"
// export type OptionType = { [key: string]: string | number }

// export type ValueOptions =
//   | string
//   | boolean
//   | undefined
//   | number
//   | OptionType
//   | OptionType[]
//   | boolean
//   | string[]

// export type FieldType =
//   | "color"
//   | "button"
//   | "boolean"
//   | "bounded-range"
//   | "button"
//   | "date"
//   | "datetime"
//   | "datetime-local"
//   | "time"
//   | "week"
//   | "month"
//   | "multi-select"
//   | "number"
//   | "password"
//   | "radio"
//   | "radio-group"
//   | "range"
//   | "select"
//   | "searchable-select"
//   | "text"
//   | "toggle"
//   | "checkbox"
//   | "email"
//   | "search"
//   | "tel"
//   | "time"
//   | "submit"
//   | "reset"

// export interface BaseFieldConfig {
//   type: FieldType
//   label: string
//   name?: string
//   id?: string
//   required?: boolean
//   defaultValue?: ValueOptions
//   disabled?: boolean
//   makClassName?: string
//   className?: string
//   value?: ValueOptions
//   placeholder?: string
//   readonly?: boolean
//   hide?: boolean
//   autoComplete?: string
//   autoFocus?: boolean
//   pattern?: string
//   onClick?: (props?: any) => void
//   onChange?: (props?: any) => void
//   onBlur?: (props?: any) => void
//   onFocus?: (props?: any) => void
//   onReset?: (props?: any) => void
//   onSubmit?: (props?: any) => void
// }
// export interface ColorFieldConfig extends BaseFieldConfig {
//   type: "color"
// }
// export interface TextFieldConfig extends BaseFieldConfig {
//   type: "text" | "password" | "email" | "search" | "tel"
//   minLength?: number
//   maxLength?: number
//   pattern?: string
// }

// export interface PasswordFieldConfig extends TextFieldConfig {
//   type: "password"
// }

// export interface SelectFieldConfig extends BaseFieldConfig {
//   type:
//     | "select"
//     | "radio"
//     | "multi-select"
//     | "searchable-select"
//     | "radio-group"
//   options: OptionType[]
//   labelKey?: string
//   valueKey?: string
//   multiple?: boolean
//   autoComplete?: string
//   size?: number
//   searchable?: boolean
//   clearable?: boolean
//   dismissOnClick?: boolean
// }

// export interface BooleanFieldConfig extends BaseFieldConfig {
//   type: "boolean" | "checkbox" | "toggle"
//   checked?: boolean
// }

// export interface ButtonFieldConfig extends BaseFieldConfig {
//   type: "button" | "submit" | "reset"
// }

// export interface NumberFieldConfig extends BaseFieldConfig {
//   type: "number" | "range" | "bounded-range"
//   min?: number
//   max?: number
//   step?: number
// }

// export interface DateFieldConfig extends BaseFieldConfig {
//   type: "date" | "datetime" | "datetime-local" | "month" | "time" | "week"
//   min?: number
//   max?: number
//   step?: number
// }

// export interface BoundedRangeFieldConfig extends NumberFieldConfig {
//   type: "bounded-range"
//   min0?: number
//   max0?: number
//   min1?: number
//   max1?: number
//   step?: number
//   value0?: number
//   value1?: number
//   step0?: number
//   step1?: number
//   range?: [number | undefined, number | undefined]
//   disabled0?: boolean
//   disabled1?: boolean
//   defaultValue0?: number
//   defaultValue1?: number
// }

// // Union type for FieldConfig
// export type FieldConfig =
//   | TextFieldConfig
//   | ColorFieldConfig
//   | SelectFieldConfig
//   | BooleanFieldConfig
//   | ButtonFieldConfig
//   | NumberFieldConfig
//   | DateFieldConfig
//   | PasswordFieldConfig
//   | BoundedRangeFieldConfig

// export type FormInputOptions = {
//   form: FormObject
//   setForm: Dispatch<SetStateAction<FormObject>>
//   setFormErrors: Dispatch<SetStateAction<FormErrors>>
//   config: FieldConfig
//   type: FieldType
//   label: string
//   name?: string
//   required?: boolean
//   defaultValue?: ValueOptions
//   disabled?: boolean
//   makClassName?: string
//   className?: string
//   value?: ValueOptions
//   placeholder?: string
//   readonly?: boolean
//   hide?: boolean
//   autoComplete?: string
//   autoFocus?: boolean
//   pattern?: string

//   minLength?: number
//   maxLength?: number
//   options?: OptionType[]
//   labelKey?: string
//   valueKey?: string
//   multiple?: boolean
//   size?: number
//   searchable?: boolean
//   clearable?: boolean
//   dismissOnClick?: boolean
//   checked?: boolean
//   min?: number
//   max?: number
//   step?: number
//   min0?: number
//   max0?: number
//   min1?: number
//   max1?: number
//   step0?: number
//   step1?: number
//   range?: [number | undefined, number | undefined]
//   defaultValue0?: number
//   defaultValue1?: number
//   value0?: number
//   value1?: number
//   disabled0?: boolean
//   disabled1?: boolean
//   selectFieldValue?: string | string[] | undefined
//   onClick?: (props?: any) => void
//   onChange?: (props?: any) => void
//   onBlur?: (props?: any) => void
//   onFocus?: (props?: any) => void
//   onReset?: (props?: any) => void
//   onSubmit?: (props?: any) => void
// }
