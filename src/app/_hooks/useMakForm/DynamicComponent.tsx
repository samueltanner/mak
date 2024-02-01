import React, { useState } from "react"

import handleChange from "./functions/handleChange"
import { FieldConfig, OptionType } from "./types/field-types"
import { InputChangeEvent } from "./types/event-types"
import { mergeWithFallback } from "./functions/helpers"
import { ComponentOutputType } from "./types/component-types"
import { mak } from "../useMakUi/elements/ts/mak"

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

  outputType?: ComponentOutputType
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
    outputType,
    ...otherProps
  } = props
  const updatedProps = mergeWithFallback(props, config)
  const updatedForm = mergeWithFallback(form, updatedProps)

  const type = updatedProps.type
  const className = updatedProps.className
  const makClassName = updatedProps.makClassName
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

    if (outputType === "htmlElements") {
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
    if (outputType === "makElements") {
      return (
        <mak.button
          value={value}
          onClick={onClickAction}
          className={className}
          makClassName={makClassName}
          // {...otherProps}
        >
          {children ? children : otherProps.label}
        </mak.button>
      )
    }
  }

  if (type === "select" && outputType === "htmlElements") {
    return (
      <select
        onChange={handleLocalChange}
        onBlur={handleBlur}
        className={className}
        value={localValue}
        defaultValue={defaultValue || ""}
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

  if (type === "select" && outputType === "makElements") {
    return (
      <mak.select
        onChange={handleLocalChange}
        onBlur={handleBlur}
        className={className}
        makClassName={makClassName}
        value={localValue}
        defaultValue={defaultValue || ""}
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
      </mak.select>
    )
  }

  if (outputType === "htmlElements") {
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
  if (outputType === "makElements") {
    return (
      <mak.input
        type={type}
        value={localValue}
        onChange={handleLocalChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={className}
        makClassName={makClassName}
        // {...otherProps}
      />
    )
  }
}

export default DynamicComponent
