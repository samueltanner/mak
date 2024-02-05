import { InputChangeEvent, MakForm } from "../types/form-types"

import { validateField } from "./validate"

interface HandleChangeProps {
  event: InputChangeEvent
  setForm: React.Dispatch<React.SetStateAction<MakForm>>
  setFormErrors: (errors: any) => void
  multiple?: boolean
}

const handleChange = ({ event, setForm, setFormErrors }: HandleChangeProps) => {
  console.log("handleChange", { event })
  // setIsSubmitted(false)
  // setIsReset(false)
  const target = event.target as HTMLInputElement
  const value = target?.type === "checkbox" ? target.checked : target.value
  const fieldName = target.name

  // const validation = validateField({
  //   fieldName,
  //   value,
  //   form,
  //   setFormErrors,
  // })

  setForm((prevForm: MakForm): MakForm => {
    console.log("prevForm", { target, prevForm })
    const updatedForm = {
      ...prevForm,
      [fieldName]: {
        ...prevForm[fieldName],
        ...target,
        // errors: validation,
      },
    }

    console.log("updatedForm", updatedForm[fieldName])

    return updatedForm as MakForm
  })

  // setShowErrors(true)
}

export default handleChange
