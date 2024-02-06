import React, {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  RefObject,
  SelectHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react"
import handleChange from "./functions/handleChange"
import { mak } from "../useMakUi/elements/ts/mak"
import {
  FieldType,
  MakForm,
  MakFormComponentOutputType,
  MakFormDynamicComponentProps,
  MakFormErrors,
  MakFormFieldConfig,
} from "./types/form-types"
import { FormAccessor } from "./useMakForm"
import { validateForm, validateField } from "./functions/validate"

type DynamicComponentProps = MakFormDynamicComponentProps & {
  form: MakForm
  setForm: React.Dispatch<React.SetStateAction<MakForm>>
  formErrors: MakFormErrors
  setFormErrors: React.Dispatch<React.SetStateAction<MakFormErrors>>
  config: MakFormFieldConfig
  name: string
  outputType: MakFormComponentOutputType
  type: FieldType
  label: string
  formOnSubmit?: FormAccessor["onSubmit"]
  formOnReset?: FormAccessor["onReset"]
}

const DynamicComponent = (props: DynamicComponentProps) => {
  const {
    form,
    config,
    setForm,
    setFormErrors,
    outputType,
    children,
    type,
    name,
    label,
    defaultValue,
    className,
    makClassName,
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
    pattern,
    ...otherProps
  } = props

  const [localValue, setLocalValue] = useState(value)
  const componentRef = useRef<HTMLElement>(null)

  type InputChangeEvent = React.ChangeEvent<
    HTMLSelectElement | HTMLInputElement
  >

  const handleLocalChange = (e: InputChangeEvent) => {
    if (multiple && e.target instanceof HTMLSelectElement) {
      const selectedOptions = e.target.selectedOptions

      const selectedValues = Array.from(selectedOptions).map(
        (option) => option.value
      )
      setLocalValue(selectedValues)
    } else {
      setLocalValue(e.target.value)
    }
    if (validateOn === "change") {
      validateField({
        form,
        fieldName: name,
        setFormErrors,
        validateOn,
        value: localValue,
      })
    }
  }

  const handleBlur = () => {
    const event = {
      target: { name, value: localValue, type },
    } as InputChangeEvent

    handleChange({ form, event, setForm, setFormErrors, validateOn })
  }

  // useEffect(() => {
  //   const currentElement = componentRef.current

  //   const handleMouseEnter = () => {
  //     console.log({ type, name }) // Log when mouse enters
  //   }

  //   const handleMouseLeave = () => {
  //     // Additional logic for mouse leave if needed
  //     handleBlur()
  //   }

  //   // Add event listeners
  //   if (currentElement) {
  //     currentElement.addEventListener("mouseenter", handleMouseEnter)
  //     currentElement.addEventListener("mouseleave", handleMouseLeave)
  //   }

  //   // Cleanup function to remove event listeners
  //   return () => {
  //     if (currentElement) {
  //       currentElement.removeEventListener("mouseenter", handleMouseEnter)
  //       currentElement.removeEventListener("mouseleave", handleMouseLeave)
  //     }
  //   }
  // }, [componentRef, type, name])

  if (type === "button" || type === "submit" || type === "reset") {
    const isSubmit = type === "submit"
    const isReset = type === "reset"

    const onClickAction = () => {
      console.log("Click action", { form, localValue })
      if (isSubmit && !onSubmit) {
        handleBlur()
        // validateOn !== "none" && validateForm({ form, setFormErrors })
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
