"use client"
import { ComponentWrapperResponse, TypeProps } from "../types/component-types"
import ComponentWrapper from "./ComponentWrapper"
import { mak } from "../elements/ts/mak"
import { ensureUtilityClass } from "../functions/helpers"
type ButtonProps = TypeProps & {
  children?: React.ReactNode
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  form?: string
  outlined?: boolean
}

const ButtonComponent = ({
  children,
  disabled,
  outlined = false,
  onClick,
  ...computedProps
}: ButtonProps & ComponentWrapperResponse) => {
  let { bgVariant, borderVariant, borderPx, height, width } = computedProps
  if ((outlined && borderPx === 0) || !borderPx) {
    borderPx = 2
  }
  if (!borderVariant) {
    borderVariant = bgVariant
  }

  height = height ? ensureUtilityClass("h", height) : ""
  width = width ? ensureUtilityClass("w", width) : ""

  const isLightOrDark = bgVariant === "light" || bgVariant === "dark"
  const lightBackground = bgVariant === "light" ? `bg-light-50` : ``
  const darkBackground = bgVariant === "dark" ? `bg-dark-950` : ``
  const defaultBackground = `bg-${bgVariant}-500`
  const background = isLightOrDark
    ? `${lightBackground} ${darkBackground}`
    : defaultBackground
  return (
    <mak.button
      onClick={onClick}
      border={borderVariant}
      disabled={disabled}
      makClassName={`${
        !outlined && background
      } disabled:bg-${bgVariant}-500/50 hover:bg-${bgVariant}-600 ${
        outlined ? `border-${borderVariant}-500` : ``
      } ${outlined ? `text-color|${bgVariant}-100` : ""} ${
        !outlined && bgVariant === "light" ? "text-dark-800" : ""
      }`}
      className={`cursor-pointer disabled:cursor-not-allowed px-2 py-1 rounded-md fade-in-out text-sm font-semibold ${height} ${width}`}
      style={{ borderWidth: borderPx }}
    >
      {children}
    </mak.button>
  )
}

const Button = (props: ButtonProps) => {
  return (
    <ComponentWrapper {...props}>
      {(computedProps) => (
        <ButtonComponent {...computedProps} children={props.children} />
      )}
    </ComponentWrapper>
  )
}
export default Button
