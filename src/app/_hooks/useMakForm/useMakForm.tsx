"use client"
import { constructDynamicComponents } from "./functions/componentFactory"
import constructForm from "./functions/constructForm"
import {
  ensureSingleElementType,
  getDifference,
  isEqual,
} from "./functions/helpers"
import { useCallback, useEffect, useRef, useState } from "react"
import { getComponentName } from "./functions/componentFactory"

import {
  MakForm,
  MakFormComponentOutputType,
  MakFormDynamicComponents,
  MakFormErrors,
  MakFormValidationOption,
} from "./types/form-types"
import { isEmptyObject } from "@/globals/global-helper-functions"
import { validateForm } from "./functions/validate"

interface useMakFormProps {
  formConfig?: MakForm
  onSubmit?: (input?: any) => void
  onReset?: (input?: any) => void
  useMakElements?: boolean
  useHTMLComponents?: boolean
  useMakComponents?: boolean
  validateFormOn?: MakFormValidationOption
}

export interface FormAccessor {
  form: MakForm
  setForm: React.Dispatch<React.SetStateAction<MakForm>>
  formErrors: MakFormErrors
  setFormErrors: React.Dispatch<React.SetStateAction<MakFormErrors>>
  originalFormRef: React.MutableRefObject<MakForm>
  previousFormRef: React.MutableRefObject<MakForm>
  previousComponentsRef: React.MutableRefObject<MakFormDynamicComponents>
  formIsCurrent: () => boolean
  outputType: MakFormComponentOutputType
  onSubmit?: (input?: any) => void
  onReset?: (input?: any) => void
  validateFormOn?: MakFormValidationOption
}

export const useMakForm = ({
  formConfig,
  useMakElements = true,
  useHTMLComponents = false,
  useMakComponents = false,
  onSubmit,
  onReset,
  validateFormOn = "submit",
}: useMakFormProps) => {
  const outputType = ensureSingleElementType({
    useMakElements,
    useHTMLComponents,
    useMakComponents,
  })
  const originalFormRef = useRef<MakForm>()
  const previousFormRef = useRef<MakForm>({})
  const previousComponentsRef = useRef<MakFormDynamicComponents>()

  const [form, setForm] = useState<MakForm>({})
  const [formErrors, setFormErrors] = useState<MakFormErrors>(
    Object.entries(formConfig || {}).reduce((acc, [key, value]) => {
      if (!["button", "submit", "reset"].includes((value as any)?.type)) {
        ;(acc as MakFormErrors)[key] = undefined
      }
      return acc
    }, {})
  )

  const formIsCurrent = useCallback(() => {
    return isEqual(form, previousFormRef.current)
  }, [form, previousFormRef.current])

  const handleSetForm = (newForm: MakForm) => {
    // if (isEqual(form, previousFormRef.current) && !isEmptyObject(form)) return

    setForm(newForm)

    previousFormRef.current = newForm
  }

  const handleSubmit = () => {
    console.log("submitting form", { form })
    validateForm({ form, setFormErrors })
  }

  const formAccessor = {
    form,
    setForm: handleSetForm,
    // setForm,
    formErrors,
    setFormErrors,
    originalFormRef,
    previousFormRef,
    previousComponentsRef,
    formIsCurrent,
    outputType,
    onSubmit: handleSubmit,
    onReset,
    validateFormOn,
  } as FormAccessor

  useEffect(() => {
    if (isEmptyObject(form) && !isEmptyObject(formConfig)) {
      const initialFormAccessor = {
        ...formAccessor,
        form: formConfig,
      } as FormAccessor
      const constructedForm = constructForm(initialFormAccessor)
      setForm((prev) => constructedForm)
      console.log({ constructedForm, form })
    }
  }, [formConfig, form])

  useEffect(() => {
    console.log({ form })
  }, [form])

  const initialComponentNames = () => {
    const dummyComponents = {} as any
    Object.keys(formConfig || {}).forEach((fieldName) => {
      const name = getComponentName(fieldName)
      dummyComponents[name] = () => <div />
    })
    if (!formConfig?.Submit) {
      dummyComponents["Submit"] = () => <div />
    }

    return dummyComponents
  }

  const [dynamicComponents, setDynamicComponents] =
    useState<MakFormDynamicComponents>(initialComponentNames())

  useEffect(() => {
    if (!formConfig || isEqual(form, previousFormRef.current)) return

    const constructedForm = constructForm(formAccessor)

    setForm(constructedForm)
    setDynamicComponents(constructDynamicComponents(formAccessor))

    previousFormRef.current = constructedForm
  }, [form, formConfig])

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
