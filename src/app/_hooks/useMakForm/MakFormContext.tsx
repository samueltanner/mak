import { createContext, useState, useContext, ReactNode, useRef } from "react"
import { FormObject } from "./types/form-types"

interface MakFormContextType {
  form: FormObject
  setForm: (form: FormObject) => void
  originalFormRef: React.MutableRefObject<FormObject>
  previousFormRef: React.MutableRefObject<FormObject>
}

interface MakFormProviderProps {
  children: ReactNode
}

interface MakFormContextType {
  form: FormObject
  setForm: (form: FormObject) => void
  originalFormRef: React.MutableRefObject<FormObject>
  previousFormRef: React.MutableRefObject<FormObject>
}

const defaultContextValue: MakFormContextType = {
  form: {},
  setForm: () => {},
  originalFormRef: { current: {} },
  previousFormRef: { current: {} },
}

const MakFormContext = createContext<MakFormContextType>(defaultContextValue)

export const MakFormProvider = ({ children }: MakFormProviderProps) => {
  console.log("MakFormProvider")
  const [form, setForm] = useState<FormObject>({})
  const originalFormRef = useRef<FormObject>({})
  const previousFormRef = useRef<FormObject>({})

  console.log("context form", form)

  const values = { form, setForm, originalFormRef, previousFormRef }

  return (
    <MakFormContext.Provider value={values}>{children}</MakFormContext.Provider>
  )
}

export const useMakFormContext = () => {
  console.log("useMakFormContext")
  return useContext(MakFormContext)
}
