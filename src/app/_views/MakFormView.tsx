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
}
const StyledGroup = styled.div({
  "& > *": {
    color: "red",
  },
})

const StyledChild = styled.span`
  &:is(span):has(~ :checked) {
    background-color: blue;
  }
`

const StyledInput = styled.input`
  .group &:has(~ :checked) {
    background-color: green;
  }
`

const MakFormView = () => {
  const { verboseTheme, verbosePalette, simplePalette } = useMakUi()
  const [checked, setChecked] = useState(false)
  const {
    form,
    components: { FirstName, Pick, LastName },
  } = useMakForm({ formConfig })
  return (
    <>
      <StyledGroup className="group flex flex-col gap-2">
        <span>world</span>

        <StyledChild>hello</StyledChild>
        <span className="peer">goodbye</span>
        <input
          type="checkbox"
          className="peer"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />

        <input type="email" className="peer" placeholder="hithere@email.com" />
        <span>earth</span>
        <BiSolidMoon
          // className="text-zinc-500 group-hover:text-blue-500"

          className={`size-6 fade-in-out`}
        />
        <span>and</span>
        <span>thanks</span>
        <span>for</span>
        <span>all</span>
        <span>the</span>
        <p>fish</p>
        <span>fish</span>
      </StyledGroup>

      <label className="group">
        <p>label for checkbox</p>
        <StyledInput type="checkbox" />
      </label>

      <div className="flex flex-col gap-2 group">
        <mak.span makClassName="first-letter:text-danger selection:color-tertiary">
          Hello there my name is Sam
        </mak.span>
        <input
          type="checkbox"
          checked={checked}
          className="peer"
          onChange={(e) => setChecked(e.target.checked)}
        />
        <mak.p makClassName="peer-checked:text-danger hover:bg-tertiary">
          I am married to Tess
        </mak.p>
        <FirstName makClassName="bg-primary text-light-100 placeholder:text-white selection:bg-danger peer-disabled:bg-danger-200" />
        <Pick className="p-4" />
      </div>
    </>
  )
}

export default MakFormView
