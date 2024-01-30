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
  const computedBorder = `border-[${computedProps.borderPx}px] ${computedProps.borderString}`
  const computedToggle = () => {
    if (!color) return `after:bg-${computedProps.componentTheme.primary}`

    if (!checkedColor) {
      return `after:${color}`
    } else {
      return `after:${color} after:peer-checked:${checkedColor}`
    }
  }
  const computedBackground = () => {
    if (!bgColor) return computedProps.colorString as string

    if (!bgCheckedColor) {
      return `${bgColor}`
    } else {
      return `${bgColor} peer-checked:${bgCheckedColor}`
    }
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

        <span
          className={`w-12 h-[26px] ${computedBackground()} ${computedBorder} rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[3px] after:start-1 after:peer-checked:start-[4px] ${computedToggle()} after:rounded-full after:h-5 after:w-5 after:transition-all`}
        />
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
