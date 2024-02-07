import { createContext, useState, useContext, ReactNode, useRef } from "react"
import { MakForm } from "./types/form-types"

interface MakFormContextType {
  form: MakForm
  setForm: (form: MakForm) => void
  originalFormRef: React.MutableRefObject<MakForm>
  previousFormRef: React.MutableRefObject<MakForm>
}

interface MakFormProviderProps {
  children: ReactNode
}

interface MakFormContextType {
  form: MakForm
  setForm: (form: MakForm) => void
  originalFormRef: React.MutableRefObject<MakForm>
  previousFormRef: React.MutableRefObject<MakForm>
}

const defaultContextValue: MakFormContextType = {
  form: {},
  setForm: () => {},
  originalFormRef: { current: {} },
  previousFormRef: { current: {} },
}

const MakFormContext = createContext<MakFormContextType>(defaultContextValue)

export const MakFormProvider = ({ children }: MakFormProviderProps) => {
  const [form, setForm] = useState<MakForm>({})
  const originalFormRef = useRef<MakForm>({})
  const previousFormRef = useRef<MakForm>({})

  const values = { form, setForm, originalFormRef, previousFormRef }

  return (
    <MakFormContext.Provider value={values}>{children}</MakFormContext.Provider>
  )
}

export const useMakFormContext = () => {
  return useContext(MakFormContext)
}
