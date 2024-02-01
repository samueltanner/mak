import { InputChangeEvent } from "../types/event-types"
import { FormObject } from "../types/form-types"
import { validateField } from "./validate"

interface HandleChangeProps {
  event: InputChangeEvent
  setForm: React.Dispatch<React.SetStateAction<FormObject>>
  setFormErrors: (errors: any) => void
}

const handleChange = ({ event, setForm, setFormErrors }: HandleChangeProps) => {
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

  setForm((prevForm: FormObject): FormObject => {
    const updatedForm = {
      ...prevForm,
      [fieldName]: {
        ...prevForm[fieldName],
        value,
        // errors: validation,
      },
    }

    return updatedForm as FormObject
  })

  // setShowErrors(true)
}

export default handleChange
