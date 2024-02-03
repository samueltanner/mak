import { useState } from "react"
import useMakForm from "../_hooks/useMakForm/useMakForm"
import { useMakUi } from "../_hooks/useMakUi/context/MakUiContext"
import { mak } from "../_hooks/useMakUi/elements/ts/mak"
import styled from "@emotion/styled"
import { BiSolidMoon } from "react-icons/bi"

const formConfig = {
  first_name: {
    type: "text",
    label: "First Name",
    placeholder: "Enter first name",
    required: true,
  },
  last_name: {
    type: "text",
    label: "Last Name",
    placeholder: "Enter last name",
    required: true,
  },
  pick: {
    type: "select",
    label: "Pick",
    placeholder: "Select pick",
    required: true,
    options: [
      { label: "one", value: 1 },
      { label: "two", value: 2 },
      { label: "three", value: 3 },
    ],
  },
  people: {
    type: "select",
    label: "People",
    placeholder: "Select people",
    options: [
      { label: "matt", value: "matt" },
      { label: "brynne", value: "brynne" },
      { label: "john", value: "john" },
    ],
  },
}

const MakFormView = () => {
  const { verboseTheme, verbosePalette, simplePalette } = useMakUi()
  const [checked, setChecked] = useState(false)
  const {
    form,
    components: { FirstName, Pick, LastName, People },
  } = useMakForm({ formConfig })
  return (
    <>
      <div className="flex flex-col gap-2 group">
        <FirstName makClassName="bg-primary text-light-100 placeholder:text-white selection:bg-danger peer-disabled:bg-danger-200" />
        <Pick className="p-4" />
        <People makClassName="bg-bg|danger text-tertiary"/>
      </div>
    </>
  )
}

export default MakFormView
