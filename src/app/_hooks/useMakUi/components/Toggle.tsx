import { ComponentWrapperResponse, TypeProps } from "../types/component-types"
import ComponentWrapper from "./ComponentWrapper"
import { mak } from "../elements/ts/mak"
import styled from "@emotion/styled"
import { ensureUtilityClass } from "../functions/helpers"

const StyledSpan = styled.span({
  height: "8rem",
  width: "fit-content",
  backgroundColor: "red",

  'input[type="checkbox"].peer:checked ~ &': {
    backgroundColor: "blue",

    "*": {
      backgroundColor: "purple",
    },

    'input[type="checkbox"].peer:checked ~ & *': {
      backgroundColor: "yellow",
    },
  },
})

type ToggleProps = TypeProps & {
  checked?: boolean
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  toggleColor?: string
  toggleCheckedColor?: string
  bgColor?: string
  bgCheckedColor?: string
  toggleBorderPx?: number
  toggleBorder?: string
}

const ToggleComponent = ({
  checked: checkedProp,
  disabled,
  onChange,
  toggleColor = "bg-light-200",
  toggleCheckedColor = toggleColor,
  bgColor = "bg-light-600",
  bgCheckedColor = bgColor,
  toggleBorderPx = 0,
  toggleBorder = "border-light-200",
  ...computedProps
}: ToggleProps & ComponentWrapperResponse) => {
  const {
    borderPx = 0,
    makClassName,
    bgVariant,
    colorVariant,
    borderVariant,
  } = computedProps
  toggleColor = ensureUtilityClass("bg", colorVariant || toggleColor)
  toggleCheckedColor = ensureUtilityClass(
    "bg",
    colorVariant || toggleCheckedColor
  )
  bgColor = ensureUtilityClass("bg", bgVariant || bgColor)
  bgCheckedColor = ensureUtilityClass("bg", bgVariant || bgCheckedColor)
  toggleBorder = ensureUtilityClass("border", borderVariant || toggleBorder)
  return (
    <span className="flex items-center">
      <label className="group relative inline-flex items-center cursor-pointer">
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
          className={`relative w-12 h-6 rounded-full items-center flex fade-in-out mak(text-primary)`}
          makClassName={`${checkedProp ? bgColor : bgCheckedColor}`}
          style={{ borderWidth: `${borderPx}px` }}
        >
          <mak.span
            className={`size-[20px] flex rounded-full mx-0 transition duration-100 ease-in-out ${
              checkedProp && !disabled
                ? "translate-x-[26px]"
                : "translate-x-[2px]"
            } ${toggleBorderPx > 0 ? `${toggleBorder}` : ""}`}
            makClassName={`${checkedProp ? toggleColor : toggleCheckedColor}`}
            style={{ borderWidth: `${toggleBorderPx}px` }}
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
