"use client"
import { ComponentWrapperResponse, TypeProps } from "../types/component-types"
import ComponentWrapper from "./ComponentWrapper"
import { mak } from "../elements/ts/mak"

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

  if (hasBorderProps && (borderPx === 0 || !borderPx)) {
    borderPx = 2
  }

  makClassName = [makClassName, _makClassName].join(" ").trim()
  className = [className, _className].join(" ").trim()

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
    <ComponentWrapper {...props} type="button">
      {(computedProps) => {
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
