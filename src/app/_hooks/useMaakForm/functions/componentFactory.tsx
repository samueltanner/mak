import {
  ButtonFieldConfig,
  FieldType,
  SelectFieldConfig,
} from "../types/field-types"
import { FormElement, FormErrors, FormObject } from "../types/form-types"
import handleChange from "./handleChange"
import { InputChangeEvent } from "../types/event-types"
import React, { MemoExoticComponent, memo, useCallback, useEffect } from "react"
import DynamicComponent from "../DynamicComponent"
import { FieldConfig } from "../types/field-types"
import MemoizedDynamicComponent from "../MemoizedComponent"
import { FormAccessor } from "../useMakForm"
import { DynamicComponentType } from "../types/component-types"
import { isEqual, mergeWithFallback } from "./helpers"

export const getComponentName = (fieldName: string) => {
  const words = fieldName.split(/[\s-_]+/)

  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("")
}

interface ComponentFactoryProps {
  formAccessor: FormAccessor
  name: string
}

const componentFactory = ({
  formAccessor,
  name,
}: ComponentFactoryProps): DynamicComponentType => {
  const { form, setForm, setFormErrors, formIsCurrent } = formAccessor
  const config = form[name] as FieldConfig

  const type = form[name]?.type || "text"
  const placeholder = config?.placeholder
  const fieldValue = config?.value ?? config?.defaultValue
  const disabled = config?.disabled
  const className = `
      ${form[name]?.className} ${
        disabled ? "cursor-not-allowed opacity-50" : "opacity-100"
      }`
  const label = config?.label
  const onClick = (config as ButtonFieldConfig)?.onClick
  const value = config?.value || config?.defaultValue
  const options = (config as SelectFieldConfig)?.options
  const labelKey = (config as SelectFieldConfig)?.labelKey || "label"
  const valueKey = (config as SelectFieldConfig)?.valueKey || "value"
  const selectFieldValue = fieldValue ? String(fieldValue) : undefined

  const hookProps = {
    form,
    setForm,
    setFormErrors,
    config,
    type,
    placeholder,
    disabled,
    className,
    label,
    onClick,
    value,
    name: name,

    onSubmit: () => {},
    onReset: () => {},
    // onSubmit: () => {
    //   setIsSubmitted(true)
    //   // handleResetInternal()
    // },
    // onReset: handleResetInternal,
    options,
    labelKey,
    valueKey,
    selectFieldValue,
  }

  // const componentName = getComponentName(name)
  // components[componentName] = (props: { [key: string]: any }) => (
  //   <DynamicComponent {...hookProps} {...props} />
  // )

  return (props: Record<string, unknown>) => {
    if (Object.values(props).length > 0) {
      const updatedConfig = mergeWithFallback(props, config)
      console.log({ updatedConfig })
      const updatedForm = mergeWithFallback(
        { [name]: updatedConfig },
        form
      ) as FormObject
      // console.log({ updatedForm })
      console.log({ form, updatedForm })
      // if (!isEqual(form, updatedForm)) {
      //   setForm(updatedForm)
      // }
      // setForm(updatedForm)
      // setForm(mergeWithFallback(props, form))
    }
    return <DynamicComponent {...hookProps} {...props} />
  }
  // })
  // return components
}

export default componentFactory

const constructDynamicComponents = (formAccessor: FormAccessor) => {
  const { form, setForm, setFormErrors } = formAccessor
  return Object.keys(form || {}).reduce((acc, name) => {
    const componentName = getComponentName(name) as string
    const component = componentFactory({
      name,
      formAccessor,
    })

    return {
      ...acc,
      [componentName]: component,
    }
  }, {})
}

export { constructDynamicComponents }
