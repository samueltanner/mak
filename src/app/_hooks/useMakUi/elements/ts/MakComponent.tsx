// MakComponent.tsx
/** @jsxImportSource @emotion/react */

import { forwardRef, ReactNode, useMemo } from "react"
import { useMakUi } from "../../context/MakUiContext"
import { MakUiElementProps } from "./mak-custom-types"
import { componentWrapperLogic } from "../../components/ComponentWrapper"
import styled from "@emotion/styled"

type HTMLMakComponentProps<K extends keyof JSX.IntrinsicElements> =
  MakUiElementProps & {
    component: K
    children?: ReactNode
  } & JSX.IntrinsicElements[K]

const MakComponent = forwardRef<
  HTMLElement,
  HTMLMakComponentProps<keyof JSX.IntrinsicElements>
>(({ component, ...props }, ref) => {
  const makUi = useMakUi()
  const response = useMemo(() => {
    return componentWrapperLogic({
      props,
      makUi,
    })
  }, [props, makUi])

  const allProps = { ...props, ref }

  const { themeString, styleObject, className, makClassName } = response

  allProps.className = className
  allProps.makClassName = makClassName

  const StyledElement = styled(({ as: T = "div", ...props }) => (
    <T {...props} />
  ))({
    ...styleObject,
  })

  return (
    <StyledElement as={component} backgroundColor={themeString} {...allProps} />
  )
})

MakComponent.displayName = "MakComponent"
export { MakComponent }
