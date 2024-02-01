"use client"
import { constructDynamicComponents } from "./functions/componentFactory"
import constructForm from "./functions/constructForm"
import { constructInputElements } from "./functions/inputElementFactory"
import { ensureSingleElementType, isEqual } from "./functions/helpers"
import { FormErrors, FormObject } from "./types/form-types"
import { useCallback, useEffect, useRef, useState } from "react"
import { getComponentName } from "./functions/componentFactory"
import { DynamicComponents } from "./types/component-types"

interface useMakFormProps {
  formConfig?: FormObject
  onSubmit?: (input?: any) => void
  onReset?: (input?: any) => void
  useMakElements?: boolean
  useHTMLComponents?: boolean
  useMakComponents?: boolean
}

export interface FormAccessor {
  form: FormObject
  setForm: React.Dispatch<React.SetStateAction<FormObject>>
  formErrors: FormErrors
  setFormErrors: React.Dispatch<React.SetStateAction<FormErrors>>
  originalFormRef: React.MutableRefObject<FormObject>
  previousFormRef: React.MutableRefObject<FormObject>
  previousComponentsRef: React.MutableRefObject<DynamicComponents>
  formIsCurrent: () => boolean
}

export const useMakForm = ({
  formConfig,
  useMakElements = true,
  useHTMLComponents = false,
  useMakComponents = false,
}: useMakFormProps) => {
  const outputType = ensureSingleElementType({
    useMakElements,
    useHTMLComponents,
    useMakComponents,
  })
  const originalFormRef = useRef<FormObject>()
  const previousFormRef = useRef<FormObject>({})
  const previousComponentsRef = useRef<DynamicComponents>({})

  const [form, setForm] = useState<FormObject>(formConfig || {})
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  // const formIsCurrent = isEqual(form, previousFormRef.current)
  const formIsCurrent = useCallback(() => {
    return isEqual(form, previousFormRef.current)
  }, [form, previousFormRef.current])
  const handleSetForm = (newForm: FormObject) => {
    if (isEqual(form, previousFormRef.current)) return

    setForm(newForm)
    previousFormRef.current = newForm
  }

  const formAccessor = {
    form,
    setForm: handleSetForm,
    formErrors,
    setFormErrors,
    originalFormRef,
    previousFormRef,
    previousComponentsRef,
    formIsCurrent,
  } as FormAccessor

  const initialComponentNames = () => {
    const dummyComponents = {} as any
    Object.keys(formConfig || {}).forEach((fieldName) => {
      const name = getComponentName(fieldName)
      dummyComponents[name] = () => <div />
    })
    return dummyComponents
  }

  const [dynamicComponents, setDynamicComponents] = useState<DynamicComponents>(
    initialComponentNames()
  )
  const [inputElements, setInputElements] = useState(
    constructInputElements(formAccessor)
  )

  useEffect(() => {
    if (!formConfig || isEqual(form, previousFormRef.current)) return

    const constructedForm = constructForm(formAccessor)

    setForm(constructedForm)
    setDynamicComponents(constructDynamicComponents(formAccessor, outputType))
    setInputElements(constructInputElements(formAccessor))

    previousFormRef.current = constructedForm
  }, [form, formConfig])

  return {
    form,
    components: dynamicComponents,
    inputElements,
  } as {
    components: DynamicComponents
    form: FormObject
    inputElements: { [key: string]: JSX.Element }
  }
}

export default useMakForm
