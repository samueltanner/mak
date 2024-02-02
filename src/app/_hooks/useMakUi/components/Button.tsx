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
  className?: string
  makClassName?: string
}

const ButtonComponent = ({
  children,
  disabled,
  onClick,
  className,
  makClassName,
  _className,
  _makClassName,
  ...computedProps
}: ButtonProps & ComponentWrapperResponse) => {
  let { borderVariant, borderPx, hasBorderProps } = computedProps

  console.log({ computedProps })
  if ((hasBorderProps && borderPx === 0) || !borderPx) {
    borderPx = 2
  }

  makClassName = [makClassName, _makClassName].join(" ").trim()
  className = [className, _className].join(" ").trim()

  console.log({ makClassName, className })

  // console.log({ computedProps })

  // height = height ? ensureUtilityClass("h", height) : ""
  // width = width ? ensureUtilityClass("w", width) : ""

  // const isLightOrDark = bgVariant === "light" || bgVariant === "dark"
  // const lightBackground = bgVariant === "light" ? `bg-light-50` : ``
  // const darkBackground = bgVariant === "dark" ? `bg-dark-950` : ``
  // const defaultBackground = `bg-${bgVariant}-500`
  // const background = isLightOrDark
  //   ? `${lightBackground} ${darkBackground}`
  //   : defaultBackground
  // let textClassName = textVariant
  //   ? `text-${textVariant}`
  //   : `${
  //       outlined
  //         ? `text-color|${bgVariant}-${
  //             globalThemeMode === "light" ? "600" : "200"
  //           }`
  //         : ""
  //     } ${!outlined && bgVariant === "light" ? "text-dark-800" : ""}`
  // textClassName = textClassName ? textClassName : "text-primary"

  // const defaultMakClassName = `${
  //   !outlined && background
  // } disabled:bg-${bgVariant}-500/50 hover:bg-${bgVariant}-600 ${
  //   outlined ? `border-${borderVariant}-500` : ``
  // } ${textClassName}`

  // const defaultClassName = `cursor-pointer disabled:cursor-not-allowed px-2 py-1 rounded-md fade-in-out text-sm font-semibold ${height} ${width}`
  return (
    <mak.button
      onClick={onClick}
      border={borderVariant}
      disabled={disabled}
      makClassName={makClassName}
      className={className}
      style={{ borderWidth: borderPx }}
    >
      {children}
    </mak.button>
  )
}

const Button = (props: ButtonProps) => {
  return (
    <ComponentWrapper {...props}>
      {(computedProps) => {
        // console.log({ computedProps })
        return (
          <ButtonComponent
            {...computedProps}
            children={props.children}
            makClassName={props.makClassName}
            className={props.className}
          />
        )
      }}
    </ComponentWrapper>
  )
}
export default Button
