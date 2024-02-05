import { useEffect } from "react"
import useMakForm from "../_hooks/useMakForm/useMakForm"
import { MakFormInput } from "../_hooks/useMakForm/types/form-types"

const formConfig: MakFormInput = {
  // first_name: {
  //   type: "text",
  //   label: "First Name",
  //   placeholder: "Enter first name",
  //   required: true,
  // },
  // last_name: {
  //   type: "text",
  //   label: "Last Name",
  //   placeholder: "Enter last name",
  //   required: true,
  // },
  // pick: {
  //   type: "select",
  //   label: "Pick",
  //   placeholder: "Select pick",
  //   required: true,
  //   options: [
  //     { label: "one", value: 1 },
  //     { label: "two", value: 2 },
  //     { label: "three", value: 3 },
  //   ],
  // },
  // people: {
  //   type: "select",
  //   label: "People",
  //   placeholder: "Select people",
  //   options: [
  //     { label: "matt", value: "matt" },
  //     { label: "brynne", value: "brynne" },
  //     { label: "john", value: "john" },
  //   ],
  // },
  // date: {
  //   type: "date",
  //   label: "Date",
  //   placeholder: "Select date",
  // },
  // boolean: {
  //   type: "boolean",
  //   label: "Boolean",
  // },
  multi_select: {
    type: "select",
    label: "Multiselect",
    multiple: true,
    required: true,
    hide: true,
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
}

const MakFormView = () => {
  const {
    form,
    components: { FirstName, Pick, LastName, People, Date, MultiSelect, Color },
  } = useMakForm({ formConfig })

  useEffect(() => {
    console.log(form?.multi_select?.value)
  }, [form])
  return (
    <>
      <div className="flex flex-col gap-2 group w-fit">
        {/* <FirstName />
        <Pick />
        <People />
        <Date /> */}
        <MultiSelect />
        <Color makClassName="bg-red-500" />
        <button
          onClick={() => {
            console.log(form)
          }}
        >
          form
        </button>
      </div>
    </>
  )
}

export default MakFormView
