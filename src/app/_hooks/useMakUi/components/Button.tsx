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
  className?: string
  makClassName?: string
}

const ButtonComponent = ({
  children,
  disabled,
  outlined = false,
  onClick,
  className,
  makClassName,
  ...computedProps
}: ButtonProps & ComponentWrapperResponse) => {
  let {
    bgVariant,
    borderVariant,
    textVariant,
    borderPx,
    height,
    width,
    globalThemeMode,
  } = computedProps
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
  const textClassName = textVariant
    ? `text-${textVariant}`
    : `${textVariant} ${
        outlined
          ? `text-color|${bgVariant}-${
              globalThemeMode === "light" ? "600" : "200"
            }`
          : ""
      } ${!outlined && bgVariant === "light" ? "text-dark-800" : ""}`

  const defaultMakClassName = `${
    !outlined && background
  } disabled:bg-${bgVariant}-500/50 hover:bg-${bgVariant}-600 ${
    outlined ? `border-${borderVariant}-500` : ``
  } ${textClassName}`

  const defaultClassName = `cursor-pointer disabled:cursor-not-allowed px-2 py-1 rounded-md fade-in-out text-sm font-semibold ${height} ${width}`
  return (
    <mak.button
      onClick={onClick}
      border={borderVariant}
      disabled={disabled}
      makClassName={makClassName || defaultMakClassName}
      className={className || defaultClassName}
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
        <ButtonComponent
          {...computedProps}
          children={props.children}
          makClassName={props.makClassName}
          className={props.className}
        />
      )}
    </ComponentWrapper>
  )
}
export default Button
