import {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  RefObject,
  SelectHTMLAttributes,
  useRef,
  useState,
} from "react"

import { mak } from "../useMakUi/elements/ts/mak"
import {
  FieldType,
  InputChangeEvent,
  MakFormDynamicComponentProps,
  MakFormFieldConfig,
  MakFormValidationOption,
} from "./types/form-types"
import { FormAccessor } from "./useMakForm"

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
        target: { name, value: selectedValues || value, type },
      } as InputChangeEvent
      handleChange({ event, validateOn, revalidateOn })
    } else {
      setLocalValue(e.target.value)
      const event = {
        target: { name, value: e.target.value || value, type },
      } as InputChangeEvent

      handleChange({ event, validateOn, revalidateOn })
    }
  }

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
      if (isReset && !onReset) {
        return formOnReset && formOnReset()
      }
      if (isReset && onReset) {
        return onReset()
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
        onBlur={onBlur}
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
        onBlur={onBlur}
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
        onBlur={onBlur}
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
        onBlur={onBlur}
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
