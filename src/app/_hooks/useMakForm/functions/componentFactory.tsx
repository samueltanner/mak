import DynamicComponent from "../DynamicComponent"
import {
  BooleanFieldConfig,
  BoundedRangeFieldConfig,
  FieldType,
  MakFormComponentOutputType,
  MakFormDynamicComponent,
  MakFormFieldConfig,
  NumberFieldConfig,
  SelectFieldConfig,
  TextFieldConfig,
} from "../types/form-types"
import { FormAccessor } from "../useMakForm"

export const getComponentName = (fieldName: string) => {
  const words = fieldName.split(/[\s-_]+/)

  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("")
}

interface ComponentFactoryProps {
  formAccessor: FormAccessor
  name: string
  outputType: MakFormComponentOutputType
}

const componentFactory = ({
  formAccessor,
  name,
  outputType,
}: ComponentFactoryProps): MakFormDynamicComponent => {
  const {
    form,
    setForm,
    setFormErrors,
    formErrors,
    validateFormOn,
    onSubmit: formOnSubmit,
    onReset: formOnReset,
  } = formAccessor

  const config = form[name] as MakFormFieldConfig

  const type: FieldType = (form[name] as MakFormFieldConfig)?.type || "text"
  const label = config?.label
  const required = config?.required
  const defaultValue = config?.defaultValue
  const disabled = config?.disabled
  const className = config?.className
  const makClassName = config?.makClassName
  const value = config?.value
  const placeholder = config?.placeholder
  const readonly = config?.readonly
  const hide = config?.hide
  const autoFocus = config?.autoFocus
  const autoComplete = config?.autoComplete
  const pattern = config?.pattern

  // "text" | "password"
  const minLength = (config as TextFieldConfig)?.minLength
  const maxLength = (config as TextFieldConfig)?.maxLength

  // "select" | "radio" | "multi-select" | "searchable-select"
  const options = (config as SelectFieldConfig)?.options
  const labelKey = (config as SelectFieldConfig)?.labelKey || "label"
  const valueKey = (config as SelectFieldConfig)?.valueKey || "value"
  const multiple = (config as SelectFieldConfig)?.multiple
  const size = (config as SelectFieldConfig)?.size
  const searchable = (config as SelectFieldConfig)?.searchable
  const clearable = (config as SelectFieldConfig)?.clearable
  const dismissOnClick = (config as SelectFieldConfig)?.dismissOnClick
  const onClick = config?.onClick
  const onBlur = config?.onBlur
  const onFocus = config?.onFocus
  const onSubmit = config?.onSubmit
  const onReset = config?.onReset
  const validateOn = config?.validateOn || validateFormOn || "submit"
  // "boolean"
  const checked = (config as BooleanFieldConfig)?.checked

  // "number" | "range" | "bounded-range"
  const min = (config as NumberFieldConfig)?.min
  const max = (config as NumberFieldConfig)?.max
  const step = (config as NumberFieldConfig)?.step

  // "bounded-range"
  const min0 = (config as BoundedRangeFieldConfig)?.min0
  const max0 = (config as BoundedRangeFieldConfig)?.max0
  const min1 = (config as BoundedRangeFieldConfig)?.min1
  const max1 = (config as BoundedRangeFieldConfig)?.max1
  const step0 = (config as BoundedRangeFieldConfig)?.step0
  const step1 = (config as BoundedRangeFieldConfig)?.step1
  const range = (config as BoundedRangeFieldConfig)?.range
  const defaultValue0 = (config as BoundedRangeFieldConfig)?.defaultValue0
  const defaultValue1 = (config as BoundedRangeFieldConfig)?.defaultValue1
  const value0 = (config as BoundedRangeFieldConfig)?.value0
  const value1 = (config as BoundedRangeFieldConfig)?.value1
  const disabled0 = (config as BoundedRangeFieldConfig)?.disabled0
  const disabled1 = (config as BoundedRangeFieldConfig)?.disabled1

  const fieldValue = value ?? defaultValue

  // const selectFieldValue =
  //   fieldValue && typeof fieldValue === "string"
  //     ? String(fieldValue)
  //     : Array.isArray(fieldValue)
  //     ? fieldValue.map(String)
  //     : undefined

  const hookProps = {
    form,
    setForm,
    formErrors,
    setFormErrors,
    config,
    type,
    label,
    required,
    placeholder,
    disabled,
    className,
    value: fieldValue,
    name,

    makClassName,
    readonly,
    hide,
    autoFocus,
    autoComplete,
    pattern,
    minLength,
    maxLength,
    options,
    labelKey,
    valueKey,
    multiple,
    size,
    searchable,
    clearable,
    dismissOnClick,
    checked,
    min,
    max,
    step,
    min0,
    max0,
    min1,
    max1,
    step0,
    step1,
    range,
    defaultValue0,
    defaultValue1,
    value0,
    value1,
    disabled0,
    disabled1,

    onClick,
    onBlur,
    onFocus,
    onSubmit,
    onReset,
    formOnSubmit,
    formOnReset,
    validateOn,
  }
  const ComponentWrapper = (props: Record<string, unknown>) => {
    if (Object.values(props).length > 0) {
      // ... existing logic for updating configuration
    }

    return (
      <DynamicComponent outputType={outputType} {...hookProps} {...props} />
    )
  }

  ComponentWrapper.displayName = `${getComponentName(name)}`

  return ComponentWrapper
}

export default componentFactory

const constructDynamicComponents = (formAccessor: FormAccessor) => {
  const { form, outputType } = formAccessor

  return Object.keys(form || {}).reduce((acc, name) => {
    const componentName = getComponentName(name) as FieldType
    const component = componentFactory({
      name,
      formAccessor,
      outputType,
    })

    return {
      ...acc,
      [componentName]: component,
    }
  }, {})
}

export { constructDynamicComponents }
