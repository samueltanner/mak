import React, {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  SelectHTMLAttributes,
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
}

const DynamicComponent = (props: DynamicComponentProps) => {
  const {
    form,
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
    ...otherProps
  } = props
  // console.log(name, { props, config })
  // const updatedProps = mergeWithFallback(props, config)
  // const updatedForm = mergeWithFallback(form, updatedProps)

  // const name = updatedProps.name

  const [localValue, setLocalValue] = useState(value)

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
  }

  const handleBlur = () => {
    const event = {
      target: { name, value: localValue, type },
    } as InputChangeEvent

    handleChange({ event, setForm, setFormErrors })
  }

  // useEffect(() => {
  //   if (localValue === value) return
  //   const timer = setTimeout(() => {
  //     handleBlur()
  //   }, 500)
  //   return () => clearTimeout(timer)
  // }, [localValue])

  if (type === "button" || type === "submit" || type === "reset") {
    const isSubmit = type === "submit" || label.toLowerCase() === "submit"
    const isReset = type === "reset" || label.toLowerCase() === "reset"
    const onSubmitAction = () => {
      onSubmit && onSubmit()
    }
    const onResetAction = () => {
      onReset && onReset()
    }
    const onClickAction =
      onClick || isSubmit ? onSubmitAction : isReset ? onResetAction : () => {}

    if (outputType === "htmlElements") {
      return (
        <button
          value={value as ButtonHTMLAttributes<HTMLButtonElement>["value"]}
          onClick={onClickAction}
          onReset={onResetAction}
          onBlur={() => onBlur}
          onFocus={() => onFocus}
          className={className}
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
          onReset={onResetAction}
          onBlur={() => onBlur}
          onFocus={() => onFocus}
          className={className}
          makClassName={makClassName}
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
        {...otherProps}
      />
    )
  }
}

export default DynamicComponent
