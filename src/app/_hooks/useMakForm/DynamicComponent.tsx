import React, {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  RefObject,
  SelectHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"

import { mak } from "../useMakUi/elements/ts/mak"
import {
  FieldType,
  InputChangeEvent,
  MakForm,
  MakFormComponentOutputType,
  MakFormDynamicComponentProps,
  MakFormErrors,
  MakFormFieldConfig,
  MakFormValidationOption,
} from "./types/form-types"
import { FormAccessor } from "./useMakForm"
import { validateForm, validateField } from "./functions/validate"

type DynamicComponentProps = MakFormDynamicComponentProps &
  FormAccessor & {
    config: MakFormFieldConfig
    name: string
    type: FieldType
    label: string
    formOnSubmit?: FormAccessor["onSubmit"]
    formOnReset?: FormAccessor["onReset"]
    validateOn: MakFormValidationOption
    revalidateOn: MakFormValidationOption
  }

const DynamicComponent = (props: DynamicComponentProps) => {
  const {
    form,
    config,
    handleChange,
    outputType,
    children,
    type,
    name,
    label,
    defaultValue,
    className,
    makClassName,
    pattern,
    value,
    placeholder,
    options,
    labelKey,
    valueKey,
    multiple,

    onClick,
    onBlur,
    onFocus,
    onSubmit,
    onReset,
    formOnSubmit,
    formOnReset,
    validateOn,
    revalidateOn,
    formRef,
    ...otherProps
  } = props

  const [localValue, setLocalValue] = useState(value)
  const componentRef = useRef<HTMLElement>(null)

  const handleLocalChange = (e: InputChangeEvent) => {
    if (multiple && e.target instanceof HTMLSelectElement) {
      const selectedOptions = e.target.selectedOptions

      const selectedValues = Array.from(selectedOptions).map(
        (option) => option.value
      )
      setLocalValue(selectedValues)
      const event = {
        target: { name, value: selectedValues, type },
      }
      handleChange({ event, validateOn })
    } else {
      setLocalValue(e.target.value)
      const event = {
        target: { name, value: e.target.value, type },
      } as InputChangeEvent

      handleChange({ event, validateOn })
    }
  }

  const handleBlur = () => {
    console.log({ formRef })
    // const event = {
    //   target: { name, value: localValue, type },
    // } as InputChangeEvent
    // handleChange({ event, validateOn })
  }

  useEffect(() => {
    const currentElement = componentRef.current

    const handleMouseLeave = () => {
      if (localValue !== form[name]?.value) {
        handleBlur()
      }
    }

    if (currentElement) {
      currentElement.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (currentElement) {
        currentElement.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [componentRef, type, name, localValue, handleBlur])

  if (type === "button" || type === "submit" || type === "reset") {
    const isSubmit = type === "submit"
    const isReset = type === "reset"

    const onClickAction = () => {
      if (isSubmit && !onSubmit) {
        return formOnSubmit && formOnSubmit()
      }
      if (isSubmit && onSubmit) {
        return onSubmit()
      }
      return onClick ? onClick() : () => {}
    }

    if (outputType === "htmlElements") {
      return (
        <button
          value={value as ButtonHTMLAttributes<HTMLButtonElement>["value"]}
          onClick={onClickAction}
          onSubmit={onClickAction}
          onReset={onReset}
          onBlur={onBlur}
          onFocus={onFocus}
          className={className}
          ref={componentRef as RefObject<HTMLButtonElement>}
          {...otherProps}
        >
          {children ? children : label}
        </button>
      )
    }

    if (outputType === "makElements") {
      return (
        <mak.button
          value={value as ButtonHTMLAttributes<HTMLButtonElement>["value"]}
          onClick={onClickAction}
          onSubmit={onClickAction}
          onReset={onReset}
          onBlur={onBlur}
          onFocus={onFocus}
          className={className}
          makClassName={makClassName}
          ref={componentRef as RefObject<HTMLButtonElement>}
          {...otherProps}
        >
          {children ? children : label}
        </mak.button>
      )
    }
  }

  if (type === "select" && outputType === "htmlElements") {
    return (
      <select
        onChange={handleLocalChange}
        onBlur={onBlur || handleBlur}
        className={className}
        value={localValue as SelectHTMLAttributes<HTMLSelectElement>["value"]}
        defaultValue={
          (defaultValue as SelectHTMLAttributes<HTMLSelectElement>["value"]) ||
          ""
        }
        ref={componentRef as RefObject<HTMLSelectElement>}
        {...otherProps}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder as string}
          </option>
        )}
        {(options || []).map((option) => {
          return (
            <option
              key={option[valueKey as keyof typeof option]}
              value={option[valueKey as keyof typeof option]}
            >
              {option[labelKey as keyof typeof option]}
            </option>
          )
        })}
      </select>
    )
  }

  if (
    ["select", "multi-select"].includes(type) &&
    outputType === "makElements"
  ) {
    return (
      <mak.select
        onChange={handleLocalChange}
        onBlur={onBlur || handleBlur}
        className={className}
        makClassName={makClassName}
        value={localValue as SelectHTMLAttributes<HTMLSelectElement>["value"]}
        defaultValue={
          (defaultValue as SelectHTMLAttributes<HTMLSelectElement>["value"]) ||
          ""
        }
        multiple={multiple}
        ref={componentRef as RefObject<HTMLSelectElement>}
        {...otherProps}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder as string}
          </option>
        )}
        {(options || []).map((option) => {
          return (
            <option
              key={option[valueKey as keyof typeof option]}
              value={option[valueKey as keyof typeof option]}
            >
              {option[labelKey as keyof typeof option]}
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
        value={localValue as InputHTMLAttributes<HTMLInputElement>["value"]}
        onChange={handleLocalChange}
        onBlur={handleBlur}
        className={className}
        ref={componentRef as RefObject<HTMLInputElement>}
        {...otherProps}
      />
    )
  }

  if (outputType === "makElements") {
    return (
      <mak.input
        type={type}
        value={localValue as InputHTMLAttributes<HTMLInputElement>["value"]}
        onChange={handleLocalChange}
        onBlur={handleBlur}
        className={className}
        makClassName={makClassName}
        defaultValue={defaultValue as string}
        ref={componentRef as RefObject<HTMLInputElement>}
        {...otherProps}
      />
    )
  }
}

export default DynamicComponent
