import { ComponentWrapperResponse, TypeProps } from "../types/component-types"
import ComponentWrapper from "./ComponentWrapper"
import { mak } from "../elements/ts/mak"

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
    }
    if (bgCheckedColor) {
      const bgString =
        bgCheckedColor.split("bg-")[1] || bgCheckedColor.split("bg-")[0]
      bgColorArray.push(`checked:bg-${bgString}`)
    }
    return bgColorArray.join(" ")
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

        <mak.span
          className="w-12 h-6 rounded-full items-center flex"
          makClassName={"checked:bg-light-100"}
        >
          <mak.span
            className={`size-[20px] bg-red-500 flex rounded-full mx-0.5 transition duration-100 ease-in-out ${
              checkedProp ? "translate-x-6" : "translate-x-0"
            }`}
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
