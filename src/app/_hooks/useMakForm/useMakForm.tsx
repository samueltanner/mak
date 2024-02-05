"use client"
import { constructDynamicComponents } from "./functions/componentFactory"
import constructForm from "./functions/constructForm"
import { constructInputElements } from "./functions/inputElementFactory"
import { ensureSingleElementType, isEqual } from "./functions/helpers"
// import { FormErrors, FormObject } from "./types/form-types"
import { useCallback, useEffect, useRef, useState } from "react"
import { getComponentName } from "./functions/componentFactory"
// import { ComponentOutputType, DynamicComponents } from "./types/component-types"
import {
  MakForm,
  MakFormComponentOutputType,
  MakFormDynamicComponent,
  MakFormDynamicComponents,
  MakFormErrors,
} from "./types/form-types"

interface useMakFormProps {
  formConfig?: MakForm
  onSubmit?: (input?: any) => void
  onReset?: (input?: any) => void
  useMakElements?: boolean
  useHTMLComponents?: boolean
  useMakComponents?: boolean
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
  const originalFormRef = useRef<MakForm>()
  const previousFormRef = useRef<MakForm>({})
  const previousComponentsRef = useRef<MakFormDynamicComponents>({})

  const [form, setForm] = useState<MakForm>(formConfig || {})
  const [formErrors, setFormErrors] = useState<MakFormErrors>({})
  // const formIsCurrent = isEqual(form, previousFormRef.current)
  const formIsCurrent = useCallback(() => {
    return isEqual(form, previousFormRef.current)
  }, [form, previousFormRef.current])
  const handleSetForm = (newForm: MakForm) => {
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
    outputType,
  } as FormAccessor

  const initialComponentNames = () => {
    const dummyComponents = {} as any
    Object.keys(formConfig || {}).forEach((fieldName) => {
      const name = getComponentName(fieldName)
      dummyComponents[name] = () => <div />
    })
    return dummyComponents
  }

  const [dynamicComponents, setDynamicComponents] =
    useState<MakFormDynamicComponents>(initialComponentNames())
  // const [inputElements, setInputElements] = useState(
  //   constructInputElements(formAccessor)
  // )

  useEffect(() => {
    if (!formConfig || isEqual(form, previousFormRef.current)) return

    const constructedForm = constructForm(formAccessor)

    setForm(constructedForm)
    setDynamicComponents(constructDynamicComponents(formAccessor))
    // setInputElements(constructInputElements(formAccessor))

    previousFormRef.current = constructedForm
  }, [form, formConfig])

  return {
    form,
    components: dynamicComponents,
    // inputElements,
  } as {
    components: MakFormDynamicComponents
    form: MakForm
    // inputElements: { [key: string]: JSX.Element }
  }
}

export default useMakForm
