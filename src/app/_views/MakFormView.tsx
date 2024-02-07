import useMakForm from "../_hooks/useMakForm/useMakForm"
import { MakFormInput } from "../_hooks/useMakForm/types/form-types"

const formConfig: MakFormInput = {
  first_name: {
    type: "text",
    label: "First Name",
    placeholder: "Enter first name",
    required: true,
    minLength: 2,
  },
  email: {
    type: "email",
    label: "Email",
    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
    revalidateOn: "change",
  },

  multi_select: {
    type: "select",
    label: "Multiselect",
    multiple: true,
    required: true,
    placeholder: "Select multiselect",
    options: [
      { label: "one", value: 1 },
      { label: "two", value: 2 },
      { label: "three", value: 3 },
    ],
    defaultValue: [1, 3],
  },
  color: {
    type: "color",
    label: "Color",
    placeholder: "Select color",
  },
  submit: {
    type: "submit",
    label: "Submit",
  },
  reset: {
    type: "reset",
    label: "Reset",
  },
}

const MakFormView = () => {
  const {
    form,
    components: { FirstName, MultiSelect, Color, Submit, Email, Reset },
    errors,
    formState,
  } = useMakForm({ formConfig, onSubmit: (input) => console.log({ input }) })
  const {
    first_name: firstNameError,
    email: emailError,
    multi_select: multiSelectError,
    color: colorError,
  } = errors

  return (
    // <form>
    <div className="flex flex-col gap-2 group w-fit">
      <label htmlFor="first_name">First Name</label>
      <FirstName />
      {firstNameError && (
        <div className="text-red-500 text-sm">{firstNameError}</div>
      )}
      <label htmlFor="email">Email</label>
      <Email />
      {emailError && <div className="text-red-500 text-sm">{emailError}</div>}
      <MultiSelect />
      <Color makClassName="bg-red-500" />

      <Submit
        makClassName="bg-primary hover:bg-primary-600"
        onClick={() => {
          console.log("Submit button clicked")
        }}
      />
      <button
        onClick={() => {
          console.log(errors)
        }}
      >
        test
      </button>
      <Reset />
    </div>
    // </form>
  )
}

export default MakFormView
