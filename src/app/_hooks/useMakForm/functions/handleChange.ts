import {
  InputChangeEvent,
  MakForm,
  MakFormValidationOption,
} from "../types/form-types"
import { FormAccessor } from "../useMakForm"

import { validateField } from "./validate"

interface HandleChangeProps {
  form: FormAccessor["form"]
  event: InputChangeEvent
  setForm: React.Dispatch<React.SetStateAction<MakForm>>
  setFormErrors: (errors: any) => void
  validateOn?: MakFormValidationOption
}

const handleChange = ({
  form,
  event,
  setForm,
  setFormErrors,
  validateOn,
}: HandleChangeProps) => {
  // setIsSubmitted(false)
  // setIsReset(false)
  const target = event.target as HTMLInputElement

  const value = target?.type === "checkbox" ? target.checked : target.value
  const fieldName = target.name

  let validation: string | undefined = undefined

  if (validateOn === "change" || validateOn === "blur") {
    validation = validateField({
      form,
      fieldName,
      value,
      setFormErrors,
      validateOn,
    })?.[fieldName] as string | undefined
  }

  const newFormState = {
    ...form, // Assume 'form' is the current state
    [fieldName]: {
      ...form[fieldName],
      ...target,
      errors: validation,
    },
  } as MakForm

  console.log({ newFormState })
  setForm(newFormState)

  // setForm((prev: MakForm): MakForm => {
  //   const updatedForm = {
  //     ...prev,
  //     [fieldName]: {
  //       ...prev[fieldName],
  //       ...target,
  //       // value: target.value,
  //       errors: validation,
  //     },
  //   }

  //   return updatedForm as MakForm
  // })
}

export default handleChange
