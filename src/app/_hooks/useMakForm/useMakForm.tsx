"use client"
import {
  constructDynamicComponents,
  getInitialComponentNames,
} from "./functions/componentFactory"
import constructForm from "./functions/constructForm"
import {
  ensureSingleElementType,
  getDifference,
  isEqual,
} from "./functions/helpers"
import { useCallback, useEffect, useRef, useState } from "react"
import { getComponentName } from "./functions/componentFactory"

import {
  InputChangeEvent,
  MakForm,
  MakFormComponentOutputType,
  MakFormDynamicComponents,
  MakFormErrors,
  MakFormValidationOption,
} from "./types/form-types"
import { isEmptyObject } from "@/globals/global-helper-functions"
import { validateField, validateForm } from "./functions/validate"
import { MakFormProvider } from "./MakFormContext"

interface MakFormProps {
  formConfig?: MakForm
  onSubmit?: (input?: any) => void
  onReset?: (input?: any) => void
  useMakElements?: boolean
  useHTMLComponents?: boolean
  useMakComponents?: boolean
  validateFormOn?: MakFormValidationOption
  revalidateFormOn?: MakFormValidationOption
}

export interface FormAccessor {
  form: MakForm

  handleChange: ({
    event,
    validateOn,
  }: {
    event: InputChangeEvent
    validateOn: MakFormValidationOption
  }) => void
  formRef: React.MutableRefObject<MakForm | undefined>
  outputType: MakFormComponentOutputType
  onSubmit?: (input?: any) => void
  onReset?: (input?: any) => void
  validateFormOn?: MakFormValidationOption
  revalidateFormOn?: MakFormValidationOption
}

export const useMakForm = ({
  formConfig,
  useMakElements = true,
  useHTMLComponents = false,
  useMakComponents = false,
  onSubmit,
  onReset,
  validateFormOn = "submit",
  revalidateFormOn = "change",
}: MakFormProps) => {
  const outputType = ensureSingleElementType({
    useMakElements,
    useHTMLComponents,
    useMakComponents,
  })

  const formRef = useRef<MakForm>()
  const errorsRef = useRef<MakFormErrors>({})

  const [form, setForm] = useState<MakForm>(formConfig || {})
  const [formErrors, setFormErrors] = useState<MakFormErrors>(
    Object.entries(formConfig || {}).reduce((acc, [key, value]) => {
      if (!["button", "submit", "reset"].includes((value as any)?.type)) {
        ;(acc as MakFormErrors)[key] = undefined
      }
      return acc
    }, {})
  )
  const [dynamicComponents, setDynamicComponents] =
    useState<MakFormDynamicComponents>(getInitialComponentNames({ formConfig }))

  const formAccessor: FormAccessor = {
    form,
    handleChange,
    outputType,
    onSubmit: handleSubmit,
    onReset,
    validateFormOn,
    revalidateFormOn,
    formRef,
  }

  function handleChange({
    event,
    validateOn,
  }: {
    event: InputChangeEvent
    validateOn: MakFormValidationOption
  }) {
    const target = event.target as HTMLInputElement

    const value = target?.type === "checkbox" ? target.checked : target.value
    const fieldName = target.name
    console.log("handle change called", { fieldName, event, validateOn })

    let validation: string | undefined = undefined

    if (validateOn === "change" || validateOn === "blur") {
      validation = validateField({
        form,
        fieldName,
        value,
      })?.[fieldName] as string | undefined
      console.log({ validation })
      setFormErrors((prev) => {
        const updatedErrors = {
          ...prev,
          [fieldName]: validation,
        }
        return updatedErrors as MakFormErrors
      })
    }

    setForm((prev): MakForm => {
      const updatedForm = {
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          ...target,
          errors: validation,
        },
      }
      return updatedForm as MakForm
    })
  }

  function handleSubmit() {
    const validation = validateForm({ form: formRef.current || {} })

    setFormErrors(validation)
    if (formErrors && Object.values(validation).some((error) => error)) {
      console.log("Form has errors", validation, errorsRef.current)
      return
    }
    if (onSubmit) {
      onSubmit(formRef.current)
    }
  }

  useEffect(() => {
    if (!formConfig) return
    const constructedForm = constructForm(formAccessor)
    console.log("Constructed form", constructedForm)
    setForm((prev) => constructedForm)
    setDynamicComponents(constructDynamicComponents(formAccessor))
  }, [formConfig])

  useEffect(() => {
    formRef.current = form
    console.log("form changed, setting form ref", {
      form,
      formRef: formRef.current,
    })
  }, [form])

  useEffect(() => {
    errorsRef.current = formErrors
    console.log("formErrors changed, setting errors ref", {
      formErrors,
      errorsRef: errorsRef.current,
    })
  }, [formErrors])

  return {
    form,
    components: dynamicComponents,
    formErrors,
  } as {
    components: MakFormDynamicComponents
    form: MakForm
    formErrors: MakFormErrors
  }
}

export default useMakForm
