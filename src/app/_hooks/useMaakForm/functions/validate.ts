import { SelectFieldConfig, TextFieldConfig } from "../types/field-types"
import { FormErrors } from "../types/form-types"
import { FormObject } from "../useMaakForm"

const validateField = ({
  fieldName,
  value,
  form,
  setFormErrors,
}: {
  fieldName: string
  value: any
  form: FormObject
  setFormErrors: React.Dispatch<React.SetStateAction<FormErrors>>
}) => {
  const config = form[fieldName]
  const type = config.type
  const required = config?.required || false

  let valueToValidate
  switch (type) {
    case "select":
      const defaultValue = config?.defaultValue
      const currentValue = value
      const selectConfig = config as SelectFieldConfig
      const defaultOption = selectConfig.options?.find(
        (option) => option.value === defaultValue
      )
      const defaultOptionValue = defaultOption?.value
      valueToValidate = defaultOptionValue || currentValue || ""
      break
    case "boolean":
      valueToValidate = value
      break
    case "number":
      valueToValidate = value
      break
    case "button":
      valueToValidate = true
      break
    case "text":
    default:
      valueToValidate = value || ""
      break
  }

  let errorMessage = null as string | null
  if (required && (valueToValidate === "" || valueToValidate === null)) {
    errorMessage = `${config.label} is required`
  }
  if (typeof valueToValidate === "string" && required) {
    const minLengthValue = (config as TextFieldConfig).minLength
    const maxLengthValue = (config as TextFieldConfig).maxLength

    let minLength =
      minLengthValue !== undefined
        ? typeof minLengthValue === "string"
          ? +minLengthValue
          : minLengthValue
        : undefined

    let maxLength =
      maxLengthValue !== undefined
        ? typeof maxLengthValue === "string"
          ? +maxLengthValue
          : maxLengthValue
        : undefined

    if (type === "text" && minLength && valueToValidate.length < minLength) {
      errorMessage = `Minimum length is ${minLength}`
    }
    if (type === "text" && maxLength && valueToValidate.length > maxLength) {
      errorMessage = `Maximum length is ${maxLength}`
    }
    if (typeof type === "string" && ["text", "password"].includes(type)) {
      const pattern = (config as TextFieldConfig).pattern
      if (
        typeof pattern === "string" &&
        !new RegExp(pattern).test(valueToValidate)
      ) {
        errorMessage = "Invalid format"
      }
    }
  }

  if (errorMessage) {
    setFormErrors((prevErrors) => {
      const updatedErrors = {
        ...prevErrors,
        [fieldName]: errorMessage,
      }

      return updatedErrors
    })
    return errorMessage
  }
  setFormErrors((prevErrors) => {
    const updatedErrors = {
      ...prevErrors,
      [fieldName]: null,
    }

    return updatedErrors
  })
  return null
}

const validateForm = ({
  form,
  setFormErrors,
}: {
  form: FormObject
  setFormErrors: React.Dispatch<React.SetStateAction<FormErrors>>
}) => {
  const errors: FormErrors = {}

  Object.keys(form).forEach((fieldName) => {
    if (fieldName === "submit" || fieldName === "reset") return

    const value = form?.[fieldName]?.value || form?.[fieldName]?.defaultValue
    const error = validateField({
      fieldName,
      value,
      form,
      setFormErrors,
    })

    if (error) {
      errors[fieldName] = error
      form[fieldName].errors = error
    } else {
      errors[fieldName] = null
    }
  })

  setFormErrors(errors)
  return errors
}

export { validateField, validateForm }
