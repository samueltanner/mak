import React, { useCallback, useContext, useEffect, useState } from "react"

import handleChange from "./functions/handleChange"
import { FieldConfig, OptionType } from "./types/field-types"
import { FormElement } from "./types/form-types"
import { InputChangeEvent } from "./types/event-types"
import { mergeWithFallback } from "./functions/helpers"

export interface DynamicComponents {
  [key: string]: (props: { [key: string]: any }) => JSX.Element
}

type DynamicComponentProps = {
  [key: string]: any
  children?: React.ReactNode
  config?: FieldConfig
  type?: string
  placeholder?: string
  disabled?: boolean
  className?: string
  label?: string
  onClick?: () => void
  onSubmit?: () => void
  onReset?: () => void
  value?: any
  name?: string
  // onChange: (e: InputChangeEvent) => void
  options?: any[]
  labelKey?: string
  valueKey?: string
  selectFieldValue?: string
}

const DynamicComponent = (props: DynamicComponentProps) => {
  const {
    form,
    config,
    setForm,
    setFormErrors,

    children,
    onSubmit,
    onReset,
    onClick,

    selectFieldValue,

    ...otherProps
  } = props
  const updatedProps = mergeWithFallback(props, config)
  const updatedForm = mergeWithFallback(form, updatedProps)

  const type = updatedProps.type
  const className = updatedProps.className
  const value = updatedProps.value
  const defaultValue = updatedProps.defaultValue
  const placeholder = updatedProps.placeholder
  const options = updatedProps.options as OptionType[]
  const valueKey = updatedProps.valueKey
  const labelKey = updatedProps.labelKey
  const name = updatedProps.name

  const [localValue, setLocalValue] = useState(value)

  const handleLocalChange = (e: InputChangeEvent) => {
    setLocalValue(e.target.value)
  }

  const handleBlur = () => {
    const event = {
      target: { name: otherProps.name, value: localValue, type },
    } as InputChangeEvent

    handleChange({ event, setForm, setFormErrors })
  }

  if (type === "button") {
    const label = otherProps.label
    const isSubmit = label === "Submit"
    const SubmitAction = () => {
      // onSubmit()
    }
    const isReset = label === "Reset"
    const ResetAction = onReset || (() => {})
    const onClickAction =
      onClick || isSubmit ? SubmitAction : isReset ? ResetAction : () => {}

    return (
      <button
        value={value}
        onClick={onClickAction}
        className={className}
        // {...otherProps}
      >
        {children ? children : otherProps.label}
      </button>
    )
  }

  if (type === "select") {
    console.log("default", placeholder)
    return (
      <select
        onChange={handleLocalChange}
        onBlur={handleBlur}
        className={className}
        value={localValue}
        defaultValue={defaultValue || ""}
        placeholder={placeholder}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder as string}
          </option>
        )}
        {options.map((option) => {
          return (
            <option key={option[valueKey]} value={option[valueKey]}>
              {option[labelKey]}
            </option>
          )
        })}
      </select>
    )
  }

  return (
    <input
      type={type}
      value={localValue}
      onChange={handleLocalChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      className={className}
      // {...otherProps}
    />
  )
}

export default DynamicComponent
