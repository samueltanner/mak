import { SelectFieldConfig } from "../types/field-types"
import { FormObject, FormElement } from "../types/form-types"
import { FormAccessor } from "../useMakForm"

import componentFactory from "./componentFactory"
import inputElementFactory from "./inputElementFactory"

const constructForm = (formAccessor: FormAccessor): FormObject => {
  const { form, setForm, setFormErrors, outputType } = formAccessor
  const constructedForm = {} as FormObject

  Object.keys(form).forEach((fieldName) => {
    let fieldConfig = form[fieldName]
    const type = fieldConfig?.type || "text"
    const key = fieldConfig?.key || fieldName
    const id = fieldConfig?.id || fieldName
    const htmlFor = fieldConfig?.htmlFor || fieldName
    const defaultValue = fieldConfig?.defaultValue
    const required = fieldConfig?.required || false
    const placeholder = fieldConfig?.placeholder || undefined
    const label = fieldConfig?.label
    const className = fieldConfig?.className
    const hide = fieldConfig?.hide || false
    const disabled = fieldConfig?.disabled || false
    const readonly = fieldConfig?.readonly || false
    const value = fieldConfig?.value
    const options = (fieldConfig as SelectFieldConfig)?.options || []
    const labelKey = (fieldConfig as SelectFieldConfig)?.labelKey
    const valueKey = (fieldConfig as SelectFieldConfig)?.valueKey
    const minLength = fieldConfig?.minLength || undefined
    const maxLength = fieldConfig?.maxLength || undefined
    const pattern = fieldConfig?.pattern || undefined
    const onClick = fieldConfig?.onClick || undefined
    const name = fieldConfig?.name || fieldName
    const step = fieldConfig?.step || undefined
    const min = fieldConfig?.min || undefined
    const max = fieldConfig?.max || undefined
    const onSubmit = fieldConfig?.onSubmit || undefined
    const onChange = fieldConfig?.onChange || undefined
    const onBlur = fieldConfig?.onBlur || undefined
    const onFocus = fieldConfig?.onFocus || undefined
    const onReset = fieldConfig?.onReset || undefined
    const checked = fieldConfig?.checked || undefined
    const autoComplete = fieldConfig?.autoComplete || undefined
    const size = fieldConfig?.size || undefined
    const src = fieldConfig?.src || undefined
    const width = fieldConfig?.width || undefined
    const height = fieldConfig?.height || undefined
    const readOnly = fieldConfig?.readOnly || undefined
    const inputElement = inputElementFactory({
      name,
      formAccessor,
    })
    const component = componentFactory({
      name,
      formAccessor,
      outputType,
    })

    const config = {
      fieldName,
      autoComplete,
      size,
      src,
      width,
      height,
      readOnly,
      component,
      inputElement,
      type,
      key,
      id,
      htmlFor,
      checked,
      defaultValue,
      required,
      placeholder,
      label,
      className,
      hide,
      disabled,
      readonly,
      value,
      options,
      labelKey,
      valueKey,
      minLength,
      maxLength,
      pattern,
      onClick,
      name,
      step,
      min,
      max,
      onSubmit,
      onChange,
      onBlur,
      onFocus,
      onReset,
    } as FormElement

    constructedForm[fieldName] = {
      ...config,
      inputElement,
      errors: null,
    }
  })

  return constructedForm
}

export default constructForm
