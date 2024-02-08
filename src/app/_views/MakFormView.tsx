import useMakForm from "../_hooks/useMakForm/useMakForm"
import { MakFormInput } from "../_hooks/useMakForm/types/form-types"
import { mak } from "../_hooks/useMakUi/elements/ts/mak"
import { useEffect, useMemo, useRef, useState } from "react"
import {
  AnimatePresence,
  useAnimate,
  useAnimationControls,
  motion,
} from "framer-motion"

const formConfig: MakFormInput = {
  first_name: {
    type: "text",
    label: "First Name",
    placeholder: "Enter first name",
    required: true,
    minLength: 2,
    validateOn: "none",
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
      { label: "four", value: 4 },
      { label: "five", value: 5 },
      { label: "six", value: 6 },
      { label: "seven", value: 7 },
      { label: "eight", value: 8 },
      { label: "nine", value: 9 },
      { label: "ten", value: 10 },
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

  const menuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      x: 0,
      originX: 0,
      originY: 0,
    },
    visible: {
      opacity: 1,
      height: "auto",
      zIndex: 30,
      transition: { duration: 0.3 },
      marginTop: 8,
    },
    exit: {
      opacity: 0,
      height: 0,
      x: 0,
      originX: 0,
      originY: 0,
      transition: { duration: 0.3 },
    },
  }

  // const [scope, animate] = useAnimate()
  const [showDropDown, setShowDropDown] = useState(true)
  const [searchValue, setSearchValue] = useState("")

  return (
    // <form>
    <div className="flex flex-col gap-2 group w-fit">
      <input
        onFocus={() => {
          console.log("onFocus")
          setShowDropDown(true)
        }}
        onBlur={() => {
          console.log("onBlur")
          setShowDropDown(false)
        }}
        onChange={(e) => {
          setSearchValue(e.target.value)
        }}
      />

      {/* <mak.ul
        motion={{
          initial: "hidden",
          animate: showDropDown ? "visible" : "exit",
          exit: "exit",
          variants: menuVariants,
        }}
        className="overflow-hidden"
        makClassName="bg-primary"
      >
        {formConfig.multi_select?.options?.map((option) => {
          const keyVal = JSON.stringify(option)
          if (searchValue && !keyVal.includes(searchValue)) return null
          return (
            <li
            // value={option.value}
            // onClick={(e) => {
            //   handleChange(e)
            // }}
            >
              {option.label}
            </li>
          )
        })}
      </mak.ul> */}

      <label htmlFor="first_name">First Name</label>
      <FirstName />
      {firstNameError && (
        <div className="text-red-500 text-sm">{firstNameError}</div>
      )}
      <label htmlFor="email">Email</label>
      <Email />
      {emailError && <div className="text-red-500 text-sm">{emailError}</div>}
      <MultiSelect>
        {(props) => {
          const { options, handleChange } = props

          return (
            <span className="group">
              <mak.input
                makClassName="text-primary"
                onFocus={() => {
                  console.log("onFocus")
                  setShowDropDown(true)
                }}
                onBlur={() => {
                  console.log("onBlur")
                  setShowDropDown(false)
                }}
                onChange={(e) => {
                  console.log("onChange")
                  console.log({ showDropDown })
                  setSearchValue(e.target.value)
                }}
                value={formState?.values?.multi_select || searchValue}
              />
              <AnimatePresence>
                <mak.ul
                  motion={{
                    initial: "hidden",
                    animate: showDropDown ? "visible" : "exit",
                    exit: "exit",
                    variants: menuVariants,
                  }}
                  className="overflow-hidden rounded-md border-2 p-2"
                  makClassName="bg-theme|secondary border-theme|tertiary text-primary"
                >
                  {options?.map((option) => {
                    const keyVal = JSON.stringify(option)
                    if (searchValue && !keyVal.includes(searchValue))
                      return null
                    return (
                      <mak.li
                        value={option.value}
                        onClick={(e) => {
                          handleChange(e)
                        }}
                        className="cursor-pointer capitalize px-2 py-1 rounded-md fade-in-out"
                        makClassName="hover:bg-primary-500/20"
                      >
                        {option.label}
                      </mak.li>
                    )
                  })}
                </mak.ul>
              </AnimatePresence>
            </span>
          )
        }}
      </MultiSelect>
      <Color makClassName="bg-red-500" />
      <Submit makClassName="bg-primary hover:bg-primary-600" onClick={() => {}}>
        SUBMIT BUTTON
      </Submit>
      <button
        onClick={() => {
          console.log(formState)
          console.log({ form })
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
