import { ComponentWrapperResponse, TypeProps } from "../types/component-types"
import ComponentWrapper from "./ComponentWrapper"
import { mak } from "../elements/ts/mak"
import styled from "@emotion/styled"

const DummyStyledElement = styled.div({
  backgroundColor: "blue",
  display: "flex",
  width: "fit-content",
  'input[type="checkbox"].peer:checked ~ &': {
    backgroundColor: "red",
  },
})

type ToggleProps = TypeProps & {
  checked?: boolean
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  color?: string
  checkedColor?: string
  bgColor?: string
  bgCheckedColor?: string
}

const ToggleComponent = ({
  checked: checkedProp,
  disabled,
  onChange,
  color,
  checkedColor,
  bgColor,
  bgCheckedColor,
  ...computedProps
}: ToggleProps & ComponentWrapperResponse) => {
  const computedBgColor = () => {
    let bgColorArray = []
    if (bgColor) {
      const bgString = bgColor.split("bg-")[1] || bgColor.split("bg-")[0]
      bgColorArray.push(`bg-${bgString}`)
    } else {
      bgColorArray.push("bg-light-200")
    }
    if (bgCheckedColor) {
      const bgString =
        bgCheckedColor.split("bg-")[1] || bgCheckedColor.split("bg-")[0]
      bgColorArray.push(`peer-checked:bg-${bgString}`)
    } else {
      bgColorArray.push("peer-checked:bg-primary-400")
    }
    return bgColorArray.join(" ")
  }

  const computedToggleColor = () => {
    let colorArray = []
    if (color) {
      const colorString = color.split("text-")[1] || color.split("text-")[0]
      colorArray.push(`text-${colorString}`)
    } else {
      color = "bg-primary-400"
    }
    if (checkedColor) {
      const colorString =
        checkedColor.split("text-")[1] || checkedColor.split("text-")[0]
      colorArray.push(`checked:text-${colorString}`)
    }
    return colorArray.join(" ")
  }

  return (
    <span className="flex items-center">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checkedProp}
          disabled={disabled}
          className="sr-only peer"
          onChange={(e) => {
            onChange && onChange(e)
          }}
        />
        <DummyStyledElement className="peer">hi</DummyStyledElement>
        <span className="size-4 bg-red-500 peer-checked:bg-blue-500" />

        <mak.span
          className="w-12 h-6 rounded-full items-center flex"
          makClassName={computedBgColor()}
        >
          <mak.span
            className={`size-[20px] flex rounded-full mx-0.5 transition duration-100 ease-in-out ${
              checkedProp ? "translate-x-6" : "translate-x-0"
            }`}
            makClassName={computedToggleColor()}
          />
        </mak.span>
      </label>
    </span>
  )
}

const Toggle = (props: ToggleProps & TypeProps) => {
  return (
    <ComponentWrapper {...props}>
      {(computedProps) => <ToggleComponent {...computedProps} />}
    </ComponentWrapper>
  )
}

export default Toggle
