// MakComponent.tsx
/** @jsxImportSource @emotion/react */

import {
  forwardRef,
  ReactNode,
  ElementType,
  isValidElement,
  ComponentType,
} from "react"
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
  const response = componentWrapperLogic({
    props,
    makUi,
  })

  const allProps = { ...props, ref }

  const { textString, colorString, borderString, themeString } = response

  const updatedClassNameArray = [
    allProps.className,
    textString,
    colorString,
    borderString,
  ]

  allProps.className = updatedClassNameArray.filter(Boolean).join(" ")

  const StyledComponent = styled(({ as: T = "h1", ...props }) => (
    <T {...props} />
  ))({
    backgroundColor: themeString,
  })

  return (
    <StyledComponent
      as={component}
      backgroundColor={themeString}
      {...allProps}
    />
  )
})

MakComponent.displayName = "MakComponent"
export { MakComponent }
